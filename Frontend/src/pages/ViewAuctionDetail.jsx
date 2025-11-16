import Spinner from "../Components/Spinner";
import { getAuctionDetails } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuctionStatus } from "@/constants/constant";

const ViewAuctionDetail = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    if (id) dispatch(getAuctionDetails(id));
  }, [isAuthenticated, id]);

  const status = getAuctionStatus(
    auctionDetail?.startTime,
    auctionDetail?.endTime
  );

  return (
    <section className="min-h-screen bg-[#0E0E0E] text-white px-6 pt-24 lg:pl-[320px]">
      {/* Breadcrumb */}
      <div className="text-sm flex items-center gap-2 mb-8 text-gray-400">
        <Link to="/" className="hover:text-[#F4B400]">
          Home
        </Link>
        <FaGreaterThan size={12} />
        <Link to="/auctions" className="hover:text-[#F4B400]">
          My Auctions
        </Link>
        <FaGreaterThan size={12} />
        <span className="text-[#F4B400] font-semibold">
          {auctionDetail?.title}
        </span>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-[#1A1A1A] rounded-xl p-6 border border-[#F4B400]/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              <div
                className="bg-[#0E0E0E] border border-[#F4B400]/30 rounded-xl p-4 
                          flex justify-center items-center w-full lg:w-60 h-60"
              >
                <img
                  src={auctionDetail?.image?.url}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-between">
                <h1 className="text-4xl font-extrabold text-[#F4B400]">
                  {auctionDetail?.title}
                </h1>

                <div className="mt-4 space-y-2">
                  <p className="text-lg">
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
                  <p className="text-lg">
                    Current Highest Bid:{" "}
                    <span className="text-green-400 font-bold text-xl">
                      ${auctionDetail?.currentBid}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10">
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
            <div
              className="bg-[#1A1A1A] border border-[#F4B400]/20 
                        rounded-t-xl px-6 py-4 flex justify-between items-center"
            >
              <h2 className="text-2xl font-bold text-[#F4B400]">Live Bids</h2>
              <span
                className={`px-3 py-1 rounded-md text-sm ${
                  status === "live"
                    ? "bg-green-600"
                    : status === "not-started"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {status === "live"
                  ? "Auction Live"
                  : status === "not-started"
                  ? "Not Started"
                  : "Ended"}
              </span>
            </div>

            <div className="bg-[#0E0E0E] border-x border-b border-[#F4B400]/20 rounded-b-xl p-4 min-h-[450px]">
              {auctionBidders.length === 0 ? (
                <p className="text-center text-gray-500 py-6">No bids yet.</p>
              ) : (
                auctionBidders.map((b, i) => (
                  <div
                    key={i}
                    className="
                  py-4 flex justify-between items-center 
                  border-b border-[#F4B400]/10 last:border-none
                "
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={b.profileImage}
                        className="w-12 h-12 rounded-full border border-[#F4B400]/40 shadow-md"
                      />

                      <div>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          {b.userName || "User"}
                          {i === 0 && (
                            <span className="text-xs bg-[#F4B400] text-black px-2 rounded-md">
                              Highest Bidder
                            </span>
                          )}
                        </p>

                        <p className="text-[#F4B400] text-md font-bold">
                          ${b.amount}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        i === 0 ? "text-[#F4B400]" : "text-gray-400"
                      }`}
                    >
                      #{i + 1}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetail;
