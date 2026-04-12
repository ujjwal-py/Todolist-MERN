import React from 'react'
import { Link } from 'react-router-dom'
import logout from '../assets/logout.svg'

function Navbar() {
  return (
    <div className='flex justify-between p-2  bg-[#33006F] text-xl text-white'>
        <div className='ml-2'>
            <Link to='/'> 
              <h2 className='text-lg md:text-xl'>Task Manager</h2>
            </Link>
        </div>
        <nav className='flex justify-center gap-8'>
            <Link to='/display' >Tasks</Link>
            <Link to='/newtask' >New</Link>
            <Link to='/stats' >Stats</Link>
            <Link to ='/logout'><img src={logout} className='w-10 h-10'/></Link>
        </nav>
    </div>
  )
}

export default Navbar