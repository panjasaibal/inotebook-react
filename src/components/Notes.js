import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './AddNote';


function Notes() {
    const context = useContext(noteContext);
    const { notes, getAllNote, editNote } = context;

    const [note, setNote] = useState({id:'',tittle:'', description:'', tag:''})
    let history = useNavigate();

    const handleClick = (e)=>{
       // console.log("Updateing the note: ", note)
            editNote(note._id, note.tittle, note.description, note.tag);
            
            e.preventDefault();
            refClose.current.click();
            
    }
   
    const onChange=(e)=>{
            setNote({...note, [e.target.name]:e.target.value})
    }
    useEffect(() => {
        if(localStorage.getItem("token")!== 'undefined'){
            getAllNote();
            console.log(localStorage.getItem('token'))
        }
        else{
            history("/login");
        }
        
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
       // console.log("Clicked")
        ref.current.click();
        setNote(currentNote);

    }
    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <>
            <Addnote />
            <button type="button" className="btn btn-primary invisible" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" >
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        
                        </div>
                        <div className="modal-body">
                            
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="tittle" className="form-label">Tittle</label>
                                    <input type="text" className="form-control" id="tittle" name='tittle' value={note.tittle} onChange={onChange} minLength={3} required />
                                    

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.tittle.length<3 || note.description.length<5}>Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-2'>
                <h2>Your All Notes</h2>
                <div className='row'>
                    {notes.map((n) => {
                        return <NoteItem key={n._id} updateNote={updateNote} note={n} />
                    })}

                </div>
            </div>
        </>
    )
}

export default Notes