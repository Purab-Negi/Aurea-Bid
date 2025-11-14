import Spinner from "@/Components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen bg-[#0E0E0E] text-white px-5 pt-24 lg:pl-[320px] transition-all duration-300">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="text-center mb-14">
            <h1
              className="
              text-4xl sm:text-5xl md:text-6xl font-extrabold 
              text-[#F4B400]"
            >
              Bidder's Leaderboard
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              Top bidders ranked by total spending & auctions won.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table
              className="
                min-w-full table-fixed bg-[#1A1A1A] 
                border border-[#F4B400]/40 rounded-2xl overflow-hidden"
            >
              <thead className="bg-[#0E0E0E] border-b border-[#F4B400]/40">
                <tr>
                  <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] font-bold uppercase text-sm tracking-wide">
                    Rank
                  </th>
                  <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] font-bold uppercase text-sm tracking-wide">
                    Profile
                  </th>
                  <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] font-bold uppercase text-sm tracking-wide">
                    Username
                  </th>
                  <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] font-bold uppercase text-sm tracking-wide">
                    Bid Spent
                  </th>
                  <th className="w-1/5 py-4 px-4 text-left text-[#F4B400] font-bold uppercase text-sm tracking-wide">
                    Auctions Won
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.slice(0, 20).map((element, index) => {
                  const rank = index + 1;
                  const rowHighlight =
                    rank === 1
                      ? "bg-gradient-to-r from-[#F4B400]/20 to-[#F4B400]/5"
                      : rank === 2
                      ? "bg-gradient-to-r from-gray-400/20 to-[#1A1A1A]"
                      : rank === 3
                      ? "bg-gradient-to-r from-amber-700/20 to-[#1A1A1A]"
                      : "bg-[#1A1A1A]";

                  return (
                    <tr
                      key={element._id}
                      className={`${rowHighlight} border-b border-[#F4B400]/20 transition-all`}
                    >
                      <td className="w-1/5 py-5 px-4 text-left font-extrabold text-[#F4B400] text-lg">
                        #{rank}
                      </td>
                      <td className="w-1/5 py-5 px-4">
                        <img
                          src={element.profileImage?.url}
                          className="
                            h-14 w-14 rounded-full object-cover 
                            border border-[#F4B400]/50 shadow-md
                          "
                        />
                      </td>
                      <td className="w-1/5 py-5 px-4 text-white font-semibold text-lg">
                        {element.userName}
                      </td>
                      <td className="w-1/5 py-5 px-4 text-[#F4B400] font-bold text-lg">
                        ${element.moneySpent}
                      </td>
                      <td className="w-1/5 py-5 px-4 text-white font-semibold text-lg">
                        {element.auctionWon}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
