import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/collection') {
      setShowSearch(true)
    } else {
      setShowSearch(false)
    }
  }, [location, setShowSearch])



 

  return showSearch ? (
    <div className='border-t border-b bg-gray-50'>
      <div className='w-full flex flex-wrap items-center justify-center gap-3 py-4 px-4'>
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative'>
          <input
            type="text"
            placeholder='Search for products...'
            className='w-full px-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={assets.search_icon}
            alt="Search"
            className='w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
          />
        </div>
        <button
          className='bg-ink text-white px-5 py-2 rounded-full hover:bg-black transition-colors'
          onClick={() => setShowSearch(false)}
        >
          Close
        </button>
        <img
          src={assets.cross_icon}
          alt="Close"
          className='w-5 h-5 cursor-pointer'
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  ) : null
}

export default SearchBar
