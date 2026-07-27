import * as React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { GraduationCap } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { P } from "@/shared/constants/photos";
import { BlobBg } from "@/shared/components/layout/BlobBg";
import { DecorativeScatter } from "@/shared/components/layout/DecorativeScatter";

export interface AuthLayoutProps {
  brandSide?: "left" | "right";
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ brandSide, children }) => {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  // Determine which side the branded panel should be on:
  // On Login screen (and forgot/reset/locked/etc.), branded panel is on the LEFT and form on the RIGHT (in RTL natural).
  // On Sign Up screens (signup, register, complete-profile, verify-email), branded panel is on the RIGHT and form on the LEFT.
  const isSignupFlow = pathname.includes("signup") || pathname.includes("register") || pathname.includes("verify-email") || pathname.includes("complete-profile");
  const side = brandSide ?? (isSignupFlow ? "right" : "left");

  return (
    <div className="auth-shell-container">
      {/* Form Column Panel */}
      <div className="auth-form-panel" data-side={side}>
        <div style={{ width: "100%", maxWidth: "420px", margin: "auto", padding: "24px 32px" }}>
          {/* Top Branding Logo for Form Area */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px", textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "12px",
              background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primary600} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(27, 109, 99, 0.25)",
              flexShrink: 0,
            }}>
              <GraduationCap size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em", lineHeight: 1.2 }}>درايَة</div>
              <div style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 500, marginTop: "2px" }}>نظام التقييم الذكي للمستقبل</div>
            </div>
          </Link>

          {/* Form Content */}
          <div style={{ width: "100%" }}>
            {children ?? <Outlet />}
          </div>
        </div>
      </div>

      {/* Branded Column Panel (Visual decoration & illustration) */}
      <div
        className="auth-brand-panel"
        data-side={side}
        style={{
          background: `linear-gradient(135deg, ${t.primary900} 0%, ${t.primary} 100%)`,
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <BlobBg variant="dark" />
        <DecorativeScatter color="#FFF" opacity={0.06} density="dense" />

        {/* Brand Header */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 2, textDecoration: "none", width: "fit-content" }}>
          <div style={{ width: 44, height: 44, borderRadius: "14px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <GraduationCap size={24} color="#fff" />
          </div>
          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>درايَة</span>
        </Link>

        {/* Brand Center Tagline */}
        <div style={{ zIndex: 2, color: "#fff", maxWidth: "460px", margin: "32px 0" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 14px", borderRadius: "999px",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)",
            fontSize: "0.75rem", fontWeight: 700, color: "#fff", marginBottom: "20px"
          }}>
            <span>✨ الجيل الجديد من تكنولوجيا التعليم</span>
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "16px", letterSpacing: "-0.02em" }}>
            أسهل طريقة لإنشاء وتصحيح الامتحانات بالذكاء الاصطناعي
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontWeight: 400 }}>
            وفر ساعات من العمل الورقي واستمتع بتحليلات دقيقة لأداء الطلاب مصممة خصيصاً لمراكز الدروس الخصوصية في مصر.
          </p>
        </div>

        {/* Brand Bottom Preview / Mock Asset */}
        <div style={{ display: "flex", justifyContent: side === "left" ? "flex-end" : "flex-start", zIndex: 2, transition: "justify-content 300ms ease" }}>
          <img
            src={P.heroLanding}
            alt="Draya Platform Dashboard Preview"
            style={{
              width: "90%",
              height: "auto",
              maxHeight: "340px",
              objectFit: "cover",
              borderRadius: side === "left" ? "20px 0 0 20px" : "0 20px 20px 0",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
              transform: side === "left" ? "translateY(24px) translateX(-56px)" : "translateY(24px) translateX(56px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 650ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;

