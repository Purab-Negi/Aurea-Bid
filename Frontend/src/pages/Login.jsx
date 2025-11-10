import { loginRequest } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    dispatch(loginRequest(formData));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E0E0E] via-[#1a1a1a] to-[#111] px-4 py-12">
      <div className="w-full max-w-md bg-[#1A1A1A]/90 shadow-lg backdrop-blur-md rounded-2xl px-8 py-10 border border-[#F4B400]/30 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4B400]/10 via-transparent to-[#d6482b]/10 rounded-2xl pointer-events-none"></div>
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 relative z-10">
          Welcome Back to{" "}
          <span className="text-[#F4B400] drop-shadow-md">AureaBid</span>
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 w-full relative z-10"
        >
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <div className="text-right text-sm text-gray-400">
            <Link
              to="/forgot-password"
              className="hover:text-[#F4B400] transition-all duration-300"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#F4B400] text-black font-semibold py-3 rounded-md hover:bg-black hover:text-white cursor-pointer transition-all shadow-md shadow-[#F4B400]/20"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-[#F4B400]/20"></div>
            <p className="mx-3 text-sm text-gray-400">or</p>
            <div className="flex-1 h-px bg-[#F4B400]/20"></div>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#F4B400] hover:text-gray-400 font-medium transition-all"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

const Input = ({ label, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-300 mb-1">{label}</label>
    <div className="flex items-center bg-[#111] border border-gray-700 px-3 py-2 rounded-md focus-within:border-[#F4B400] transition-all">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent flex-1 text-white placeholder-gray-400 focus:outline-none"
        placeholder={`Enter your ${label}`}
      />
    </div>
  </div>
);

export default Login;
