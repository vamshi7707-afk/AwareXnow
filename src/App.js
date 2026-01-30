// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { ensureUserProfile, getMyRole } from "./api/roleApi";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import MyCampaignsPage from "./pages/MyCampaignsPage";
import AdminReviewPage from "./pages/AdminReviewPage";

function RequireAuth({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ user, role, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "ADMIN") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("GUEST");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        // ensure users/{uid} exists
        await ensureUserProfile();
        const r = await getMyRole();
        setRole(r);
      } else {
        setRole("GUEST");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;

  return (
    <BrowserRouter>
      <NavBar user={user} role={role} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />

        <Route
          path="/create"
          element={
            <RequireAuth user={user}>
              <CreateCampaignPage />
            </RequireAuth>
          }
        />

        <Route
          path="/my-campaigns"
          element={
            <RequireAuth user={user}>
              <MyCampaignsPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAdmin user={user} role={role}>
              <AdminReviewPage />
            </RequireAdmin>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
