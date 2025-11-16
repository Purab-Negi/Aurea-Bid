import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches ",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion and Accessories",
    "Sports",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreateAuction = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    dispatch(createAuction(formData));
  };

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") navigate("/");
  }, [isAuthenticated]);

  return (
    <section className="bg-[#0E0E0E] text-white min-h-screen px-6 pt-24 pb-10 lg:pl-[300px] transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#F4B400]">
          Create New Auction
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Add auction details, set timings & upload item image
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#1A1A1A] w-full max-w-4xl mx-auto p-8 rounded-2xl shadow-[0_0_25px_rgba(244,180,0,0.15)] border border-[#F4B400]/20">
        <form onSubmit={handleCreateAuction} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., MacBook Pro 2021"
              className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
            />
          </div>

          {/* Category + Condition */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>

          {/* Starting Bid */}
          <div>
            <label className="text-sm text-gray-400">Starting Bid ($)</label>
            <input
              type="number"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              placeholder="e.g., 500"
              className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe the item..."
              className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
            />
          </div>

          {/* Timings */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400">Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full mt-1 bg-[#0E0E0E] py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400] outline-none"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-400">Auction Item Image</label>

            <label className="w-full mt-2 flex flex-col items-center justify-center h-56 border border-dashed border-[#F4B400]/40 rounded-xl bg-[#0E0E0E] hover:bg-[#1A1A1A] cursor-pointer transition">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-40 h-auto rounded-lg shadow-lg"
                />
              ) : (
                <>
                  <svg
                    className="w-12 h-12 text-[#F4B400] mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-sm text-gray-400">Click to upload image</p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={imageHandler}
                accept="image/*"
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#F4B400] text-black font-bold py-3 rounded-xl hover:bg-[#d9a200] transition text-lg"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAuction;
