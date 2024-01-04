import { StyleSheet, Text, View } from 'react-native'
// import MapView, { Marker } from 'react-native-maps'
import GoogleMapView from './GoogleMapView';
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { DestinationContext, UserLocationContext, PolylineContext } from "./Contexts";


export default function Map({routeOptions}) {
  const {location, setLocation} = useContext(UserLocationContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const {polylineCoordinates, setPolylineCoordinates} = useContext(PolylineContext)
  const {destination, setDestination} = useContext(DestinationContext);

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
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {/* Polyline coordinates context */}
      <PolylineContext.Provider value={{polylineCoordinates, setPolylineCoordinates}}>
        {/* Origin & Destination google autofill forms */}
      <DestinationContext.Provider value= {{destination, setDestination}}>
        {/* Google map */}
        <GoogleMapView></GoogleMapView>
      </DestinationContext.Provider>
      </PolylineContext.Provider>
      </UserLocationContext.Provider>
    //    <MapView
    //     style={styles.map}
    //     initialRegion={{
    //       latitude: 53.471, 
    //       longitude: -2.236,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //   >
    //   <Marker coordinate={{latitude: 53.471, longitude: -2.236}} /> 
    // </MapView>  
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
    width: "100%",
    height: "70%",
  },
  
});