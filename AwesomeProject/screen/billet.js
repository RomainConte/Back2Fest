import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Billet = ({ navigation }) => {
  const [hasTicket, setHasTicket] = useState(false);

  useEffect(() => {
    const checkTicket = async () => {
      const ticket = await AsyncStorage.getItem('hasTicket');
      if (ticket) {
        setHasTicket(true);
      }
    };
    checkTicket();
  }, []);

  const handleGetTicket = async () => {
    await AsyncStorage.setItem('hasTicket', 'true');
    setHasTicket(true);
  };
  const handleUnGetTicket = async () => {
    await AsyncStorage.setItem('hasTicket', 'false');
    setHasTicket(false);
  };

  if (hasTicket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mon Billet</Text>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.label}>Prénom :</Text>
        <Text style={styles.label}>Age :</Text>
        <Text style={styles.label}>Nombre de jours : 1</Text>
        <Text style={styles.label}>Camping : Oui</Text>
        <Text style={styles.label}>Mon QRcode :</Text>
        <View style={styles.qrContainer}>
          <SvgQRCode value="QSI KE8 C7A" size={150} />
        </View>
        <Button title="Je n'ai plus mon billet" onPress={handleUnGetTicket} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oups !</Text>
      <Text style={styles.subtitle}>Tu n’as pas encore ton billet pour FireWave</Text>
      <TouchableOpacity onPress={handleGetTicket} style={styles.button}>
          <Text style={styles.buttonText}>Prend le tien maintenant !</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5D7B8',
    padding: 17,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  qrContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#D46C63',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#C15A5A',
    paddingVertical: 10,
    // paddingHorizontal: 10,
    borderRadius: 20, 
    // marginHorizontal: 0,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 30,
    color: '#F5E5CC',
    fontFamily: 'Lemon',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Billet;
