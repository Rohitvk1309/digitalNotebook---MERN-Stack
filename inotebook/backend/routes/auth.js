const express = require('express')
const router = express.Router() 
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


// Create a User using : Post "/api/auth/" . does't required Auth
router.post('/', [
    body('name','Enter a valid name').isLength({ min : 3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','password must be atleast 5 char').isLength({ min : 5}),

] , (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors : errors.array()});
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error: 'Please enter a valid email'})}
    )
    
})

module.exports = router