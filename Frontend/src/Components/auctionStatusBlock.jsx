import React from "react";
import { assets } from "@/assets/assets";

const AuctionStatusBlock = ({ status }) => {
  if (status === "not-started")
    return (
      <img
        src={assets.auctionNotStarted}
        className="w-full rounded-xl opacity-70"
        alt="Auction not started"
      />
    );

  if (status === "ended")
    return (
      <img
        src={assets.auctionEnded}
        className="w-full rounded-xl opacity-70"
        alt="Auction ended"
      />
    );

  return null;
};

export default AuctionStatusBlock;
