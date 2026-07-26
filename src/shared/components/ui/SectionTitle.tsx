import * as React from "react";
import { t } from "@/shared/constants/tokens";

export interface SectionTitleProps {
  children: React.ReactNode;
  sub?: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  sub,
  action,
  style = {},
  className = "",
}) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        alignItems: action ? "center" : "flex-start",
        justifyContent: action ? "space-between" : "flex-start",
        gap: "16px",
        ...style,
      }}
      className={className}
    >
      <div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: t.textPrimary, marginBottom: sub ? "4px" : 0 }}>
          {children}
        </h2>
        {sub && <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
