import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Coockies = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Politique de gestion des cookies</Text>
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
      <Text style={styles.item}>
        - Téléphone : 08 92 73 27 93
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#F9EFD1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    padding: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E06B6B',
    marginLeft: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 25,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  item: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default Coockies;
