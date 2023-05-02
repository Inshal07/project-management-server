const {Router} = require('express'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema');

const router = Router();

exports.userRegister = async (req, res)=>{
        try {
            if(req.body.email != ''){
                req.body.password = await bcrypt.hash(req.body.password, 10);
                //create a user
                const user = await User.create(req.body);
                console.log(user._id)
                res.json(user);
            }
        }catch{
            res.status(400).json({error});
        }
    }



exports.userLogin = 
    async(req, res)=>{
        
        try{
            const user = await User.findOne({email: req.body.email});
            console.log(user);
            if(user){
                const pass = await bcrypt.compare(req.body.password, user.password)
                console.log(pass);

                if(pass){
                    console.log(user.email)
                    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);
                    console.log(token);
                    res.json({ token: token, userId: user._id});
                }else{
                    res.status(400).json({error: "Incorrect Password"});
                }
           }else{
            res.status(400).json({error: "User doesn't exist"});
           }
        }catch{
            res.status(400).json({error:'ERROR'});
        }
    }

exports.getCurrentUser = async(req, res) =>{
    try{
        const userData = await User.findById(req.body.id); 
        if(userData){ 
            res.send(userData)
        }
    }catch{
        res.status(400).send({error: 'Error finding user'});
    }
 }

 exports.getUserEmails = async(req, res) =>{
   try{
    const userEmails = await User.find();
    let userEmailList = [];
    userEmails.filter((users)=> {
       userEmailList.push(users.email)
    }); 
    return res.send(userEmailList).status(200)
   }catch{
      return res.send('Error Occured');
   }
}