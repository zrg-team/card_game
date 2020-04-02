import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { FIREBASE_CONFIG } from '../config'

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)
const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})
export default {
  auth: firebaseApp.auth(),
  db
}
