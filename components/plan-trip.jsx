import { StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
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
  
   function onSubmit (data){
     setRouteOptions(data);
   } 

  return (
    <>
    <Map />
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
    {errors.origin && <Text style={{color: 'black'}}>An origin is required. <Text style={{color: 'white'}} >An origin is required.</Text></Text>}

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
    {errors.destination && <Text style={{color: 'black'}}>A destination is required. <Text style={{color: 'white'}} >A destination is required.</Text></Text>}
    
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
    {errors.stops && <Text style={{color: 'black'}}>A number between 1 and 9 required. <Text style={{color: 'white'}} >A number between 1 and 9 is required.</Text></Text>}

    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
});