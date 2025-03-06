const mongoose = require('mongoose')

const ProjectScheema = new mongoose.Schema({
    time:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    projectId: {
        type: String,
        unique:true
    },
    projectName:{
        type:String,
        required:true
    },
    projectDescription:{
        type:String,
        default:""
    },
    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"High"
    }

   

})


ProjectScheema.pre('save', async function (next) {
    if (this.isNew) {
        const count = (await this.constructor.countDocuments()) + 1; // Get the current count and increment
        this.projectId = `P${count.toString().padStart(4, '0')}`; // Generate the taskId
    }
    next();
});

const Project = mongoose.model('Project', ProjectScheema)
module.exports = Project;