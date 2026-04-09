import React from 'react'
import { Link } from 'react-router-dom'

function SignForm({ handleSubmit, formData, handleChange, formTitle, error }) {
    return (
        <div>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='bg-cyan-700 rounded-2xl shadow-xl shadow-blue-500 p-10 w-96'>
                    <h1 className='text-center mb-8'>{formTitle}</h1>
                        <div className='text-red-500 font-bold bg-white text-lg text-center'>{error}</div>
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label className='mb-2'>Username</label>
                            <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='Enter your username' className='p-3 bg-cyan-900 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='mb-2'>Password</label>
                            <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password (min 8 characters)' className='p-3 bg-cyan-900 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                        <button type='submit' className='mt-4 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg active:scale-95 transition-all'>
                            Sign In
                        </button>
                    </form>
                    {
                    formTitle === "Sign In" &&  <div>
                        <p className='text-center text-gray-300 mt-6'>Don't have an account? <Link to='/register'
                            className='text-yellow-400 hover:text-blue-300 font-semibold'>Sign up</Link></p>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SignForm