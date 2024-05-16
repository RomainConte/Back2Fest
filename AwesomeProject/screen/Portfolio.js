import { Button } from 'react-native';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
//import de la navigation

const Portfolio = () => {
  return (
    <View style={styles.container}>
      <Image source={require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/logo_coco.png')} style={styles.image} />
      <Image source={require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/eco_image.png')} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Je zap" onPress={() => useNavigation.navigate('Home')} />
        <Button title="Suivant" onPress={() => console.log('Suivant button pressed')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default Portfolio;