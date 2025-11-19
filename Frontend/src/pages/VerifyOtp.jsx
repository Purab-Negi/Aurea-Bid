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
    <div className="w-full h-screen flex items-center justify-center bg-black bg-opacity-90">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 
        p-8 rounded-xl shadow-lg w-96 flex flex-col gap-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center text-[#DAA520]">
          Reset Password
        </h2>

        <p className="text-gray-300 text-sm text-center -mt-2">
          Create a new password to secure your AureaBid account.
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="border border-white/20 bg-white/10 p-3 rounded-md text-white 
          placeholder-gray-300 focus:outline-none focus:border-[#DAA520]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-[#DAA520] text-black font-semibold p-3 rounded-md 
          hover:bg-[#c8961c] transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p className="text-center text-gray-400 text-xs">
          You will be redirected to login after update.
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
