// A single collection card (e.g. "Trending This Week").
// Shows a big image with the title and place count overlaid.
//
// Props:
// - collection: object with { id, title, places, image }
function CollectionCard({ collection }) {
  return (
    <div className="group relative h-60 w-64 shrink-0 overflow-hidden rounded-xl shadow-soft">
      {/* Background image — no zoom on hover */}
      <img
        src={collection.image}
        alt={collection.title}
        className="h-full w-full object-cover"
      />

      {/* Dark gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"></div>

      {/* Text at the bottom */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-base font-semibold">{collection.title}</h3>
        <p className="mt-0.5 text-xs text-gray-300">{collection.places} Places</p>
      </div>
    </div>
  );
}

export default CollectionCard;
