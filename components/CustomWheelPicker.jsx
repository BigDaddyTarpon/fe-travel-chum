import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const WheelPicker = ({ onIndexChange = () => {}, itemHeight }) => {
  const items = Array.from({ length: 10 }, (_, index) => index.toString());

  const renderItem = ({ item }) => {
    return (
      <Text style={[styles.pickerItem, { height: itemHeight }]}>{item}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
          onIndexChange(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto', // Adjust height as needed
    backgroundColor: '#000', // Black background
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFF', // White text
  },
});

export default WheelPicker;
