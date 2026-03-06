import { useState, useEffect } from 'react';
import high from './assets/red-flag.svg';
import medium from './assets/yellow-flag.svg'
import low from './assets/green-flag.svg'
import clock from './assets/clock-white.svg';
import check from './assets/check.svg'
import Api from './services/Api';
import trash from './assets/delete.svg'

function App() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([])
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "high",
    task_state: "pending",
    deadline_date: "",
    deadline_time: ""
  })

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
      setRefresh((prev) => prev ? false : true);
    }
    catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  }

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
      <div className='bg-gray-700 flex flex-col justify-center items-center rounded-mg'>
        <h1 className='text-4xl text-white font-bold p-2'>Todo App</h1>
      </div>

      {/* New task */}
      <div className=' m-4  min-h-44 p-2'>
        <h2 className='text-center m-auto mb-2 text-yellow-200'>New Task</h2>
        <form className='flex justify-center'>
          <div className='mr-10'>
            <label className="block">Title:</label>
            <input type="text" name="title" className="w-96 mb-4" value={task.title} required
              onChange={handleChange} />
            <label className="block">Description:</label>
            <textarea name="description" type="text" className="w-96 h-24 bg-gray-400" value={task.description}
              onChange={handleChange} />
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
            <button type='submit' onClick={handleSubmit}>Add Task</button>
          </div>


        </form>

      </div >

      {/* tasks display */}
      < div className='flex justify-around mt-8' >
        <div className='border-white border-2 p-2 w-1/2 min-h-64 m-4'>
          <h2 className='text-yellow-200 text-center text-2xl'>Pending Tasks</h2>
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
                  <h3>{t.title}</h3>
                </div>
                <div className='w-10'>
                  <img src={t.priority === "high" ? high : t.priority === "medium" ? medium : low} className='icon-img' />
                </div>
                <div className='w-[40%]  flex'>
                  <img src={clock} className='icon-img' />
                  <p>Deadline: {t.deadline_date} {t.deadline_time}</p>
                </div>
                <img src={check} className='icon-img hover:bg-green-400'
                  onClick={() => {
                    markDone(t._id);
                  }} />
              </li>
            ))}
          </ul>
        </div>

        <div className='border-white border-2 w-1/2 min-h-64 m-4 p-2'>
          <h2 className='text-yellow-200 text-center text-2xl'>Completed Tasks</h2>
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
      </div >

      {/* stats display */}
      < div className='m-4' >
        <h2>Tasks Completed Today</h2>
        <h2>Tasks completed this week</h2>
        <h2>Tasks completed this month</h2>
      </div >
    </>
  )
}

export default App