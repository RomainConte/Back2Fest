// Programme.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const Programme = () => {
  const [selectedDay, setSelectedDay] = useState('J1');
  const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const dayData = {
    J1: [
      { image: require('../assets/mairo2.png'), name: 'Mairo', stage: 'Main Stage', time: '15:00', time1: '16:15', index: 0 },
      { image: require('../assets/NAPS.png'), name: 'NAPS', stage: 'Main Stage', time: '16:15', time1: '17:30', index: 1 },
      { image: require('../assets/ZEU.png'), name: 'Zeu', stage: 'Second Stage', time: '17:30', time1: '18:45', index: 2 },
      { image: require('../assets/JEUNE LION.png'), name: 'Jeune Lion', stage: 'Second Stage', time: '18:45', time1: '20:00', index: 3 },
      { image: require('../assets/JEUNEMORT.png'), name: 'Jeune Mort', stage: 'Second Stage', time: '20:00', time1: '21:15', index: 4 },
      { image: require('../assets/ZAMDANEE.png'), name: 'Zamdanee', stage: 'Second Stage', time: '21:15', time1: '22:30', index: 5 },
      { image: require('../assets/h-jeunecrack-hologram-lo-collab-news-visu 1.png'), name: 'H Jeune Crack', stage: 'Main Stage', time: '22:30', time1: '23:45', index: 6 },
      { image: require('../assets/lala-ce-photos-etalonnees-41-600x600 1.png'), name: 'Lala Ce', stage: 'Main Stage', time: '23:45', time1: '01:00', index: 7 },
      { image: require('../assets/ROUHNA.png'), name: 'Rouhna', stage: 'Main Stage', time: '01:00', time1: '02:15', index: 8 },
    ],
    J2: [
      { image: require('../assets/LUIDJI.png'), name: 'Luidji', stage: 'Main Stage', time: '15:00', time1: '16:15', index: 9 },
      { image: require('../assets/PLK.png'), name: 'PLK', stage: 'Main Stage', time: '16:15', time1: '17:30', index: 10 },
      { image: require('../assets/LOUS AND THE YAKUZA.png'), name: 'Lous and The Yakuza', stage: 'Second Stage', time: '17:30', time1: '18:45', index: 11 },
      { image: require('../assets/site-bushi 2.png'), name: 'Bushi', stage: 'Second Stage', time: '18:45', time1: '20:00', index: 12 },
      { image: require('../assets/Houdi 1.png'), name: 'Houdi', stage: 'Main Stage', time: '20:00', time1: '21:15', index: 13 },
      { image: require('../assets/THAHOMEY.png'), name: 'THAHOMEY', stage: 'Second Stage', time: '21:15', time1: '22:30', index: 14 },
      { image: require('../assets/WERENOI.png'), name: 'Werenoi', stage: 'Main Stage', time: '22:30', time1: '23:45', index: 15 },
      { image: require('../assets/jazzy-bazz-nekfeu-element-115-duo-feat-memoria-1-1024x750-1 1.png'), name: 'Jazzy Bazz', stage: 'Main Stage', time: '23:45', time1: '01:00', index: 16 },
      { image: require('../assets/WINTERZUKO.png'), name: 'Winter Zuko', stage: 'Main Stage', time: '01:00', time1: '02:15', index: 17 },
    ],
    J3: [
      { image: require('../assets/ZOLA.png'), name: 'Zola', stage: 'Main Stage', time: '15:00', time1: '16:15', index: 18 },
      { image: require('../assets/Luther 1.png'), name: 'Luther', stage: 'Main Stage', time: '16:15', time1: '17:30', index: 19 },
      { image: require('../assets/BIANCA COSTA.png'), name: 'Bianca Costa', stage: 'Second Stage', time: '17:30', time1: '18:45', index: 20 },
      { image: require('../assets/freeze_corleone_c_camulo_james 2.png'), name: 'Freeze Corleone', stage: 'Second Stage', time: '18:45', time1: '20:00', index: 21 },
      { image: require('../assets/Rectangle 725.png'), name: 'Josman', stage: 'Main Stage', time: '20:00', time1: '21:15', index: 22 },
      { image: require('../assets/AUPINARD.png'), name: 'Aupinard', stage: 'Second Stage', time: '21:15', time1: '22:30', index: 23 },
      { image: require('../assets/Yame.png'), name: 'Yame', stage: 'Main Stage', time: '22:30', time1: '23:45', index: 24 },
      { image: require('../assets/Bolzed 1.png'), name: 'Bolzed', stage: 'Main Stage', time: '23:45', time1: '01:00', index: 25 },
      { image: require('../assets/KAY THE PRODIGY.png'), name: 'Kay The Prodigy', stage: 'Main Stage', time: '01:00', time1: '02:15', index: 26 },
    ],
    J4: [
      { image: require('../assets/YOUV DEEE.png'), name: 'Youv Dee', stage: 'Main Stage', time: '15:00', time1: '16:15', index: 27 },
      { image: require('../assets/Yvnnis-300x300 1.png'), name: 'Yvnnis', stage: 'Main Stage', time: '16:15', time1: '17:30', index: 28 },
      { image: require('../assets/La-feve-epicmag 2.png'), name: 'La Feve', stage: 'Second Stage', time: '17:30', time1: '18:45', index: 29 },
      { image: require('../assets/OSIRUS JACK.png'), name: 'Osirus Jack', stage: 'Main Stage', time: '18:45', time1: '20:00', index: 30 },
      { image: require('../assets/rappeur_nes-2 1.png'), name: 'Rappeur Nes', stage: 'Second Stage', time: '20:00', time1: '21:15', index: 31 },
      { image: require('../assets/JE NE SAIS PLUS AUSSI.png'), name: 'Furlax', stage: 'Main Stage', time: '21:15', time1: '22:30', index: 32 },
      { image: require('../assets/JE NE SAIS PLUS QUI C_EST.png'), name: 'TIF', stage: 'Main Stage', time: '22:30', time1: '23:45', index: 33 },
      { image: require('../assets/PANGA TODD.png'), name: 'Panga Todd', stage: 'Main Stage', time: '23:45', time1: '01:00', index: 34 },
    ],
  };

  const renderArtists = (day) => {
    return dayData[day].map((artist) => (
      <TouchableOpacity
        key={artist.index}
        onPress={() => {
          console.log('Clicked artist index:', artist.index); // Log the artist index
          navigation.navigate('artiste', { artistIndex: artist.index });
        }}
      >
        <View style={styles.artistCard}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{artist.time}</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.timeText}>{artist.time1}</Text>
          </View>
          <Image source={artist.image} style={styles.artistImage} />
          <View style={styles.artistInfo}>
            <Text style={styles.artistName}>{artist.name}</Text>
            <Text style={styles.artistDetails}>Stage: {artist.stage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Programme :</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.dayButton, selectedDay === 'J1' && styles.selectedButton]} onPress={() => setSelectedDay('J1')}>
          <Text style={styles.dayButtonText}>Jour 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dayButton, selectedDay === 'J2' && styles.selectedButton]} onPress={() => setSelectedDay('J2')}>
          <Text style={styles.dayButtonText}>Jour 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dayButton, selectedDay === 'J3' && styles.selectedButton]} onPress={() => setSelectedDay('J3')}>
          <Text style={styles.dayButtonText}>Jour 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dayButton, selectedDay === 'J4' && styles.selectedButton]} onPress={() => setSelectedDay('J4')}>
          <Text style={styles.dayButtonText}>Jour 4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.artistsContainer}>
        {renderArtists(selectedDay)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 90,
    marginBottom: 20,
    marginLeft: 22,
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#C15A5A',
  },
  selectedButton: {
    backgroundColor: '#E4B979',
  },
  dayButtonText: {
    fontSize: 16,
    fontFamily: 'Lemon-Regular',
    color: '#FAFAFA',
  },
  artistsContainer: {
    marginHorizontal: 10,
  },
  artistCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  timeText: {
    fontSize: 13,
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  verticalLine: {
    height: 25,
    width: 2,
    backgroundColor: '#E4B979',
    marginVertical: 5,
  },
  artistImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  artistDetails: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Lemon-Regular',
  },
});

export default Programme;
