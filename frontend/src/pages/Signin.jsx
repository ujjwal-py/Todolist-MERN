import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api';
import SignForm from '../components/SignForm';
import Navbar from '../components/Navbar';


function Signin() {
  const navigaton = useNavigate();

  const checkUser = async() => {
    try {
      const token = localStorage.getItem("my-todo-token");
      const res = await Api.get("/check-user", {
        token : token
      })
      if (res.status == "201") navigaton('/display')
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {checkUser()}, [])

  const [formData, setFormData] = useState({
    username : "",
    password : ""
  })

  const [error, setError] = useState("");

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
      setError(`ERROR ${err.status} -> ${err.response.data.msg}`)
    } 

  }
  return (
    <>
    <Navbar />

    <SignForm handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} formTitle={"Sign In"} error = {error}/>
    </>
  )
}

export default Signin