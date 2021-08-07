
async function changeStatus(action){
   
   try{
   
   yield  db.collection('messages').doc(action.item).update({status:+action.status})
   yield fork(getOrdersSnap)
   }catch(error){
  console.log(error)}
}
