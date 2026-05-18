import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {

    
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src = {assets.exchange_icon} alt="exchange" className='w-12 m-auto mb-5' />
            <p className='text-center text-gray-800 font-medium text-lg'>Easy Exchange</p>
            <p className='text-center text-gray-500 text-sm'>We offer a simple and hassle-free exchange process.</p>
        </div>

        <div>
            <img src = {assets.quality_icon} alt="exchange" className='w-12 m-auto mb-5' />
            <p className='text-center text-gray-800 font-medium text-lg'>Quality Guarantee</p>
            <p className='text-center text-gray-500 text-sm'>We stand behind our products with a satisfaction guarantee.</p>
        </div>

        <div>
            <img src = {assets.support_img} alt="exchange" className='w-12 m-auto mb-5' />
            <p className='text-center text-gray-800 font-medium text-lg'>24/7 Support</p>
            <p className='text-center text-gray-500 text-sm'>Our customer support team is available around the clock to assist you.</p>
        </div>
      
      
      
      
    </div>
  )
}

export default OurPolicy
