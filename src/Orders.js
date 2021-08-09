import React from 'react'
import { useSelector } from 'react-redux'
import OrdersFilter from './ordersFilter'
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

  return start && end && clients && orders ? <div className='orders'>
    <OrdersFilter />
    <div className='ordersDiv'>
      {orders && Object.keys(orders) && Object.keys(orders).length &&
        Object.keys(orders).length > 0 &&
        Object.keys(orders).sort((a, b) => {
          let aa = orders[a].date
          let bb = orders[b].date
          return bb - aa
        }).map((el) => {
          if (orders[el].date <= start && orders[el].date >= end &&
            clients.includes(orders[el].name)) {
            return <div className='ordersNamediv' key={el} style={{
              color:
                orders[el].status === 0 ? 'red' : orders[el].status === 1 ? 'black' : 'gray',
              backgroundColor: orders[el].status === 2 ? 'red' : ''
            }}>
              <div className='ordersInfo'>
                <p className='ordersNameDate'>{new Date(orders[el].date).toLocaleDateString()}</p>
                <h3 className='ordersNameP'>{orders[el].name}</h3>
                <p className='ordersNamePhoneP'>{orders[el].phone}</p>
              </div>
              <div className='ordersSizes'>
                {orders[el].bucket && Object.keys(orders[el].bucket) &&
                  Object.keys(orders[el].bucket).length &&
                  Object.keys(orders[el].bucket).map((elm, i) => {
                    return <div className='orderedModelAndSizes' key={elm + i}>
                      <p className='ordersModelH'>{elm}</p>
                      {orders[el].bucket[elm].sizes &&
                        Object.keys(orders[el].bucket[elm].sizes) &&
                        Object.keys(orders[el].bucket[elm].sizes).map((s, i) => {
                          return <div key={s + i * 3} style={{
                            display: 'flex', flexDirection: 'column',
                            margin: 0, padding: 0, width: '3vw', textAlign: 'center'
                          }}>
                            <p className='sizesP' style={{ textDecoration: 'underline', margin: 0 }} >{s}</p>
                            <p className='sizesP' style={{ backgroundColor: orders[el].bucket[elm].sizes[s] === 0 ? '' : '#e7e7e7' }}>
                              {orders[el].bucket[elm].sizes[s] === 0 ? '_' : orders[el].bucket[elm].sizes[s]}</p>
                          </div>
                        })}
                    </div>
                  })}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <select value={orders[el].status} className='modelStatus'
                  onChange={(e) => { props.changeModelStatus(el, +e.target.value) }}>
                  <option value={0}>Не обработан</option>
                  <option value={1}>Принят</option>
                  <option value={2}>Отклонить</option>
                </select>
              </div>
            </div>
          }
        })}
    </div>
  </div> : <div style={{ marginTop: '11vh', textAlign: 'center' }}><OrdersFilter />
    <p> NO ORDERS</p></div>
}