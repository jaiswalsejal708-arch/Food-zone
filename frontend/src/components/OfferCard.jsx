import { FaTag } from "react-icons/fa";

// A single offer card shown in the Offers section.
//
// Props:
// - offer: object with { id, title, subtitle, code, image }
function OfferCard({ offer }) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-soft">
      {/* Background image — no zoom on hover */}
      <img
        src={offer.image}
        alt={offer.title}
        className="h-40 w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Offer text */}
      <div className="absolute inset-0 flex flex-col justify-center p-5 text-white">
        <FaTag className="text-accent text-lg" />
        <h3 className="mt-2 text-lg font-bold">{offer.title}</h3>
        <p className="text-sm text-gray-200">{offer.subtitle}</p>

        {/* Promo code pill */}
        <span className="mt-3 w-fit rounded-full border border-accent/60 bg-accent/20 px-3 py-0.5 text-xs font-semibold text-accent">
          Code: {offer.code}
        </span>
      </div>
    </div>
  );
}

export default OfferCard;
