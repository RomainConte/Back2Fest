// Artiste.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { firestore } from 'C:/cours/Back2Fest/Back2Fest/AwesomeProject/config/firebase.js';

const artiste = () => {
  const route = useRoute();
  const { artistIndex } = route.params;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistDoc = await firestore.collection('artiste').doc(`${artistIndex}`).get();
        if (artistDoc.exists) {
          setArtist(artistDoc.data());
        }
      } catch (error) {
        console.error("Error fetching artist data: ", error);
      }
    };

    fetchArtist();
  }, [artistIndex]);

  if (!artist) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: artist.imageUrl }} style={styles.image} />
        <Text style={styles.artistName}>{artist.name}</Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{artist.bio}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7B8',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  artistName: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bioContainer: {
    backgroundColor: '#F9E4D4',
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
  },
});

export default artiste;
