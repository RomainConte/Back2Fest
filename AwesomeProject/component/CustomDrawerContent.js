import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/fireee.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <DrawerItem
        icon={({ size }) => <Feather name="user" color="white" size={size} />}
        label="Profil"
        onPress={() => props.navigation.navigate('Profil')}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ size }) => <FontAwesome5 name="coins" color="white" size={size} />}
        label="Mes points"
        onPress={() => props.navigation.navigate('Coco')}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ size }) => <Feather name="settings" color="white" size={size} />}
        label="Réglages"
        onPress={() => props.navigation.navigate('Settings')}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ size }) => <Feather name="log-out" color="white" size={size} />}
        label="Déconnexion"
        onPress={handleLogout}
        labelStyle={styles.label}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C15A5A',
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 125, // Largeur augmentée
    height: 100, // Hauteur augmentée
    marginBottom: 80,
    marginTop: -105,
    marginLeft: -100,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginLeft: -16,
    marginTop: 14,
  },
});

export default CustomDrawerContent;