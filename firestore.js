// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE7T42usBIzfCMV3NTYMcr-iW8ekWJZTY",
  authDomain: "miappvalo2.firebaseapp.com",
  projectId: "miappvalo2",
  storageBucket: "miappvalo2.appspot.com",
  messagingSenderId: "747939579223",
  appId: "1:747939579223:web:7a967880955af588ce6a12"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = (jugador) => {
    addDoc(collection(db, 'jugador'), jugador);
};

export const getAll = (data) => {
    onSnapshot(collection(db, 'jugador'), data);
};

export const remove = (id) => {
    deleteDoc(doc(db, 'jugador', id));
};

export const selectOne = (id) => getDoc(doc(db, 'jugador', id));

export const edit = (id, jugador) => {
    updateDoc(doc(db, 'jugador', id), jugador);
};

export { db };