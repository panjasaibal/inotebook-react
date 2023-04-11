import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: '', email: '', passwd: '', cpasswd: '' });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/api/auth/createuser";
    const { name, email, passwd } = credentials;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ name, email, passwd }),

      // body data type must match "Content-Type" header
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history('/');
      props.showAlert("Account created successfully", "success");

    } else {
      props.showAlert("Invalid username or password", "danger");
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3'>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="passwd" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.passwd} id="passwd" name='passwd' onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpasswd" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.cpasswd} id="cpasswd" name='cpasswd' onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-success"> Sign Up </button>
      </form>
    </div>
  )
}

export default Signup