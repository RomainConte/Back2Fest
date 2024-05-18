import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // backicon temporaire
import Icon from 'react-native-vector-icons/FontAwesome'; // backicon temporaire
const Profil = () => {
  const navigation = useNavigation();  // backicon temporaire
  const data = {
    profile: {
      name: 'Jeremi',
      profilePicture: require('../assets/pp.jpg'),
    },
    days: [
      {
        day: 'Profil',
        images: [
          { src: require('../assets/pp.jpg'), label: 'jeremi' },
        ],
      },
      {
        day: 'Classement',
        images: [
          { src: require('../assets/Group55.png'), label: 'jeremi' },
        ],
      },
      // Add more sections as needed
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* backicon temporaire */}
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="red"
          style={styles.backIcon}
          onPress={() => navigation.goBack()} 
        />
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileWrapper}>
          <Image source={data.profile.profilePicture} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{data.profile.name}</Text>
          <View style={styles.profileStats}>
          </View>
        </View>
      </View>
      {data.days.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.day}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              {day.images.slice(0, 5).map((image, idx) => (
                <TouchableOpacity key={idx} style={[styles.imageWrapper, index === 1 && { width: 300, height: 300 }]}>
                  <Image source={image.src} style={[styles.image, index === 1 && { width: '100%', height: '100%' }]} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
// backicon temporaire
backIcon: {
  padding: 10,
},

  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#F5E5CC',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    margin: 15,
    backgroundColor: '#F5E5CC',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileStats: {
    flexDirection: 'row',
  },
  profileStat: {
    marginRight: 10,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Profil;
