import * as React from "react";
import { t } from "@/shared/constants/tokens";

export interface FloatBadgeProps {
  value: string;
  label: string;
  style?: React.CSSProperties;
}

export function FloatBadge({ value, label, style: s = {} }: FloatBadgeProps) {
  return (
    <div style={{
      background: t.bgSurface, borderRadius: "12px",
      padding: "10px 16px", boxShadow: t.shadow3,
      border: `1px solid ${t.border}`,
      position: "absolute", whiteSpace: "nowrap",
      backdropFilter: "blur(8px)",
      ...s,
    }}>
      <div style={{ fontSize: "1.375rem", fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: "0.6875rem", color: t.textSecondary, marginTop: "3px", fontWeight: 500 }}>{label}</div>
    </div>
  );
}
