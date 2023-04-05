import React from 'react';
import Notes from './Notes';
//import noteContext from '../context/notes/noteContext';

function Home() {
  
  return (
    <div className='container my-3'>
      <h2 className='text'>Add Note</h2>

      <form className='my-3'>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>

      <Notes/>

    </div>
  )
}

export default Home;