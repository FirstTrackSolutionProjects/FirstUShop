import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
      <div className="min-h-screen bg-gray-100    flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-600">Join us today</p>
      </div>

      <form className="space-y-5">
        <input
        type="text"
        placeholder="Full Name"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <div className="flex items-center gap-2 w-full">
          <span className="py-3 px-4 bg-gray-200 border rounded-lg text-gray-700">
            +91
          </span>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <input
        type="email"
        placeholder="Email"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
        type="create password"
        placeholder="Create Password"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input 
        type="confirm password"
        placeholder="Confirm Password"
        className="w-full py-3 px-4 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />



        <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
        Register
        </button>
      </form>
        <p className="text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link
        to="/login"
        className="font-semibold text-indigo-600 hover:text-indigo-800"
        >
        Log in
        </Link>
      </p>
    </div>
  </div>
  );
};


export default Register;