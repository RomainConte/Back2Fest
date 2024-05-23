import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Modal, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { getAuth } from "firebase/auth";
import { ref, onValue, update, push } from "firebase/database";
import { database } from "../config/firebase";

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
        <Text style={{ marginTop:-15 ,color: '#121212', fontSize: 23, fontWeight: 'bold', alignSelf: 'center'}}>
          Mes points
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10}}>
        <Text style={{...styles.sectionTitle1, marginTop: 30, color: '#121212'}}>Mon QR Code</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{
              ...styles.sectionTitle4, marginRight: 22, marginTop: 30, color: '#121212'
            }}>
              Agrandir mon QRcode 
              <Icon name="chevron-right" size={12} color="#121212" style={{ marginRight: 32, marginTop: 35 }} />
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{alignSelf: "left", fontSize: 18, paddingBottom:10  }}>Mon QR Code</Text>
              <View style={{
                backgroundColor: '#C15A5A', paddingTop: 35, paddingBottom: 80, paddingLeft: 35, paddingRight:35,
                borderRadius: 16,
              }}>
                <QRCode
                  value={qrData}
                  size={280}
                  color="white"
                  backgroundColor="transparent" 
                  style={{ alignItems: 'center',}}
                />
                <Text style={{alignSelf: "center", fontSize: 17, paddingTop:15, color: "#E4B979"  }}>
                  A scanner avant de jeter un déchet !
                </Text>
              </View>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#C15A5A" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.qrContainer}>
        <QRCode
          value={qrData}
          size={140}
          color="white"
          backgroundColor="transparent"
        />
      </View>
      <View style={styles.yellowContainer}></View>
      <Text style={{ ...styles.sectionTitle1 }}>Nombre de déchets ramassés</Text>
      <View style={styles.coinContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.coinText}>Vous avez jetés {userData.déchet || 0 } déchets à la poubelle</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Text style={{ ...styles.sectionTitle3, marginLeft:2 }}>Mes coco'Z</Text>
        <View style={styles.statsBox}>
          <Image source={require('../assets/cocopoint1.png')} style={{ marginRight: 5, width: 25, height: 25 }} />
          <Text style={{ ...styles.statsNumber, borderRadius: 10 }}>{ userData.cocoZ || 0 }</Text>
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
      <View style={{margin: 20 }}></View>

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
    marginBottom: 10,
    marginLeft: 22
  },
  sectionTitle2: {
    fontSize: 18,
    color: '#FAFAFA',
    marginBottom: 10,
    marginLeft: 22
  },
  sectionTitle3: {
    fontSize: 17,
    color: '#121212',
    marginLeft: 20,
    paddingBottom: 10,
    marginLeft: 22
  },
  sectionTitle4: {
    color: '#121212',
    paddingTop: 3,
  },
  qrCodeText: {
    marginTop: 6,
    color: '#FAFAFA',
  },
  coinContainer: {
    alignItems: 'left',
    marginLeft: 20,
    marginVertical: 10,
    backgroundColor: '#C15A5A',
    marginRight: 20,
    padding: 13,
    borderRadius: 10,
    paddingLeft: 24,
    marginTop: -0,
    marginBottom: 17,
  },
  coinText: {
    fontSize: 18,
    color: '#FAFAFA',
  },
  statsContainer: {
    alignItems: 'left',
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 32,
  },
  statsText: {
    fontSize: 16,
    color: '#121212',
    paddingBottom: 10,
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
  statsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FAFAFA',
    padding: 2,
  },
  statsSubtitle: {
    marginLeft: 2,
    fontSize: 18,
    color: '#FAFAFA',
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
    resizeMode: "contain",
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
    resizeMode: "contain",
  },
  rewardText: {
    position: 'absolute',
    top: 5,
    left: 10,
    fontSize: 15,
    color: '#121212',
    textAlign: 'center',
  },
  rewardCode: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: "#F5E5CB",
    height: "100%",
    width: "100%",
    paddingTop: "35%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#C15A5A",
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  overlayView: {
    margin: 20,
    backgroundColor: "#F5E5CB",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  overlayText: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center"
  },
   overlayText1: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  },
});

export default Coco;

