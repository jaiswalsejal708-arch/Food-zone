// A reusable order summary box.
// Shows subtotal, delivery fee, taxes, discount and the grand total.
// Used on the Cart, Checkout, and Payment pages.
//
// Props:
// - subtotal: number
// - deliveryFee: number
// - tax: number
// - discount: number (optional, default 0)
// - total: number (the final amount)
function OrderSummary({ subtotal, deliveryFee, tax, discount = 0, total }) {
  // Helper to format a number as Indian Rupees
  const format = (amount) => `₹${amount}`;

  return (
    <div className="rounded-xl bg-white p-6 shadow-soft border border-gray-100">
      <h3 className="text-base font-bold text-text">Order Summary</h3>

      {/* Bill rows */}
      <div className="mt-4 space-y-3 text-xs">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-text">{format(subtotal)}</span>
        </div>

        {/* Delivery fee */}
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-text">{format(deliveryFee)}</span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between text-gray-600">
          <span>Taxes & Charges</span>
          <span className="font-semibold text-text">{format(tax)}</span>
        </div>

        {/* Discount (only show if there is one) */}
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- {format(discount)}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100"></div>

      {/* Grand total */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-text">Grand Total</span>
        <span className="text-base font-bold text-primary">{format(total)}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
