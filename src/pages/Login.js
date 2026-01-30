import { useState } from "react";
import { loginUser } from "../auth/authDb";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await loginUser({ email, password });
    navigate("/");
  }

  return (
    <div className="container narrow">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className="btnPrimary">Continue</button>
      </form>
      <p>Don’t have an account? <Link to="/register">Sign up</Link></p>
    </div>
  );
}
