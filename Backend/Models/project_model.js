const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    time:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        required:true
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


ProjectSchema.pre('save', async function (next) {
    if (this.isNew) {
        let count;
        let startNumber = 4; 

        const latestProject = await this.constructor.findOne().sort({ projectId: -1 });

        if (latestProject) {
            const latestProjectId = parseInt(latestProject.projectId.substring(1)); 

            if (isNaN(latestProjectId)) {
                return next(new Error("Invalid projectId format in database"));
            }

            count = latestProjectId + 1;

            if (count.toString().length > startNumber) {
                startNumber = count.toString().length;
            }
        } else {
            count = 1;
        }

        this.projectId = `P${count.toString().padStart(startNumber, '0')}`;
    }

    next();
});


const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project;