
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

const clientCredentials = {
  apiKey : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderID : process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

firebase.initializeApp(clientCredentials);

export default firebase;
