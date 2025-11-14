import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const leaderboard = useSelector((state) => state.user.leaderboard) || [];

  return (
    <section className="w-full mt-14 max-w-6xl text-center transition-all duration-300">
      <h2 className="text-center text-4xl font-bold text-[#F4B400] mb-12">
        Top 10 Bidder's Leaderboard
      </h2>

      <div className="overflow-x-auto">
        <table
          className="min-w-full table-fixed bg-[#1A1A1A] 
            border border-[#F4B400]/40 rounded-xl overflow-hidden 
            shadow-lg shadow-[#F4B400]/10"
        >
          <thead className="bg-[#0E0E0E] border-b border-[#F4B400]/40">
            <tr>
              <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] text-sm uppercase tracking-wide">
                Rank
              </th>
              <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] text-sm uppercase tracking-wide">
                Profile
              </th>
              <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] text-sm uppercase tracking-wide">
                Username
              </th>
              <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] text-sm uppercase tracking-wide">
                Bid Spent
              </th>
              <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] text-sm uppercase tracking-wide">
                Auctions Won
              </th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.slice(0, 10).map((element, index) => {
              const isTop3 = index < 3;

              return (
                <tr
                  key={element._id}
                  className={`border-b border-[#F4B400]/20 transition-all
                    ${isTop3 ? "bg-[#F4B400]/10" : "bg-[#1A1A1A]"}`}
                >
                  <td className="w-1/5 py-4 px-4 text-left font-bold text-[#F4B400]">
                    #{index + 1}
                  </td>

                  <td className="w-1/5 py-4 px-4 text-left font-bold text-[#F4B400]">
                    <img
                      src={element.profileImage?.url}
                      className="h-12 w-12 rounded-full object-cover border border-[#F4B400]/40 shadow-md"
                    />
                  </td>

                  <td className="w-1/5 py-4 px-4 text-left font-bold text-[#F4B400]">
                    {element.userName}
                  </td>

                  <td className="w-1/5 py-4 px-4 text-left font-bold text-[#F4B400]">
                    ${element.moneySpent}
                  </td>

                  <td className="w-1/5 py-4 px-4 text-left font-bold text-[#F4B400]">
                    {element.auctionWon}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/leaderboard"
          className="
      border-2 border-[#F4B400] 
      text-[#F4B400] 
      font-semibold 
      text-lg 
      px-8 py-3 
      rounded-lg
      hover:bg-[#F4B400] 
      hover:text-black 
      transition-all 
      duration-300
      shadow-md hover:shadow-[#F4B400]/30
    "
        >
          View Full Leaderboard
        </Link>
      </div>
    </section>
  );
};

export default Leaderboard;
