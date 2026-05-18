import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/Placeorder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
