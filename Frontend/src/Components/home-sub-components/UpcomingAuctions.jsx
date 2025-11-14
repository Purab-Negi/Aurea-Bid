import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Card from "../Card";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date().toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime).toDateString();
    return auctionDate === today;
  });

  return (
    <section className="w-full mt-14 max-w-6xl text-center transition-all duration-300">
      <h3 className="text-center text-4xl font-bold text-[#F4B400] mb-12">
        Featured Auctions Today
      </h3>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-[#1A1A1A] border border-[#F4B400]/40 p-8 rounded-2xl shadow-lg hover:shadow-[#F4B400]/20 transition-all flex flex-col justify-center items-center text-center">
          <div className="bg-[#F4B400]/20 p-5 rounded-full text-[#F4B400] text-4xl shadow-md">
            <RiAuctionFill />
          </div>

          <h3 className="text-[#F4B400] text-2xl font-semibold mt-6">
            Auctions for Today
          </h3>

          <p className="text-gray-300 mt-2 max-w-xs">
            Explore exclusive auctions starting in the next few hours.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
          {auctionsStartingToday.length === 0 && (
            <p className="lg:col-span-2 grid grid-cols-1 gap-6">
              No auctions starting today.
            </p>
          )}

          {auctionsStartingToday.slice(0, 3).map((element) => (
            <Card
              imageSrc={element.image?.url}
              title={element.title}
              startingBid={element.startingBid}
              startTime={element.startTime}
              endTime={element.endTime}
              id={element._id}
              key={element._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAuctions;
