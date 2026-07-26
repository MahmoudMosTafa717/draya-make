import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { t } from "@/shared/constants/tokens";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type = "text", error, icon, required, style = {}, className = "", ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%", ...style }} className={className}>
        {label && (
          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary, letterSpacing: "0.01em" }}>
            {label}
            {required && <span style={{ color: t.primary, marginRight: "3px" }}>*</span>}
          </label>
        )}
        <div style={{ position: "relative" }}>
          {icon && (
            <span style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", color: t.textSecondary, pointerEvents: "none" }}>
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            style={{
              width: "100%",
              height: "42px",
              padding: icon ? "0 40px 0 14px" : "0 14px",
              borderRadius: "8px",
              border: `1.5px solid ${error ? t.error : t.borderStrong}`,
              background: t.bgSurface,
              color: t.textPrimary,
              fontSize: "0.9375rem",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 150ms, box-shadow 150ms",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = t.primary500;
              e.currentTarget.style.boxShadow = `0 0 0 3px rgba(29,110,99,0.15)`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = error ? t.error : t.borderStrong;
              e.currentTarget.style.boxShadow = "none";
            }}
            {...props}
          />
        </div>
        {error && (
          <span style={{ fontSize: "0.75rem", color: t.error, display: "flex", alignItems: "center", gap: "4px" }}>
            <AlertTriangle size={11} /> {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
