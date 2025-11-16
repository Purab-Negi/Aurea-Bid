import CardTwo from "@/Components/CardTwo";
import Spinner from "@/Components/Spinner";
import { getMyAuction } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuction, loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigate("/");
    }
    dispatch(getMyAuction());
  }, [dispatch, isAuthenticated]);
  return (
    <>
      <section className="bg-[#0E0E0E] text-white min-h-screen px-6 pt-24 pb-10 lg:pl-[300px] transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#F4B400]">
            My Auctions
          </h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-wrap gap-10">
              {myAuction.length > 0 ? (
                myAuction.map((element) => {
                  return (
                    <CardTwo
                      key={element._id}
                      imageSrc={element.image?.url}
                      title={element.title}
                      startingBid={element.startingBid}
                      startTime={element.startTime}
                      endTime={element.endTime}
                      id={element._id}
                    />
                  );
                })
              ) : (
                <h1
                  className="
                      text-2xl
                      sm:text-3xl
                      font-bold
                      text-gray-400
                      tracking-wide
                      my-4
                      mx-[25%]
                      px-8
                      py-6
                      rounded-xl
                      transition-all
                      duration-300
                    "
                >
                  You have not posted any Auction
                </h1>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ViewMyAuctions;
