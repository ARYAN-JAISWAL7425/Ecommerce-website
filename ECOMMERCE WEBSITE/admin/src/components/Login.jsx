import React from 'react'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [ email, setEmail ] = React.useState("")
    const [ password, setPassword ] = React.useState("")

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`${backendUrl}/api/users/admin/login`, {
                email,
                password
            })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Login error:", error)
            toast.error("An error occurred during login.")
        }
    }

  return (
    <div className = "flex items-center justify-center h-screen">
        <div>
            <h1 className = "text-2xl font-bold mb-4">Admin Panel</h1>
            <form onSubmit = {onSubmitHandler} className = "bg-white p-6 rounded-md shadow-md">
                <div className = "mb-4">
                    <p className = "text-gray-700">Email Address</p>
                    <input type="email" placeholder='Enter your email' className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500" onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                </div>
                <div className = "mb-4">
                    <p className = "text-gray-700">Password</p>
                    <input type="password" placeholder='Enter your password' className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500" onChange = {(e) => setPassword(e.target.value)} value = {password}/>
                </div>
                <button type='submit' className = "bg-ink text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors">Login</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
