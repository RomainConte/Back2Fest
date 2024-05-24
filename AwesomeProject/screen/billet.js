import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SvgQRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { database } from '../config/firebase';

const TicketPage = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [hasTicket, setHasTicket] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showTicketsWithCamping, setShowTicketsWithCamping] = useState(false);

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

  const handlePurchaseTicket = async () => {
    const user = auth.currentUser;
    if (user) {
      const ticketRef = ref(database, `users/${user.uid}/ticket`);
      await set(ticketRef, true);
      setHasTicket(true);
    }
  };

  const handleToggleTicketsWithCamping = () => {
    setShowTicketsWithCamping(!showTicketsWithCamping);
  };

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
        <Text style={styles.title}>Mon Billet</Text>
        {userData && (
          <>
            <Text style={styles.label}>Nom : {userData.nom}</Text>
            <Text style={styles.label}>Prénom : {userData.prénom}</Text>
          </>
        )}
        <View style={styles.qrCodeContainer}>
          <SvgQRCode value="QSI KE8 C7A" size={150} />
        </View>
        <TouchableOpacity onPress={handleUnGetTicket} style={styles.button}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color="#C15A5A" />
        </TouchableOpacity>
      </View>
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
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 3 jours avec camping</Text>
          <Text style={styles.ticketPrice}>350 €</Text>
          <Text style={styles.ticketDays}>Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 2 jours avec camping</Text>
          <Text style={styles.ticketPrice}>250 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 1 jour avec camping</Text>
          <Text style={styles.ticketPrice}>125 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 4 jours sans camping</Text>
          <Text style={styles.ticketPrice}>350 €</Text>
          <Text style={styles.ticketDays}>Jeu/Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 3 jours sans camping</Text>
          <Text style={styles.ticketPrice}>300 €</Text>
          <Text style={styles.ticketDays}>Ven/Sam/Dim</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 2 jours sans camping</Text>
          <Text style={styles.ticketPrice}>200 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.ticketCard, !showTicketsWithCamping ? null : styles.hidden]}>
          <Text style={styles.ticketTitle}>Pass 1 jour sans camping</Text>
          <Text style={styles.ticketPrice}>100 €</Text>
          <Text style={styles.ticketDays}>En vente</Text>
          <TouchableOpacity style={styles.ticketButton} onPress={handlePurchaseTicket}>
            <Text style={styles.ticketButtonText}>En vente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7B8',
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
  ticketCard: {
    backgroundColor: '#C15A5A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
  ticketTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ticketPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ticketDays: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  ticketButton: {
    backgroundColor: '#F5D7B8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ticketButtonText: {
    color: '#C15A5A',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D46C63',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
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
  },
});

export default TicketPage;
