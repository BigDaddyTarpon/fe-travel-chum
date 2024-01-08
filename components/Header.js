import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import Colours from '../SharedStyling/Colours'

export default function Header() {
    return (
    <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#527853', padding:25}}>
        <Image source={require('../assets/Travel-Chum-Logo.png')}
        style={styles.logo}/>
        <Text style={{fontWeight:'bold', fontSize:30, color:'white', paddingTop:20}}>Travel Chum</Text>
    </View>

    )
}

const styles = StyleSheet.create({
    logo:{
        width:70,
        height:70,
        marginTop:20,
    }
})