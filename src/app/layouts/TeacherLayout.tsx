import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Package, BookOpen, Users, ClipboardList,
  Tv, MessageSquare, User, GraduationCap, Bell,
  BarChart2, FileText, LogOut, Menu, X, Sparkles
} from "lucide-react";
import { t } from "@/shared/constants/tokens";

export const TeacherLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(() => window.innerWidth >= 1024);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (e.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const items = [
    { icon: <LayoutDashboard size={17} />, label: "لوحة التحكم", path: "/teacher/dashboard", group: "teach" },
    { icon: <Package size={17} />, label: "باقات", path: "/teacher/packages", group: "teach" },
    { icon: <BookOpen size={17} />, label: "الفصول", path: "/teacher/classrooms", group: "teach" },
    { icon: <Users size={17} />, label: "الطلبة", path: "/teacher/students", group: "assess" },
    { icon: <ClipboardList size={17} />, label: "الامتحانات", path: "/teacher/exam-builder", group: "assess" },
    { icon: <Tv size={17} />, label: "القناة", path: "/teacher/channel", group: "comms" },
    { icon: <MessageSquare size={17} />, label: "Feedback", path: "/teacher/feedback", group: "comms" },
    { icon: <BarChart2 size={17} />, label: "التحليلات", path: "/teacher/analytics", group: "analyze" },
    { icon: <FileText size={17} />, label: "التقارير", path: "/teacher/reports", group: "analyze" },
  ];

  const groups = [
    { key: "teach", label: "التدريس" },
    { key: "assess", label: "التقييم" },
    { key: "comms", label: "التواصل" },
    { key: "analyze", label: "التحليل" },
  ];

  const getPageTitle = () => {
    if (currentPath === "/teacher/dashboard") return "مساء الخير، أ. محمد";
    if (currentPath.startsWith("/teacher/classrooms")) return "الفصول والمجموعات";
    if (currentPath.startsWith("/teacher/classroom-detail")) return "تفاصيل الفصل الدراسي";
    if (currentPath.startsWith("/teacher/packages")) return "الباقات التعليمية";
    if (currentPath.startsWith("/teacher/package-detail")) return "تفاصيل الباقة التعليمية";
    if (currentPath.startsWith("/teacher/feedback")) return "تقييمات الطلاب";
    if (currentPath.startsWith("/teacher/subscription")) return "إدارة الاشتراك";
    if (currentPath.startsWith("/teacher/reports")) return "تقارير الذكاء الاصطناعي";
    if (currentPath.startsWith("/teacher/settings")) return "إعدادات الحساب";
    if (currentPath.startsWith("/teacher/analytics")) return "التحليلات والأداء";
    if (currentPath.startsWith("/teacher/students")) return "إدارة الطلاب";
    if (currentPath.startsWith("/teacher/channels")) return "قنوات التواصل";
    if (currentPath.startsWith("/teacher/exam-builder")) return "باني الامتحانات بالذكاء الاصطناعي";
    return "لوحة المعلم";
  };

  const handleLogout = () => {
    navigate("/");
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const renderNavGroupContent = (onLinkClick?: () => void) => (
    <nav style={{ flex: 1, padding: "0 10px", overflowY: "auto" }}>
      {groups.map(group => {
        const groupItems = items.filter(i => i.group === group.key);
        return (
          <div key={group.key} style={{ marginBottom: "6px" }}>
            <div style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: t.textDisabled,
              padding: "8px 10px 4px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}>
              {group.label}
            </div>
            {groupItems.map(item => {
              const active = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path + "/"));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onLinkClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "9px 10px",
                    borderRadius: "8px",
                    background: active ? t.primary100 : "transparent",
                    color: active ? t.primary : t.textSecondary,
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 400,
                    textDecoration: "none",
                    transition: "background 120ms, color 120ms",
                    position: "relative",
                    marginBottom: "2px",
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = t.primary50; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {active && (
                    <div style={{
                      position: "absolute",
                      right: "-10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 18,
                      borderRadius: "3px 0 0 3px",
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF", direction: "rtl", fontFamily: "'Cairo', sans-serif" }}>

      {/* 1. Desktop Vertical Navbar */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: "224px",
          minHeight: "100vh",
          background: t.bgSurface,
          borderLeft: `1px solid ${t.border}`,
          padding: "20px 0",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Logo Area */}
        <div style={{ padding: "0 18px 24px", borderBottom: `1px solid ${t.border}`, marginBottom: "8px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: "9px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <GraduationCap size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em" }}>درايَة</div>
              <div style={{ fontSize: "0.6875rem", color: t.textSecondary }}>لوحة المعلم</div>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        {renderNavGroupContent()}

        {/* Sidebar Footer */}
        <div style={{ padding: "12px 10px 0", borderTop: `1px solid ${t.border}`, marginTop: "auto" }}>
          <Link
            to="/teacher/profile"
            style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", borderRadius: "8px", textDecoration: "none", background: "transparent", color: t.textSecondary, fontSize: "0.875rem", transition: "background 120ms" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.primary50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <User size={17} /> عن حسابي
          </Link>
          <button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", borderRadius: "8px", border: "none", background: "transparent", color: t.error, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right", transition: "background 120ms" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.07)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <LogOut size={17} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 2. Mobile Drawer Navigation Panel */}
      {mobileMenuOpen && (
        <div
          onClick={closeMenu}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998 }}
          className="lg:hidden"
        />
      )}
      <aside
        style={{
          position: "fixed", top: 0, bottom: 0, right: mobileMenuOpen ? "0px" : "-250px",
          width: "224px", background: t.bgSurface, zIndex: 999,
          borderLeft: `1px solid ${t.border}`, display: "flex", flexDirection: "column",
          padding: "20px 0", transition: "right 0.3s ease-in-out",
        }}
        className="lg:hidden"
      >
        <div style={{ padding: "0 18px 24px", borderBottom: `1px solid ${t.border}`, marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: "9px", background: t.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.01em" }}>درايَة</div>
              <div style={{ fontSize: "0.6875rem", color: t.textSecondary }}>لوحة المعلم</div>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="إغلاق القائمة"
            style={{ border: "none", background: "none", color: t.textSecondary, cursor: "pointer", display: "flex", padding: "6px" }}
          >
            <X size={20} />
          </button>
        </div>

        {renderNavGroupContent(closeMenu)}

        <div style={{ padding: "12px 10px 0", borderTop: `1px solid ${t.border}`, marginTop: "auto" }}>
          <Link
            to="/teacher/profile"
            onClick={closeMenu}
            style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", borderRadius: "8px", textDecoration: "none", background: "transparent", color: t.textSecondary, fontSize: "0.875rem" }}
          >
            <User size={17} /> عن حسابي
          </Link>
          <button
            onClick={() => { closeMenu(); handleLogout(); }}
            style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", borderRadius: "8px", border: "none", background: "transparent", color: t.error, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right" }}
          >
            <LogOut size={17} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header Bar — rendered on all teacher pages for consistent navigation and burger menu availability */}
        <header style={{
          minHeight: currentPath === "/teacher/dashboard" ? "92px" : "72px",
          backgroundColor: "#FFFFFF",
          padding: currentPath === "/teacher/dashboard" ? "16px 36px" : "12px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: `1px solid ${t.border}`,
        }}>
          {/* Mobile hamburger menu trigger — hidden on desktop */}
          {!isDesktop && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              style={{
                border: "1px solid #EAEFEF", cursor: "pointer", color: "#525E5A",
                width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "10px", outline: "none", background: "#FFFFFF", flexShrink: 0,
              }}
            >
              <Menu size={20} />
            </button>
          )}

          {/* Right Side (in RTL): Greeting or Page Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {currentPath === "/teacher/dashboard" ? (
              <>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#7E8C89", marginBottom: "2px" }}>
                  الأحد، 20 يوليو 2026
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#151B19", margin: 0, lineHeight: 1.2 }}>
                    مساء الخير، أ. محمد
                  </h1>
                  <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>👋</span>
                </div>
                <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#525E5A", margin: "2px 0 0" }}>
                  إليك ملخص نشاط أكاديميتك اليوم
                </p>
              </>
            ) : (
              <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#151B19", margin: 0 }}>
                {getPageTitle()}
              </h1>
            )}
          </div>

          {/* Left Side (in RTL): Bell Icon & Green Pill CTA Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "auto" }}>
            <button
              aria-label="الإشعارات"
              onClick={() => navigate("/teacher/notifications")}
              style={{
                width: "36px", height: "36px", borderRadius: "9px",
                border: "1px solid #EAEFEF", background: "#FFFFFF",
                cursor: "pointer", color: "#525E5A",
                position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 150ms ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F5FCFB"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
            >
              <Bell size={16} />
              <span style={{
                position: "absolute", top: 5, right: 5,
                width: 7, height: 7, borderRadius: "50%",
                background: "#EF4444", border: "2px solid #FFFFFF"
              }} />
            </button>

            {currentPath === "/teacher/dashboard" && (
              <button
                onClick={() => navigate("/teacher/reports")}
                style={{
                  height: "40px",
                  padding: "0 22px",
                  borderRadius: "50px",
                  background: "rgb(27, 109, 99)",
                  color: "#FFFFFF",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgb(22, 90, 82)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgb(27, 109, 99)"; }}
              >
                <Sparkles size={15} />
                <span>مراجعة تقارير AI</span>
              </button>
            )}
          </div>
        </header>

        {/* Main Page Content Container */}
        <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto", background: "#FFFFFF" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default TeacherLayout;

