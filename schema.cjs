const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({
    areaName : {
        type : String
    },
    avgRating : {
        type : Number
    },
    costForTwo : {
        type : String
    },
    cusines: {
        type : Array
    },
    name : {
        type : String
    }  
})

const userSchema=new mongoose.Schema({
    contact:{
        type :Number
    },
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},
{versionKey:false})

const Restaurant = mongoose.model('restaurantList', restaurantsSchema)
const Users=mongoose.model('userDetails',userSchema)

module.exports = {Restaurant,Users}