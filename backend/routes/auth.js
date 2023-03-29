const express = require('express');
const User = require('../model/users');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/',[
    body('name','Please enater a valid name').isLength({min:3}),
    body('email','Please enater a valid email').isEmail(),
    body('passwd',"Password at least have 5 charecters").isLength({min:5}),
] ,(req,res)=>{

    console.log(req.body)
    // const user = User(req.body);
    // user.save();
    // 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    //res.send(req.body)

    User.create({
        name:req.body.name,
        email:req.body.email,
        passwd:req.body.passwd,
    }).then((user)=>res.json(user)).catch(err=>{
        res.json({error:"Please enter a valid value",msg:err.message})
    })
})


module.exports = router;