import React from 'react';
import { ShieldCheck, CreditCard, Globe, Lock, PhoneCall } from 'lucide-react';

const Security = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <ShieldCheck className="mx-auto text-green-600" size={60} />
          <h1 className="text-4xl font-bold text-gray-800 mt-4">Safe & Secure Shopping</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Your trust and safety are our highest priority.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-10 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-3 mb-4">
            <Lock className="text-green-600" /> Is online payment secure on FirstUShop Shopping?
          </h2>
          <p className="text-green-600 font-medium text-lg">
            Yes, all online payments on FirstUShop Shopping are 100% secure and protected with advanced encryption.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <CreditCard className="text-blue-500" /> Do you store card information?
            </h3>
            <p className="text-gray-600">
              No. We only store the last 4 digits of your card for easy identification.  
              All sensitive card details are processed securely by certified payment gateways.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <CreditCard className="text-purple-500" /> Accepted Cards
            </h3>
            <p className="text-gray-600">
              We accept VISA, MasterCard, Maestro, Rupay, American Express, Diner's Club, and Discover.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <Globe className="text-orange-500" /> International Cards
            </h3>
            <p className="text-gray-600">
              International cards from India, USA, UK, Canada, Australia, Europe, Singapore, and more are accepted.
            </p>
            <p className="text-gray-600 italic mt-1">
              International cards cannot be used for e-gift voucher top-ups.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <ShieldCheck className="text-green-600" /> Other Payment Options
            </h3>
            <p className="text-gray-600">
              Internet Banking, UPI, Wallets, Cash on Delivery, EMI, Pay Later, e-Gift Vouchers & more.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <Lock className="text-indigo-500" /> Privacy Protection
            </h3>
            <p className="text-gray-600">
              We never share your personal or payment information with third parties.  
              For details, please check our Privacy Policy.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <PhoneCall className="text-red-500" /> Need Help?
            </h3>
            <p className="text-gray-600">
              If you have any questions related to security, payment, or privacy,  
              our support team is available 24×7 to assist you.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Security;
