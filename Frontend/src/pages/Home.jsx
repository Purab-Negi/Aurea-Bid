import React from "react";
import { homePageConstant } from "@/constants/constant";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeatureAuction from "@/Components/home-sub-components/FeatureAuction";
import UpcomingAuctions from "@/Components/home-sub-components/UpcomingAuctions";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="bg-[#0E0E0E] text-white min-h-screen flex flex-col items-center justify-center px-6 lg:ml-[278px] transition-all duration-300">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="text-[#F4B400]">Transparent</span> Auctions,
          <br /> Real <span className="text-[#F4B400]">Winners</span>.
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Welcome to{" "}
          <span className="text-[#F4B400] font-semibold">AureaBid</span> — where
          transparency, trust, and excitement define every bid. Compete, win,
          and connect in an auction space built for fairness and thrill.
        </p>
        {!isAuthenticated && (
          <div className="flex justify-center gap-6 mt-8">
            <Link
              to="/sign-up"
              className="bg-[#F4B400] text-black font-semibold px-6 py-3 rounded-md hover:bg-black hover:text-white transition-all duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-[#F4B400] text-[#F4B400] font-semibold px-6 py-3 rounded-md hover:bg-[#F4B400] hover:text-black transition-all duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      <div className="max-w-6xl w-full text-center">
        <h2 className="text-3xl font-semibold text-[#F4B400] mb-10">
          How AureaBid Works
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {homePageConstant.map((element, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-[#F4B400]/30 p-6 rounded-xl hover:shadow-lg cursor-pointer hover:shadow-[#F4B400]/20 transition-all"
            >
              <h3 className="text-[#F4B400] text-xl font-bold mb-2">
                {element.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {element.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <FeatureAuction />
      <UpcomingAuctions />
    </section>
  );
};

export default Home;
