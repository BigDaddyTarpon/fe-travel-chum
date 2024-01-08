import React, { useContext } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environments';
import Colours from '../SharedStyling/Colours';
import { Dimensions } from 'react-native';
import { OriginContext } from './Contexts';

const OriginInput = () => {
  const {origin, setOrigin} = useContext(OriginContext)

  return (
    <GooglePlacesAutocomplete
      placeholder= "origin..."
      onPress={(data, details = null) => {
        setOrigin(data)
      }}
      query={{
        input: {fields: ['place_id', 'name', 'Location']},
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
            marginBottom:20,
            width:Dimensions.get('screen').width*0.7,
            backgroundColor:Colours.white
          },
    
      }}
    />
  );
};

export default OriginInput;