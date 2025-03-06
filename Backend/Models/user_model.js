const mongoose = require('mongoose')

const UserScheema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        unique: true
    },
    userType:{
        type:String,
        required:true,
        enum:["Admin","Employee"],
        default:""
    }, 
    phone:{
        type:Number,
        required:true,
        minlength: 10,
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
    }

});

UserScheema.pre('save', async function (next) {
    if (this.isNew) {
        const count = (await this.constructor.countDocuments()) + 1; // Get the current count and increment
        this.userId = `NP${count.toString().padStart(4, '0')}`; // Generate the taskId
    }
    next();
});

const User = mongoose.model('User',UserScheema)
module.exports = User