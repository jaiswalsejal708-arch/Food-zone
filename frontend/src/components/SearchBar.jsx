import { FaSearch } from "react-icons/fa";

// A reusable search bar.
// Controlled component: the parent owns the text via props.
//
// Props:
// - value: current search text
// - onChange: function called when the user types
// - placeholder: placeholder text
function SearchBar({ value, onChange, placeholder = "Search for restaurants..." }) {
  return (
    <div className="w-full max-w-2xl">
      {/* The white container with border */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        {/* Search icon */}
        <FaSearch className="text-gray-400 shrink-0" />

        {/* The actual input field */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-text placeholder-gray-400 outline-none text-sm"
        />
      </div>
    </div>
  );
}

export default SearchBar;
