import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const TermsOfUse = () => {
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
          Conditions d'utilisation
        </Text>
      </View>
      
      <Text style={styles.sectionTitle}>Acceptation des conditions</Text>
      <Text style={styles.paragraph}>
        En téléchargeant, installant ou utilisant notre application, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.
      </Text>
      
      <Text style={styles.sectionTitle}>Utilisation de l'application</Text>
      <Text style={styles.paragraph}>
        Vous êtes autorisé à utiliser notre application à des fins personnelles et non commerciales. Vous ne devez pas utiliser notre application de manière à causer des dommages à notre application ou à porter atteinte à la disponibilité ou à l'accessibilité de l'application.
      </Text>
      
      <Text style={styles.sectionTitle}>Contenu de l'utilisateur</Text>
      <Text style={styles.paragraph}>
        Vous pouvez contribuer au contenu de notre application en soumettant des commentaires, des suggestions ou d'autres contributions. En soumettant du contenu, vous accordez à Firewave une licence mondiale, irrévocable, non exclusive et libre de redevance pour utiliser, reproduire, modifier, adapter, publier, traduire et distribuer votre contenu dans le cadre de notre application.
      </Text>
      
      <Text style={styles.sectionTitle}>Responsabilités</Text>
      <Text style={styles.paragraph}>
        Firewave ne sera pas responsable de tout dommage direct, indirect, spécial, consécutif ou accidentel résultant de votre utilisation de notre application. Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité Firewave, ses filiales, ses employés et ses partenaires.
      </Text>
      
      <Text style={styles.sectionTitle}>Modification des conditions</Text>
      <Text style={styles.paragraph}>
        Firewave se réserve le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur notre application. Il est de votre responsabilité de consulter régulièrement ces conditions pour prendre connaissance de toute modification.
      </Text>
      
      <Text style={styles.contactInfo}>
        Pour toute question concernant nos conditions d'utilisation, veuillez nous contacter à :
        E-mail : Firewave@gmail.com
        Téléphone : 08 92 73 27 93
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#C15A5A',
    fontFamily: 'Lemon-Regular',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 15,
    fontFamily: 'Lemon-Regular',
  },
  contactInfo: {
    fontSize: 12,
    marginTop: 15,
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

export default TermsOfUse;
