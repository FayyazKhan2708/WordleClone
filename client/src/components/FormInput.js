import React from "react";
import "../styles/FormInput.css";

const FormInput = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  icon,
  error,
  showPassword,
  toggleShowPassword,
  className,
}) => {
  return (
    <div className="form-input-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="form-input-icon-wrapper">{icon}</div>}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? "form-input-error" : ""} ${
            className || ""
          }`}
          placeholder={placeholder}
        />
        {toggleShowPassword && (
          <div className="form-password-toggle">
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="form-input-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="form-input-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      {error && typeof error === "string" && (
        <p className="form-error-message">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
