import { View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, {
	Callout,
	Marker,
	PROVIDER_GOOGLE,
	Polyline,
} from "react-native-maps";
import { UserLocationContext } from "./Contexts";
import { PreferencesContext } from "../PreferencesContext";
import { MapStyleNight } from "./map-night-style-object.js";

const mapStyle = MapStyleNight;
import {
	formatPolyline,
	getPoisFromMarker,
	getStopMarkerCoordinates,
} from "../Utils/utils";
import CustomCallout from "./CustomCallout.jsx";
import { Text } from "react-native-paper";
import polyline from "google-polyline";

export default function Minimap({ polylineCoordinates, selectedAttractions }) {
	const [mapRegion, setMapRegion] = useState([]);
	// const [stopAttractions, setStopAttractions] = useState([]);
	// const [forceToggle, setForceToggle] = useState(!preferences.isThemeDark);
	const mapRef = React.createRef();

	useEffect(() => {
		if (polylineCoordinates) {
			mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
				animated: true,
			});
		}
	}, [polylineCoordinates]);


	return (
		<View
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<MapView
				ref={mapRef}
				style={{
					width: Dimensions.get("screen").width * 0.95,
					height: Dimensions.get("screen").height * 0.5,
					marginTop: 8,
					marginBottom: 0,
				}}
				provider={PROVIDER_GOOGLE}
				region={mapRegion}
			>
				{polylineCoordinates ? (
					<>
						<Polyline
							coordinates={polylineCoordinates}
							strokeWidth={3}
							strokeColor="blue"
						/>

						<Marker
							identifier="origin"
							coordinate={polylineCoordinates[0]}
							pinColor={"gold"}
						/>
						<Marker
							identifier="destination"
							coordinate={polylineCoordinates[polylineCoordinates.length - 1]}
							pinColor="#00FF00"
						/>
					</>
				) : (
					<></>
				)}
      
			</MapView>
		</View>
	);
}
