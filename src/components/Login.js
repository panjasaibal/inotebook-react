
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {

    const [credentials, setCredentials] = useState({email:'', passwd:''})
    let history  = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        let url = "http://localhost:5000/api/auth/login";

        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/json',
             
            },
             body: JSON.stringify({email:credentials.email, passwd:credentials.passwd}),
          
           // body data type must match "Content-Type" header
          });
          
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem("token", json.authtoken)
            history('/')
            props.showAlert("Logged in successfully", "success");

          }else{
            props.showAlert("Invalid username or password", "danger");
          }

    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
}

    return (
        <div className='container'>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwd" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.passwd} id="passwd" name='passwd' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login