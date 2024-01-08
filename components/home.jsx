import {Button, Title, SegmentedButtons} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Search from "./Search";
import { useState, useContext } from "react";
import NumberOfStopsDropDown from "./NumberOfStopsDropDown";
import { getPolylineCoordinates, formatPolyline } from "../Utils/utils";
import {TabActions } from '@react-navigation/native';

export default function Home({navigation}) {
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);

  function onSubmit() {
    if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          setPolylineCoordinates(formatPolyline(data));
        }
      );
    }
  }

  const jumpToAction = TabActions.jumpTo('Trip');

  return (
    <>
      <View style={styles.container}>
        <Title style={styles.title}>
          Welcome To Travel Chum, your personal trip planner! Select your
          journey details to begin.
        </Title>
        <Search setOrigin={setOrigin} setDestination={setDestination} />
        <NumberOfStopsDropDown />
        <SegmentedButtons
          style={styles.poiTypes}
          multiSelect
          value={group2}
          onValueChange={setGroup2}
          buttons={[
            {
              value: "parks&nature",
              label: "Parks/Nature",
              showSelectedCheck: true,
            },
            {
              value: "hike",
              label: "Hikes/Walks",
              showSelectedCheck: true,
            },
            { value: "Wildlife", label: "Wildlife", showSelectedCheck: true },
          ]}
        />
        <SegmentedButtons
          style={styles.poiTypes}
          multiSelect
          value={group3}
          onValueChange={setGroup3}
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
            { value: "Theatre", label: "Theatre", showSelectedCheck: true },
          ]}
        />
        <SegmentedButtons
          style={styles.poiTypes}
          multiSelect
          value={group4}
          onValueChange={setGroup4}
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
        <Button
          style={styles.button}
          mode="contained"
          title="Submit"
          onPress={ () => {navigation.dispatch(jumpToAction), onSubmit()} }
        >
          Plan Trip!
        </Button>
      </View>
      {/* <Dialog visible={true}>
        <Dialog.Title>Welcome to Travel Chum.</Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
        
          Swipe sideways or click a tab at the top to navigate.
        </Dialog.Title>

        <Dialog.Title style={{ fontSize: 20 }}>
        You can select Darkmode with the switch at the top right.
        </Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          login, with the icon top right.
        </Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          You can enter details on 'plan a trip' to see the trip dispayed on the
          map.
        </Dialog.Title>


      </Dialog> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: '#FAF1EA'
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 15,
  },
  poiTypes: {
    marginTop: 20,
  },
  button:{
    marginTop: 20
  }
});
