import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ax-footer">
      <div className="ax-footer__wrap">
        <div className="ax-footer__left">
          © 2026 Aware X Now. All rights reserved.
        </div>

        <div className="ax-footer__right">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}