import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/form';
import Api from '../services/Api';
import trash from '../assets/delete.svg';
import PendingTask from '../components/PendingTask';
import Navbar from '../components/Navbar';


function DisplayTasks({ refresh, setRefresh, formData, setFormData }) {
    const [loading, setLoading] = useState();
    function reducer(state, action) {  // will handle all the display functions 
        switch (action.type) {
            case "FETCH PENDING":
                return {
                    ...state,
                    pendingTasks: action.payload,
                };
            case "FETCH COMPLETED":
                return {
                    ...state,
                    completedTasks: action.payload,
                };

            case "FETCH SUCCESS":
                return {
                    ...state,
                    isOpen: false,
                }
            case "FETCH P-FAILED":
                return {
                    ...state,
                    pendingTasks: []
                }
            case "FETCH C-FAILED":
                return {
                    ...state,
                    completedTasks: []
                }
            case 'OPEN':
                return {
                    ...state,
                    isOpen: true
                };

            case 'CLOSE':
                return {
                    ...state,
                    isOpen: false
                };
            case "FETCH SINGLE":
                return {
                    ...state,
                    editingTask: action.payload._id,
                    isOpen: true
                };

        }
    }

    const initialformData = {
        editingTask: null,
        pendingTasks: [],
        completedTasks: [],
        isOpen: false,
        refresh: false
    }

    const [state, dispatch] = useReducer(reducer, initialformData);

    const clearForm = () => {
        setFormData({
            title: '',
            description: "",
            priority: "",
            deadline_date: "",
            deadline_time: "",
            task_formData: "pending"
        })
    }
    const navigation = useNavigate();

    const handleEdit = (task) => {

        dispatch({
            type: "FETCH SINGLE",
            payload: task
        })
        setFormData((prev) => ({
            ...prev,
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline_date: task.deadline_date,
            deadline_time: task.deadline_time
        }));

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //update a task from the pending tasks
    const handleFormSubmit = async (e) => {
        const token = localStorage.getItem('my-todo-token')
        // console.log(token);
        e.preventDefault();
        try {
            await Api.put(`/update/${state.editingTask}`, formData, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }) 
            dispatch({ type: "FETCH SUCCESS" })
            setRefresh(!refresh) // notify dom 
            clearForm(); // clear form from the updated values
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPendingTasks = async () => {
        const token = localStorage.getItem('my-todo-token')
        try {
            setLoading(true);
            const res = await Api.get("/pending", {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: "FETCH PENDING",
                payload: res.data
            })
            setLoading(false);
        }
        catch (err) {
            console.error(err);
            dispatch({
                type: "FETCH P-FAILED",
            })
            setLoading(false)
            navigation('/login')
        }

    }

    useEffect(() => { fetchPendingTasks() }, [refresh])
    useEffect(() => {
        const fetchCompletedTask = async () => {
        const token = localStorage.getItem('my-todo-token')


            try {
                setLoading(true)
                const res = await Api.get("/completed", {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
                dispatch({
                    type: "FETCH COMPLETED",
                    payload: res.data
                })
            }
            catch (err) {
                console.error(err);
                dispatch({
                    type: "FETCH C-FAILED"
                })
            }
            finally {
                setLoading(false)
            }
        }
        fetchCompletedTask();
    }, [refresh])


    const markDone = async (_id) => {
        const token = localStorage.getItem('my-todo-token')

        const id = _id;
        try {
            const res = await Api.put(`/update/${id}`, {
                task_state: "completed"
            },
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            setRefresh(!refresh)

        }
        catch (err) {
            console.error(err);
        }
    }

    const deleteTask = async (_id) => {
        const token = localStorage.getItem('my-todo-token')

        const id = _id;
        try {
            const res = await Api.delete(`/delete/${id}`);
            setRefresh(!refresh)
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <Navbar />

            {/* tasks display */}
            < div className='flex flex-col w-screen items-center h-[80vh]' >
                <div className='flex justify-between mt-4 w-full'>
                    <div className='w-1/2 rounded-2xl m-4'>
                        <h2 className='text-white text-center text-2xl   mb-4'>Pending Tasks</h2>
                        {!loading ? <ul>

                            {state.pendingTasks.map((t) => (
                                <li key={t._id} className='pending-task'>
                                    <PendingTask t = {t} handleEdit={handleEdit} deleteTask={deleteTask} />

                                </li>
                            ))}
                        </ul> : <div className='text-white text-center font-mono text-2xl'>Fetching data please wait.....</div>}
                        {state.isOpen && (
                            <div className='backdrop-style'>
                                <div className='bg-gray-800 p-5 rounded-2xl relative'>
                                    <button className='bg-red-500  absolute right-0 top-0' onClick={() => {
                                        // setIsOpen(false);
                                        dispatch({ type: "CLOSE" })
                                        clearForm()
                                    }}>Close</button>
                                    <Form formData={formData}
                                        handleChange={handleChange}
                                        handleSubmit={handleFormSubmit} />

                                </div>
                            </div>
                        )}
                    </div>

                    <div className='w-1/2  rounded-2xl m-4'>
                        <h2 className='text-white text-center text-2xl  mb-4'>Completed Tasks</h2>
                        {
                        !loading ? 
                        <ul>
                            {state.completedTasks.map((t) => (
                                <li key={t._id} className='completed-task'>{t.title}
                                    <img src={trash} className='icon-img'
                                        onClick={() => {
                                            deleteTask(t._id)
                                        }}
                                    />
                                </li>
                            ))}
                        </ul> 
                        : 
                        <div className='text-white text-center font-mono text-2xl'>Fetching Data plase wait.....</div>
                        }
                    </div>
                </div>

                <button className='bg-red-400 mt-10'
                    onClick={() => {
                        navigation('/newtask')
                    }}
                >Create a new task</button>

            </div >
        </>
    )
}

export default DisplayTasks