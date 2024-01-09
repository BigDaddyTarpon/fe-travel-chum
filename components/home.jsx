import {Button, Title, SegmentedButtons} from "react-native-paper";
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from "react-native";
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
        
        <Search/>
        
        <NumberOfStopsDropDown/>
        
        <Title>Nearby Attraction Preferences</Title>
        
        <ScrollView horizontal={true} style={styles.scrollContainer}>
        <Pressable>
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
          </View>

        </ScrollView>
      
        <Button
          style={styles.button}
          mode="contained"
          title="Submit"
          onPress={ () => {navigation.jumpTo('Trip')} }
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
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: '#FAF3ED'
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
  button: {
    backgroundColor: '#F7B787',
    width:200,
    marginBottom: 15,
    elevation: 6
  },
  attractionButtons: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems:'center',
  },
  attractionImage: {
    height: 80,
    width: 80
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop:15
  },
  card:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center',
    width:150,
    height:150
  },
  cardElevated:{
    backgroundColor: '#FADBBF',
    marginLeft:10,
    borderRadius:100,
    elevation:6,
    shadowColor: 'black',
    shadowOffset:5
  }
});
