
    import React from 'react'
    import {useSelector} from 'react-redux'
    import ImgComponent from '../components/imgComponent'
    import {useParams} from 'react-router-dom'
    export default function CollectionFoto(props){
        let params = useParams().id.slice(1)
        console.log(params)
    let imgList = useSelector(state=>state.imgList)    
    let arr = []
       // let col = props.match.params.id.slice(1)
       let tmpArr = [{name:'KUVA',url:'./kuvaLogo.png',top:'0',new:false}]
        if(imgList&&imgList[params]){
           arr =   imgList[params]}else{ arr = tmpArr}
        return (<div className='contentBody'>{
            arr.map((key,i)=>{
    return <ImgComponent key={key.name + i}  option={key} name={key.name} params={params}/>
           })
        }
         </div>)
    }
    