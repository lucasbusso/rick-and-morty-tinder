import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyAJtA3u9s9ebDeOZkLPwdkS7PGu1Sm72Ko",
    authDomain: "tinder-bc457.firebaseapp.com",
    databaseURL: "https://tinder-bc457-default-rtdb.firebaseio.com",
    projectId: "tinder-bc457",
    storageBucket: "tinder-bc457.appspot.com",
    messagingSenderId: "186998512638",
    appId: "1:186998512638:web:cc5ce92a503fceb1633eaf"
}
  
firebase.initializeApp(firebaseConfig)

export function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
        .then(snapshot => snapshot.user)
}

export function signOutGoogle() {
    firebase.auth().signOut()
}
