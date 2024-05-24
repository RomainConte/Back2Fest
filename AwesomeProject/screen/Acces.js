import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Acces = () => {
  const navigation = useNavigation();
     const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header1}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>
          Accès
        </Text>
      </View>
      <Text style={styles.description}>
        Bienvenue sur la page des informations d'accès à notre événement. Pour faciliter votre venue et garantir une expérience sans encombre, veuillez prendre connaissance des informations suivantes:
      </Text>
      <Text style={styles.subHeader}>Autorisé :</Text>
      <Text style={styles.item}>
        - Billets : Assurez-vous d'avoir votre billet d'entrée valide pour accéder à l'événement.
      </Text>
      <Text style={styles.item}>
        - Passeport ou pièce d'identité : Prévoyez une pièce d'identité en cours de validité pour des vérifications à l'entrée.
      </Text>
      <Text style={styles.item}>
        - Transports en commun : Nous encourageons l'utilisation des transports en commun pour réduire l'impact sur l'environnement et faciliter l'accès au site.
      </Text>
      <Text style={styles.item}>
        - Navettes : Des navettes peuvent être mises en place depuis des points de rendez-vous désignés pour faciliter votre trajet jusqu'au site de l'événement.
      </Text>
      <Text style={styles.subHeader}>Interdit :</Text>
      <Text style={styles.item}>
        - Accès sans billet : L'accès au site de l'événement est strictement réservé aux détenteurs de billets valides.
      </Text>
      <Text style={styles.item}>
        - Véhicules non autorisés : Les véhicules privés ne sont pas autorisés sur le site, à l'exception des véhicules d'urgence et des navettes autorisées.
      </Text>
      <Text style={styles.item}>
        - Objets encombrants : Les objets encombrants ou volumineux ne sont pas autorisés sur le site de l'événement.
      </Text>
      <Text style={styles.item}>
        - Passage non autorisé : Tout passage par des zones restreintes ou des zones réservées au personnel est strictement interdit.
      </Text>
      <Text style={styles.footerText}>
        Merci de votre coopération pour garantir un accès fluide et sécurisé à notre événement. Nous sommes impatients de vous accueillir et de vous offrir une expérience mémorable.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5E5CC',
  },

  description: {
    fontSize: 12,
    marginBottom: 25,
    fontFamily: 'Lemon-Regular',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'Lemon-Regular',
  },
  item: {
    fontSize: 13,
    marginBottom: 15,
    fontFamily: 'Lemon-Regular',
  },
  footerText: {
    fontSize: 12,
    marginTop: 20,
    fontFamily: 'Lemon-Regular',
    marginBottom : 40,
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
});

export default Acces;
