const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        unique: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10
    },
    userId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ["Admin", "Employee"],
        default: ""
    },
    userName: {
        type: String,
        required: true
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
        enum:["High","Medium","Low"]
    },
    dueDate: {
        type: String,
        required: true
    }
});

TaskSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = (await this.constructor.countDocuments()) + 1; // Get the current count and increment
        this.taskId = `T${count.toString().padStart(4, '0')}`; // Generate the taskId
    }
    next();
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;