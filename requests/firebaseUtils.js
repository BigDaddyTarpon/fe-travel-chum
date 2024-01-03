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

const serviceAccount = require("../travel-chum-4a5c3-4cdab0770d10.json");

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
  return await addTrip.create({
    polyline: "afgagadfgadfghadfhadfafhga!!",
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

postTrip().catch(err => console.log(err))