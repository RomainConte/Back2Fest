import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebase";
 


export default function J1() {
 const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState({}); // Utiliser l'état local pour stocker les données de l'utilisateur

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `/users/${user.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data); // Mettre à jour l'état avec les données de l'utilisateur
      });

      // Clean up the subscription on unmount
      return () => {
        unsubscribe();
      };
    }
  }, [user]);
    

    return (
      

    <ScrollView style={styles.container}>
         <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()} 
          /><Text style={{ ...styles.title, marginTop: 59, color: '#121212', fontSize: 23, fontWeight: 'bold', alignSelf: 'center', }}>Profil</Text>
        </View>

       <View style={styles.profileSection}>
  <Image
    source={{ uri: 'https://via.placeholder.com/100' }}
    style={styles.profileImage}
  />
  <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{ userData.prenom || "prenom" }</Text>
            <View style={{ position: 'absolute', left:-40, top: 13, }}>
              <Image source={require('../assets/mdi_pencil2.png')} style={{ width: 25, height: 25 }} />
              </View>
  </View>
        </View>
         <View style={styles.teamBadge}>
      <Text style={styles.teamText}>TEAM: ROUGE</Text>
    </View>

      <Text style={styles.title2}>Classement équipe :</Text>

      <View style={styles.teamList}>
        <View style={[styles.teamItem, styles.teamRed]}>
          <Text style={styles.rank}>01</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.teamImage}
          />
          <Text style={styles.teamName}>Équipe rouge</Text>
          <Text style={styles.teamPoints}>10 765</Text>
          
        </View>
        <View style={[styles.teamItem, styles.teamBlue]}>
          <Text style={styles.rank}>02</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.teamImage}
          />
          <Text style={styles.teamName}>Équipe bleu</Text>
          <Text style={styles.teamPoints}>9 197</Text>
          
        </View>
        <View style={[styles.teamItem, styles.teamGreen]}>
          <Text style={styles.rank}>03</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.teamImage}
          />
          <Text style={styles.teamName}>Équipe verte</Text>
          <Text style={styles.teamPoints}>7 171</Text>
          
        </View>
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
    marginBottom: 40,
    marginLeft: 22,
    color: '#121212',
  },
    title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 90,
    marginBottom: 10,
    marginLeft: 22,
    color: '#121212',
  },

    
    backIcon: {
      position: 'absolute',
      top: 60,
      left: 20,
  },
    
profileSection: {
  flexDirection: 'row', // Ajoutez cette ligne
  backgroundColor: '#FAFAFA',
  alignItems: 'center',
  paddingVertical: 20,
  paddingHorizontal: 20,
  height: 160
},
profileImage: {
  width: 100,
  height: 100,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: 'white',
  position: 'absolute',
  top: 100,
  left: 20,
},
profileInfo: {
  alignItems: 'flex-start', // Modifiez cette ligne
  position: 'absolute',
  top: 162,
  left: 130,
},
profileName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},
  teamBadge: {
    backgroundColor: '#C15A5A',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 22,
    borderRadius: 16,
    marginTop: 46,
    width: 140,
    
  },
  teamText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  teamList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginVertical: 5,
  },
  teamRed: {
    backgroundColor: '#C15A5A',
  },
  teamBlue: {
    backgroundColor: '#5A6AC1',
  },
  teamGreen: {
    backgroundColor: '#28AA3D',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  teamName: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  teamPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },

   
});



