import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>FireWave</Text>
      </View>
      <DrawerItem
        icon={({ color, size }) => <Feather name="user" color={color} size={size} />}
        label="Profil"
        // onPress={() => {}}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ color, size }) => <FontAwesome5 name="coins" color={color} size={size} />}
        label="Mes points"
        // onPress={() => {}}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ color, size }) => <Feather name="settings" color={color} size={size} />}
        label="Paramètres"
        // onPress={() => {}}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ color, size }) => <Feather name="check-circle" color={color} size={size} />}
        label="Completed"
        // onPress={() => {}}
        labelStyle={styles.label}
      />
      <DrawerItem
        icon={({ color, size }) => <Feather name="shield" color={color} size={size} />}
        label="Privacy"
        // onPress={() => {}}
        labelStyle={styles.label}
      />
    </DrawerContentScrollView>
  );
}

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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    color: 'white',
  },
});

export default CustomDrawerContent;
