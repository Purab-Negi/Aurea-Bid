import { User } from "../Models/userSchema.js";
import { Auction } from "../Models/auctionSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const addNewAuctionItem = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Auction item image required", 400));
  }
  const allowedFormats = ["image/png", "image/JPG", "image/jpeg", "image/webp"];
  const { image } = req.files;
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }
  const {
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
  } = req.body;
  if (
    !title ||
    !description ||
    !category ||
    !condition ||
    !startingBid ||
    !startTime ||
    !endTime
  ) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (new Date(startTime) < Date.now()) {
    return next(
      new ErrorHandler(
        "Auction starting time must be greater than present time",
        400
      )
    );
  }
  if (new Date(startTime) >= new Date(endTime)) {
    return next(
      new ErrorHandler(
        "Auction starting time must be less than ending time",
        400
      )
    );
  }
  const alreadyOneAuctionActive = await Auction.find({
    createdBy: req.user._id,
    endTime: { $gt: Date.now() },
  });
  if (alreadyOneAuctionActive.length > 0) {
    return next(new ErrorHandler("You already have one active auction", 400));
  }
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: "Aurea_Bid_AUCTION_ITEM",
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown Cloudinary Error"
      );
      return next(
        new ErrorHandler("Failed to upload profile image to cloudinary ", 500)
      );
    }
    const auctionItem = await Auction.create({
      title,
      description,
      category,
      condition,
      startingBid,
      startTime,
      endTime,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      createdBy: req.user._id,
    });
    return res.status(200).json({
      success: true,
      message: `Auction item created and will be listed on auction page at ${startTime}`,
      auctionItem,
    });
  } catch (err) {
    return next(
      new ErrorHandler(err.message || "Failed to create auction", 500)
    );
  }
});

export const getAllItems = catchAsyncErrors(async (req, res, next) => {
  const items = await Auction.find();
  res.status(200).json({
    success: true,
    items,
  });
});

export const getAuctionDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid id format", 400));
  }
  const item = await Auction.findById(id);
  if (!item) {
    return next(new ErrorHandler("Auction not found", 404));
  }
  const bidders = item.bids.sort((a, b) => b.bid - a.bid);
  res.status(200).json({ success: true, item, bidders });
});

export const getMyAuctionDetails = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const items = await Auction.find({ createdBy: userId });
  res.status(200).json({
    success: true,
    items,
  });
});
