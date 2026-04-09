import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function Logout() {
    const navigation = useNavigate();
    const logOut = () => {
        localStorage.removeItem("my-todo-token");
        navigation("/")
    }
  return (
    <div >
        <Navbar/>
        <div className='flex justify-center flex-col items-center h-dvh'>
            <h2>Are you Sure you wanna logout?</h2>
            <div className='flex justify-center  gap-6 mt-6'>
                <button className='px-6'
                    onClick={logOut}
                    >Yes</button>
                <button className='px-6'
                    onClick={() => navigation('/display')}
                >No</button>
            </div>
        </div>
    </div>
  )
}

export default Logout