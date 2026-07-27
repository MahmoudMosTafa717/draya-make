import * as React from "react";
import { useNavigate } from "react-router";
import {
  Package, TrendingUp, CheckCircle, Clock, AlertTriangle, ChevronLeft, Flame, Sparkles
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { P } from "@/shared/constants/photos";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [streakHovered, setStreakHovered] = React.useState(false);

  const courses = [
    { id: "c1", title: "الجبر وحساب المثلثات", teacher: "أ. محمد علي", progress: 68, lectures: 12, total: 18, img: P.mathChalkboard },
    { id: "c2", title: "الفيزياء الكهربية والحديثة", teacher: "أ. سارة حسن", progress: 40, lectures: 8, total: 20, img: P.classroomSocial },
    { id: "c3", title: "الكيمياء العضوية المتقدمة", teacher: "أ. أحمد سامي", progress: 85, lectures: 17, total: 20, img: P.libraryBooks },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Skeleton height="200px" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Skeleton height="140px" className="md:col-span-2" />
          <Skeleton height="140px" />
          <Skeleton height="140px" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton height="360px" />
          </div>
          <div>
            <Skeleton height="360px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "relative" }}>
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full filter blur-[80px] bg-primary50/30 opacity-70 animate-float-blob pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full filter blur-[100px] bg-indigo-50/20 opacity-60 animate-float-blob pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Hero greeting banner */}
      <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative", minHeight: "220px", boxShadow: "0 10px 30px -5px rgba(15,79,73,0.15)" }}>
        <img src={P.studentStudy} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.9) brightness(0.85) hue-rotate(-5deg)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(15,79,73,0.95) 50%, rgba(27,109,99,0.6) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", marginBottom: "8px", fontWeight: 500 }}>الأحد، 20 يوليو 2026</p>
            <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, marginBottom: "10px", letterSpacing: "-0.02em", fontFamily: "'Cairo', sans-serif" }}>
              أهلاً بعودتك، أحمد! 👋
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9375rem", marginBottom: "24px", lineHeight: 1.6, maxWidth: "460px" }}>
              لديك اختباران مجدولان قريباً هذا الأسبوع. واصل الدراسة يومياً وحافظ على لهيب حماسك!
            </p>
            <Button variant="primary" size="md" style={{ background: "#fff", color: t.primary, border: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }} onClick={() => navigate("/student/my-packages")}>
              تابع من حيث توقفت
            </Button>
          </div>
          
          {/* Interactive Gamification Streak Widget */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {/* 1. Streak Tracker */}
            <div 
              onMouseEnter={() => setStreakHovered(true)}
              onMouseLeave={() => setStreakHovered(false)}
              className="animate-pulse-glow"
              style={{
                background: "rgba(249, 115, 22, 0.15)", backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(249, 115, 22, 0.4)", borderRadius: "16px",
                padding: "16px 20px", textAlign: "right", cursor: "help", position: "relative",
                display: "flex", alignItems: "center", gap: "12px", transition: "all 300ms ease"
              }}
            >
              <div style={{
                background: "linear-gradient(135deg, #FF6B00 0%, #FFA800 100%)",
                width: "42px", height: "42px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center"
              }}>
                <Flame size={22} color="#fff" fill="#fff" className="animate-pulse" />
              </div>
              <div>
                <div style={{ fontSize: "1.375rem", fontWeight: 900, color: "#FFF", fontFamily: "'Cairo', sans-serif", lineHeight: 1 }}>5 أيام</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", marginTop: "4px" }}>سلسلة التعلم الحالية</div>
              </div>

              {/* Streak tooltip */}
              {streakHovered && (
                <div style={{
                  position: "absolute", bottom: "105%", right: 0, width: "240px",
                  background: t.bgSurface, border: `1.5px solid ${t.border}`,
                  padding: "12px 14px", borderRadius: "12px", zIndex: 10,
                  boxShadow: t.shadow3, textAlign: "right", direction: "rtl"
                }}>
                  <div style={{ fontWeight: 700, color: t.textPrimary, fontSize: "0.8125rem", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Sparkles size={12} color="#FFA800" fill="#FFA800" />
                    مضاعف حماس درايَة نشط!
                  </div>
                  <p style={{ fontSize: "0.75rem", color: t.textSecondary, lineHeight: 1.4 }}>
                    أنجزت كورسين متتاليين. تابع غداً للحفاظ على سلسلة لهيب حماسك!
                  </p>
                </div>
              )}
            </div>

            {/* 2. Core Metrics */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[["87%", "المتوسط التراكمي"], ["37", "محاضرة مكتملة"]].map(([v, l]) => (
                <div key={l} style={{
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: "16px",
                  padding: "16px 20px", textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center"
                }}>
                  <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{v}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Warning Alert & KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Urgent warnings */}
        <Card className="col-span-1 md:col-span-2 relative overflow-hidden" style={{ padding: "20px", background: "rgba(239, 68, 68, 0.03)", border: `1px dashed ${t.error}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <AlertTriangle size={16} color={t.error} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 800, color: t.error, textTransform: "uppercase", letterSpacing: "0.05em" }}>تنبيهات عاجلة</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              onClick={() => navigate("/student/exams")}
              className="hover:bg-red-500/5 p-2 rounded-lg transition-all duration-200"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "0.875rem", borderBottom: `1px solid rgba(221, 228, 226, 0.3)` }}
            >
              <span style={{ color: t.textPrimary, fontWeight: 600 }}>امتحان الجبر التراكمي — غداً 10:00 ص</span>
              <Badge variant="error">عاجل</Badge>
            </div>
            
            <div
              onClick={() => navigate("/student/my-packages")}
              className="hover:bg-red-500/5 p-2 rounded-lg transition-all duration-200"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "0.875rem" }}
            >
              <span style={{ color: t.textPrimary, fontWeight: 600 }}>واجب الفيزياء (الموجات)</span>
              <Badge variant="warning">قريباً</Badge>
            </div>
          </div>
        </Card>

        {/* Dynamic metrics */}
        {[
          { label: "الباقات المشترك بها", value: "3 باقات", icon: <Package size={16} />, trend: null },
          { label: "أداء المواد المتوسط", value: "87%", icon: <TrendingUp size={16} />, trend: "up" as const },
        ].map((s, idx) => (
          <Card key={idx} style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", border: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>{s.label}</span>
              <div style={{ background: t.primary50, color: t.primary, padding: "8px", borderRadius: "10px", display: "flex" }}>{s.icon}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 800, color: t.textPrimary, fontFamily: "'Cairo', sans-serif" }}>{s.value}</span>
              {s.trend === "up" && <TrendingUp size={16} color={t.success} />}
            </div>
          </Card>
        ))}
      </div>

      {/* Main content split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Continued studying course list */}
        <div className="lg:col-span-2">
          <SectionTitle>متابعة محاضراتك الحالية</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {courses.map(c => (
              <Card 
                key={c.id} 
                interactive 
                onClick={() => navigate(`/student/courses/${c.id}`)} 
                className="flex flex-col sm:flex-row transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300" 
                style={{ overflow: "hidden", border: `1px solid ${t.border}` }}
              >
                {/* Visual Thumbnail */}
                <div className="w-full sm:w-[130px] h-[120px] sm:h-auto" style={{ flexShrink: 0, position: "relative" }}>
                  <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(27,109,99,0.15)" }} />
                </div>
                
                <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontWeight: 700, color: t.textPrimary, marginBottom: "6px", fontSize: "1rem" }}>{c.title}</div>
                  <div style={{ fontSize: "0.8125rem", color: t.textSecondary, marginBottom: "14px" }}>
                    {c.teacher} · {c.lectures}/{c.total} محاضرة منجزة
                  </div>
                  <ProgressBar value={c.progress} />
                  <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span>{c.progress}% مكتمل</span>
                    <span style={{ fontWeight: 600, color: t.primary }}>استمر بالمذاكرة</span>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", padding: "20px", justifyContent: "flex-end" }} className="sm:pl-4">
                  <div style={{ background: t.primary50, padding: "8px", borderRadius: "50%", display: "flex", color: t.primary }}>
                    <ChevronLeft size={16} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Exams and weaknesses sidebars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Upcoming exams */}
          <Card style={{ padding: "20px", border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} color={t.warning} /> امتحانات قادمة
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { title: "اختبار الباب الثالث (جبر)", date: "غداً 10:00 ص", color: t.error },
                { title: "مراجعة قانون كيرشوف (فيزياء)", date: "الخميس 11:00 ص", color: e => t.warning },
              ].map((e, idx) => (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: 4, height: 38, borderRadius: "2px", background: typeof e.color === 'function' ? e.color() : e.color }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{e.title}</div>
                    <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "2px" }}>{e.date}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="tertiary" size="sm" onClick={() => navigate("/student/exams")} className="w-full" style={{ marginTop: "16px", border: `1px solid ${t.border}` }}>
              عرض كل الامتحانات
            </Button>
          </Card>

          {/* Weakness map */}
          <Card style={{ padding: "20px", border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={16} color={t.warning} /> نقاط ضعف تحتاج انتباهك
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {[
                { topic: "المشتقات والاتصال الرياضي", score: 42 },
                { topic: "الدوائر المغلقة وقوانين أوم", score: 55 },
              ].map((w, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.8125rem", color: t.textPrimary, fontWeight: 600 }}>{w.topic}</span>
                    <Badge variant={w.score < 50 ? "error" : "warning"}>{w.score}%</Badge>
                  </div>
                  <ProgressBar value={w.score} />
                </div>
              ))}
            </div>

            <Button variant="tertiary" size="sm" onClick={() => navigate("/student/grades")} className="w-full" style={{ marginTop: "20px", border: `1px solid ${t.border}` }}>
              تقارير التحليل المتقدمة
            </Button>
          </Card>

        </div>

      </div>

    </div>
  );
};
export default StudentDashboardPage;
