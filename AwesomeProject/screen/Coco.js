import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Coco = () => {
  const navigation = useNavigation(); 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="red"
          style={styles.backIcon}
          onPress={() => navigation.goBack()} 
        />
      </View>
      <View style={styles.qrContainer}>
        <Text style={styles.sectionTitle}>Mon QRCode</Text>
        <SvgQRCode value="QSI KE8 C7A" size={150} />
        <Text style={styles.qrCodeText}>QSI KE8 C7A</Text>
      </View>
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>72 Coco'Z</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Nombre de déchets ramassés</Text>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>172</Text>
          <Text style={styles.statsSubtitle}>Déchets jetés à la poubelle</Text>
        </View>
      </View>
      <View style={styles.rewardsContainer}>
        <Text style={styles.sectionTitle}>Les récompenses</Text>
        {renderRewardSection('Petites récompenses', 40, [
          require('../assets/Karris.png'),
          require('../assets/Karris.png'),
        ])}
        {renderRewardSection('Moyennes récompenses', 75, [], true)}
        {renderRewardSection('Grandes récompenses', 110, [], true)}
        {renderRewardSection('Énormes récompenses', 200, [], true)}
      </View>
    </ScrollView>
  );
};
 
const renderRewardSection = (title, requiredPoints, images, locked = false) => {
  return (
    <View style={styles.rewardSection}>
      <Text style={styles.rewardTitle}>
        {requiredPoints} image coco'Z {title}
      </Text>
      <View style={styles.rewardItems}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.rewardImage} />
        ))}
        {locked && (
          <View style={styles.lockedReward}>
            <Icon name="lock" size={24} color="#000" />
          </View>
        )}
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7B8',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  backIcon: {
    padding: 10,
    top: 20,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#D46C63',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  qrCodeText: {
    marginTop: 10,
    color: '#FFF',
  },
  coinContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  coinText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D46C63',
  },
  statsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statsText: {
    fontSize: 16,
    color: '#D46C63',
    marginBottom: 10,
  },
  statsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D46C63',
  },
  statsSubtitle: {
    marginLeft: 10,
    fontSize: 16,
    color: '#D46C63',
  },
  rewardsContainer: {
    margin: 20,
  },
  rewardSection: {
    marginVertical: 10,
  },
  rewardTitle: {
    fontSize: 18,
    color: '#D46C63',
    marginBottom: 10,
  },
  rewardItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  rewardImage: {
    width: 50,
    height: 50,
    margin: 5,
  },
  lockedReward: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
});
 
export default Coco;