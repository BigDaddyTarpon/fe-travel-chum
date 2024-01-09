// CustomAppBar.js
import React from "react";
import { Appbar, Badge, Switch } from "react-native-paper";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "expo-constants";

const CustomAppBar = ({ isThemeDark, toggleTheme }) => {
  return (
    <Appbar style={{ marginTop: Constants.statusBarHeight }}>
      <Appbar.Content title="Travel Chum" />
      <Image
        style={styles.Image}
        source={require("../assets/Travel-Chum-Logo.png")}
      />
      <Switch
        color={"purple"}
        value={isThemeDark}
        onValueChange={toggleTheme}
      />
      <Badge>dark</Badge>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => alert("ff")}
      >
        <Appbar.Action icon="account" />
        <Badge>login</Badge>
      </TouchableOpacity>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  Image: {
    height: "100%",
    width: "15%",
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default CustomAppBar;
