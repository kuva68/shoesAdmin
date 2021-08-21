
import React from 'react'
import {useState,useRef,useEffect} from 'react'
import {useDispatch} from 'react-redux'


  export default function ImgComponent (props){
    const [imgSrc,setImgSrc] = useState('./kuvaLogo.png')
  const dispatch = useDispatch()
  

  let imgRef = useRef(null)
  useEffect(()=>{
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
      topRef()
 
}  ,[imgSrc,props.option.url])

 
    return (<div className='d-flex flex-column justify-content-start align-content-center' ref = {imgRef}style={{width:'10rem'}}>
        
            <div className='w-100 text-center'style={{height:'3rem'}}>
        <h5 style={{color:'red',fontSize:'1.2rem'}}>
        {props.option.new?' NEW ':''}   {props.option.top==='1'?' TOP SALES ':''}</h5>
        </div>
        <div className='w-auto d-flex align-items-center'style={{height:'10rem'}}>
        <img src={imgSrc}  alt='KUVA' className='img'/>
        </div>
        
        <ul className='w-100 text-center p-0 m-0 d-flex flex-column justyfy-content-between'style={{height:'6rem'}} >
            <div className='w-100 overflow-hidden'style={{height:'3rem'}}>
              <p className='imgN'>{props.name.slice(0,-4)}</p>
            </div>
            
            <div className='d-flex flex-row justify-content-center align-items-center'>
            <select value={props.option.top}id='select'style={{height:'2rem',fontSize:'0.8rem'}}
              onChange={(e)=>dispatch({type:'CHANGE_MODEL_STATUS',top:e.target.value,
                params:props.params,name:props.name})}>
               <option value='0'>no top</option>
               <option value='1' >TOP</option>     
             </select>
             <label  style={{fontSize:'0.8rem',marginLeft:'10px'}} >TOP ?  </label>
            </div>
      
       </ul>
       
       
        </div>
    )
}