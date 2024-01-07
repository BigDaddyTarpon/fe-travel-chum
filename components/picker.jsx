import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PreferencesContext } from '../PreferencesContext';
// import { useTheme } from 'react-native-paper';


const NumberPicker = () => {
    // const theme=useTheme()
    const preferences = useContext(PreferencesContext)
    console.log(theme)
  const [selectedValue, setSelectedValue] = useState("1");

  return (
    <View style={{flex: 1, alignItems: "center"}}>
      <Text style={{
        color: preferences.isThemeDark ? 'white' : 'black'}}
      >no. of stops:</Text>
      <Picker
    //   
      style={{width: 90, color: preferences.isThemeDark ? 'white' : 'black',}}
        selectedValue={selectedValue}
       
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
      </Picker>
    </View>
  );
};

export default NumberPicker;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    
    destinationcontainer: {
      minHeight: 200,
    },
    pickerContainer: {
      borderWidth: 1, // Fine line width
      borderColor: 'black', // Line color
      borderRadius: 10, // Rounded corners
      overflow: 'hidden', // Ensures the child picker does not overlap the rounded corners
    },
    picker: {
      width: 90,
    },
    title: {
    //  color: {preferences.isThemeDark ? 'white' : 'black'},
      textAlign: 'center',
      marginBottom: 0, 
    },
  });
  