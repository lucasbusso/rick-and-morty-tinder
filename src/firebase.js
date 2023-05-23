import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

let db = firebase.firestore().collection('favs')
export function updateDB(array, uid) {
    return db.doc(uid).set({array}) // a set() siempre se le pasa un objeto
}

export function getFavs(uid) {
    return db.doc(uid).get()
        .then(snap => {
            return snap.data().array
        })
}

export function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
        .then(snapshot => snapshot.user)
}

export function signOutGoogle() {
    firebase.auth().signOut()
}
