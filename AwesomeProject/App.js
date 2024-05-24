import React from 'react';
import { AppRegistry, ImageBackground, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { name as appName } from './app.json';
import { Home, Programme, Map, Billet, Start, Profil, Settings, Coco, login, register, artiste, FaqPage, Credits, EditProfileScreen, FestivalRules, Acces, Camping, Poli, Cookies, TermsOfUse } from './screen';
import CustomDrawerContent from './component/CustomDrawerContent';
import "./config/firebase";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const screenoption = {
  tabBarBackground: () => (
    <ImageBackground source={require('./assets/waverouge.png')} style={styles.backgroundImage} />
  ),
  tabBarActiveTintColor: '#E4B979',
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 15,
    right: 0,
    height: 110, // Adjust this height as necessary
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: 'Lemon-Regular',
    marginBottom: -18,
    color: '#FAFAFA',
  },
  tabBarShowLabel: false,
};

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={screenoption}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.focusedTab : styles.iconContainer}>
              <Ionicons 
                name="home-outline" 
                size={24} 
                color={focused ? '#FAFAFA' : '#FAFAFA'} 
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && <Text style={styles.tabBarLabel}>Accueil</Text>}
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Programme"
        component={Programme}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.focusedTab : styles.iconContainer}>
              <Ionicons 
                name="calendar-outline" 
                size={24} 
                color={focused ? '#FAFAFA' : '#FAFAFA'} 
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && <Text style={styles.tabBarLabel}>Programme</Text>}
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Carte"
        component={Map}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.focusedTab : styles.iconContainer}>
              <Feather 
                name="map-pin" 
                size={24} 
                color={focused ? '#FAFAFA' : '#FAFAFA'} 
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && <Text style={styles.tabBarLabel}>Carte</Text>}
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Billet"
        component={Billet}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.focusedTab : styles.iconContainer}>
              <Entypo 
                name="ticket" 
                size={24} 
                color={focused ? '#FAFAFA' : '#FAFAFA'} 
                style={focused ? styles.iconFocused : styles.icon}
              />
              {focused && <Text style={styles.tabBarLabel}>Billetterie</Text>}
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} options={{ animationEnabled: false }} />
      <Stack.Screen name="Login" component={login} options={{ animationEnabled: false }} />
      <Stack.Screen name="Main" component={DrawerNavigator} options={{ animationEnabled: false }} />
      <Stack.Screen name="Profil" component={Profil} options={{ animationEnabled: false }}  />
      <Stack.Screen name="Settings" component={Settings} options={{ animationEnabled: false }} />
      <Stack.Screen name="Coco" component={Coco} options={{ animationEnabled: false }} />
      <Stack.Screen name="Programme" component={Programme} options={{ animationEnabled: false }} />
      <Stack.Screen name="register" component={register} options={{ animationEnabled: false }} />
      <Stack.Screen name="artiste" component={artiste} options={{ animationEnabled: false }} />
      <Stack.Screen name="FaqPage" component={FaqPage} options={{ animationEnabled: false }} />
      <Stack.Screen name="Credits" component={Credits} options={{ animationEnabled: false }} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ animationEnabled: false }} />
      <Stack.Screen name="FestivalRules" component={FestivalRules} />
      <Stack.Screen name="Acces" component={Acces} options={{ animationEnabled: false }} />
      <Stack.Screen name="Camping" component={Camping} options={{ animationEnabled: false }} />
      <Stack.Screen name="Poli" component={Poli} options={{ animationEnabled: false }} />
      <Stack.Screen name="Coockies" component={Cookies} options={{ animationEnabled: false }} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} options={{ animationEnabled: false }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={MyTabs} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -45, // Adjust this value to move the icons down
  },
  focusedTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4B979',
    paddingHorizontal: 8, // Reduced padding to reduce spacing
    paddingVertical: 10, // Reduced padding to reduce spacing
    borderRadius: 30,
    marginBottom: -45,
    width: 120, // Adjust this value to move the icons down
  },
  iconFocused: {
    marginRight: 2, // Reduced margin to reduce spacing
  },
  tabBarLabel: {
    color: '#FAFAFA',
    fontSize: 12,
    fontFamily: 'Lemon-Regular',
    marginLeft: 2, // Reduced margin to reduce spacing
  },
  icon: {
    marginBottom: 0, // Ensure no additional margin on default state
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);
