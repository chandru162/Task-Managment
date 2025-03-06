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
        let count;
        const latestproject = await this.constructor.findOne().sort({ projectId: -1 });
        if (latestproject) {
            const latestprojectId = parseInt(latestproject.projectId.substring(1));
            count = latestprojectId + 1;
        } else {
            count = 1; 
        }
        this.projectId = `P${count.toString().padStart(4, '0')}`;
    }
    next();
});

const Project = mongoose.model('Project', ProjectScheema)
module.exports = Project;