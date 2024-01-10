import { StyleSheet, View, Image } from "react-native";
import { Title } from "react-native-paper";
import { GOOGLE_API_KEY } from "../environments";

export default function PlacesCard({ attraction }) {
  return (
    <View style={styles.container}>
      <Title>{attraction.name}</Title>
      {/* {console.log(attraction.photos)} */}
      
      {attraction.photos ? (<Image
        source={{
          uri:
          "https://maps.googleapis.com/maps/api/place/photo" +
          "?maxwidth=400" +
          "&photo_reference="+
          attraction.photos[0].photo_reference +
          "&key=" + GOOGLE_API_KEY,
        }}
        style={{width:290, height: 200}}
        
        />):(<></>)}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 7,
    marginTop: 7,
    width: "85%",
    height: "auto",
    padding: 8,
  },
});
