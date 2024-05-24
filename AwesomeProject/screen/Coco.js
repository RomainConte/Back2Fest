import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Modal, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { getAuth } from "firebase/auth";
import { ref, onValue, update, push } from "firebase/database";
import { database } from "../config/firebase";
import { useFonts } from 'expo-font';

const rewardImages = {
  'bière 25cl': require('../assets/biere.png'),
  'Soda 33cl': require('../assets/soda.png'),
  'Boissons chaudes': require('../assets/boisson_chaude.png'),
  "Bouteilles d'eau 50cl": require('../assets/eau.png'),
  'Glace': require('../assets/glace.png'),
  'Burger': require('../assets/burger.png'),
  'Hot dog': require('../assets/hot_dog.png'),
  'Sandwich': require('../assets/sandwich.png'),
  'Barquette de frites M': require('../assets/frites_m.png'),
  'Burger et boissons': require('../assets/burger_boisson.png'),
  'Hot dog et boissons': require('../assets/hot_dog_boisson.png'),
  'Sandwich et boissons': require('../assets/sandwich_boisson.png'),
  'Barquette de frites L': require('../assets/frites_m.png'),
  'tee-shirt': require('../assets/tshirt.png'),
  'Casquette': require('../assets/casquette.png'),
  'Pull': require('../assets/pull.png'),
  "Porte clé": require('../assets/porte_cle.png'),
};

