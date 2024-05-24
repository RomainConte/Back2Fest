import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const MapScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Carte du festival</Text>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('../assets/page map festival.png')} style={styles.mapImage} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
            <Image source={require('../assets/page map festival.png')} style={styles.modalImage} />
          </TouchableOpacity>
        </Modal>
      </View>
      <Text style={styles.legendTitle}>La légende</Text>
      <View style={styles.legendContainer}>
        {renderLegendItem(require('../assets/bin.png'), 'La Cocobox')}
        {renderLegendItem(require('../assets/ambulance.png'), 'Secours')}
        {renderLegendItem(require('../assets/camping.png'), 'camping')}
        {renderLegendItem(require('../assets/toilette.png'), 'Sanitaire')}
        {renderLegendItem(require('../assets/eau.png'), 'Points d’eau')}
        {renderLegendItem(require('../assets/batterie.png'), 'Points de recharge')}
        {renderLegendItem(require('../assets/scene.png'), 'Scènes')}
        {renderLegendItem(require('../assets/parking.png'), 'Aires de repos')}
        {renderLegendItem(require('../assets/foodtruck.png'), 'Foodtruck')}
        {renderLegendItem(require('../assets/vélo.png'), 'Porte vélo')}
        {renderLegendItem(require('../assets/taxi.png'), 'Taxis')}
        {renderLegendItem(require('../assets/bus.png'), 'Bus')}
        {renderLegendItem(require('../assets/parking.png'), 'Parkings')}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const renderLegendItem = (imageSource, text) => {
  return (
    <View style={styles.legendItem} key={text}>
      <Image source={imageSource} style={styles.legendImage} />
      <Text style={styles.legendText} numberOfLines={1}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 40,
    textAlign: 'center',
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  mapImage: {
    width: '100%',
    height: 380,
    resizeMode: 'contain',
    borderRadius: 35,
  },
  legendTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 22,
    fontFamily: 'Lemon-Regular',
    color: '#121212',
  },
  legendContainer: {
    backgroundColor: '#C15A5A',
    borderRadius: 18,
    padding: 15,
    marginHorizontal: 22,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 7, height: 7 },
    elevation: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 65,
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4B979',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
  },
  legendImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  legendText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Lemon-Regular',
    flexShrink: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default MapScreen;



