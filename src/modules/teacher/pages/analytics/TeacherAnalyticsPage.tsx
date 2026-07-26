import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as ReBarChart, Bar } from "recharts";
import { BarChart2, CheckCircle, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const TeacherAnalyticsPage: React.FC = () => {
  const trendData = [
    { week: "أسبوع 1", avg: 74, completion: 60 },
    { week: "أسبوع 2", avg: 78, completion: 72 },
    { week: "أسبوع 3", avg: 82, completion: 80 },
    { week: "أسبوع 4", avg: 85, completion: 88 }
  ];

  const weakTopics = [
    { topic: "المشتقات والتكامل", students: 12, severity: 85 },
    { topic: "الدوائر الكهربية", students: 8, severity: 65 },
    { topic: "الروابط الكيميائية", students: 6, severity: 50 },
    { topic: "قانون جيب التمام", students: 5, severity: 40 }
  ];

  const gradeDistribution = [
    { range: "90+", count: 28 },
    { range: "80-89", count: 45 },
    { range: "70-79", count: 38 },
    { range: "60-69", count: 22 },
    { range: "<60", count: 9 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="رؤية متكاملة حول متوسط درجات الفصول ونسب إكمال الطلاب للمناهج التعليمية.">
        التحليلات ومخططات الأداء
      </SectionTitle>

      {/* Metric Cards Row */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "4px", flexWrap: "wrap" }}>
        {[
          { label: "متوسط الفصل", val: "82%", icon: <BarChart2 size={16} />, trend: "up" },
          { label: "نسبة الإكمال", val: "88%", icon: <CheckCircle size={16} />, trend: "up" },
          { label: "طلاب في خطر", val: "4", icon: <AlertTriangle size={16} />, trend: null },
          { label: "موضوعات ضعف", val: "4", icon: <TrendingDown size={16} />, trend: null }
        ].map(kpi => (
          <Card key={kpi.label} style={{ padding: "18px 22px", flex: 1, minWidth: "180px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>{kpi.label}</span>
              <span style={{ background: t.primary50, color: t.primary, padding: "6px", borderRadius: "8px", display: "flex" }}>{kpi.icon}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.625rem", fontWeight: 800, color: t.textPrimary, fontFamily: "'Cairo', sans-serif" }}>{kpi.val}</span>
              {kpi.trend === "up" && <TrendingUp size={16} color={t.success} />}
            </div>
          </Card>
        ))}
      </div>

      {/* Grid: AreaChart vs BarChart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend Area Chart */}
        <Card style={{ padding: "20px" }} className="lg:col-span-2">
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px" }}>تطور أداء الفصل ونسبة الإكمال</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trendData} margin={{ left: -16 }}>
              <defs>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={t.primary} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={t.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: t.textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: t.textSecondary }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "8px", fontSize: "0.8125rem" }} />
              <Area type="monotone" dataKey="avg" stroke={t.primary} fill="url(#colorAvg)" strokeWidth={2} name="المتوسط" />
              <Area type="monotone" dataKey="completion" stroke={t.primary300} fill="transparent" strokeWidth={2} strokeDasharray="5 3" name="الإكمال" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Grade Distribution Bar Chart */}
        <Card style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px" }}>توزيع درجات الطلاب</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ReBarChart data={gradeDistribution} layout="vertical" margin={{ left: -20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: t.textSecondary }} />
              <YAxis dataKey="range" type="category" tick={{ fontSize: 11, fill: t.textSecondary }} width={52} />
              <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "8px", fontSize: "0.8125rem" }} />
              <Bar dataKey="count" fill={t.primary} radius={[0, 4, 4, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Weak Topics */}
      <Card style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertTriangle size={16} color={t.warning} /> خريطة نقاط الضعف بالفصل
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {weakTopics.map(w => (
            <div key={w.topic} style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <span style={{ width: "180px", fontSize: "0.875rem", color: t.textPrimary, fontWeight: 600, flexShrink: 0 }}>{w.topic}</span>
              <div style={{ flex: 1, height: "10px", borderRadius: "999px", background: t.bgMuted, minWidth: "120px" }}>
                <div style={{ height: "100%", width: `${w.severity}%`, borderRadius: "999px", background: w.severity > 70 ? t.error : w.severity > 50 ? t.warning : t.primary300, transition: "width 0.3s" }} />
              </div>
              <Badge variant={w.severity > 70 ? "error" : "warning"} size="sm">{w.students} طلاب</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
export default TeacherAnalyticsPage;
