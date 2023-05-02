const Task = require('../schemas/taskSchema');
const task = require('../schemas/taskSchema');

exports.taskCreate =  async(req, res) =>{
    try{
        console.log(res.body);
        if(req.body != ''){
            const tasks = await task.create(req.body);
            console.log(tasks, 'On line 8');
            res.send('task created');
        }else{
            res.status(400).json({error: "Error while creating a task"});
        }
    }
    catch{
        res.status(400).send('task error');
    }
} 

exports.getTasks = async(req, res) =>{
    try{
        const taskAll = await task.find();
        if(taskAll){
            res.send(taskAll);
        }
       
    }catch{
        res.status(400).send({error: "No task avaliable"})
    }
}

exports.fetchTaskByCurrentUser = async(req, res) => {
    try{
        const userEmail = req.body.email; 
        const TaskList = await Task.find({assignedTo: userEmail});
   
        return res.send(TaskList).status(200);
    }catch{
        return 'error';
    }
}

exports.pendingTask = async(req, res) => {
    try{ 
  
        const tasks = await Task.find({status: req.body.value}); 
        return res.send(tasks).status(200);
    }
    catch{
        res.send(400)
    }
}

exports.deleteTask = async(req, res) => {
    try{
        const deleteParam = req.body._id; 
        if(deleteParam){
            await Task.deleteOne({_id: deleteParam}) 
        }
        
        res.send(deleteParam + 'Task deleted').status(200);
    }
    catch{
        res.send('Data not deleted').status(400);
    }
}