import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StopsContext } from './Contexts';

export default function NumberOfStopsDropDown() {
const {stops, setStops} = useContext(StopsContext)
const numberOfStops = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  return (
<SelectDropdown
    defaultButtonText='Number of stops'
    buttonStyle={styles.dropdown1BtnStyle}
    buttonTextStyle={styles.dropdown1BtnTxtStyle}
    renderDropdownIcon={isOpened => {
        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
    }}
    dropdownIconPosition={'right'}
    dropdownStyle={styles.dropdown1DropdownStyle}
    rowStyle={styles.dropdown1RowStyle}
    rowTextStyle={styles.dropdown1RowTxtStyle}
	data={numberOfStops}
	onSelect={(selectedStops, index) => {
		setStops(selectedStops)
	}}
/>
  )
};

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        marginTop:20,
        width: 190,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#444',
      },
      dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
      dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
      dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
      dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    
})