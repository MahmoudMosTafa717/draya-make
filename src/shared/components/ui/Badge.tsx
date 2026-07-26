import * as React from "react";
import { Sparkles } from "lucide-react";
import { t } from "@/shared/constants/tokens";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "ai" | "draft" | "primary";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "info",
  size = "sm",
  style = {},
  className = "",
  ...props
}) => {
  const colors: Record<string, { bg: string; color: string }> = {
    success: { bg: "rgba(34, 197, 94, 0.12)",  color: t.success },
    warning: { bg: "rgba(245, 158, 11, 0.12)",  color: t.warning },
    error:   { bg: "rgba(239, 68, 68, 0.12)",   color: t.error   },
    info:    { bg: "rgba(59, 130, 246, 0.12)",  color: t.info    },
    ai:      { bg: "rgba(124, 58, 237, 0.12)",  color: t.ai      },
    draft:   { bg: t.bgMuted,                    color: t.textSecondary },
    primary: { bg: t.primary100,                 color: t.primary },
  };

  const { bg, color } = colors[variant] || colors.info;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: size === "sm" ? "2px 9px" : "4px 11px",
    borderRadius: "999px",
    background: bg,
    color,
    fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    ...style,
  };

  return (
    <span style={baseStyle} className={className} {...props}>
      {variant === "ai" && <Sparkles size={10} />}
      {children}
    </span>
  );
};
export { Sparkles };
