import {StyleSheet, View} from "react-native";
import { useState, useContext, useEffect } from "react";
import { PreferencesContext } from '../PreferencesContext';
import { Button, TextInput, List, SegmentedButtons, useTheme, IconButton } from "react-native-paper";
import Map from "./map";
import {getPolylineCoordinates} from "../Utils/utils";
import { postTrip } from "../requests/firebaseUtils";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { DestinationContext, OriginContext } from "./Contexts";


export default function PlanTrip() {
const preferences=useContext(PreferencesContext)
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState("car");
  const [valueAccomodation, setValueAccomodation] = useState("");
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);
  const [viewMap, setViewMap] = useState(true);
  const {destination, setDestination} = useContext(DestinationContext)
  const {origin, setOrigin} = useContext(OriginContext)
  
  
  const handlePress = () => setExpanded(!expanded);
  
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
      .catch((err) => {console.log(err)})
  }

  function onSave(data) {
    if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          postTrip({
            polyline: polylineCoordinates,
            origin: origin.description,
            destination: destination.description,
            tripName: `${origin.description} to ${destination.description}` ,
          });
        }
      );
    }
  }

  return (
    <>
    <View style={styles.container}>
    <Map polylineCoordinates={polylineCoordinates} /> 
   
      <Button
        style={styles.button}
        mode="outlined"
        title="SaveTrip"
        onPress={() => {onSave}}
      >
        Save Trip
      </Button>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: '#FAF1EA'
  },
  button: {
    backgroundColor: '#F7B787',
    width:200,
    marginTop:20,
  },
  destinationcontainer: {
    minHeight: 200,
  },
});
