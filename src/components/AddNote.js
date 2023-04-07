import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
function Addnote() {

    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({tittle:'', description:'', tag:'default'})

    const handleClick = (e)=>{
            e.preventDefault();
            addNote(note.tittle, note.description, note.tag);
    }
   
    const onChange=(e)=>{
            setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div className='container my-3'>
            <h2 className='text'>Add Note</h2>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="tittle" className="form-label">Tittle</label>
                    <input type="text" className="form-control" id="tittle" name='tittle' onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote;