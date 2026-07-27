import * as React from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, Users, ClipboardList, MessageSquare,
  Sparkles, Plus, AlertTriangle, ChevronLeft, FileText
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Skeleton } from "@/shared/components/ui/Skeleton";

export const TeacherDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading] = React.useState(false);
  const [chartPeriod, setChartPeriod] = React.useState<"week" | "month" | "quarter">("week");

  const weekData = [
    { name: "سبت",    submissions: 12, avg: 78 },
    { name: "أحد",    submissions: 18, avg: 82 },
    { name: "اثنين",  submissions: 8,  avg: 75 },
    { name: "ثلاثاء", submissions: 22, avg: 85 },
    { name: "أربعاء", submissions: 15, avg: 80 },
    { name: "خميس",   submissions: 28, avg: 88 },
  ];
  const monthData = [
    { name: "أ1", submissions: 65,  avg: 79 },
    { name: "أ2", submissions: 88,  avg: 82 },
    { name: "أ3", submissions: 72,  avg: 77 },
    { name: "أ4", submissions: 95,  avg: 84 },
  ];
  const quarterData = [
    { name: "يوليو",   submissions: 310, avg: 80 },
    { name: "أغسطس",  submissions: 280, avg: 78 },
    { name: "سبتمبر", submissions: 340, avg: 83 },
  ];
  const chartData = chartPeriod === "week" ? weekData : chartPeriod === "month" ? monthData : quarterData;

  const atRiskStudents = [
    { name: "ياسمين خالد",  avg: 38, course: "الجبر والمثلثات",  status: "خطر"   },
    { name: "عمر السيد",    avg: 44, course: "الفيزياء الحديثة",  status: "خطر"   },
    { name: "نور محمود",    avg: 51, course: "الكيمياء العضوية",  status: "تحذير" },
    { name: "كريم عبدالله", avg: 53, course: "الجبر والمثلثات",  status: "تحذير" },
  ];

  const recentSubmissions = [
    { name: "سارة أحمد",    exam: "امتحان الجبر — الفصل 3",    score: 92, time: "منذ 14 دقيقة" },
    { name: "محمد إبراهيم", exam: "امتحان الفيزياء — موجات",   score: 77, time: "منذ 32 دقيقة" },
    { name: "فاطمة عمر",    exam: "امتحان الكيمياء — العضوية", score: 85, time: "منذ 55 دقيقة" },
    { name: "أحمد حسن",     exam: "امتحان الجبر — الفصل 3",    score: 63, time: "منذ ساعة"     },
  ];

  const kpiCards = [
    {
      label: "طلاب نشطون",
      value: "142",
      sub: "+8 هذا الأسبوع",
      trend: "up" as const,
      icon: <Users size={18} />,
      iconBg: t.primary100,
      iconColor: t.primary,
    },
    {
      label: "متوسط الفصل",
      value: "82%",
      sub: "+3% عن الأسبوع الماضي",
      trend: "up" as const,
      icon: <TrendingUp size={18} />,
      iconBg: "rgba(34,197,94,0.12)",
      iconColor: t.success,
    },
    {
      label: "امتحانات بانتظار مراجعة",
      value: "4",
      sub: "18 تسليم هذا الأسبوع",
      trend: null,
      icon: <ClipboardList size={18} />,
      iconBg: "rgba(245,158,11,0.12)",
      iconColor: t.warning,
    },
    {
      label: "رسائل جديدة",
      value: "7",
      sub: "من طلاب وأولياء",
      trend: null,
      icon: <MessageSquare size={18} />,
      iconBg: "rgba(59,130,246,0.12)",
      iconColor: t.info,
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[1, 2, 3, 4].map(i => <Skeleton key={i} height="120px" />)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* AI Reports Banner */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: "14px",
          background: t.primary50,
          border: `1px solid ${t.primary200}`,
          borderRight: `4px solid ${t.primary}`,
          borderRadius: "12px",
          padding: "14px 18px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/teacher/reports")}
      >
        <div style={{
          width: 36, height: 36, borderRadius: "9px", flexShrink: 0,
          background: t.primary100,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Sparkles size={17} color={t.primary} />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.primary }}>
            3 تقارير AI جاهزة للمراجعة
          </span>
          <span style={{ fontSize: "0.8125rem", color: t.textSecondary, marginRight: "8px" }}>
            — مُولَّدة من محتوى محاضراتك، تنتظر موافقتك قبل إرسالها للأولياء
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <Badge variant="primary">راجع الآن</Badge>
          <ChevronLeft size={15} color={t.primary} />
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {kpiCards.map(kpi => (
          <Card key={kpi.label} style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "10px",
                background: kpi.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ color: kpi.iconColor }}>{kpi.icon}</span>
              </div>
              {kpi.trend === "up" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "3px",
                  background: "rgba(34,197,94,0.10)", borderRadius: "999px", padding: "3px 8px",
                }}>
                  <TrendingUp size={11} color={t.success} />
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: t.success }}>ارتفاع</span>
                </div>
              )}
            </div>
            <div style={{
              fontSize: "2rem", fontWeight: 900, color: t.textPrimary,
              fontFamily: "'Cairo', sans-serif", lineHeight: 1,
              letterSpacing: "-0.02em", marginBottom: "6px",
            }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary, marginBottom: "2px" }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{kpi.sub}</div>
          </Card>
        ))}
      </div>

      {/* Chart + Quick Actions Sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>

        {/* Chart Card */}
        <Card style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "2px" }}>نشاط التسليمات</h3>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary }}>تسليمات الطلاب ومتوسط الأداء</p>
            </div>
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
                      boxShadow: chartPeriod === p ? t.shadow1 : "none", transition: "all 140ms",
                    }}
                  >{label}</button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${t.border}` }}>
            {[
              { label: "إجمالي التسليمات", value: chartPeriod === "week" ? "103" : chartPeriod === "month" ? "320" : "930", color: t.primary },
              { label: "متوسط الأداء",     value: chartPeriod === "week" ? "81%" : chartPeriod === "month" ? "80%" : "80%", color: t.success },
              { label: "أعلى يوم",         value: chartPeriod === "week" ? "خميس" : chartPeriod === "month" ? "الأسبوع 4" : "سبتمبر", color: t.warning },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: m.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "3px" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="submGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1B6D63" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1B6D63" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#52B6A8" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#52B6A8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: t.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: t.textSecondary }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "10px", fontSize: "0.8125rem", boxShadow: t.shadow2 }} />
              <Area type="monotone" dataKey="submissions" stroke="#1B6D63" strokeWidth={2.5} fill="url(#submGrad)" name="تسليمات" dot={{ r: 4, fill: "#1B6D63", strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="avg" stroke="#52B6A8" strokeWidth={2} fill="url(#avgGrad)" name="متوسط" dot={false} strokeDasharray="5 4" />
            </AreaChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", gap: "20px", marginTop: "12px", justifyContent: "center" }}>
            {[
              { color: t.primary,  label: "تسليمات",    dashed: false },
              { color: t.primary400, label: "متوسط الأداء", dashed: true },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: 20, height: 2.5, borderRadius: "2px",
                  background: l.dashed ? "none" : l.color,
                  border: l.dashed ? `1.5px dashed ${l.color}` : "none",
                }} />
                <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Quick Actions */}
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px" }}>إجراءات سريعة</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              <button
                onClick={() => navigate("/teacher/exam-builder")}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "11px 14px", borderRadius: "10px", border: "none",
                  background: t.primary, color: "#fff",
                  cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "right",
                }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: "8px",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Sparkles size={15} color="#fff" />
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>إنشاء امتحان بـ AI</span>
              </button>

              {[
                { label: "محاضرة جديدة",   icon: <Plus size={15} />,     path: "/teacher/courses" },
                { label: "متابعة الطلبة",  icon: <Users size={15} />,    path: "/teacher/students" },
                { label: "التقارير",       icon: <FileText size={15} />, path: "/teacher/reports" },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "10px",
                    border: `1px solid ${t.border}`, background: t.bgSurface,
                    color: t.textPrimary, cursor: "pointer",
                    fontFamily: "inherit", width: "100%", textAlign: "right",
                  }}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: "8px",
                    background: t.primary50,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: t.primary,
                  }}>
                    {a.icon}
                  </div>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{a.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Attention Card */}
          <Card style={{ padding: "20px", border: `1px solid ${t.border}`, background: t.primary50 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "8px",
                background: "rgba(245,158,11,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <AlertTriangle size={14} color={t.warning} />
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>يحتاج انتباهك</span>
            </div>
            {[
              { label: "4 طلاب في خطر أكاديمي",    badge: <Badge variant="error">تنبيه</Badge>,   path: "/teacher/students" },
              { label: "امتحان الجبر — 18 تسليم",  badge: <Badge variant="warning">انتظار</Badge>, path: "/teacher/exam-builder" },
            ].map(item => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: `1px solid ${t.border}`, cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "0.8125rem", color: t.textPrimary }}>{item.label}</span>
                {item.badge}
              </div>
            ))}
            <button
              onClick={() => navigate("/teacher/analytics")}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                marginTop: "12px", background: "none", border: "none",
                color: t.primary, fontSize: "0.8125rem", fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", width: "100%",
              }}
            >
              عرض كل التنبيهات <ChevronLeft size={13} />
            </button>
          </Card>
        </div>
      </div>

      {/* Bottom: At-Risk Students + Recent Submissions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* At-Risk Students */}
        <Card style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "2px" }}>طلاب يحتاجون متابعة</h3>
              <p style={{ fontSize: "0.75rem", color: t.textSecondary }}>أداء دون 55% في آخر امتحان</p>
            </div>
            <button
              onClick={() => navigate("/teacher/students")}
              style={{ background: "none", border: "none", color: t.primary, fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "3px" }}
            >
              عرض الكل <ChevronLeft size={13} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 72px", padding: "6px 10px", marginBottom: "4px" }}>
              {["الطالب", "الكورس", "المتوسط"].map(h => (
                <span key={h} style={{ fontSize: "0.6875rem", fontWeight: 700, color: t.textDisabled, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
              ))}
            </div>
            {atRiskStudents.map(s => (
              <div
                key={s.name}
                onClick={() => navigate("/teacher/students")}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 72px", alignItems: "center", padding: "10px 10px", borderRadius: "99px", cursor: "pointer", transition: "background 120ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.bgMuted; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Avatar name={s.name} size={30} />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{s.name}</span>
                </div>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary }}>{s.course}</span>
                <Badge variant={s.avg < 45 ? "error" : "warning"}>{s.avg}%</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Submissions */}
        <Card style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "2px" }}>آخر التسليمات</h3>
              <p style={{ fontSize: "0.75rem", color: t.textSecondary }}>أحدث نتائج الامتحانات المُسلَّمة</p>
            </div>
            <button
              onClick={() => navigate("/teacher/exam-builder")}
              style={{ background: "none", border: "none", color: t.primary, fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "3px" }}
            >
              عرض الكل <ChevronLeft size={13} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px", padding: "6px 10px", marginBottom: "4px" }}>
              {["الطالب", "الامتحان", "الدرجة"].map(h => (
                <span key={h} style={{ fontSize: "0.6875rem", fontWeight: 700, color: t.textDisabled, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
              ))}
            </div>
            {recentSubmissions.map(s => (
              <div
                key={s.name + s.time}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px", alignItems: "center", padding: "10px 10px", borderRadius: "9px", cursor: "pointer", transition: "background 120ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = t.bgMuted; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Avatar name={s.name} size={30} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: "0.6875rem", color: t.textDisabled }}>{s.time}</div>
                  </div>
                </div>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary, paddingLeft: "8px" }}>
                  {s.exam.split("—")[0].trim()}
                </span>
                <Badge variant={s.score >= 85 ? "success" : s.score >= 65 ? "info" : "warning"}>{s.score}%</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
};
export default TeacherDashboardPage;
