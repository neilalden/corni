const config = {
	apiKey: "AIzaSyBsDm99-pBD0J8JgqpvEO5R_YbVFzc67us",
	authDomain: "corn-i.firebaseapp.com",
	projectId: "corn-i",
	storageBucket: "corn-i.appspot.com",
	messagingSenderId: "262999805791",
	appId: "1:262999805791:web:2d536b89b02fdb7e9370ea",
	measurementId: "G-1JQ49PQ5ER",
};
const app = firebase.initializeApp(config);
const db = app.firestore();
db.collection("i2IQs0NtMvORUPt4sEQs", "rando")
	.get()
	.then((doc) => {
		if (doc.exists) {
			console.log("Document data:", doc.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	})
	.catch((error) => {
		console.log("Error getting document:", error);
	});
