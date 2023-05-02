const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: String,
    taskDescription: String,
    currentDate: String,
    priority: String,
    endDate: String,
    assignedTo: String,
    assignedFrom: String,
    status:String
})


const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;