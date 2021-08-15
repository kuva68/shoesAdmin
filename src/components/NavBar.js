import React from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
//import HomePage from './HomePage'
//import Orders from './Orders'

export default function NavBar(){
   let classN = useSelector((state)=>{
       return state.navbarClass
   })
   const dispatch = useDispatch()
   const getOrders = ()=>{
    dispatch({type:'GET_ORDERS'})
 }
    return( <div className={classN}onClick={()=>dispatch({type:'change_class_name'})}>
       
        <NavLink style={{textDecoration:'none'}}
         exact to='./'> <div className=
         'navlinkDiv'>
             HOME</div></NavLink>
          <NavLink style={{textDecoration:'none'}} to='./Orders'>
          <div className='navlinkDiv'onClick={getOrders}>  ORDERS</div></NavLink>
    </div>)
}