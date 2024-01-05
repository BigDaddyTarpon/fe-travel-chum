import { View, Text, TextInput, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import Colours from '../SharedStyling/Colours'
import React from 'react'
import OriginInput from './OriginInput'
import DestinationInput from './DestinationInput'

export default function Search({setOrigin, setDestination}) {
  return (
    <>
    <View style={styles.searchContainer}>
      <OriginInput setOrigin={setOrigin}/>
    </View>
    <View style={styles.searchContainer}>
      <DestinationInput setDestination={setDestination}/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  searchBar:{
      borderWidth:1,
      borderColor:Colours.black,
      borderRadius:40,
      padding:5,
      marginLeft:0,
      marginTop:100,
      width:Dimensions.get('screen').width*0.3,
      backgroundColor:Colours.white
  },

  searchContainer:{
    paddingLeft:50,
    display:'flex',
    flexWrap: 'wrap', 
    flexDirection:'row', 
    justifyContent: 'center', 
    alignItems:'center', 
    marginTop:20
  }
})