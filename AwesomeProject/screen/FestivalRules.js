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
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Interdits/autorisés</Text>
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
    fontFamily: 'Lemon-Regular',
  },
  description: {
    fontSize: 18,
    marginBottom: 25,
    fontFamily: 'Lemon-Regular',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
  },
  item: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Lemon-Regular',
  },
});

export default FestivalRules;
