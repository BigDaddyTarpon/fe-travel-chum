import { View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { UserLocationContext } from "./Contexts";

export default function GoogleMapView({ polylineCoordinates }) {
  const [mapRegion, setMapRegion] = useState([]);
  const [mapView, setMapView] = useState();

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
      setTimeout(() => {
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
          animated: true,
        }),
          1500
      });
    }
  }, [polylineCoordinates]);

  return (
    <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MapView
        ref={mapRef}
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: Dimensions.get("screen").height * 0.45,
          marginTop: 20,
          marginBottom: 0,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={mapRegion}
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
          </>
        ) : (
          <></>
        )}
      </MapView>
    </View>
  );
}
