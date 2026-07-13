import { FaCreditCard } from "react-icons/fa";

// A styled card that visually represents a credit/debit card.
// Used at the top of the card payment form.
//
// Props:
// - cardNumber: the card number string (may be partial while typing)
// - cardName: the card holder name
function PaymentCard({ cardNumber, cardName }) {
  // Format the number into groups of 4 for display
  const display = (cardNumber || "").padEnd(16, "•");
  const groups = display.match(/.{1,4}/g) || [];

  return (
    <div className="relative h-44 w-full max-w-xs overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[#b02028] p-5 text-white shadow-soft">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10"></div>

      <div className="relative flex h-full flex-col justify-between">
        {/* Top row: chip + icon */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-8 rounded bg-accent/80"></div>
          <FaCreditCard className="text-xl text-white/80" />
        </div>

        {/* Card number */}
        <div className="tracking-widest mt-2">
          <p className="text-base font-semibold sm:text-lg">
            {groups.join(" ")}
          </p>
        </div>

        {/* Bottom row: name */}
        <div className="mt-auto">
          <p className="text-[9px] uppercase text-white/60">Card Holder</p>
          <p className="text-xs font-medium truncate uppercase">{cardName || "YOUR NAME"}</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
