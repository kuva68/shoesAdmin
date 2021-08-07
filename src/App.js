import React from 'react';
import {useState,useEffect} from 'react'
import {Route,Switch, Redirect} from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import  "firebase/messaging"
import 'firebase/auth'

import 'firebase/firestore'
import HomePage from './HomePage'
import SingIn from './SingIn'
import {useSelector,useDispatch} from 'react-redux'
import Orders from './Orders';
import CollectionFoto from './CollectionFoto';
import NavBar from './NavBar';

const firebaseConfig = {
  apiKey: "AIzaSyBS9QGlpihzZ-zLz1I6xZngQQLdRkzHs7g",
  authDomain: "kuvashose.firebaseapp.com",
  databaseURL: "https://kuvashose.firebaseio.com",
  projectId: "kuvashose",
  storageBucket: "kuvashose.appspot.com",
  messagingSenderId: "891118479292",
  appId: "1:891118479292:web:f901e3975d67b33d7b6db9",
  measurementId: "G-VTHPPL8LYL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.usePublicVapidKey('BJc_FqFXOGR_dfvDXglS98-Ya9X5ZBzhaUH7GD7tdXTZdGVNsPxcwdulNFW_TjMju4l3hCRSy4an_vUOkSQTsnc')

// Add the public key generated from the console here.
const storage = firebase.storage()
const db = firebase.firestore()
let storageRef = storage.ref()

  db.enablePersistence()
.catch(function(err) {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.log('failed preconditions, open too many tabs')
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log('this browser do not suported offline db')
    }
})

const A = 'kuva68@gmail.com'


