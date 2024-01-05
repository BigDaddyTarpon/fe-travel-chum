import axios from "axios";
import polyline from "google-polyline";
import { GOOGLE_API_KEY } from "../environments";
import { useContext } from "react";
import { PolylineContext } from "../components/Contexts";
import { DestinationContext } from "../components/Contexts";

function getPolylineCoordinates(origin, destination) {
  // const {polylineCoordinates, setPolylineCoordinates} = useContext(PolylineContext)
  // make sure to add your api key to the end of the query string
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${GOOGLE_API_KEY}`
    )
    .then(({ data }) => {
      const steps = data.routes[0].legs[0].steps;
      let coordinates = [];
      steps.forEach((step) => {
        const polyArray = polyline.decode(step.polyline.points);
        polyArray.forEach((point) => {
          const mappedPoint = {
            latitude: point[0],
            longitude: point[1],
          };
          coordinates.push(mappedPoint);
        });
      });
      return coordinates;
    });
}

export const getPoisFromMarker = (coordinates) => {
  // add api key in here too
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&radius=1000&type=point_of_interest&key=`
    )
    .then(({ data }) => {
      return data.results;
    });
};

export const getStopMarkerCoordinates = (arr, stops) => {
  let markerCoordinates = [];
  markerCoordinates.push(arr[0]);
  for (let i = 0; i < stops; i++) {
    const markerCoordinate =
      arr[Math.floor(arr.length * ((i + 1) / (stops + 1)))];
    markerCoordinates.push(markerCoordinate);
  }
  markerCoordinates.push(arr[arr.length - 1]);
  return markerCoordinates;
};

export default getPolylineCoordinates;
