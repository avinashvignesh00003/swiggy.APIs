const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors=require("cors")

const {Restaurant,Users} = require('./schema.cjs')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const connectToDb =async function(){
    try {
        await mongoose.connect('mongodb+srv://avinash11:chennai@cluster0.thzfqje.mongodb.net/resdetails?retryWrites=true&w=majority')
        console.log('DB connection established ;)')
       
        const port = 8000
        app.listen(port, function(){
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()
app.post('/add-restaurants', async function(request, response){
    try{
        await Restaurant.create({
            "areaName" :request.body.areaname,
            "avgRating":request.body.avgrate,
            "costForTwo" : request.body.costfortwo,
            "cusines" :request.body.cusines,
            "name" :request.body.name
        })

        res.json({"status":"sucess"})

    }catch (error){
        console.log(error)
    }
})
app.get('/get-restaurants-details',async function(request,response){
    try{
        const restaurantsDetails=Restaurant.find()
        response.json(restaurantsDetails)
    }catch(error){
        response .status(500).json({
        "status" :"failure",
        "message":"could not fetch",
        "error":error
    })
    }
})
app.post('/create-new-user',async function(request,response){
    try{ 
        await Users.create({
         "userName":request.body.userName,
         "password":request.body.password,
         "email":request.body.email,
         "contact":request.body.contact
     })

     response.status(201).json({"status":"user created"})
    }
    catch(error){
         response.status(500).json({"status":"not created"})
     }
 })
 app.get('/Validate-user',async function(request,response){
     try{
         const user=await Users.findOne({
             "email":request.body.email,
             "password":request.body.password
         })
         if(user){
             response.status(200).json({"Message":"Valid user"})
         }
         else{
             response.status(401).json({"Message":"Invalid user"})
         }
 
     }catch(error){
         response.status(500).json({
             "status":"not recived"
         })
     }
    })

     