import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/Header.css";
import HowToPlay from "./HowToPlay";

const Header = () => {
  const { user, logout } = useAuth();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const location = useLocation();
  
  // Check current path
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="header-logo-span">
            W<span className="header-logo-o">O</span>RDLE
          </span>
        </Link>

        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="dark-mode-toggle-wrapper">
              <DarkModeToggle />
            </li>
            {user ? (
              <>
                <li>
                  <button
                    onClick={() => setShowHowToPlay(true)}
                    className="header-button header-button-icon"
                    aria-label="How to play"
                  >
                    Help
                  </button>
                </li>
                <li>
                  <Link to="/stats" className="header-button">
                    Stats
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="header-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {!isLoginPage && (
                  <li>
                    <Link to="/login" className="header-button">
                      Login
                    </Link>
                  </li>
                )}
                {!isRegisterPage && (
                  <li>
                    <Link to="/register" className="header-button">
                      Register
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
      <HowToPlay
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </header>
  );
};

export default Header;
