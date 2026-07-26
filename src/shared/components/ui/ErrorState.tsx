import * as React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { t } from "@/shared/constants/tokens";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "حدث خطأ ما",
  message = "فشل تحميل البيانات. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
  onRetry,
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
        background: "rgba(239, 68, 68, 0.04)",
        borderRadius: "12px",
        border: `1px solid rgba(239, 68, 68, 0.15)`,
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
      className={className}
    >
      <div style={{ color: t.error, marginBottom: "16px" }}>
        <AlertCircle size={48} strokeWidth={1.5} />
      </div>
      <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.875rem", color: t.textSecondary, maxWidth: "360px", marginBottom: "20px", lineHeight: 1.5 }}>
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" size="md" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
};
