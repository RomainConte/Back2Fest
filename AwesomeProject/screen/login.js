// ./login.js

import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, Text, View, useWindowDimensions } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


// Assurez-vous que Firebase est initialisé
import app from "../config/firebase";
import register from "./register";

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
        <Image source={require('../assets/logo noir sans fong.png')} style={{width: 300, height: 128, marginBottom:60, }}></Image>
      <Text style={responsiveStyles.title}>CONNECTE-TOI</Text>
    

      <View style={responsiveStyles.form}>
        <View style={responsiveStyles.inputWrapper}>


        <Text style={responsiveStyles.ssti}>Email</Text>
                  <View style={{ ...responsiveStyles.inputContainer, marginBottom:20, }}>
            <Icon style={responsiveStyles.icon} name="email" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Email"
              value={value.email}
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>

        <Text style={responsiveStyles.ssti}>Mot de passe</Text>
          <View style={{ ...responsiveStyles.inputContainer}}>
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
        </View>

        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={responsiveStyles.forgotPassword}>Mot de passe oublié ?</Text>
        </Pressable>

        <Pressable style={responsiveStyles.button} onPress={register}>
          <Text style={responsiveStyles.buttonText}>SE CONNECTER</Text>
        </Pressable>


        <Text style={responsiveStyles.bottomText}>
          Pas encore de compte ?{" "}
          <Text style={responsiveStyles.linkText} onPress={() => navigation.navigate("register")}>
            CRÉER-TOI UN COMPTE
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignInScreen;

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
      marginTop: height * -0.015,
    marginRight: 1,
  },
  button: {
    backgroundColor: "#C15A5A",
    borderRadius: 25,
    paddingVertical: height * 0.012,
    alignItems: "center",
      marginVertical: height * 0.02,
     marginBottom: height * 0.04,
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
    paddingTop: 0,
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
});