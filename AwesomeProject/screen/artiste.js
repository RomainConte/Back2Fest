import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase.js';
import { Ionicons } from '@expo/vector-icons'; // Pour l'icône de retour
import { useNavigation } from '@react-navigation/native';

const Artiste = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { artistIndex } = route.params;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const artistRef = ref(database, `Artiste/${artistIndex}`);
    const unsubscribe = onValue(artistRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setArtist(data);
      } else {
        console.log('No data available');
      }
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [artistIndex]);

  if (!artist) {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={32} color="#C15A5A" />
          </TouchableOpacity>
        </View>
        <Text style={styles.textcenter}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color="#C15A5A" />
        </TouchableOpacity>
        <Text style={styles.artistName}>{artist.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: artist.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{artist.bio}</Text>
      </View>
      <View style={styles.detailsCard}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{artist.date}</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.timeText}>{artist.date1}</Text>
        </View>
        <View style={styles.artistInfoContainer}>
          <Image source={{ uri: artist.imageUrl }} style={styles.artistImage} />
          <View style={styles.artistDetails}>
            <Text style={styles.artistName1}>{artist.name}</Text>
            <Text style={styles.artistStage}>{artist.stage}</Text>
            <Text style={styles.artistDay}>{artist.time}</Text>
          </View>
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
  imageContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
    textAlign: 'center',
    flex: 1,
    marginRight: 60,
    marginTop: 10,
  },
  bioContainer: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 20,
    
    padding: 20,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    marginBottom: 40,

 
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
  verticalLine: {
    height: 2,
    flex: 1,
    backgroundColor: '#E4B979',
    marginHorizontal: 10,
  },
  artistInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#CCCCCC', 
    marginRight: 10,
  },
  artistDetails: {
    flex: 1,
  },
  artistStage: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  artistDay: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  artistName1: {
    fontSize: 17,
    color: '#121212',
    fontWeight: 'bold',
  },
  textcenter: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
    marginTop: 100,
  },
});

export default Artiste;
