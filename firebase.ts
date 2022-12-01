// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5O8zCV6YoA0r6QLnhpdfcNzPYFfqFtiA',
  authDomain: 'mouvee-app.firebaseapp.com',
  projectId: 'mouvee-app',
  storageBucket: 'mouvee-app.appspot.com',
  messagingSenderId: '218621451631',
  appId: '1:218621451631:web:fcd212a9362704cdc95c9a',
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
