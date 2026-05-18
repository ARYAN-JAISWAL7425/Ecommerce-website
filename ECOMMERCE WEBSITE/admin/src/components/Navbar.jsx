import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className = 'flex items-center justify-between p-4 bg-ink text-white'>
        <img src={assets.logo} alt='Logo' className='w-25 h-12.5 bg-white rounded-md p-1' />
        <button className = 'bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors' onClick={() => setToken("")}>
            Logout
        </button>

    </div>
  )
}

export default Navbar
