import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
    <div style={{ borderBottom: "1px solid #e5e7eb", background: "#ffffff" }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: 18,
              color: "#111827",
              whiteSpace: "nowrap",
            }}
          >
            AwareXNow
          </Link>

          <Link to="/">Home</Link>

          {user && (
            <>
              <Link to="/create">Create Campaign</Link>
              <Link to="/my-campaigns">My Campaigns</Link>
              {role === "ADMIN" && <Link to="/admin">Admin</Link>}
            </>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {user ? (
            <>
              <span style={{ fontSize: 13, color: "#374151" }}>
                👋 {username || "User"}
              </span>
              <button className="button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="button" to="/login">
                Login
              </Link>
              <Link className="button buttonPrimary" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
