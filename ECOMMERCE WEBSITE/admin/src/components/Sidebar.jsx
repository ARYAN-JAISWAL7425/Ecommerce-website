import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className = "w-64 bg-white border-r border-zinc-200 p-4">
        <div className = "flex flex-col gap-2 p-4">
            <NavLink to = "/add" className = {({isActive}) => `flex items-center gap-2 p-2 rounded-md transition-colors ${isActive ? 'bg-zinc-100 text-zinc-900' : 'hover:bg-zinc-100'}`}>
              <img src = {assets.add_icon} alt = "add" className = "w-5 h-5" />
                <p className = 'hidden md:block'>Add Items</p>
            </NavLink>

             <NavLink to = "/list" className = {({isActive}) => `flex items-center gap-2 p-2 rounded-md transition-colors ${isActive ? 'bg-zinc-100 text-zinc-900' : 'hover:bg-zinc-100'}`}>
              <img src = {assets.parcel_icon} alt = "list" className = "w-5 h-5" />
                <p className = 'hidden md:block'>List Items</p>
            </NavLink>

             <NavLink to = "/orders" className = {({isActive}) => `flex items-center gap-2 p-2 rounded-md transition-colors ${isActive ? 'bg-zinc-100 text-zinc-900' : 'hover:bg-zinc-100'}`}>
              <img src = {assets.order_icon} alt = "order" className = "w-5 h-5" />
                <p className = 'hidden md:block'>Order Items</p>
            </NavLink>
        </div>

    </div>
  )
}

export default Sidebar