const Coco = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [rewards, setRewards] = useState([]);
  const [showPurchasedRewards, setShowPurchasedRewards] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `/users/${user.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        setUserData(snapshot.val());
        if (snapshot.val().recompense) {
          setRewards(Object.values(snapshot.val().recompense));
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const qrData = JSON.stringify({
    nom: userData.nom || 'N/A',
    prenom: userData.prenom || 'N/A',
    points: userData.cocoZ || 'N/A',
  });

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRewardClick = (price, rewardName) => {
    Alert.alert(
      'Confirmer l\'achat',
      `Voulez-vous acheter cette récompense pour ${price} Coco'Z ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            if (userData.cocoZ >= price) {
              const newPoints = userData.cocoZ - price;
              const rewardCode = generateRandomCode();
              const newReward = {
                recompense: rewardName,
                code: rewardCode,
              };

              const userRef = ref(database, `/users/${user.uid}`);
              const newRewardRef = push(ref(database, `/users/${user.uid}/recompense`));

              update(userRef, { cocoZ: newPoints })
                .then(() => update(newRewardRef, newReward))
                .then(() => Alert.alert('Achat effectué', `Votre achat a été réalisé avec succès. Code: ${rewardCode}`))
                .catch((error) => Alert.alert('Erreur', 'Une erreur est survenue lors de l\'achat.'));
            } else {
              Alert.alert('Solde insuffisant', 'Vous n\'avez pas assez de Coco\'Z pour cet achat.');
            }
          }
        },
      ]
    );
  };

  const handlePurchasedRewardClick = (reward) => {
    setSelectedReward(reward);
    setOverlayVisible(true);
  };

  const renderRewardSection = (title, requiredPoints, rewards, nbpoints) => {
    return (
      <View style={styles.rewardSection}>
        <Text style={styles.rewardTitle}>
          {requiredPoints} <Image source={require('../assets/cocopoint1.png')} style={{ width: 20, height: 20, marginTop: -2 }} /> {title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.rewardItems}>
            {rewards.map((reward, index) => (
              nbpoints < requiredPoints ? 
              <View key={index} style={styles.lockedReward}>
                <Icon name="lock" size={24} color="#000" />
              </View> :
              <TouchableOpacity key={index} onPress={() => handleRewardClick(requiredPoints, reward.recompense)}>
                <View style={styles.rewardImageContainer}>
                  <Text style={styles.rewardText}>{reward.recompense}</Text>
                  <Image source={rewardImages[reward.recompense]} style={styles.rewardImage} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderPurchasedRewards = () => {
    return (
      <View style={{ ...styles.rewardsContainer, backgroundColor: '#C15A5A', paddingLeft: 20, paddingRight: 20 }}>
        <View style={styles.purchasedRewardItems}>
          {rewards.map((reward, index) => (
            <TouchableOpacity key={index} style={styles.purchasedRewardItem} onPress={() => handlePurchasedRewardClick(reward)}>
              <View style={styles.purchasedRewardImageContainer}>
                <Text style={styles.rewardText}>{reward.recompense}</Text>
                <Image source={rewardImages[reward.recompense]} style={styles.purchasedRewardImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  if (!fontsLoaded) {
    return null; // Optionally, render a loading component
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#C15A5A"
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>
          Mes points
        </Text>
      </View>
      <View style={styles.qrHeader}>
        <Text style={styles.sectionTitle1}>Mon QR Code</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{...styles.sectionTitle4, }}>
            Agrandir mon QRcode {' '}
            <Icon name="chevron-right" size={12} color="#121212" />
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Mon QR Code</Text>
            <View style={styles.qrModalContainer}>
              <QRCode
                value={qrData}
                size={280}
                color="black"
                backgroundColor="transparent"
              />
              <Text style={styles.qrModalText}>
                A scanner avant de jeter un déchet !
              </Text>
            </View>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.qrContainer}>
        <QRCode
          value={qrData}
          size={140}
          color="white"
          backgroundColor="transparent"
        />
      </View>
      <View style={styles.yellowContainer}></View>
      <Text style={styles.sectionTitle1}>Nombre de déchets ramassés</Text>
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>Vous avez jetés {userData.déchet || 0} déchets à la poubelle</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle3}>Mes coco'Z</Text>
        <View style={styles.statsBox}>
          <Image source={require('../assets/cocopoint1.png')} style={styles.cocoPointIcon} />
          <Text style={styles.statsNumber}>{userData.cocoZ || 0}</Text>
          <Text style={styles.statsSubtitle}> Coco'Z</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.customButton, !showPurchasedRewards && styles.activeButton]}
          onPress={() => setShowPurchasedRewards(false)}
        >
          <Text style={[styles.buttonText, !showPurchasedRewards && styles.activeButtonText]}>Récompenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.customButton, showPurchasedRewards && styles.activeButton]}
          onPress={() => setShowPurchasedRewards(true)}
        >
          <Text style={[styles.buttonText, showPurchasedRewards && styles.activeButtonText]}>Mes récompenses</Text>
        </TouchableOpacity>
      </View>
      {!showPurchasedRewards ? (
        <View>
          <View style={{ ...styles.rewardsContainer, backgroundColor: '#C15A5A', paddingLeft: 20, paddingRight: 20 }}>
            {renderRewardSection('Petites récompenses', 40, [
              {image: require('../assets/biere.png'), recompense: 'bière 25cl'},
              {image: require('../assets/soda.png'), recompense: 'Soda 33cl'},
              {image: require('../assets/boisson_chaude.png'), recompense: 'Boissons chaudes'},
              {image: require('../assets/eau.png'), recompense: "Bouteilles d'eau 50cl"},
              {image: require('../assets/glace.png'), recompense: 'Glace'},
            ], userData.cocoZ || 0)}
            {renderRewardSection('Moyennes récompenses', 75, [
              {image: require('../assets/burger.png'), recompense: 'Burger'},
              {image: require('../assets/hot_dog.png'), recompense: 'Hot dog'},
              {image: require('../assets/sandwich.png'), recompense: 'Sandwich'},
              {image: require('../assets/frites_m.png'), recompense: "Barquette de frites M"}, 
            ], userData.cocoZ || 0)}
            {renderRewardSection('Grandes récompenses', 110, [
              {image: require('../assets/burger_boisson.png'), recompense: 'Burger et boissons'},
              {image: require('../assets/hot_dog_boisson.png'), recompense: 'Hot dog et boissons'},
              {image: require('../assets/sandwich_boisson.png'), recompense: 'Sandwich et boissons'},
              {image: require('../assets/frites_l.png'), recompense: "barquette de frites L"},
            ], userData.cocoZ || 0)}
            {renderRewardSection('Énormes récompenses', 200, [
              {image: require('../assets/tshirt.png'), recompense: 'tee-shirt'},
              {image: require('../assets/casquette.png'), recompense: 'Casquette'},
              {image: require('../assets/pull.png'), recompense: 'Pull'},
              {image: require('../assets/porte_cle.png'), recompense: "Porte clé"},
            ], userData.cocoZ || 0)}
          </View>
        </View>
      ) : (
        renderPurchasedRewards()
      )}
      <View style={{ margin: 20 }}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={overlayVisible}
        onRequestClose={() => setOverlayVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.overlayView}>
            {selectedReward && (
              <>
                <Text style={styles.overlayText1}>Récompense: {selectedReward.recompense}</Text>
                <Text style={styles.overlayText}>Code: {selectedReward.code}</Text>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => setOverlayVisible(false)}
                >
                  <Text style={styles.textStyle}>Fermer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7B8',
  },
  header: {
    padding: 10,
  },
  backIcon: {
    padding: 10,
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
  qrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#C15A5A',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  yellowContainer: {
    backgroundColor: '#E4B979',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 6,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sectionTitle1: {
    fontSize: 18,
    color: '#121212',
    marginLeft: 26,
    fontFamily: 'Lemon-Regular',
    paddingBottom: 10,
  },

  sectionTitle3: {
    fontSize: 18,
    color: '#121212',
    marginLeft: 7,
    fontFamily: 'Lemon-Regular',
    paddingBottom: 10,
  },
  sectionTitle4: {
    color: '#121212',
    marginRight: 22,
    fontFamily: 'Lemon-Regular',
    fontSize: 12,
    paddingBottom: 5,
    paddingRight: 2,
    
  },
  qrCodeText: {
    marginTop: 6,
    color: '#FAFAFA',
  },
  coinContainer: {
    alignItems: 'left',
    marginLeft: 20,
  
    backgroundColor: '#C15A5A',
    marginRight: 20,
    padding: 13,
    borderRadius: 10,
    paddingLeft: 24,
    marginBottom: 17,
  },
  coinText: {
    fontSize: 15,
    color: '#FAFAFA',
    fontFamily: 'Lemon-Regular',
  },
  statsContainer: {
    alignItems: 'left',
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 32,
  },
  statsText: {
    fontSize: 15,
    color: '#121212',
    paddingBottom: 10,
    fontFamily: 'Lemon-Regular',
  },
  statsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    backgroundColor: '#C15A5A',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  cocoPointIcon: {
    marginRight: 5,
    width: 25,
    height: 25,
  },
  statsNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FAFAFA',
    padding: 2,
    fontFamily: 'Lemon-Regular',
  },
  statsSubtitle: {
    marginLeft: 2,
    fontSize: 15,
    color: '#FAFAFA',
    fontFamily: 'Lemon-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  customButton: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
  },
  activeButton: {
    backgroundColor: '#C15A5A', 
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  buttonText: {
    color: '#C15A5A',  
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
  activeButtonText: {
    color: '#FAFAFA',
  },
  rewardsContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingBottom: 20,
  },
  rewardSection: {
    marginVertical: 10,
  },
  rewardTitle: {
    fontSize: 18,
    color: '#FAFAFA',
    marginBottom: 10,
    marginLeft: 8,
    fontFamily: 'Lemon-Regular',
  },
  rewardItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  rewardImageContainer: {
    width: 160,
    height: 160,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#E4B979',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    position: 'relative',
  },
  rewardImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  lockedReward: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  purchasedRewardItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
  },
  purchasedRewardItem: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  purchasedRewardImageContainer: {
    width: '100%',
    height: 160,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#E4B979',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    position: 'relative',
  },
  purchasedRewardImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  rewardText: {
    position: 'absolute',
    top: 5,
    left: 10,
    fontSize: 15,
    color: '#121212',
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
  rewardCode: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#F5E5CB',
    height: '100%',
    width: '100%',
    paddingTop: '35%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#C15A5A',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 60,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
  overlayView: {
    margin: 20,
    backgroundColor: '#F5E5CB',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  overlayText: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
  overlayText1: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Lemon-Regular',
  },
});

export default Coco;
