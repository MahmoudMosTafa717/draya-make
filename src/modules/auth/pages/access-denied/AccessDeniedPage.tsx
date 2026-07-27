import * as React from "react";
import { useNavigate } from "react-router";
import { ShieldAlert, ArrowRight, User, GraduationCap } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const [mockRole, setMockRole] = React.useState<"teacher" | "student">("student");

  const handleBackToDashboard = () => {
    if (mockRole === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: t.bgSecondary,
      padding: "24px",
      direction: "rtl",
    }}>
      {/* Centered White Card matching EmptyState / Status card styles */}
      <div style={{
        background: t.bgSurface,
        border: `1px solid ${t.border}`,
        borderRadius: "16px",
        padding: "48px 36px",
        maxWidth: "480px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box",
      }}>
        {/* Shield / Blocked Illustration */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: t.error,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          border: "2px solid rgba(239, 68, 68, 0.2)",
        }}>
          <ShieldAlert size={36} />
        </div>

        {/* Message */}
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "10px" }}>
          وصول مرفوض (403 - Access Denied)
        </h1>
        <p style={{ fontSize: "0.9375rem", color: t.textSecondary, lineHeight: 1.6, marginBottom: "28px" }}>
          ليس لديك صلاحية للوصول إلى هذه الصفحة. قد تتطلب هذه المساحة صلاحيات أستاذ أو حساب أكاديمي مصرح له.
        </p>

        {/* Action Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleBackToDashboard}
          className="w-full"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px" }}
        >
          <ArrowRight size={18} />
          العودة للوحة التحكم الرئيسية
        </Button>

        {/* Mock Role Switcher for Testing / Demo */}
        <div style={{
          width: "100%",
          paddingTop: "20px",
          borderTop: `1px dashed ${t.border}`,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 600 }}>
            🧪 تجربة التوجيه حسب الصلاحية (Mock Role):
          </span>
          <div style={{ display: "flex", gap: "8px", background: t.bgSecondary, padding: "4px", borderRadius: "999px", border: `1px solid ${t.border}` }}>
            <button
              type="button"
              onClick={() => setMockRole("teacher")}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                border: "none",
                background: mockRole === "teacher" ? t.primary : "transparent",
                color: mockRole === "teacher" ? "#fff" : t.textSecondary,
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 150ms",
              }}
            >
              <GraduationCap size={14} /> معلم ({mockRole === "teacher" ? "نشط" : ""})
            </button>
            <button
              type="button"
              onClick={() => setMockRole("student")}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                border: "none",
                background: mockRole === "student" ? t.primary : "transparent",
                color: mockRole === "student" ? "#fff" : t.textSecondary,
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 150ms",
              }}
            >
              <User size={14} /> طالب ({mockRole === "student" ? "نشط" : ""})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccessDeniedPage;
