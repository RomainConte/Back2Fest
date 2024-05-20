import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';



export default function J3() {
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
              /><Text style={{ ...styles.title, marginTop:59 ,color: '#121212', fontSize: 23, fontWeight: 'bold', alignSelf: 'center', }}>Jour 3 </Text>
      </View>
      
      <View style={styles.daysContainer}>
        
    {renderDayBox('Jour 3', '#E4B979', [
require('../assets/ZOLA.png'), 
          require('../assets/Luther 1.png'), 
          require('../assets/BIANCA COSTA.png'), 
          require('../assets/freeze_corleone_c_camulo_james 2.png'), 
            require('../assets/Rectangle 725.png'), 
            require('../assets/AUPINARD.png'), 
          require('../assets/Yame.png'), 
            require('../assets/Bolzed 1.png'), 
          require('../assets/KAY THE PRODIGY.png'), 
])}
          </View>
          
          <Text style={{ ...styles.dayTitle1, marginLeft: 20, }}>Les autres jours :</Text>
<View style={styles.daysContainer1}>
    
  {renderSmallDayBox('J1','Jour 1', '#C15A5A', [
   require('../assets/mairo2.png'), 
          require('../assets/NAPS.png'), 
          require('../assets/ZEU.png'), 
          require('../assets/JEUNE LION.png'), 

  ])}
   {renderSmallDayBox('J2','Jour 2', '#E4B979', [
         require('../assets/LUIDJI.png'), 
          require('../assets/PLK.png'), 
          require('../assets/LOUS AND THE YAKUZA.png'), 
          require('../assets/site-bushi 2.png'), 
   ])}    
        {renderSmallDayBox('J4','Jour 4', '#C15A5A', [
         require('../assets/YOUV DEEE.png'), 
          require('../assets/Yvnnis-300x300 1.png'), 
          require('../assets/La-feve-epicmag 2.png'), 
          require('../assets/LOUS AND THE YAKUZA.png'), 
        ])}   
              
    
</View>

          
      </ScrollView>
      
      
  );
};

const renderDayBox = (day, bgColor,images ) => {
  return (

<View style={[styles.boxbox]} >
  <View style={[styles.dayBox, { backgroundColor: bgColor }]}>
    <View style={styles.imageGrid}>
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </View>
          </View>
          
</View>
  );
};

const renderSmallDayBox = (day,dayb, bgColor, images) => {
     const navigation = useNavigation();
  return (
      <View style={[styles.smallBox, { backgroundColor: bgColor }]}>
          <TouchableOpacity onPress={() => navigation.navigate(day)}>
      <View style={styles.imageGrid}>
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
      marginHorizontal: 10,
    marginBottom: "20%",
    },
  
 daysContainer1: {

  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginHorizontal:10,
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
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
    textAlign: 'center',
    marginBottom: 10,
    },
  
    dayTitle1: {
     
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
        
    
   
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
  image: {
    width: '30%',
    height: 105,
      margin: 6,
    marginBottom: 30,
    borderRadius: 17,
    },
  
   image2: {
    width: '40%',
    height: 40,
    margin: 5,
    borderRadius: 13,
  },

  boxbox: {
      width: '95%',
      height: "50%",
    marginBottom: 40,
   
    },
  
  
    smallBox: {
    width: '30%', // Change this to the width you want
    height: 120, // Change this to the height you want
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 7, height: 7 }, 
    elevation: 5,
    },
    
    backIcon: {
      position: 'absolute',
      top: 60,
      left: 20,
    },

   
});



