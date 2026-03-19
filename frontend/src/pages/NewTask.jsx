import React from 'react'
import { useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';
import Form from '../components/form';

function NewformData({formData, setFormData ,refresh, setRefresh}) {

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
        try {
            const res = await Api.post('/create', formData)
            console.log(res.data.id);
            setFormData((prev) => ({
                ...prev,
                title: "",
                description: "",
                priority: "high",
                formData_state: "pending",
                deadline_date: "",
                deadline_time: ""
            }))
            setRefresh(!refresh); //toggle for useeffect
        }
        catch (err) {
            alert("Something went wrong");
            console.error(err);
        }
    }
    return (
        <>
            {/* New formData */}
            <div className='flex flex-col h-[80vh] gap-y-10 justify-center items-center m-0'>
                <h2 className='text-center mb-8 text-white text-6xl'>Create New formData</h2>
                <Form isReq = {true} formData = {formData} handleChange = {handleChange} handleSubmit = {handleSubmit} />

                <button className='mt-8 active:scale-95 bg-red-400'
                    onClick={() => {
                        navigation('/')
                    }}
                >Show Tasks</button> 


            </div >
        </>
    )
}

export default NewformData