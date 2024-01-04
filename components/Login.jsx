import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { getTripsByCurrentUser, postTrip } from "../requests/firebaseUtils";

export default function Login() {
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
			<Button onPress={logout}>Logout</Button>
			<Button
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
