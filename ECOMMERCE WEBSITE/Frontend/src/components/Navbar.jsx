import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {NavLink, Link} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {

  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    
  }




  return (
    <div className = 'flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
          <img src={assets.logo} alt='logo' className='w-36' />
        </Link>
        <ul className='hidden md:flex items-center gap-6'>
          <NavLink className = 'flex flex-col items-center gap-1' to = '/' >
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
          </NavLink>
          <NavLink className = 'flex flex-col items-center gap-1' to = '/about' >
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
          </NavLink>
          <NavLink className = 'flex flex-col items-center gap-1' to = '/contact' >
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
          </NavLink>
          <NavLink className = 'flex flex-col items-center gap-1' to = '/collection' >
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
          </NavLink>
         


       

        </ul>

        <div className='flex items-center gap-6'>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" />
          <div className =  'group relative'>
            <Link to="/login" className='relative'>
              <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile" onClick={() => {token ? null: navigate('/login') }}/>
            </Link>
            {token && (

              <div className= 'group-hover:block hidden absolute top-6 right-0 bg-white shadow-lg rounded-md py-2 w-32 text-center'>
                <div className = 'flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-sm '>
                  <p  className='cursor-pointer hover:text-black' onClick={()=> navigate('/orders')}>My Orders</p>
                  <p className='cursor-pointer hover:text-black' onClick={logout}>Logout </p>
                </div>
              </div>
            )}
          </div>
          <Link to = "/cart" className="relative">
          
            <img src={assets.cart_icon} alt="cart" />
            <p className='absolute right-[-5px] bottom-0 bg-ink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center aspect-square'>{getCartCount()}</p>

          </Link>
          <button type='button' onClick={() => setVisible(!visible)} className='md:hidden' aria-label='Open menu'>
            <img src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer' />
          </button>
        </div>

        {/* Sidebar menu for small screens */}

        {visible && (
          <div className='fixed inset-0 bg-black/40 z-40 md:hidden' onClick={() => setVisible(false)}></div>
        )}
        <div className = {'fixed top-0 right-0 h-screen w-2/3 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ' + (visible ? 'translate-x-0' : 'translate-x-full')}>
          <div className='flex flex-col items-center gap-6 mt-10'>
            <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={() => setVisible(false)}>
              <img className = 'h-4 rotate-180' src={assets.dropdown_icon} alt="dropdown" />
              <p>Back</p>
            </div>
            <NavLink  onClick = {() => setVisible(false)} className = 'flex flex-col items-center gap-1' to = '/' >
              <p>Home</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
            </NavLink>
            <NavLink  onClick = {() => setVisible(false)} className = 'flex flex-col items-center gap-1' to = '/about' >
              <p>About</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
            </NavLink>
            <NavLink  onClick = {() => setVisible(false)} className = 'flex flex-col items-center gap-1' to = '/contact' >
              <p>Contact</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
            </NavLink>
            <NavLink  onClick = {() => setVisible(false)} className = 'flex flex-col items-center gap-1' to = '/collection' >
              <p>Collection</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-ink rounded-full' />
            </NavLink>

          </div>

        </div>

    </div>
  )
}

export default Navbar
