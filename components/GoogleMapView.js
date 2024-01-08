import { View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { UserLocationContext } from "./Contexts";
import {getPoisFromMarker, getStopMarkerCoordinates} from '../Utils/utils';
export default function GoogleMapView({polylineCoordinates}) {
  const [mapRegion, setMapRegion] = useState([]);
  const [stopAttractions, setStopAttractions] = useState([]);
  
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
  function handleMarkerPress(latitude, longitude) {
    getPoisFromMarker({latitude, longitude})
    .then((res)=>{
      setStopAttractions(res);
    })
    
  };
  
  return (
    <View
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MapView
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: Dimensions.get("screen").height * 0.35,
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
      /> : null}
      {polylineCoordinates !== null ? getStopMarkerCoordinates(polylineCoordinates, 5).map((point, index) => {
        return <Marker key={index} coordinate={{latitude: point.latitude, longitude: point.longitude}} onPress={()=>{handleMarkerPress(point.latitude, point.longitude)}} />
      }) : null} 
      {stopAttractions.length > 0 ? stopAttractions.map((attraction, index )=> {
        return <Marker key={index} coordinate={{latitude: attraction.geometry.location.lat, longitude: attraction.geometry.location.lng}} title={attraction.name}/>
      }) : null}
      </MapView>
      
    </View>
  );
}
