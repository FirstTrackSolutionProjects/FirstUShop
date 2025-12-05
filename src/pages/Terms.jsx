import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen">
      <div className="container mx-auto px-5 py-20 max-w-4xl">

        {/* Page Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Please read these Terms & Conditions carefully before using our website.  
            By accessing or making a purchase, you agree to comply with these terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10">

          {/* 1. General Conditions */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. General Conditions
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Account Responsibility:</strong> You are responsible for maintaining  
              the confidentiality of your login credentials and all activities under your account.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Information Accuracy:</strong> We strive for accuracy in product  
              descriptions, pricing, and availability but do not guarantee error-free content.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Product Availability:</strong> All products are subject to stock  
              availability and may be discontinued without prior notice.
            </p>
          </section>

          {/* 2. Purchases & Payments */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Purchases & Payments
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Order Acceptance:</strong> An order confirmation email does not  
              guarantee acceptance. We reserve the right to cancel or refuse an order.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Pricing:</strong> Prices may change without notice and do not  
              include taxes or shipping charges unless specified.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Payment Authorization:</strong> By placing an order, you authorize  
              us to charge your preferred payment method for the full amount.
            </p>
          </section>

          {/* 3. Shipping & Returns */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Shipping & Returns
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Shipping:</strong> Delivery times vary by location. We are not liable  
              for delays caused by logistics partners or unforeseen circumstances.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Returns:</strong> All returns and exchanges are governed by our  
              Return Policy. Products must meet return eligibility criteria.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All text, media, graphics, logos, and design elements on this website  
              are protected under applicable intellectual property laws. Unauthorized  
              reproduction or distribution is strictly prohibited.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We are not liable for indirect, incidental, or consequential damages  
              arising from your use of our website or purchased products.
            </p>
          </section>

          {/* 6. Governing Law */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by the laws of your state/country.  
              Any disputes will be handled exclusively in local courts.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to revise these Terms at any time. Updates  
              will be posted on this page with immediate effect.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;
