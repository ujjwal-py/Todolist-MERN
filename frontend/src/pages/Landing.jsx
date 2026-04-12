import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen'>
      {/* Navbar */}
      <nav className='bg-[#33006F] p-6 shadow-lg'>
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-white'>Task Manager</h1>

        </div>
      </nav>

      {/* Hero Section */}
      <section className='max-w-6xl mx-auto px-6 py-20 text-center'>
        <h2 className='text-5xl font-bold text-white mb-6'>
          Stay Organized and Productive
        </h2>
        <p className='text-xl text-gray-300 mb-10'>
          Manage your tasks efficiently with our simple and powerful todo application
        </p>
        <div className='flex justify-center space-x-6'>
          <button 
            onClick={() => navigate('/login')}
            className='px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-lg transition-all active:scale-95'
          >
            Get Started
          </button>
          <button 
            onClick={() => navigate('/login')}
            className='px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-700/20 font-bold text-lg rounded-lg transition-all'
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-blue-900/30 py-16'>
        <div className='max-w-6xl mx-auto px-6'>
          <h3 className='text-4xl font-bold text-white text-center mb-12'>Features</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='bg-[#33006F] rounded-xl p-8 hover:bg-cyan-700 transition-all'>
              <div className='text-4xl mb-4'>📝</div>
              <h4 className='text-2xl font-bold text-white mb-3'>Create Tasks</h4>
              <p className='text-gray-300'>
                Easily add new tasks with titles, descriptions, priority levels, and deadlines
              </p>
            </div>

            {/* Feature 2 */}
            <div className='bg-[#33006F]  rounded-xl p-8 hover:bg-cyan-700 transition-all'>
              <div className='text-4xl mb-4'>✅</div>
              <h4 className='text-2xl font-bold text-white mb-3'>Track Progress</h4>
              <p className='text-gray-300'>
                Mark tasks as complete and visualize your accomplishments with statistics
              </p>
            </div>

            {/* Feature 3 */}
            <div className='bg-[#33006F]  rounded-xl p-8 hover:bg-cyan-700 transition-all'>
              <div className='text-4xl mb-4'>🎯</div>
              <h4 className='text-2xl font-bold text-white mb-3'>Stay on Schedule</h4>
              <p className='text-gray-300'>
                Set deadlines and priorities to focus on what matters most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='max-w-6xl mx-auto px-6 py-20 text-center'>
        <h3 className='text-4xl font-bold text-white mb-6'>
          Ready to Get Organized?
        </h3>
        <p className='text-xl text-gray-300 mb-8'>
          Start managing your tasks today with Task Master
        </p>
        <button 
          onClick={() => navigate('/login')}
          className='px-8 py-4 bg-red-700 hover:bg-yellow-600 text-white font-bold text-lg rounded-lg transition-all active:scale-95'
        >
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className='bg-gray-700 text-center py-6 mt-12'>
        <p className='text-white font-semibold'>
          © 2026 Task Master. Organize your life, one task at a time.
        </p>
      </footer>
    </div>
  )
}

export default Landing
