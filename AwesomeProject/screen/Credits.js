import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const partners = [
  { name: 'CocaCola', src: require('../assets/Coca-Cola_logo 1.png') },
  { name: 'BlaBlaCar', src: require('../assets/BlaBlaCar-Logo 1.png') },
  { name: 'SNCF', src: require('../assets/Logo_SNCF_2011 1.png') },
  { name: 'RedBull', src: require('../assets/Logo-Red-Bull 1.png') },
  { name: 'Kronenbourg', src: require('../assets/Logo-kronenbourg-fb 1.png') },
  { name: 'Biarritz', src: require('../assets/logo-2 1.png') },
  { name: 'Brets', src: require('../assets/logo_brets-300x162 1.png') },
  { name: 'EDF', src: require('../assets/image 17.png') },
  { name: 'Celio', src: require('../assets/image 18.png') },
  { name: 'Cochonou', src: require('../assets/image 21.png') },
  { name: 'Bounty', src: require('../assets/image 20.png') },
  { name: 'Orange', src: require('../assets/logo-orange 1.png') },
];

const Credits = () => {
  const navigation = useNavigation();
  
  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Optionally, render a loading component
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header1}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>
          Crédits
        </Text>
      </View>
      
      <Text style={styles.subHeader}>Nos partenaires</Text>
      
      <View style={styles.partnersContainer}>
        {partners.map((partner, index) => (
          <Image key={index} source={partner.src} style={styles.partnerImage} />
        ))}
      </View>
      <Text style={styles.subHeader}>Application développé par COCO</Text>
      <Image source={require('../assets/logo_coco.png')} style={{ width: 116, height: 105, alignSelf: 'center', marginTop: 20 }} />
      <Text style={styles.subHeader2}>Festival organisé par Firewave</Text>
      <Image source={require('../assets/logo_fire.png')} style={{ width: 200, height:80, alignSelf: 'center', marginTop: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC', 
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  subHeader: {
    fontSize: 18,
    color: '#C15A5A',
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Lemon-Regular',
  },
    subHeader2: {
    fontSize: 18,
    color: '#C15A5A',
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontFamily: 'Lemon-Regular',
  },
  partnersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  partnerImage: {
    width: 100,
    height: 50,
    margin: 10,
    resizeMode: 'contain',
  },
        header1: {
    paddingTop: 10,
  },
  backIcon: {
    paddingBottom: 10,
    top: 0,
    marginTop: 20,
  },
  headerTitle: {
    marginTop: -35,
    
    textAlign: 'center',
    marginBottom: 25,
    color: '#121212',
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'Lemon-Regular',
  },
});

export default Credits;