export default function App() {
  const [El,setEl] = useState('')
  const [Status,setStatus] = useState('')
 const collectionForChanges = useSelector((state)=>{
   return state.collectionForChanges
 })
const nameForChanges = useSelector((state)=>{
  return state.nameForChanges
}) 

const topOfChanges = useSelector((state)=>{
  return state.topOfChanges
})
   const navbarButton = useSelector((state)=>{
    return state.navbarButton
  })
  const User = useSelector((state)=>{
    return state.user})
    //console.log('User',User,'A',A)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //console.log(user)
      dispatch({type:'user',user:user.email})
      localStorage.setItem('user',JSON.stringify(user.email))
      } else {
        console.log(' No user is signed in.')
        dispatch({type:'user',user:null})
      }
    });
  })
  let CurrentUser = firebase.auth().currentUser;
  let userEmail = null
  if(CurrentUser&&CurrentUser.email){userEmail = CurrentUser.email}



  useEffect(()=>{
    async function getOrders(){
      //console.log('getOrders start')
      try{
        let ordersSnap = await db.collection('messages').get()
        let tmpOrders = {}
        console.log('ordersSnap',ordersSnap)
        ordersSnap&&ordersSnap.size>0&&ordersSnap.forEach((el)=>{
           tmpOrders[el.id] = el.data()
        })
          if(tmpOrders&&Object.keys(tmpOrders)&&Object.keys(tmpOrders).length){
            dispatch({type:'new_orders_list',orders:tmpOrders})
          console.log('tmpOrders',tmpOrders)}
      }catch(error){console.log('error during getting orders',error)}}
        
        if(User===A){getOrders()}else {return null}
  },[User])

  useEffect(()=>{
   async function fetchList(){
      try{
                      
     const iList = await db.collection('imgList').doc('imgList').get()
     const imgList = iList.data()
     const collectionsList = Object.keys(imgList).sort((a,b)=>{
       return imgList[b][0].created - imgList[a][0].created
     })
     //console.log('collectionsList',collectionsList)
     return {imgList:imgList,collectionsList:collectionsList}
      }catch(error){console.log(error)}
      
    }
    function implementFetching(imgO){
      try{
     //console.log('implementFetching start',imgO)
       
      if(imgO&&Object.keys(imgO)&&Object.keys(imgO).length) {
        //console.log('imgObject',Object.keys(imgO))
        dispatch({type:'img_obj',obj:imgO.imgList,arr:imgO.collectionsList})      
     
       let imgObjJson =  JSON.stringify(imgO.imgList)
       let collections = JSON.stringify(imgO.collectionsList)
        localStorage.setItem('img_obj',imgObjJson)
        localStorage.setItem('collectionsNames',collections)
      }
     }catch(error){console.log(error)}
    }
   async function startFetching(){
     if(User ===A){ 
      let modelsObject = await fetchList()
      implementFetching(modelsObject)
     }}
     
     if(window.navigator.onLine&&User===A){startFetching()}else if(User==A){
       window.addEventListener('online',startFetching)}else {return null}
  
  },[User])
  useEffect(()=>{
    async function checkMessaging(){
  
      let messageToken = 
        localStorage.getItem('messageToken')
      if(messageToken){
        let d = new Date()
        try{
       await db.collection('adminTokens').doc('Token').update({[messageToken]:d})
       console.log('adminToken in db')
        }catch(error){console.log(error)}
      }
      if(!messageToken){
        console.log('startMessaging')
       await startMessaging()
      }
      try{
      messaging.onTokenRefresh(() => 
      messaging.getToken().then((refreshedToken) => {
          console.log('Token refreshed.');
            localStorage.setItem('messageToken',refreshedToken)
            console.log('token in l.storage')
        let d = new Date();
          db.collection('adminTokens').doc('Token').update({[refreshedToken]:d})
            console.log('token in db')})      
            .catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
          })
        
        );  
      }catch(error){console.log(error)}
          // Callback fired if Instance ID token is updated.
     }
    async function startMessaging(){
      // Retrieve Firebase Messaging object.
      try{
    // Add the public key generated from the console here.   
     let permission = await Notification.requestPermission()
            if (permission === 'granted') {
                console.log('Notification permission granted.')              
            let token =  await messaging.getToken()
            console.log('token',token)
              if(!token||token===null)console.log('no token')
                if(token){
                  console.log('resieved token',token)
               await localStorage.setItem('messageToken',token)
                 console.log('token in l.storage')    
                    let d = new Date()
                 await db.collection('adminTokens').doc('Token').update({[token]:d})
                    console.log('token in db') 
                     } else {
                  console.log('Unable to get permission to notify.')
                      }
      }
      }catch(error){console.log(error)}
    }
    if(User===A){checkMessaging()}else{console.log('no user no messaging')
    return null}
  },[User])
  function changeModelStatus(el,status){
    setEl(el)
    setStatus(status)
  }
  useEffect(()=>{
     async function updater(){
      try{
        
      await  db.collection('messages').doc(El).update({status:+Status})
        let ordersSnap = await db.collection('messages').get()
        let tmpOrders = {}
        console.log('ordersSnap',ordersSnap)
        ordersSnap&&ordersSnap.size>0&&ordersSnap.forEach((el)=>{
           tmpOrders[el.id] = el.data()
        })
          if(tmpOrders&&Object.keys(tmpOrders)&&Object.keys(tmpOrders).length){
            dispatch({type:'new_orders_list',orders:tmpOrders})}
                  
   }catch(error){
  console.log(error)}}
  if(El!==''&&User===A&&Status!==''){updater()}
},[El,Status,User]
  )
  const navBarDirect = ()=>{
   return dispatch({type:'change_class_name'})
    
  }
  useEffect(()=>{
    async function changeStatus(){
      try{
  
  let tmp = {customMetadata:{top:topOfChanges}}
  console.log(` top:${topOfChanges},collection:${collectionForChanges},name:${nameForChanges}`)
  let newMetadata =await storageRef.child(`${collectionForChanges}/${nameForChanges}`)
  .updateMetadata(tmp)
  console.log('newMetadata',newMetadata)
  if(newMetadata){
   dispatch({type:'change_model_status'})
  }}catch(error){console.log(error)}
}
collectionForChanges!==''&&topOfChanges!==''&&nameForChanges!==''&&changeStatus()
  },[topOfChanges,nameForChanges,collectionForChanges])
  
    return (
    <div className='main'>
      <div className={navbarButton}onClick={navBarDirect}>
        <p className='p'>></p>
      </div>
      
      <NavBar/>
      
      <Switch>
        <Route exact path='/'>
          {User===A?<HomePage/>:<Redirect to='/SingIn'/>}
        </Route>
        <Route path='/CollectionFoto:id'>
          {User===A?<CollectionFoto/>:<Redirect to='/SingIn'/>}
        </Route>
        <Route path='/Orders'>
          {User===A?<Orders changeModelStatus={changeModelStatus}/>:<Redirect to='/SingIn'/>}
        </Route>
        <Route path='/SingIn'component={SingIn}/>
      </Switch>
      
    </div>
  )
}

