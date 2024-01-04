import { View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { PolylineContext, UserLocationContext } from "./Contexts";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState([]);
  const {polylineCoordinates, setPolylineCoordinates} = useContext(PolylineContext)
  const [mapView, setMapView] = useState()
  
  const { location, setUserLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321,
      });
    }
  }, []);

  return (
    <View
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MapView
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: Dimensions.get("screen").height * 0.4,
          marginTop: 20,
          marginBottom: 0,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={mapRegion}
      >
      {polylineCoordinates ? 
      <Polyline
        coordinates={polylineCoordinates}
        strokeWidth={3}
        strokeColor="blue"
      /> : <></>}
      </MapView>
      
    </View>
  );
}
