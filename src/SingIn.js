import * as firebase from "firebase/app"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
export default function SingIn(){
  const dispatch = useDispatch()
  const User = useSelector((state)=>{
    return state.user})
var uiConfig = {
    singInFlow:"popup",
    signInSuccessUrl: '/HomePage',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ]
    //,
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    //tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    //privacyPolicyUrl: function() {
      //window.location.assign('<your-privacy-policy-url>');
    }
  
  let sIn,displayName,email,emailVerified,photoURL,uid,phoneNumber,providerData
  useEffect(()=>{
   function getUser(){ firebase.auth().onAuthStateChanged(function(user) {
      if (user&&user!==User) {
        // User is signed in.
         displayName = user.displayName;
         email = user.email;
         emailVerified = user.emailVerified;
         photoURL = user.photoURL;
         uid = user.uid;
         phoneNumber = user.phoneNumber;
         providerData = user.providerData;
         dispatch({type:'user',user:email})
 // user.getIdToken().then(function(accessToken) {
   //   sIn = JSON.stringify(accessToken)
     // localStorage.setItem("user",user.displayName)
     // dispatch({type:'user',user:user.displayName})
  //})
    }})
  }
  getUser()
  },[User]
  )
     
   
return <div style={{marginTop:'11vh',textAlign:'center'}}>
<h1>KUVA</h1>
<p>Please sign-in:</p>
<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
</div>
}