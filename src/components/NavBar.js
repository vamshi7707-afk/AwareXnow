import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./NavBar.css";

export default function NavBar({ user, role, onLogout }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function loadUsername() {
      if (!user) {
        setUsername("");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUsername(snap.data().username || "");
        }
      } catch (e) {
        console.error("Failed to load username", e);
      }
    }

    loadUsername();
  }, [user]);

  return (
    <header className="ax-nav">
      <div className="ax-nav__container">
        {/* Logo */}
        <Link className="ax-brand" to="/">
          <img
            src={logo}
            alt="Aware X Now Logo"
            className="ax-brand__img"
          />
        </Link>

        {/* Right Side */}
        <nav className="ax-links">
          <Link to="/">Home</Link>

          {user && (
            <>
              <Link to="/create">Create Campaign</Link>
              <Link to="/my-campaigns">My Campaigns</Link>
              {role === "ADMIN" && <Link to="/admin">Admin</Link>}
            </>
          )}

          {user ? (
            <>
              <span className="ax-user">
                {username || user.displayName || user.email}
              </span>
              <button className="ax-logout" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="ax-login" to="/login">
                Login
              </Link>
              <Link className="ax-signup" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}