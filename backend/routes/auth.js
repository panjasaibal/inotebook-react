const express = require('express');
const User = require('../model/users');
const { body, validationResult } = require('express-validator');

const router = express.Router();

//create a new user "/create"

router.post('/create',[
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

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            passwd:req.body.passwd,
        }) 
     
        res.json(user);
    } 
    catch (error) {
       console.error(error.message); 
       res.status(500).send("Some errors occured")
    }
   
})


module.exports = router;