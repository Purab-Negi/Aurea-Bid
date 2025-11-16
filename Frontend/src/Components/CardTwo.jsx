import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CardTwo = ({ imageSrc, title, startingBid, startTime, endTime, id }) => {
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

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
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  return (
    <>
      <div
        className="
        bg-[#1A1A1A] border border-[#F4B400]/20 rounded-xl overflow-hidden 
        shadow-[0_0_15px_rgba(244,180,0,0.06)]
        hover:shadow-[0_0_30px_rgba(244,180,0,0.25)]
        hover:border-[#F4B400]/60 transition-all duration-300 
        flex flex-col
      "
      >
        <div className="w-full h-48 bg-[#0E0E0E] overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="p-4 text-white flex flex-col flex-grow">
          <h3 className="text-lg font-bold tracking-wide text-[#F4B400]">
            {title}
          </h3>

          <p className="text-gray-300 text-sm mt-1">
            Starting Bid:{" "}
            <span className="text-[#F4B400] font-semibold">${startingBid}</span>
          </p>
          <div
            className="
            mt-4 bg-[#0E0E0E] border border-[#F4B400]/20 
            rounded-lg px-3 py-2 text-sm text-center 
            shadow-inner
          "
          >
            {timeLeft.type !== "Expired" ? (
              <>
                <span className="text-gray-400">{timeLeft.type}</span>
                <p className="text-[#F4B400] font-semibold mt-1">
                  {formatTime(timeLeft)}
                </p>
              </>
            ) : (
              <span className="text-red-500 font-semibold">Auction Ended</span>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <Link
            to={`/auction/details/${id}`}
            className="
            text-center py-2 rounded-lg 
            bg-[#F4B400] text-black font-semibold 
            hover:bg-[#d69c00] transition
          "
          >
            View Auction
          </Link>

          <button
            className="
            py-2 rounded-lg bg-red-600 text-white font-semibold 
            hover:bg-red-700 transition cursor-pointer
          "
            onClick={handleDeleteAuction}
          >
            Delete Auction
          </button>

          <button
            onClick={() => setOpenDrawer(true)}
            disabled={new Date(endTime) > Date.now()}
            className={`
            py-2 rounded-lg font-semibold transition cursor-pointer
            ${
              new Date(endTime) > Date.now()
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-[#0E0E0E] border border-[#F4B400]/40 text-[#F4B400] hover:bg-[#F4B400] hover:text-black cursor-pointer"
            }
          `}
          >
            Republish Auction
          </button>
        </div>
      </div>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} id={id} />
    </>
  );
};

const Drawer = ({ openDrawer, setOpenDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleRepublishAuction = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${
        openDrawer ? "bottom-0" : "-bottom-full"
      } left-0 w-full h-full bg-[#00000087] transition-all duration-300 flex items-end`}
    >
      <div className="bg-[#1A1A1A] w-full rounded-t-2xl p-8">
        <h3 className="text-[#F4B400] text-2xl font-bold text-center">
          Republish Auction
        </h3>

        <p className="text-gray-400 text-center mt-1">
          Set new start and end timings
        </p>

        <form
          className="flex flex-col gap-5 mt-6"
          onSubmit={handleRepublishAuction}
        >
          <div>
            <label className="text-gray-400 mx-4">Start Time</label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-2 bg-[#0E0E0E] w-full py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400]"
            />
          </div>

          <div>
            <label className="text-gray-400 mx-4">End Time</label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-2 bg-[#0E0E0E] w-full py-3 px-4 rounded-lg border border-[#F4B400]/20 focus:border-[#F4B400]"
            />
          </div>

          <button className="cursor-pointer bg-[#F4B400] text-black py-2 rounded-lg font-bold">
            Republish
          </button>

          <button
            type="button"
            onClick={() => setOpenDrawer(false)}
            className="bg-[#0E0E0E] cursor-pointer border border-[#F4B400]/20 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

export default CardTwo;
