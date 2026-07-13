import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUtensils,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import Button from "./Button";
import { NAV_LINKS, APP_NAME } from "../utils/constants";

// The sticky top navbar.
// Shows logo, nav links, cart icon with badge, and auth buttons.
//
// Props:
// - cartCount: number of items currently in the cart
// - user: the logged-in user object { id, name, email } or null
// - onLogout: function to call when the Logout button is clicked
function Navbar({ cartCount, user, onLogout }) {
  // State that controls the mobile menu (open / closed)
  const [isOpen, setIsOpen] = useState(false);

  // useNavigate lets us redirect after logout
  const navigate = useNavigate();

  // Helper to close the mobile menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  // Called when the Logout button is clicked.
  // Calls the onLogout prop (which removes the token + clears user state)
  // then navigates to the home page.
  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo (clicking goes to Home) */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <FaUtensils className="text-primary text-xl" />
          <span className="text-lg font-bold text-text">{APP_NAME}</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {/* My Orders link (protected — only shows if logged in) */}
          {user && (
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`
                }
              >
                Orders
              </NavLink>
            </li>
          )}
        </ul>

        {/* Desktop right side: cart + auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Cart icon with item count badge */}
          <Link
            to="/cart"
            className="relative rounded-xl p-2 text-gray-600 transition-colors hover:text-primary"
            aria-label="Cart"
          >
            <FaShoppingCart className="text-xl" />
            {/* Badge — only shown when there are items */}
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Conditional auth buttons:
              - If user is logged in → show Profile + Logout
              - If not logged in     → show Login + Register */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
              >
                <FaUserCircle className="text-lg text-primary" />
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Button to="/login" variant="outline">
                Login
              </Button>
              <Button to="/register" variant="primary">
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile right side: cart icon + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/cart"
            onClick={closeMenu}
            className="relative p-2 text-gray-600"
            aria-label="Cart"
          >
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
          <button
            className="text-xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-primary ${
                      isActive ? "text-primary bg-primary/5" : "text-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {/* Orders link (only if logged in) */}
            {user && (
              <li>
                <NavLink
                  to="/orders"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 hover:text-primary ${
                      isActive ? "text-primary bg-primary/5" : "text-gray-700"
                    }`
                  }
                >
                  Orders
                </NavLink>
              </li>
            )}

            {/* Mobile auth section */}
            <li className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <FaUserCircle className="text-primary text-lg" />
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl border border-primary py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Button to="/login" variant="outline" onClick={closeMenu}>
                    Login
                  </Button>
                  <Button to="/register" variant="primary" onClick={closeMenu}>
                    Register
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
