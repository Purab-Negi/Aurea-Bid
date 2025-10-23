import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../Models/auctionSchema.js";

export const deleteAuctionItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found", 400));
  }
  await auctionItem.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "Auction Item deleted successfully" });
});
