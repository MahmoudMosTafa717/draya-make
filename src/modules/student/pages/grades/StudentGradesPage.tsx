import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Star, CheckCircle, TrendingUp, TrendingDown, ArrowLeft } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const StudentGradesPage: React.FC = () => {
  const data = [
    { name: "مايو", avg: 82 },
    { name: "يونيو", avg: 79 },
    { name: "يوليو", avg: 87 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="استعرض كشف درجات الامتحانات والواجبات ونسب الإتقان للمهارات المختلفة المحددة بالذكاء الاصطناعي.">
        سجل درجاتي وتحليلات الأداء
      </SectionTitle>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {[
          { label: "المتوسط الكلي", val: "87%", icon: <Star size={16} />, trend: "up" },
          { label: "امتحانات مكتملة", val: "12", icon: <CheckCircle size={16} />, trend: null },
          { label: "أعلى درجة", val: "94%", icon: <TrendingUp size={16} />, trend: null }
        ].map(kpi => (
          <Card key={kpi.label} style={{ padding: "18px 22px", flex: 1, minWidth: "160px" }}>
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

      {/* Grid Area Chart vs Subject Averages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Performance Trend Area Chart */}
        <Card style={{ padding: "20px" }} className="lg:col-span-2">
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px" }}>منحنى تطور الأداء الأكاديمي</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ left: -16 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={t.primary} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={t.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: t.textSecondary }} />
              <YAxis tick={{ fontSize: 12, fill: t.textSecondary }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "8px" }} />
              <Area type="monotone" dataKey="avg" stroke={t.primary} fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Results by Subject */}
        <Card style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px" }}>النتائج حسب المواد الدراسية</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { name: "رياضيات", avg: 87 },
              { name: "فيزياء", avg: 82 },
              { name: "كيمياء", avg: 91 }
            ].map(s => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.8125rem" }}>
                  <span style={{ color: t.textPrimary, fontWeight: 600 }}>{s.name}</span>
                  <span style={{ fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>{s.avg}%</span>
                </div>
                <ProgressBar value={s.avg} />
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Weak Points list */}
      <div>
        <SectionTitle>موضوعات ومهارات تحتاج إلى مراجعة وتطوير</SectionTitle>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { topic: "المشتقات والتكامل وتطبيقات المساحات", subject: "رياضيات", score: 42, trend: "down" },
            { topic: "الدوائر الكهربية وقانون أوم للمغلقة", subject: "فيزياء", score: 55, trend: "up" }
          ].map(w => (
            <Card key={w.topic} className="flex flex-col sm:flex-row sm:items-center" style={{ padding: "18px 20px", gap: "16px" }}>
              <div className="hidden sm:block" style={{ width: 6, height: 44, borderRadius: "3px", background: w.score < 50 ? t.error : w.score < 60 ? t.warning : t.primary, flexShrink: 0 }} />
              
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: t.textPrimary, marginBottom: "4px", fontSize: "0.9375rem" }}>{w.topic}</div>
                <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{w.subject}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="sm:ml-3">
                {w.trend === "up" ? <TrendingUp size={16} color={t.success} /> : <TrendingDown size={16} color={t.error} />}
                <span style={{ fontSize: "1.125rem", fontWeight: 800, color: w.score < 50 ? t.error : w.score < 60 ? t.warning : t.primary, fontFamily: "'Cairo', sans-serif" }}>
                  {w.score}%
                </span>
              </div>

              <Button variant="tertiary" size="sm" className="w-full sm:w-auto" onClick={() => {}}>
                بدء المراجعة
                <ArrowLeft size={12} style={{ marginRight: "4px" }} />
              </Button>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
export default StudentGradesPage;
