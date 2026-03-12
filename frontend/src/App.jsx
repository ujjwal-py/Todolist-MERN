import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import NewTask from './pages/NewTask'
import DisplayTasks from './pages/DisplayTasks';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';

function App() {
  const [refresh, setRefresh] = useState(false)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element = {<DisplayTasks refresh={refresh} setRefresh={setRefresh} />} />
        <Route path='/newtask' element={<NewTask refresh={refresh} setRefresh={setRefresh} />} />
        <Route path='/stats' element={<Stats/>}/>
      </Routes>
    </>
  )
}

export default App