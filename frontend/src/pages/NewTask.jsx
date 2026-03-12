import React from 'react'
import { useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';

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
                <form className='flex justify-center' onSubmit={handleSubmit}>
                    <div className='mr-10'>
                        <label className="block">Title:</label>
                        <input type="text" name="title" className="w-96 mb-4" value={task.title} required
                            onChange={handleChange} />
                        <label className="block">Description:</label>
                    <textarea name="description" type="text" className=" bg-cyan-900 text-white p-2 w-96 h-24" value={task.description}
                            onChange={handleChange}  />
                    </div>
                    <div className=''>
                        <p className='mb-2'>Task Priority: </p>
                        <label>High</label>
                        <input type='radio' name='priority' value="high"
                            checked={task.priority === "high"}
                            onChange={handleChange}></input>

                        <label>Medium</label>
                        <input type='radio' name='priority' value="medium"
                            checked={task.priority === "medium"}
                            // checked
                            onChange={handleChange}></input>
                        <label>Low</label>
                        <input type='radio' name='priority' value="low"
                            checked={task.priority === "low"}
                            onChange={handleChange}></input>
                        <label className='block mt-4'>Deadline:</label>
                        <input type='date' name="deadline_date" className='mt-2 text-black text-lg bg-white mb-4'
                            value={task.deadline_date}
                            onChange={handleChange}
                            required
                        />
                        <input type="time" name="deadline_time" className='text-black text-lg bg-white ml-2'
                            value={task.deadline_time}
                            onChange={handleChange}
                            required
                        /> <br></br> 
                        <button type='submit' className='mt-7' title='Click to submit'>Add Task</button>
                    </div>
                </form>

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