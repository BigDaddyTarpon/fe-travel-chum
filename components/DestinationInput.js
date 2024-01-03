import React, { useContext, useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environments';
import Colours from '../SharedStyling/Colours';
import { Dimensions } from 'react-native';
import getPolylineCoordinates from '../Utils/utils';
import { PolylineContext } from './Contexts';

const DestinationInput = ({placeholder}) => {
  const [ destination, setDestination ] = useState(null);
  const {polylineCoordinates, setPolylineCoordinates} = useContext(PolylineContext)

  
  useEffect(() => {
    if (destination) {
    getPolylineCoordinates(origin).then(
      (res) => {
        setPolylineCoordinates(res)
        setOrigin(null)
      }
    )
    }
  }, [origin])

  return (
    <GooglePlacesAutocomplete
      placeholder= {placeholder}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setOrigin(data.place_id)
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        textInputContainer: {
            borderWidth:1,
            borderColor:Colours.black,
            borderRadius:20,
            padding:5,
            marginLeft:0,
            marginTop:0,
            width:Dimensions.get('screen').width*0.7,
            backgroundColor:Colours.white
          },
    
      }}
    />
  );
};

export default DestinationInput;