const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// Route 3  Get All Notes using : get "/api/auth/getuser" . login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server Error ")
  }
})

// Route 3 Add new notes using : Post "/api/auth/getuser" . login required
router.post('/fetchallnotes', fetchuser, [
  body('title', 'Enter a valid name').isLength({ min: 3 }),
  body('description', 'password must be atleast 5 char').isLength({ min: 5 }),
], async (req, res) => {

  try {
    const { title, description, tag } = req.body // destructuring
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()

    res.json(savedNote)

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server Error ")
  }

})

module.exports = router