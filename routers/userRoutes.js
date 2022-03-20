const express = require('express');
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const router = express.Router();

//getting all groups information.
router.get("/",async(req,res)=>{
    const userList = await User.find().select('-passwordHash');//excluding return all fields of users
    if(!userList){
        res.status(500).json({success:false,message:`User List is empty`});
    }
    res.status(201).send(userList);
});

//register user
router.post("/register",async(req,res)=>{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.passwordHash,10), //giving salt parameter as 10.
        phone:req.body.phone,
        street:req.body.street,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
        isAdmin:req.body.isAdmin,
    });
    user = await user.save();
    if(!user)
    {
        return res.status(400).send('User unable to add');
    }
    res.send(user)
});

//user login
router.post("/login",async(req,res)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user) {
        return res.status(400).send(`The user not Found`);
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const secret = process.env.SECRET_JWT; 
        const token = jwt.sign({
             userId:user.id,
             isAdmin:user.isAdmin,
         },secret,{expiresIn:'1d'});//expire the token in 1 day
        res.status(200).send({user:user.email,token:token});
    }else{
         res.status(400).send(`password is wrong!`);
    }
    
});
module.exports = router;