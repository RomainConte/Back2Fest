import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const partners = [
  { name: 'CocaCola', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/Coca-Cola_logo 1.png') },
  { name: 'BlaBlaCar', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/BlaBlaCar-Logo 1.png') },
  { name: 'SNCF', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/Logo_SNCF_2011 1.png') },
  { name: 'RedBull', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/Logo-Red-Bull 1.png') },
  { name: 'Kronenbourg', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/Logo-kronenbourg-fb 1.png') },
  { name: 'Biarritz', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/logo-2 1.png') },
  { name: 'Brets', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/logo_brets-300x162 1.png') },
  { name: 'EDF', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/image 17.png') },
  { name: 'Celio', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/image 18.png') },
  { name: 'Cochonou', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/image 21.png') },
  { name: 'Bounty', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/image 20.png') },
  { name: 'Orange', src: require('/Users/nh/Desktop/uwuback/AwesomeProject/assets/logo-orange 1.png') },
];

const Credits = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#C15A5A" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Crédits</Text>
      </View>
      
      <Text style={styles.subHeader}>Nos partenaires</Text>
      
      <View style={styles.partnersContainer}>
        {partners.map((partner, index) => (
          <Image key={index} source={partner.src} style={styles.partnerImage} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#C15A5A', 
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    color: '#000',
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
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
});

export default Credits;
