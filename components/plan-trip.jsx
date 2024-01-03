import { StyleSheet, View, Text, ScrollView,} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Button, TextInput, List, } from 'react-native-paper';
import Map from './map';

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

  const [routeOptions, setRouteOptions] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState("car");

  const handlePress = () => setExpanded(!expanded);

   function onSubmit (data){
     setRouteOptions({...data, modeOfTransport:checked});
    
   } 

  return (
    <>
    <Map routeOptions={routeOptions}/>

    <ScrollView>
    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        label="Origin"
        placeholder="enter an address or postcode here"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
      />
      )}
      name="origin"
    />
    {errors.origin && <Text>An origin is required.</Text>}

    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        label="Destination"
        placeholder="enter an address or postcode here"
        onBlur={onBlur}
            onChangeText={onChange}
            value={value}
      />
      )}
      name="destination"
    />
    {errors.destination && <Text>A destination is required.</Text>}
    
    <Controller
        control={control}
        rules={{ 
          pattern: {value: /^[1-9]$/},
          required: true
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

    <Button style={styles.button} title="Submit" onPress={handleSubmit(onSubmit)}>Start your journey</Button>
    
    <View>
        <List.Accordion
          title="<-Selected. Open/close options here."
          left={(props) => <List.Icon {...props} icon={checked} />}
          expanded={expanded}
          onPress={handlePress}
        >
          <List.Item
            title="car"
            onPress={() => setChecked("car")}
            left={(props) => <List.Icon {...props} icon="car" />}
          />
          <List.Item
            title="train"
            onPress={() => setChecked("train")}
            left={(props) => <List.Icon {...props} icon="train" />}
          />
          <List.Item
            title="bus/coach"
            onPress={() => setChecked("bus")}
            left={(props) => <List.Icon {...props} icon="bus" />}
          />
          <List.Item
            title="bicycle"
            onPress={() => setChecked("bicycle")}
            left={(props) => <List.Icon {...props} icon="bicycle" />}
          />
          <List.Item
            title="walk"
            onPress={() => setChecked("walk")}
            left={(props) => <List.Icon {...props} icon="walk" />}
          />
        </List.Accordion>
      </View>
    
    
    </ScrollView>
    </>

  )
}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "beige"
  }
});