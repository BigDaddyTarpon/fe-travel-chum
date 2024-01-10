import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PreferencesContext } from "../PreferencesContext";

const WheelPicker = ({ selectedValue, passProp }) => {
  const preferences = useContext(PreferencesContext);
  const items = [
    "",
    ...Array.from({ length: 10 }, (_, index) => index.toString()),
    "",
  ];
  const itemHeight = 25;

  const renderItem = ({ item }) => {
    return (
      <Text
        style={[
          styles.pickerItem,
          { height: itemHeight },
          { color: preferences.isThemeDark ? "white" : "black" },
        ]}
      >
        {item}
      </Text>
    );
  };

  const momentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);

    passProp(index);
  };

  return (
    <View style={{ height: itemHeight * 3 }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
      />
      <View style={[styles.indicatorHolder, { top: itemHeight }]}>
        <View style={[styles.indicator]} />
        <View>
          <Text style={{ color: preferences.isThemeDark ? "white" : "black" }}>
            Stops:
          </Text>
        </View>
        <View style={[styles.indicator, { marginTop: 5 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listcontainercontainer: {
    height: 30,
    position: "relative",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "25%",
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 10,
  },
  indicatorHolder: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  indicator: {
    width: 120,
    height: 1,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
});

export default WheelPicker;
