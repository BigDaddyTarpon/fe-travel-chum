import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Constants from "expo-constants";
import {
  PaperProvider,
  Appbar,
  Switch,
  Badge,
  useTheme, 
} from "react-native-paper";
import { PreferencesContext } from "./PreferencesContext";
import Home from "./components/home";
import Login from "./components/Login";
import PlanTrip from "./components/plan-trip";
import merge from "deepmerge";
import { UserLocationContext } from "./components/Contexts";
import Header from "./components/Header";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [location, setLocation] = useState(null);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#F7B787',
      card: '#527853',
      text: 'white'
    },
  };

  return (
    <>
      <PaperProvider theme={MyTheme}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <Header/>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Trip" component={PlanTrip} />
              <Tab.Screen name="Login" component={Login} />
            </Tab.Navigator>
          </NavigationContainer>
        </UserLocationContext.Provider>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'F9E8D9',
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "70%",
    height: "70%",
  },
  Image: {
    marginLeft:35,
    marginRight:10,
    height: "100%",
    width: "15%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  navBar:{
    backgroundColor: '#88C88A',
    color: '#88C88A'
  }
});
