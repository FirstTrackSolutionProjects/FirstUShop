import React, { useState } from "react";
import { FiHelpCircle, FiChevronDown } from "react-icons/fi";
import { FaQuestionCircle, FaRegLightbulb } from "react-icons/fa";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Can I reactivate my inactive FirstUShop Shopping account?",
      answer:
        "Yes, you can usually reactivate your inactive FirstUShop Shopping account by simply logging in with your registered email or mobile number. If you encounter issues, contact customer support.",
    },
    {
      question: "Do I need to verify my mobile number or email address every time?",
      answer:
        "No, verification is required only during sign-up or when logging in from a new device for security reasons.",
    },
    {
      question: "What is an OTP or verification code?",
      answer:
        "OTP stands for One-Time Password. It’s a temporary secure code sent to verify your identity.",
    },
    {
      question:
        "Why do I need to verify my mobile number or email to log into my account?",
      answer:
        "Verification ensures your account belongs to you and helps prevent unauthorized access.",
    },
    {
      question: "Can I use an international number to sign up?",
      answer:
        "Yes, international numbers are supported as long as you can receive SMS or calls for verification.",
    },
    {
      question: "How can I log in using my mobile number?",
      answer:
        "Open the app → Enter your registered number → Receive OTP → Enter OTP → Login completed.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-xl mb-5">
            <FiHelpCircle size={42} className="text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get quick answers about your FirstUShop Shopping account.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden divide-y">
          {faqData.map((faq, index) => (
            <div key={index} className="transition-all duration-300">
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-indigo-600 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>

                <FiChevronDown
                  className={`text-gray-500 text-2xl transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 flex gap-3 items-start">
                  <FaRegLightbulb className="text-green-600 text-xl mt-1" />
                  <p className="text-gray-700 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
