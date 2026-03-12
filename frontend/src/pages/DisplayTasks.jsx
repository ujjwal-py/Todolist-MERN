import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import high from '../assets/red-flag.svg';
import medium from '../assets/yellow-flag.svg'
import low from '../assets/green-flag.svg'
import clock from '../assets/clock-white.svg';
import check from '../assets/check.svg'
import Api from '../services/Api';
import trash from '../assets/delete.svg'

function DisplayTasks({ refresh, setRefresh }) {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([])
    const navigation = useNavigate();
    const dialogRef = useRef(null);

    const openDialog = () => {
        dialogRef.current.showModal();
    }

    const closeDialog = () => {
        dialogRef.current.close();
    }

    const fetchPendingTasks = async () => {
        let arr = [];

        try {
            const res = await Api.get("/pending");
            arr = res.data;
        }
        catch (err) {
            console.error(err);
            arr = [];
        }
        finally {
            setPendingTasks(arr);
        }
    }

    useEffect(() => { fetchPendingTasks() }, [refresh])
    useEffect(() => {
        const fetchCompletedTask = async () => {
            let arr = [];
            try {
                const res = await Api.get("/completed");
                arr = res.data;
                setCompletedTasks(arr);
                setRefresh(!refresh);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchCompletedTask();
    }, [refresh])


    const markDone = async (_id) => {
        const id = _id;
        try {
            const res = await Api.put(`/update/${id}`, {
                task_state: "completed"
            });
            setRefresh(!refresh)
        }
        catch (err) {
            console.error(err);
        }
    }

    const deleteTask = async (_id) => {
        const id = _id;
        try {
            const res = await Api.delete(`/delete/${id}`);
            setRefresh(!refresh);
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            {/* tasks display */}
            < div className='flex flex-col w-screen items-center h-[80vh]' >
                <div className='flex justify-between mt-4 w-full'>
                    <div className='p-2 w-1/2  m-4'>
                        <h2 className='text-white text-center text-2xl bg-blue-500 rounded-lg mb-6'>Pending Tasks</h2>
                        <ul>
                            {/* <li className='pending-task'>
                      Do DSA binary trees
                      <img src={redFlag} className='icon-img' />
                      <img src={clock} className='icon-img' />
                      <p>Deadline: 6/3/2025</p>
                      <img src={check} className='icon-img hover:bg-green-300' />
                    </li> */}
                            {pendingTasks.map((t) => (
                                <li key={t._id} className='pending-task'>
                                    <div className='w-[50%]'>
                                        <h3 title= {t.description}>{t.title}</h3>
                                    </div>
                                    <div className='w-10'>
                                        <img src={t.priority === "high" ? high : t.priority === "medium" ? medium : low} className='icon-img' />
                                    </div>
                                    <div className='w-[40%]  flex'>
                                        <img src={clock} className='icon-img' />
                                        <p>Deadline: {t.deadline_date} {t.deadline_time}</p>
                                    </div>
                                    <img src={check} className='icon-img hover:bg-green-300 scale-110'
                                        onClick={() => {
                                            markDone(t._id);
                                        }} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='w-1/2 m-4 p-2'>
                        <h2 className='text-white text-center text-2xl rounded-lg bg-blue-500 mb-6'>Completed Tasks</h2>
                        <ul>
                            {completedTasks.map((t) => (
                                <li key={t._id} className='completed-task'>{t.title}
                                    <img src={trash} className='icon-img hover:bg-blue-400'
                                        onClick={() => {
                                            deleteTask(t._id)
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button className='bg-red-400'
                onClick={()=> {
                    navigation('/newtask')
                }}
                >Create a new task</button>
{/* 
                task updation and more info logic is going to be here

                <dialog ref={dialogRef}>

                </dialog> */}
            </div >
        </>
    )
}

export default DisplayTasks