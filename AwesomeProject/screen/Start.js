import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useFonts } from 'expo-font';

const CombinedScreen = () => {
  const navigation = useNavigation(); 
  const [currentScreen, setCurrentScreen] = useState(1);
  
  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      {currentScreen === 1 ? (
        <View style={styles.screenContainer}>
          <TouchableOpacity style={styles.imageWrapper1}>
            <Image source={require('../assets/logo_coco.png')} style={styles.image1} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageWrapper2}>
            <Image source={require('../assets/eco_image.png')} style={styles.image2} />
          </TouchableOpacity>

          <Text style={styles.text}>Une toute nouvelle poubelle pour une toute nouvelle édition !</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
              <Text style={styles.buttonText}>Je zap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentScreen(2)} style={styles.button}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wave}>
            <Image source={require('../assets/waverouge.png')} style={styles.image2} />
          </View>
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <View style={styles.topContainer}>
            <Image source={require('../assets/logo noir sans fong.png')} style={styles.logo} />
            <Image source={require('../assets/dancer.png')} style={styles.dancers} />
          </View>
          <Text style={styles.description}>Le plus grand festival de rap en France</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>C’est parti !</Text>
          </TouchableOpacity>
          <View style={styles.wave}>
            <Image source={require('../assets/waverouge.png')} style={styles.image2} />
          </View>
        </View>
      )}
      <View style={styles.paginationContainer}>
        <View style={[styles.paginationDot, currentScreen === 1 ? styles.activePaginationDotYellow : styles.activePaginationDotRed]} />
        <View style={[styles.paginationDot, currentScreen === 1 ? styles.activePaginationDotRed : styles.activePaginationDotYellow]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper1: {
    width: 220 / 1.5,
    height: 200 / 1.5,
    marginBottom: 60,
  },
  imageWrapper2: {
    width: 380,
    height: 320,
    marginTop: 20,
    marginBottom: 50,
  },
  image1: {
    width: "100%",
    height: "100%",
  },
  image2: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#C15A5A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, 
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#F5E5CC',
    fontFamily: 'Lemon-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 60,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    color: '#C15A5A',
    fontFamily: 'Lemon-Regular',
    fontWeight: 'bold',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5C4B5',
    marginHorizontal: 5,
  },
  activePaginationDotYellow: {
    backgroundColor: '#E4B979', // Yellow color
  },
  activePaginationDotRed: {
    backgroundColor: '#C15A5A', // Red color
  },
  wave: {
    height: 108,
    width: "100%",
    position: 'absolute',
    bottom: 0,
  },
  topContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 130 * 2,
    height: 50 * 2,
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
});

export default CombinedScreen;
