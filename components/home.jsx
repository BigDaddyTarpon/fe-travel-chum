import {Button, Title, SegmentedButtons} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Search from "./Search";
import React, { useState, useContext } from "react";
import NumberOfStopsDropDown from "./NumberOfStopsDropDown";
import {TabActions, useFocusEffect } from '@react-navigation/native';
import { DestinationContext, OriginContext } from "./Contexts";

export default function Home({navigation}) {
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);
  const {origin, setOrigin} = useContext(OriginContext)
  const {destination, setDestination} = useContext(DestinationContext)
  
  useFocusEffect(
    React.useCallback(() => {
      () => {
        {setDestination(destination),
        setOrigin(origin)}
      }
      console.log('HOME FOCUSED.............');
      // Do something when the screen is focused

      return () => {
        console.log('HOME UNFOCUSED.............');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const jumpToAction = TabActions.jumpTo('Trip');

  return (
    <>
      <View style={styles.container}>
        <Title style={styles.title}>
          Welcome To Travel Chum, your personal trip planner! Select your
          journey details to begin.
        </Title>
        <Search/>
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
          onPress={ () => {navigation.dispatch(jumpToAction)} }
        >
          Plan Trip!
        </Button>
      </View>
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
