import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "ton-api-key",
  authDomain: "ton-projet.firebaseapp.com",
  projectId: "ton-projet",
  storageBucket: "ton-projet.appspot.com",
  messagingSenderId: "ton-sender-id",
  appId: "ton-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);