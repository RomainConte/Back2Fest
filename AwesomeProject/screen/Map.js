import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      <View style={{ height: hp('6%') }} />
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
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('6%'),
    marginBottom: hp('5%'),
    textAlign: 'center',
    color: '#121212',
    fontFamily: 'Lemon-Regular',
  },
  mapImage: {
    width: '100%',
    height: hp('50%'),
    resizeMode: 'contain',
    borderRadius: wp('9%'),
  },
  legendTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginTop: hp('5%'),
    marginBottom: hp('1.25%'),
    marginLeft: wp('5.5%'),
    fontFamily: 'Lemon-Regular',
    color: '#121212',
  },
  legendContainer: {
    backgroundColor: '#C15A5A',
    borderRadius: wp('4.5%'),
    padding: wp('4%'),
    marginHorizontal: wp('5.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: wp('2%'),
    shadowOffset: { width: wp('1.75%'), height: wp('1.75%') },
    elevation: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp('8.125%'),
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4B979',
    borderRadius: wp('2.5%'),
    padding: wp('2.5%'),
    marginVertical: hp('0.625%'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: wp('1.25%'),
    shadowOffset: { width: wp('0.75%'), height: wp('0.75%') },
    elevation: 3,
  },
  legendImage: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('2.5%'),
    resizeMode: 'contain',
  },
  legendText: {
    fontSize: wp('3.5%'),
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
