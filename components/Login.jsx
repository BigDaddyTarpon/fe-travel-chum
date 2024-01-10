import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { Controller, useForm } from "react-hook-form";
import { useIsFocused, useTheme } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
} from "react-native";
import {
  Modal,
  Text,
  TextInput,
  Dialog,
  Icon,
  Portal,
  Title,
  Button,
} from "react-native-paper";
import {
  deleteTrip,
  getTripById,
  getTripsByCurrentUser,
} from "../requests/firebaseUtils";
import TripOverViewCards from "./TripOverviewCards";
import { Overlay } from "@rneui/themed";

export default function Login() {
  theme = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tripsByUser, setTripsByUser] = useState([]);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [tripData, setTripData] = useState({});
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "travelchumguy@gmail.com",
      password: "travelchum",
    },
  });

  async function logout() {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setIsPasswordShown(false);
    } catch {}
  }

  function onSubmit(data) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (isLoggedIn) {
      getTripsByCurrentUser().then((data) => {
        setTripsByUser(data);
      });
    } else {
      setTripsByUser([
        {
          tripName: "Loading...",
          destination: "Loading...",
          origin: "Loading...",
          id: 1,
        },
      ]);
    }
  }, [isLoggedIn, isFocused]);

  const Trip = ({ tripName, destination, origin, createdTime, tripId }) => (
    <View style={styles.item}>
      <Text style={styles.title} variant="titleMedium">
        {tripName}
      </Text>
      <Text style={styles.title}>From: {destination}</Text>
      <Text style={styles.title}>To: {origin}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{ marginLeft: 5, backgroundColor: "#F7B787" }}
          mode="contained-tonal"
          title="Delete Trip"
          onPress={() => {
            getTripById(tripId).then((data) => {
              setVisibleModal(true);
              setTripData(data);
            });
          }}
        >
          View Trip
        </Button>
        <Portal>
          <Modal
            visible={visibleModal}
            onDismiss={() => setVisibleModal(false)}
            contentContainerStyle={{
              alignSelf: "center",
              width: "80%",
            }}
          >
            <TripOverViewCards tripData={tripData} />
          </Modal>
        </Portal>
        <Button
          style={{ marginLeft: 5, backgroundColor: "#F7B787" }}
          mode="contained-tonal"
          title="Delete Trip"
          onPress={() => {
            deleteTrip(tripId)
              .then(() => {
                return getTripsByCurrentUser();
              })
              .then((data) => {
                setTripsByUser(data);
              });
          }}
        >
          Delete Trip
        </Button>
      </View>
      <Text variant="labelMedium">Created: {createdTime}</Text>
    </View>
  );

  const RenderList = () => (
    <FlatList
      data={tripsByUser}
      renderItem={({ item }) => (
        <Trip
          tripName={item.tripName}
          destination={item.destination}
          origin={item.origin}
          createdTime={item.createdTime}
          tripId={item.id}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );

  const PleaseLogin = () => (
    <View visible={true} style={styles.dialog}>
      <Title>Please log in to view saved trips...</Title>
      <Text variant="titleMedium" style={{ padding: 10 }}>
        Simply press 'login' to log in as a guest.
      </Text>
      <Text style={{ paddingLeft: 10 }}>email: "travelchumguy@gmail.com",</Text>
      <Text style={{ paddingLeft: 10 }}>password: "travelchum" </Text>
      <Text style={{ padding: 10 }}>
        We have pre-set the username and password to our guest account. If you
        change the values in these fields our security checks won't allow you to
        log in, unless you enter correct acount details.
      </Text>
    </View>
  );

  return (
    <>
      <Text style={{ padding: 10 }}>
        Current User:{" "}
        {isLoggedIn ? auth.currentUser.email : "No User currenty logged in"}
      </Text>

      {isLoggedIn ? (
        <Button
          mode="contained"
          style={styles.logInOutbutton}
          textColor="black"
          onPress={logout}
        >
          Logout
        </Button>
      ) : (
        <>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ color: "white" }}
                label="email"
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ color: "white" }}
                label="password"
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!isPasswordShown}
                right={
                  <TextInput.Icon
                    icon={isPasswordShown ? "eye" : "eye-off"}
                    onPress={() => {
                      setIsPasswordShown(!isPasswordShown);
                    }}
                  />
                }
              />
            )}
            name="password"
          />
          <Button
            style={styles.logInOutbutton}
            mode="contained-tonal"
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoggedIn}
          >
            Login
          </Button>
        </>
      )}

      <SafeAreaView style={styles.containerList}>
        {isLoggedIn ? <RenderList /> : <PleaseLogin />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logInOutbutton: {
    backgroundColor: "#B2C8B3",
    width: "50%",
    marginLeft: 100,
    borderColour: "black",
    borderStyle: "solid",
    borderWidth: 1,
    color: "white",
    marginTop: 20,
  },
  containerList: {
    flex: 1,
  },
  item: {
    backgroundColor: "#FADDC4",
    borderRadius: 7,
    borderWidth: 2,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    width: Dimensions.get("screen").width * 0.7,
  },
  dialog: {
    display: "flex",
    backgroundColor: "#D8E7EB",
    borderRadius: 7,
    borderWidth: 2,
    padding: 20,
    marginTop: 30,
    width: "85%",
    marginLeft: 30,
  },
});
