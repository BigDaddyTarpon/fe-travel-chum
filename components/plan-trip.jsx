import {ScrollView, StyleSheet, View, Text} from "react-native";
import { useState, useContext, useEffect } from "react";
import { PreferencesContext } from '../PreferencesContext';
import { Button, TextInput, List, SegmentedButtons, useTheme, IconButton } from "react-native-paper";
import Map from "./map";
import { postTrip } from "../requests/firebaseUtils";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { DestinationContext, OriginContext, StopsContext  } from "./Contexts";
import { getPolylineCoordinates } from "../Utils/utils";

export default function PlanTrip({route}) {
  const preferences = useContext(PreferencesContext);
  const {destination, setDestination} = useContext(DestinationContext)
  const {origin, setOrigin} = useContext(OriginContext)
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [tripName, setTripName] = useState("");
  const {valueAccomodation, extraOptions } = route.params
  const {stops, setStops} = useContext(StopsContext)

  useFocusEffect(
    React.useCallback(() => {
      onPageLoad(origin, destination)
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [origin, destination])
  );

  function onPageLoad(origin, destination) {
    getPolylineCoordinates(origin.place_id, destination.place_id).then(
       (data) => {
         setPolylineCoordinates(data);
       }
       )
   }

  function handleTripNameChange(text) {
    setTripName(text);
  }

  function onSave(data) {
    if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          postTrip({
            polyline: polylineCoordinates,
            origin: origin.description,
            destination: destination.description,
            tripName: `${tripName}`,
            numOfStops: `${stops}`,
            selectedAttractions: selectedAttractions,
          });
        }
      );
    }
  }

  return (
    <>
    <ScrollView>
  <Map polylineCoordinates={polylineCoordinates} setSelectedAttractions={setSelectedAttractions} valueAccomodation={valueAccomodation} extraOptions={extraOptions}/>

      <TextInput
        style={{ color: "white" }}
        label="Enter a name for your trip"
        placeholder="My special trip!"
        value={tripName}
        onChangeText={handleTripNameChange}
      />

      <Button mode="contained" title="SaveTrip" onPress={onSave}>
        Save Trip
      </Button>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  destinationcontainer: {
    minHeight: 200,
  },
  pickerContainer: {
    flex: 0.3,
    alignSelf: "center",
    minHeight: 50,
    width: 100,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    overflow: "hidden",
  },

  title: {
    textAlign: "center",
    marginBottom: 0,
  },
});
