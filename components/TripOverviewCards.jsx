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
import Map from "./map";
import Minimap from "./Minimap";

const TripOverViewCards = ({ tripData }) => (

	
  <View>
		<Text variant="displayMedium" style={{ textAlign: "center" }}>
			{tripData.tripName}
		</Text>
		<Text variant="headlineSmall" style={{ textAlign: "center" }}>
			{tripData.origin}
		</Text>
		<Divider />
		<FlatList
			data={tripData.selectedAttractions}
			renderItem={({ item }) => (
				<>
					<Text variant="titleMedium">{item.name}</Text>
					<Text>{item.vicinity}</Text>
					<Divider />
				</>
			)}
			keyExtractor={(item) => item.place_id}
		/>

		<Text variant="headlineSmall" style={{ textAlign: "center" }}>
			{tripData.destination}
		</Text>
		<Minimap polylineCoordinates={tripData.polyline} selectedAttractions={tripData.selectedAttractions}/>
	</View>
);
export default TripOverViewCards;
