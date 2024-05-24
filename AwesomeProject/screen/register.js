import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, TextInput, Text, View, useWindowDimensions } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from '@expo/vector-icons';
import { database } from "../config/firebase";
import { useFonts } from 'expo-font';
import app from "../config/firebase"; // Ensure Firebase is initialized

const auth = getAuth(app);

function Register({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

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

  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
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

    if (!validatePassword(value.password)) {
      setValue({
        ...value,
        error: "Password does not meet criteria.",
      });
      alert("Le mot de passe doit comporter au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.");
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
        team: team,
        ticket: false,
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

  useEffect(() => {
    setPasswordValid(validatePassword(value.password));
  }, [value.password]);

  if (!fontsLoaded) {
    return null; // Optionally, render a loading component
  }

  return (
    <View style={responsiveStyles.container}>
      <Image source={require('../assets/logo noir sans fong.png')} style={{ width: 300, height: 128, marginBottom: 40 }} />
      <Text style={responsiveStyles.title}>ENREGISTRE-TOI</Text>
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
          {!passwordValid && value.password.length > 0 && (
            <Text style={responsiveStyles.passwordError}>
              Le mot de passe doit comporter au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.
            </Text>
          )}
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
        <View style={responsiveStyles.termsContainer}>
          <Text style={responsiveStyles.termsText}>En vous enregistrant, vous confirmez votre acceptation de nos </Text>
          <Pressable onPress={() => navigation.navigate("TermsOfUse")}>
            <Text style={responsiveStyles.linkText}>conditions d’utilisation</Text>
          </Pressable>
          <Text style={responsiveStyles.termsText}>, de notre </Text>
          <Pressable onPress={() => navigation.navigate("Poli")}>
            <Text style={responsiveStyles.linkText}>politique de confidentialité</Text>
          </Pressable>
          <Text style={responsiveStyles.termsText}> et des </Text>
          <Pressable onPress={() => navigation.navigate("Cookies")}>
            <Text style={responsiveStyles.linkText}>cookies</Text>
          </Pressable>
          <Text style={responsiveStyles.termsText}>.</Text>
        </View>
        <Pressable style={responsiveStyles.button} onPress={registerUser}>
          <Text style={responsiveStyles.buttonText}>CRÉER MON COMPTE</Text>
        </Pressable>
        <Text style={responsiveStyles.bottomText}>
          Déjà un compte ?{" "}
          <Text style={responsiveStyles.linkText1} onPress={() => navigation.navigate("Login")}>
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
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#FAF3DD",
    paddingHorizontal: width * 0.04,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: height * 0.012,
    fontFamily: 'Lemon-Regular',
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
    fontFamily: 'Lemon-Regular',
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#121212",
    marginBottom: height * 0.02,
    marginTop: height * -0.013,
    marginRight: 4,
    fontFamily: 'Lemon-Regular',
    fontSize: 9,
  },
  button: {
    backgroundColor: "#E4B979",
    borderRadius: 25,
    paddingVertical: height * 0.012,
    alignItems: "center",
    marginVertical: height * 0.02,
    marginBottom: height * 0.04,
    marginTop: height * 0.02,
    width: "74%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width * 0.045,
    fontFamily: 'Lemon-Regular',
  },
  bottomText: {
    color: "#121212",
    textAlign: "center",
    fontFamily: 'Lemon-Regular',
    fontSize: 13,
  },
  linkText: {
    color: "#D46A6A",
    fontFamily: 'Lemon-Regular',
    fontWeight: "bold",
    fontSize: 9,
  },
   linkText1: {
    color: "#D46A6A",
    fontFamily: 'Lemon-Regular',
    fontWeight: "bold",
    fontSize: 12,
  },
  ssti: {
    color: "#121212",
    marginBottom: 10,
    marginLeft: 13,
    fontFamily: 'Lemon-Regular',
  },
  ssti1: {
    color: "#121212",
    marginTop: height * 0.02,
    marginBottom: 10,
    marginLeft: 13,
    fontFamily: 'Lemon-Regular',
  },
  passwordError: {
    color: "#D46A6A",
    fontSize: 10,
    marginTop: 2,
    marginBottom: 0,
    marginLeft: 13,
    fontFamily: 'Lemon-Regular',
  },
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: height * 0.02,
    marginTop: height * -0.013,
    marginRight: 4,
  },
  termsText: {
    color: "#121212",
    fontSize: 9,
    fontFamily: 'Lemon-Regular',
  },
});
