// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrei8J2cxqG08T12aXqPcWmVq5D1pkRno",
  authDomain: "paradise-latam.firebaseapp.com",
  projectId: "paradise-latam",
  storageBucket: "paradise-latam.appspot.com",
  messagingSenderId: "418510382296",
  appId: "1:418510382296:web:c4e631d597b1c12830a3ad",
  measurementId: "G-ZWQJBSZP90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}