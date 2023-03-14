import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOyAHNuLK0QxICpksOTIwSWtogpPrLMZ0",
  authDomain: "crwn-clothing-db-e8589.firebaseapp.com",
  projectId: "crwn-clothing-db-e8589",
  storageBucket: "crwn-clothing-db-e8589.appspot.com",
  messagingSenderId: "613002888876",
  appId: "1:613002888876:web:d436b941bfce8719ad8109",
  measurementId: "G-3D5TYFY465",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore(firebaseApp);
const createUserDocumentFromAuth = async (userAuth) => {
  const userRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userRef);
  if (userAuth.exists) {
    console.log("User exists", userSnap.data());
  } else {
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      // Write user infomation to Firestore
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export { signInWithGooglePopup, auth, db, createUserDocumentFromAuth };
