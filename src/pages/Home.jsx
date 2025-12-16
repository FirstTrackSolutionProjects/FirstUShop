import React from 'react'

import HeroShowcase from '../components/HeroShowcase'
import Trending from '../components/Trending'
import BestSelling from '../components/BestSelling'
// import NewArrival from '../components/NewArrival'
import Testimonials from '../components/Testimonials'
import WhyChooseUs from '../components/WhyChooseUs'
import TrendCollection from '../components/TrendCollection'



const Home = () => {
  return (
    <>
                <HeroShowcase />
                <Trending />
                <TrendCollection/>
                <BestSelling/>
                {/* <NewArrival/> */}
                <Testimonials/>
                <WhyChooseUs/>
              </>
  )
}

export default Home