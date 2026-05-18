import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, getCartAmount, deliveryCharge, products, setCartItems } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/orders/verifyRazorpay', response, {
            headers: {
              token: token,
            }
          })
          if (data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error('Payment verification failed. Please contact support.')
          }
        } catch (error) {
          console.error('Error verifying Razorpay payment:', error)
          toast.error('Error verifying payment. Please try again.')
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('Please login to place your order.')
      return
    }

    try {
      let orderItems = []

      for (const item in cartItems) {
        for (const size in cartItems[item]) {
          if (cartItems[item][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === item))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[item][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error('Your cart is empty.')
        return
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryCharge,
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/orders/place', orderData, {
            headers: {
              token: token,
            }
          })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error('Error placing order. Please try again.')
          }
          break
        }
        case 'stripe': {
          const response = await axios.post(backendUrl + '/api/orders/place-stripe', orderData, {
            headers: {
              token: token,
            }
          })
          if (response.data.success) {
            const { session_url } = response.data
            window.location.href = session_url
          } else {
            toast.error('Error placing order. Please try again.')
          }
          break
        }
        case 'razorpay': {
          const responseRazorpay = await axios.post(backendUrl + '/api/orders/place-razorpay', orderData, {
            headers: {
              token: token,
            }
          })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          } else {
            toast.error('Error placing order. Please try again.')
          }
          break
        }
        default:
          break
      }
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('An error occurred while placing the order. Please try again.')
    }
  }

  const inputClass = 'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow'

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row items-start justify-center gap-10 py-10'>
      <div className='w-full max-w-xl'>
        <div className='mb-6'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col sm:flex-row gap-3'>
            <input required type='text' placeholder='First Name' className={inputClass} value={formData.firstName} onChange={onChangeHandler} name='firstName' />
            <input required type='text' placeholder='Last Name' className={inputClass} value={formData.lastName} onChange={onChangeHandler} name='lastName' />
          </div>
          <input required type='email' placeholder='Email' className={inputClass} value={formData.email} onChange={onChangeHandler} name='email' />
          <input required type='text' placeholder='Street Address' className={inputClass} value={formData.address} onChange={onChangeHandler} name='address' />
          <div className='flex flex-col sm:flex-row gap-3'>
            <input required type='text' placeholder='City' className={inputClass} value={formData.city} onChange={onChangeHandler} name='city' />
            <input required type='text' placeholder='State' className={inputClass} value={formData.state} onChange={onChangeHandler} name='state' />
          </div>
          <div className='flex flex-col sm:flex-row gap-3'>
            <input required type='number' placeholder='Zip Code' className={inputClass} value={formData.zipCode} onChange={onChangeHandler} name='zipCode' />
            <input required type='text' placeholder='Country' className={inputClass} value={formData.country} onChange={onChangeHandler} name='country' />
          </div>
          <input required type='tel' placeholder='Phone Number' className={inputClass} value={formData.phoneNumber} onChange={onChangeHandler} name='phoneNumber' />
        </div>
      </div>

      <div className='w-full max-w-md'>
        <CartTotal />
        <div className='mt-8'>
          <Title text1={'Payment'} text2={'Method'} />
          <div className='flex flex-col gap-3 mt-4'>
            <label onClick={() => setMethod('stripe')} className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${method === 'stripe' ? 'border-accent bg-accent/5' : 'border-gray-300 hover:border-gray-400'}`}>
              <span className={`w-3 h-3 rounded-full border ${method === 'stripe' ? 'bg-accent border-accent' : 'border-gray-400'}`}></span>
              <img className='h-5' src={assets.stripe_logo} alt='Stripe' />
            </label>
            <label onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${method === 'razorpay' ? 'border-accent bg-accent/5' : 'border-gray-300 hover:border-gray-400'}`}>
              <span className={`w-3 h-3 rounded-full border ${method === 'razorpay' ? 'bg-accent border-accent' : 'border-gray-400'}`}></span>
              <img className='h-5' src={assets.razorpay_logo} alt='Razorpay' />
            </label>
            <label onClick={() => setMethod('cod')} className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${method === 'cod' ? 'border-accent bg-accent/5' : 'border-gray-300 hover:border-gray-400'}`}>
              <span className={`w-3 h-3 rounded-full border ${method === 'cod' ? 'bg-accent border-accent' : 'border-gray-400'}`}></span>
              <span className='text-sm font-medium'>Cash on Delivery</span>
            </label>
          </div>
        </div>
        <button type='submit' className='w-full mt-6 bg-ink text-white py-3 rounded-md hover:bg-black transition-colors text-sm uppercase tracking-wider'>
          Place Order
        </button>
      </div>
    </form>
  )
}

export default Placeorder
