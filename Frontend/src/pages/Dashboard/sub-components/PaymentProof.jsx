import {
  deletePaymentProof,
  getPaymentProof,
  singlePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProof, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(singlePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);
  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-xl shadow-[0_0_20px_rgba(255,204,0,0.2)] border border-[#F4B400]/30 backdrop-blur-lg bg-[#0f0f0fea]">
        <table className="min-w-full text-white">
          <thead className="bg-[#F4B400] text-black">
            <tr>
              <th className="py-3 px-4 text-left font-bold uppercase tracking-wide">
                User ID
              </th>
              <th className="py-3 px-4 text-left font-bold uppercase tracking-wide">
                Status
              </th>
              <th className="py-3 px-4 text-center font-bold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-200">
            {paymentProof.length > 0 ? (
              paymentProof.map((element, index) => (
                <tr
                  key={index}
                  className="border-b border-[#2a2a2a] hover:bg-[#1b1b1b] transition-all duration-300 backdrop-blur-lg"
                >
                  <td className="py-3 px-4 text-sm opacity-80">
                    #{element.userId}
                  </td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      element.status === "Approved"
                        ? "text-green-400"
                        : element.status === "Rejected"
                        ? "text-red-400"
                        : element.status === "Pending"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {element.status}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-[#3AB8FF] hover:bg-[#1f91c7] text-black font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                        onClick={() => handleFetchPaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                        onClick={() => handlePaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-xl text-center text-[#3AB8FF] font-semibold"
                >
                  No Payment Proofs Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </div>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof?.amount || "");
  const [status, setStatus] = useState(singlePaymentProof?.status || "Pending");

  const dispatch = useDispatch();

  useEffect(() => {
    if (singlePaymentProof?._id) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "Pending");
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = () => {
    if (singlePaymentProof?._id) {
      dispatch(
        updatePaymentProof({
          id: singlePaymentProof._id,
          status: status,
          amount: Number(amount),
        })
      );
      dispatch(getPaymentProof());
      setOpenDrawer(false);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  if (!openDrawer || !singlePaymentProof?.userId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 transition-all duration-300 flex justify-center items-end z-50"
      onClick={handleCloseDrawer}
    >
      <div
        className="bg-[#111] w-full md:w-[420px] p-7 rounded-t-3xl border-t-4 border-[#F4B400] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-center text-[#F4B400] mb-4 font-bold">
          Update Payment Proof
        </h2>

        <p className="text-gray-400 text-center mb-6">
          You can update payment status and amount.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-300">User ID</label>
            <input
              type="text"
              value={"#" + singlePaymentProof.userId}
              disabled
              className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none focus:border-[#F4B400]/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-300">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none focus:border-[#3AB8FF]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none focus:border-[#3AB8FF]"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Settled">Settled</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-gray-300">Comment</label>
            <textarea
              rows={3}
              value={singlePaymentProof.comment || "No comments"}
              disabled
              className="bg-[#222] text-white px-4 py-3 rounded border border-[#2a2a2a] focus:outline-none resize-none"
            />
          </div>

          {singlePaymentProof?.proof?.url && (
            <Link
              to={singlePaymentProof.proof.url}
              target="_blank"
              className="bg-[#F4B400] hover:bg-[#d69c00] text-black text-center py-3 rounded font-bold transition-all duration-300"
            >
              View Payment Proof
            </Link>
          )}

          <button
            type="button"
            onClick={handlePaymentProofUpdate}
            disabled={loading}
            className="bg-[#3AB8FF] hover:bg-[#1f91c7] text-black py-3 rounded font-bold transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Payment Proof"}
          </button>

          <button
            type="button"
            onClick={handleCloseDrawer}
            className="bg-red-600 hover:bg-red-800 text-white py-3 rounded font-bold transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
