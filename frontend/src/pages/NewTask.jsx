import React from 'react'
import { useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';
import Form from '../components/form';

function NewTask({refresh, setRefresh}) {

    const navigation  = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "high",
        task_state: "pending",
        deadline_date: "",
        deadline_time: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Api.post('/create', {
                title: task.title,
                description: task.description,
                priority: task.priority,
                task_state: task.task_state,
                deadline_date: task.deadline_date,
                deadline_time: task.deadline_time
            })
            console.log(res.data.id);
            setTask((prev) => ({
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
            alert("Something went wrong");
            console.error(err);
        }
    }
    return (
        <>
            {/* New task */}
            <div className='flex flex-col h-[80vh] gap-y-10 justify-center items-center m-0'>
                <h2 className='text-center mb-8 text-white text-6xl'>Create New Task</h2>
                <Form isReq = {true} task = {task} handleChange = {handleChange} handleSubmit = {handleSubmit} />

                <button className='mt-8 active:scale-95 bg-red-400'
                    onClick={() => {
                        navigation('/')
                    }}
                >Show Tasks</button> 


            </div >
        </>
    )
}

export default NewTask