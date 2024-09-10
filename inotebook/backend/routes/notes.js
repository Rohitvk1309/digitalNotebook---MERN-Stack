// const express = require('express')
// const router = express.Router()
// const fetchuser = require('../middleware/fetchuser')
// const Note = require('../models/Note')
// const { body, validationResult } = require('express-validator');

// // Route 3  Get All Notes using : get "/api/auth/getuser" . login required
// router.get('/fetchallnotes', fetchuser, async (req, res) => {

//   try {
//     const notes = await Note.find({ user: req.user.id })
//     res.json(notes)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send("Internal server Error ")
//   }
// })

// // Route 3 Add new notes using : Post "/api/auth/getuser" . login required
// router.post('/addnote', fetchuser, [
//   body('title', 'Enter a valid name').isLength({ min: 3 }),
//   body('description', 'password must be atleast 5 char').isLength({ min: 5 }),
// ], async (req, res) => {

//   try {
//     const { title, description, tag } = req.body // destructuring
//     // if there are error return bad request and the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const note = new Note({
//       title, description, tag, user: req.user.id
//     })
//     const savedNote = await note.save()

//     res.json(savedNote)

//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send("Internal server Error ")
//   }

// })

// // Route 3 update an existing note using : Put "/api/auth/updatenote" . login required

// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body;
//   try {
//     //create a newnode object
//   const newNote = {};
//   if (title) { newNote.title = title };
//   if (description) { newNote.description = description };
//   if (tag) { newNote.tag = tag };

//   //Find the node to be updated and update  it
//   let note = await Note.findById(req.params.id);
//   if (!note) { return res.status(404).send("not found") }

//   if (note.user.toString() !== req.user.id) {
//     return res.status(401).send("not allowed")
//   }

//   note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//   res.json({ note })
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send("Internal server Error ")
//   }


// })


// // Route 4 delete an existing note using : del "/api/auth/deletenote" . login required

// router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body;
//   try {
//     //Find the node to be dleted and deleted it
//     let note = await Note.findById(req.params.id);
//     if (!note) { return res.status(404).send("not found") }

//     // allow deletion only if user owns this note
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("not allowed")
//     }

//     note = await Note.findByIdAndDelete(req.params.id)
//     res.json({ "Success": "Note has been dleted", note: note })

//   } catch (error) {
//   console.error(error.message)
//   res.status(500).send("Internal server Error ")
// }

// })

// module.exports = router














const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

//ROUTE_1 : Get All the Notes using : GET "/api/notes/fetchallnotes".  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE_2 : Add a new Note  using : POST "/api/notes/addnote".  login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors,return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE_3 : Upate an existing Note  using : PUT "/api/notes/updatenote/:id".  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;