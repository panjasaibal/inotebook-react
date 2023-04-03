var jwt = require('jsonwebtoken');
const JWT_SECRET = 'saibal4@panja';

const fetchUsers=(req, res, next)=>{

    //get the user from jwt tokken

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Try with valid tokken"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"Try with valid tokken"})
    }
   
    
}




module.exports = fetchUsers;