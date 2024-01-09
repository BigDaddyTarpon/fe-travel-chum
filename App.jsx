import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import Constants from "expo-constants";
import {
  PaperProvider,
  Appbar,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
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
import CustomAppBar from "./components/CustomAppBar";

const Tab = createMaterialTopTabNavigator();
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  const [location, setLocation] = useState(null);

  // const theme = useTheme()
  // const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  
  const [isThemeDark, setIsThemeDark] = useState(false);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <>
          <CustomAppBar isThemeDark={isThemeDark} toggleTheme={toggleTheme} />
          </>
          <NavigationContainer theme={theme}>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Trip Planner" component={PlanTrip} />
              <Tab.Screen name="My Trips" component={Login} />
            </Tab.Navigator>
          </NavigationContainer>
        </UserLocationContext.Provider>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
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
