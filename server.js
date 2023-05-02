const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./controller/auth');
const dotenv = require('dotenv');
const TaskRouter = require('./controller/task');

mongoose.connect("mongodb+srv://inshal:Ins%40DB%23267@ticket-cluster.0etaola.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error(error));

dotenv.config()


const app = express(); 
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Check for ticket');
});

app.post('/register', UserRouter.userRegister);
app.post('/login', UserRouter.userLogin);
app.get('/getUserEmail', UserRouter.getUserEmails);
app.post('/getUserID', UserRouter.getCurrentUser);
app.post('/taskCreate', TaskRouter.taskCreate);
app.get('/getTasks', TaskRouter.getTasks);
app.post('/taskbyUser', TaskRouter.fetchTaskByCurrentUser);
app.post('/pending', TaskRouter.pendingTask);
app.post('/deleteTask', TaskRouter.deleteTask);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running ');
});


