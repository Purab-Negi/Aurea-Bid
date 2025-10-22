import { User } from "../Models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const trackCommissionStatus = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    if (user.unpaidCommission > 0) {
      return next(
        new ErrorHandler(
          "You have unpaid commission. Please pay them before posting a new auction",
          403
        )
      );
    }
    next();
  }
);
