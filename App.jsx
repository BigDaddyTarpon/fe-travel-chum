import React from "react";
import { StyleSheet, Image } from "react-native";
import { useState, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
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
} from "react-native-paper";
import Home from "./components/home";
import PlanTrip from "./components/plan-trip";
import merge from "deepmerge";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  //merge themes using deepmerge
  const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

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
    <PaperProvider theme={theme}>
      <>
        <Appbar style={{ marginTop: Constants.statusBarHeight }}>
          <Appbar.Content title="Travel Chum" />
          <Image
            style={styles.Image}
            source={require("./assets/Travel-Chum-Logo.png")}
          />

          <Appbar.Action icon="theme-light-dark" />
          <Switch
            color={"purple"}
            value={isThemeDark}
            onValueChange={toggleTheme}
          />
          <Badge>dark</Badge>

          <Appbar.Action icon="lightbulb-off-outline" />
        </Appbar>
      </>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Trip Planner" component={PlanTrip} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
