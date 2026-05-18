import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext)

    return (
        <Link to={`/product/${id}`} className='group block text-ink'>
            <div className='overflow-hidden rounded-md bg-white border border-transparent group-hover:border-gray-200 transition-colors'>
                <img
                    src={image[0]}
                    alt={name}
                    className='w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105'
                />
            </div>
            <p className='pt-3 pb-1 text-sm font-medium line-clamp-1 group-hover:text-accent-dark transition-colors'>{name}</p>
            <p className='text-sm font-medium text-muted'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
