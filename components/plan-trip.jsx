import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button, TextInput, List, SegmentedButtons, IconButton } from "react-native-paper";
import Map from "./map";
import Search from "./Search";
import getPolylineCoordinates, { formatPolyline } from "../Utils/utils";
import { postTrip } from "../requests/firebaseUtils";

export default function PlanTrip() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      origin: "",
      destination: "",
    },
  });

  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState("car");
  const [valueAccomodation, setValueAccomodation] = useState("");
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);
  const [viewMap, setViewMap] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  function onSubmit(data) {
    if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          setPolylineCoordinates(formatPolyline(data));
        }
      );
    }
  }

  function onSave(data) {
    if (origin && destination) {
      getPolylineCoordinates(origin.place_id, destination.place_id).then(
        (data) => {
          postTrip({
            polyline: data.routes[0].overview_polyline.points,
            origin: origin.description,
            destination: destination.description,
            tripName: `${origin.description} to ${destination.description}` ,
          });
        }
      );
    }
  }

  function toggleView() {
    setViewMap(!viewMap);
  }
/* this
<View style={{ flex: 1, flexDirection: 'row', zIndex:3 }}>
        <View style={{ flex: 0.71 }}>
      <Search setOrigin={setOrigin} setDestination={setDestination} />
      </View> 
      <View style={{ flex: 0.29 }} >
      <Text>Enter</Text>
        
      <Controller
        control={control}
        rules={{
          pattern: { value: /^[1-9]$/ },
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={{flex:1, maxWidth:100}}
            label="here"
            placeholder="1-9 here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="stops"
      />
      {errors.stops && <Text>A number between 1 and 9 required.</Text>}
      </View>
      </View>
this*/
  return (
    <>
    <View style={{ flex: 1, flexDirection: 'row', zIndex:3, minHeight:130 }}>
        <View style={{ flex: 0.7 }}>
      <Search setOrigin={setOrigin} setDestination={setDestination} />
      </View> 
      <View style={{ flex: 0.3, minHeight:100,  }} >
        <IconButton style={{ width:100, minHeight:100 }} mode="outlined"  onPress={toggleView} icon={()=>(
          <Text numberOflines={3}>{viewMap ? 'More Trip Options' : 'View Map'}</Text>
        )}>
        
        </IconButton>
        </View>
      </View>
      
      <Controller
        control={control}
        rules={{
          pattern: { value: /^[1-9]$/ },
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Number of Stops"
            placeholder="Enter a number of stops here (1-9)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="stops"
      />
      {errors.stops && <Text>A number between 1 and 9 required.</Text>}


      

      {viewMap ? (
        <Map polylineCoordinates={polylineCoordinates} />
      ) : (
        <ScrollView>
        <View>
          <List.Accordion
            title="Mode of Transport"
            left={(props) => <List.Icon {...props} icon={checked} />}
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Car"
              onPress={() => setChecked("car")}
              left={(props) => <List.Icon {...props} icon="car" />}
            />
            <List.Item
              title="Train"
              onPress={() => setChecked("train")}
              left={(props) => <List.Icon {...props} icon="train" />}
            />
            <List.Item
              title="Bus/Coach"
              onPress={() => setChecked("bus")}
              left={(props) => <List.Icon {...props} icon="bus" />}
            />
            <List.Item
              title="Bicycle"
              onPress={() => setChecked("bicycle")}
              left={(props) => <List.Icon {...props} icon="bicycle" />}
            />
            <List.Item
              title="Walk"
              onPress={() => setChecked("walk")}
              left={(props) => <List.Icon {...props} icon="walk" />}
            />
          </List.Accordion>
        </View>

        <SafeAreaView style={styles.container}>
          <SegmentedButtons
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
              { value: "camping", label: "Camping", showSelectedCheck: true },
            ]}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            multiSelect
            value={group1}
            onValueChange={setGroup1}
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
              { value: "shopping", label: "Shopping", showSelectedCheck: true },
            ]}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            multiSelect
            value={group2}
            onValueChange={setGroup2}
            buttons={[
              {
                value: "parks&nature",
                label: "Parks/Nature",
                showSelectedCheck: true,
              },
              {
                value: "hike",
                label: "Hikes/Walks",
                showSelectedCheck: true,
              },
              { value: "Wildlife", label: "Wildlife", showSelectedCheck: true },
            ]}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            multiSelect
            value={group3}
            onValueChange={setGroup3}
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
              { value: "Theatre", label: "Theatre", showSelectedCheck: true },
            ]}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <SegmentedButtons
            multiSelect
            value={group4}
            onValueChange={setGroup4}
            buttons={[
              {
                value: "Theme Parks",
                label: "Theme Parks",
                showSelectedCheck: true,
              },
              {
                value: "Sports&Leisure",
                label: "Sports/Leisure",
                showSelectedCheck: true,
              },
              { value: "Cinema", label: "Cinema", showSelectedCheck: true },
            ]}
          />
        </SafeAreaView>
      </ScrollView>
      )}

      <Button
        // style={styles.button}
        mode="contained"
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      >
        Start your Journey
      </Button>

      <Button
        // style={styles.button}
        mode="outlined"
        title="SaveTrip"
        onPress={handleSubmit(onSave)}
      >
        Save Trip
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "beige",
  },
  destinationcontainer: {
    minHeight: 200,
  },
});
