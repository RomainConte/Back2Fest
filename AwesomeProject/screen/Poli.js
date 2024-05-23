import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Poli = () => {
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
        <Text style={styles.headerText}>Politique de confidentialité</Text>
      </View>
      <Text style={styles.description}>
        Cette Politique de confidentialité régit la manière dont Firewave collecte, utilise, conserve et divulgue les informations collectées auprès des utilisateurs de l'application Firewave.
      </Text>
      <Text style={styles.subHeader}>Informations personnelles collectées :</Text>
      <Text style={styles.item}>
        - Nous pouvons collecter des informations personnelles des Utilisateurs de différentes manières, y compris, mais sans s'y limiter, lorsque les Utilisateurs utilisent notre application, passent une commande de billet et en relation avec d'autres activités, services, fonctionnalités ou ressources que nous mettons à disposition sur notre Application. Les types d'informations personnelles collectées peuvent inclure le nom, le prénom, l'âge, l'adresse e-mail et les données bancaires, le cas échéant.
      </Text>
      <Text style={styles.subHeader}>Cookies et technologies similaires :</Text>
      <Text style={styles.item}>
        - Notre Application peut utiliser des technologies de suivi telles que des cookies pour améliorer l'expérience utilisateur. Ces cookies sont utilisés uniquement lors du processus de paiement pour prendre un billet et ne sont pas utilisés à d'autres fins. Si vous créez un compte, vous acceptez les cookies ainsi que la politique de confidentialité.
      </Text>
      <Text style={styles.subHeader}>Utilisation des informations collectées :</Text>
      <Text style={styles.item}>
        - Firewave peut collecter et utiliser les informations personnelles des Utilisateurs pour les besoins suivants : Pour personnaliser l'expérience utilisateur lors de l'utilisation de l'application, Pour traiter les paiements et délivrer les billets achetés, Pour améliorer nos services et produits.
      </Text>
      <Text style={styles.subHeader}>Partage des informations personnelles :</Text>
      <Text style={styles.item}>
        - Nous ne vendons, n'échangeons et ne louons pas les informations personnelles des Utilisateurs à des tiers. Toutes les informations collectées sont utilisées uniquement dans le cadre de la fourniture de nos services et sont strictement confidentielles.
      </Text>
      <Text style={styles.subHeader}>Contrôle des données par les Utilisateurs :</Text>
      <Text style={styles.item}>
        - Les Utilisateurs ont un contrôle total sur leurs données personnelles. Ils peuvent demander à accéder, modifier ou supprimer leurs informations personnelles en nous contactant via les coordonnées fournies ci-dessous.
      </Text>
      <Text style={styles.subHeader}>Contactez-nous :</Text>
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

export default Poli;
