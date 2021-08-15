
import React from 'react'
import {useState,useRef,useEffect} from 'react'
import {useDispatch} from 'react-redux'


  export default function ImgComponent (props){
    const [imgSrc,setImgSrc] = useState('./kuvaLogo.png')
  const dispatch = useDispatch()
  

  let imgRef = useRef(null)
  useEffect(()=>{
      
      if(!window.navigator.onLine){
    window.addEventListener('online',()=>topRef())
  }else{topRef()}
 
}  ,[])

  function topRef(){   
       
     let target = imgRef.current
     if(target&&target.getBoundingClientRect().top>-800&&target.getBoundingClientRect().top<1000
     && imgSrc !== props.option.url){
        setImgSrc(props.option.url)
 }else if(imgSrc !== props.option.url){
     window.addEventListener('scroll',()=>{
             if(target.getBoundingClientRect().top>-800&&target
             .getBoundingClientRect().top<2000){
                setImgSrc(props.option.url)
    }})
}}

     
    

    
    return (<div className='imgBody' ref = {imgRef}>
        
            <div className='imgheader'>
        <h3 style={{color:'red'}}>
        {props.option.new?' NEW ':''}   {props.option.top==='1'?' TOP SALES ':''}</h3>
        </div>
        <div className='imgDiv'>
        <img src={imgSrc}  alt='KUVA' className='img'/>
        </div>
        
        <ul className='imgFooter' >
            <p className='imgN'>{props.name.slice(0,-4)}</p>
       
      <select value={props.option.top}id='select'style={{height:'4vh'}}
              onChange={(e)=>dispatch({type:'CHANGE_MODEL_STATUS',top:e.target.value,
                params:props.params,name:props.name})}>
             <option value='0'style={{fontSize:'4vh'}}>no top</option>
             <option value='1' style={{fontSize:'4vh'}}>TOP</option>     
       </select>
       <label  style={{fontSize:'4vh',marginLeft:'10px'}} >TOP ?  </label>
       </ul>
       
       
        </div>
    )
}