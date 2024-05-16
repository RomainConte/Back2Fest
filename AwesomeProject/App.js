import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home, Portfolio, Setting, Start, Start2 } from './screen'; // Assurez-vous que Start2 est importé
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Start2" component={Start2} /> 
        <Stack.Screen name="Main" component={MyTabs} />
      </Stack.Navigator>
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
