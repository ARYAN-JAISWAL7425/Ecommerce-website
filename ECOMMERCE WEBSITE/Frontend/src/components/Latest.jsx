import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'

const Latest = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-3xl font-bold text-center mb-10'>
                <Title text1={'Latest'} text2={'Collection'} />
            </div>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-center text-gray-600 mb-10'>
                Discover the latest trends in fashion with our new collection. From stylish clothing to trendy accessories, we have everything you need to stay ahead of the fashion curve. Shop now and elevate your style with our latest arrivals.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default Latest
