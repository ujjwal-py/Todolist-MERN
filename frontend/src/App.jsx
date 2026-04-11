import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import NewTask from './pages/NewTask'
import DisplayTasks from './pages/DisplayTasks';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import FourOFour from './pages/FourOFour';

function App() {
  const [refresh, setRefresh] = useState(false)
  const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "high",
        task_state: "pending",
        deadline_date: "",
        deadline_time: "", 
        user: ""
  })

  

  return (
    <>
      <Routes>
        <Route path='/' element = {<Landing/>} />
        <Route path='/login' element = {<Signin/>} />
        <Route path='/register' element = {<SignUp/>} />
        <Route path='/logout' element={<Logout/>} />
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
        <Route path='*' element = {<FourOFour/>} />
      </Routes>
    </>
  )
}

export default App