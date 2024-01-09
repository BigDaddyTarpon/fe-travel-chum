import { StyleSheet } from "react-native";
import GoogleMapView from "./GoogleMapView";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { UserLocationContext } from "./Contexts";

export default function Map({ polylineCoordinates, selectedValue, setSelectedAttractions, valueAccomodation, extraOptions }) {
  const { location, setLocation } = useContext(UserLocationContext);
  const [errorMsg, setErrorMsg] = useState(null);

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
      <GoogleMapView polylineCoordinates={polylineCoordinates} selectedValue={selectedValue} setSelectedAttractions={setSelectedAttractions} valueAccomodation={valueAccomodation} extraOptions={extraOptions}></GoogleMapView>
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
    width: "100%",
    height: "40%",
  },
});
