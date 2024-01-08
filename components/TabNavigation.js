import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Login from './Login';
import PlanTrip from './plan-trip';
import Home from './home';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{tabBarStyle:{height:70}, tabBarLabelStyle:{fontWeight:'bold', fontSize:15}, tabBarHideOnKeyboard:true, headerShown:false}}>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="home" size={35} color="white" />
            )
        }}/>
        
        <Tab.Screen name="Trip" component={PlanTrip} options={{
            tabBarLabel: 'Trip',
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="road" size={35} color="white" />
            )
        }}/>
        
        <Tab.Screen name="Login" component={Login} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="user" size={35} color="white" />
            )
        }}/>
  </Tab.Navigator>
  )
}