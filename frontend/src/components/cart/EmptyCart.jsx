import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Shown on the Cart page when there are no items.
// Displays a friendly illustration and a button to browse restaurants.
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Cart icon inside a circle */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <FaShoppingCart className="text-4xl text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-text">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Looks like you haven't added any food yet. Explore restaurants and add
        your favorite dishes!
      </p>

      {/* Button to go to restaurants page */}
      <Link
        to="/restaurants"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c42f3b]"
      >
        Browse Restaurants
        <FaArrowRight />
      </Link>
    </div>
  );
}

export default EmptyCart;
