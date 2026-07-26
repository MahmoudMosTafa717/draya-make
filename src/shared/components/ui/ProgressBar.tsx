import * as React from "react";
import { t } from "@/shared/constants/tokens";

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color,
  style = {},
  className = "",
}) => {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: "100%",
        height: "6px",
        borderRadius: "999px",
        background: t.primary100,
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: "999px",
          background: color ?? t.primary,
          transition: "width 300ms var(--draya-ease-out)",
        }}
      />
    </div>
  );
};
