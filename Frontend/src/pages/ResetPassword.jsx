import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { emailForReset, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(emailForReset, password));
    navigate("/login");
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#12021E] via-[#1A022E] to-[#28023F] relative"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 
          shadow-xl rounded-xl p-8 w-[90%] max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-white tracking-wide">
          Reset Password
        </h2>

        <p className="text-gray-300 text-sm text-center">
          Enter your new secure password to continue.
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 
                     border border-white/30 focus:outline-none focus:border-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="mt-2 bg-gradient-to-r from-[#8A2BE2] to-[#D19AFF] 
          text-white py-3 rounded-lg font-semibold tracking-wide
          hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          You will be redirected to login after successful update.
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
