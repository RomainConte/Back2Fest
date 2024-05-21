import { AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home, Programme, Setting, Start, Start2, Profil, Coco, Billet, Map, J1, J2 ,J3, J4, login, register  } from './screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CustomDrawerContent from './component/CustomDrawerContent.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import "./config/firebase";
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs(true);



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={screenoption}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              <Ionicons name="home-outline" size={24} color={focused ? '#E4B979' : '#FAFAFA'} />
            </View>
          ),
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />

 <Tab.Screen
        name="login"
        component={login}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              <Ionicons name="home-outline" size={24} color={focused ? '#E4B979' : '#FAFAFA'} />
            </View>
          ),
          tabBarLabel: 'login',
          headerShown: false,
        }}
      />

      
      <Tab.Screen
        name="Programme"
        component={Programme}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              <Ionicons name="calendar-outline" size={24} color={focused ? '#E4B979' : '#FAFAFA'} />
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
            <View style={{}}>
              <Feather name="map-pin" size={24} color={focused ? '#E4B979' : '#FAFAFA'} />
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
            <View style={{}}>
              <Entypo name="ticket" size={24} color={focused ? '#E4B979' : '#FAFAFA'} />
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
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Start2" component={Start2} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="Coco" component={Coco} />
      <Stack.Screen name="J1" component={J1} />
      <Stack.Screen name="J2" component={J2} />
      <Stack.Screen name="J3" component={J3} />
      <Stack.Screen name="J4" component={J4} />
      <Stack.Screen name="Programme" component={Programme} />
      <Stack.Screen name="register" component={register} />

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

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const screenoption = {
  tabBarStyle: {
    backgroundColor: '#C15A5A',
  },
  tabBarActiveTintColor: '#E4B979',
  tabBarInactiveTintColor: 'white',
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
};

AppRegistry.registerComponent(appName, () => App);
