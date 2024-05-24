import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, TextInput, Text, View, useWindowDimensions, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, updateEmail } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { database } from "../config/firebase"; // Adjust the import based on your project structure

function EditProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [value, setValue] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const responsiveStyles = createResponsiveStyles(width, height);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setValue((prevValue) => ({
            ...prevValue,
            name: userData.nom,
            email: userData.email,
          }));
        }
      });
    }
  }, [user]);

  async function updateProfileInfo() {
    if (!user) return;

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, value.currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updateEmail(user, value.email);
      if (value.newPassword) {
        await updatePassword(user, value.newPassword);
      }

      const updates = {
        nom: value.name,
        email: value.email,
      };

      await update(ref(database, `users/${user.uid}`), updates);

      alert("Profil mis à jour avec succès.");
      setLoading(false);
      // Reset password fields
      setValue((prevValue) => ({
        ...prevValue,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        error: "",
      }));
      navigation.goBack();
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      alert("Erreur lors de la mise à jour du profil.");
      setLoading(false);
    }
  }

  if (!fontsLoaded) {
    return null; // Optionally, render a loading component
  }

  return (
    <View style={responsiveStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#C15A5A" />
      ) : (
        <>
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
              <Text style={responsiveStyles.ssti}>Nom</Text>
              <View style={{ ...responsiveStyles.inputContainer, marginBottom: 20 }}>
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
                  value={value.currentPassword} // Added value prop
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
                  value={value.newPassword} // Added value prop
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
                  value={value.confirmNewPassword} // Added value prop
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon  name={showPassword ? "eye-off" : "eye"} size={18} color="#FAFAFA" style={responsiveStyles.icon1} />
                </Pressable>
              </View>
            </View>
            {/* Bouton de mise à jour */}
            <Pressable style={responsiveStyles.button} onPress={updateProfileInfo}>
              <Text style={responsiveStyles.buttonText}>Mettre à jour</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

export default EditProfileScreen;

// Styles responsives
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
    width: "100%",
  },
  inputWrapper: {
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FAFAFA",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#C15A5A",
    marginTop: height * 0.01,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#FAFAFA",
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#C15A5A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 18,
    fontWeight: "bold",
  },
  ssti: {
    fontSize: 18,
    color: "#121212",
    fontWeight: "bold",
    marginTop: 10,
  },
  ssti1: {
    fontSize: 18,
    color: "#121212",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    padding: 10,
  },
  icon1: {
    padding: 10,
  },
});

