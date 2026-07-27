import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { CreditCard, ShieldCheck, Zap, Info, ArrowUpRight, HelpCircle } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const SubscriptionPage: React.FC = () => {
  const [showCompareModal, setShowCompareModal] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);

  // Quota mock stats
  const quotas = [
    { label: "الطلاب النشطون", used: 142, max: 500, unit: "طالب" },
    { label: "المساحة التخزينية", used: 1.2, max: 10, unit: "جيجابايت" },
    { label: "الباقات التعليمية", used: 3, max: 10, unit: "باقات" },
    { label: "المجموعات الدراسية", used: 4, max: 15, unit: "مجموعات" },
  ];

  // Mock charts data
  const usageHistory = [
    { name: "فبراير", students: 45, storage: 0.4 },
    { name: "مارس", students: 78, storage: 0.7 },
    { name: "أبريل", students: 110, storage: 0.9 },
    { name: "مايو", students: 142, storage: 1.2 },
  ];

  const handleCancelSub = async () => {
    setCancelling(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCancelling(false);
    toast.success("تم إلغاء التجديد التلقائي", "سينتهي اشتراكك في تاريخ الاستحقاق القادم.");
  };

  const handleRenew = () => {
    toast.success("تم تفعيل التجديد التلقائي بنجاح");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <SectionTitle sub="إدارة خطة اشتراك المعلم الحالية والتحقق من الحصص المستهلكة والعدادات.">
        الاشتراك والعدادات
      </SectionTitle>

      {/* Plan summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current plan details */}
        <Card style={{ padding: "24px", md: "span 2", display: "flex", flexDirection: "column", gap: "16px" }} className="md:col-span-2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <Badge variant="ai" size="md">الخطة النشطة</Badge>
              <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: t.textPrimary, marginTop: "8px" }}>
                الخطة الاحترافية (Professional)
              </h2>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary, marginTop: "2px" }}>
                تتجدد تلقائياً في 20 أغسطس 2026 بقيمة 399 جنيه مصري
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="primary" size="md" onClick={() => setShowCompareModal(true)}>
                <ArrowUpRight size={16} />
                ترقية خطة الاشتراك
              </Button>
            </div>
          </div>

          <div style={{
            display: "flex", gap: "16px", flexWrap: "wrap",
            padding: "16px", backgroundColor: t.bgSecondary, borderRadius: "10px", border: `1px solid ${t.border}`
          }}>
            {[
              { label: "وسيلة الدفع", value: "بطاقة ائتمان ميزة تنتهي بـ 4321", icon: <CreditCard size={16} /> },
              { label: "حالة الاشتراك", value: "نشط ومتصل بالدفع الآلي", icon: <ShieldCheck size={16} color={t.success} /> }
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "200px" }}>
                <span style={{ color: t.textSecondary }}>{d.icon}</span>
                <div>
                  <span style={{ fontSize: "0.75rem", color: t.textSecondary, display: "block" }}>{d.label}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{d.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", borderTop: `1px solid ${t.border}`, paddingTop: "16px" }}>
            <Button variant="secondary" size="sm" onClick={handleRenew}>تحديث بيانات بطاقة الدفع</Button>
            <Button variant="tertiary" size="sm" onClick={handleCancelSub} loading={cancelling} style={{ color: t.error }}>إلغاء التجديد التلقائي</Button>
          </div>
        </Card>

        {/* Short quota summaries card */}
        <Card style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary }}>العدادات العامة</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {quotas.map(q => {
              const pct = (q.used / q.max) * 100;
              return (
                <div key={q.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                    <span style={{ color: t.textPrimary, fontWeight: 600 }}>{q.label}</span>
                    <span style={{ color: t.textSecondary }}>
                      {q.used} / {q.max} {q.unit}
                    </span>
                  </div>
                  <ProgressBar value={pct} color={pct > 80 ? t.error : pct > 60 ? t.warning : t.primary} />
                </div>
              );
            })}
          </div>
        </Card>

      </div>

      {/* Usage History Chart */}
      <Card style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: t.textPrimary, marginBottom: "16px" }}>نمو أعداد المجموعات والطلاب</h3>
        
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={usageHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: t.textSecondary }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: t.textSecondary }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: "8px" }} />
            <Bar dataKey="students" fill={t.primary} name="الطلاب الجدد" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Subscription comparison modal */}
      <Modal isOpen={showCompareModal} onClose={() => setShowCompareModal(false)} title="مقارنة خطط اشتراكات المعلمين" size="lg">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
            اختر الخطة المناسبة لنمو مركزك التعليمي. الترقية تطبق فوراً مع تسوية فرق السعر المالي.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: `2.5px solid ${t.borderStrong}`, backgroundColor: t.bgSecondary }}>
                <th style={{ padding: "12px", fontWeight: 700 }}>الميزة</th>
                <th style={{ padding: "12px", fontWeight: 700 }}>الأساسي</th>
                <th style={{ padding: "12px", fontWeight: 700, color: t.primary }}>الاحترافي</th>
                <th style={{ padding: "12px", fontWeight: 700 }}>المؤسسات</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "الطلاب الأقصى", starter: "50 طالب", prof: "غير محدود", enterprise: "غير محدود" },
                { name: "سعة التخزين سحابياً", starter: "2 جيجابايت", prof: "10 جيجابايت", enterprise: "مخصصة بالكامل" },
                { name: "بناء الامتحانات الذكية AI", starter: "غير متاح", prof: "20 اختبار / شهر", enterprise: "غير محدود" },
                { name: "لوحات وتقارير أولياء الأمور", starter: "بسيطة", prof: "تفاعلية بالذكاء الاصطناعي", enterprise: "تفاعلية + ربط واتساب" },
                { name: "بوابة دفع Paymob للطلاب", starter: "نسبة سحب عالية", prof: "شروط تفضيلية", enterprise: "بوابة دفع خاصة بالسنتر" },
                { name: "السعر الشهري (دفع سنوي)", starter: "مجاني", prof: "399 جنيه", enterprise: "مخصص" },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: t.textPrimary }}>{row.name}</td>
                  <td style={{ padding: "12px", color: t.textSecondary }}>{row.starter}</td>
                  <td style={{ padding: "12px", color: t.primary, fontWeight: 700 }}>{row.prof}</td>
                  <td style={{ padding: "12px", color: t.textSecondary }}>{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyBetween: "space-between", gap: "8px", marginTop: "12px" }}>
            <Button variant="secondary" onClick={() => { setShowCompareModal(false); window.location.href = "/plans/basic"; }}>تفاصيل الخطة الأساسية</Button>
            <Button variant="primary" onClick={() => { setShowCompareModal(false); window.location.href = "/plans/pro"; }}>تفاصيل خطة المحترف</Button>
            <Button variant="tertiary" onClick={() => { setShowCompareModal(false); window.location.href = "/plans/enterprise"; }}>تفاصيل المؤسسات</Button>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <Button variant="secondary" onClick={() => setShowCompareModal(false)}>إغلاق المقارنة</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SubscriptionPage;
