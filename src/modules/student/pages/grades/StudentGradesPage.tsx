import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Star, CheckCircle, TrendingUp, TrendingDown, ArrowLeft, Brain, HelpCircle } from "lucide-react";
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

  const radarData = [
    { subject: "رياضيات", A: 85, fullMark: 100 },
    { subject: "فيزياء", A: 78, fullMark: 100 },
    { subject: "كيمياء", A: 91, fullMark: 100 },
    { subject: "أحياء", A: 82, fullMark: 100 },
    { subject: "لغات", A: 88, fullMark: 100 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "relative" }}>
      {/* Decorative Blur Blobs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full filter blur-[100px] bg-emerald-50/20 opacity-70 animate-float-blob pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full filter blur-[120px] bg-violet-50/15 opacity-60 animate-float-blob pointer-events-none" style={{ animationDelay: "3s" }} />

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
          <Card key={kpi.label} style={{ padding: "20px 24px", flex: 1, minWidth: "160px", border: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>{kpi.label}</span>
              <span style={{ background: t.primary50, color: t.primary, padding: "8px", borderRadius: "10px", display: "flex" }}>{kpi.icon}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 800, color: t.textPrimary, fontFamily: "'Cairo', sans-serif" }}>{kpi.val}</span>
              {kpi.trend === "up" && <TrendingUp size={16} color={t.success} />}
            </div>
          </Card>
        ))}
      </div>

      {/* Grid Area Chart vs Skill Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Performance Trend Area Chart */}
        <Card style={{ padding: "24px", border: `1px solid ${t.border}` }} className="lg:col-span-2">
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, marginBottom: "20px" }}>منحنى تطور الأداء الأكاديمي</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data} margin={{ left: -16 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={t.primary} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={t.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: t.textSecondary, fontWeight: 500 }} />
              <YAxis tick={{ fontSize: 12, fill: t.textSecondary, fontWeight: 500 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "12px", boxShadow: t.shadow2 }} />
              <Area type="monotone" dataKey="avg" stroke={t.primary} fill="url(#g1)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Skill Radar Chart */}
        <Card style={{ padding: "24px", border: `1px solid ${t.border}`, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, marginBottom: "4px" }}>خريطة توزيع المهارات</h3>
          <p style={{ fontSize: "0.75rem", color: t.textSecondary, marginBottom: "16px" }}>نسب إتقان المهارات الأكاديمية بالذكاء الاصطناعي</p>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke={t.border} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: t.textSecondary, fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: t.textDisabled, fontSize: 10 }} />
                <Radar name="الإتقان" dataKey="A" stroke={t.primary} fill={t.primary} fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Results by Subject horizontal grid */}
      <Card style={{ padding: "24px", border: `1px solid ${t.border}` }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, marginBottom: "20px" }}>النتائج حسب المواد الدراسية</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "الرياضيات", avg: 87, color: t.primary },
            { name: "الفيزياء", avg: 82, color: t.primary },
            { name: "الكيمياء", avg: 91, color: t.primary }
          ].map(s => (
            <div key={s.name} style={{ background: t.bgSecondary, border: `1px solid ${t.border}`, padding: "16px", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem" }}>
                <span style={{ color: t.textPrimary, fontWeight: 700 }}>{s.name}</span>
                <span style={{ fontWeight: 800, color: s.color, fontFamily: "'Cairo', sans-serif" }}>{s.avg}%</span>
              </div>
              <ProgressBar value={s.avg} />
            </div>
          ))}
        </div>
      </Card>

      {/* Weak Points list */}
      <div>
        <SectionTitle>موضوعات ومهارات تحتاج إلى مراجعة وتطوير</SectionTitle>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            { topic: "المشتقات والتكامل وتطبيقات المساحات", subject: "رياضيات", score: 42, trend: "down" },
            { topic: "الدوائر الكهربية وقانون أوم للمغلقة", subject: "فيزياء", score: 55, trend: "up" }
          ].map(w => (
            <Card 
              key={w.topic} 
              className="flex flex-col sm:flex-row sm:items-center transform hover:-translate-y-0.5 hover:shadow-md transition-all duration-300" 
              style={{ padding: "20px", gap: "16px", border: `1px solid ${t.border}` }}
            >
              <div className="hidden sm:block" style={{ width: 6, height: 44, borderRadius: "3px", background: w.score < 50 ? t.error : w.score < 60 ? t.warning : t.primary, flexShrink: 0 }} />
              
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: t.textPrimary, marginBottom: "6px", fontSize: "0.9375rem" }}>{w.topic}</div>
                <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{w.subject}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="sm:ml-3">
                {w.trend === "up" ? <TrendingUp size={16} color={t.success} /> : <TrendingDown size={16} color={t.error} />}
                <span style={{ fontSize: "1.125rem", fontWeight: 800, color: w.score < 50 ? t.error : w.score < 60 ? t.warning : t.primary, fontFamily: "'Cairo', sans-serif" }}>
                  {w.score}%
                </span>
              </div>

              <Button variant="tertiary" size="sm" className="w-full sm:w-auto" style={{ border: `1px solid ${t.border}` }} onClick={() => {}}>
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
