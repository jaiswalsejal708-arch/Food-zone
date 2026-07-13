import { Link } from "react-router-dom";
import { FaReceipt } from "react-icons/fa";
import OrderCard from "../components/orders/OrderCard";
import { orders } from "../utils/ordersData";

// The My Orders page.
// Shows a list of all previous orders as cards.
function Orders() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-8 flex items-center gap-3">
        <FaReceipt className="text-xl text-primary" />
        <h1 className="text-xl font-bold text-text sm:text-2xl">My Orders</h1>
      </div>

      {/* If there are no orders, show a message */}
      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-gray-500">No orders yet.</p>
          <Link
            to="/restaurants"
            className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c42f3b]"
          >
            Browse Restaurants
          </Link>
        </div>
      ) : (
        // Otherwise, show all order cards
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
