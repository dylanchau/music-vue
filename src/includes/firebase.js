import firebase from 'firebase/app'
// Required for side-effects
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  // apiKey: 'AIzaSyAaSyK7W0_UWeDMTKiwTVcjTGZgX2qRkP8',
  // authDomain: 'music-c2596.firebaseapp.com',
  // projectId: 'music-c2596',
  // storageBucket: 'music-c2596.appspot.com',
  // appId: '1:417422649545:web:7439d0a2f274a0585ac518',
  apiKey: 'AIzaSyDNhRkNiJXghBWVJMxXPWH54dETmVdCsb8',
  authDomain: 'music-vue-de90d.firebaseapp.com',
  projectId: 'music-vue-de90d',
  storageBucket: 'music-vue-de90d.appspot.com',
  messagingSenderId: '1014325085438',
  appId: '1:1014325085438:web:6debdfa64d26eb36cf11af',
  measurementId: 'G-ZQW1RNQ00L'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, songsCollection, commentsCollection, storage }
