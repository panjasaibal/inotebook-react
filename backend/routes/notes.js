const express = require('express');
const router = express.Router();
const Note = require('../model/notes');
const fetchUsers = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// '/fetchAllNotes' get all notes of the user  :Login Required

router.get('/fetchAllNotes',fetchUsers, async (req, res)=>{

    try {
        const notes = await Note.find({user:req.user.id});
        res.json({notes});  
    } catch (error) {
        console.error(error.message); 
       res.status(500).send('Internal server error');
    }
    
})


// '/addNotes' get all notes of the user  :Login Required

router.post('/addNotes',fetchUsers, [
    body('tittle', 'Enter a valid tittle').isLength({min:3}),
    body('description', 'Description cannot be null').isLength({min:5})
],async (req, res)=>{
    //If any empty field occured then erro will be thrown
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    try {

        const {tittle, description, tag} = req.body;
        const note = new Note({tittle, description, tag, user:req.user.id});
        let savedNote = await note.save();
        res.json(savedNote);
        
    } catch (error) {
        console.error(error.message); 
        res.status(500).send('Internal server error')
    }

    
})










module.exports = router;