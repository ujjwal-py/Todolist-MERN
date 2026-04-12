import React from 'react'
import { useState, useEffect } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Navbar from '../components/Navbar';

function NewTask({formData, setFormData ,refresh, setRefresh}) {

    const navigation  = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('my-todo-token');
        try {
            const res = await Api.post('/create', formData, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.id);
            setFormData((prev) => ({
                ...prev,
                title: "",
                description: "",
                priority: "high",
                task_state: "pending",
                deadline_date: "",
                deadline_time: ""
            }))
            setRefresh(!refresh); //toggle for useeffect
        }
        catch (err) {
            // alert("Something went wrong");
            // console.error(res.data);
            navigation('/login')
        }
    }

    useEffect(() => {
    const fetchUsername = async() => {
        try {
            const response = await Api.get('/get-username');
            setFormData((prev) => ({
              ...prev,
              user : response.data.username
            }));
        }
        catch(err) {
            console.log(err);
        }
    }
    fetchUsername();
}, [refresh])


    return (
        <>
        <Navbar/>

            {/* New formData */}
            <div className='flex flex-col h-[80vh] gap-y-10 justify-center items-center m-0'>
                <h2 className='text-center text-white text-3xl'>Create New Task</h2>
                <Form isReq = {true} formData = {formData} handleChange = {handleChange} handleSubmit = {handleSubmit} />

                <button className='mt-8 active:scale-95 bg-red-400'
                    onClick={() => {
                        navigation('/display')
                    }}
                >Show Tasks</button> 


            </div >
        </>
    )
}

export default NewTask