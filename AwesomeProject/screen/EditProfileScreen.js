import React, { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, Text, View, useWindowDimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

function EditProfileScreen() {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    error: "",
  });

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const responsiveStyles = createResponsiveStyles(width, height);

  function updateProfileInfo() {
    if (value.firstName === "" || value.lastName === "" || value.email === "" || value.currentPassword === "" || value.newPassword === "" || value.confirmNewPassword === "") {
      setValue({
        ...value,
        error: "All fields are mandatory.",
      });
      alert("Tous les champs sont obligatoires.");
      return;
    }

    if (value.newPassword !== value.confirmNewPassword) {
      setValue({
        ...value,
        error: "Passwords do not match.",
      });
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    alert("Profil mis à jour avec succès.");
  }

  if (!fontsLoaded) {
    return null; // Optionally, render a loading component
  }

  return (
    <View style={responsiveStyles.container}>
      <View style={responsiveStyles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={responsiveStyles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={responsiveStyles.title}>Modifier le profil</Text>
      </View>
      <View style={responsiveStyles.form}>
        <View style={responsiveStyles.inputWrapper}>
          <Text style={responsiveStyles.ssti}>Prénom</Text>
          <View style={{ ...responsiveStyles.inputContainer, marginBottom: 20 }}>
            <FontAwesome name="user" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Prénom"
              value={value.firstName}
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, firstName: text })}
            />
          </View>
          <Text style={responsiveStyles.ssti}>Nom</Text>
          <View style={{ ...responsiveStyles.inputContainer, marginBottom: 20 }}>
            <FontAwesome name="user" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Nom"
              value={value.lastName}
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, lastName: text })}
            />
          </View>
          <Text style={responsiveStyles.ssti}>Email</Text>
          <View style={{ ...responsiveStyles.inputContainer, marginBottom: 20 }}>
            <FontAwesome name="envelope" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Email"
              value={value.email}
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, email: text })}
              keyboardType="email-address"
            />
          </View>
          <Text style={responsiveStyles.ssti}>Mot de passe actuel</Text>
          <View style={{ ...responsiveStyles.inputContainer }}>
            <Icon style={responsiveStyles.icon} name="lock" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Mot de passe actuel"
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, currentPassword: text })}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={18} color="#FAFAFA" style={responsiveStyles.icon1} />
            </Pressable>
          </View>
          <Text style={responsiveStyles.ssti}>Nouveau mot de passe</Text>
          <View style={{ ...responsiveStyles.inputContainer }}>
            <Icon style={responsiveStyles.icon} name="lock" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Nouveau mot de passe"
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, newPassword: text })}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={18} color="#FAFAFA" style={responsiveStyles.icon1} />
            </Pressable>
          </View>
          <Text style={responsiveStyles.ssti1}>Confirmez le nouveau mot de passe</Text>
          <View style={{ ...responsiveStyles.inputContainer }}>
            <Icon style={responsiveStyles.icon} name="lock" size={18} color="#FAFAFA" />
            <TextInput
              placeholder="Confirmez le nouveau mot de passe"
              style={responsiveStyles.input}
              onChangeText={(text) => setValue({ ...value, confirmNewPassword: text })}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={18} color="#FAFAFA" style={responsiveStyles.icon1} />
            </Pressable>
          </View>
        </View>
        <Pressable style={responsiveStyles.button} onPress={updateProfileInfo}>
          <Text style={responsiveStyles.buttonText}>Mettre à jour</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default EditProfileScreen;

const createResponsiveStyles = (width, height) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF3DD",
    paddingHorizontal: width * 0.04,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
  },
  backIcon: {
    paddingRight: width * 0.02,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#121212",
    flex: 1,
    textAlign: "center",
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
  button: {
    backgroundColor: "#C15A5A",
    borderRadius: 25,
    paddingVertical: height * 0.012,
    alignItems: "center",
    marginVertical: height * 0.02,
    width: "62%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: width * 0.045,
    fontFamily: 'Lemon-Regular',
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
});
