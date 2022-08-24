import firebase from "firebase/compat/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "firebase/compat/auth";

/////////////////////////////////////////
const app = firebase.initializeApp({
  apiKey: "AIzaSyBWbH5D6LphZ8s9Jn6NPmguKkm5QgB6B5w",
  authDomain: "my-react-app-36b12.firebaseapp.com",
  projectId: "my-react-app-36b12",
  storageBucket: "my-react-app-36b12.appspot.com",
  messagingSenderId: "208370546520",
  appId: "1:208370546520:web:8e654943b2ad8c57e1972d",
  measurementId: "G-712SJW7CV8",
});
const db = getFirestore(app);
const auth = app.auth();

////////////////sign in with gooogle/////////////

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}

/////////////////send Messages///////////////////
async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      photo: user.photoURL,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}
////////////////////get Messages////////////////
function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

export { loginWithGoogle, sendMessage, getMessages, auth };
