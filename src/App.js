import React from 'react';
import { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import firebase from './firebase/firebase'
import 'firebase/storage'
import "firebase/messaging"
import 'firebase/auth'
import 'firebase/firestore'
import HomePage from './screens/HomePage'
import SingIn from './screens/SingIn'
import { useSelector, useDispatch } from 'react-redux'
import Orders from './screens/Orders';
import CollectionFoto from './screens/CollectionFoto';
import { NavLink } from 'react-router-dom';
import {Container,Row,Col,Dropdown,Image} from 'react-bootstrap'
//const messaging = firebase.messaging()

//messaging.usePublicVapidKey(Env
//.PUBLIC_VAPID_KEY)

// Add the public key generated from the console here.
const storage = firebase.storage()
const db = firebase.firestore()
let storageRef = storage.ref()

db.enablePersistence()
  .catch(function (err) {
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


export default function App() {
  const [El, setEl] = useState('')
  const [Status, setStatus] = useState('')
  const [imgHref,setImgHref] = useState('')
  const collectionForChanges = useSelector((state) => {
    return state.collectionForChanges
  })
  const nameForChanges = useSelector((state) => {
    return state.nameForChanges
  })

  const topOfChanges = useSelector((state) => {
    return state.topOfChanges
  })
  
  const User = useSelector((state) => {
    return state.user
  })
  //console.log('User',User,'A',A)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      //console.log(user)
        if (user) {
          setImgHref(user?.photoURL)
          console.log(user,'===user')
          try {
            let userDoc = await db.collection('users').doc('test').get()
            let userDocData = userDoc?.data()
            //console.log(userDocData)
            userDoc.exists && dispatch({ type: 'user', user: userDocData?.User })
          }
          catch (error) {
            console.log(error)
            dispatch({ type: 'user', user: null })
          }
        } else {
          console.log(' No user is signed in.')
          dispatch({ type: 'user', user: null })
        }
      });
   
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
 useEffect(() => {
    async function getOrders() {
      //console.log('getOrders start')
      try {
        let ordersSnap = await db.collection('messages').get()
        let tmpOrders = {}
        //console.log('ordersSnap',ordersSnap)
        ordersSnap && ordersSnap.size > 0 && ordersSnap.forEach((el) => {
          tmpOrders[el.id] = el.data()
        })
        if (tmpOrders && Object.keys(tmpOrders) && Object.keys(tmpOrders).length) {
          dispatch({ type: 'new_orders_list', orders: tmpOrders })
          //console.log('tmpOrders',tmpOrders)
        }
      } catch (error) { console.log('error during getting orders', error) }
    }

    if (!window.navigator.onLine&&User) {window.addEventListener('online',getOrders())  }else if(User){
        getOrders()
    }
    return ()=>window.removeEventListener('online',getOrders)
  }, [User])

  useEffect(() => {
    async function fetchList() {
      try {

        const iList = await db.collection('imgList').doc('imgList').get()
        const imgList = iList.data()
        const collectionsList = Object.keys(imgList).sort((a, b) => {
          return imgList[b][0].created - imgList[a][0].created
        })
        //console.log('collectionsList',collectionsList)
        return { imgList: imgList, collectionsList: collectionsList }
      } catch (error) { console.log(error) }

    }
    function implementFetching(imgO) {
      try {
        //console.log('implementFetching start',imgO)

        if (imgO && Object.keys(imgO) && Object.keys(imgO).length) {
          //console.log('imgObject',Object.keys(imgO))
          dispatch({ type: 'img_obj', obj: imgO.imgList, arr: imgO.collectionsList })

          let imgObjJson = JSON.stringify(imgO.imgList)
          let collections = JSON.stringify(imgO.collectionsList)
          localStorage.setItem('img_obj', imgObjJson)
          localStorage.setItem('collectionsNames', collections)
        }
      } catch (error) { console.log(error) }
    }
    async function startFetching() {
      if (User) {
        let modelsObject = await fetchList()
        implementFetching(modelsObject)
      }
    }

    if (window.navigator.onLine && User) { startFetching() } else if (User) {
      window.addEventListener('online', startFetching)
    }
  return ()=>window.removeEventListener('online',startFetching)
  }, [User])
 // useEffect(() => {
   // async function checkMessaging() {

     // let messageToken =
       // localStorage.getItem('messageToken')
      //if (messageToken) {
        //let d = new Date()
        //try {
          //await db.collection('adminTokens').doc('Token').update({ [messageToken]: d })
         // console.log('adminToken in db')
        //} catch (error) { console.log(error) }
      //}
      //if (!messageToken) {
       // console.log('startMessaging')
        //await startMessaging()
     // }
      //try {
       // messaging.onTokenRefresh(() =>
        //  messaging.getToken().then((refreshedToken) => {
           // console.log('Token refreshed.');
          //  localStorage.setItem('messageToken', refreshedToken)
            //console.log('token in l.storage')
          //  let d = new Date();
          //  db.collection('adminTokens').doc('Token').update({ [refreshedToken]: d })
            //console.log('token in db')
          //})
           // .catch((err) => {
           //   console.log('Unable to retrieve refreshed token ', err);
           // })

        //);
      //} catch (error) { console.log(error) }
      // Callback fired if Instance ID token is updated.
    //}
  //  async function startMessaging() {
      // Retrieve Firebase Messaging object.
    //  try {
        // Add the public key generated from the console here.   
      //  let permission = await Notification.requestPermission()
      //  if (permission === 'granted') {
        //  console.log('Notification permission granted.')
        //  let token = await messaging.getToken()
        //  console.log('token', token)
        //  if (!token || token === null) console.log('no token')
        //  if (token) {
          //  console.log('resieved token', token)
        //    await localStorage.setItem('messageToken', token)
        //    console.log('token in l.storage')
         //   let d = new Date()
         //   await db.collection('adminTokens').doc('Token').update({ [token]: d })
       //     console.log('token in db')
       //   } else {
       //     console.log('Unable to get permission to notify.')
         // }
       // }
    //  } catch (error) { console.log(error) }
   // }
  //  if (User) { checkMessaging() } else {
    //  console.log('no user no messaging')
   //   return null
   // }
 // }, [User])
  function changeModelStatus(el, status) {
    setEl(el)
    setStatus(status)
  }
  useEffect(() => {
    async function updater() {
      try {

        await db.collection('messages').doc(El).update({ status: +Status })
        let ordersSnap = await db.collection('messages').get()
        let tmpOrders = {}
        //console.log('ordersSnap', ordersSnap)
        ordersSnap && ordersSnap.size > 0 && ordersSnap.forEach((el) => {
          tmpOrders[el.id] = el.data()
        })
        if (tmpOrders && Object.keys(tmpOrders) && Object.keys(tmpOrders).length) {
          dispatch({ type: 'new_orders_list', orders: tmpOrders })
        }

      } catch (error) {
        console.log(error)
      }
    }
    if (El !== '' && User && Status !== '') { updater() }
  }, [El, Status, User]
  )
  
  useEffect(() => {
    async function changeStatus() {
      try {

        let tmp = { customMetadata: { top: topOfChanges } }
        //console.log(` top:${topOfChanges},collection:${collectionForChanges},name:${nameForChanges}`)
        let newMetadata = await storageRef.child(`${collectionForChanges}/${nameForChanges}`)
          .updateMetadata(tmp)
       // console.log('newMetadata', newMetadata)
        if (newMetadata) {
          dispatch({ type: 'change_model_status' })
        }
      } catch (error) { console.log(error) }
    }
    collectionForChanges !== '' && topOfChanges !== '' && nameForChanges !== '' && changeStatus()
  }, [topOfChanges, nameForChanges, collectionForChanges])

  const asideMenu = [{name:'Home',href:'/'},{name:'Orders',href:'/Orders'}]

  return (
  <Container fluid>
<Row style={{height:'3rem'}}className='bg-info text-white d-flex align-items-center fixed-top px-5'>
  <Col>
 {User && <Dropdown>
<Dropdown.Toggle variant="light" id="dropdown-basic"className='px-4'>
MENU
</Dropdown.Toggle>

<Dropdown.Menu>
{asideMenu.map((el,i)=>{
       return(
         
      <Dropdown.Item action variant='light'key={i+''}>
        <NavLink to={el.href}>
          <h5>
              {el.name}
          </h5>
        </NavLink>
          
      </Dropdown.Item>
   
  )
})}

</Dropdown.Menu>
</Dropdown>}
  </Col>
<Col className="d-flex justify-content-end pl-10 ">
{ User&&<Image src={imgHref} roundedCircle style={{width:'2.5rem',height:'auto',alignSelf:'flex-end'}}/>}
</Col>

</Row>
{User && <Row style={{height:'3rem'}}className='bg-info text-white d-flex align-items-center '>
  
  </Row>}
<Row >
<Switch>
        <Route exact path='/'>
          {User ? <HomePage /> : <Redirect to='/SingIn' />}
        </Route>
        <Route path='/CollectionFoto:id'>
          {User ? <CollectionFoto /> : <Redirect to='/SingIn' />}
        </Route>
        <Route path='/Orders'>
          {User ? <Orders changeModelStatus={changeModelStatus} /> : <Redirect to='/SingIn' />}
        </Route>
        <Route path='/SingIn' >
          {User?<Redirect to='/'/>:<SingIn/>}
          </Route>
      </Switch> 
                
    
</Row>

</Container>

  )}

