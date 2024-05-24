import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import du hook de navigation
import { useFonts } from 'expo-font';
const Start2 = () => {
  const navigation = useNavigation(); // Utilisation du hook useNavigation
    const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/logo_fire.png')} style={styles.logo} />
        <Image source={require('../assets/dancer.png')} style={styles.dancers} />
      </View>
      <Text style={styles.description}>Le plus grand festival de rap en France</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>C’est parti !</Text>
      </TouchableOpacity>
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDot} />
        <View style={[styles.paginationDot, styles.activePaginationDot]} />
      </View>
       <View style={styles.wave}>
        <Image source={require('../assets/waverouge.png')} style={styles.image2} />
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  topContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 130*2,
    height: 50*2,
    resizeMode: 'contain',
  },
  dancers: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 20,
    color: '#C15A5A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  fontFamily: 'Lemon-Regular',
  },
  button: {
    backgroundColor: '#C15A5A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3, 
  },
  buttonText: {
    color: '#F5E5CC',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lemon-Regular',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
      marginBottom: -40,
    paddingTop: 60,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5C4B5',
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: '#C15A5A',
  },

    wave: {
    height: 108,
    width: "100%",
    position: 'absolute',
    bottom: 0,
   
  },
});

export default Start2;
