import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-between p-2 bg-cyan-700 text-2xl text-white'>
        <div className='ml-4'>
            <h2>TodoList App</h2>
        </div>
        <nav className='flex justify-evenly gap-8 mr-4'>
            <Link to='/display' >Tasks</Link>
            <Link to='/newtask' >New Task</Link>
            <Link to='/stats' >Stats</Link>
        </nav>
    </div>
  )
}

export default Navbar