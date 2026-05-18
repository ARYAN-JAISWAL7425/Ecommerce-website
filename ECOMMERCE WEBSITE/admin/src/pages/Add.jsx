import React from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const Add = ({token}) => {

    const [image1, setImage1] = React.useState(false);
    const [image2, setImage2] = React.useState(false);
    const [image3, setImage3] = React.useState(false);
    const [image4, setImage4] = React.useState(false);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [subcategory, setSubcategory] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [sizes, setSizes] = React.useState([]);
    const [bestSeller, setBestSeller] = React.useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
            // Create a FormData object to hold the form data
            const formData = new FormData();
            // Append images to the FormData object
           image1 && formData.append('image1', image1);
           image2 && formData.append('image2', image2);
           image3 && formData.append('image3', image3);
           image4 && formData.append('image4', image4);
            // Append other form fields to the FormData object
            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('subCategory', subcategory);
            formData.append('price', price);
            formData.append('sizes', JSON.stringify(sizes));
            formData.append('bestSeller', bestSeller);

            // Send the form data to the backend API
            const response = await axios.post(backendUrl + '/api/products/add', formData, {
                headers: {
                    token: token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                // Handle success case, e.g., show a success message or redirect
                toast.success(response.data.message);
                
                setName("");
                setDescription("");
                setCategory("");
                setSubcategory("");
                setPrice("");
                setSizes([]);
                setBestSeller(false);
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
            } else {
                // Handle error case, e.g., show an error message
                toast.error(response.data.message);
               
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };

  return (
    <form className = "p-4 flex flex-col gap-4" onSubmit = {onSubmitHandler}>
      <div>
        <p className="font-semibold"> Upload Image</p>
      </div>
      <div className = "flex flex-wrap gap-4">
        <label htmlFor = "image1">
          <img src = {!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt = "upload" className = "w-[200px] h-[200px] object-cover cursor-pointer" />
          <input type = "file" id = "image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
        </label>

        <label htmlFor = "image2">
          <img src = {!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt = "upload" className = "w-[200px] h-[200px] object-cover cursor-pointer" />
          <input type = "file" id = "image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
        </label>

        <label htmlFor = "image3">
          <img src = {!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt = "upload" className = "w-[200px] h-[200px] object-cover cursor-pointer" />
          <input type = "file" id = "image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
        </label>

        <label htmlFor = "image4">
          <img src = {!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt = "upload" className = "w-[200px] h-[200px] object-cover cursor-pointer" />
          <input type = "file" id = "image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
        </label>
      </div>

      <div>
        <p className="font-semibold"> Product Name</p>
        <input type = "text" placeholder='Enter product name' className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500 w-full" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <p className="font-semibold"> Product Description</p>
        <textarea placeholder='Enter product description' className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500 w-full" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

        <div>
        <p className="font-semibold"> Product Category</p>
        <select className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
        </select>
        </div>

          <div>
        <p className="font-semibold"> Sub Category</p>
        <select className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500 w-full" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
            <option value="">Select</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
        </select>
        </div>
        <div>
        <p className="font-semibold"> Price</p>
        <input type = "Number" placeholder='Enter product price' className = "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500 w-full" value={price} onChange={(e) => setPrice(e.target.value)} />

      </div>
      <div className = "flex items-center gap-4">
        <p>Product Sizes</p>
        <div className = "flex items-center gap-4" onClick = {() => {
            if (sizes.includes("S")) {
                setSizes(sizes.filter(size => size !== "S"))
            } else {
                setSizes([...sizes, "S"])
            }
        }}>
            <p className = {`${sizes.includes("S") ? "bg-ink text-white px-3 py-1 rounded-md" : "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500"}`}>S</p>
        </div>

        <div className = "flex items-center gap-4" onClick = {() => {
            if (sizes.includes("M")) {
                setSizes(sizes.filter(size => size !== "M"))
            } else {
                setSizes([...sizes, "M"])
            }
        }}>
            <p className = {`${sizes.includes("M") ? "bg-ink text-white px-3 py-1 rounded-md" : "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500"}`}>M</p>
        </div>

        <div className = "flex items-center gap-4" onClick = {() => {
            if (sizes.includes("L")) {
                setSizes(sizes.filter(size => size !== "L"))
            } else {
                setSizes([...sizes, "L"])
            }
        }}>
            <p className = {`${sizes.includes("L") ? "bg-ink text-white px-3 py-1 rounded-md" : "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500"}`}>L</p>
        </div>

        <div className = "flex items-center gap-4" onClick = {() => {
            if (sizes.includes("XL")) {
                setSizes(sizes.filter(size => size !== "XL"))
            } else {
                setSizes([...sizes, "XL"])
            }
        }}>
            <p className = {`${sizes.includes("XL") ? "bg-ink text-white px-3 py-1 rounded-md" : "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500"}`}>XL</p>
        </div>

        <div className = "flex items-center gap-4" onClick = {() => {
            if (sizes.includes("XXL")) {
                setSizes(sizes.filter(size => size !== "XXL"))
            } else {
                setSizes([...sizes, "XXL"])
            }
        }}>
            <p className = {`${sizes.includes("XXL") ? "bg-ink text-white px-3 py-1 rounded-md" : "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-500"}`}>XXL</p>
        </div>

        <div className = "flex items-center gap-4">
            <input id = "bestSeller" onChange = {(e) => setBestSeller(e.target.checked)} type = "checkbox" className = "w-4 h-4" checked={bestSeller} />
            <label htmlFor = "bestSeller" className = "text-gray-700 cursor-pointer">Add to BestSellers</label>
        </div>

        <button type='submit' className = "bg-ink text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors">Add</button>
      </div>

    </form>
  )
}

export default Add
