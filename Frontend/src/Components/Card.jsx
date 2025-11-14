import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imageSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;

    if (startDiff > 0) {
      return {
        type: "Starts In",
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / 1000 / 60) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    }

    if (endDiff > 0) {
      return {
        type: "Ends In",
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / 1000 / 60) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    }

    return { type: "Expired" };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = ({ days, hours, minutes, seconds }) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${days}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="
        bg-[#1A1A1A] 
        border border-[#F4B400]/20 
        rounded-xl overflow-hidden 
        shadow-[0_0_20px_rgba(0,0,0,0.3)]
        hover:border-[#F4B400] 
        hover:shadow-[0_0_25px_rgba(244,180,0,0.25)]
        transition-all duration-300 
        group cursor-pointer 
        flex flex-col
      "
    >
      <div className="w-full h-48 overflow-hidden bg-[#0E0E0E]">
        <img
          src={imageSrc}
          alt={title}
          className="
            w-full h-full object-fit 
            group-hover:scale-105 
            transition-all duration-500
          "
        />
      </div>

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold group-hover:text-[#F4B400] transition">
          {title}
        </h3>

        {startingBid && (
          <p className="text-gray-300 mt-1 text-sm">
            Starting Bid:{" "}
            <span className="text-[#F4B400] font-bold">${startingBid}</span>
          </p>
        )}

        <div className="mt-3 text-sm">
          {timeLeft.type !== "Expired" ? (
            <>
              <span className="text-gray-400">{timeLeft.type}: </span>
              <span className="text-[#F4B400] font-semibold">
                {formatTime(timeLeft)}
              </span>
            </>
          ) : (
            <span className="text-red-500 font-semibold">Auction Ended</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
