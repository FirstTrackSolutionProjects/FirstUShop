import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { products } from "/src/data/products.js";

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
// import EditProfile from './pages/EditProfile'
import AdminDashboard from './pages/AdminDashboard'
import AdminProfile from './pages/AdminProfile'
import About from './pages/About'

import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Cancellation from './pages/Cancellation'
import Blog from './pages/Blog'
import Faq from './pages/Faq'
import Aboutus from './pages/Aboutus'
import Security from './pages/Security'

import Explore from './pages/Explore'
import PromoProducts from './pages/PromoProducts'
import BudgetPage from './pages/BudgetPage'

import CartPage from './pages/CartPage'
import ProductDetails from './pages/ProductDetails'
import Categorypage from './pages/Categorypage'
import Wishlist from './pages/Wishlist'

// Merchant and checkout pages
import Checkout from './pages/Checkout'
import MyOrdersPage from './pages/Merchant/MyOrders'
import MerchantDashboard from './pages/Merchant/Dashboard'
import MerchantProfile from './pages/Merchant/MyProfile'
import MerchantAddresses from './pages/Merchant/MyAddresses'
import TrackOrder from './pages/TrackOrder'
import Watch from './pages/Watch'
import Accessories from './pages/Accessories'
import FootWear from './pages/FootWear'
import Bags from './pages/Bags'
import KidsWear from './pages/KidsWear'
import HomeLiving from './pages/HomeLiving'
import TopWear from './pages/TopWear'
import EthnicWear from './pages/EthnicWear'
import Jewellery from './pages/Jewellery'
import Cosmetics from './pages/Cosmetics' 
import BottomWear from './pages/BottomWear'


function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen pt-20">
        {/* Navbar always visible */}
        <Navbar />

        {/* Landing + Tranding only show on homepage */}
        <Routes>
          
          <Route path="/" element={<Home />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/profile/edit" element={<EditProfile />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/security" element={<Security />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/promo" element={<PromoProducts allProducts={products} />} />
          <Route path="/budget/:max" element={<BudgetPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<React.Suspense fallback={<div>Loading...</div>}><Checkout /></React.Suspense>} />
          <Route path="/my-orders" element={<React.Suspense fallback={<div>Loading...</div>}><MyOrdersPage /></React.Suspense>} />
      
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:slug" element={<Categorypage />} />

          {/* Merchant routes */}
          <Route path="/merchant/dashboard" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantDashboard /></React.Suspense>} />
          <Route path="/merchant/profile" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantProfile /></React.Suspense>} />
          <Route path="/merchant/addresses" element={<React.Suspense fallback={<div>Loading...</div>}><MerchantAddresses /></React.Suspense>} />
          <Route path="/merchant/orders" element={<React.Suspense fallback={<div>Loading...</div>}><MyOrdersPage /></React.Suspense>} />
          <Route path="/track" element={<TrackOrder />} />
        
          <Route path="/foot" element={<FootWear />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/kids-wear" element={<KidsWear />} />
          <Route path="/home-living" element={<HomeLiving />} />
          <Route path="/top" element={<TopWear />} />
          <Route path="/ethnic" element={<EthnicWear />} />
          <Route path="/jewel" element={<Jewellery />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/bottom" element={<BottomWear />} />

          
        </Routes>
     
      </div>
      <Footer />
    </Router>
  )
}

export default App
