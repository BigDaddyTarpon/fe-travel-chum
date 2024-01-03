import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { PolylineContext, UserLocationContext } from "./components/Contexts";
import GoogleMapView from "./components/GoogleMapView";
import GooglePlacesInput from "./components/DestinationInput";
import Search from "./components/Search";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
      <PolylineContext.Provider value={{polylineCoordinates, setPolylineCoordinates}}>
        <Search />
        <GoogleMapView></GoogleMapView>
      </PolylineContext.Provider>
      </UserLocationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 300,
    backgroundColor: "#fff",
  },
});
