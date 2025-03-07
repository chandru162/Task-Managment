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
        let count;
        const latestUser = await this.constructor.findOne().sort({ userId: -1 });
        if (latestUser) {
            const latestuserId = parseInt(latestUser.userId.substring(2));
            count = latestuserId + 1;
        } else {
            count = 1; 
        }
        this.userId = `NPU${count.toString().padStart(4, '0')}`; // Generate the userId
    }
    next();
});

const User = mongoose.model('User',UserScheema)
module.exports = User