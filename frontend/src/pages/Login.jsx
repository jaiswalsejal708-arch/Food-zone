import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaSpinner,
} from "react-icons/fa";
import { loginUser } from "../services/authApi";

// The Login page.
// A simple card with email and password fields.
// On submit it calls the backend login API and saves the JWT.
//
// Props (from App.jsx):
// - onLogin: function called with the user object after a successful login
function Login({ onLogin }) {
  // State for the two input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Loading state (while the API request is in progress)
  const [loading, setLoading] = useState(false);
  // Error message from the API (shown in red below the form)
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Check if we were redirected here with a success message (e.g. after register)
  const successMessage = location.state?.message;

  // Called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from reloading
    setLoading(true);
    setError("");

    try {
      // Call the login API function.
      // It sends email + password to the backend and saves the JWT
      // to localStorage on success.
      const user = await loginUser(email, password);

      // Tell App.jsx that the user is now logged in (updates Navbar)
      onLogin(user);

      // Redirect to the profile page
      navigate("/profile");
    } catch (err) {
      // The error message comes from the backend response.
      // Axios puts the server's response body in err.response.data.message
      setError(
        err.response?.data?.message || "Login failed. Check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-soft border border-gray-100">
        {/* Logo + heading */}
        <div className="mb-6 text-center">
          <FaUtensils className="mx-auto text-2xl text-primary" />
          <h1 className="mt-2 text-xl font-bold text-text">Welcome Back</h1>
          <p className="text-xs text-gray-500">Login to your account</p>
        </div>

        {/* Success message (e.g. after registering) */}
        {successMessage && (
          <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-center text-xs text-green-700 border border-green-100">
            {successMessage}
          </div>
        )}

        {/* Error message (e.g. wrong password) */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center text-xs text-primary border border-red-100">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <FaEnvelope className="text-gray-400 text-sm" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none text-text placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <FaLock className="text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm outline-none text-text placeholder-gray-400"
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-primary"
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Submit button — shows spinner while loading */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c42f3b] disabled:opacity-60"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-xs" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Link to register page */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
