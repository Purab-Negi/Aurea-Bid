import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0d0d] px-4">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-300 text-sm">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            disabled={loading}
            className={`mt-2 w-full p-3 rounded-md text-black font-semibold transition-all 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 hover:shadow-xl"
              }
            `}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          We’ll send a verification OTP to your email.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
