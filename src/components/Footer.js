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
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}