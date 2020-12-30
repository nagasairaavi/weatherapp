const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express();
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const port=process.env.PORT || 1000

//define paths for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,('../templates/views'))
const partialsPath=path.join(__dirname,('../templates/partials'))



//setup handle bar enegine and views location
app.set('view engine','hbs')    
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Nagasai raavi'
    })
})




app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nagasai raavi'
    })
})





app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Nagasai raavi'
    })
})





app.get('/weather',(req,res)=>{
    const location=req.query.address 
    if(!req.query.address){
        return res.send({message:'enter location'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })


})






app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'nagasai raavi',
        errorMessage:'help article not found'
    })
})










app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'nagasai raavi',
        errorMessage:'page not found'
    })
})

















app.listen(port,()=>{
    console.log('server listening on port'+ port);
})