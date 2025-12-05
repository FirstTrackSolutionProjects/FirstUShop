import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen font-sans"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508779018996-1957a94ca61e?auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4 bg-black/40">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-6">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Log in to continue</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">

            {/* Email / Phone */}
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xl">📧</span>
              <input
                type="text"
                required
                placeholder="Email or Phone"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg 
                text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-indigo-500 focus:border-transparent transition duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xl">🔒</span>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg 
                text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 
                focus:ring-indigo-500 focus:border-transparent transition duration-300"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 
              shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="border-b border-gray-300 w-full"></div>
            <p className="px-4 text-sm text-gray-500">OR</p>
            <div className="border-b border-gray-300 w-full"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg 
            border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 
            transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <FcGoogle className="text-2xl mr-3" />
            Log in with Google
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition"
              >
                Create one
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
