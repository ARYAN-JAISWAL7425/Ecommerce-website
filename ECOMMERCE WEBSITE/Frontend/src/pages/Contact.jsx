import React from 'react'
import Newsletter from '../components/Newsletter'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <section className='mx-auto max-w-6xl py-10'>
        <div className='flex items-center justify-center'>
          <Title text1={'Contact'} text2={'US'} />
        </div>

        <div className='mt-8 grid items-center gap-8 md:grid-cols-2'>
          <img className='w-full rounded-md object-cover' src={assets.contact_img} alt='Contact Us' />
          <div className='text-base text-gray-600'>
            <p className='text-lg font-semibold text-gray-800'>Our Store</p>
            <p className='mt-2'>54709 Willms Station<br />Suite 100<br />New York, NY 10001</p>
            <p className='mt-3'>Phone: (123) 456-7890</p>
            <p className='mt-1'>Email: <a href='mailto:info@company.com' className='text-zinc-900 underline hover:no-underline'>info@company.com</a></p>

            <p className='mt-6 text-lg font-semibold text-gray-800'>Careers at Forever</p>
            <p className='mt-2'>Learn more about joining our team!</p>
            <a
              href='mailto:careers@company.com'
              className='mt-4 inline-flex items-center rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors'
            >
              Apply for a Job
            </a>
          </div>
        </div>
      </section>

      <div className='mx-auto max-w-6xl pb-10'>
        <Newsletter />
      </div>
    </div>
  )
}

export default Contact
