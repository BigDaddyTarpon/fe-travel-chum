const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("./travel-chum-4a5c3-c342bd52f360.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function getTrips() {
  const snapshot = await db.collection("trips").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

async function postTrip() {
  const addTrip = db.collection("trips").doc();

  await addTrip.set({
    polyline: "afgagadfgadfghadfhadfafhga!!",
    tripName: "5th Trip!",
    userId: ["user1","user2","user3"],
    timestamp: FieldValue.serverTimestamp()
  });
}

async function updateTrip() {
    const updateTrip = db.collection("trips").doc("QHKrglpbTGBms3K2UWM9");
  
    await updateTrip.update({
      tripName: "5th Trip-part2!",
      userId: ["user1","user2","user3","user4"],
      timestamp: FieldValue.serverTimestamp()
    });
  }

  async function deleteTrip() {
    const updateTrip = await db.collection("trips").doc("UfSsRVUZKrUkLwCYy6Zs").delete();
  }

