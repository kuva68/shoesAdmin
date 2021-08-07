import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Collections(){
let collectionsArr = useSelector(state=> {
    return state.collectionsNames
})
let collectionsObj = useSelector(state=> state.imgList)
if(collectionsObj&&Object.keys(collectionsObj)&&Object.keys(collectionsObj).length){
return <div className='collectionsDiv'>
    {collectionsArr&&collectionsArr.length&&
    collectionsArr.length>0&&collectionsArr.map((el)=>{
        let tmp
        collectionsObj[el]&&collectionsObj[el][5]&&
        collectionsObj[el][5].url?tmp = collectionsObj[el][5].url:tmp = ''
        return <NavLink to={`./CollectionFoto:${el}`}key={el}
           style={{textDecoration:'none'}} >
            <div className='collectionNameDiv'key={el}
               style={{background:`no-repeat center/cover url(${tmp})`}}>{el}</div>
        </NavLink>
    })}
</div>}else return ''
}