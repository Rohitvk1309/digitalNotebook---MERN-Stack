import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "66daecdf47b2dd3e5bb25210",
          "user": "66daca46e0cc553bd920f4c0",
          "title": "My title",
          "description": "Plaese wake up earlyu",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66daf5b7e4007d3a766b402a",
          "user": "66daca46e0cc553bd920f4c0",
          "title": "New title 2",
          "description": "Plaese wake up earlyu",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66daf5bbe4007d3a766b402c",
          "user": "66daca46e0cc553bd920f4c0",
          "title": "New title 3",
          "description": "Plaese wake up earlyu",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66daecdf47b2dd3e5bb25210",
          "user": "66daca46e0cc553bd920f4c0",
          "title": "My title",
          "description": "Plaese wake up earlyu",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66daf5b7e4007d3a766b402a",
          "user": "66daca46e0cc553bd920f4c0",
          "title": "New title 2",
          "description": "Plaese wake up earlyu",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66daf5bbe4007d3a766b402c",
          "user": "66daca46e0cc553bd920f4c0",
          "title": "New title 3",
          "description": "Plaese wake up earlyu",
          "tag": "personal",
          "__v": 0
        }
      ]

    const [notes, setnotes] = useState(notesInitial)
 
    return (
        <NoteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;