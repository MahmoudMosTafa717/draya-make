import * as React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Package, BookOpen, Users, ClipboardList,
  Tv, MessageSquare, User, GraduationCap, Bell,
  LogOut, Menu, X, Sparkles
} from "lucide-react";

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
    { icon: <LayoutDashboard size={19} />, label: "لوحة التحكم", path: "/teacher/dashboard", group: "teach" },
    { icon: <Package size={19} />, label: "باقات", path: "/teacher/packages", group: "teach" },
    { icon: <BookOpen size={19} />, label: "كورسات", path: "/teacher/courses", group: "teach" },
    { icon: <Users size={19} />, label: "الطلبة", path: "/teacher/students", group: "assess" },
    { icon: <ClipboardList size={19} />, label: "الامتحانات", path: "/teacher/exam-builder", group: "assess" },
    { icon: <Tv size={19} />, label: "القناة", path: "/teacher/channel", group: "comms" },
    { icon: <MessageSquare size={19} />, label: "Feedback", path: "/teacher/feedback", group: "comms" },
    { icon: <User size={19} />, label: "عن حسابي", path: "/teacher/profile", group: "analyze" },
  ];

  const groups = [
    { key: "teach", label: "التدريس" },
    { key: "assess", label: "التقييم" },
    { key: "comms", label: "التواصل" },
    { key: "analyze", label: "التحليل" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const closeMenu = () => setMobileMenuOpen(false);

  const renderNavGroupContent = (onLinkClick?: () => void) => (
    <nav style={{ flex: 1, padding: "0 14px", overflowY: "auto" }}>
      {groups.map(group => {
        const groupItems = items.filter(i => i.group === group.key);
        return (
          <div key={group.key} style={{ marginBottom: "12px" }}>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              color: "#7E8C89",
              padding: "16px 14px 6px",
              textTransform: "uppercase",
              letterSpacing: "0.02em"
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
                    gap: "12px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: active ? "#E6F4F1" : "transparent",
                    color: active ? "#0F5D50" : "#525E5A",
                    fontSize: "0.9375rem",
                    fontWeight: active ? 700 : 500,
                    textDecoration: "none",
                    transition: "all 150ms ease",
                    position: "relative",
                    marginBottom: "4px"
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#F2F7F6"; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {active && (
                    <div style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: 22,
                      borderRadius: "4px 0 0 4px",
                      background: "#0F5D50",
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
          width: "250px",
          minHeight: "100vh",
          background: "#FFFFFF",
          borderLeft: "1px solid #EAEFEF",
          padding: "24px 0 0",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Logo Area */}
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #EAEFEF", marginBottom: "12px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#151B19", lineHeight: 1.2 }}>درايَة</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7A77", marginTop: "2px" }}>لوحة المعلم</div>
            </div>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: "#0F5D50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <GraduationCap size={22} color="#fff" />
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        {renderNavGroupContent()}

        {/* Sidebar Footer — logout only */}
        <div style={{ padding: "16px 14px 20px", borderTop: "1px solid #EAEFEF", marginTop: "auto" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px",
              border: "none", background: "transparent", color: "#EF4444", fontSize: "0.9375rem", fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right",
              transition: "all 150ms ease"
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239, 68, 68, 0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <LogOut size={19} /> تسجيل الخروج
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
          position: "fixed", top: 0, bottom: 0, right: mobileMenuOpen ? "0px" : "-280px",
          width: "260px", background: "#FFFFFF", zIndex: 999,
          borderLeft: "1px solid #EAEFEF", display: "flex", flexDirection: "column",
          padding: "24px 0 0", transition: "right 0.3s ease-in-out",
        }}
        className="lg:hidden"
      >
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #EAEFEF", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: "10px", background: "#0F5D50", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#151B19" }}>درايَة</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7A77" }}>لوحة المعلم</div>
            </div>
          </Link>
          <button 
            type="button" 
            onClick={closeMenu}
            aria-label="إغلاق القائمة"
            style={{ border: "none", background: "none", color: "#525E5A", cursor: "pointer", display: "flex", padding: "6px" }}
          >
            <X size={22} />
          </button>
        </div>

        {renderNavGroupContent(closeMenu)}

        <div style={{ padding: "16px 14px 20px", borderTop: "1px solid #EAEFEF", marginTop: "auto" }}>
          <button
            onClick={() => { closeMenu(); handleLogout(); }}
            style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px",
              border: "none", background: "transparent", color: "#EF4444", fontSize: "0.9375rem", fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right"
            }}
          >
            <LogOut size={19} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header Bar */}
        <header style={{
          minHeight: "92px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #EAEFEF",
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          {/* Mobile hamburger menu trigger — hidden on desktop */}
          {!isDesktop && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              style={{
                border: "1px solid #EAEFEF", cursor: "pointer", color: "#525E5A",
                width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "10px", outline: "none", background: "#FFFFFF", flexShrink: 0,
              }}
            >
              <Menu size={22} />
            </button>
          )}

          {/* Right Side (in RTL): Greeting & Subtext */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
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
          </div>

          {/* Left Side (in RTL): Bell Icon & Green Pill CTA Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "auto" }}>
            <button
              aria-label="الإشعارات"
              onClick={() => navigate("/teacher/notifications")}
              style={{
                width: "48px", height: "48px", borderRadius: "12px",
                border: "1px solid #EAEFEF", background: "#FFFFFF",
                cursor: "pointer", color: "#525E5A",
                position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 150ms ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F5FCFB"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
            >
              <Bell size={19} />
              <span style={{
                position: "absolute", top: 9, right: 9,
                width: 8, height: 8, borderRadius: "50%",
                background: "#EF4444", border: "2px solid #FFFFFF"
              }} />
            </button>
            
            <button
              onClick={() => navigate("/teacher/reports")}
              style={{
                height: "48px",
                padding: "0 20px",
                borderRadius: "50px",
                background: "#0F5D50",
                color: "#FFFFFF",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 700,
                fontFamily: "inherit",
                transition: "all 150ms ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0C4A40"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0F5D50"; }}
            >
              <Sparkles size={16} />
              <span>مراجعة تقارير AI</span>
            </button>
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

