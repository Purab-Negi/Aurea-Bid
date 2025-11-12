import { values } from "@/constants/constant";
import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-[#0E0E0E] text-white py-16 px-6 lg:ml-[278px] transition-all duration-300">
      <h2 className="text-center text-4xl font-bold text-white mb-12">
        About <span className="text-[#F4B400]">AureaBid</span>
      </h2>

      <div className="max-w-5xl mx-auto text-center mb-12">
        <p className="text-gray-300 text-lg leading-relaxed">
          <span className="text-[#F4B400] font-semibold">AureaBid</span> is the
          next-generation auction platform where innovation meets trust. Our
          mission is to empower bidders and auctioneers through transparency,
          technology, and the thrill of fair competition.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-3xl font-semibold text-[#F4B400] mb-8 text-center">
          Our Core Values
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((element) => (
            <div
              key={element.id}
              className="bg-[#1A1A1A] border border-[#F4B400]/30 p-6 rounded-xl hover:shadow-lg cursor-pointer hover:shadow-[#F4B400]/20 transition-all"
            >
              <h4 className="text-white font-semibold text-lg mb-3">
                {element.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {element.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-16">
        <h3 className="text-3xl font-semibold text-[#F4B400] mb-6 text-center">
          Our Story
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed text-center">
          Founded by{" "}
          <span className="text-[#F4B400] font-semibold">Purab Negi</span>,
          AureaBid was born out of a passion for combining cutting-edge
          technology with the traditional art of bidding. We wanted to create a
          platform where both{" "}
          <span className="text-[#F4B400] font-semibold">Bidders</span> and{" "}
          <span className="text-[#F4B400] font-semibold">Auctioneers</span> can
          connect, compete, and thrive in a fair digital marketplace.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-16">
        <h3 className="text-3xl font-semibold text-[#F4B400] mb-6 text-center">
          Join the AureaBid Community
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed text-center">
          Whether you want to{" "}
          <span className="text-[#F4B400] font-semibold">bid</span> on rare
          collectibles or{" "}
          <span className="text-[#F4B400] font-semibold">host auctions</span>{" "}
          for your products, AureaBid offers the tools and trust you need to
          succeed. Join our global community of auction enthusiasts today!
        </p>
      </div>

      <div className="text-center border-t border-[#F4B400]/20 pt-8 max-w-4xl mx-auto">
        <p className="text-[#F4B400]] text-xl font-semibold leading-relaxed">
          Thank you for being part of{" "}
          <span className="text-[#F4B400]">AureaBid</span>. <br />
          Together, we redefine the future of online auctions!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
