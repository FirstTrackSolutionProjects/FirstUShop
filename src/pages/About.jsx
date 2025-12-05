import React from 'react';
import {
  FaUsers,
  FaShoppingCart,
  FaUserFriends,
  FaMoneyBill,
  FaLinkedin,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";


const About = () => {
  return (
    <div className="bg-white font-sans">
      
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            About <span className="text-red-500">FirstUShop</span>
          </h1>
          <p className="text-gray-200 text-lg mt-4 max-w-2xl mx-auto">
            Redefining the future of online shopping in India with innovation, trust & world-class service.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Journey</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Launched in <span className="font-semibold text-black">2025</span>, 
            <span className="text-red-600 font-bold"> FirstUShop</span> was created with one mission —
            to make online shopping faster, easier and more reliable for every Indian household.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            From trending fashion to home essentials and premium lifestyle products,
            we bring quality and affordability together in one trusted platform.
            Our focus has always been customer satisfaction, seller growth,
            and innovation-driven digital commerce.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, FirstUShop is expanding across India with a powerful seller community,
            lightning-fast delivery, and a secure shopping ecosystem for millions.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322?w=800"
            alt="Our Story"
            className="rounded-2xl shadow-xl hover:scale-105 transform transition duration-500"
          />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <FaUsers className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-3xl font-bold">10.5k+</h3>
            <p className="text-gray-500 text-sm">Registered Sellers</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <FaShoppingCart className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-3xl font-bold">33k+</h3>
            <p className="text-gray-500 text-sm">Monthly Orders</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <FaUserFriends className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-3xl font-bold">45.5k+</h3>
            <p className="text-gray-500 text-sm">Active Customers</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <FaMoneyBill className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-3xl font-bold">25k+</h3>
            <p className="text-gray-500 text-sm">Annual Sales Volume</p>
          </div>

        </div>
      </div>

      {/* Meet the Team */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Meet Our Leadership Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">

          {/* Member 1 */}
          <div className="group">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-full h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transform transition duration-500"
              alt="CEO"
            />
            <h3 className="text-xl font-semibold mt-3">Arjun Mehta</h3>
            <p className="text-gray-500 text-sm mb-3">Founder & CEO</p>
            <div className="flex justify-center space-x-4 text-gray-500">
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>

          {/* Member 2 */}
          <div className="group">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-full h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transform transition duration-500"
              alt="Director"
            />
            <h3 className="text-xl font-semibold mt-3">Riya Sharma</h3>
            <p className="text-gray-500 text-sm mb-3">Managing Director</p>
            <div className="flex justify-center space-x-4 text-gray-500">
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>

          {/* Member 3 */}
          <div className="group">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              className="w-full h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transform transition duration-500"
              alt="Designer"
            />
            <h3 className="text-xl font-semibold mt-3">Kabir Verma</h3>
            <p className="text-gray-500 text-sm mb-3">Lead Product Designer</p>
            <div className="flex justify-center space-x-4 text-gray-500">
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>

        </div>
      </div>

      
    </div>
  );
};

export default About;
