import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaShoppingBag } from "react-icons/fa";

// The Order Success page.
// Shown after a successful payment.
// Reads the order info passed from the Payment page via useLocation().
function OrderSuccess() {
  const location = useLocation();

  // Read the order info passed from the Payment page
  const orderNumber = location.state?.orderNumber || "ORD-0000";
  const total = location.state?.total || 0;
  const paymentMethod = location.state?.paymentMethod || "Card";

  // A random estimated delivery time (between 25 and 45 minutes)
  const eta = 25 + Math.floor(Math.random() * 21);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      {/* Large success icon */}
      <FaCheckCircle className="animate-[fadeIn_0.5s_ease] text-6xl text-green-500" />

      {/* Success message */}
      <h1 className="mt-6 text-2xl font-bold text-text">
        Order Placed Successfully!
      </h1>
      <p className="mt-2 text-xs text-gray-500 max-w-sm">
        Thank you for ordering with Food Zone. Your food is on the way!
      </p>

      {/* Order info card */}
      <div className="mt-8 w-full max-w-sm rounded-xl bg-white p-6 shadow-soft border border-gray-100">
        {/* Order number */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-xs">
          <span className="text-gray-500">Order Number</span>
          <span className="font-semibold text-text">{orderNumber}</span>
        </div>

        {/* Estimated delivery time */}
        <div className="flex items-center justify-between border-b border-gray-100 py-4 text-xs">
          <span className="flex items-center gap-2 text-gray-500">
            <FaClock className="text-primary" /> Estimated Delivery
          </span>
          <span className="font-semibold text-text">{eta} minutes</span>
        </div>

        {/* Amount paid */}
        <div className="flex items-center justify-between pt-4 text-xs">
          <span className="text-gray-500">Amount Paid</span>
          <span className="font-semibold text-primary">₹{total}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {/* Track order button */}
        <Link
          to={`/order/${orderNumber}`}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c42f3b]"
        >
          Track Order
        </Link>

        {/* Continue shopping button */}
        <Link
          to="/restaurants"
          className="flex items-center gap-2 rounded-xl border border-primary px-6 py-2.5 text-sm font-medium text-primary bg-white transition-colors hover:bg-primary hover:text-white"
        >
          <FaShoppingBag className="text-xs" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
