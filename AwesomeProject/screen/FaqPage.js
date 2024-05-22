import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FaqPage = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#C15A5A" />
          </TouchableOpacity>
          <Text style={styles.headerText}>FAQ</Text>
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
                />
              </TouchableOpacity>
              {expanded[index] && <Text style={styles.answerText}>{item.answer}</Text>}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5E5CC', // Couleur de fond
  },
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC', // Couleur de fond
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#C15A5A',
    fontWeight: 'bold',
    fontFamily: 'Lemon',
  },
  content: {
    paddingTop: 20,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C15A5A',
  },
  questionText: {
    fontSize: 18,
    color: '#1C1C1C',
    fontWeight: 'bold',
  },
  answerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default FaqPage;
