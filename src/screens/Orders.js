import React from 'react'
import { useSelector } from 'react-redux'
import OrdersFilter from '../components/ordersFilter'
import {Table,Form} from 'react-bootstrap'
export default function Orders(props) {
  let orders = useSelector((state) => {
    if (state.model === 'all') {
      return state.orders
    } else if (
      state.model !== 'all' && state.orders && Object.keys(state.orders) && Object.keys(state.orders).length) {
      const arr = {}
      for (let el in state.orders) {
        if (state.orders[el].bucket && state.model in state.orders[el].bucket) {
          let bucket = state.orders[el].bucket
          console.log('bucket', bucket)
          let bucketArr = {}
          bucketArr[state.model] = bucket[state.model]
          console.log('arr.state.model', bucketArr[state.model])
          let oldArr = state.orders[el]
          let newArr = { ...oldArr, bucket: bucketArr }
          arr[el] = newArr
        }
      }
      console.log('arr', arr)
      return arr
    } else { return {} }
  })

  let start = useSelector((state) => {
    let tmp
    if (state.startDate === 'all') { tmp = Date.now() } else if (state.startDate === 'month') {
      tmp = Date.now() - 86400000 * 31
    } else { tmp = +state.startDate + 86399999 }
    return tmp
  })
  let end = useSelector((state) => {
    let tmp
    if (state.endDate === 'all') { tmp = Date.now() - 86400000 * 90 } else if (state.endDate === 'month') {
      tmp = Date.now() - 86400000 * 31
    } else {
      tmp = +state.endDate
    }
    return tmp
  })
  let clients = useSelector((state) => {
    if (state.name === 'all') {
      let tmp = new Set()
      if (orders && Object.keys(orders) && Object.keys(orders).length) {
        for (let key in orders) {
          tmp.add(orders[key].name)
        }
      } return [...tmp]
    } else { return [state.name] }
  })
  //const dispatch = useDispatch()

  return start && end && clients && orders ? <>
  <OrdersFilter />
  <tr className='px-1 position-fixed px-1 bg-info text-center' style={{fontSize:'0.8rem',top:'7rem'}}>
     <th className='m-0 p-0'style={{width:'4rem'}}>Date </th>  
     <th className='m-0 p-0'style={{width:'18rem'}}>Name </th>
     <th className='m-0 p-0'style={{width:'7rem'}}>Phone</th>
     <th className='m-0 p-0'style={{width:'18rem'}}>Model</th>
     <th className='m-0 p-0'style={{width:'20rem'}}>Sizes</th>
     <th className='m-0 p-0'style={{width:'10rem'}}>Status</th>
    </tr >
  <Table striped bordered hover className='text-center' >
    
      {orders && Object.keys(orders) && Object.keys(orders).length &&
        Object.keys(orders).length > 0 &&
        Object.keys(orders).filter((element)=>{
          return orders[element].date <= start && orders[element].date >= end &&
          clients.includes(orders[element].name)
        }).sort((a, b) => {
          let aa = orders[a].date
          let bb = orders[b].date
          return bb - aa
        }).map((el) => {
           
            return (<>
           
                 {orders[el].bucket && Object.keys(orders[el].bucket) &&
                  Object.keys(orders[el].bucket).length &&
                  Object.keys(orders[el].bucket).map((elm, i) => {

                    return <tr className='px-1' key={elm + i}style={{fontSize:'0.8rem',
                            color:orders[el].status === 0 ? 'red' : orders[el].status === 1 ? 'black' : '#e5e5e5'}}>
                    <th className='m-0 p-0'style={{width:'4rem'}}> {new Date(orders[el].date).toLocaleDateString()}</th>  
                    <th className='m-0 p-0 text-wrap overflow-hidden'style={{width:'18rem'}}> {orders[el].name}</th>
                    <th className='m-0 p-0'style={{width:'7rem'}}>{orders[el].phone}</th>
                    <th className='m-0 p-0 text-wrap overflow-auto'style={{width:'18rem'}}>{elm}</th>
                    <th className='m-0 p-0'style={{width:'20rem'}}>
                      <div className='d-flex flex-row w-100 justify-content-between'>
                        {orders[el].bucket[elm].sizes &&
                        Object.keys(orders[el].bucket[elm].sizes) &&
                        Object.keys(orders[el].bucket[elm].sizes).map((s, i) => {
                          return <div key={s + i * 3}classname='d-flex flex-cloumn justify-content-center align-items-center mx-1'>
                            <p className='sizesP' style={{ textDecoration: 'underline', margin: 0 }} >{s}</p>
                            <p className='sizesP' style={{ backgroundColor: orders[el].bucket[elm].sizes[s] === 0 ? '' : '#e7e7e7' }}>
                              {orders[el].bucket[elm].sizes[s] === 0 ? '_' : orders[el].bucket[elm].sizes[s]}</p>
                          </div>
                        })}
                      </div>
                    
                    </th>
                    <th className='m-0 p-0'style={{width:'10rem'}}>
                     <Form.Select value={orders[el].status} style={{fontSize:'0.8rem'}}
                      onChange={(e) => { props.changeModelStatus(el, +e.target.value) }}>
                      <option value={0}>Не обработан</option>
                      <option value={1}>Принят</option>
                      <option value={2}>Отклонить</option>
                     </Form.Select>
                    </th>
                   </tr >
                    
                  })}
             
          
            </>
           )
          
        })}
   
  </Table></> : <div style={{ marginTop: '11vh', textAlign: 'center' }}><OrdersFilter />
    <p> NO ORDERS</p></div>
}