import * as React from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, Users, Package, Calendar, AlertTriangle, Sparkles,
  Plus, FileText, ChevronLeft, ArrowRight
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { t } from "@/shared/constants/tokens";
import { ACCENT, ACCENT_BG } from "@/shared/constants/accent";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const TeacherDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [chartPeriod, setChartPeriod] = React.useState<"week" | "month" | "quarter">("month");

  // Mock data mapping
  const kpis = [
    { label: "إجمالي الإيرادات", value: "EGP 14,240", change: "+12.4%", up: true, icon: <TrendingUp size={18} />, color: ACCENT.teal, bg: ACCENT_BG.teal },
    { label: "الطلاب النشطين", value: "142 طالب", change: "+8.2%", up: true, icon: <Users size={18} />, color: ACCENT.purple, bg: ACCENT_BG.purple },
    { label: "باقات الدراسة", value: "3 باقات", change: "0%", up: null, icon: <Package size={18} />, color: ACCENT.orange, bg: ACCENT_BG.orange },
    { label: "امتحانات مجدولة", value: "2 مجدولة", change: "-1", up: false, icon: <Calendar size={18} />, color: ACCENT.coral, bg: ACCENT_BG.coral },
  ];

  const atRiskStudents = [
    { name: "محمد أحمد", course: "رياضيات — الصف الثالث", avg: 42 },
    { name: "سارة محمود", course: "فيزياء — الصف الأول", avg: 48 },
    { name: "خالد يوسف", course: "كيمياء — الصف الثاني", avg: 51 },
  ];

  const recentSubmissions = [
    { name: "عمر خالد", time: "منذ 10 دقائق", exam: "اختبار الجبر التراكمي", score: 92 },
    { name: "ندى مصطفى", time: "منذ 24 دقيقة", exam: "واجب قانون نيوتن الثاني", score: 78 },
    { name: "كريم عمر", time: "منذ ساعة", exam: "امتحان نصف الفصل الدراسي", score: 55 },
  ];

  const chartData = [
    { name: "السبت", submissions: 24, avg: 76 },
    { name: "الأحد", submissions: 32, avg: 78 },
    { name: "الاثنين", submissions: 18, avg: 72 },
    { name: "الثلاثاء", submissions: 48, avg: 82 },
    { name: "الأربعاء", submissions: 38, avg: 80 },
    { name: "الخميس", submissions: 56, avg: 85 },
    { name: "الجمعة", submissions: 15, avg: 70 },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton width="180px" height="32px" />
          <Skeleton width="120px" height="40px" variant="circle" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} height="100px" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <Skeleton height="320px" />
          </div>
          <div>
            <Skeleton height="320px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Welcome & Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: t.textPrimary, marginBottom: "4px" }}>مرحباً بك، أ. أحمد</h1>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>إليك ملخص أداء الطلاب والأكاديمية اليوم.</p>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Badge variant="primary" size="md">
            الاشتراك: خطة المحترف
          </Badge>
          <Button variant="secondary" size="sm" onClick={() => navigate("/teacher/subscription")}>ترقية الاشتراك</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k, idx) => (
          <Card key={idx} style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "12px",
              background: k.bg, color: k.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0
            }}>
              {k.icon}
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: t.textSecondary, display: "block", marginBottom: "4px" }}>{k.label}</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "1.375rem", fontWeight: 800, color: t.textPrimary, fontFamily: "'Cairo', sans-serif" }}>{k.value}</span>
                {k.change !== "0%" && (
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700,
                    color: k.up === true ? t.success : k.up === false ? t.error : t.textDisabled
                  }}>
                    {k.change}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Card */}
        <Card style={{ padding: "24px" }} className="lg:col-span-2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: t.textPrimary, marginBottom: "4px" }}>إحصائيات الامتحانات والتسليمات</h3>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary }}>مقارنة بين التسليمات اليومية ومتوسط درجات الطلاب</p>
            </div>
            
            {/* Period selector */}
            <div style={{ display: "flex", gap: "2px", background: t.bgMuted, borderRadius: "8px", padding: "3px" }}>
              {(["week", "month", "quarter"] as const).map(p => {
                const label = p === "week" ? "أسبوع" : p === "month" ? "شهر" : "ربع سنة";
                return (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    style={{
                      padding: "5px 12px", borderRadius: "6px", border: "none",
                      background: chartPeriod === p ? t.bgSurface : "transparent",
                      color: chartPeriod === p ? t.primary : t.textSecondary,
                      fontSize: "0.8125rem", fontWeight: chartPeriod === p ? 700 : 400,
                      cursor: "pointer", fontFamily: "inherit",
                      boxShadow: chartPeriod === p ? t.shadow1 : "none",
                      transition: "all 140ms",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${t.border}` }}>
            {[
              { label: "إجمالي التسليمات", value: chartPeriod === "week" ? "103" : chartPeriod === "month" ? "320" : "930", color: t.primary },
              { label: "متوسط الأداء", value: "81%", color: t.success },
              { label: "أعلى يوم تفاعلاً", value: "الخميس", color: t.warning },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "3px" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="submGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={t.primary} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={t.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={t.primary500} stopOpacity={0.14} />
                  <stop offset="95%" stopColor={t.primary500} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: t.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: t.textSecondary }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "10px", fontSize: "0.8125rem" }} />
              <Area type="monotone" dataKey="submissions" stroke={t.primary} strokeWidth={2.5} fill="url(#submGrad)" name="تسليمات" dot={{ r: 4, fill: t.primary }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="avg" stroke={t.primary400} strokeWidth={2} fill="url(#avgGrad)" name="متوسط الدرجات" dot={false} strokeDasharray="5 4" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sidebar Controls Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Quick Actions */}
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px" }}>إجراءات سريعة</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              
              <Button variant="primary" size="md" onClick={() => navigate("/teacher/exam-builder")} className="w-full">
                <Sparkles size={16} />
                إنشاء امتحان بـ AI
              </Button>
              
              <Button variant="secondary" size="md" onClick={() => navigate("/teacher/packages")} className="w-full">
                <Plus size={16} />
                إضافة باقة جديدة
              </Button>
              
              <Button variant="secondary" size="md" onClick={() => navigate("/teacher/students")} className="w-full">
                <Users size={16} />
                متابعة المجموعات والطلبة
              </Button>
            </div>
          </Card>

          {/* Attention list */}
          <Card style={{ padding: "20px", background: "rgba(245, 158, 11, 0.04)", border: `1px solid ${t.warning}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <AlertTriangle size={16} color={t.warning} />
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>متابعة مطلوبة</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                onClick={() => navigate("/teacher/students")}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "0.8125rem", padding: "6px 0", borderBottom: `1px solid ${t.border}` }}
              >
                <span style={{ color: t.textPrimary }}>3 طلاب في خطر أكاديمي</span>
                <Badge variant="error">خطر</Badge>
              </div>

              <div
                onClick={() => navigate("/teacher/reports")}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: "0.8125rem", padding: "6px 0" }}
              >
                <span style={{ color: t.textPrimary }}>تقرير AI للمراجعة</span>
                <Badge variant="warning">مراجعة</Badge>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Bottom widgets list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        
        {/* At-risk Students */}
        <Card style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "2px" }}>طلاب يحتاجون متابعة</h3>
              <p style={{ fontSize: "0.75rem", color: t.textSecondary }}>معدل درجاتهم التراكمي تحت 55%</p>
            </div>
            <Button variant="tertiary" size="sm" onClick={() => navigate("/teacher/students")}>عرض الكل</Button>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {atRiskStudents.map((s, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/teacher/students/${idx}`)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px", borderRadius: "8px", cursor: "pointer",
                  transition: "background 120ms"
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = t.bgMuted; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Avatar name={s.name} size={30} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{s.course}</div>
                  </div>
                </div>
                <Badge variant="error">{s.avg}%</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Submissions */}
        <Card style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "2px" }}>آخر تسليمات الاختبارات</h3>
              <p style={{ fontSize: "0.75rem", color: t.textSecondary }}>نتائج الطلاب المرفوعة حديثاً</p>
            </div>
            <Button variant="tertiary" size="sm" onClick={() => navigate("/teacher/students")}>عرض الكل</Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recentSubmissions.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px", borderRadius: "8px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Avatar name={s.name} size={30} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: "0.75rem", color: t.textDisabled }}>{s.time} · {s.exam}</div>
                  </div>
                </div>
                <Badge variant={s.score >= 80 ? "success" : s.score >= 60 ? "info" : "warning"}>{s.score}%</Badge>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
};
export default TeacherDashboardPage;
