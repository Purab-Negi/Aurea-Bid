import React, { useState } from "react";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoIosCreate, IoMdCloseCircleOutline } from "react-icons/io";
import { FaFileInvoiceDollar, FaEye, FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setShow(true)}
        className="fixed right-5 top-5 bg-[#d6482b] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] transition-all z-50 lg:hidden"
      >
        <GiHamburgerMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[280px] bg-[#0E0E0E] border-r border-[#F4B400]/30 text-white transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 flex flex-col justify-between p-4 lg:translate-x-0`}
      >
        <div className="relative">
          {/* Logo */}
          <Link to={"/"}>
            <h4 className="text-2xl font-bold mb-6 tracking-wide">
              Aurea<span className="text-[#F4B400]">Bid</span>
            </h4>
          </Link>

          {/* Navigation */}
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <Link
                to={"/auctions"}
                className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/leaderboard"}
                className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>

            {/* Auctioneer Routes */}
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auction"}
                    className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {/* Super Admin */}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Auth Buttons */}
          <div className="my-6">
            {!isAuthenticated ? (
              <div className="flex gap-4">
                <Link
                  to={"/sign-up"}
                  className="bg-[#F4B400] text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="border border-[#F4B400] px-4 py-2 rounded-md hover:bg-[#F4B400] hover:text-black transition"
                >
                  Login
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-[#F4B400] text-black px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white transition"
              >
                Logout
              </button>
            )}
          </div>

          <hr className="border-t border-[#F4B400]/40 mb-4" />

          {/* Extra Links */}
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <Link
                to={"/how-it-works-info"}
                className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
              >
                <SiGooglesearchconsole /> How It Works?
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="flex items-center gap-3 hover:text-[#F4B400] transition-all"
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>

          {/* Close Button */}
          <IoMdCloseCircleOutline
            onClick={() => setShow(false)}
            className="absolute top-0 right-0 text-3xl cursor-pointer hover:text-[#F4B400] transition-all sm:hidden"
          />
        </div>

        {/* Footer */}
        <div>
          <div className="flex gap-3 justify-center mb-3">
            <Link
              to="https://www.instagram.com/"
              className="bg-[#f6f4f0] text-[#0E0E0E] p-2 text-xl rounded-sm hover:bg-[#F4B400] hover:text-black transition"
            >
              <RiInstagramFill />
            </Link>
            <Link
              to="https://www.facebook.com/"
              className="bg-[#f6f4f0] text-[#0E0E0E] p-2 text-xl rounded-sm hover:bg-[#F4B400] hover:text-black transition"
            >
              <FaFacebook />
            </Link>
          </div>
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#F4B400] font-medium">AureaBid</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
