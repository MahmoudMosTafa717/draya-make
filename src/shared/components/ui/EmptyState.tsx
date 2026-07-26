import * as React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";
import { t } from "@/shared/constants/tokens";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  style = {},
  className = "",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "48px 24px",
        background: t.bgSecondary,
        borderRadius: "12px",
        border: `1px dashed ${t.borderStrong}`,
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
      className={className}
    >
      <div style={{ color: t.textDisabled, marginBottom: "16px" }}>
        {icon ?? <FolderOpen size={48} strokeWidth={1.5} />}
      </div>
      <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: "0.875rem", color: t.textSecondary, maxWidth: "320px", marginBottom: "20px", lineHeight: 1.5 }}>
          {description}
        </p>
      )}
      {actionText && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
