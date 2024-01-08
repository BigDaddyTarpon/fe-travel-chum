import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useContext } from "react";
import { auth } from "../config/firebase";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { getTripsByCurrentUser, postTrip } from "../requests/firebaseUtils";
import { PreferencesContext } from '../PreferencesContext';

export default function Login() {
	const preferences=useContext(PreferencesContext)
	theme=useTheme()

	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
		} catch {}
	}

	function onSubmit(data) {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				setIsLoggedIn(true);
        getTripsByCurrentUser()

			})
			.catch((err) => console.error(err));
	}

	return (
		<>
		<Text variant="titleMedium" style={{padding: 10}}>Simply press 'login' to log in as a guest.</Text>
		<Text style={{paddingLeft: 10}}>email: "travelchumguy@gmail.com",</Text>
		<Text style={{paddingLeft: 10}}>password: "travelchum" </Text>
		<Text style={{padding: 10}}>We have pre-set the username and password to our guest account. If you change the values in these fields our security checks won't allow you to log in, unless you enter correct acount details.</Text>
			<Text style={{padding: 10}}>Current User: {isLoggedIn && auth.currentUser.email}</Text>
			<Button mode='contained-tonal' onPress={logout}>Logout</Button>
			<Button mode='contained'
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
					style={{ color: preferences.isThemeDark ? 'white' : 'black' }}
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
					style={{ color: preferences.isThemeDark ? 'white' : 'black' }}
						label="password"
						placeholder="Password"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}

					/>
				)}
				name="password"
			/>
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
});
