import {

  Dialog,
} from "react-native-paper";
import { StyleSheet, } from "react-native";



export default function Home() {
  return (
    <>
      <Dialog visible={true}>
        <Dialog.Title>Welcome to Travel Chum.</Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
        
          Swipe sideways or click a tab at the top to navigate.
        </Dialog.Title>

        <Dialog.Title style={{ fontSize: 20 }}>
        You can select Darkmode with the switch at the top right.
        </Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          login, with the icon top right.
        </Dialog.Title>
        <Dialog.Title style={{ fontSize: 20 }}>
          You can enter details on 'plan a trip' to see the trip dispayed on the
          map.
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