import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function J1() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()} 
        />
        <Text style={styles.title}>Jour 1</Text>
      </View>
      <View style={styles.daysContainer}>
        {renderDayBox('Jour 1', '#C15A5A', [
          require('../assets/mairo2.png'), 
          require('../assets/NAPS.png'), 
          require('../assets/ZEU.png'), 
          require('../assets/JEUNE LION.png'), 
          require('../assets/JEUNEMORT.png'), 
          require('../assets/ZAMDANEE.png'), 
          require('../assets/h-jeunecrack-hologram-lo-collab-news-visu 1.png'), 
          require('../assets/lala-ce-photos-etalonnees-41-600x600 1.png'), 
          require('../assets/ROUHNA.png')
        ], navigation)}
      </View>
      <Text style={styles.dayTitle1}>Les autres jours :</Text>
      <View style={styles.daysContainer1}>
        {renderSmallDayBox('J2', 'Jour 2', '#E4B979', [
          require('../assets/LUIDJI.png'), 
          require('../assets/PLK.png'), 
          require('../assets/LOUS AND THE YAKUZA.png'), 
          require('../assets/site-bushi 2.png')
        ], navigation)}
        {renderSmallDayBox('J3', 'Jour 3', '#E4B979', [
          require('../assets/ZOLA.png'), 
          require('../assets/Luther 1.png'), 
          require('../assets/BIANCA COSTA.png'), 
          require('../assets/freeze_corleone_c_camulo_james 2.png')
        ], navigation)}    
        {renderSmallDayBox('J4', 'Jour 4', '#C15A5A', [
          require('../assets/YOUV DEEE.png'), 
          require('../assets/Yvnnis-300x300 1.png'), 
          require('../assets/La-feve-epicmag 2.png'), 
          require('../assets/LOUS AND THE YAKUZA.png')
        ], navigation)}
      </View>
    </ScrollView>
  );
}

const renderDayBox = (day, bgColor, images, navigation) => {
  return (
    <View style={[styles.boxbox]}>
      <View style={[styles.dayBox, { backgroundColor: bgColor }]}>
        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('artiste', { artistIndex: index })}>
              <Image source={image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const renderSmallDayBox = (day, dayb, bgColor, images, navigation) => {
  return (
    <View style={[styles.smallBox, { backgroundColor: bgColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate(day)}>
        <View style={styles.imageGridSmall}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image2} />
          ))}
        </View>
      </TouchableOpacity>
      <Text style={styles.dayTitle2}>{dayb}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backIcon: {
    padding: 10,
    position: 'absolute',
    left: 20,
    top: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
    color: '#121212',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: "20%",
  },
  daysContainer1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayBox: {
    width: '100%',
    height: 435,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 7, height: 7 }, 
    elevation: 5,
  },
  dayTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
    marginLeft: 20,
  },
  dayTitle2: {
    fontSize: 14,
    color: '#121212',
    textAlign: 'center',
    marginTop: 15,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  imageGridSmall: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: 80,
    height: 80,
    margin: 6,
    borderRadius: 17,
  },
  image2: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 13,
  },
  boxbox: {
    width: '95%',
    marginBottom: 40,
  },
  smallBox: {
    width: '30%',
    height: 120,
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 7, height: 7 }, 
    elevation: 5,
  },
});
