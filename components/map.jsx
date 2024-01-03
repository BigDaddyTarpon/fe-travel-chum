import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Map({routeOptions}) {
  return (
   
       <MapView
        
        style={styles.map}
        initialRegion={{
          latitude: 53.471, 
          longitude: -2.236,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      <Marker coordinate={{latitude: 53.471, longitude: -2.236}} /> 
    </MapView>  
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