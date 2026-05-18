import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {
      const tempData = []
      for (const item in cartItems) {
        for (const size in cartItems[item]) {
          if (cartItems[item][size]) {
            tempData.push({
              _id: item,
              size,
              quantity: cartItems[item][size],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])




  return (
    <div className='border-t border-gray-200 pt-10 pb-16'>

      <div className='mb-8'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      {cartData.length === 0 ? (
        <div className='text-center py-20 text-muted'>
          <p className='mb-4'>Your cart is empty.</p>
          <button onClick={() => navigate('/collection')} className='bg-ink text-white px-6 py-2 rounded-full hover:bg-black transition-colors'>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-4'>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null
              return (
                <div key={index} className='flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border border-gray-200 rounded-md'>
                  <div className='flex items-center gap-4 flex-1 min-w-0'>
                    <div className='w-20 h-24 shrink-0 overflow-hidden rounded-md'>
                      <img
                        src={productData.image?.[0] || ''}
                        alt={productData.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-base font-medium text-ink line-clamp-1'>{productData.name}</p>
                      <div className='flex flex-wrap items-center gap-3 mt-2 text-sm text-muted'>
                        <p className='text-ink font-medium'>{currency}{productData.price}</p>
                        <span className='px-2 py-0.5 border border-gray-300 rounded text-xs'>{item.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between sm:justify-end gap-4'>
                    <input
                      className='w-16 p-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-accent'
                      type='number'
                      min='0'
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, item.size, parseInt(e.target.value === '' || e.target.value === null ? 0 : e.target.value))}
                    />
                    <img
                      className='w-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
                      src={assets.bin_icon}
                      alt='delete'
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className='flex justify-end mt-10'>
            <div className='w-full sm:w-90'>
              <CartTotal />
              <button
                onClick={() => navigate('/placeorder')}
                className='w-full mt-4 bg-ink text-white py-3 rounded-md hover:bg-black transition-colors text-sm uppercase tracking-wider'
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
