import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../auth/authDb";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <header className="header">
      <Link className="brand" to="/">AwarexNow</Link>

      <nav className="nav">
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        ) : (
          <>
            <span className="userTag">{user.displayName || user.email}</span>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
