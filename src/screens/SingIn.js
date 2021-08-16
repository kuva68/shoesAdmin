import  firebase from '../firebase/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react'

export default function SingIn(){
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
  
  
     
   
return <div style={{marginTop:'11vh',textAlign:'center'}}>
<h1>KUVA</h1>
<p>Please sign-in:</p>
<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
</div>
}