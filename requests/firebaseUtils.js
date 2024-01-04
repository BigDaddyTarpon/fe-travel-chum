const { initializeApp, getApps } = require("firebase/app");
const {
	getFirestore,
	doc,
	getDocs,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	collection,
} = require("firebase/firestore");

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
const db = getFirestore(app);

async function getTripById(tripId) {
	const tripRef = doc(db, "trips", tripId);
	const docSnap = await getDoc(tripRef);

	if (docSnap.exists()) {
		const tripData = { [tripId]: docSnap.data() };
		console.log(tripData);
		return tripData;
	} else {
		console.log("Trip doesn't exist!");
		return "Trip doesn't exist!";
	}
}

async function getTripsByUserId(userId = "user1") {
	const querySnapshot = await getDocs(collection(db, "trips"));
	const trips = [];
	querySnapshot.forEach((doc) => {
		if (userId === doc.data().userId) trips.push({ id: doc.id, ...doc.data() });
	});
	console.log(trips);
	return trips;
}

async function getTrips() {
	const querySnapshot = await getDocs(collection(db, "trips"));
	const trips = [];

	querySnapshot.forEach((doc) => {
		trips.push({ id: doc.id, ...doc.data() });
	});
	console.log(trips);
	return trips;
}

async function postTrip({ polyline, userId, origin, destination, tripName }) {
	const tripRef = doc(collection(db, "trips"));
	return await setDoc(tripRef, {
		polyline: polyline,
		userId: userId,
		timestamp: serverTimestamp(),
		origin: origin,
		destination: destination,
		tripName: tripName,
	});
}

async function updateTrip(tripId, updatedTrip) {
	const tripRef = doc(db, "trips", tripId);
	return await updateDoc(tripRef, updatedTrip);
}

async function deleteTrip(tripId) {
	const tripRef = doc(db, "trips", tripId);
	return await deleteDoc(tripRef);
}

getTripsByUserId();

// Example trip objects for testing functions - remove on merge

// const newTrip = {
//   polyline: '123',
//   userId: "user99999",
//   origin: 'start',
//   destination: 'end',
//   tripName: 'newTrip!'
// }

// const updatedTrip = {
//   polyline: '2',
//   tripName: 'updatedTrip!'
// }
