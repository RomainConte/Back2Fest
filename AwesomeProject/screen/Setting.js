import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const App = () => {
  const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>FireWave :</Text>
      <View style={styles.section}>
        <MenuItem title="FAQ" onPress={() => navigation.navigate('FaqPage')} />
        <MenuItem title="Interdits/autorisés" onPress={() => navigation.navigate('FestivalRules')}/>
        <MenuItem title="Crédits" onPress={() => navigation.navigate('Credits')} />
        <MenuItem title="Modifier mes informations" onPress={() => navigation.navigate('EditProfileScreen')}/>
        
      </View>

      <Text style={styles.header}>Infos pratiques :</Text>
      <View style={styles.section}>
      
        <MenuItem title="Acces"  onPress={() => navigation.navigate('Acces')} />
        <MenuItem title="Camping" onPress={() => navigation.navigate('Acces')}/>
        <MenuItem title="Conditions d'utilisation" onPress={() => navigation.navigate('TermsOfUse')} />
        <MenuItem title="Politique de confidentialité" onPress={() => navigation.navigate('Poli')}/>
        <MenuItem title="Cookies" onPress={() => navigation.navigate('Coockies')} />
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
    backgroundColor: '#FAEBD7', 
  },
  backButton: {
    margin: 10,
  },
  backText: {
    fontSize: 24,
    color: '#D2691E', 
    fontFamily: 'Lemon-Regular',
  },
  header: {
    fontSize: 24,
    color: '#C15A5A', 
    marginLeft: 20,
    marginTop: 20,
    fontFamily: 'Lemon-Regular',
  },
  section: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Lemon-Regular',
  },
});

export default App;
