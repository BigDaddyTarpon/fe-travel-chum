import { FlatList, View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

const TripOverViewCards = ({ tripData }) => (
  <View style={styles.container}>
    <Text
      variant="headlineMedium"
      style={{ textAlign: "center", marginBottom: 10 }}
    >
      {tripData.tripName}
    </Text>
    <Text variant="headlineSmall" style={{ textAlign: "left" }}>
      Origin: {tripData.origin}
    </Text>
    <Text variant="headlineSmall" style={{ textAlign: "left" }}>
      Destination: {tripData.destination}
    </Text>
    <Text variant="headlineSmall" style={{ marginTop: 10, marginBottom: 5 }}>
      Saved Attractions:
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
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D8E7EB",
    padding: 20,
  },
});
export default TripOverViewCards;
