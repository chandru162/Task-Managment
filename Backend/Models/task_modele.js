const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        unique: true
    },
    time: {
        type: String,
        required:true,
        unique: false

    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        minlength: 10
    },
    userId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ["Admin", "Employee"],
        default: ""
    },
    userName: {
        type: String,
    },
    projectId: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["Ongoing", "Hold", "Done"],
        default: "Ongoing"
    },
    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"High"
    },
    dueDate: {
        type: String,
    }
},{timestamps:true});


TaskSchema.pre('save', async function (next) {
    if (this.isNew) {
        let count;
        let startNumber = 4;

        const latestTask = await this.constructor.findOne().sort({ taskId: -1 });

        if (latestTask) {
            const latestTaskId = parseInt(latestTask.taskId.substring(1)); 

            if (isNaN(latestTaskId)) {
                return next(new Error("Invalid taskId format in database"));
            }

            count = latestTaskId + 1;

            if (count.toString().length > startNumber) {
                startNumber = count.toString().length;
            }
        } else {
            count = 1;
        }

        this.taskId = `T${count.toString().padStart(startNumber, '0')}`;
    }

    next();
});


const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;