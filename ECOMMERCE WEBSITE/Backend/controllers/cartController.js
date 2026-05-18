import userModel from "../models/userModel.js";

// add product to user cart


const addToCart = async (req, res) => {
    try {
        const {userId,itemId,size} = req.body;
        
        const userData = await userModel.findById(userId);
        let cartData =  await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData: cartData}, {new: true});
        res.status(200).json({success: true, message: 'Item added to cart successfully', cartData: cartData});


   
    } catch (error) {
        res.status(500).json({success: false, message: 'Error adding item to cart', error: error.message});
    }
}

// Update user cart

const updateUserCart = async (req, res) => {

    try {

        const {userId, itemId, size, quantity} = req.body;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (quantity <= 0) {
            if (cartData[itemId]) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, {cartData: cartData}, {new: true});
        res.status(200).json({success: true, message: 'Cart updated successfully', cartData: cartData});

    } catch (error) {
        res.status(500).json({success: false, message: 'Error updating cart', error: error.message});
    }

}




// get user cart

const getUserCart = async (req, res) => {

    try {

        const {userId} = req.body;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.status(200).json({success: true, message: 'Cart retrieved successfully', cartData: cartData});

    } catch (error) {
        res.status(500).json({success: false, message: 'Error retrieving cart', error: error.message});
    }
}

export { addToCart, updateUserCart, getUserCart };
