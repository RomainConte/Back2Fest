import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Home, Portfolio, Setting} from './screen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <NavigationContainer screenoptions={screenoption}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={24} color="black" />
          ),    
          headerShown: false,
        }}/>
        <Tab.Screen name="Portfolio" component={Portfolio} options={{
           tabBarIcon: ({ color, size }) => (
            <Entypo name="image" size={24} color="black" />
          ),    
        }}/>
        <Tab.Screen name="Setting" component={Setting} options={{
           tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={24} color="black" />
          ),    
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const Tab = createBottomTabNavigator();
const screenoption = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 60,
    background: '#ffffff',
    
  }
}


