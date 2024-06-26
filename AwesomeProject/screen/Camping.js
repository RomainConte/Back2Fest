import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Camping = () => {
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
          règles du camping
        </Text>
      </View>
      <Text style={styles.description}>
        Bienvenue dans notre havre de tranquillité en pleine nature! Afin que chacun puisse profiter pleinement de son séjour, veuillez prendre connaissance des règles suivantes:
      </Text>
      <Text style={styles.subHeader}>Respect de l'environnement :</Text>
      <Text style={styles.item}>
        - Nous sommes fiers de notre environnement naturel. Aidez-nous à le préserver en respectant les zones désignées pour les feux de camp et le tri sélectif des déchets.
      </Text>
      <Text style={styles.subHeader}>Heures de tranquillité :</Text>
      <Text style={styles.item}>
        - Pour le bien-être de tous, veuillez respecter les heures de tranquillité entre 22h00 et 7h00. Nous encourageons le calme et la sérénité pendant ces heures.
      </Text>
      <Text style={styles.subHeader}>Animaux de compagnie :</Text>
      <Text style={styles.item}>
        - Les animaux de compagnie sont les bienvenus, mais veuillez les tenir en laisse et nettoyer après eux. Assurez-vous également qu'ils ne perturbent pas les autres campeurs.
      </Text>
      <Text style={styles.subHeader}>Feux de camp :</Text>
      <Text style={styles.item}>
        - Les feux de camp ne sont autorisés que dans les emplacements désignés. Veillez à les surveiller en tout temps et à les éteindre complètement avant de quitter.
      </Text>
      <Text style={styles.subHeader}>Utilisation des installations :</Text>
      <Text style={styles.item}>
        - Respectez les règles concernant l'utilisation des douches, toilettes et autres installations communes. Veillez à laisser ces espaces propres et ordonnés pour les autres campeurs.
      </Text>
      <Text style={styles.subHeader}>Sécurité :</Text>
      <Text style={styles.item}>
        - Assurez-vous de respecter les consignes de sécurité, notamment en matière de circulation des véhicules et d'accès aux zones dangereuses telles que les falaises ou les cours d'eau.
      </Text>
      <Text style={styles.subHeader}>Convivialité :</Text>
      <Text style={styles.item1}>
        - Nous encourageons une atmosphère conviviale et respectueuse entre tous les campeurs. Soyez attentifs aux besoins des autres et prêts à offrir votre aide si nécessaire.
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

  backIcon: {
    padding: 10,
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
    fontSize: 12,
    marginBottom: 15,
    fontFamily: 'Lemon-Regular',
    
  },
  item1: {
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

export default Camping;
