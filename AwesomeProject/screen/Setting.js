import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#C15A5A" />;
  }

  return (
    <ScrollView style={styles.container}>
       <View style={styles.header1}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>
          Paramètres
        </Text>
      </View>

      <Text style={styles.header}>FireWave :</Text>
      <View style={styles.section}>
        <MenuItem title="FAQ" onPress={() => navigation.navigate('FaqPage')} />
        <MenuItem title="Interdits/autorisés" onPress={() => navigation.navigate('FestivalRules')} />
        <MenuItem title="Crédits" onPress={() => navigation.navigate('Credits')} />
        <MenuItem title="Modifier mes informations" onPress={() => navigation.navigate('EditProfileScreen')} />
      </View>

      <Text style={styles.header}>Infos pratiques :</Text>
      <View style={styles.section}>
        <MenuItem title="Accès" onPress={() => navigation.navigate('Acces')} />
        <MenuItem title="Camping" onPress={() => navigation.navigate('Camping')} />
        <MenuItem title="Conditions d'utilisation" onPress={() => navigation.navigate('TermsOfUse')} />
        <MenuItem title="Politique de confidentialité" onPress={() => navigation.navigate('Poli')} />
        <MenuItem title="Cookies" onPress={() => navigation.navigate('Cookies')} />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  backText: {
    fontSize: 24,
    color: '#D2691E',
    fontFamily: 'Lemon-Regular',
  },
  header: {
    fontSize: 18,
    color: '#C15A5A',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 8,
    fontFamily: 'Lemon-Regular',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 9,
    
  },
  menuItem: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Lemon-Regular',
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

export default App;
