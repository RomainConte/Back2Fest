import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { database } from "../config/firebase";
import { useFonts } from 'expo-font'; 

export default function J1() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState({}); // Utiliser l'état local pour stocker les données de l'utilisateur
  const [profileImage, setProfileImage] = useState('https://i.pinimg.com/736x/c0/1b/10/c01b109bcb43eaffa1c2adb1ba0bebc5.jpg');
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `/users/${user.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data); // Mettre à jour l'état avec les données de l'utilisateur
        if (data && data.profileImage) {
          setProfileImage(data.profileImage); // Charger l'image de profil sauvegardée
        }
      });

      // Clean up the subscription on unmount
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const profileImages = [
    'https://play-lh.googleusercontent.com/WlUHWEdlhv_OrcgdY1KdLLHT3VWVyYkE41brvhpRr-o9vo9Y9o2ss9rH_WOkaML_4g',
    'https://art.ngfiles.com/images/2947000/2947278_mihar34_pfp.png?f1672060785',
    'https://static.planetminecraft.com/files/image/minecraft/blog/2022/925/15468320-pixel-frog_l.webp',
    'https://images.pexels.com/photos/9895332/pexels-photo-9895332.jpeg?cs=srgb&dl=pexels-ron-lach-9895332.jpg&fm=jpg'
  ];

  const selectProfileImage = (image) => {
    setProfileImage(image);
    setModalVisible(false);
    if (user) {
      const userRef = ref(database, `/users/${user.uid}`);
      update(userRef, { profileImage: image });
    }
  };

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
        <Text style={{ ...styles.title, marginTop: 59, color: '#121212', fontSize: 23, fontWeight: 'bold', alignSelf: 'center' }}>Profil</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{ userData.nom || "prenom" }</Text>
          <TouchableOpacity style={{ position: 'absolute', left: -40, top: 13 }} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/mdi_pencil2.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.teamBadge}>
        <Text style={styles.teamText}>TEAM: { userData.team }</Text>
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {profileImages.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => selectProfileImage(image)}>
                <Image source={{ uri: image }} style={styles.modalImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    fontFamily: 'Lemon-Regular',
    color: '#121212',
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 90,
    marginBottom: 10,
    marginLeft: 22,
    fontFamily: 'Lemon-Regular',
    color: '#121212',
  },
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: 160,
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
    alignItems: 'flex-start',
    position: 'absolute',
    top: 162,
    left: 130,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lemon-Regular',
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
    fontFamily: 'Lemon-Regular',
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
    fontFamily: 'Lemon-Regular',
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
    fontFamily: 'Lemon-Regular',
  },
  teamPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
    fontFamily: 'Lemon-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
});


