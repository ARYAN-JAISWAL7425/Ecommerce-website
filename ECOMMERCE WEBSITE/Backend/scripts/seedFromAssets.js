import 'dotenv/config'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import { fileURLToPath } from 'url'
import productModel from '../models/productModel.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(__dirname, '../../Frontend/src/assets')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const products = [
  { name: 'Women Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 100, images: ['p_img1.png'], category: 'Women', subCategory: 'Topwear', sizes: ['S', 'M', 'L'], bestseller: true },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 200, images: ['p_img2_1.png', 'p_img2_2.png', 'p_img2_3.png', 'p_img2_4.png'], category: 'Men', subCategory: 'Topwear', sizes: ['M', 'L', 'XL'], bestseller: true },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 220, images: ['p_img3.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'L', 'XL'], bestseller: true },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 110, images: ['p_img4.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'XXL'], bestseller: true },
  { name: 'Women Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 130, images: ['p_img5.png'], category: 'Women', subCategory: 'Topwear', sizes: ['M', 'L', 'XL'], bestseller: true },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 140, images: ['p_img6.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'L', 'XL'], bestseller: true },
  { name: 'Men Tapered Fit Flat-Front Trousers', description: 'Slim tapered fit with a flat-front finish, comfortable for daily wear.', price: 190, images: ['p_img7.png'], category: 'Men', subCategory: 'Bottomwear', sizes: ['S', 'L', 'XL'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 140, images: ['p_img8.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 100, images: ['p_img9.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['M', 'L', 'XL'], bestseller: false },
  { name: 'Men Tapered Fit Flat-Front Trousers', description: 'Slim tapered fit with a flat-front finish, comfortable for daily wear.', price: 110, images: ['p_img10.png'], category: 'Men', subCategory: 'Bottomwear', sizes: ['S', 'L', 'XL'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 120, images: ['p_img11.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 150, images: ['p_img12.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 130, images: ['p_img13.png'], category: 'Women', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Boy Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 160, images: ['p_img14.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Tapered Fit Flat-Front Trousers', description: 'Slim tapered fit with a flat-front finish, comfortable for daily wear.', price: 140, images: ['p_img15.png'], category: 'Men', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 170, images: ['p_img16.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Tapered Fit Flat-Front Trousers', description: 'Slim tapered fit with a flat-front finish, comfortable for daily wear.', price: 150, images: ['p_img17.png'], category: 'Men', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Boy Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 180, images: ['p_img18.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Boy Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 160, images: ['p_img19.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Palazzo Pants with Waist Belt', description: 'Flowy palazzo pants paired with a matching waist belt for a polished look.', price: 190, images: ['p_img20.png'], category: 'Women', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Zip-Front Relaxed Fit Jacket', description: 'Cozy zip-front jacket with a relaxed silhouette, perfect for layering.', price: 170, images: ['p_img21.png'], category: 'Women', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Palazzo Pants with Waist Belt', description: 'Flowy palazzo pants paired with a matching waist belt for a polished look.', price: 200, images: ['p_img22.png'], category: 'Women', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Boy Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 180, images: ['p_img23.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Boy Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 210, images: ['p_img24.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 190, images: ['p_img25.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Zip-Front Relaxed Fit Jacket', description: 'Cozy zip-front jacket with a relaxed silhouette, perfect for layering.', price: 220, images: ['p_img26.png'], category: 'Women', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 200, images: ['p_img27.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Slim Fit Relaxed Denim Jacket', description: 'Slim fit denim jacket with a relaxed feel — a layering staple.', price: 230, images: ['p_img28.png'], category: 'Men', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 210, images: ['p_img29.png'], category: 'Women', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 240, images: ['p_img30.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 220, images: ['p_img31.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 250, images: ['p_img32.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Girls Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 230, images: ['p_img33.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 260, images: ['p_img34.png'], category: 'Women', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Zip-Front Relaxed Fit Jacket', description: 'Cozy zip-front jacket with a relaxed silhouette, perfect for layering.', price: 240, images: ['p_img35.png'], category: 'Women', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Zip-Front Relaxed Fit Jacket', description: 'Cozy zip-front jacket with a relaxed silhouette, perfect for layering.', price: 270, images: ['p_img36.png'], category: 'Women', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Round Neck Cotton Top', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 250, images: ['p_img37.png'], category: 'Women', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 280, images: ['p_img38.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Printed Plain Cotton Shirt', description: 'Printed plain cotton shirt with a clean cut and comfortable fit.', price: 260, images: ['p_img39.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Slim Fit Relaxed Denim Jacket', description: 'Slim fit denim jacket with a relaxed feel — a layering staple.', price: 290, images: ['p_img40.png'], category: 'Men', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 270, images: ['p_img41.png'], category: 'Men', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Boy Round Neck Pure Cotton T-shirt', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.', price: 300, images: ['p_img42.png'], category: 'Kids', subCategory: 'Topwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Kid Tapered Slim Fit Trouser', description: 'Tapered slim fit trousers for kids, comfortable for everyday wear.', price: 280, images: ['p_img43.png'], category: 'Kids', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Zip-Front Relaxed Fit Jacket', description: 'Cozy zip-front jacket with a relaxed silhouette, perfect for layering.', price: 310, images: ['p_img44.png'], category: 'Women', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Slim Fit Relaxed Denim Jacket', description: 'Slim fit denim jacket with a relaxed feel — a layering staple.', price: 290, images: ['p_img45.png'], category: 'Men', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Slim Fit Relaxed Denim Jacket', description: 'Slim fit denim jacket with a relaxed feel — a layering staple.', price: 320, images: ['p_img46.png'], category: 'Men', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Kid Tapered Slim Fit Trouser', description: 'Tapered slim fit trousers for kids, comfortable for everyday wear.', price: 300, images: ['p_img47.png'], category: 'Kids', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Slim Fit Relaxed Denim Jacket', description: 'Slim fit denim jacket with a relaxed feel — a layering staple.', price: 330, images: ['p_img48.png'], category: 'Men', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Kid Tapered Slim Fit Trouser', description: 'Tapered slim fit trousers for kids, comfortable for everyday wear.', price: 310, images: ['p_img49.png'], category: 'Kids', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Kid Tapered Slim Fit Trouser', description: 'Tapered slim fit trousers for kids, comfortable for everyday wear.', price: 340, images: ['p_img50.png'], category: 'Kids', subCategory: 'Bottomwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Women Zip-Front Relaxed Fit Jacket', description: 'Cozy zip-front jacket with a relaxed silhouette, perfect for layering.', price: 320, images: ['p_img51.png'], category: 'Women', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
  { name: 'Men Slim Fit Relaxed Denim Jacket', description: 'Slim fit denim jacket with a relaxed feel — a layering staple.', price: 350, images: ['p_img52.png'], category: 'Men', subCategory: 'Winterwear', sizes: ['S', 'M', 'L', 'XL'], bestseller: false },
]

const uploadCache = new Map()
const uploadOne = async (fileName) => {
  if (uploadCache.has(fileName)) return uploadCache.get(fileName)
  const filePath = path.join(assetsDir, fileName)
  const result = await cloudinary.uploader.upload(filePath, { resource_type: 'image', folder: 'ecommerce/products' })
  uploadCache.set(fileName, result.secure_url)
  return result.secure_url
}

const run = async () => {
  const mongoUrl = process.env.mongodb_URL
  if (!mongoUrl) throw new Error('mongodb_URL is not set in the environment')
  await mongoose.connect(`${mongoUrl}/Ecommerce`)
  console.log('MongoDB connected')

  await productModel.deleteMany({})
  console.log('Cleared existing products')

  const docs = []
  let i = 0
  for (const p of products) {
    i++
    const urls = []
    for (const img of p.images) {
      const url = await uploadOne(img)
      urls.push(url)
    }
    docs.push({
      name: p.name,
      description: p.description,
      price: p.price,
      image: urls,
      category: p.category,
      subCategory: p.subCategory,
      sizes: p.sizes,
      bestseller: p.bestseller,
      date: Date.now(),
    })
    console.log(`[${i}/${products.length}] uploaded ${p.images.length} image(s) for "${p.name}"`)
  }

  const inserted = await productModel.insertMany(docs)
  console.log(`Inserted ${inserted.length} products into MongoDB`)
}

run()
  .catch((e) => { console.error('Seed failed:', e.message); process.exitCode = 1 })
  .finally(async () => { await mongoose.disconnect() })
