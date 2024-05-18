import { AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home, Portfolio, Setting, Start, Start2, Profil } from './screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomDrawerContent from './component/CustomDrawerContent.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';

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
            <MaterialIcons name="home-filled" size={24} color={focused ? '#E4B979' : 'black'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="image" size={24} color={focused ? '#E4B979' : 'black'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="settings" size={24} color={focused ? '#E4B979' : 'black'} />
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
  tabBarInactiveTintColor: 'gray',
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
};

AppRegistry.registerComponent(appName, () => App);