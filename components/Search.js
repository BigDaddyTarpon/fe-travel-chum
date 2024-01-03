import { View, Text, TextInput, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import Colours from '../SharedStyling/Colours'
import React from 'react'
import OriginInput from './OriginInput'
import DestinationInput from './DestinationInput'

export default function Search() {
  return (
    <>
    <View style={styles.searchContainer}>
      <Text style={{marginRight:5}}>Origin:</Text>
      <OriginInput placeholder={"Origin..."}/>
    </View>
    <View style={styles.searchContainer}>
      <DestinationInput placeholder={"Destination..."}/>
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
    display:'flex',
    flexWrap: 'wrap', 
    flexDirection:'row', 
    justifyContent: 'center', 
    alignItems:'center', 
    marginTop:20
  }
})