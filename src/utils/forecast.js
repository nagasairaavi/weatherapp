
const request=require('request')
const forecast=(latitude,longitude,callback)=>{
        const url='http://api.weatherstack.com/current?access_key=d9a68468816e40c4b76178f94c6d5233&query='+latitude+','+longitude+''
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('error in connecting',undefined)
        }else if(body.error){
            callback('unable to find address',undefined);
        }
        else{

            callback(undefined,body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            
        }
    })
}

module.exports=forecast