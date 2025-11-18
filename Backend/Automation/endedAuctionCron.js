import cron from "node-cron";
import { Auction } from "../Models/auctionSchema.js";
import { User } from "../Models/userSchema.js";
import { Bid } from "../Models/bidSchema.js";
import { sendEmail } from "../Utils/sendEmail.js";
import { calculateCommission } from "../Controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/3 * * * *", async () => {
    try {
      const now = new Date();
      console.log("[Cron] endedAuctionCron running at", now.toISOString());

      const endedAuctions = await Auction.find({
        endTime: { $lt: now },
        commissionCalculated: false,
      });

      for (const auction of endedAuctions) {
        try {
          console.log("[Cron] Processing auction:", auction._id);
          const highestBid = await Bid.findOne({
            auctionItem: auction._id,
          }).sort({ amount: -1 });

          if (!highestBid) {
            console.log("[Cron] No bids found for auction:", auction._id);
            auction.commissionCalculated = true;
            await auction.save();
            continue;
          }
          auction.currentBid = highestBid.amount;
          auction.highestBidder = highestBid.bidder.id;
          auction.commissionCalculated = true;
          await auction.save();

          const commissionAmount = await calculateCommission(auction._id);

          const auctioneer = await User.findById(auction.createdBy);
          if (!auctioneer) {
            console.warn(
              "[Cron] Auctioneer not found for auction:",
              auction._id
            );
          } else {
            await User.findByIdAndUpdate(
              auctioneer._id,
              { $inc: { unpaidCommission: commissionAmount } },
              { new: true }
            );
            console.log(
              `[Cron] Commission added: ${commissionAmount} to ${auctioneer._id}`
            );
          }

          const bidder = await User.findById(highestBid.bidder.id);
          if (bidder) {
            await User.findByIdAndUpdate(
              bidder._id,
              { $inc: { moneySpent: highestBid.amount, auctionsWon: 1 } },
              { new: true }
            );
          } else {
            console.warn(
              "[Cron] Bidder user not found for bid:",
              highestBid._id
            );
          }

          try {
            const subject = `Congratulations! You won the auction for ${auction.title}`;
            const message = `Dear ${
              bidder ? bidder.userName : "User"
            },\n\nCongratulations! You have won the auction for ${
              auction.title
            }.\n\nAuctioneer email: ${
              auctioneer ? auctioneer.email : "Not available"
            }\nWinning amount: ₹${
              highestBid.amount
            }\n\nPlease contact the auctioneer for payment details.\n\nBest Regards,\nAureaBid Team`;
            await sendEmail({ email: bidder.email, subject, message });
            console.log("[Cron] Email sent to bidder:", bidder.email);
          } catch (mailErr) {
            console.error(
              "[Cron] Failed to send email to bidder:",
              bidder ? bidder.email : "unknown",
              mailErr
            );
          }
        } catch (innerErr) {
          console.error(
            "[Cron] Error processing single auction:",
            auction._id,
            innerErr
          );
        }
      }
    } catch (err) {
      console.error("[Cron] endedAuctionCron top-level error:", err);
    }
  });
};
