import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Package, Users, ClipboardList,
  BarChart2, FileText, LogOut, GraduationCap, Bell, Settings,
  Menu, X
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Avatar } from "@/shared/components/ui/Avatar";

export const TeacherLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const items = [
    { icon: <LayoutDashboard size={17} />, label: "لوحة التحكم", path: "/teacher/dashboard", group: "teach" },
    { icon: <Package size={17} />, label: "الباقات والدروس", path: "/teacher/packages", group: "teach" },
    { icon: <Users size={17} />, label: "الطلبة والمجموعات", path: "/teacher/students", group: "assess" },
    { icon: <ClipboardList size={17} />, label: "امتحانات AI", path: "/teacher/exam-builder", group: "assess" },
    { icon: <BarChart2 size={17} />, label: "التحليلات", path: "/teacher/analytics", group: "analyze" },
    { icon: <FileText size={17} />, label: "تقارير الذكاء الاصطناعي", path: "/teacher/reports", group: "analyze" },
  ];

  const groups = [
    { key: "teach", label: "التدريس" },
    { key: "assess", label: "التقييم والطلبة" },
    { key: "analyze", label: "التقارير والتحليلات" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  // Close mobile drawer helper
  const closeMenu = () => setMobileMenuOpen(false);

  const renderNavGroupContent = (onLinkClick?: () => void) => (
    <nav style={{ flex: 1, padding: "0 10px", overflowY: "auto" }}>
      {groups.map(group => {
        const groupItems = items.filter(i => i.group === group.key);
        return (
          <div key={group.key} style={{ marginBottom: "6px" }}>
            <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: t.textDisabled, padding: "8px 10px 4px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {group.label}
            </div>
            {groupItems.map(item => {
              const active = currentPath === item.path || currentPath.startsWith(item.path + "/");
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onLinkClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "12px 10px", // Touch target audit: enlarged to 44px equivalent spacing
                    borderRadius: "8px",
                    background: active ? t.primary100 : "transparent",
                    color: active ? t.primary : t.textSecondary,
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 400,
                    textDecoration: "none",
                    transition: "background 120ms, color 120ms",
                    position: "relative",
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = t.primary50; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {active && (
                    <div style={{
                      position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)",
                      width: 3, height: 18, borderRadius: "3px 0 0 3px",
                      background: t.primary,
                    }} />
                  )}
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: t.bgBase, direction: "rtl", overflowX: "hidden" }}>
      
      {/* 1. Desktop Sidebar */}
      <aside 
        className="hidden lg:flex flex-col"
        style={{
          width: "240px", minHeight: "100vh", background: t.bgSurface,
          borderLeft: `1px solid ${t.border}`, padding: "20px 0", flexShrink: 0,
          position: "sticky", top: 0, maxHeight: "100vh", overflowY: "auto"
        }}
      >
        {/* Logo */}
        <div style={{ padding: "0 18px 24px", borderBottom: `1px solid ${t.border}`, marginBottom: "8px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: "9px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em" }}>درايَة</div>
              <div style={{ fontSize: "0.6875rem", color: t.textSecondary }}>لوحة المعلم</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        {renderNavGroupContent()}

        {/* Footer Area */}
        <div style={{ padding: "12px 10px 0", borderTop: `1px solid ${t.border}` }}>
          <Link
            to="/teacher/settings"
            style={{
              display: "flex", alignItems: "center", gap: "9px", padding: "12px 10px", borderRadius: "8px",
              color: currentPath === "/teacher/settings" ? t.primary : t.textSecondary,
              background: currentPath === "/teacher/settings" ? t.primary100 : "transparent",
              fontSize: "0.875rem", textDecoration: "none"
            }}
          >
            <Settings size={17} /> إعدادات الحساب
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "9px", padding: "12px 10px", borderRadius: "8px",
              border: "none", background: "transparent", color: t.error, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right"
            }}
          >
            <LogOut size={17} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 2. Mobile Drawer Navigation Panel */}
      {mobileMenuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998,
          }}
          className="lg:hidden"
        />
      )}
      <aside 
        style={{
          position: "fixed", top: 0, bottom: 0, right: mobileMenuOpen ? "0px" : "-280px",
          width: "260px", background: t.bgSurface, zIndex: 999,
          borderLeft: `1px solid ${t.border}`, display: "flex", flexDirection: "column",
          padding: "20px 0", transition: "right 0.3s ease-in-out",
          boxShadow: t.shadow3
        }}
        className="lg:hidden"
      >
        <div style={{ padding: "0 18px 24px", borderBottom: `1px solid ${t.border}`, marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: "9px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary }}>درايَة</div>
              <div style={{ fontSize: "0.6875rem", color: t.textSecondary }}>لوحة المعلم</div>
            </div>
          </Link>
          <button 
            type="button" 
            onClick={closeMenu}
            aria-label="إغلاق القائمة"
            style={{ border: "none", background: "none", color: t.textSecondary, cursor: "pointer", display: "flex", padding: "8px" }}
          >
            <X size={20} />
          </button>
        </div>

        {renderNavGroupContent(closeMenu)}

        <div style={{ padding: "12px 10px 0", borderTop: `1px solid ${t.border}` }}>
          <Link
            to="/teacher/settings"
            onClick={closeMenu}
            style={{
              display: "flex", alignItems: "center", gap: "9px", padding: "12px 10px", borderRadius: "8px",
              color: currentPath === "/teacher/settings" ? t.primary : t.textSecondary,
              background: currentPath === "/teacher/settings" ? t.primary100 : "transparent",
              fontSize: "0.875rem", textDecoration: "none"
            }}
          >
            <Settings size={17} /> إعدادات الحساب
          </Link>
          <button
            onClick={() => { closeMenu(); handleLogout(); }}
            style={{
              display: "flex", alignItems: "center", gap: "9px", padding: "12px 10px", borderRadius: "8px",
              border: "none", background: "transparent", color: t.error, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right"
            }}
          >
            <LogOut size={17} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header Bar */}
        <header style={{
          height: "64px",
          backgroundColor: t.bgSurface,
          borderBottom: `1px solid ${t.border}`,
          padding: "0 20px lg:0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          {/* Mobile hamburger menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            style={{
              background: "none", border: "none", cursor: "pointer", color: t.textSecondary,
              width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "8px", outline: "none"
            }}
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginRight: "auto" }}>
            <button
              aria-label="الإشعارات"
              style={{
                background: "none", border: "none", cursor: "pointer", color: t.textSecondary,
                position: "relative", display: "flex", alignItems: "center", padding: "8px"
              }}
              onClick={() => navigate("/teacher/notifications")}
            >
              <Bell size={19} />
              <span style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderRadius: "50%", background: t.error, border: `2px solid ${t.bgSurface}` }} />
            </button>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/teacher/profile")}>
              <Avatar name="أحمد السيد" size={32} />
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }} className="hidden sm:inline">أ. أحمد السيد</span>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: "20px sm:padding:32px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default TeacherLayout;
