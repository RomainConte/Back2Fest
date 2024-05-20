import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';







  const Programme = () => {
    
   
  return (
    <ScrollView style={styles.container}>
    
      <Text style={styles.title}>Programme :</Text>
      <View style={styles.daysContainer}>
        
        {renderDayBox('Jour 1',"J1", '#C15A5A', [
          require('../assets/mairo2.png'), 
          require('../assets/NAPS.png'), 
          require('../assets/ZEU.png'), 
          require('../assets/JEUNE LION.png'), 
        ])}
        {renderDayBox('Jour 2',"J2", '#E4B979', [
          require('../assets/LUIDJI.png'), 
          require('../assets/PLK.png'), 
          require('../assets/LOUS AND THE YAKUZA.png'), 
          require('../assets/site-bushi 2.png'), 
        ])}
        {renderDayBox('Jour 3',"J3", '#E4B979', [
          require('../assets/ZOLA.png'), 
          require('../assets/Luther 1.png'), 
          require('../assets/BIANCA COSTA.png'), 
          require('../assets/freeze_corleone_c_camulo_james 2.png'), 
        ])}
        {renderDayBox('Jour 4',"J4", '#C15A5A', [
          require('../assets/YOUV DEEE.png'), 
          require('../assets/Yvnnis-300x300 1.png'), 
          require('../assets/La-feve-epicmag 2.png'), 
          require('../assets/LOUS AND THE YAKUZA.png'), 
        ])}
      </View>
    </ScrollView>
  );
};

const renderDayBox = (day,pday, bgColor, images) => {
    const navigation = useNavigation();
  return (

<View style={[styles.boxbox,{flexDirection: 'column' }]} >
 <TouchableOpacity onPress={() => navigation.navigate(pday)}>
  <Text style={styles.dayTitle}>{day}</Text>
  <View style={[styles.dayBox, { backgroundColor: bgColor }]}>
    <View style={styles.imageGrid}>
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </View>
  </View>
</TouchableOpacity>
</View>
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
    marginBottom: 40,
    marginLeft: 22,
    color: '#121212',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal:10,
  },
dayBox: {
  width: '100%',
  marginVertical: 10,
  padding: 10,
  borderRadius: 30,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 8,
  shadowOffset: { width: 7, height: 7 }, 
  elevation: 5,
},
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: '43%',
    height: 70,
    margin: 5,
    borderRadius: 17,
  },

  boxbox: {
    width: '45%',
    marginBottom: 40,
   
  },
});

export default Programme;
