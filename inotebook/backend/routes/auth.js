const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


// Create a User using : Post "/api/auth/createuser" . No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password must be atleast 5 char').isLength({ min: 5 }),

], async (req, res) => {

// if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with email already
    try {
        let user = await User.findOne({ email: req.body.email })
        // console.log(user)
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exist" })
        }
        // Create a new User
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })

        res.json(user)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some Error Occured")
    }
})

module.exports = router