import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// A single order card shown on the My Orders page.
//
// Props:
// - order: object with { id, restaurantName, restaurantImage, items, total, status, orderDate }
function OrderCard({ order }) {
  // Choose the badge color based on the order status
  const statusColors = {
    Delivered: "bg-green-50 text-green-700",
    Preparing: "bg-amber-50 text-amber-700",
    "Out for Delivery": "bg-blue-50 text-blue-700",
    Cancelled: "bg-red-50 text-primary",
  };

  // Build a short summary of the items, e.g. "2x Pizza, 1x Garlic Bread"
  const itemSummary = order.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ");

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-soft border border-gray-100 sm:flex-row sm:items-center">
      {/* Restaurant image */}
      <img
        src={order.restaurantImage}
        alt={order.restaurantName}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />

      {/* Details */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text">{order.restaurantName}</h3>
          {/* Status badge */}
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
              statusColors[order.status] || "bg-gray-100 text-gray-500"
            }`}
          >
            {order.status}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500 line-clamp-1">{itemSummary}</p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {order.orderDate} · ₹{order.total}
          </span>
          {/* View details link */}
          <Link
            to={`/order/${order.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-primary transition-all hover:gap-1.5"
          >
            View Details <FaArrowRight className="text-[9px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
