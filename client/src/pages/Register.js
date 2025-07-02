import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "../components/FormInput";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const { register, token, loading, error } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Check password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordFeedback("");
      return;
    }

    // Simple password strength check
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback.push("Use at least 8 characters");
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Add uppercase letters");
    }

    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Add numbers");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("Add special characters");
    }

    setPasswordStrength(strength);
    setPasswordFeedback(feedback.length > 0 ? feedback[0] : "");
  }, [password]);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await register(username, email, password);
    }
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "register-password-strength-value-weak";
    if (passwordStrength === 3)
      return "register-password-strength-value-moderate";
    return "register-password-strength-value-strong";
  };

  const getPasswordBarClass = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2)
      return "register-password-strength-progress-weak";
    if (passwordStrength === 3)
      return "register-password-strength-progress-moderate";
    return "register-password-strength-progress-strong";
  };

  // SVG icons
  const usernameIcon = (
    <svg
      className="form-input-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const emailIcon = (
    <svg
      className="form-input-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  );

  const passwordIcon = (
    <svg
      className="form-input-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  return (
    <div className="register-container">
      <div className="register-card-wrapper">
        {/* Decorative elements */}
        <div className="register-decorative-circle register-decorative-circle-1"></div>
        <div className="register-decorative-circle register-decorative-circle-2"></div>

        <div className="register-card">
          <div className="text-center">
            <div className="register-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="register-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <h1 className="register-heading">Create Account</h1>
            <p className="register-subheading">
              Join the Wordle community today
            </p>
          </div>

          {error && (
            <div className="register-error">
              <svg
                className="register-error-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <FormInput
                id="username"
                name="username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                autoComplete="username"
                icon={usernameIcon}
                error={errors.username}
              />
            </div>

            <div className="form-row">
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
                icon={emailIcon}
                error={errors.email}
              />
            </div>

            <div className="form-row">
              <FormInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                icon={passwordIcon}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
                error={errors.password}
              />
              {password && (
                <div className="register-password-strength">
                  <div className="register-password-strength-header">
                    <span className="register-password-strength-text">
                      Password strength:
                    </span>
                    <span
                      className={`register-password-strength-value ${getPasswordStrengthClass()}`}
                    >
                      {passwordStrength <= 2
                        ? "Weak"
                        : passwordStrength === 3
                        ? "Moderate"
                        : "Strong"}
                    </span>
                  </div>
                  <div className="register-password-strength-bar">
                    <div
                      className={`register-password-strength-progress ${getPasswordBarClass()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  {passwordFeedback && (
                    <p className="register-password-hint">{passwordFeedback}</p>
                  )}
                </div>
              )}
            </div>

            <div className="form-row">
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                icon={passwordIcon}
                showPassword={showConfirmPassword}
                toggleShowPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={errors.confirmPassword}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="register-button"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="register-spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <div className="register-footer">
            <div className="text-center">
              <p className="register-footer-text">Already have an account?</p>
              <Link to="/login" className="register-footer-link">
                Sign in to your account →
              </Link>
            </div>
          </div>
        </div>

        <div className="register-terms">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </div>
      </div>
    </div>
  );
};

export default Register;
