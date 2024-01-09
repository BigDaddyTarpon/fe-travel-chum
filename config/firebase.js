const { initializeApp, getApps } = require("firebase/app");
const { initializeAuth, getReactNativePersistence } = require("firebase/auth");
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: "AIzaSyB-7qgePH4hFCgRS_hwhHeImCzLDlckvZg",
	authDomain: "travel-chum-4a5c3.firebaseapp.com",
	projectId: "travel-chum-4a5c3",
	storageBucket: "travel-chum-4a5c3.appspot.com",
	messagingSenderId: "794247707174",
	appId: "1:794247707174:web:eb8963feff451871be44e7",
	measurementId: "G-RWM40W707P",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  module.exports = { app, auth };