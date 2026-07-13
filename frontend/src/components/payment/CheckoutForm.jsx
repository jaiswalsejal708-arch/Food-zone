import { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import PaymentCard from "./PaymentCard";

// The checkout form shown on the Payment page.
// It switches between the card form and the UPI form depending on the method.
//
// Props:
// - method: the selected payment method id ("credit-card", "upi", etc.)
// - total: the amount to pay
// - onPay: function called when the Pay button is clicked
function CheckoutForm({ method, total, onPay }) {
  // Card form state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // UPI state
  const [upiId, setUpiId] = useState("");

  // Common payment button
  const payButton = (
    <button
      onClick={onPay}
      className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c42f3b]"
    >
      Pay ₹{total} Now
    </button>
  );

  // If the method is a card type, show the card form
  if (method === "credit-card" || method === "debit-card") {
    return (
      <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
        <h3 className="text-sm font-bold text-text mb-4">Card Details</h3>

        {/* Visual card preview */}
        <div className="flex justify-center mb-6">
          <PaymentCard cardNumber={cardNumber} cardName={cardName} />
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Card holder name */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text">
              Card Holder Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className="input-field"
            />
          </div>

          {/* Card number */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text">
              Card Number
            </label>
            <input
              type="text"
              maxLength="16"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="1234567890123456"
              className="input-field"
            />
          </div>

          {/* Expiry + CVV (side by side) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-text">
                Expiry
              </label>
              <input
                type="text"
                maxLength="5"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-text">
                CVV
              </label>
              <input
                type="password"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="•••"
                className="input-field"
              />
            </div>
          </div>

          {/* Pay button */}
          {payButton}
        </div>
      </div>
    );
  }

  // If the method is UPI, show the UPI form
  if (method === "upi") {
    return (
      <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
        <h3 className="text-sm font-bold text-text mb-4">Pay with UPI</h3>

        <div className="space-y-4">
          {/* UPI ID input */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text">
              Enter UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="input-field"
            />
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-[10px] font-bold text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* QR code placeholder */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-36 w-36 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-background">
              <FaQrcode className="text-4xl text-gray-300" />
            </div>
            <p className="text-xs text-gray-500 mb-2">Scan QR to pay</p>
          </div>

          {/* Pay button */}
          {payButton}
        </div>
      </div>
    );
  }

  // For all other methods (Google Pay, PhonePe, Paytm, COD, Wallet)
  // show a simple message + pay button
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-soft border border-gray-100">
      <p className="text-xs text-gray-500 mb-6">
        You will be redirected to complete the payment.
      </p>
      {payButton}
    </div>
  );
}

export default CheckoutForm;
