import * as React from "react";
import { Link, useLocation } from "react-router";
import { Info } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";

interface PlaceholderPageProps {
  title?: string;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      textAlign: "center",
      padding: "32px",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        backgroundColor: t.primary100, color: t.primary,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "24px",
      }}>
        <Info size={32} />
      </div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
        {title ?? "قريباً في درايَة"}
      </h1>
      <p style={{ fontSize: "0.9375rem", color: t.textSecondary, maxWidth: "480px", marginBottom: "24px", lineHeight: 1.6 }}>
        {description ?? `هذه الصفحة تحت التطوير الفعلي وسوف تتوفر ضمن التحديث القادم لمسار: ${currentPath}`}
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to={currentPath.includes("teacher") ? "/teacher/dashboard" : "/student/dashboard"}>
          <Button variant="primary">العودة للرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};
export default PlaceholderPage;
