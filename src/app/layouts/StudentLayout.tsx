import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { GraduationCap, Bell, LogOut, Menu, X } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Avatar } from "@/shared/components/ui/Avatar";

export const StudentLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const items = [
    { label: "الرئيسية", path: "/student/dashboard" },
    { label: "تصفح المعلمين", path: "/student/browse-teachers" },
    { label: "باقاتي الدراسية", path: "/student/my-packages" },
    { label: "الامتحانات", path: "/student/exams" },
    { label: "درجاتي وتقاريري", path: "/student/grades" },
    { label: "المكتبة", path: "/student/books" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bgBase, direction: "rtl", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      {/* Header Nav */}
      <header style={{
        background: t.bgSurface, borderBottom: `1px solid ${t.border}`,
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 500,
        boxShadow: t.shadow1,
      }}>
        {/* Brand & Hamburger Wrapper */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Hamburger trigger - mobile only */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            style={{
              background: "none", border: "none", cursor: "pointer", color: t.textSecondary,
              width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "8px", outline: "none"
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: "8px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={16} color="#fff" />
            </div>
            <span style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em" }}>درايَة</span>
          </Link>
        </div>

        {/* Desktop Nav Links - desktop only */}
        <nav className="hidden md:flex" style={{ gap: "6px", alignItems: "center" }}>
          {items.map(item => {
            const active = currentPath === item.path || currentPath.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  color: active ? t.primary : t.textSecondary,
                  background: active ? t.primary50 : "transparent",
                  fontSize: "0.875rem",
                  fontWeight: active ? 700 : 500,
                  textDecoration: "none",
                  transition: "all 150ms ease-in-out",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            aria-label="الإشعارات"
            onClick={() => navigate("/student/notifications")}
            style={{ background: "none", border: "none", cursor: "pointer", color: t.textSecondary, position: "relative", display: "flex", alignItems: "center", padding: "8px" }}
          >
            <Bell size={19} />
            <span style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderRadius: "50%", background: t.error, border: `2px solid ${t.bgSurface}` }} />
          </button>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/student/profile")}>
            <Avatar name="أحمد محمد" size={32} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }} className="hidden sm:inline">أحمد محمد</span>
          </div>

          <button
            aria-label="تسجيل الخروج"
            onClick={handleLogout}
            style={{ background: "none", border: "none", cursor: "pointer", color: t.textSecondary, display: "flex", alignItems: "center", padding: "8px" }}
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      {/* Drawer Overlay Backdrop - mobile only */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden"
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998,
          }}
        />
      )}
      
      {/* Mobile Drawer Aside Menu - mobile only */}
      <aside
        className="md:hidden"
        style={{
          position: "fixed", top: 0, bottom: 0, right: mobileMenuOpen ? "0px" : "-280px",
          width: "260px", background: t.bgSurface, zIndex: 999,
          borderLeft: `1px solid ${t.border}`, display: "flex", flexDirection: "column",
          padding: "20px 0", transition: "right 0.3s ease-in-out",
          boxShadow: t.shadow3
        }}
      >
        <div style={{ padding: "0 18px 24px", borderBottom: `1px solid ${t.border}`, marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: "8px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={16} color="#fff" />
            </div>
            <span style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary }}>درايَة</span>
          </Link>
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="إغلاق القائمة"
            style={{ border: "none", background: "none", color: t.textSecondary, cursor: "pointer", display: "flex", padding: "8px" }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {items.map(item => {
            const active = currentPath === item.path || currentPath.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  color: active ? t.primary : t.textSecondary,
                  background: active ? t.primary100 : "transparent",
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 400,
                  textDecoration: "none",
                  transition: "background-color 150ms",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content with Comfortable Responsive Padding */}
      <main className="pt-10 pb-12 px-6 md:pt-16 md:pb-16 md:px-12 w-full max-w-7xl mx-auto flex-1 box-border">
        <Outlet />
      </main>
    </div>
  );
};
export default StudentLayout;
