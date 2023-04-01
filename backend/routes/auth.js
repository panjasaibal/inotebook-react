const express = require('express');
const User = require('../model/users');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//validation
const { body, validationResult } = require('express-validator');

const router = express.Router();

//webtoken secret
const JWT_SECRET = 'saibal4@panja';

//create a new user "/createuser"

router.post('/createuser',[
    body('name','Please enater a valid name').isLength({min:3}),
    body('email','Please enater a valid email').isEmail(),
    body('passwd',"Password at least have 5 charecters").isLength({min:5}),
] ,async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    //res.send(req.body)

    //email already exists or not
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:'email id already exists'})
        }

        //genareting salt
    
        const salt = await bcrypt.genSalt(10);

        //hashing password with salt
        let secPasswrd = await bcrypt.hash(req.body.passwd, salt);

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            passwd:secPasswrd,
        }) 
        //sending webtokken to new user
        const data = {
            user:{id:user._id}
        }
        const authToken=  jwt.sign(data,JWT_SECRET)      //genareting tokken
        res.json({authToken});
    } 
    catch (error) {
       console.error(error.message); 
       res.status(500).send('Internal server error')
    }
   
})

//authenticate a user  "/login"

router.post('/login',[
    
    body('email','Please enater a valid email').isEmail(),
    body('passwd',"Password cannot ne null").exists()
] ,async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
   

    //email already exists or not
    const {email, passwd} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'Please try to login with correct credentials'})
        }

        //Checking password is right or wrong

        let passwordCompare = await bcrypt.compare(passwd, user.passwd);
        if(!passwordCompare){
            return res.status(400).json({error:'Please try to login with correct credentials'})
        }

        let payload = {user:{
            id:user._id
        }}
        const authToken=  jwt.sign(payload,JWT_SECRET)      //genareting tokken
        res.json({authToken});

        
    
    } 
    catch (error) {
       console.error(error.message); 
       res.status(500).send('Internal server error')
    }
   
})


module.exports = router;