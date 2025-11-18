import Spinner from "@/Components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="min-h-screen bg-[#0E0E0E] text-white px-6 pt-24 pb-12 lg:pl-[300px] transition-all duration-300">
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F4B400] mb-8 text-center">
            User Profile
          </h1>

          <div className="rounded-xl shadow-[0_0_20px_rgba(255,204,0,0.2)] border border-[#F4B400]/30 backdrop-blur-lg bg-[#0f0f0fea] p-8">
            <div className="flex flex-col items-center mb-8">
              <img
                src={user.profileImage?.url || "/default-avatar.jpg"}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-[#F4B400] object-cover"
              />
              <h2 className="text-2xl font-bold text-[#F4B400] mt-4">
                {user.userName}
              </h2>
              <span className="bg-[#3AB8FF] text-black px-3 py-1 rounded-full text-sm font-bold mt-2">
                {user.role}
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#F4B400] mb-6 border-b border-[#F4B400]/30 pb-2">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-gray-300 font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user.userName}
                    className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-gray-300 font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    defaultValue={user.email}
                    className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-gray-300 font-medium">
                    Phone
                  </label>
                  <input
                    type="text"
                    defaultValue={user.phone}
                    className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-gray-300 font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={user.address || "Not provided"}
                    className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-gray-300 font-medium">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue={user.role}
                    className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px] text-gray-300 font-medium">
                    Joined On
                  </label>
                  <input
                    type="text"
                    defaultValue={user.createdAt?.substring(0, 10) || "N/A"}
                    className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                    disabled
                  />
                </div>
              </div>
            </div>
            {user.role === "Auctioneer" && user.paymentMethods && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#F4B400] mb-6 border-b border-[#F4B400]/30 pb-2">
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-300 font-medium">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods?.bankTransfer?.bankName ||
                        "Not provided"
                      }
                      className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-300 font-medium">
                      Bank Account (IFSC)
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods?.bankTransfer?.bankAccountNumber ||
                        "Not provided"
                      }
                      className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-300 font-medium">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods?.bankTransfer?.bankAccountName ||
                        "Not provided"
                      }
                      className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-300 font-medium">
                      UPI Id
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods?.UPI?.upiId || "Not provided"
                      }
                      className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-300 font-medium">
                      Paypal Email
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods?.paypal?.paypalEmail ||
                        "Not provided"
                      }
                      className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#F4B400] mb-6 border-b border-[#F4B400]/30 pb-2">
                {user.role === "Auctioneer"
                  ? "Auctioneer Stats"
                  : "Bidder Stats"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.role === "Auctioneer" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] text-gray-300 font-medium">
                      Unpaid Commissions
                    </label>
                    <input
                      type="text"
                      defaultValue={`$${user.unpaidCommission || "0"}`}
                      className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                      disabled
                    />
                  </div>
                )}
                {user.role === "Bidder" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-[16px] text-gray-300 font-medium">
                        Auctions Won
                      </label>
                      <input
                        type="text"
                        defaultValue={user.auctionsWon || "0"}
                        className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[16px] text-gray-300 font-medium">
                        Money Spent
                      </label>
                      <input
                        type="text"
                        defaultValue={`$${user.moneySpent || "0"}`}
                        className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none"
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
