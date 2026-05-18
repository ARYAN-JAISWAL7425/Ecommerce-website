import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../config'

const List = ({ token }) => {

    const [list, setList] = React.useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list', {
                headers: {
                    token: token
                }
            })
            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Fetch list error:", error)
            toast.error("An error occurred while fetching the product list.")
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/products/remove', { id }, {
                headers: {
                    token: token
                }
            })
            if (response.data.success) {
                toast.success(response.data.message)
                 await fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Remove product error:", error)
            toast.error("An error occurred while removing the product.")
        }
    }


    React.useEffect(() => {
        fetchList()
    }, [])

  return (
    <div className = 'w-full'>
        <>
        <div className = 'grid grid-cols-5 gap-4 mb-4 font-bold text-gray-700'>    
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b>Category</b>
            <b className = 'text-center'>Action</b>
        </div>
        </>

        {list.map((item, index) => (
            <div key = {index} className = 'grid grid-cols-5 gap-4 mb-4 items-center bg-white p-4 rounded-md shadow-md'>
                <img src = {item.image?.[0] || ''} alt = {item.name} className = 'w-16 h-16 object-cover rounded-md' />
                <span>{item.name}</span>
                <span>{currency}{item.price.toFixed(2)}</span>
                <span>{item.category}</span>
              
                <div className = 'text-center'>
                    <button className = 'bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors' onClick = {() => removeProduct(item._id)}>
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default List
