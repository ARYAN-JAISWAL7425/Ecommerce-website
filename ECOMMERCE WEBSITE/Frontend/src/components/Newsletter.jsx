import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Newsletter = () => {

    const [email, setEmail] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        toast.success(`Subscribed ${email} to the newsletter!`)
        setEmail('')
    }




  return (
    <div className = 'text-center py-10'>

        <p className = 'text-gray-800 text-2xl font-bold mb-4'>Subscribe now & get <span className='text-accent'>20% off</span></p>
        <p className = 'text-gray-500 text-sm mb-6'>Join our mailing list to receive updates on new arrivals, special offers and sales.</p>

    <form className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex items-center' onSubmit={onSubmitHandler}>
        <input required type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-400' />
        <button type='submit' className='bg-ink text-white px-6 py-2 rounded-r-full hover:bg-black transition-colors'>Subscribe</button>
    </form>

    </div>
  )
}

export default Newsletter
