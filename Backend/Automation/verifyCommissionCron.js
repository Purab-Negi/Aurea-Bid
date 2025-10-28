import { User } from "../Models/userSchema.js";
import { PaymentProof } from "../Models/commissionProofSchema.js";
import { Commission } from "../Models/commissionSchema.js";
import cron from "node-cron";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const approvedProofs = await PaymentProof.find({ status: "Approved" });
    for (const proof of approvedProofs) {
      try {
        const user = await User.findById(proof.userId);
        let updatedUserData = {};
        if (user) {
          if (user.unpaidCommission >= proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                $inc: {
                  unpaidCommission: -proof.amount,
                },
              },
              { new: true }
            );
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          } else {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                unpaidCommission: 0,
              },
              { new: true }
            );
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          }
          await Commission.create({
            amount: proof.amount,
            user: user._id,
          });
          const settlementDate = new Date(Date.now()).toString.substring(0, 15);
          const subject = `Your Payment has been Successfully Verified and Settled`;
          const message = `Dear ${user.userName},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled. Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.\n\nPayment Details:\nAmount Settled: ${proof.amount}\nUnpaid Amount: ${updatedUserData.unpaidCommission}\nDate of Settlement: ${settlementDate}\n\nBest regards,\nAurea Bid Auction Team`;
          sendEmail({ email: user.email, subject, message });
        }
      } catch (err) {
        console.error(
          `Error processing commission proof for user ${proof.userId} : ${err.message} `
        );
      }
    }
  });
};
