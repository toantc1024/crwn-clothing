import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

const addCollectionAndDocument = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;
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
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userSnap;
};

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = async () => await signOut(auth);

const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export {
  signInWithGooglePopup,
  auth,
  db,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  onAuthStateChangedListener,
  addCollectionAndDocument,
  getCategoriesAndDocuments,
};
