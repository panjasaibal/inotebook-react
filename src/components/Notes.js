import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className=' my-2'>
            <h2>Your All Notes</h2>
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note}/>
                })}

            </div>
        </div>
    )
}

export default Notes