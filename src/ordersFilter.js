import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
export default function OrdersFilter(){
    const dispatch = useDispatch()
    const endDate = useSelector((state)=>{
        return state.endDate})
    const startDate = useSelector((state)=>{
        return state.startDate
    })
    const name = useSelector((state)=>{
        return state.name
    })
    const models = useSelector((state)=>{
        const set = new Set
        const orders = state.orders
        if(orders&&Object.keys(orders)&&Object.keys(orders).length){
            for(let key in orders){           
            if(key&&orders[key].bucket&&Object.keys(orders[key].bucket)&&
            Object.keys(orders[key].bucket).length){
                let obKeys = Object.keys(orders[key].bucket)
               // console.log('obKeys',obKeys)
               obKeys.forEach((el)=>{
                   set.add(el)
               })}
        }}
       // console.log('set',set)
        let tmp = [...set].sort((a,b)=>{
           // console.log(parseInt(a))
             return parseInt(a)-parseInt(b)
        })
         return ['all',...tmp]
    })
    let model = useSelector((state)=>{
        return state.model
    })
    let klients = useSelector(state=>{
    let set = new Set()
        if(state.orders&&Object.keys(state.orders)
          &&Object.keys(state.orders).length&&
          Object.keys(state.orders).length>0){
        for(let key in state.orders){
        set.add(state.orders[key].name)
}}
    return ['all',...set]
})

let dates = useSelector((state)=>{
let tmp = []
if(state.orders&&Object.keys(state.orders)
          &&Object.keys(state.orders).length&&
          Object.keys(state.orders).length>0){
        for(let key in state.orders){
    tmp.push(state.orders[key].date)
}}
let sortTmp = tmp.sort((a,b)=>{return b-a}).map((x)=>{
    if(x){
        let y = x % (24*1000*60*60)
        let milisec = x-y
    return milisec}
})
let dateSet = new Set(sortTmp)
return ['all','month',...dateSet]
})  

const getEndDate=(e)=>{
    dispatch({type:'END_DATE',
           endDate:e.target.value})
}
const getStartDate = (e)=>{
    dispatch({type:'START_DATE',startDate:e.target.value})
}
const getName = (e)=>{dispatch({
    type:'ORDERS_NAME',name:e.target.value
})}
const getModel = (e)=>{
    dispatch({type:'MODEL',model:e.target.value})
}
return <div className='ordersHeader'>
    <div className='filterDiv'>
        <p>KLIENT</p>
         <select className='odersNameSelect'onChange={getName}
            value={name}>
           {klients&&klients.length&&klients.length>0&&klients.map((el,i)=>{
              return <option className='odersFilterOptions'
                key={el+i}value={el}>{el}</option>
              })}
        </select>
    </div>
    <div className='filterDiv'><p>END DATE</p>
        <select className='odersNameSelect'onChange={getStartDate}
            value={startDate}>
           {dates&&dates.length&&dates.length>0&&dates.map((el,i)=>{
               if(el!=='month'){
              return <option className='odersFilterOptions'
                key={el+i}value={el}>{el==='all'?el:
                el==='month'?el:new Date(el).toLocaleDateString()}</option>
               }
              })}
        </select>
    </div>
    <div className='filterDiv'><p >START DATE</p>
        <select className='odersNameSelect'onChange={getEndDate}
            value={endDate}>
           {dates&&dates.length&&dates.length>0&&dates.map((el,i)=>{
            
              return <option className='odersFilterOptions'
                key={el+i}value={el}>{el==='all'?el:
                el==='month'?el:new Date(el).toLocaleDateString()}</option>
               
              })}
        </select>
    </div>
    <div className='filterDiv'><p >MODELS</p>
        <select className='odersNameSelect'onChange={getModel}
            value={model}>
           {models&&models.length&&models.length>0&&models.map((el,i)=>{
            
              return <option className='odersFilterOptions'style={{overflow:'hidden'}}
                key={el+i}value={el}>{el}</option>
               
              })}
        </select>
    </div>
        
</div>
}