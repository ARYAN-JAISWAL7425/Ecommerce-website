import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

  const { currency, deliveryCharge, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + deliveryCharge

  return (
    <div className='w-full bg-white border border-gray-200 rounded-md p-6'>
      <div className='mb-5'>
        <Title text1={'Cart'} text2={'Total'} />
      </div>

      <div className='flex flex-col gap-3 text-sm text-muted'>
        <div className='flex items-center justify-between'>
          <p>Subtotal</p>
          <p className='text-ink'>{currency}{subtotal}.00</p>
        </div>
        <hr className='border-gray-200' />
        <div className='flex items-center justify-between'>
          <p>Shipping Fee</p>
          <p className='text-ink'>{currency}{deliveryCharge}.00</p>
        </div>
        <hr className='border-gray-200' />
        <div className='flex items-center justify-between text-base'>
          <b className='text-ink font-medium'>Total</b>
          <b className='text-accent-dark font-semibold text-lg'>
            {currency}{total}.00
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
