import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";

const FeatureAuction = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  return (
    <>
      <section className="my-8">
        <h3 className="text-center text-4xl font-bold text-white mb-12">
          Featured Auction
        </h3>
        <div className="flex flex-wrap gap-6">
          {allAuctions.slice(0, 8).map((element) => {
            return (
              <Card
                imageSrc={element.image?.url}
                title={element.title}
                startingBid={element.startingBid}
                startTime={element.startTime}
                endTime={element.endTime}
                id={element.id}
                key={element._id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeatureAuction;
