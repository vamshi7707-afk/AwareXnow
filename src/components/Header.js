import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../auth/authDb";
import "./Header.css";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <header className="ax-header">
      <div className="ax-header__container">
        {/* Logo */}
        <Link className="ax-brand" to="/">
          <span className="ax-brand__logo">🏠</span>
          <span className="ax-brand__text">AwareXnow</span>
        </Link>

        {/* Navigation */}
        <nav className="ax-nav">
          <Link to="/">Home</Link>
          <Link to="/causes">Causes</Link>
          <Link to="/small-business">Small Business</Link>
          <Link to="/contact">Contact</Link>

          {!user ? (
            <>
              <Link className="ax-login" to="/login">Login</Link>
              <Link className="ax-signup" to="/register">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="ax-user">
                {user.displayName || user.email}
              </span>

              <button className="ax-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}