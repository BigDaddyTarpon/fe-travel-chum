import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { DestinationContext, PolylineContext, UserLocationContext } from "./components/Contexts";
import GoogleMapView from "./components/GoogleMapView";
import GooglePlacesInput from "./components/DestinationInput";
import Search from "./components/Search";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null)
  const [destination, setDestination] = useState(null)

// Request user geo-location permissions & set geo-location to context. 
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
      {/* User geo-location context */}
      <UserLocationContext.Provider value={{ location, setLocation }}>
      {/* Polyline coordinates context */}
      <PolylineContext.Provider value={{polylineCoordinates, setPolylineCoordinates}}>
        {/* Origin & Destination google autofill forms */}
      <DestinationContext.Provider value= {{destination, setDestination}}>
        <Search />
        {/* Google map */}
        <GoogleMapView></GoogleMapView>
      </DestinationContext.Provider>
      </PolylineContext.Provider>
      </UserLocationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    }
  })
