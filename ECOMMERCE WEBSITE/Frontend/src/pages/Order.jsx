import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async (notify = false) => {
    try {
      if (!token) {
        return
      }

      const response = await axios.post(backendUrl + '/api/orders/user', {}, {
        headers: {
          token: token,
        }
      })

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })
        setOrderData(allOrdersItem)
        if (notify) {
          toast.success('Order status updated')
        }
      } else {
        toast.error('Error fetching order data. Please try again.')
      }
    } catch (error) {
      console.error('Error fetching order data:', error)
      toast.error('An error occurred while fetching the order data. Please try again.')
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t border-gray-200 pt-10 pb-16'>
      <div className='mb-8'>
        <Title text1={'My'} text2={'Orders'} />
      </div>

      {orderData.length === 0 ? (
        <p className='text-sm text-muted text-center py-20'>No orders found.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {orderData.map((item, index) => (
            <div key={index} className='flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-gray-200 rounded-md'>
              <div className='flex items-center gap-4 flex-1 min-w-0'>
                <div className='w-20 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                  <img
                    className='w-full h-full object-cover'
                    src={item.image?.[0] || ''}
                    alt={item.name}
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-base font-medium text-ink line-clamp-1'>{item.name}</p>
                  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-muted'>
                    <span className='text-ink font-medium'>{currency}{item.price}</span>
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted'>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{item.paymentMethod}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between sm:justify-end gap-3 shrink-0'>
                <div className='flex items-center gap-2 text-sm text-green-700'>
                  <span className='w-2 h-2 rounded-full bg-green-700'></span>
                  <span className='font-medium'>{item.status}</span>
                </div>
                <button type='button' onClick={() => loadOrderData(true)} className='px-4 py-2 border border-gray-300 text-ink rounded-md text-sm hover:bg-gray-100 transition-colors'>
                  Refresh
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Order
