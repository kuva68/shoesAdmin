import React from 'react'
import {useDispatch} from 'react-redux'
import Collections from '../Collections'
import {NavLink} from 'react-router-dom'
export default function HomePage(){
   const dispatch = useDispatch()
   
   const getOrders = ()=>{
      dispatch({type:'GET_ORDERS'})
   }
   return <div className='homePage'>
       <Collections />
       <button onClick={()=>dispatch({type:'MAKE_PUSH'})}>Make push</button>
       <NavLink style={{display:'grid',gridTemplateColumns:'1fr',
            justifyItems:'center',textDecoration:'none'}} to='./Orders'>
           <div className='toOrdersButton'onClick={getOrders}
           >ORDERS </div>
        </NavLink>
   </div> 
}
