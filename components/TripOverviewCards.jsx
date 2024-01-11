import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import {
  Button,
  Text,
  useTheme,
  TextInput,
  Dialog,
  Icon,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import {
  getTripsByCurrentUser,
  deleteTrip,
  getTripById,
} from "../requests/firebaseUtils";
import { PreferencesContext } from "../PreferencesContext";
import { useIsFocused } from "@react-navigation/native";

 const TripOverViewCards = ({tripData}) => (
<View style={{backgroundColor: "#D8E7EB", padding: 10}}>

<Text variant="displayMedium" style={{textAlign:'center'}}>{tripData.tripName}</Text>
<Text variant="headlineSmall" style={{textAlign:'center', borderBottomWidth: 1, paddingBottom: 10}}>{tripData.origin}</Text>

<FlatList data={tripData.selectedAttractions}
renderItem={({ item }) => (
   <>
    <Text variant="titleMedium">{item.name}</Text>
   <Text style={{borderBottomWidth: 1, paddingBottom: 10}}>{item.vicinity}</Text>
   
   </> 
  )}
    keyExtractor = {(item)=>item.place_id} 
/>

<Text variant="headlineSmall" style={{textAlign:'center'}}>{tripData.destination}</Text>
</View>


)
export default TripOverViewCards