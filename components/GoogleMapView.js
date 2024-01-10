import { View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { UserLocationContext, StopsContext} from "./Contexts";
import { PreferencesContext } from "../PreferencesContext";
import { MapStyleNight } from "./map-night-style-object.js";
import {getPoisFromMarker, getStopMarkerCoordinates} from '../Utils/utils';
import CustomCallout from "./CustomCallout.jsx";
import { Text } from "react-native-paper";

const mapStyle = MapStyleNight;

export default function GoogleMapView({ polylineCoordinates, setSelectedAttractions, valueAccomodation, extraOptions }) {
  const preferences = useContext(PreferencesContext);
  const [mapRegion, setMapRegion] = useState([]);
  const [stopAttractions, setStopAttractions] = useState([]);
  const { location, setUserLocation } = useContext(UserLocationContext);
  const {stops, setStops} = useContext(StopsContext)
  const mapRef = React.createRef();
  useEffect(() => {
    if (location && !polylineCoordinates) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321,
      });
    } else if (polylineCoordinates) {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        animated: true,
      });
    }
  }, [polylineCoordinates]);
  function handleMarkerPress(latitude, longitude) {
    getPoisFromMarker({latitude, longitude}, valueAccomodation, extraOptions)
    .then((res)=>{
      setStopAttractions(res);
    })
    
  };
  
  return (
    <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MapView
        ref={mapRef}
        style={{
          width: Dimensions.get("screen").width * 0.95,
          height: Dimensions.get("screen").height * 0.5,
          marginTop: 8,
          marginBottom: 0,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={mapRegion}
        customMapStyle={preferences.isThemeDark ? mapStyle : []}
      >
        {polylineCoordinates ? (
          <>
            <Polyline
              coordinates={polylineCoordinates}
              strokeWidth={3}
              strokeColor="blue"
            />

            <Marker identifier="origin" coordinate={polylineCoordinates[0]} onPress={()=>{handleMarkerPress(polylineCoordinates[0].latitude, polylineCoordinates[0].longitude)}} pinColor={"gold"}/>
            <Marker
              identifier="destination"
              coordinate={polylineCoordinates[polylineCoordinates.length - 1]}
              onPress={()=>{handleMarkerPress(polylineCoordinates[polylineCoordinates.length - 1].latitude, polylineCoordinates[polylineCoordinates.length - 1].longitude)}}
              pinColor='#00FF00'
            />
            {getStopMarkerCoordinates(polylineCoordinates, stops).map((point, index, arr) => {
        return <Marker key={index} coordinate={{latitude: point.latitude, longitude: point.longitude}} onPress={()=>{handleMarkerPress(point.latitude, point.longitude)}} title={`stop ${index+1}/${arr.length}`}/>
      })}
          </>
        ) : (
          <></>
        )}
        {stopAttractions.length > 0 ? stopAttractions.map((attraction, index )=> {
        return <Marker key={index} coordinate={{latitude: attraction.geometry.location.lat, longitude: attraction.geometry.location.lng}} title={attraction.name}><CustomCallout marker={attraction} setSelectedAttractions={setSelectedAttractions}/></Marker>
      }) : null}
      </MapView>
      <View>{stopAttractions.map((attraction, index) => {
        return <Text key={index}>{attraction.name}</Text>
      })}</View>
    </View>
  );
}
