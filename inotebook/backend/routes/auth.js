const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // this is make a salt on password 
const jwt = require('jsonwebtoken');  // this is use to create a token
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Rohitisgoodman'

// Route 1 Create a User using : Post "/api/auth/createuser" . No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password must be atleast 5 char').isLength({ min: 5 }),

], async (req, res) => {
  let success = false;
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    // check whether the user with email already
    try {
        let user = await User.findOne({ email: req.body.email })
        // console.log(user)
        if (user) {
            return res.status(400).json({ success,error: "sorry a user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authtoken })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error ")
    }
})


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials 1" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials 2" });
      }
  
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });


// Route 3  Get Loggedin details  using : Post "/api/auth/getuser" . login required

router.post('/getuser', fetchuser, async (req, res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal server Error ")
  
}
})

module.exports = router












