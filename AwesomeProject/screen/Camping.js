import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Camping = () => {
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
        <Text style={styles.headerText}>Règles du Camping</Text>
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
      <Text style={styles.item}>
        - Nous encourageons une atmosphère conviviale et respectueuse entre tous les campeurs. Soyez attentifs aux besoins des autres et prêts à offrir votre aide si nécessaire.
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

export default Camping;
