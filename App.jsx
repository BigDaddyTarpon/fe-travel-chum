import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from '@react-navigation/native';

import Map from "./components/map";
import Home from "./components/home";
import PlanTrip from './components/plan-trip';

const Tab = createMaterialTopTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Plan-Trip" component={PlanTrip} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
    </NavigationContainer>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "70%",
    height: "70%",
  },
  Image: {
    height: "100%",
    width: "15%",
    alignSelf: "center",
   
    resizeMode: "contain",
  },
});
