import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <section className='mx-auto max-w-6xl py-10'>
        <div className='flex items-center justify-center'>
          <Title text1={'About'} text2={'US'} />
        </div>

        <div className='mt-8 grid items-center gap-8 md:grid-cols-2'>
          <img
            className='w-full rounded-md object-cover'
            src={assets.about_img}
            alt='About Us'
          />
          <div className='flex flex-col gap-4 text-base text-gray-600'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className='pt-2'>
              <p className='font-semibold text-gray-800'>Our Mission</p>
              <p>To provide high-quality products and exceptional customer service, ensuring a seamless shopping experience for our customers.</p>
            </div>
            <div>
              <p className='font-semibold text-gray-800'>Our Vision</p>
              <p>To be the leading e-commerce platform, known for our commitment to quality, innovation, and customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl pb-10'>
        <div className='flex items-center justify-center'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>
        <div className='mt-8 grid gap-6 text-base text-gray-600 md:grid-cols-3'>
          <div className='rounded-lg border border-gray-200 p-5'>
            <p className='text-lg font-semibold text-gray-800'>Quality Assurance</p>
            <p className='mt-2'>We automate our quality control processes to ensure every product meets our high standards.</p>
          </div>
          <div className='rounded-lg border border-gray-200 p-5'>
            <p className='text-lg font-semibold text-gray-800'>Convenience</p>
            <p className='mt-2'>We make shopping easy and convenient for our customers.</p>
          </div>
          <div className='rounded-lg border border-gray-200 p-5'>
            <p className='text-lg font-semibold text-gray-800'>Exceptional Customer Service</p>
            <p className='mt-2'>We are committed to providing outstanding customer support and ensuring a positive shopping experience.</p>
          </div>
        </div>
      </section>

      <div className='mx-auto max-w-6xl pb-10'>
        <Newsletter />
      </div>
    </div>
  )
}

export default About
