import {
  clearAllSuperAdminSliceError,
  getAllUsers,
  getMonthlyRevenue,
  getPaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneerGraph from "./sub-components/BiddersAuctioneerGraph";
import PaymentProof from "./sub-components/PaymentProof";
import PaymentGraph from "./sub-components/PaymentGraph";
import Spinner from "@/Components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Super Admin") {
      toast.error("Not Authorized to visit this");
      navigate("/");
      return;
    } else {
      dispatch(getMonthlyRevenue());
      dispatch(getAllUsers());
      dispatch(getPaymentProof());
      dispatch(clearAllSuperAdminSliceError());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <section className="min-h-screen bg-[#0E0E0E] text-white px-6 pt-24 pb-12 lg:pl-[300px] transition-all duration-300">
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F4B400] mb-10 text-center">
            Super Admin Dashboard
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F4B400]/20 shadow-lg">
              <h3 className="text-2xl font-bold text-[#F4B400] mb-4">
                Monthly Payment Received
              </h3>
              <PaymentGraph />
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F4B400]/20 shadow-lg">
              <h3 className="text-2xl font-bold text-[#F4B400] mb-4">
                Users Overview
              </h3>
              <BiddersAuctioneerGraph />
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F4B400]/20 shadow-lg col-span-1 lg:col-span-2">
              <h3 className="text-2xl font-bold text-[#F4B400] mb-4">
                Payment Proofs
              </h3>
              <PaymentProof />
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#F4B400]/20 shadow-lg col-span-1 lg:col-span-2">
              <h3 className="text-2xl font-bold text-[#F4B400] mb-4">
                Delete Auction Items
              </h3>
              <AuctionItemDelete />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
