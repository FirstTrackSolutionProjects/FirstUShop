import React from 'react';
import { XCircle, RefreshCcw, ArrowLeftRight, PackageOpen, Clock, Info } from "lucide-react";
import { Link } from 'react-router-dom';

const Cancellation = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <RefreshCcw size={55} className="mx-auto text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Clear, simple, and transparent process for cancellations and refunds.
          </p>
        </div>

        {/* Cancellation Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <XCircle className="text-red-500" /> Cancellation Policy
          </h2>

          <div className="space-y-6">

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">When can I cancel my order?</h3>
              <p className="text-gray-600 mt-2">
                You can cancel anytime before the item is shipped.  
                Once shipped, the order cannot be cancelled.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">How to cancel an order?</h3>
              <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                <li>Go to <strong>My Orders</strong></li>
                <li>Select the order</li>
                <li>Click on <strong>Cancel Order</strong></li>
                <li>Select a reason</li>
                <li>Confirm cancellation</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">Automatic Cancellation</h3>
              <p className="text-gray-600 mt-2">
                Orders may auto-cancel if payment is incomplete or the item becomes unavailable.
              </p>
            </div>

          </div>
        </div>

        {/* Refund Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <ArrowLeftRight className="text-green-600" /> Refund Policy
          </h2>

          <div className="space-y-6">

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">Refund Timeline</h3>
              <p className="text-gray-600 mt-2">
                Refunds are processed within <strong>7–10 business days</strong> after approval.  
                UPI refunds may take <strong>3–5 business days</strong>.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">Refund Methods</h3>
              <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                <li><strong>Credit/Debit Card:</strong> 7–10 days</li>
                <li><strong>Net Banking:</strong> 7–10 days</li>
                <li><strong>UPI:</strong> 3–5 days</li>
                <li><strong>Wallet:</strong> 24–48 hours</li>
                <li><strong>Pay Later:</strong> Instant reversal</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-700">Eligibility for Return & Refund</h3>
              <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                <li>Product must be unused with original tags</li>
                <li>Return request within 10 days of delivery</li>
                <li>Original packaging must be intact</li>
                <li>Free gifts must be returned</li>
                <li>Non-returnable: innerwear, cosmetics, personalized items</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Return Process Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <PackageOpen className="text-purple-600" /> Return Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-700">Request Return</h3>
              <p className="text-sm text-gray-600 mt-1">From My Orders</p>
            </div>

            <div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-700">Pickup Scheduled</h3>
              <p className="text-sm text-gray-600 mt-1">Usually within 24 hours</p>
            </div>

            <div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-700">Quality Check</h3>
              <p className="text-sm text-gray-600 mt-1">At our facility</p>
            </div>

            <div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-gray-700">Refund Initiated</h3>
              <p className="text-sm text-gray-600 mt-1">After verification</p>
            </div>

          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-8 mb-10">
          <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <Info className="text-yellow-700" /> Important Notes
          </h3>
          <ul className="text-yellow-700 list-disc list-inside space-y-2">
            <li>Refund timelines vary based on banks.</li>
            <li>Shipping charges are non-refundable unless it was our error.</li>
            <li>COD refunds are issued via NEFT to your bank account.</li>
            <li>Keep product in original condition until pickup.</li>
            <li>Contact support if refund delays exceed 10 days.</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-2">Need Help?</h3>
          <p className="text-blue-700 mb-4">
            Our support team is available 24/7 for any cancellation or refund queries.
          </p>
          <Link
            to="/contact"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
