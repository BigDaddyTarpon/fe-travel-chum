import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { Controller } from "react-hook-form";
import { PreferencesContext } from "../PreferencesContext";
import {
  Button,
  List,
  SegmentedButtons,
  IconButton,
  TextInput,
  Modal,
  Portal,
} from "react-native-paper";
import Map from "./map";
import Search from "./Search";
import getPolylineCoordinates, { formatPolyline } from "../Utils/utils";
import {
  getTripsByCurrentUser,
  postTrip,
  updateTrip,
} from "../requests/firebaseUtils";
import NumberPicker from "./picker";
import WheelPicker from "./CustomWheelPicker";
import auth from '../config/firebase'
export default function PlanTrip() {
  const preferences = useContext(PreferencesContext);

  const [expanded, setExpanded] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [checked, setChecked] = useState("car");
  const [valueAccomodation, setValueAccomodation] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);
  const [viewOptions, setViewOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Stops");
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [tripName, setTripName] = useState("");
  const [currentTripId, setCurrentTripId] = useState("");
  const handlePress = () => setExpanded(!expanded);
  function onSubmit(data) {
    if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          setPolylineCoordinates(formatPolyline(data));
        }
      );
    }
  }
  function passProp(selectedValue) {
    setSelectedValue(selectedValue);
  }

  function handleTripNameChange(text) {
    setTripName(text);
    setCurrentTripId('')
  }

  function onSave(data) {
    if (currentTripId !== "") {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          const updatedTrip = {
            polyline: data.routes[0].overview_polyline.points,
            origin: origin.description,
            destination: destination.description,
            tripName: `${tripName}`,
            numOfStops: `${selectedValue}`,
            selectedAttractions: selectedAttractions,
          };
          updateTrip(currentTripId, updatedTrip);
        }
      );
    }
    else if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id)
        .then((data) => {
          return postTrip({
            polyline: data.routes[0].overview_polyline.points,
            origin: origin.description,
            destination: destination.description,
            tripName: `${tripName}`,
            numOfStops: `${selectedValue}`,
            selectedAttractions: selectedAttractions,
          });
        })
        .then((id) => {
          if (id) {
            setCurrentTripId(id);
          }
        });
    }
  }

  function toggleViewOptions() {
    setViewOptions(!viewOptions);
  }

  return (
    <>
      <View
        style={{ flex: 1, flexDirection: "row", minHeight: 120, zIndex: 3 }}
      >
        <View style={{ flex: 0.7 }}>
          <Search setOrigin={setOrigin} setDestination={setDestination} />
        </View>
        <View style={{ flex: 0.3 }}>
          <IconButton
            style={{ width: 100, minHeight: 55, alignSelf: "center" }}
            mode="outlined"
            onPress={toggleViewOptions}
            icon={() => (
              <Text
                style={{ color: preferences.isThemeDark ? "white" : "black" }}
                numberOflines={3}
              >
                {viewOptions ? "Hide Trip Options" : "View Trip Options"}
              </Text>
            )}
          ></IconButton>
          <View
            style={{
              flex: 0.3,
              alignSelf: "center",
              minHeight: 58,
              width: 100,
              borderColor: preferences.isThemeDark ? "grey" : "black",
              overflow: "hidden",
            }}
          >
            <>
              <Button
                style={{ flex: 0.3, minHeight: 58, padding: 0 }}
                mode="outlined"
                onPress={() => setVisibleModal(true)}
              >
                {selectedValue}
              </Button>
              <Portal>
                <Modal
                  visible={visibleModal}
                  onDismiss={() => setVisibleModal(false)}
                  contentContainerStyle={{
                    padding: 0,
                    backgroundColor: "grey",
                    alignSelf: "center",
                    width: "40%",
                  }}
                >
                  <WheelPicker
                    selectedValue={selectedValue}
                    passProp={passProp}
                    style={{ width: 100, minHeight: 20 }}
                  />
                </Modal>
              </Portal>
            </>
          </View>
        </View>
      </View>

      <ScrollView>
        {viewOptions ? (
          <>
            <View>
              <List.Accordion
                title="Mode of Transport"
                left={(props) => <List.Icon {...props} icon={checked} />}
                expanded={expanded}
                onPress={handlePress}
              >
                <List.Item
                  title="Car"
                  onPress={() => setChecked("car")}
                  left={(props) => <List.Icon {...props} icon="car" />}
                />
                <List.Item
                  title="Train"
                  onPress={() => setChecked("train")}
                  left={(props) => <List.Icon {...props} icon="train" />}
                />
                <List.Item
                  title="Bus/Coach"
                  onPress={() => setChecked("bus")}
                  left={(props) => <List.Icon {...props} icon="bus" />}
                />
                <List.Item
                  title="Bicycle"
                  onPress={() => setChecked("bicycle")}
                  left={(props) => <List.Icon {...props} icon="bicycle" />}
                />
                <List.Item
                  title="Walk"
                  onPress={() => setChecked("walk")}
                  left={(props) => <List.Icon {...props} icon="walk" />}
                />
              </List.Accordion>
            </View>

            <SafeAreaView style={styles.container}>
              <SegmentedButtons
                value={valueAccomodation}
                onValueChange={setValueAccomodation}
                buttons={[
                  {
                    value: "",
                    label: "Day trip",
                    showSelectedCheck: true,
                  },
                  {
                    value: "hotel",
                    label: "Hotel",
                    showSelectedCheck: true,
                  },
                  {
                    value: "camping",
                    label: "Camping",
                    showSelectedCheck: true,
                  },
                ]}
              />
            </SafeAreaView>
            <SafeAreaView style={styles.container}>
              <SegmentedButtons
                multiSelect
                value={extraOptions}
                onValueChange={setExtraOptions}
                buttons={[
                  {
                    value: "Wheel-Chair-Access",
                    label: "Accessible",
                    showSelectedCheck: true,
                  },
                  {
                    value: "Kids Entertainment",
                    label: "Kids Fun",
                    showSelectedCheck: true,
                  },
                  {
                    value: "shopping",
                    label: "Shopping",
                    showSelectedCheck: true,
                  },
                ]}
              />
            </SafeAreaView>
            <SafeAreaView style={styles.container}>
              <SegmentedButtons
                multiSelect
                value={extraOptions}
                onValueChange={setExtraOptions}
                buttons={[
                  {
                    value: "parks and nature",
                    label: "Parks/Nature",
                    showSelectedCheck: true,
                  },
                  {
                    value: "hike",
                    label: "Hikes/Walks",
                    showSelectedCheck: true,
                  },
                  {
                    value: "Wildlife",
                    label: "Wildlife",
                    showSelectedCheck: true,
                  },
                ]}
              />
            </SafeAreaView>

            <SafeAreaView style={styles.container}>
              <SegmentedButtons
                multiSelect
                value={extraOptions}
                onValueChange={setExtraOptions}
                buttons={[
                  {
                    value: "Museums",
                    label: "Museums",
                    showSelectedCheck: true,
                  },
                  {
                    value: "Heritage",
                    label: "Heritage",
                    showSelectedCheck: true,
                  },
                  {
                    value: "Theatre",
                    label: "Theatre",
                    showSelectedCheck: true,
                  },
                ]}
              />
            </SafeAreaView>
            <SafeAreaView style={styles.container}>
              <SegmentedButtons
                multiSelect
                value={extraOptions}
                onValueChange={setExtraOptions}
                buttons={[
                  {
                    value: "Theme Parks",
                    label: "Theme Parks",
                    showSelectedCheck: true,
                  },
                  {
                    value: "Sports&Leisure",
                    label: "Sports/Leisure",
                    showSelectedCheck: true,
                  },
                  { value: "Cinema", label: "Cinema", showSelectedCheck: true },
                ]}
              />
            </SafeAreaView>
          </>
        ) : null}
        <Map
          polylineCoordinates={polylineCoordinates}
          selectedValue={selectedValue}
          setSelectedAttractions={setSelectedAttractions}
          valueAccomodation={valueAccomodation}
          extraOptions={extraOptions}
        />
      </ScrollView>
      <Button mode="contained" title="Submit" onPress={onSubmit}>
        Start your Journey
      </Button>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            color: preferences.isThemeDark ? "white" : "black",
            flex: 1,
          }}
          label="Enter a name for your trip"
          placeholder="My special trip!"
          value={tripName}
          onChangeText={handleTripNameChange}
        />

        <Button mode="outlined" title="SaveTrip" onPress={onSave}>
          Save Trip
        </Button>
      </View>
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
