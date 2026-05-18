import React from 'react'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero />
      <Latest />
      <BestSeller />
      <OurPolicy  />
      <Newsletter />
    </div>
  )
}

export default Home
