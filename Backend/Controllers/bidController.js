import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../Models/userSchema.js";
import { Auction } from "../Models/auctionSchema.js";
import { Bid } from "../Models/bidSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const auctionItem = await Auction.findById(id);
  if (!auctionItem)
    return next(new ErrorHandler("Auction item not found", 404));

  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("Please place your bid", 404));
  if (amount <= auctionItem.currentBid)
    return next(new ErrorHandler("Bid must be greater than current bid", 404));
  if (amount < auctionItem.startingBid)
    return next(new ErrorHandler("Bid must be greater than starting bid", 404));
  if (new Date(auctionItem.endTime) <= Date.now())
    return next(new ErrorHandler("This auction has ended", 400));

  const bidderDetail = await User.findById(req.user._id);

  const existingBid = await Bid.findOne({
    "bidder.id": req.user._id,
    auctionItem: auctionItem._id,
  });

  const existingBidInAuction = auctionItem.bids.find(
    (b) => b.userId.toString() === req.user._id.toString()
  );

  if (existingBid && existingBidInAuction) {
    existingBidInAuction.amount = amount;
    existingBidInAuction.userName = bidderDetail.userName;
    existingBidInAuction.profileImage = bidderDetail.profileImage?.url;

    existingBid.amount = amount;
    existingBid.bidder.userName = bidderDetail.userName;
    existingBid.bidder.profileImage = bidderDetail.profileImage?.url;

    auctionItem.currentBid = amount;

    await existingBid.save();
    await auctionItem.save();
  } else {
    await Bid.create({
      amount,
      bidder: {
        id: bidderDetail._id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
      },
      auctionItem: auctionItem._id,
    });

    auctionItem.bids.push({
      userId: req.user._id,
      userName: bidderDetail.userName,
      profileImage: bidderDetail.profileImage?.url,
      amount,
    });

    auctionItem.currentBid = amount;
    await auctionItem.save();
  }
  res.status(201).json({
    success: true,
    message: "Bid placed",
    currentBid: auctionItem.currentBid,
  });
});
