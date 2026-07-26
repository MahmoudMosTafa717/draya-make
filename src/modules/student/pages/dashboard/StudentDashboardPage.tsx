import * as React from "react";
import { useNavigate } from "react-router";
import {
  Package, TrendingUp, CheckCircle, Clock, AlertTriangle, ChevronLeft, Calendar
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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Hero greeting banner */}
      <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", minHeight: "200px" }}>
        <img src={P.studentStudy} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.9) hue-rotate(-5deg)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(15,79,73,0.93) 50%, rgba(27,109,99,0.5) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, padding: "36px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginBottom: "6px" }}>الأحد، 20 يوليو 2026</p>
            <h1 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.02em" }}>
              أهلاً بعودتك، أحمد! 👋
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "20px" }}>
              لديك اختباران مجدولان قريباً هذا الأسبوع. يمكنك تحقيق العلامة الكاملة!
            </p>
            <Button variant="primary" size="md" style={{ background: "#fff", color: t.primary }} onClick={() => navigate("/student/my-packages")}>
              تابع من حيث توقفت
            </Button>
          </div>
          
          {/* Floating metrics */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[["87%", "المتوسط التراكمي"], ["37", "محاضرة مكتملة"]].map(([v, l]) => (
              <div key={l} style={{
                background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px",
                padding: "12px 18px", textAlign: "right"
              }}>
                <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "#fff", fontFamily: "'Cairo', sans-serif" }}>{v}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning Alert & KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Urgent warnings */}
        <Card className="col-span-1 md:col-span-2" style={{ padding: "20px", background: "rgba(244, 63, 94, 0.04)", border: `1.5px solid ${t.error}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <AlertTriangle size={16} color={t.error} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.error }}>تنبيهات عاجلة</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              onClick={() => navigate("/student/exams")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "0.875rem", padding: "6px 0", borderBottom: `1px solid ${t.border}` }}
            >
              <span style={{ color: t.textPrimary }}>امتحان الجبر التراكمي — غداً 10:00 ص</span>
              <Badge variant="error">عاجل</Badge>
            </div>
            
            <div
              onClick={() => navigate("/student/my-packages")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "0.875rem", padding: "6px 0" }}
            >
              <span style={{ color: t.textPrimary }}>واجب الفيزياء (الموجات)</span>
              <Badge variant="warning">قريباً</Badge>
            </div>
          </div>
        </Card>

        {/* Dynamic metrics */}
        {[
          { label: "الباقات المشترك بها", value: "3 باقات", icon: <Package size={16} />, trend: null },
          { label: "أداء المواد المتوسط", value: "87%", icon: <TrendingUp size={16} />, trend: "up" as const },
        ].map((s, idx) => (
          <Card key={idx} style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "0.8125rem", color: t.textSecondary }}>{s.label}</span>
              <div style={{ background: t.primary50, color: t.primary, padding: "6px", borderRadius: "8px", display: "flex" }}>{s.icon}</div>
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
              <Card key={c.id} interactive onClick={() => navigate(`/student/courses/${c.id}`)} className="flex flex-col sm:flex-row" style={{ overflow: "hidden" }}>
                {/* Visual Thumbnail */}
                <div className="w-full sm:w-[120px] h-[120px] sm:h-auto" style={{ flexShrink: 0, position: "relative" }}>
                  <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(27,109,99,0.2)" }} />
                </div>
                
                <div style={{ flex: 1, padding: "16px" }}>
                  <div style={{ fontWeight: 700, color: t.textPrimary, marginBottom: "4px", fontSize: "0.9375rem" }}>{c.title}</div>
                  <div style={{ fontSize: "0.8125rem", color: t.textSecondary, marginBottom: "12px" }}>
                    {c.teacher} · {c.lectures}/{c.total} محاضرة منجزة
                  </div>
                  <ProgressBar value={c.progress} />
                  <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "5px" }}>{c.progress}% مكتمل</div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", padding: "16px", justifyContent: "flex-end" }} className="sm:pl-4">
                  <ChevronLeft size={18} color={t.textSecondary} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Exams and weaknesses sidebars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Upcoming exams */}
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={15} color={t.warning} /> امتحانات قادمة
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "اختبار الباب الثالث (جبر)", date: "غداً 10:00 ص", color: t.error },
                { title: "مراجعة قانون كيرشوف (فيزياء)", date: "الخميس 11:00 ص", color: t.warning },
              ].map((e, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ width: 4, height: 36, borderRadius: "2px", background: e.color }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{e.title}</div>
                    <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{e.date}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="tertiary" size="sm" onClick={() => navigate("/student/exams")} className="w-full" style={{ marginTop: "12px" }}>
              عرض كل الامتحانات
            </Button>
          </Card>

          {/* Weakness map */}
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={15} color={t.warning} /> نقاط ضعف تحتاج انتباهك
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { topic: "المشتقات والاتصال الرياضي", score: 42 },
                { topic: "الدوائر المغلقة وقوانين أوم", score: 55 },
              ].map((w, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.8125rem", color: t.textPrimary }}>{w.topic}</span>
                    <Badge variant={w.score < 50 ? "error" : "warning"}>{w.score}%</Badge>
                  </div>
                  <ProgressBar value={w.score} />
                </div>
              ))}
            </div>

            <Button variant="tertiary" size="sm" onClick={() => navigate("/student/grades")} className="w-full" style={{ marginTop: "16px" }}>
              تقارير التحليل المتقدمة
            </Button>
          </Card>

        </div>

      </div>

    </div>
  );
};
export default StudentDashboardPage;
