
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    
    const host = "http://localhost:5000/";

    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    //Get all Note of the user
    const getAllNote = async()=>{
        let url = `${host}api/notes/fetchAllNotes`;

        const response = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
             
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token":localStorage.getItem("token")
            }
          
          });

          const json = await response.json();
        
          //console.log(json);
          //Setting the notes to the state and exports to all 
          setNotes(json);
          //console.log(notes)
    }

    //Add note
    
    const addNote = async(tittle, description, tag)=>{

        let url = `${host}api/notes/addNotes`;

        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            },
          
            body: JSON.stringify({tittle, description, tag}), // body data type must match "Content-Type" header
          });
          //console.log(response)
          const json = await response.json();
        
        setNotes(notes.concat(json));
        

    }
    

    //Delete note
    const deleteNote = async(id)=>{
        //Api call
        let url = `${host}api/notes/deleteNote/${id}`;

        const response = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json",
             
              "auth-token":localStorage.getItem("token")
            },
          
          });
          //console.log(response)

       // console.log("deleting :"+id);
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);

    }

    //Edit note

    const editNote = async (id, tittle, description, tag)=>{

        let url = `${host}api/notes/updateNote/${id}`;

        const response = await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("token")
            },
          
            body: JSON.stringify({tittle, description, tag}), 
          });
         // console.log(response)
         //return response.json();  cts

        //let json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
           
            if(newNotes[index]._id===id){

              newNotes[index].tittle = tittle;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
            
        }
        setNotes(newNotes);
  
    }



    return (
        <noteContext.Provider value={{notes, addNote,deleteNote,editNote, getAllNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
