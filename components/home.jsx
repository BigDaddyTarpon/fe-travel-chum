import { Button, Title, SegmentedButtons, List } from "react-native-paper";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import Search from "./Search";
import React, { useState, useContext } from "react";
import NumberOfStopsDropDown from "./NumberOfStopsDropDown";
import { useFocusEffect } from "@react-navigation/native";
import { DestinationContext, OriginContext } from "./Contexts";

export default function Home({ navigation }) {
  const { origin, setOrigin } = useContext(OriginContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [valueAccomodation, setValueAccomodation] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      () => {
        {
          setDestination(destination), setOrigin(origin);
        }
      };
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <Title style={styles.title}>
          Welcome To Travel Chum, your personal trip planner! Select your
          journey details to begin.
        </Title>

        <Search />

        <NumberOfStopsDropDown />

        <Title style={styles.title}>Nearby Attraction Preferences</Title>

        <ScrollView style={{ width: 400, display: "flex" }}>
          <>
            <View>
              <SegmentedButtons
                style={styles.segmentedButtons}
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
              <SegmentedButtons
                style={styles.segmentedButtons}
                multiSelect
                value={extraOptions}
                onValueChange={setExtraOptions}
                buttons={[
                  {
                    value: "Wheel-Chair-Access",
                    label: "Easy Access",
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
              <SegmentedButtons
                style={styles.segmentedButtons}
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
              <SegmentedButtons
                style={styles.segmentedButtons}
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
              <SegmentedButtons
                style={styles.segmentedButtons}
                multiSelect
                value={extraOptions}
                onValueChange={setExtraOptions}
                buttons={[
                  {
                    value: "Theme Parks",
                    label: "Theme Parks",
                    showSelectedCheck: true
                  },
                  {
                    value: "Sports&Leisure",
                    label: "Sports/Leisure",
                    showSelectedCheck: true,
                  },
                  {
                    value: "Cinema",
                    label: "Cinema",
                    showSelectedCheck: true,
                  },
                ]}
              />
            </View>
            <Button
              style={styles.button}
              mode="contained-tonal"
              title="Submit"
              onPress={() => {
                navigation.jumpTo("Trip", {
                  extraOptions: extraOptions,
                  valueAccomodation: valueAccomodation,
                });
              }}
            >
              Plan Trip!
            </Button>
          </>
        </ScrollView>
        {/* <Pressable>
          <View style={[styles.card, styles.cardElevated]}>
            <Image style={styles.attractionImage} source={require('../assets/hotel-icon.png')}/>
            <Text>Hotels</Text>
          </View>
          </Pressable>

          <Pressable>
          <View style={[styles.card, styles.cardElevated]}>
            <Image style={styles.attractionImage} source={require('../assets/camp-icon.png')}/>
            <Text>Campsites</Text>
          </View>
          </Pressable>

          <Pressable>
          <View style={[styles.card, styles.cardElevated]}>
            <Image style={styles.attractionImage} source={require('../assets/parks-icon.png')}/>
            <Text>Parks & Nature</Text>
          </View>
          </Pressable>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/hiking-icon.png')}/>
            <Text>Hiking</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/museums-icon.png')}/>
            <Text>Museums</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/heritage-icon.png')}/>
            <Text>Heritage</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/wildlife-icon.png')}/>
            <Text>Wildlife</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/theme-parks-icon.png')}/>
            <Text>Theme Parks</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/sport-icon.png')}/>
            <Text>Sports & Leisure</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/cinema-icon.png')}/>
            <Text>Cinema</Text>
          </Pressable>
          </View>

          <View style={[styles.card, styles.cardElevated]}>
          <Pressable>
            <Image style={styles.attractionImage} source={require('../assets/theatre-icon.png')}/>
            <Text>Theatre</Text>
          </Pressable>
          </View> */}
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
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
    fontSize: 17,
  },
  poiTypes: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#B2C8B3",
    width: 200,
    marginBottom: 15,
    marginLeft: 100,
    elevation: 6,
  },
  attractionButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  attractionImage: {
    height: 80,
    width: 80,
  },
  scrollContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
  },
  cardElevated: {
    backgroundColor: "#FADBBF",
    marginLeft: 10,
    borderRadius: 100,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: 5,
  },
  segmentedButtons: {
    backgroundColor: "#7EA07F",
    borderRadius: 100,
    marginBottom: 10,
  },
});
