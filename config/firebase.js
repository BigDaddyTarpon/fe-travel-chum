const { initializeApp, getApps } = require("firebase/app");
const { getAuth } = require("firebase/auth");

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
const auth = getAuth(app);

module.exports = { app, auth };
