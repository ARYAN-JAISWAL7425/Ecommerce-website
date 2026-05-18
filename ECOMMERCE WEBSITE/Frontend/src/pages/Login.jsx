import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., API call)
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/users/register`, {
          name,
          email,
          password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/users/login`, {
          email,
          password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred while submitting the form.')
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])


  return (
    <form onSubmit={onSubmitHandler} className = 'flex flex-col gap-4 w-full max-w-sm mx-auto mt-10'>
      <div className = 'flex justify-center gap-4'>
        <p className = 'text-lg font-semibold'>{currentState}</p>
        <hr className = 'w-1/2 border-t border-gray-300' /> 
      </div>
      {currentState === 'Login' ? ' ' : <input type="text" placeholder='Name' className = 'border border-gray-300 rounded px-4 py-2' onChange={(e) => setName(e.target.value)} />}
      <input type="email" placeholder='Email' className = 'border border-gray-300 rounded px-4 py-2' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Password' className = 'border border-gray-300 rounded px-4 py-2' onChange={(e) => setPassword(e.target.value)} />

      <div className = 'flex justify-end items-center'>
        {currentState === 'Login' ?
          <p onClick={() => setCurrentState('Sign Up')} className = 'text-sm text-zinc-900 underline hover:no-underline cursor-pointer'>
            Create Account
          </p>
          :<p onClick={() => setCurrentState('Login')}  className = 'text-sm text-zinc-900 underline hover:no-underline cursor-pointer'>
            Login Here
          </p>
        }

      </div>
      <button className = 'bg-ink text-white rounded px-4 py-2 hover:bg-black transition duration-300'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
