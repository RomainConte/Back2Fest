import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

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
                  style={[styles.imageWrapper, index === 1 && { width: 300, height: 300 }]}
                  onPress={() => {
                    console.log('Clicked artist index:', image.index); // Log the artist index
                    navigation.navigate('artiste', { artistIndex: image.index });
                  }}
                >
                  <Image source={image.src} style={[styles.image, index === 1 && { width: '100%', height: '100%' }]} />
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
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: 10,
    fontFamily: 'Lemon-Regular',
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 22,
    fontFamily: 'Lemon-Regular',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
    position: 'relative',
  },
  image: {
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
    width: 50,
    height: 50,
    paddingTop: 14,
    
    overflow: 'hidden',
    margin: 15,
    backgroundColor: '#F5E5CC',
  },
  profileImage: {
    width: 40,
    height: 28,
  },
  profileWrapper2: {
    width: 160,
    height: 60,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#F5E5CC',
    marginRight: '35%',
  },
  profileImage2: {
    width: 130,
    height: 50,
  },
  imagelabel: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: 'white',
    padding: 5,
    textAlign: 'right',
    fontFamily: 'Lemon-Regular',
    fontWeight: 'bold',
    fontSize: 18,
   
    borderRadius: 5,
  },
});

export default App;
