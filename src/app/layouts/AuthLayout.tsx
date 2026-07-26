import * as React from "react";
import { Link, Outlet } from "react-router";
import { GraduationCap } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { P } from "@/shared/constants/photos";
import { BlobBg } from "@/shared/components/layout/BlobBg";
import { DecorativeScatter } from "@/shared/components/layout/DecorativeScatter";

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ background: t.bgBase, direction: "rtl" }}>
      {/* Right Column: Form (Takes remaining space) */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 relative z-10" style={{ minHeight: "100vh" }}>
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: "10px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.125rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em" }}>درايَة</div>
              <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>نظام التقييم الذكي للمستقبل</div>
            </div>
          </Link>

          <Outlet />
        </div>
      </div>

      {/* Left Column: Visual decoration & branding (Hidden on mobile) */}
      <div 
        className="hidden md:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{
          flex: 1.1,
          background: `linear-gradient(135deg, ${t.primary900} 0%, ${t.primary} 100%)`,
        }}
      >
        <BlobBg variant="dark" />
        <DecorativeScatter color="#FFF" opacity={0.06} density="dense" />
        
        {/* Visual elements */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1, textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: "12px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={22} color="#fff" />
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>درايَة</span>
        </Link>

        <div style={{ zIndex: 1, color: "#fff", maxWidth: "460px" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1.25, marginBottom: "16px" }}>
            أسهل طريقة لإنشاء وتصحيح الامتحانات بالذكاء الاصطناعي
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            وفر ساعات من العمل الورقي واستمتع بتحليلات دقيقة لأداء الطلاب مصممة خصيصاً لمراكز الدروس الخصوصية في مصر.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", zIndex: 1 }}>
          <img
            src={P.heroLanding}
            alt="Draya Platform Dashboard Preview"
            style={{
              width: "85%",
              height: "auto",
              maxHeight: "360px",
              objectFit: "cover",
              borderRadius: "16px 0 0 16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
              transform: "translateY(24px) translateX(-48px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
