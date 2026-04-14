import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api';
import SignForm from '../components/SignForm';
import Navbar from '../components/Navbar';


function Signin({error, setError}) {
  const navigaton = useNavigate();

// redirects to display if the user is already signed in, works on every page refresh
  const checkUser = async() => {
    try {
      const res = await Api.get("/check-user")
      if (res.status == "201") navigaton('/display')
    }
    catch(err) {
      // console.log(err);
    }
  }
  useEffect(() => {checkUser()}, [])

  const [formData, setFormData] = useState({
    username : "",
    password : ""
  })



  const handleChange = (e) => {
    const {name, value}  = e.target;
    setFormData((prev) => ({
      ...prev, 
      [name] : value
    }));
  }

  const handleSubmit  = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post('/login', formData)
      const token =  response.data.token;
      localStorage.setItem("my-todo-token", token);
      navigaton('/display')
      setError("");

    }
    catch(err) {
      console.error(err);
      setError(`ERROR ${err.status} -> ${err}`)
    } 

  }
  return (
    <>
    <SignForm handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} formTitle={"Sign In"} error = {error}/>
    </>
  )
}

export default Signin