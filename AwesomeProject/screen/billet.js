import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Image } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';
import { database } from '../config/firebase';
import { useFonts } from 'expo-font';
import QRCode from 'react-native-qrcode-svg';

const TicketPage = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showTicketsWithCamping, setShowTicketsWithCamping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkTicketStatus();
    });

    return unsubscribe;
  }, [navigation]);

  const checkTicketStatus = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      const ticketRef = ref(database, `users/${user.uid}/ticket`);
      const snapshot = await get(ticketRef);
      if (snapshot.exists() && snapshot.val() === true) {
        setHasTicket(true);
        // Fetch user data
        const userRef = ref(database, `users/${user.uid}`);
        const userDataSnapshot = await get(userRef);
        if (userDataSnapshot.exists()) {
          setUserData(userDataSnapshot.val());
        }
      } else {
        setHasTicket(false);
      }
    }
    setLoading(false);
  };

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  const handleUnGetTicket = async () => {
    await AsyncStorage.removeItem('hasTicket');
    setHasTicket(false);
    navigation.navigate('Main'); // Navigate to Home on button press
  };

  const handlePurchaseTicket = async (days, camping) => {
    const user = auth.currentUser;
    if (user) {
      const ticketRef = ref(database, `users/${user.uid}/ticket`);
      await set(ticketRef, true);
      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, {
        days,
        camping,
      });
      setHasTicket(true);
    }
  };

  const handleToggleTicketsWithCamping = () => {
    setShowTicketsWithCamping(!showTicketsWithCamping);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#C15A5A" />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C15A5A" />
      </View>
    );
  }

  if (hasTicket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title1}>Mon ticket</Text>
        {userData && (
          <>
           
          </>
        )}
        <Text style={styles.qrCodeLabel}>Mon ticket</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.qrContainer}>
            <QRCode
              value={"cocoZ"}
              size={140}
              color="white"
              backgroundColor="transparent"
            />
            <Text style={{ ...styles.ticketDetail, marginTop:20 }}>Prénom : {userData.nom}</Text>
            <Text style={styles.ticketDetail}>Nombre de jours : {userData.days}</Text>
            <Text style={styles.ticketDetail}>Camping : {userData.camping ? 'Oui' : 'Non'}</Text>
            
          </View>
          
        </TouchableOpacity>
         
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <QRCode
                value={"cocoZ"}
                size={300}
                color="black"
                backgroundColor="white"
              />

               <Text style={{ ...styles.ticketDetail2, marginTop:20 }}>Prénom : {userData.nom}</Text>
            <Text style={styles.ticketDetail2}>Nombre de jours : {userData.days}</Text>
            <Text style={styles.ticketDetail2}>Camping : {userData.camping ? 'Oui' : 'Non'}</Text>
              
             
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </Modal>
        <View style={styles.yellowContainer}></View>
        <Image source={require('../assets/ticket1.png')} style={{ marginLeft:10, marginTop: 40, width: 400, height: 125,  transform: [{ rotate: '-20deg' }] }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity style={[styles.switchButton, showTicketsWithCamping ? styles.switchButtonActive : styles.switchButtonInactive]} onPress={handleToggleTicketsWithCamping}>
          <Text style={[styles.switchButtonText, showTicketsWithCamping ? styles.switchButtonTextActive : styles.switchButtonTextInactive]}>Avec camping</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ticketContainer}>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 4 jours avec camping</Text>
          <Text style={styles.ticketPrice}>400 €</Text>
          <Text style={styles.ticketDays}>Jeu/Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(4, true)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 3 jours avec camping</Text>
          <Text style={styles.ticketPrice}>350 €</Text>
          <Text style={styles.ticketDays}>Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(3, true)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 2 jours avec camping</Text>
          <Text style={styles.ticketPrice}>250 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(2, true)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 1 jour avec camping</Text>
          <Text style={styles.ticketPrice}>125 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(1, true)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 4 jours sans camping</Text>
          <Text style={styles.ticketPrice}>350 €</Text>
          <Text style={styles.ticketDays}>Jeu/Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(4, false)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 3 jours sans camping</Text>
          <Text style={styles.ticketPrice}>300 €</Text>
          <Text style={styles.ticketDays}>Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(3, false)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 2 jours sans camping</Text>
          <Text style={styles.ticketPrice}>200 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(2, false)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 1 jour sans camping</Text>
          <Text style={styles.ticketPrice}>100 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={() => handlePurchaseTicket(1, false)}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.pack}>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5D7B8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  backButton: {
    paddingTop: 20,
    marginRight: 10,
    marginLeft: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  switchButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  switchButtonActive: {
    backgroundColor: '#C15A5A',
  },
  switchButtonInactive: {
    backgroundColor: '#E0E0E0',
  },
  switchButtonText: {
    fontWeight: 'bold',
    fontFamily: 'Lemon-Regular',
  },
  switchButtonTextActive: {
    color: '#FFFFFF',
  },
  switchButtonTextInactive: {
    color: '#A0A0A0',
  },
  ticketContainer: {
    paddingHorizontal: 20,
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
  ticketCard: {
    backgroundColor: '#C15A5A',
    borderRadius: 26,
    paddingVertical: 20,
    paddingBottom: 0,
    marginBottom: 40,
    alignItems: 'center',
    height: 180,
  },
  hidden: {
    display: 'none',
  },
 title1: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: -10,
    marginBottom: 40,
    textAlign: 'center',
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  sectionTitle1: {
     marginTop: 20,
    fontSize: 18,
    color: '#121212',
    marginLeft: 26,
    fontFamily: 'Lemon-Regular',
    paddingBottom: 20,

  },

  ticketPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FAFAFA',
    marginBottom: 10,
    fontFamily: 'Lemon-Regular',
  },
  ticketDays: {
    fontSize: 15,
    color: '#FAFAFA',
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
  },
  ticketButton: {
    backgroundColor: '#E4B979',
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    paddingBottom: 20,
    paddingTop: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  ticketButtonText: {
    color: '#FAFAFA',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Lemon-Regular',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D46C63',
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Lemon-Regular',
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#D46C63',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
  header1: {
    paddingTop: 10,
  },
  backIcon: {
    paddingBottom: 10,
    top: 20,
    marginTop: 20,
  },
  headerTitle: {
    marginTop: -15,
    marginBottom: 25,
    color: '#121212',
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'Lemon-Regular',
  },
  ticketDetail: {

    fontSize: 15,
    color: '#FAFAFA',
    fontFamily: 'Lemon-Regular',
    marginBottom: 15,
    marginHorizontal: 20,
  },
   ticketDetail2: {
    fontSize: 15,
    color: '#121212',
    fontFamily: 'Lemon-Regular',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  qrCodeLabel: {
    fontSize: 18,
    color: '#121212',
    fontFamily: 'Lemon-Regular',
    marginBottom: 10,
    marginTop: 40,
    marginHorizontal: 20,
  },
  pack: {
    backgroundColor: '#F5D7B8',
    height: 200,
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
    paddingBottom: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#D46C63',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
});

export default TicketPage;


