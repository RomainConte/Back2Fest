import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, TextInput, Text, View, useWindowDimensions } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from '@expo/vector-icons';
import { database } from "../config/firebase";

// Ensure Firebase is initialized
import app from "../config/firebase";

const auth = getAuth(app);

function Register({ navigation }) {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { width, height } = useWindowDimensions();
  const responsiveStyles = createResponsiveStyles(width, height);

  const teams = ["ROUGE", "BLEU", "VERT"];

  async function getTeamCounts() {
    const counts = {};
    for (const team of teams) {
      const teamRef = ref(database, `teams/${team}/count`);
      const snapshot = await get(teamRef);
      counts[team] = snapshot.exists() ? snapshot.val() : 0;
    }
    return counts;
  }

  async function assignTeam() {
    const counts = await getTeamCounts();
    let minCount = Math.min(...Object.values(counts));
    let team = teams.find(t => counts[t] === minCount);
    return team;
  }

  async function registerUser() {
    if (value.email === "" || value.password === "" || value.name === "") {
      setValue({
        ...value,
        error: "Name, email, and password are mandatory.",
      });
      alert("Un nom, un email et un mot de passe sont requis.");
      return;
    }

    if (value.password !== value.confirmPassword) {
      setValue({
        ...value,
        error: "Passwords do not match.",
      });
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
      const user = userCredential.user;
      const team = await assignTeam();
      await set(ref(database, `users/${user.uid}`), {
        nom: value.name,
        email: value.email,
        cocoZ: 0,
        déchet: 0,
        team: team
      });
      await set(ref(database, `teams/${team}/count`), (await get(ref(database, `teams/${team}/count`))).val() + 1);
      navigation.navigate("Main");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      alert("Une erreur s'est produite lors de la création du compte.");
    }
  }

  return (
    <View style={responsiveStyles.container}>
      <Image source={require('../assets/logo noir sans fong.png')} style={{ width: 300, height: 128, marginBottom: 40 }} />
      <Text style={responsiveStyles.title}>Crées-toi un compte</Text>
      <View style={responsiveStyles.form}>
        <View style={responsiveStyles.inputWrapper}>
          <Text style={responsiveStyles.ssti}>Nom</Text>
          <View style={{ ...responsiveStyles.inputContainer, marginBottom: 20, paddingLeft: 16 }}>
            <FontAwesome name="user" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Nom"
              value={value.name}
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, name: text })}
            />
          </View>
          <Text style={responsiveStyles.ssti}>Email</Text>
          <View style={{ ...responsiveStyles.inputContainer, marginBottom: 20 }}>
            <Icon style={responsiveStyles.icon} name="email" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Email"
              value={value.email}
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>
          <Text style={responsiveStyles.ssti}>Mot de passe</Text>
          <View style={{ ...responsiveStyles.inputContainer }}>
            <Icon style={responsiveStyles.icon} name="lock" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Mot de passe"
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={18} color="#FAFAFA" style={responsiveStyles.icon1} />
            </Pressable>
          </View>
          <Text style={responsiveStyles.ssti1}>Confirme ton mot de passe</Text>
          <View style={{ ...responsiveStyles.inputContainer }}>
            <Icon style={responsiveStyles.icon} name="lock" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Confirme ton mot de passe"
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, confirmPassword: text })}
              secureTextEntry={!showPassword1}
            />
            <Pressable onPress={() => setShowPassword1(!showPassword1)}>
              <Icon name={showPassword1 ? "eye-off" : "eye"} size={18} color="#FAFAFA" style={responsiveStyles.icon1} />
            </Pressable>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={responsiveStyles.forgotPassword}>En vous enregistrant, vous confirmez votre acceptation de nos conditions d’utilisation, de notre politique de confidentialité et des cookies</Text>
        </Pressable>
        <Pressable style={responsiveStyles.button} onPress={registerUser}>
          <Text style={responsiveStyles.buttonText}>Créer mon compte</Text>
        </Pressable>
        <Text style={responsiveStyles.bottomText}>
          Déjà un compte ?{" "}
          <Text style={responsiveStyles.linkText} onPress={() => navigation.navigate("Login")}>
            CONNECTE-TOI
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default Register;

const createResponsiveStyles = (width, height) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF3DD",
    paddingHorizontal: width * 0.04,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: height * 0.012,
  },
  form: {
    width: width * 0.8,
    marginVertical: height * 0.03,
  },
  inputWrapper: {
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.015,
    backgroundColor: "#C15A5A",
  },
  icon: {
    paddingLeft: width * 0.015,
  },
  icon1: {
    paddingRight: width * 0.02,
    backgroundColor: "#C15A5A",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 0,
    paddingHorizontal: width * 0.02,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#121212",
    marginBottom: height * 0.02,
    marginTop: height * -0.013,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#C15A5A",
    borderRadius: 25,
    paddingVertical: height * 0.012,
    alignItems: "center",
    marginVertical: height * 0.02,
    marginBottom: height * 0.04,
    marginTop: height * 0.04,
    width: "62%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  bottomText: {
    color: "#121212",
    textAlign: "center",
  },
  linkText: {
    color: "#D46A6A",
    fontWeight: "bold",
  },
  ssti: {
    color: "#121212",
    marginBottom: 10,
    marginLeft: 13,
  },
  ssti1: {
    color: "#121212",
    marginTop: height * 0.02,
    marginBottom: 10,
    marginLeft: 13,
  },
});
