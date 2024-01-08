import React, { useContext } from "react";
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
import { UserLocationContext, DestinationContext, OriginContext, StopsContext} from "./components/Contexts";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [origin, setOrigin] = useState(OriginContext)
  const [destination, setDestination] = useState(DestinationContext)
  const [stops, setStops] = useState(StopsContext)

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
        <StopsContext.Provider value={{stops, setStops}}>
        <OriginContext.Provider value={{origin, setOrigin}}>
        <DestinationContext.Provider value={{destination, setDestination}}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <Header/>
          <NavigationContainer theme={MyTheme}>
            <TabNavigation />
          </NavigationContainer>
        </UserLocationContext.Provider>
        </DestinationContext.Provider>
        </OriginContext.Provider>
        </StopsContext.Provider>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: '#FAF1EA'
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
