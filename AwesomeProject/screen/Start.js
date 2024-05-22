
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Start = () => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageWrapper1}>
        <Image source={require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/logo_coco.png')} style={styles.image1} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.imageWrapper2}>
        <Image source={require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/eco_image.png')} style={styles.image2} />
      </TouchableOpacity>
      
      <Text style={styles.text}>Une toute nouvelle poubelle pour une toute nouvelle édition !</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.button}>
          <Text style={styles.buttonText}>Je zap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Start2')} style={styles.button}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.paginationContainer}>
        <View style={[styles.paginationDot, styles.activePaginationDot]} />
        <View style={styles.paginationDot} />
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
    fontFamily: 'Lemon',
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
    fontFamily: 'Lemon',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
});

export default Start;
