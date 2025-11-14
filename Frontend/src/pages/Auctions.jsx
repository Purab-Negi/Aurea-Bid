import Spinner from "@/Components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import Card from "../Components/Card";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-[#0E0E0E] text-white py-20 px-6 lg:ml-[278px] transition-all duration-300 min-h-screen">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#F4B400]">
              Live & Upcoming Auctions
            </h1>
            <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
              Browse through all auctions currently active or scheduled to begin
              soon.
            </p>
          </div>
          {allAuctions.length === 0 && (
            <p className="text-gray-400 text-center text-lg mt-12">
              No auctions available right now. Please check back later.
            </p>
          )}
          <div
            className="
            max-w-6xl mx-auto 
            grid 
            gap-10 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
          "
          >
            {allAuctions.map((element) => (
              <Card
                key={element._id}
                imageSrc={element.image?.url}
                title={element.title}
                startingBid={element.startingBid}
                startTime={element.startTime}
                endTime={element.endTime}
                id={element._id}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Auctions;
