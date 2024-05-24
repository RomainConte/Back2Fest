import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Lemon-Regular': require('../assets/fonts/Lemon-Regular.ttf'),
  });

  const data = {
    days: [
      {
        day: 'En ce moment',
        images: [
          { src: require('../assets/La-feve-epicmag 2.png'), index: 29, name: 'La Feve' },
          { src: require('../assets/NAPS.png'), index: 1, name: 'NAPS' },
        ],
      },
      {
        day: 'À ne pas manquer',
        images: [
          { src: require('../assets/Rectangle 725.png'), index: 22, name: 'Josman' },
          { src: require('../assets/Luther 1.png'), index: 19, name: 'Luther' },
          { src: require('../assets/ZOLA.png'), index: 18, name: 'ZOLA' },
          { src: require('../assets/Houdi 1.png'), index: 22, name: 'Houdi' },
          { src: require('../assets/BIANCA COSTA.png'), index: 20, name: 'Bianca Costa' },
        ],
      },
    ],
  };

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileWrapper2}>
          <Image source={require('../assets/logo noir sans fong.png')} style={styles.profileImage2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileWrapper} onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/menu1.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      {data.days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.day}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              {day.images.slice(0, 5).map((image, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.imageWrapper, index === 1 && styles.imageWrapperLarge]}
                  onPress={() => {
                    console.log('Clicked artist index:', image.index); // Log the artist index
                    navigation.navigate('artiste', { artistIndex: image.index });
                  }}
                >
                  <Image source={image.src} style={[styles.image, index === 1 && styles.imageLarge]} />
                  <Text style={styles.imagelabel}>{image.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('7.5%'),
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginVertical: hp('2.5%'),
    paddingLeft: wp('2.5%'),
    fontFamily: 'Lemon-Regular',
  },
  dayContainer: {
    marginBottom: hp('2.5%'),
  },
  dayTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginLeft: wp('5.5%'),
    fontFamily: 'Lemon-Regular',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: wp('2.5%'),
  },
  imageWrapper: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('2.5%'),
    overflow: 'hidden',
    margin: wp('1.25%'),
    position: 'relative',
  },
  imageWrapperLarge: {
    width: wp('75%'),
    height: wp('75%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLarge: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    backgroundColor: '#F5E5CC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileWrapper: {
    width: wp('12.5%'),
    height: wp('12.5%'),
    paddingTop: hp('1.75%'),
    overflow: 'hidden',
    margin: wp('3.75%'),
    backgroundColor: '#F5E5CC',
  },
  profileImage: {
    width: wp('10%'),
    height: wp('7%'),
  },
  profileWrapper2: {
    width: wp('40%'),
    height: hp('7.5%'),
    overflow: 'hidden',
    margin: wp('2.5%'),
    backgroundColor: '#F5E5CC',
    marginRight: wp('35%'),
  },
  profileImage2: {
    width: wp('32.5%'),
    height: hp('6.25%'),
  },
  imagelabel: {
    position: 'absolute',
    bottom: hp('1.25%'),
    right: wp('2.5%'),
    color: 'white',
    padding: wp('1.25%'),
    textAlign: 'right',
    fontFamily: 'Lemon-Regular',
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    borderRadius: wp('1.25%'),
  },
});

export default App;
