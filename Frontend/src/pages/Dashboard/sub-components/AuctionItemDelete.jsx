import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="p-4">
      <div
        className="overflow-x-auto 
      rounded-xl 
      border border-[#F4B400]/30 
      bg-[#0f0f0fdd]"
      >
        <table className="min-w-full text-white">
          <thead className="bg-[#F4B400] text-black">
            <tr>
              <th className="py-3 px-4 text-left font-bold uppercase tracking-wide">
                Image
              </th>
              <th className="py-3 px-4 text-left font-bold uppercase tracking-wide">
                Title
              </th>
              <th className="py-3 px-4 text-center font-bold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {allAuctions.length > 0 ? (
              allAuctions.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-[#2a2a2a] 
                  hover:bg-[#1b1b1b]/80 
                  transition-all"
                >
                  <td className="py-3 px-4">
                    <img
                      src={item.image?.url}
                      alt={item.title}
                      className="h-12 w-12 rounded-lg object-cover shadow-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#eee]">
                    {item.title}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <Link
                      to={`/auction/details/${item._id}`}
                      className="bg-[#3AB8FF] hover:bg-[#1f91c7] 
                      text-black font-bold px-4 py-2 
                      rounded-lg shadow-md transition-all"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAuctionDelete(item._id)}
                      className="bg-red-600 hover:bg-red-800 
                      text-white font-bold px-4 py-2 
                      rounded-lg shadow-md transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center">
                  <p className="text-xl text-[#3AB8FF] font-semibold">
                    No Auctions Found.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionItemDelete;
