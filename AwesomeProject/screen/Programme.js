import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Programme = () => {
  const [selectedDay, setSelectedDay] = useState('J1');
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const dayData = {
    J1: [
      { image: require('../assets/mairo2.png'), name: 'Mairo', scène: 'Première scène', time: '15:00', time1: '16:15', index: 0 },
      { image: require('../assets/NAPS.png'), name: 'NAPS', scène: 'Première scène', time: '16:15', time1: '17:30', index: 1 },
      { image: require('../assets/ZEU.png'), name: 'Zeu', scène: 'Seconde scène', time: '17:30', time1: '18:45', index: 2 },
      { image: require('../assets/JEUNE LION.png'), name: 'Jeune Lion', scène: 'Seconde scène', time: '18:45', time1: '20:00', index: 3 },
      { image: require('../assets/JEUNEMORT.png'), name: 'Jeune Mort', scène: 'Seconde scène', time: '20:00', time1: '21:15', index: 4 },
      { image: require('../assets/ZAMDANEE.png'), name: 'Zamdanee', scène: 'Seconde scène', time: '21:15', time1: '22:30', index: 5 },
      { image: require('../assets/h-jeunecrack-hologram-lo-collab-news-visu 1.png'), name: 'H Jeune Crack', scène: 'Première scène', time: '22:30', time1: '23:45', index: 6 },
      { image: require('../assets/lala-ce-photos-etalonnees-41-600x600 1.png'), name: 'Lala Ce', scène: 'Première scène', time: '23:45', time1: '01:00', index: 7 },
      { image: require('../assets/ROUHNA.png'), name: 'Rouhna', scène: 'Première scène', time: '01:00', time1: '02:15', index: 8 },
    ],
    J2: [
      { image: require('../assets/LUIDJI.png'), name: 'Luidji', scène: 'Première scène', time: '15:00', time1: '16:15', index: 9 },
      { image: require('../assets/PLK.png'), name: 'PLK', scène: 'Première Stage', time: '16:15', time1: '17:30', index: 10 },
      { image: require('../assets/LOUS AND THE YAKUZA.png'), name: 'Lous and The Yakuza', scène: 'Seconde scène', time: '17:30', time1: '18:45', index: 11 },
      { image: require('../assets/site-bushi 2.png'), name: 'Bushi', scène: 'Seconde scène', time: '18:45', time1: '20:00', index: 12 },
      { image: require('../assets/Houdi 1.png'), name: 'Houdi', scène: 'Première scène', time: '20:00', time1: '21:15', index: 13 },
      { image: require('../assets/THAHOMEY.png'), name: 'THAHOMEY', scène: 'Seconde scène', time: '21:15', time1: '22:30', index: 14 },
      { image: require('../assets/WERENOI.png'), name: 'Werenoi', scène: 'Première scène', time: '22:30', time1: '23:45', index: 15 },
      { image: require('../assets/jazzy-bazz-nekfeu-element-115-duo-feat-memoria-1-1024x750-1 1.png'), name: 'Jazzy Bazz', scène: 'Première scène', time: '23:45', time1: '01:00', index: 16 },
      { image: require('../assets/WINTERZUKO.png'), name: 'Winter Zuko', scène: 'Première scène', time: '01:00', time1: '02:15', index: 17 },
    ],
    J3: [
      { image: require('../assets/ZOLA.png'), name: 'Zola', scène: 'Première scène', time: '15:00', time1: '16:15', index: 18 },
      { image: require('../assets/Luther 1.png'), name: 'Luther', scène: 'Première scène', time: '16:15', time1: '17:30', index: 19 },
      { image: require('../assets/BIANCA COSTA.png'), name: 'Bianca Costa', scène: 'Seconde scène', time: '17:30', time1: '18:45', index: 20 },
      { image: require('../assets/freeze_corleone_c_camulo_james 2.png'), name: 'Freeze Corleone', scène: 'Seconde scène', time: '18:45', time1: '20:00', index: 21 },
      { image: require('../assets/Rectangle 725.png'), name: 'Josman', scène: 'Première scène', time: '20:00', time1: '21:15', index: 22 },
      { image: require('../assets/AUPINARD.png'), name: 'Aupinard', scène: 'Seconde scène', time: '21:15', time1: '22:30', index: 23 },
      { image: require('../assets/Yame.png'), name: 'Yame', scène: 'Première scène', time: '22:30', time1: '23:45', index: 24 },
      { image: require('../assets/Bolzed 1.png'), name: 'Bolzed', scène: 'Première scène', time: '23:45', time1: '01:00', index: 25 },
      { image: require('../assets/KAY THE PRODIGY.png'), name: 'Kay The Prodigy', scène: 'Première scène', time: '01:00', time1: '02:15', index: 26 },
    ],
    J4: [
      { image: require('../assets/YOUV DEEE.png'), name: 'Youv Dee', scène: 'Première scène', time: '15:00', time1: '16:15', index: 27 },
      { image: require('../assets/Yvnnis-300x300 1.png'), name: 'Yvnnis', scène: 'Première scène', time: '16:15', time1: '17:30', index: 28 },
      { image: require('../assets/La-feve-epicmag 2.png'), name: 'La Feve', scène: 'Seconde scène', time: '17:30', time1: '18:45', index: 29 },
      { image: require('../assets/OSIRUS JACK.png'), name: 'Osirus Jack', scène: 'Première scène', time: '18:45', time1: '20:00', index: 30 },
      { image: require('../assets/rappeur_nes-2 1.png'), name: 'Rappeur Nes', scène: 'Seconde scène', time: '20:00', time1: '21:15', index: 31 },
      { image: require('../assets/JE NE SAIS PLUS AUSSI.png'), name: 'Furlax', scène: 'Première scène', time: '21:15', time1: '22:30', index: 32 },
      { image: require('../assets/JE NE SAIS PLUS QUI C_EST.png'), name: 'TIF', scène: 'Première scène', time: '22:30', time1: '23:45', index: 33 },
      { image: require('../assets/PANGA TODD.png'), name: 'Panga Todd', scène: 'Première scène', time: '23:45', time1: '01:00', index: 34 },
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
            <Text style={styles.artistDetails}>scène: {artist.scène}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Programme</Text>
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
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('6%'),
    marginBottom: hp('2.5%'),
    textAlign: 'center',
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('2.5%'),
  },
  dayButton: {
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('4.5%'),
    borderRadius: wp('2.5%'),
    backgroundColor: '#C15A5A',
  },
  selectedButton: {
    backgroundColor: '#E4B979',
  },
  dayButtonText: {
    fontSize: wp('4%'),
    fontFamily: 'Lemon-Regular',
    color: '#FAFAFA',
  },
  artistsContainer: {},
  artistCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: wp('2.5%'),
    marginBottom: hp('2.5%'),
    padding: wp('2.5%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: wp('2%'),
    shadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    elevation: 5,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2.5%'),
  },
  timeText: {
    fontSize: wp('3%'),
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  verticalLine: {
    height: hp('3%'),
    width: wp('0.5%'),
    backgroundColor: '#E4B979',
    marginVertical: hp('0.625%'),
  },
  artistImage: {
    width: wp('17.5%'),
    height: wp('17.5%'),
    borderRadius: wp('2.5%'),
    marginRight: wp('2.5%'),
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  artistDetails: {
    fontSize: wp('3%'),
    color: '#555',
    fontFamily: 'Lemon-Regular',
  },
});

export default Programme;
