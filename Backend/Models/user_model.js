const mongoose = require('mongoose')

const UserScheema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        required:true,
        unique: true
    },
    usertype:{
        type:String,
        required:true,
        enum:["Admin","Employee"],
        default:""
    }, 
    phone:{
        type:Number,
        required:true,
        unique: true,
        minlength: 10,
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
    }

})

const User = mongoose.model('User',UserScheema)
module.exports = User