import * as React from "react";
import { Loader2 } from "lucide-react";
import { t } from "@/shared/constants/tokens";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", disabled, loading, onClick, style = {}, className = "", ...props }, ref) => {
    const h = { sm: "32px", md: "40px", lg: "48px" }[size];
    const px = { sm: "14px", md: "22px", lg: "32px" }[size];
    const fs = { sm: "0.8125rem", md: "0.9375rem", lg: "1rem" }[size];

    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      height: h,
      padding: `0 ${px}`,
      borderRadius: "999px",
      fontSize: fs,
      fontWeight: 600,
      fontFamily: "inherit",
      border: "none",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      transition: "all 150ms ease-out",
      outline: "none",
      opacity: disabled ? 0.48 : 1,
      whiteSpace: "nowrap",
      ...style,
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: { background: t.primary, color: t.textOnPrimary },
      secondary: { background: "transparent", color: t.primary, border: `1.5px solid ${t.primary}` },
      tertiary: { background: "transparent", color: t.primary },
      destructive: { background: t.error, color: "#fff" },
    };

    const hoverColors: Record<string, React.CSSProperties> = {
      primary: { background: t.primary500 },
      secondary: { background: t.primary50 },
      tertiary: { background: t.primary50 },
      destructive: { opacity: 0.9 },
    };

    return (
      <button
        ref={ref}
        style={{ ...baseStyle, ...variantStyles[variant] }}
        disabled={disabled || loading}
        onClick={onClick}
        onMouseEnter={e => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, hoverColors[variant]);
          }
        }}
        onMouseLeave={e => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, variantStyles[variant]);
          }
        }}
        className={`active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
