const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    username: String,
    email: String,
    role: String,
    category: String,
    password: String
})


const User = mongoose.model('users', userSchema);

module.exports = User;