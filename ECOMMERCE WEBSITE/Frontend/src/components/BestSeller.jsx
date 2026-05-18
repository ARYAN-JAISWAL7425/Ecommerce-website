import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Product from '../pages/Product';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestSellerProducts = products.filter((item) => item.bestseller);
        setBestSeller(bestSellerProducts.slice(0, 5));
    }, [products]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Explore our best-selling products that have captured the hearts of our customers. From trendy fashion pieces to must-have accessories, these top-rated items are a testament to our commitment to quality and style.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
                {bestSeller.map((item, index) => (
                    <ProductItem 
                    key={index}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    id={item._id}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default BestSeller
