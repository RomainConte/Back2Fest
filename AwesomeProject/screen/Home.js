import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const App = () => {
  // Les données pourraient être structurées comme suit
  const data = {
    days: [
      {
        day: 'En ce moment',
        images: [
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/josman.png'), label: 'Josman' },
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/8ruki.png'), label: '8ruki' },
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/Karris.png'), label: 'Karris' },
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/Nes.png'), label: 'Nes' },
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/La fève.png'), label: 'La fève' },
        ],
        
      },
      {
        day: 'À ne pas manquer',
        images: [
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/La fève.png'), label: 'Travis Scott' },
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/josman.png'), label: 'Label 17' },
          { src: require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/josman.png'), label: 'Label 18' },
        ],
      },
      // Répétez pour chaque jour
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.profileWrapper2}>
          <Image source={require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/logo_fire.png')} style={styles.profileImage2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileWrapper}>
          <Image source={require('C:/cours/Back2Fest/Back2Fest/AwesomeProject/assets/profil.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
        {data.days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.day}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              {day.images.slice(0, 5).map((image, idx) => (
                <TouchableOpacity key={idx} style={[styles.imageWrapper, index === 1 && { width: 300, height: 300 }]}>
                  <Image source={image.src} style={[styles.image, index === 1 && { width: '100%', height: '100%' }]} />
      
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop : 60,
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: 10,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    backgroundColor: '#F5E5CC',
    flexDirection: 'row',
  },
  profileWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    margin: 15,
    backgroundColor: '#F5E5CC',

  },
  profileImage: {
    width: 40,
    height: 40,
  },
  profileWrapper2: {
    width: 160,
    height: 60,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#F5E5CC',
    marginRight: '35%',
  },
  profileImage2: {
    width: 130,
    height: 50,
  },
  imagelabel: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    color: 'white',
    width: '100%',
    padding: 5,
    textAlign: 'right',
    fontFamily: 'Knewave-Regular',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default App;