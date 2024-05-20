import React,  { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const nbpoints = 100;
const déchetjeté = 10;

const Coco = () => {
  const navigation = useNavigation(); 

const [modalVisible, setModalVisible] = useState(false);

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
         <Text style={{ marginTop:-15 ,color: '#121212', fontSize: 23, fontWeight: 'bold', alignSelf: 'center',
        }}>Mes points</Text>
      </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10}}>
    <Text style={{...styles.sectionTitle1, marginTop: 30, color: '#121212'}}>Mon QR Code</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{
              ...styles.sectionTitle4, marginRight: 22, marginTop: 30, color: '#121212'}}>Agrandir mon QRcode <Icon name="chevron-right" size={12} color="#121212" style={{ marginRight: 32, marginTop: 35 }} /></Text>
  </TouchableOpacity>
        </View>
        

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
          <View style={styles.centeredView}>
            
            <View style={styles.modalView}>
              <Text style={{alignSelf: "left", fontSize: 18, paddingBottom:10  }}>Mon QR Code</Text>
              <View style={{
                backgroundColor: '#C15A5A', paddingTop: 35, paddingBottom: 80, paddingLeft: 35, paddingRight:35,
      borderRadius: 16,
              }}>
                
                <SvgQRCode value="QSI KE8 C7A" size={300} />
                <Text style={{ alignSelf: "center", fontSize: 26, paddingTop: 15, color: "#FAFAFA" }}>QSI KE8 C7A  </Text>
                <Text style={{alignSelf: "center", fontSize: 17, paddingTop:15, color: "#E4B979"  }}>A scanner avant de jeter un déchet !</Text>
</View>
      

      <TouchableOpacity
        style={{ ...styles.openButton, backgroundColor: "#C15A5A" }}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textStyle}>Fermer</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



</View>
      <View style={styles.qrContainer}>
        <SvgQRCode value="QSI KE8 C7A" size={150}/>
        <Text style={styles.qrCodeText}>QSI KE8 C7A</Text>
      </View>

      <View style={styles.yellowContainer}></View>

      <Text style={{ ...styles.sectionTitle1, }}>Nombre de déchets ramassés</Text>
      <View style={styles.coinContainer}>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Text style={styles.coinText}>Vous avez jetés {déchetjeté} déchets à la poubelle</Text>
   
</View>
      </View>
      <View style={styles.statsContainer}>
        <Text style={{ ...styles.sectionTitle3, marginLeft:2}}>Mes coco'Z</Text>
        <View style={styles.statsBox}>
               <Image source={require('../assets/cocopoint1.png')} style={{ marginRight: 5, width: 25, height: 25 }} />
          <Text style={{ ...styles.statsNumber, borderRadius: 10, }}>{nbpoints}</Text>
          <Text style={styles.statsSubtitle}> Coco'Z</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle3}>Les récompenses</Text>
      <View style={{ ...styles.rewardsContainer, backgroundColor: '#C15A5A', paddingLeft: 20, paddingRight: 20 }}>
        

{renderRewardSection('Petites récompenses', 40, [
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
], nbpoints)}
        {renderRewardSection('Moyennes récompenses', 75, [
   require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
], nbpoints)}
        {renderRewardSection('Grandes récompenses', 110, [
     require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
], nbpoints)}
        {renderRewardSection('Énormes récompenses', 200, [
     require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
  require('../assets/Karris.png'),
], nbpoints)}
      </View>
      
      <View style={{margin: 20 }}></View>
        
    </ScrollView>
  );
};
 
const renderRewardSection = (title, requiredPoints, images, nbpoints) => {
  return (
    <View style={styles.rewardSection}>
      <Text style={styles.rewardTitle}>
        {requiredPoints} <Image source={require('../assets/cocopoint1.png')} style={{ width: 20, height: 20, marginTop: -2}}  /> {title}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.rewardItems}>
          {images.map((image, index) => (
            nbpoints < requiredPoints ? 
            <View key={index} style={styles.lockedReward}>
              <Icon name="lock" size={24} color="#000" />
            </View> :
            <Image key={index} source={image} style={styles.rewardImage} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7B8',
    
  },
  header: {

    padding: 10,
  },
  backIcon: {
    padding: 10,
    top: 20,
    marginTop:20,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#C15A5A',
    marginLeft: 20,
    marginRight: 20,
  marginTop: -10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 6,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
        shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  yellowContainer: {

    backgroundColor: '#E4B979',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 6,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
        shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,

  },



  sectionTitle1: {
    fontSize: 18,
    color: '#121212',
    marginBottom: 10,
    marginLeft: 22
  },

  sectionTitle2: {
    fontSize: 18,
    color: '#FAFAFA',
    marginBottom: 10,
     marginLeft: 22
  },

    sectionTitle3: {
    fontSize: 17,
    color: '#121212',
      marginLeft: 20,
      paddingBottom: 10,
     marginLeft: 22
  },
    
  sectionTitle4: {
  
    color: '#121212',
      
      paddingTop: 3,
     
  },
    



  qrCodeText: {
    marginTop: 6,
    color: '#FAFAFA',
  },
  coinContainer: {
    alignItems: 'left',
    marginLeft: 20,
    marginVertical: 10,
    backgroundColor: '#C15A5A',
    marginRight: 20,
    padding: 13,
    borderRadius: 10,
    paddingLeft: 24,
    marginTop: -0,
    marginBottom: 17,
  },
  coinText: {
    fontSize: 18,
   
    color: '#FAFAFA',
  },
  statsContainer: {
    alignItems: 'left',
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 32,

    
  },
  statsText: {
    
    fontSize: 16,
    color: '#121212',
    paddingBottom: 10,
  },
  statsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    backgroundColor: '#C15A5A',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FAFAFA',
    padding: 2,
   
    
  },
  statsSubtitle: {
    marginLeft: 2,
    fontSize: 18,
    color: '#FAFAFA',
  },
  rewardsContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 18,
        shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  rewardSection: {
    marginVertical: 10,
  },
  rewardTitle: {
    fontSize: 18,
    color: '#FAFAFA',
    marginBottom: 10,

   
  },
  rewardItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  
  },
  rewardImage: {
    width: 120,
    height: 120,
    margin: 5,
  },
  lockedReward: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },

    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    
    backgroundColor: "#F5E5CB",
    height: "100%",
    width: "100%",
   paddingTop: "35%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#C15A5A",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 60,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
 
export default Coco;