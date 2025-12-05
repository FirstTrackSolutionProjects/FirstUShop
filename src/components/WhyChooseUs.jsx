// WhyChooseUs.jsx
import React from 'react';
import { FaShippingFast, FaHeadset, FaMoneyBillWave } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShippingFast size={48} className="text-blue-600" />,
      title: 'Free & Fast Delivery',
      description: 'Orders over $140 ship free, arriving at your door quickly and reliably.',
      style: 'from-blue-500 to-cyan-400 shadow-blue-500/20',
    },
    {
      icon: <FaHeadset size={48} className="text-green-600" />,
      title: '24/7 Customer Support',
      description: 'Our expert team is always available to help with any questions or concerns.',
      style: 'from-green-500 to-teal-400 shadow-green-500/20',
    },
    {
      icon: <FaMoneyBillWave size={48} className="text-purple-600" />,
      title: 'Money-Back Guarantee',
      description: 'Not satisfied? We offer a hassle-free 30-day money-back guarantee.',
      style: 'from-purple-500 to-indigo-500 shadow-purple-500/20',
    },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-base font-semibold text-[#A3B763] tracking-wider uppercase">Our Commitment to You</h2>
          <p className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-red-900">Why Shop With Us?</p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            We provide more than just products. Enjoy a seamless, supportive, and secure shopping experience from start to finish.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="group h-96 w-full [perspective:1000px]">
              <div className={`relative h-full w-full rounded-2xl shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${feature.style}`}>

                {/* Front Side */}
                <div className="absolute inset-0 rounded-2xl bg-white p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                  <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-slate-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center">{feature.title}</h3>
                </div>

                {/* Back Side */}
                <div className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br p-8 flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] ${feature.style}`}>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed text-center mb-6">{feature.description}</p>
                  <a href="#" className="px-6 py-2 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors duration-300">
                    Learn More
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
