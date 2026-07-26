import * as React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { GraduationCap } from "lucide-react";
import { t } from "@/shared/constants/tokens";

export const OnboardingLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const steps = [
    { key: "choose-plan", label: "اختيار الباقة", active: currentPath.includes("choose-plan") },
    { key: "checkout", label: "الدفع والاشتراك", active: currentPath.includes("checkout") },
    { key: "success", label: "النجاح", active: currentPath.includes("success") },
  ];

  return (
    <div style={{ minHeight: "100vh", background: t.bgBase, direction: "rtl", display: "flex", flexDirection: "column" }}>
      {/* Top Header */}
      <header style={{
        height: "64px",
        backgroundColor: t.bgSurface,
        borderBottom: `1px solid ${t.border}`,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: t.shadow1,
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: "8px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={16} color="#fff" />
          </div>
          <span style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em" }}>درايَة</span>
        </Link>
        <div style={{ fontSize: "0.875rem", color: t.textSecondary, fontWeight: 500 }}>تفعيل حساب المعلم</div>
      </header>

      {/* Onboarding step tracker */}
      <div style={{ padding: "32px 16px 16px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          {/* Connector line */}
          <div style={{ position: "absolute", top: "14px", left: "24px", right: "24px", height: "2px", backgroundColor: t.border, zIndex: 0 }} />
          
          {steps.map((step, index) => {
            const isCompleted = steps.slice(0, index).some(s => s.active) || step.active;
            return (
              <div key={step.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, flex: 1 }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  backgroundColor: step.active ? t.primary : isCompleted ? t.primary400 : t.bgSurface,
                  border: `2px solid ${step.active || isCompleted ? t.primary : t.borderStrong}`,
                  color: step.active || isCompleted ? "#fff" : t.textSecondary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8125rem", fontWeight: 700, marginBottom: "8px",
                  boxShadow: step.active ? `0 0 0 4px ${t.primary100}` : "none",
                  transition: "all 150ms",
                }}>
                  {index + 1}
                </div>
                <span style={{
                  fontSize: "0.8125rem",
                  fontWeight: step.active ? 700 : 500,
                  color: step.active ? t.primary : t.textSecondary,
                }}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Onboarding child routes content */}
      <main style={{ flex: 1, padding: "20px 24px 64px", boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default OnboardingLayout;
