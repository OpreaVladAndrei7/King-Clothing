import {initializeApp} from "firebase/app";

import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9l7XQv5W7_5lzgao-uQUYpLiXXoWGkj0",
    authDomain: "king-clothing-db-82fc6.firebaseapp.com",
    projectId: "king-clothing-db-82fc6",
    storageBucket: "king-clothing-db-82fc6.appspot.com",
    messagingSenderId: "709595745087",
    appId: "1:709595745087:web:4bdcd38c6069cf1153e18a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider= new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
        const userDocRef = doc (db, "users", userAuth.uid);
        const userSnapshot= await getDoc(userDocRef);
        if(!userSnapshot.exists()){
            const { displayName, email} = userAuth;
            const createdAt= new Date();
            try{
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt
                });
            }
            catch(err) {
                console.log("eeror creating the user", err.message);
            }
        }
  }