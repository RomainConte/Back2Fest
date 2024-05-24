import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const FaqPage = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const faqData = [
    {
      question: "Quelle est la politique de remboursement?",
      answer: "Les remboursements sont possibles jusqu'à 30 jours avant le début du festival. Après cette date, aucun remboursement ne sera effectué.",
    },
    {
      question: "Comment suivre mes billets",
      answer: "Vous pouvez suivre votre commande de billets en utilisant le numéro de suivi fourni dans l'email de confirmation. Visitez notre page de suivi et entrez votre numéro de suivi.",
    },
    {
      question: "Le festival propose t-il un camping ?",
      answer: "Oui, le festival propose plusieurs options de camping, y compris des emplacements pour tentes et des options de glamping. Consultez notre site web pour plus de détails et pour réserver.",
    },
    {
      question: "Comment  contacter le service client?",
      answer: "Vous pouvez contacter notre service client par email à support@festival.com ou par téléphone au 1-800-123-4567. Nos heures de support sont du lundi au vendredi, de 9h à 17h.",
    },
    {
      question: "Quels modes de paiement sont acceptés?",
      answer: "Nous acceptons divers modes de paiement, y compris les cartes de crédit, les cartes de débit, PayPal et Apple Pay.",
    },
    {
      question: "Y aura-t-il des options alimentaires sur place?",
      answer: "Oui, une variété de stands de nourriture et de boissons seront disponibles sur le site du festival, y compris des options végétariennes et végétaliennes.",
    },
    {
      question: "Puis je entrer et sortir du festival ?",
      answer: "Pour des raisons de sécurité, les sorties et réentrées ne sont pas autorisées. Assurez-vous d'avoir tout ce dont vous avez besoin avant d'entrer.",
    },
    
  ];

  return (
   
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header1}>
            <Icon
              name="arrow-left"
              size={24}
              color="#C15A5A"
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>
              FAQ
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          {faqData.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.question}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                  name={expanded[index] ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#C15A5A"
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
              {expanded[index] && <Text style={styles.answerText}>{item.answer}</Text>}
            </View>
          ))}
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5E5CC', 
  },
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC', 
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 20,
  },
  faqItem: {
    marginBottom: 10,
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#C15A5A',
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontFamily: 'Lemon-Regular',
    paddingBottom: 10,
  },
  chevronIcon: {
    marginLeft: 10,
  },
  answerText: {
    marginTop: 10,
    paddingLeft: 14,
    fontSize: 12,
    color: '#4D4D4D',
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

export default FaqPage;
