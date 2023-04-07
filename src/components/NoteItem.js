import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const handleDelete = ()=>{
            deleteNote(note._id);
    };

    return (
        <div className='col-md-3'>
            <div className="card my-2">

                <div className="card-body">
                    <h5 className="card-title">{note.tittle}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>updateNote(note)}></i>

                </div>
            </div>
        </div>
    )
}

export default NoteItem