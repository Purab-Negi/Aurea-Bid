import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

export const steps = [
  {
    icon: FaUser,
    title: "User Registration",
    description:
      "Users must register or log in to access key features — such as posting auctions, placing bids, viewing dashboards, or submitting payment proofs.",
  },
  {
    icon: FaGavel,
    title: "Role Selection",
    description:
      'While registering, users choose their role as either a "Bidder" or an "Auctioneer." Bidders can place bids on listed items, while Auctioneers can create and manage auctions.',
  },
  {
    icon: FaEnvelope,
    title: "Winning Bid Notification",
    description:
      "When an auction ends, the highest bidder automatically receives an email containing the Auctioneer’s payment details — including bank transfer, UPI, or PayPal information.",
  },
  {
    icon: FaDollarSign,
    title: "Commission Payment",
    description:
      "After a successful sale, the Auctioneer must pay a 5% commission to the platform. Failure to do so may temporarily restrict new auction postings and result in a warning notice.",
  },
  {
    icon: FaFileInvoice,
    title: "Proof of Payment",
    description:
      "The Auctioneer submits payment proof (as a screenshot) along with the total amount. Once approved by the Administrator, the unpaid commission balance is updated accordingly.",
  },
  {
    icon: FaRedo,
    title: "Reposting Items",
    description:
      "If a Bidder fails to complete the payment, the Auctioneer can relist the same item without any additional charges.",
  },
];
