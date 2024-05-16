import { Button } from 'react-native';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import du hook

const Start = () => {
  const navigation = useNavigation(); // Utilisation du hook useNavigation

  return (
    <View style={styles.container}>
      <Image source={require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/logo_coco.png')} style={styles.image} />
      <Image source={require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/eco_image.png')} style={styles.image1} />
      <View style={styles.buttonContainer}>
        <Button title="Je zap" onPress={() => navigation.navigate('Main')} /> 
        <Button title="Suivant" onPress={() => navigation.navigate('Start2')} /> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E5CC',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  image1: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default Start;
