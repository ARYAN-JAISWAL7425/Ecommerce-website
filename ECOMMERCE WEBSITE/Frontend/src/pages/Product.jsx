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
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-1/2'>
          <div className='w-full h-[400px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
            <img
              src={image}
              alt={productData.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='w-full flex items-center gap-3 mt-4 overflow-x-auto'>
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={productData.name}
                className='w-20 h-20 object-cover border border-gray-200 rounded-md cursor-pointer'
                onClick={() => setImage(item)}
              />
            ))}
          </div>
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

          <div className='flex items-center gap-4 mt-4'>
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

          <button className='bg-ink text-white px-5 py-2 rounded-full hover:bg-black transition-colors mt-6' onClick={() => addToCart(productData._id, size)}>
            Add to Cart
          </button>

          <hr className='my-6' />
          <p>100% Genuine Product</p>
          <p>Cash on Delivery available</p>
          <p>7 Days Return Policy</p>
        </div>
      </div>

      <div className='mt-10 border border-gray-300 rounded-md p-4'>
        <b className='text-xl font-medium'>Product Details</b>
        <p className='text-gray-600 mt-2'>Reviews (122)</p>
        <div className='grid gap-2 mt-4 text-gray-600'>
          <p>Product ID: {productData._id}</p>
          <p>Category: {productData.category}</p>
          <p>Subcategory: {productData.subCategory}</p>
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
