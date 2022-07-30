import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  
  const navigate = useNavigate();

  const [data, setData] = useState({
    name:"",
    email:"",
    contact: 0,
    password:"",
    cpassword:""
  })

  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }
  
  const onClick = async (e) => {
    e.preventDefault();
    const res = await fetch("/signup", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name: data.name, email:data.email, contact:data.contact, password:data.password, cpassword:data.cpassword})
    })

    if(!res){
      window.alert("Cannot Sign Up Right Now")
    }
    else{
      if(res.status === 400){
        window.alert("Please fill all the required fields.")
      }
      else if(res.status === 409){
        window.alert("User is already Registered.")
      }
      else if(res.status === 200){
        window.alert("User registered Successfully.")
        navigate("/login")
      }
      else{
        window.alert("Cannot Sign Up Right Now")
      }
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="d-flex justify-content-center align-items-center">
      <form className="p-5 border rounded-5" method="POST">
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" onChange={handleChange} className="form-control" id="name" name="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" onChange={handleChange} className="form-control" id="email" name="email" aria-describedby="email"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="contact" className="form-label">Contact</label>
    <input type="text" onChange={handleChange} className="form-control" id="contact" name="contact"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={handleChange} className="form-control" id="password" name="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" onChange={handleChange} className="form-control" id="cpassword" name="cpassword"/>
  </div>
  <button type="submit" onClick={onClick} className="btn btn-primary">Submit</button>
</form>
      </div>
    </div>
  )
}

export default Signup