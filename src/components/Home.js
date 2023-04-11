import React from 'react';
import Notes from './Notes';


//import noteContext from '../context/notes/noteContext';

function Home(props) {
  const showAlert = {props}
  return (
    <div className='container my-3'>
     

      <Notes showAlert={showAlert}/>

    </div>
  )
}

export default Home;