import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
import Razorpay from 'razorpay'

const currency = 'inr'
const deliveryCharges = 10

const stripe = new Stripe(process.env.Stripe_secret_key)

const razorpayInstance = new Razorpay({
    key_id: process.env.Razorpay_key_id,
    key_secret: process.env.Razorpay_key_secret
})

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId: userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true })
        res.status(200).json({ success: true, message: 'Order placed successfully', orderId: newOrder._id })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error placing order', error: error.message })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const origin = req.headers.origin || ''

        const orderData = {
            userId: userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: line_items,
        })

        res.status(200).json({ success: true, message: 'Checkout session created successfully', session_url: session.url })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating checkout session', error: error.message })
    }
}

const verifyStripe = async (req, res) => {
    const { orderId, success } = req.query
    const { userId } = req.body

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true })
            res.status(200).json({ success: true, message: 'Payment successful and order placed successfully' })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(200).json({ success: false, message: 'Payment failed and order cancelled' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error verifying payment', error: error.message })
    }
}

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId: userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }
        await razorpayInstance.orders.create(options, async (err, order) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error creating Razorpay order', error: err.message })
            } else {
                res.status(200).json({ success: true, message: 'Razorpay order created successfully', order: order })
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error placing order', error: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true }, { new: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true })
            res.status(200).json({ success: true, message: 'Payment successful and order placed successfully' })
        } else {
            await orderModel.findByIdAndDelete(orderInfo.receipt)
            res.status(200).json({ success: false, message: 'Payment failed and order cancelled' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error verifying Razorpay payment', error: error.message })
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ date: -1 })
        res.status(200).json({ success: true, message: 'Orders fetched successfully', orders: orders })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message })
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId: userId }).sort({ date: -1 })
        res.status(200).json({ success: true, message: 'Orders fetched successfully', orders: orders })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status: status }, { new: true })
        res.status(200).json({ success: true, message: 'Order updated successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating order', error: error.message })
    }
}

export { placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrder, verifyStripe, verifyRazorpay, placeOrder }
