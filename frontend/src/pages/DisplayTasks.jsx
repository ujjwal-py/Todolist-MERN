import { act, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
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
            default:
                return state;
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
        const fetchUsername = async() => {
            try {
                const response = await Api.get('/get-username');
                setFormData((prev) => ({
                    ...prev,
                    user: response.data.username
                }))
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchUsername();
    }, [])

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
                <h2 className='mt-4 rounded-2xl p-3 text-3xl shadow-blue-300 shadow-xl'>Hello {formData.user} </h2>
                <div className="
                    flex flex-col md:flex-row 
                    gap-3 
                    md:gap-0 
                    justify-between items-center 
                    w-full max-w-6xl mx-auto 
                    px-4 py-3 
                    bg-[#2E2787] 
                    rounded-2xl
                    ">
                    <div className='w-full rounded-2xl m-4  md:w-1/2'>
                        <h2 className='text-white text-center text-2xl   mb-4'>Pending Tasks</h2>
                        {!loading ? <ul>

                            {state.pendingTasks.map((t) => (
                                <li key={t._id} className='pending-task'>
                                    <PendingTask t = {t} handleEdit={handleEdit} deleteTask={deleteTask} markDone = {markDone}/>

                                </li>
                            ))}
                        </ul> : <div className='text-white text-center font-mono text-2xl'>Fetching data please wait.....</div>}
                        {state.isOpen && (
                            <div className='backdrop-style'>
                                <div className='bg-gray-800 p-4 md:p-5 rounded-2xl relative w-11/12 md:w-auto mx-4 md:mx-0'>
                                    <button className='bg-red-500 absolute right-2 top-2 md:right-0 md:top-0 px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded' onClick={() => {
                                        // setIsOpen(false);
                                        dispatch({ type: "CLOSE" })
                                        clearForm()
                                    }}>Close</button>
                                    <div className='mt-10 md:mt-0'>
                                        <Form formData={formData}
                                            handleChange={handleChange}
                                            handleSubmit={handleFormSubmit} />
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                    <div className='w-full rounded-2xl m-4 md:w-1/2'>
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