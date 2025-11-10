import { commissionProof } from "@/store/slices/commissionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SubmitCommission = () => {
  const [proof, setProof] = useState(null);
  const [proofName, setProofName] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);
  const { isAuthenticated } = useSelector((state) => state.user);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProof(file);
      setProofName(file.name);
    }
  };

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(commissionProof(formData));
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E0E0E] via-[#1a1a1a] to-[#111] px-4 py-12">
      <div className="relative w-full max-w-lg bg-[#1A1A1A]/90 shadow-lg rounded-2xl px-8 py-10 border border-[#F4B400]/30 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4B400]/10 via-transparent to-[#d6482b]/10 rounded-2xl pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-center mb-8 text-[#F4B400]">
          Submit Payment Proof
        </h2>

        <form onSubmit={handlePaymentProof} className="flex flex-col gap-6">
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={setAmount}
          />

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1">Payment Proof</label>
            <label
              htmlFor="proof-upload"
              className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-[#F4B400]/50 hover:border-[#F4B400] transition-all py-6 rounded-md bg-[#111] hover:bg-[#1d1d1d]"
            >
              <MdCloudUpload className="text-[#F4B400] text-4xl mb-2" />
              <span className="text-gray-300">
                {proofName || "Click to upload screenshot"}
              </span>
              <input
                id="proof-upload"
                type="file"
                accept="image/*"
                onChange={proofHandler}
                className="hidden"
              />
            </label>
          </div>

          <Input
            label="Comment"
            type="textarea"
            value={comment}
            onChange={setComment}
            rows={4}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#F4B400] text-black text-lg font-semibold py-3 rounded-md hover:bg-black cursor-pointer hover:text-white transition-all shadow-md shadow-[#F4B400]/20 active:scale-[0.98]"
          >
            {loading ? "Uploading..." : "Upload Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

const Input = ({ label, type = "text", value, onChange, rows = 3 }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-300 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111] border border-gray-700 px-3 py-2 rounded-md text-white placeholder-gray-400 focus:border-[#F4B400] outline-none resize-none"
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111] border border-gray-700 px-3 py-2 rounded-md text-white placeholder-gray-400 focus:border-[#F4B400] outline-none"
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    )}
  </div>
);

export default SubmitCommission;
