const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        let count;
        let startNumber = 4; // Initial padding length

        const latestUser = await this.constructor.findOne().sort({ userId: -1 });

        if (latestUser) {
            const latestUserId = parseInt(latestUser.userId.substring(3)); // Extract numeric part

            if (isNaN(latestUserId)) {
                return next(new Error("Invalid userId format in database"));
            }

            count = latestUserId + 1;

            // Increase padding length dynamically if needed
            if (count.toString().length > startNumber) {
                startNumber = count.toString().length;
            }
        } else {
            count = 1;
        }

        this.userId = `NPU${count.toString().padStart(startNumber, '0')}`;
    }

    next();
});


const User = mongoose.model('User',UserSchema)
module.exports = User