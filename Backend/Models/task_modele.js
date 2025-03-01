const mongoose = require('mongoose')

const TaskScheema = new mongoose.Schema({
    date:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlenth: 10
    },
    userId:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
        enum:["Admin","Employee"]
    }, 
    username:{
        type:String,
        required:true
    },
    projectId: {
        type: String,
        required: true,
        unique:true
    },
    projectname:{
        type:String,
        required:true
    },
    projectdescription:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["Ongoing","Hold","Done"],
        default:"Ongoing"
    },
    dueDate:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"High"
    },

})

const Task = mongoose.model('Task', TaskScheema)
module.exports = Task;