import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import NewTask from './pages/NewTask'
import DisplayTasks from './pages/DisplayTasks';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';

function App() {
  const [refresh, setRefresh] = useState(false)
  const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "high",
        task_state: "pending",
        deadline_date: "",
        deadline_time: ""
  })

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element = {<Landing/>} />
        <Route path='/login' element = {<Signin/>} />
        <Route path='/register' element = {<SignUp/>} />
        <Route path='/display' element = {<DisplayTasks
         refresh={refresh}
         setRefresh={setRefresh}
         formData = {formData}
         setFormData ={setFormData}
         />} />
        <Route path='/newtask' element={<NewTask refresh={refresh}
         setRefresh={setRefresh}
         formData = {formData}
         setFormData = {setFormData}
         />} />
        <Route path='/stats' element={<Stats/>}/>
      </Routes>
    </>
  )
}

export default App