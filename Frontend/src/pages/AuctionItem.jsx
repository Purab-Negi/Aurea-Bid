import Spinner from "../Components/Spinner";
import { getAuctionDetails } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuctionStatusBlock from "@/components/AuctionStatusBlock";
import { getAuctionStatus } from "@/constants/constant";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    if (id) dispatch(getAuctionDetails(id));
  }, [isAuthenticated, id]);

  const status = getAuctionStatus(
    auctionDetail?.startTime,
    auctionDetail?.endTime
  );

  const handleBid = () => {
    if (!amount) return;
    const formData = new FormData();
    formData.append("amount", amount);

    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetails(id));
  };

  return (
    <section className="min-h-screen bg-[#0E0E0E] text-white px-6 pt-24 lg:pl-[320px]">
      <div className="text-sm flex items-center gap-2 mb-8 text-gray-400">
        <Link to="/" className="hover:text-[#F4B400]">
          Home
        </Link>
        <FaGreaterThan size={12} />
        <Link to="/auctions" className="hover:text-[#F4B400]">
          Auctions
        </Link>
        <FaGreaterThan size={12} />
        <span className="text-[#F4B400]">{auctionDetail?.title}</span>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6 border border-[#F4B400]/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-[#0E0E0E] border border-[#F4B400]/30 rounded-xl p-4 flex justify-center items-center w-full lg:w-60 h-60">
                <img
                  src={auctionDetail?.image?.url}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-between">
                <h1 className="text-3xl font-extrabold text-[#F4B400]">
                  {auctionDetail?.title}
                </h1>

                <p className="text-lg mt-4">
                  Condition:{" "}
                  <span className="text-[#F4B400] font-semibold">
                    {auctionDetail?.condition}
                  </span>
                </p>

                <p className="text-lg">
                  Starting Bid:{" "}
                  <span className="text-[#F4B400] font-bold">
                    ${auctionDetail?.startingBid}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-[#F4B400]">Description</h2>
              <hr className="border-[#F4B400]/20 my-3" />
              {auctionDetail?.description?.split(". ").map((line, i) => (
                <p key={i} className="text-gray-300 mb-2">
                  • {line}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="bg-[#1A1A1A] border border-[#F4B400]/20 rounded-t-xl px-6 py-4">
              <h2 className="text-2xl font-bold text-[#F4B400]">Live Bids</h2>
            </div>

            <div className="bg-[#0E0E0E] border-x border-b border-[#F4B400]/20 rounded-b-xl p-4 min-h-[400px]">
              {console.log(auctionBidders)}
              {status !== "live" ? (
                <AuctionStatusBlock status={status} />
              ) : auctionBidders?.length > 0 ? (
                auctionBidders.map((b, i) => (
                  <div
                    key={i}
                    className="py-3 flex justify-between items-center border-b border-[#F4B400]/10"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={b.profileImage}
                        className="w-12 h-12 rounded-full border border-[#F4B400]/40"
                      />
                      <div>
                        {console.log(b.userName)}
                        <p className="text-lg font-semibold">{b.userName}</p>
                        <p className="text-[#F4B400] text-sm font-bold">
                          ${b.amount}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-xl font-bold ${
                        i === 0
                          ? "text-[#F4B400]"
                          : i === 1
                          ? "text-gray-300"
                          : i === 2
                          ? "text-amber-500"
                          : "text-gray-500"
                      }`}
                    >
                      {i + 1}°
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">No bids yet.</p>
              )}
            </div>
            <div className="mt-6 bg-[#1A1A1A] border border-[#F4B400]/20 rounded-xl p-5 flex justify-between items-center">
              {status === "live" ? (
                <>
                  <input
                    type="number"
                    className="bg-[#0E0E0E] border border-[#F4B400]/30 text-white px-3 py-2 rounded-md"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />

                  <button
                    className="p-4 bg-[#F4B400] text-black rounded-full cursor-pointer hover:bg-[#d69c00]"
                    onClick={handleBid}
                  >
                    <RiAuctionFill size={22} />
                  </button>
                </>
              ) : status === "not-started" ? (
                <p className="text-yellow-400 font-semibold text-lg">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="text-red-500 font-semibold text-lg">
                  Auction has ended!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
