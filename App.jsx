import { StyleSheet, Image } from "react-native";
import { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import { PaperProvider, Appbar } from "react-native-paper";
import Home from "./components/home";
import PlanTrip from "./components/plan-trip";
import {
  UserLocationContext,
  PolylineContext,
  DestinationContext,
} from "./components/Contexts";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null)
  const [destination, setDestination] = useState(null)
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {/* Polyline coordinates context */}
      <PolylineContext.Provider
        value={{ polylineCoordinates, setPolylineCoordinates }}
      >
        {/* Origin & Destination google autofill forms */}
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <PaperProvider>
            <>
              <Appbar style={{ marginTop: Constants.statusBarHeight }}>
                <Appbar.Content title="Travel Chum" />
                <Image
                  style={styles.Image}
                  source={require("./assets/Travel-Chum-Logo.png")}
                />
              </Appbar>
            </>

            <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Trip Planner" component={PlanTrip} />
              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </DestinationContext.Provider>
      </PolylineContext.Provider>
    </UserLocationContext.Provider>
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
