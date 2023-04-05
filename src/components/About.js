import { useEffect } from 'react';
import React,{useContext}from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
  const a = useContext(noteContext);

  useEffect(() => {
      a.update();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div>This is about {a.state.name} and his salary is {a.state.salary}</div>
  )
}

export default About