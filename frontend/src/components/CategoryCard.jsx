// A single food category card.
// Shows a circular image with the category name below it.
//
// Props:
// - category: object with { id, name, image }
function CategoryCard({ category }) {
  return (
    <button className="flex flex-col items-center gap-2.5 group">
      {/* Circular image with subtle hover ring */}
      <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-200 group-hover:ring-primary sm:h-24 sm:w-24">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Category name */}
      <span className="text-xs font-medium text-gray-600 transition-colors group-hover:text-primary sm:text-sm">
        {category.name}
      </span>
    </button>
  );
}

export default CategoryCard;
