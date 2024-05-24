import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Coockies = () => {
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
          Cookies
        </Text>
      </View>
      <Text style={styles.description}>
        Cette politique de gestion des cookies explique comment Firewave utilise les cookies et technologies similaires sur son application mobile.
      </Text>
      <Text style={styles.subHeader}>Qu'est-ce qu'un cookie ?</Text>
      <Text style={styles.item}>
        - Un cookie est un petit fichier texte placé sur votre appareil lorsque vous utilisez notre application. Il nous permet de reconnaître votre appareil et de mémoriser des informations sur vos préférences ou actions précédentes.
      </Text>
      <Text style={styles.subHeader}>Quels types de cookies utilisons-nous ?</Text>
      <Text style={styles.item}>
        - Nous utilisons des cookies strictement nécessaires qui sont essentiels au fonctionnement de notre application et vous permettent d'utiliser ses fonctionnalités de base. Ces cookies incluent ceux nécessaires au processus de paiement lorsque vous achetez des billets pour notre festival.
      </Text>
      <Text style={styles.subHeader}>Comment contrôler les cookies ?</Text>
      <Text style={styles.item}>
        - Vous pouvez contrôler et gérer les cookies dans les paramètres de votre appareil ou de votre navigateur. Vous pouvez également supprimer les cookies déjà stockés sur votre appareil. Cependant, veuillez noter que la désactivation des cookies peut affecter le fonctionnement de certaines parties de notre application.
      </Text>
      <Text style={styles.subHeader}>Consentement</Text>
      <Text style={styles.item}>
        - En utilisant notre application, vous consentez à l'utilisation des cookies conformément à cette politique de gestion des cookies. Si vous n'acceptez pas l'utilisation de cookies, veuillez ne pas utiliser notre application ou désactiver les cookies dans les paramètres de votre appareil ou de votre navigateur.
      </Text>
      <Text style={styles.subHeader}>Contactez-nous</Text>
      <Text style={styles.item}>
        - E-mail : Firewave@gmail.com
      </Text>
      <Text style={styles.item2}>
        - Téléphone : 08 92 73 27 93
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    color: '#C15A5A',
  },
  item: {
    fontSize: 12,
    marginBottom: 15,
    fontFamily: 'Lemon-Regular',
  },
   item2: {
    fontSize: 12,
    marginBottom: 15,
     fontFamily: 'Lemon-Regular',
    marginBottom: 40,
  },
      header1: {
    paddingTop: 10,
  },
  backIcon: {
    paddingBottom: 10,
    top: 0,
    marginTop: 20,
  },
  headerTitle: {
    marginTop: -35,
    
    textAlign: 'center',
    marginBottom: 25,
    color: '#121212',
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'Lemon-Regular',
  },
});

export default Coockies;
