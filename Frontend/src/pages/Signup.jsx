import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../store/slices/userSlice.js";
import { MdCloudUpload } from "react-icons/md";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [upiId, setUpiId] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankName", bankName);
      formData.append("upiId", upiId);
      formData.append("paypalEmail", paypalEmail);
    }
    dispatch(registerRequest(formData));
  };

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImage(file);
      setProfileImagePreview(reader.result);
    };
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0E0E0E] px-4 py-12">
      <div className="w-full max-w-3xl bg-[#1A1A1A] shadow-xl rounded-2xl px-6 py-10 border border-[#F4B400]/20 text-white">
        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-8">
          Register for{" "}
          <span className="text-[#F4B400] drop-shadow-md">AureaBid</span>
        </h1>

        <form
          className="flex flex-col gap-6"
          onSubmit={handleRegister}
          encType="multipart/form-data"
        >
          {/* Personal Info */}
          <h2 className="text-xl font-semibold text-[#F4B400] border-b border-[#F4B400]/30 pb-1">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={userName} onChange={setUserName} />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Phone"
              type="number"
              value={phone}
              onChange={setPhone}
            />
            <Input label="Address" value={address} onChange={setAddress} />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-[#111] border border-gray-700 px-3 py-2 rounded-md text-white focus:border-[#F4B400] outline-none"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col mt-4">
            <label className="text-sm text-gray-300 mb-1">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#F4B400]">
                <img
                  src={profileImagePreview || "/imageHolder.jpg"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                className="flex items-center gap-2 px-4 py-2 bg-[#F4B400] text-black rounded-md cursor-pointer 
  hover:bg-[#FFB84D] hover:text-black shadow-md hover:shadow-[#F4B400]/40 transition-all duration-300"
              >
                <MdCloudUpload size={22} />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={imageHandler}
                />
              </label>
            </div>
          </div>

          {/* Auctioneer Payment Details */}
          {role === "Auctioneer" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-[#F4B400] border-b border-[#F4B400]/30 pb-1">
                Payment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Bank Name"
                  value={bankName}
                  onChange={setBankName}
                />
                <Input
                  label="Bank Account Name"
                  value={bankAccountName}
                  onChange={setBankAccountName}
                />
                <Input
                  label="Bank Account Number / IFSC"
                  value={bankAccountNumber}
                  onChange={setBankAccountNumber}
                />
                <Input label="UPI ID" value={upiId} onChange={setUpiId} />
                <Input
                  label="Paypal Email"
                  value={paypalEmail}
                  onChange={setPaypalEmail}
                  type="email"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-[#F4B400] hover:bg-[#d6482b] text-black hover:text-white font-semibold py-3 rounded-md hover:bg-black cursor-pointer transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

//  Reusable Input Field
const Input = ({ label, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#111] border border-gray-700 px-3 py-2 rounded-md text-white focus:border-[#F4B400] outline-none"
    />
  </div>
);

export default Signup;
