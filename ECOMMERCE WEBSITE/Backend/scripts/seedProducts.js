import 'dotenv/config'
import mongoose from 'mongoose'
import productModel from '../models/productModel.js'

const products = [
  {
    name: 'Classic Cotton Tee',
    description: 'Soft, breathable cotton with a clean everyday fit.',
    price: 399,
    image: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Men',
    subCategory: 'Topwear',
    sizes: ['S', 'M', 'L', 'XL'],
    bestseller: true
  },
  {
    name: 'Everyday Sneakers',
    description: 'Lightweight sneakers built for all-day comfort.',
    price: 1299,
    image: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Men',
    subCategory: 'Bottomwear',
    sizes: ['M', 'L', 'XL'],
    bestseller: false
  },
  {
    name: 'Floral Summer Dress',
    description: 'Flowy midi dress with a light, airy feel.',
    price: 1499,
    image: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Women',
    subCategory: 'Topwear',
    sizes: ['S', 'M', 'L'],
    bestseller: true
  },
  {
    name: 'Cozy Knit Sweater',
    description: 'Warm knit with a relaxed silhouette.',
    price: 999,
    image: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Women',
    subCategory: 'Winterwear',
    sizes: ['S', 'M', 'L', 'XL'],
    bestseller: false
  },
  {
    name: 'Kids Hoodie',
    description: 'Soft fleece hoodie for daily play.',
    price: 699,
    image: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Kids',
    subCategory: 'Winterwear',
    sizes: ['S', 'M', 'L'],
    bestseller: true
  },
  {
    name: 'Denim Shorts',
    description: 'Mid-rise denim with a clean finish.',
    price: 799,
    image: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop'
    ],
    category: 'Women',
    subCategory: 'Bottomwear',
    sizes: ['S', 'M', 'L'],
    bestseller: false
  }
]

const seed = async () => {
  try {
    const mongoUrl = process.env.mongodb_URL
    if (!mongoUrl) {
      throw new Error('mongodb_URL is not set in the environment')
    }

    await mongoose.connect(`${mongoUrl}/Ecommerce`)

    await productModel.deleteMany({})
    await productModel.insertMany(products)

    console.log('Seeded products:', products.length)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seed()
