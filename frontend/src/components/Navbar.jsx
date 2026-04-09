import React from 'react'
import { Link } from 'react-router-dom'
import logout from '../assets/logout.svg'

function Navbar() {
  return (
    <div className='flex justify-between p-2 bg-cyan-700 text-2xl text-white'>
        <div className='ml-4'>
            <Link to='/'> 
              <h2>TodoList App</h2>
            </Link>
        </div>
        <nav className='flex justify-evenly gap-8 mr-4'>
            <Link to='/display' >Tasks</Link>
            <Link to='/newtask' >New Task</Link>
            <Link to='/stats' >Stats</Link>
            <Link to ='/logout'><img src={logout} className='w-10 h-10'/></Link>
        </nav>
    </div>
  )
}

export default Navbar