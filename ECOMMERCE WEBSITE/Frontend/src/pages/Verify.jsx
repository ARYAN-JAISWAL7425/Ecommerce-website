import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {


    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)

    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    
    const verifyPayment = async () => {
        try {
            
            if (!token || !orderId) {
                return
            }

            const response = await axios.post(backendUrl + '/api/orders/verifyStripe', null, {
                params: {
                    orderId: orderId,
                    success: success,
                },
                headers: {
                    token: token,
                }
            })

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            toast.error('Error verifying payment. Please try again.')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token, orderId, success, backendUrl])

    return (
        <div className='py-10 text-center text-gray-600'>
            Verifying payment...
        </div>
    )
}

export default Verify
