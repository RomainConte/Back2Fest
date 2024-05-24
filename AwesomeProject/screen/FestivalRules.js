import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const FestivalRules = () => {
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
          Interdit/Autorisé
        </Text>
      </View>
      <Text style={styles.description}>
        Bienvenue sur la page des éléments autorisés et interdits pour notre festival.
        Pour assurer la sécurité et le confort de tous les participants, veuillez prendre
        connaissance des articles suivants :
      </Text>
      <Text style={styles.subHeader}>Autorisé :</Text>
      <Text style={styles.item}>
        1. Bouteilles d'eau : Vous pouvez apporter des bouteilles d'eau en plastique scellées
        pour rester hydraté tout au long de l'événement.
      </Text>
      <Text style={styles.item}>
        2. Petits sacs à dos : Les sacs à dos de petite taille sont autorisés pour transporter vos effets personnels.
      </Text>
      <Text style={styles.item}>
        3. Crème solaire : Protégez-vous du soleil en apportant de la crème solaire.
      </Text>
      <Text style={styles.item}>
        4. Appareils photo : Vous pouvez apporter des appareils photo non professionnels pour capturer des souvenirs de l'événement.
      </Text>
       <Text style={styles.item}>
        5. Chapeaux et casquettes : Protégez-vous du soleil en portant des chapeaux ou des casquettes.
      </Text>
       <Text style={styles.item}>
        6. Argent liquide : Prévoyez de l'argent liquide pour les achats sur place.
      </Text>
      <Text style={styles.subHeader}>Interdit :</Text>
       <Text style={styles.item}>
        1. Armes : Les armes de toute sorte sont strictement interdites sur le site du festival.
      </Text>
       <Text style={styles.item}>
        2. Drogues et substances illicites : La consommation de drogues et de substances illicites est formellement interdite.
      </Text>
       <Text style={styles.item}>
        3. Bouteilles en verre : Les bouteilles en verre ne sont pas autorisées pour des raisons de sécurité.
      </Text>
       <Text style={styles.item}>
        4. Feux d'artifice : Les feux d'artifice et les pétards sont interdits sur le site.
      </Text>
       <Text style={styles.item}>
        5. Animaux de compagnie : Les animaux de compagnie ne sont pas autorisés, à l'exception des animaux d'assistance dûment identifiés.
      </Text>
       <Text style={styles.item}>
        6. Nourriture et boissons extérieures : La nourriture et les boissons provenant de l'extérieur ne sont pas autorisées.
      </Text>
      <Text style={styles.item1}>
        Merci de respecter ces règles pour garantir une expérience agréable et sûre pour tous les participants. Nous avons hâte de vous accueillir lors de notre festival !
      </Text>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5E5CC',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E06B6B',
    marginLeft: 10,
    fontFamily: 'Lemon-Regular',
  },
  description: {
    fontSize: 12,
    marginBottom: 25,
    fontFamily: 'Lemon-Regular',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
    color: '#C15A5A',
  },
  item: {
    fontSize: 12,
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
  },
  item1: {
    fontSize: 12,
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
    marginBottom: 40,
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

export default FestivalRules;
