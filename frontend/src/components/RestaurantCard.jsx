import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// A single restaurant card.
// Shows image, name, rating, cuisine, location, delivery time, price and badges.
// Clicking the card navigates to /restaurant/:id.
//
// Props:
// - restaurant: object with all restaurant fields
function RestaurantCard({ restaurant }) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-soft transition-shadow duration-200 hover:shadow-card"
    >
      {/* Restaurant image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />

        {/* Offer badge (top-left) */}
        {restaurant.offer && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">
            {restaurant.offer}
          </span>
        )}

        {/* Open / Closed badge (top-right) */}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            restaurant.isOpen
              ? "bg-green-500 text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          {restaurant.isOpen ? "Open Now" : "Closed"}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-semibold text-text transition-colors group-hover:text-primary">
          {restaurant.name}
        </h3>

        {/* Rating + Cuisine */}
        <div className="mt-2 flex items-center justify-between">
          {/* Rating with star icon */}
          <span className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
            <FaStar className="text-amber-500" />
            {restaurant.rating}
          </span>

          {/* Price for two */}
          <span className="text-xs text-gray-500">
            ₹{restaurant.priceForTwo} for two
          </span>
        </div>

        {/* Cuisine */}
        <p className="mt-1.5 text-xs text-gray-500">{restaurant.cuisine}</p>

        {/* Location + Delivery time */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-primary" />
            {restaurant.location}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-primary" />
            {restaurant.deliveryTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
