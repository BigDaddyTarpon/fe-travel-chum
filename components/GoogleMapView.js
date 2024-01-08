import { View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { UserLocationContext } from "./Contexts";
import { PreferencesContext } from "../PreferencesContext";
import { MapStyleNight } from "./map-night-style-object.js";

const mapStyle = MapStyleNight;
import {getPoisFromMarker, getStopMarkerCoordinates} from '../Utils/utils';
export default function GoogleMapView({ polylineCoordinates }) {
  const preferences = useContext(PreferencesContext);
  const [mapRegion, setMapRegion] = useState([]);
  const [stopAttractions, setStopAttractions] = useState([]);;
  const [forceToggle, setForceToggle] = useState(!preferences.isThemeDark);

  const { location, setUserLocation } = useContext(UserLocationContext);

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

            <Marker identifier="origin" coordinate={polylineCoordinates[0]} />
            <Marker
              identifier="destination"
              coordinate={polylineCoordinates[polylineCoordinates.length - 1]}
            />
            {getStopMarkerCoordinates(polylineCoordinates, 5).map((point, index) => {
        return <Marker key={index} coordinate={{latitude: point.latitude, longitude: point.longitude}} onPress={()=>{handleMarkerPress(point.latitude, point.longitude)}} />
      })}
          </>
        ) : (
          <></>
        )}
        {stopAttractions.length > 0 ? stopAttractions.map((attraction, index )=> {
        return <Marker key={index} coordinate={{latitude: attraction.geometry.location.lat, longitude: attraction.geometry.location.lng}} title={attraction.name}/>
      }) : null}
      </MapView>
    </View>
  );
}
