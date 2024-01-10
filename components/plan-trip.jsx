import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { PreferencesContext } from "../PreferencesContext";
import {
  Button,
  TextInput,
  List,
  SegmentedButtons,
  useTheme,
  IconButton,
} from "react-native-paper";
import Map from "./map";
import { postTrip } from "../requests/firebaseUtils";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { DestinationContext, OriginContext, StopsContext } from "./Contexts";
import { getPolylineCoordinates } from "../Utils/utils";

export default function PlanTrip({ route }) {
  const preferences = useContext(PreferencesContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { origin, setOrigin } = useContext(OriginContext);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [tripName, setTripName] = useState("");
  const { valueAccomodation, extraOptions } = route.params;
  const { stops, setStops } = useContext(StopsContext);
  const [buttonPressed, setButtonPressed] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onPageLoad(origin, destination);
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
    );
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
        <TextInput
          style={{ color: "white" }}
          label="Enter a name for your trip"
          placeholder="My special trip!"
          value={tripName}
          onChangeText={handleTripNameChange}
        />

        <TouchableOpacity
          style={{
            backgroundColor: `${buttonPressed ? "#F7B787" : "#B2C8B3"}`,
            marginTop: 10,
            marginLeft: 120,
            padding: 7,
            borderRadius: 50,
            width: "40%",
          }}
          disabled={buttonPressed ? true : false}
          onPress={() => {
            onSave, setButtonPressed(true);
          }}
        >
          <Text style={{ color: "black", textAlign: "center" }}>
            {buttonPressed ? "Trip Saved" : "Save Trip"}
          </Text>
        </TouchableOpacity>

        <Map
          polylineCoordinates={polylineCoordinates}
          setSelectedAttractions={setSelectedAttractions}
          valueAccomodation={valueAccomodation}
          extraOptions={extraOptions}
        />
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
  button: {
    backgroundColor: "#B2C8B3",
    width: "50%",
    marginLeft: 100,
    marginTop: 10,
    color: "black",
  },
});
