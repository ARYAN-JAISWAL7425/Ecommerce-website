import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Relatedproduct from '../components/Relatedproduct'

const Product = () => {
  const { productId } = useParams()
  const { products, addToCart, currency } = useContext(ShopContext)

  const [size, setSize] = useState('')
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')

  useEffect(() => {
    const found = products.find((item) => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image?.[0] || '')
    }
  }, [productId, products])

  if (!productData) {
    return null
  }

  return (
    <div className='py-10'>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='w-full lg:w-1/2'>
          <div className='w-full aspect-square flex items-center justify-center overflow-hidden'>
            <img
              src={image}
              alt={productData.name}
              className='max-w-full max-h-full object-contain'
            />
          </div>
          {productData.image.length > 1 && (
            <div className='w-full flex items-center gap-3 mt-4 overflow-x-auto'>
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={productData.name}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-opacity ${item === image ? 'opacity-100 ring-2 ring-accent' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
          )}
        </div>

        <div className='w-full lg:w-1/2'>
          <h1 className='text-2xl font-medium'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2 text-sm text-gray-600'>
            <div className='flex items-center gap-1'>
              <img src={assets.star_icon} alt='star' className='w-4' />
              <img src={assets.star_icon} alt='star' className='w-4' />
              <img src={assets.star_icon} alt='star' className='w-4' />
              <img src={assets.star_icon} alt='star' className='w-4' />
              <img src={assets.star_dull_icon} alt='star' className='w-4' />
            </div>
            <span>(122 Reviews)</span>
          </div>
          <p className='text-xl font-medium text-gray-800 mt-3'>{currency}{productData.price}</p>
          <p className='text-sm text-gray-600 mt-2'>{productData.description}</p>

          <div className='flex items-center gap-4 mt-6'>
            <p>Select Size</p>
            <div className='flex items-center gap-2'>
              {productData.sizes?.map((sizeOption, index) => (
                <button
                  key={index}
                  className={`border py-1 px-3 transition-colors ${
                    size === sizeOption ? 'border-accent bg-accent text-white' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setSize(sizeOption)}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>

          <button className='bg-ink text-white px-6 py-3 rounded-full hover:bg-black transition-colors mt-6' onClick={() => addToCart(productData._id, size)}>
            Add to Cart
          </button>

          <hr className='my-6 border-gray-200' />

          <div className='text-sm text-gray-600 space-y-1.5'>
            <p>✓ 100% Genuine Product</p>
            <p>✓ Cash on Delivery available</p>
            <p>✓ 7 Days Return Policy</p>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-200'>
            <b className='text-base font-medium text-gray-800'>Product Details</b>
            <div className='grid gap-1.5 mt-3 text-sm text-gray-600'>
              <p>Category: <span className='text-gray-800'>{productData.category}</span></p>
              <p>Subcategory: <span className='text-gray-800'>{productData.subCategory}</span></p>
              <p>Available sizes: <span className='text-gray-800'>{productData.sizes?.join(', ')}</span></p>
            </div>
          </div>
        </div>
      </div>

      <Relatedproduct
        category={productData.category}
        subcategory={productData.subCategory}
      />
    </div>
  )
}

export default Product
