
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const errormsg=document.querySelector('#error')
const locationmsg=document.querySelector('#location')
const forecastmsg=document.querySelector('#forecast')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
   locationmsg.textContent='Loading...'
   forecastmsg.textContent=''
    fetch('/weather?address='+location).then((response)=>{
        // if(!response){
        //     locationmsg.textContent="404 page not found"
        // }
    response.json().then((data)=>{
        if(data.error){

            locationmsg.textContent=data.error;
            console.log(data.error);
            // document.getElementsById('error').innerHTML=data.error;
        }else{
            locationmsg.textContent=data.location;
            forecastmsg.textContent=data.forecast;
            console.log(data.location);
            console.log(data.forecast)
            // document.getElementsById('location').innerHTML=data.location;
            // document.getElementsById('forecast').innerHTML=data.forecast;
       
            
           
        }    
    })
})  

})