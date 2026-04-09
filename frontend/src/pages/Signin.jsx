import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api';
import SignForm from '../components/SignForm';


function Signin() {
  const navigaton = useNavigate();

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

    }
    catch(err) {
      console.error(err);
    } 

  }
  return (
    <>
    <SignForm handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} formTitle={"Sign In"}/>
    </>
  )
}

export default Signin