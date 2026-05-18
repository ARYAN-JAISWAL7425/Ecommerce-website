import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';


// fucntions for add product

const addProduct = async (req, res) => {

    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);

        let imageUrls = await Promise.all(

            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});

                return result.secure_url;
            })
        );

        const productData = new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestSeller === 'true' || bestSeller === true,
            image: imageUrls,
            date: Date.now()
        });

        await productData.save();

        res.json({ success: true, message: 'Product added successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// functions for list products

const listProducts = async (req, res) => {  

    try {
        const products = await productModel.find().sort({ date: -1 });
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }

}

// functions for remove product
const removeProduct = async (req, res) => {
    try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
    
}

// function for single product details

const singleProductDetails = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }

}

export { addProduct, listProducts, removeProduct, singleProductDetails };
