import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row items-center gap-10 py-20'>
        {/* Left section with text and button */}

        <div className= 'w-full md:w-1/2 flex flex-col gap-6'>
          <div className='text-[#414141]'>
             <div className='flex items-center gap-2 text-sm font-medium text-gray-500'>
                <p className="w-8 md:w-11 h-[1.5px] bg-accent rounded-full"></p>
                <p className='font-medium text-sm md:text-base'>Our Bestsellers</p>
             </div>
          </div>
          <h1 className='font-display text-4xl md:text-6xl font-normal text-ink leading-tight'>
            Discover Our Latest Fashion Trends
          </h1>

          <button onClick={() => navigate('/collection')} className='bg-ink text-white py-2 px-6 rounded-full hover:bg-black transition-colors w-fit'>
            Shop Now
          </button>
        </div>
        {/* Right section with image */}
        <div className='w-full md:w-1/2'>
          <img src={assets.hero_img} alt="Hero" className='w-full h-auto' />
        </div>
    </div>
  )
}

export default Hero
