import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const [category,setCategory] = useState([]);

  const [subcategory,setSubcategory] = useState([]);

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(category.filter((item) => item !== e.target.value));
    }else{
      setCategory([...category, e.target.value]);
    }
  }

  const toggleSubcategory = (e) => {
    if(subcategory.includes(e.target.value)){
      setSubcategory(subcategory.filter((item) => item !== e.target.value));
    }else{
      setSubcategory([...subcategory, e.target.value]);
    }
  }
  const applyFilters = () => {
    let productsCopy = products.slice();

    if( showSearch && search){
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if(subcategory.length > 0){
      productsCopy = productsCopy.filter((item) => subcategory.includes(item.subCategory));
    }

    setFilteredProducts(productsCopy);
  }

  const sortProducts = (e) => {
    let filteredCopy = filteredProducts.slice();

    if(e.target.value === 'priceLowHigh'){
      filteredCopy.sort((a,b) => a.price - b.price);
    }else if(e.target.value === 'priceHighLow'){
      filteredCopy.sort((a,b) => b.price - a.price);
    }else{
      filteredCopy.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filteredCopy);
  }

  
  useEffect(() => {  
    applyFilters();
  }, [category, subcategory, search, showSearch, products]);

  


  return (
    <div className='flex flex-col md:flex-row gap-10 py-10 items-start'>

      {/* Filter Options */}

      <aside className='w-full md:w-60 shrink-0'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center gap-2 font-medium text-muted cursor-pointer md:cursor-default'>
          <span className="w-8 h-px bg-accent"></span>
          Filter
          <img className={'h-3 md:hidden ' + (showFilter ? 'rotate-180' : '') + ' transition-transform'} src={assets.dropdownIcon} alt="toggle" />
        </p>
        {/* Category filter */}
        <div className={'border border-gray-200 bg-white rounded-md p-4 mb-4 ' + (showFilter ? 'block' : 'hidden md:block')}>
          <p className='text-ink font-medium mb-3 text-sm uppercase tracking-wider'>Category</p>
          <div className='flex flex-col gap-2 text-sm text-muted'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-4 h-4 accent-accent' type="checkbox" value="Men" onChange={toggleCategory} />Men
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-4 h-4 accent-accent' type="checkbox" value="Women" onChange={toggleCategory} />Women
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-4 h-4 accent-accent' type="checkbox" value="Kids" onChange={toggleCategory} />Kids
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={'border border-gray-200 bg-white rounded-md p-4 mb-4 ' + (showFilter ? 'block' : 'hidden md:block')}>
          <p className='text-ink font-medium mb-3 text-sm uppercase tracking-wider'>Type</p>
          <div className='flex flex-col gap-2 text-sm text-muted'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-4 h-4 accent-accent' type="checkbox" value="Topwear" onChange={toggleSubcategory} />Topwear
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-4 h-4 accent-accent' type="checkbox" value="Bottomwear" onChange={toggleSubcategory} />Bottomwear
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input className='w-4 h-4 accent-accent' type="checkbox" value="Winterwear" onChange={toggleSubcategory} />Winterwear
            </label>
          </div>
        </div>
      </aside>

      {/*Right side */}

      <div className='flex-1 w-full'>

        <div className='flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6'>
            <Title text1={"Our"} text2={"Collection"} />
            {/* Sorting options */}
            <select onChange={sortProducts} className='border border-gray-300 bg-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent w-fit'>
              <option value="newest">Newest</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
        </div>

        {/* Map Products */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredProducts.map((item, index) => (
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

export default Collection
