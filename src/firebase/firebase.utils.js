import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config  = {
    apiKey: "AIzaSyAMl4DAZmDhj4Z69wuDS360tOWSzk4AQhA",
    authDomain: "ecommerce-db-27f61.firebaseapp.com",
    databaseURL: "https://ecommerce-db-27f61.firebaseio.com",
    projectId: "ecommerce-db-27f61",
    storageBucket: "ecommerce-db-27f61.appspot.com",
    messagingSenderId: "1051278383517",
    appId: "1:1051278383517:web:7fdf0d257669df8dc87774",
    measurementId: "G-SN1468HTQL"
  };

  export const createUserProfileDocument = async (userAuth,additionalData)=> {
    if(!userAuth) return;

    const userRef = firestrore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    console.log(snapShot)

    if(!snapShot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestrore  = firebase.firestore();

  const porvider = new firebase.auth.GoogleAuthProvider();
  porvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(porvider);

  export default firebase;