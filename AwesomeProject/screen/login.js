// ./login.js

import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, Text, View, ImageBackground, useWindowDimensions } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


// Assurez-vous que Firebase est initialisé
import app from "../config/firebase";

const auth = getAuth(app);

function SignInScreen({ navigation }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { width, height } = useWindowDimensions();
  const responsiveStyles = createResponsiveStyles(width, height);

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      alert("Un email et un mot de passe sont requis.");
      return;
    }

    try {
        await signInWithEmailAndPassword(auth, value.email, value.password);
        navigation.navigate("Home");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      alert("Email ou mot de passe incorrect(s).");
    }
  }

  return (
   
      <View style={responsiveStyles.container}>
      
        <Text style={responsiveStyles.title}>Connecte-toi à ton compte !</Text>

        <View style={responsiveStyles.form}>
          <View style={responsiveStyles.inputWrapper}>
            <View style={responsiveStyles.inputContainer}>
              <Icon style={responsiveStyles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                style={responsiveStyles.input}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View style={responsiveStyles.inputContainer}>
              <Icon style={responsiveStyles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Mot de passe"
                style={responsiveStyles.input}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "eye-off" : "eye"} size={18} color="gray" style={responsiveStyles.icon} />
              </Pressable>
            </View>
          </View>
          <Pressable style={responsiveStyles.button} onPress={signIn}>
            <Text style={responsiveStyles.buttonText}>Connexion</Text>
          </Pressable>
        </View>
        <Text style={responsiveStyles.bottomText}>
          Pas de compte ?{" "}
          <Text style={responsiveStyles.linkText} onPress={() => navigation.navigate("Sign Up")}>
            Inscris toi ici
          </Text>
        </Text>
      </View>
  
  );
}

export default SignInScreen;

const createResponsiveStyles = (width, height) => StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.04,
  },
  logo: {
    width: width * 0.6,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: height * 0.02,
  },
  form: {
    width: width * 0.8,
    marginVertical: height * 0.03,
  },
  inputWrapper: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    backgroundColor: "#f3f3f3",
    marginBottom: height * 0.02,
    width: "100%",
  },
  icon: {
    padding: width * 0.02,
  },
  input: {
    flex: 1,
    paddingTop: height * 0.01,
    paddingRight: width * 0.02,
    paddingBottom: height * 0.01,
    paddingLeft: 0,
    backgroundColor: "#f3f3f3",
    color: "#424242",
  },
  button: {
    backgroundColor: "#F72585",
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    margin: height * 0.02,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  bottomText: {
    textAlign: "center",
    color: "white",
  },
  linkText: {
    color: "#F72585",
  },
});
