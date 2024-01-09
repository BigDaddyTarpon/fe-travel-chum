import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import {
  Button,
  Text,
  useTheme,
  TextInput,
  Dialog,
  Icon,
} from "react-native-paper";
import { getTripsByCurrentUser } from "../requests/firebaseUtils";
import { PreferencesContext } from "../PreferencesContext";

export default function Login() {
  const preferences = useContext(PreferencesContext);
  theme = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tripsByUser, setTripsByUser] = useState([
    { tripName: "test tripName", id: 1 },
  ]);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

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
        setTripsByUser(data)
      });
    } else {
      setTripsByUser([{ tripName: "Please sign in to view trips!", id: 1 }]);
    }
  }, [isLoggedIn]);


  const Trip = ({ tripName, destination, origin, createdTime }) => (
    <View style={styles.item}>
      <Text style={styles.title} variant="titleMedium">
        {tripName}
      </Text>
      <Text style={styles.title}>From: {destination}</Text>
      <Text style={styles.title}>To: {origin}</Text>
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
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );

  const PleaseLogin = () => (
    <Dialog visible={true}>
      <Dialog.Title>Please log in to view saved trips...</Dialog.Title>
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
    </Dialog>
  );

  return (
    <>
   <Text style={{ padding: 10 }}>
        Current User:{" "}
        {isLoggedIn ? auth.currentUser.email : "No User currenty logged in"}
      </Text>
      
      {isLoggedIn ? (<Button mode="contained-tonal" onPress={logout}>
        Logout
      </Button>) : (

      
        <>
          <Button
            mode="contained"
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoggedIn}
          >
            Login
          </Button>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ color: preferences.isThemeDark ? "white" : "black" }}
                // mode='flat'
                // style={{ color: preferences.isThemeDark ? 'white' : 'black' }}
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
                style={{ color: preferences.isThemeDark ? "white" : "black" }}
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
  button: {
    backgroundColor: "beige",
  },
  containerList: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#838383",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
