import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const WheelPicker = ({ onIndexChange = () => {}, itemHeight = 25 }) => {
  const items =  ['', ...Array.from({ length: 10 }, (_, index) => index.toString()), ''];
  ;

  const renderItem = ({ item }) => {
    return (
      
      <Text style={[styles.pickerItem, { height: itemHeight }]}>{item}</Text>
      
    );
  };

  const momentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onIndexChange(index - 1); 
  };

  return (
    <View style={{height: itemHeight * 3}}>
      <FlatList
      
        data={items}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
      />
      <View style={[styles.indicatorHolder, {top: itemHeight}]}>
        <View style={[styles.indicator]} />
        <View><Text>Stops;</Text></View>
        <View style={[styles.indicator, {marginTop: itemHeight}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listcontainercontainer: {
    // maxWidth:15,
    height: 30,
    position: 'relative',
     // Adjust height as needed
    // backgroundColor: '#000', // Black background
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingLeft: 10,
    // color: '#FFF', // White text
  },
  indicatorHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  indicator: {
    width: 120,
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
});

export default WheelPicker;
