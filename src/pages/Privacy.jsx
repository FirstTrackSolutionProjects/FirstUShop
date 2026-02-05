import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-14 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-14 border border-gray-100">

        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
        
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
        </header>

        {/* Main Sections */}
        <main className="space-y-12 text-gray-700 leading-relaxed">

          {/* Section Template */}
          <section className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy describes how <strong>Your App Name</strong> ("we," "us," or "our") 
              collects, uses, and shares your information when you access or use our website and services. 
              By using our Service, you agree to the practices outlined in this policy.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>We collect different types of information for various purposes to improve your experience.</p>

            <ul className="list-disc list-inside mt-4 space-y-3">
              <li>
                <strong className="text-gray-900">Personal Data:</strong>  
                Includes your name, email address, phone number, and other identifiable information.
              </li>
              <li>
                <strong className="text-gray-900">Usage Data:</strong>  
                Includes IP address, browser details, time spent on pages, device identifiers, and more.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>Your information may be used to:</p>

            <ul className="list-disc list-inside mt-4 space-y-3">
              <li>Provide, operate, and maintain the Service.</li>
              <li>Improve user experience and functionality.</li>
              <li>Contact you with updates or notifications.</li>
              <li>Monitor usage for analytics and performance.</li>
              <li>Prevent fraud and enhance security.</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Information Sharing & Disclosure</h2>
            <p>
              We may share your information with third-party service providers (e.g., hosting, analytics, 
              email services). These providers can use your data only to perform tasks on our behalf.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Security of Your Data</h2>
            <p>
              We take data security seriously. However, no system can guarantee 100% safety. We follow 
              industry best practices but cannot ensure absolute protection.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Your Data Protection Rights</h2>
            <p>You may be entitled to the following rights:</p>

            <ul className="list-disc list-inside mt-4 space-y-3">
              <li>Access, update, or delete your personal data.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Object to the processing of your data.</li>
              <li>Withdraw consent where applicable.</li>
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Privacy;
