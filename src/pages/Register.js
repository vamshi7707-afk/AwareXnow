import { useState } from "react";
import { registerUser } from "../auth/authDb";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await registerUser({ username, email, password });
    navigate("/");
  }

  return (
    <div className="container narrow">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className="btnPrimary">Continue</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
