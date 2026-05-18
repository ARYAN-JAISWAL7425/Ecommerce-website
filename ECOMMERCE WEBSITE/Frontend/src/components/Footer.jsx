import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='border-t border-gray-200 mt-16 pt-12 pb-6'>
      <div className='grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 mb-10'>
        <div>
          <img src={assets.logo} alt='logo' className='w-32 mb-4' />
          <p className='text-sm text-muted leading-relaxed max-w-md'>
            Discover the latest in modern fashion — curated styles, quality fabrics, and effortless shopping.
          </p>
        </div>
        <div>
          <p className='font-medium text-ink mb-4 text-sm uppercase tracking-wider'>Company</p>
          <ul className='flex flex-col gap-2 text-sm text-muted'>
            <li><Link to='/' className='hover:text-accent-dark transition-colors'>Home</Link></li>
            <li><Link to='/about' className='hover:text-accent-dark transition-colors'>About</Link></li>
            <li><Link to='/collection' className='hover:text-accent-dark transition-colors'>Collection</Link></li>
            <li><Link to='/contact' className='hover:text-accent-dark transition-colors'>Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className='font-medium text-ink mb-4 text-sm uppercase tracking-wider'>Get in touch</p>
          <ul className='flex flex-col gap-2 text-sm text-muted'>
            <li>+91 99999 99999</li>
            <li><a href='mailto:info@company.com' className='hover:text-accent-dark transition-colors'>info@company.com</a></li>
          </ul>
          <div className='flex items-center gap-3 mt-4 text-muted'>
            <a href='#' aria-label='facebook' className='hover:text-accent-dark transition-colors'>
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z'/></svg>
            </a>
            <a href='#' aria-label='twitter' className='hover:text-accent-dark transition-colors'>
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M18.244 2H21.5l-7.5 8.57L22.5 22h-6.77l-5.3-6.52L4.4 22H1.14l8.03-9.18L1.5 2h6.94l4.78 6 5.02-6zm-1.18 18h1.87L7.03 4H5.06l12 16z'/></svg>
            </a>
            <a href='#' aria-label='instagram' className='hover:text-accent-dark transition-colors'>
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'/></svg>
            </a>
            <a href='#' aria-label='linkedin' className='hover:text-accent-dark transition-colors'>
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z'/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className='border-t border-gray-200 pt-5 text-center text-xs text-muted'>
        © {new Date().getFullYear()} Forever. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
