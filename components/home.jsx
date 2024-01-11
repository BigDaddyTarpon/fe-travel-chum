import { Dialog } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <>
      <Dialog visible={true}>
        <Dialog.Title>Welcome to Travel Chum.</Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          Swipe sideways or click a tab at the top to navigate.
        </Dialog.Title>

        <Dialog.Title style={{ fontSize: 20 }}>
          You can toggle Dark Mode with the switch at the top right.
        </Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          Login and view your saved trips in the 'My Trips' tab.
        </Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          You can enter details in the 'Trip Planner' tab to see your journey displayed on a map.
        </Dialog.Title>
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});
