import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function normalizeMobile(input) {
    // Keep digits only (simple validation for prototype)
    return input.replace(/\D/g, "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    const u = username.trim();
    const m = normalizeMobile(mobile);

    if (!u) {
      setMsg("❌ Username is required.");
      return;
    }

    if (!m || m.length < 8) {
      setMsg("❌ Please enter a valid mobile number.");
      return;
    }

    if (!email.trim() || !password) {
      setMsg("❌ Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      // 1) Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      // 2) Create profile doc in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        username: u,
        mobile: m,
        email: email.trim(),
        role: "USER",
        createdAt: serverTimestamp(),
      });

      nav("/");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="centerPage">
      <div className="card cardPad centerCard">
        <h2 className="pageTitle">Register</h2>
        <p className="pageSubtitle">
          Create an account to submit campaigns.
        </p>

        <form onSubmit={handleSubmit} className="grid">
          <div>
            <div className="label">Username</div>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

          <div>
            <div className="label">Mobile number</div>
            <input
              className="input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="e.g. 0412345678"
              inputMode="numeric"
            />
            <div className="smallMuted" style={{ marginTop: 6 }}>
              Digits only (for prototype).
            </div>
          </div>

          <div>
            <div className="label">Email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="label">Password</div>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
          </div>

          <button className="button buttonPrimary" disabled={loading} type="submit">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {msg && <div className="msg">{msg}</div>}

        <div className="smallMuted" style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
