let tmpCollectionsNames = JSON.parse(localStorage.getItem('collectionsNames'))
let tmpUser =JSON.parse(localStorage.getItem('user'))
let img_list = {}
let tmpImgList = JSON.parse(localStorage.getItem('img_obj'))
if(tmpImgList &&Object.keys(tmpImgList) &&
   Object.keys(tmpImgList).length > 0){
    for(let key in tmpImgList){
        img_list[key] = tmpImgList[key]
    }
}
export const Reducer = (state={model:'all', collectionsNames:tmpCollectionsNames||null
    ,imgList:img_list,orders:{},navbarClass:'navbarClose',
     navbarButton:'navbarButtonClose',endDate:'all',startDate:'all',user:tmpUser||null,
      name:'all',collectionForChanges:'',nameForChanges:'',topOfChanges:''},action)=>{
    switch(action.type){
        case 'MODEL':
            return {...state,model:action.model}
        case 'change_model_status':
            
            let oldImgList = state.imgList
            console.log(`oldimgList${oldImgList}`)
             let tmpArr = state.imgList[state.collectionForChanges]
             for (let i = 0;i<=tmpArr.length-1;i++){
                if(tmpArr[i][0]===state.nameForChanges){
                    let a = tmpArr[i][1]
                    tmpArr[i][1] = {...a,top:state.topOfChanges}
                    console.log(tmpArr[i][1])
                      break
                }
            }
            let newImgList = {...oldImgList,[state.collectionForChanges]:tmpArr}
            console.log('newImgList',newImgList)
            return {...state,imgList:newImgList}
        case 'CHANGE_MODEL_STATUS':
          return {...state,collectionForChanges:action.params,nameForChanges:action.name,topOfChanges:action.top}    
        case 'updated_orders':
            let oldOrders = state.orders
            let newOrders = {...oldOrders,[action.item]:action.updatedItem}
            return {...state,orders:newOrders}
        case 'user':
            console.log('update user',action.user)
            return {...state,user:action.user}
        case 'END_DATE':
            return {...state,endDate:action.endDate}
        case 'START_DATE':
            return {...state,startDate:action.startDate}
        case 'ORDERS_NAME':
            return {...state,name:action.name}        
        case  'new_orders_list':
            return {...state,orders:action.orders}
        case 'change_class_name':
           let bar,btn
          if (state.navbarClass === 'navbarClose'){
             bar = 'navbarOpen'
             btn='navbarButtonOpen'}else{bar='navbarClose'
             btn='navbarButtonClose'}
            return {...state,navbarClass:bar,navbarButton:btn}    
        case 'collectionsNames':
            return{...state,collectionsNames:action.collectionsNames}    
        case 'img_obj':
            console.log('imgObg in reducer',action.obj)
            return {...state,imgList:action.obj}    
                   
        default :
        return state
    }
}