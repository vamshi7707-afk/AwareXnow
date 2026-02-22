import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import logo from '../assets/logo.png'

import VolunteerBg from '../assets/bglogin.png'

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
    //     <h2 className="pageTitle" style={{ marginBottom: 6 }}>Login</h2>
    //     <p className="pageSubtitle" style={{ marginBottom: 16 }}>
    //       Welcome back. Please login to continue.
    //     </p>

    //     <form onSubmit={handleSubmit} className="grid">
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
    //           placeholder="••••••••"
    //         />
    //       </div>

    //       <button className="button buttonPrimary" disabled={loading} type="submit">
    //         {loading ? "Logging in..." : "Login"}
    //       </button>
    //     </form>

    //     {msg && <div className="msg">{msg}</div>}

    //     <div style={{ marginTop: 12 }} className="smallMuted">
    //       Don’t have an account? <Link to="/register">Register</Link>
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
        <Card elevation={5} sx={{ width: "100%", borderRadius: 3 }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <img
                src={logo} // replace with your logo path
                alt="Logo"
                style={{ width: 200, objectFit: "contain" }}
              />
            </Box>
            {/* <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Login
          </Typography> */}
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Welcome back! Please Login to your account.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
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
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <a
                href="#"
                underline="hover"
                sx={{ display: "block", textAlign: "right", mb: 3 }}
              >
                Forgot Password?
              </a>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.8,
                  my: 1,
                  fontWeight: 600,
                  // backgroundColor: "#c91f2f",
                  // "&:hover": { backgroundColor: "#b31b2a" },
                }}
              >
                Login
              </Button>
            </Box>

            <div className="smallMuted" style={{ marginTop: 12 }}>
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
