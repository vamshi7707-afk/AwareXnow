import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";

import logo from '../assets/logo.png'
import VolunteerBg from '../assets/bglogin.png'

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
    // <div className="centerPage">
    //   <div className="card cardPad centerCard">
    //     <h2 className="pageTitle">Register</h2>
    //     <p className="pageSubtitle">
    //       Create an account to submit campaigns.
    //     </p>

    //     <form onSubmit={handleSubmit} className="grid">
    //       <div>
    //         <div className="label">Username</div>
    //         <input
    //           className="input"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           placeholder="Choose a username"
    //         />
    //       </div>

    //       <div>
    //         <div className="label">Mobile number</div>
    //         <input
    //           className="input"
    //           value={mobile}
    //           onChange={(e) => setMobile(e.target.value)}
    //           placeholder="e.g. 0412345678"
    //           inputMode="numeric"
    //         />
    //         <div className="smallMuted" style={{ marginTop: 6 }}>
    //           Digits only (for prototype).
    //         </div>
    //       </div>

    //       <div>
    //         <div className="label">Email</div>
    //         <input
    //           className="input"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="you@example.com"
    //         />
    //       </div>

    //       <div>
    //         <div className="label">Password</div>
    //         <input
    //           className="input"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="Minimum 6 characters"
    //         />
    //       </div>

    //       <button className="button buttonPrimary" disabled={loading} type="submit">
    //         {loading ? "Creating account..." : "Register"}
    //       </button>
    //     </form>

    //     {msg && <div className="msg">{msg}</div>}

    //     <div className="smallMuted" style={{ marginTop: 12 }}>
    //       Already have an account? <Link to="/login">Login</Link>
    //     </div>
    //   </div>
    // </div>

    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${VolunteerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,

      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >

        <Card
          elevation={6}
          sx={{
            maxWidth: 450,
            width: "100%",
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            {/* <Typography
            variant="h4"
            fontWeight={700}
            align="center"
            gutterBottom
          >
            Register
          </Typography> */}
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <img
                src={logo} // replace with your logo path
                alt="Logo"
                style={{ width: 200, objectFit: "contain" }}
              />
            </Box>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Create your account to get started.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="User name"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                label="Mobile"
                type="phone"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />


              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.8,
                  fontWeight: 600,
                }}
              >
                Register
              </Button>
            </Box>

            <div className="smallMuted" style={{ marginTop: 12 }}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

