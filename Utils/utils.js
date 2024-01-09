import axios from "axios";
import polyline from "google-polyline";
import { GOOGLE_API_KEY } from "../environments";

function getPolylineCoordinates(origin, destination) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${GOOGLE_API_KEY}`
    )
    .then(({ data }) => {
      return data;
    });
}

export const formatPolyline = (data) => {
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
};

export const getPoisFromMarker = (coordinates, accomodation, options) => {
  let keywordStr = "keyword=";
  if (accomodation) {
    keywordStr += accomodation + "|"
  };
  options.forEach((option, index) => {
    if (index === options.length -1) {
      keywordStr += option + "&"
    } else {
      keywordStr += option + "|";
    }
  });
  keywordStr += "&";

  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${keywordStr}location=${coordinates.latitude},${coordinates.longitude}&radius=2000&key=${GOOGLE_API_KEY}`
    )
    .then(({ data }) => {
      return data.results;
    });
};

export const getStopMarkerCoordinates = (arr, stops) => {
    let markerCoordinates = [];
    for (let i = 0; i < +stops; i++) {
      const markerCoordinate =
        arr[Math.floor(arr.length * ((i + 1) / (+stops + 1)))];
      markerCoordinates.push(markerCoordinate);
    }
    return markerCoordinates;
  };

export default getPolylineCoordinates;
