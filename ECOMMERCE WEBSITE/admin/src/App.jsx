import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import List from './pages/List'
import Add from './pages/Add'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token") || "")
 
  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])





  return (
    <div className = 'bg-cream min-h-screen'>
        <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken = {setToken} />
          <hr />
          <div className = 'flex'>
            <Sidebar />
          </div>
          <div className = 'w-[70%] mx-auto mt-4 ml-[max(20%, 200px)] text-gray-700'>
            <Routes>
              <Route path = "/add" element = {<Add token={token} />} />
              <Route path = "/list" element = {<List token={token} />} />
              <Route path = "/orders" element = {<Order token={token} />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  )
}

export default App
