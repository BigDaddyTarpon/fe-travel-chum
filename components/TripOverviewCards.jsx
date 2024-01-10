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
} from "react-native-paper";
import {
  getTripsByCurrentUser,
  deleteTrip,
  getTripById,
} from "../requests/firebaseUtils";
import { PreferencesContext } from "../PreferencesContext";
import { useIsFocused } from "@react-navigation/native";

 const TripOverViewCards = ({tripData}) => (
<View>

<Text>{tripData.tripName}</Text>
<Text>{tripData.origin}</Text>
<FlatList data={tripData.selectedAttractions}
renderItem={({ item }) => (
   <>
    <Text>{item.name}</Text>
   <Text>{item.vicinity}</Text>
   </> 
  )}
    keyExtractor = {(item)=>item.place_id} 
/>

<Text>{tripData.destination}</Text>
</View>


)
export default TripOverViewCards