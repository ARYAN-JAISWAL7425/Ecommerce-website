import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../config'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Order = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return
    }
    try {
      const response = await axios.post(`${backendUrl}/api/orders/getallorders`, {}, {
        headers: {
          token: token
        }
      })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/orders/updateorder`, {
        orderId: orderId,
        status: event.target.value
      }, {
        headers: {
          token: token
        }
      })
      if (response.data.success) {
        await fetchAllOrders()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div className='mt-4'>
        {orders.map((order, index) => (
          <div key={index} className='bg-white p-4 rounded shadow mb-4'>
            <div className='flex items-start'>
              <img
                src={assets.parcel_icon}
                alt='Order'
                className='w-20 h-20 object-cover rounded'
              />
              <div className='ml-4'>
                {(order.items || []).map((item, itemIndex) => (
                  <p key={itemIndex}>
                    {item.name} x {item.quantity}
                    <span>{itemIndex === order.items.length - 1 ? '' : ', '}</span>
                  </p>
                ))}
              </div>
            </div>
            <p>{order.address?.firstName + ' ' + order.address?.lastName}</p>
            <div className='flex items-center mt-2'>
              <p>{order.address?.address + ', '}</p>
              <p>
                {order.address?.city + ', ' + order.address?.state + ', ' + order.address?.country + ' ,' + order.address?.zipCode}
              </p>
            </div>
            <p>{order.address?.phoneNumber}</p>
            <div className='mt-3'>
              <p>Items: {order.items?.length || 0}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p>{currency} {order.amount}</p>
            <select value={order.status} onChange={(event) => statusHandler(event, order._id)} className='border p-2 rounded mt-2'>
              <option value='Order Placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for Delivery'>Out for Delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
