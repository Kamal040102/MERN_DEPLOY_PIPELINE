import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email:user.email, password:user.password}),
      method:"POST"
    })

    if(!res){
      alert("Unknown Error Occured!! Please try after sometime.")
    }
    else if(res.status === 400){
      alert("Please fill all the required fields.")
    }
    else if(res.status === 401){
      window.alert("Invalid Credentials")
    }
    else if(res.status === 500){
      window.alert("Internal Server Error")
    }
    else if(res.status === 200){
      window.alert("User logged in Successfully.")
      navigate("/")
    }
    else{
      window.alert("Unknown Error Occured!! Please try after sometime. Yo")
    }
  } 

  return (
    <div className="container ">
      <h1 className="text-center mt-3">Login</h1>
      <div className="d-flex justify-content-center align-items-center py-5">
        <form method="POST" className="border p-5 rounded-5">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              aria-describedby="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login