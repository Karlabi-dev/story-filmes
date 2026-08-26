import { initializeApp } from 'firebase/app';
import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwgRATXdPsas44Wta1HsmJnqgfnYJ-C9s",
  authDomain: "story-filmes.firebaseapp.com",
  projectId: "story-filmes",
  storageBucket: "story-filmes.firebasestorage.app",
  messagingSenderId: "453219877039",
  appId: "1:453219877039:web:dffd1c265cbcb926bd145a",
  measurementId: "G-LMKL5TD0M7"
};

const app = initializeApp(
  firebaseConfig
);

export const db =
  getFirestore(app);