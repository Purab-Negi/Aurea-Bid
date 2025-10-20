import ErrorHandler from "../middlewares/error.js";
import { User } from "../Models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { generateToken } from "../Utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length == 0) {
    return next(new ErrorHandler("Profile Image Required", 400));
  }
  const { profileImage } = req.files;
  const allowedFormat = ["image/png", "image/jpeg", "image/webp", "image/JPG"];
  if (!allowedFormat.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }
  const {
    userName,
    email,
    password,
    phone,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    upiId,
    paypalEmail,
  } = req.body;

  if (!userName || !email || !password || !phone || !address || !role) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  if (role === "Auctioneer") {
    if (!bankAccountName || !bankAccountNumber || !bankName) {
      return next(
        new ErrorHandler("Please provide your full bank details", 400)
      );
    }
    if (!upiId) {
      return next(new ErrorHandler("Please provide upi-Id", 400));
    }
    if (!paypalEmail) {
      return next(
        new ErrorHandler("Please provide your paypal email address", 400)
      );
    }
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    profileImage.tempFilePath,
    {
      folder: "Aurea_Bid_USERS",
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

  const user = await User.create({
    userName,
    email,
    password,
    phone,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankAccountName,
        bankName,
      },
      UPI: {
        upiId,
      },
      paypal: {
        paypalEmail,
      },
    },
  });
  generateToken(user, "User Registered", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please fill full form"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Credentials"));
  }
  generateToken(user, "Login successful", 200, res);
});

export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true.valueOf,
      message: "Logout Successful",
    });
});
