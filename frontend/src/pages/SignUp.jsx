import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api';
import SignForm from '../components/SignForm';


function SignUp({error, setError}) {
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
      // console.log(err);
    }
  }
  useEffect(() => {checkUser()}, [])

  const [formData, setFormData] = useState({
    username : "",
    email: "",
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
      const response = await Api.post('/register', formData)
      const token =  response.data.token;
      localStorage.setItem("my-todo-token", token);
      navigaton('/display')

    }
    catch(err) {
      setError(`${err.response.data.msg}`)
    } 

  }
  return (
    <>
    <SignForm handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} formTitle={"Sign Up"} error = {error} />
    </>
  )
}

export default SignUp