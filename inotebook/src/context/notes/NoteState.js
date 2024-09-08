import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  //Get all Notes 
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYWNhNDZlMGNjNTUzYmQ5MjBmNGMwIn0sImlhdCI6MTcyNTYxNDY2M30.SvsfE-1sS5r3lIaSMYuNxPeYuT91gANfao9nNYk1dpE"
      },
    })
    const json = await response.json()
    console.log(json);
    setNotes(json)

  }


  //Add a Note
  const addNote = async (title, description, tag) => {
    //API CAll
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYWNhNDZlMGNjNTUzYmQ5MjBmNGMwIn0sImlhdCI6MTcyNTYxNDY2M30.SvsfE-1sS5r3lIaSMYuNxPeYuT91gANfao9nNYk1dpE"
      },
      body: JSON.stringify({ title, description, tag })
    })

    console.log("adding a new log");

    const note = {
      "_id": "66daf5bbe4007d3a766b402c",
      "user": "66daca46e0cc553bd920f4c0",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    };
    setNotes(notes.concat(note))
  }



  //Delete a Note
  const deleteNote = async (id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYWNhNDZlMGNjNTUzYmQ5MjBmNGMwIn0sImlhdCI6MTcyNTYxNDY2M30.SvsfE-1sS5r3lIaSMYuNxPeYuT91gANfao9nNYk1dpE"
      },
    })

    const json = response.json()
    console.log(json)
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
 


  //Edit  a note
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkYWNhNDZlMGNjNTUzYmQ5MjBmNGMwIn0sImlhdCI6MTcyNTYxNDY2M30.SvsfE-1sS5r3lIaSMYuNxPeYuT91gANfao9nNYk1dpE"
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = response.json()

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag
      }
    }
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;


