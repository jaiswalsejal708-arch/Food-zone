import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
} from "react-icons/fa";
import OrderTimeline from "../components/orders/OrderTimeline";
import { getOrderById, orders } from "../utils/ordersData";

// The Order Details page.
// Reads the order id from the URL using useParams() and shows all details.
function OrderDetails() {
  // useParams() gives us the :id from the route /order/:id
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the order in the dummy data.
  // We try the helper first, then fall back to matching by id.
  const order = getOrderById(id) || orders.find((o) => o.id === id);

  // If no order is found, show a message
  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-gray-500">Order not found.</p>
        <Link
          to="/orders"
          className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c42f3b]"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition-colors hover:text-primary"
      >
        <FaArrowLeft /> Back to Orders
      </button>

      {/* Order header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text sm:text-2xl">
            Order Details
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Order #{order.id} · {order.orderDate}
          </p>
        </div>
        {/* Download invoice button (UI only) */}
        <button
          onClick={() => alert("Invoice download is a UI demo only.")}
          className="flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-xs font-medium text-primary bg-white transition-colors hover:bg-primary hover:text-white"
        >
          <FaDownload /> Download Invoice
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: restaurant + items + address + timeline */}
        <div className="space-y-6 lg:col-span-2">
          {/* Restaurant info */}
          <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-soft border border-gray-100">
            <img
              src={order.restaurantImage}
              alt={order.restaurantName}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-sm font-bold text-text">
                {order.restaurantName}
              </h2>
              <p className="text-xs text-gray-500">
                Delivery in {order.deliveryTime}
              </p>
            </div>
          </div>

          {/* Ordered items */}
          <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
            <h3 className="mb-4 text-sm font-bold text-text">Ordered Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0 text-xs"
                >
                  <div>
                    <p className="font-medium text-text">{item.name}</p>
                    <p className="text-gray-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-text">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery address */}
          <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
            <h3 className="mb-4 text-sm font-bold text-text">
              Delivery Address
            </h3>
            <p className="flex items-start gap-2 text-xs text-gray-600">
              <FaMapMarkerAlt className="mt-0.5 text-primary shrink-0" />
              {order.address}
            </p>
            <p className="mt-3 flex items-center gap-2 text-xs text-gray-600">
              <FaPhone className="text-primary shrink-0" /> {order.phone}
            </p>
          </div>

          {/* Order timeline (tracking) */}
          <OrderTimeline
            steps={order.timeline}
            currentStep={order.currentStep}
          />
        </div>

        {/* Right: payment + order summary */}
        <div className="space-y-6">
          {/* Payment method */}
          <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
            <h3 className="mb-4 text-sm font-bold text-text">
              Payment Method
            </h3>
            <p className="flex items-center gap-2 text-xs text-gray-600">
              <FaCreditCard className="text-primary" /> {order.paymentMethod}
            </p>
          </div>

          {/* Bill summary */}
          <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
            <h3 className="mb-4 text-sm font-bold text-text">Bill Summary</h3>
            <div className="space-y-3 text-xs">
              {/* Items total */}
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span className="font-medium text-text">
                  ₹{order.total - 40}
                </span>
              </div>
              {/* Delivery fee */}
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-text">₹40</span>
              </div>
              {/* Divider */}
              <div className="border-t border-gray-100"></div>
              {/* Total */}
              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-text">Total Paid</span>
                <span className="text-base font-bold text-primary">
                  ₹{order.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
