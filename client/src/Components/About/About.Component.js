import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {

  const navigate = useNavigate();

  const authAbout = async () => {
    try{
      const res = await fetch("/about",{
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        method:"GET",
        credentials:"include"
      })
  
      const data = await res.json()

      if(res.status !== 200) {
        navigate("/login")
      }

    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    authAbout();
  }, [])

  return (
    <div>About</div>
  )
}

export default About