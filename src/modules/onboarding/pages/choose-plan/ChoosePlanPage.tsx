import * as React from "react";
import { useNavigate } from "react-router";
import { Check, Star, ShieldCheck, Heart } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { ACCENT, ACCENT_BG } from "@/shared/constants/accent";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";

export const ChoosePlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingAnnual, setBillingAnnual] = React.useState(false);

  const plans = [
    {
      id: "starter",
      name: "الأساسي (مبتدئ)",
      priceMonthly: 149,
      priceAnnual: 119,
      sub: "للمعلمين أصحاب المجموعات المحدودة",
      feats: ["حتى 50 طالب نشط", "مجموعتان كحد أقصى", "باقتا دراسة", "تقارير أداء مبسطة للطلاب"],
      cta: "اختر الخطة الأساسية",
    },
    {
      id: "professional",
      name: "المحترف (الأكثر طلباً)",
      priceMonthly: 499,
      priceAnnual: 399,
      sub: "للأكاديميات والسناتر المتكاملة",
      feats: ["طلاب غير محدودين", "مجموعات وباقات غير محدودة", "AI Exam Builder (20 امتحان/شهر)", "تقارير AI متقدمة لأولياء الأمور", "مخططات وتحليلات إحصائية متكاملة", "دعم فني ذو أولوية"],
      cta: "ابدأ خطة المحترف",
      featured: true,
    },
    {
      id: "enterprise",
      name: "المؤسسات الكبرى",
      priceMonthly: 1299,
      priceAnnual: 999,
      sub: "للمراكز التعليمية وسلاسل الأكاديميات",
      feats: ["كل مميزات محترف", "تخصيص الهوية والشعار الخاص بالسنتر (White-label)", "ربط API وبوابات دفع مخصصة", "سرعة أداء ومساحة تخزين سحابية غير محدودة", "مدير حساب خاص لمتابعة العمل"],
      cta: "ابدأ خطة المؤسسات",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    navigate(`/onboarding/checkout?plan=${planId}&billing=${billingAnnual ? "annual" : "monthly"}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          اختر خطة الاشتراك المناسبة لك
        </h1>
        <p style={{ fontSize: "0.9375rem", color: t.textSecondary, marginBottom: "24px" }}>
          جميع الخطط تشمل دعماً فنياً ودورات تدريبية سريعة. لا توجد رسوم مخفية.
        </p>

        {/* Toggle Billing */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: t.bgSurface, border: `1px solid ${t.border}`,
          borderRadius: "999px", padding: "4px"
        }}>
          {([["اشتراك شهري", false], ["اشتراك سنوي (توفير 20%)", true]] as [string, boolean][]).map(([label, val]) => (
            <button
              key={label}
              type="button"
              onClick={() => setBillingAnnual(val)}
              style={{
                padding: "8px 20px", borderRadius: "999px", border: "none", cursor: "pointer",
                background: billingAnnual === val ? t.primary : "transparent",
                color: billingAnnual === val ? "#fff" : t.textSecondary,
                fontSize: "0.875rem", fontWeight: 600, transition: "all 150ms",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map(plan => (
          <Card
            key={plan.id}
            interactive
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              border: plan.featured ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
              background: plan.featured ? `linear-gradient(160deg, #FAFEF9 0%, #F0FAF7 100%)` : t.bgSurface,
              boxShadow: plan.featured ? `0 12px 30px rgba(27,109,99,0.12)` : t.shadow1,
              transform: plan.featured ? "scale(1.02)" : "none",
              position: "relative",
            }}
          >
            {plan.featured && (
              <div style={{ position: "absolute", top: "-14px", right: "20px" }}>
                <Badge variant="primary" size="md">
                  <Star size={12} fill={ACCENT.orange} color={ACCENT.orange} />
                  الأكثر مبيعاً
                </Badge>
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, marginBottom: "8px" }}>
                {plan.name}
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>
                  {billingAnnual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary }}>جنيه / شهرياً</span>
              </div>
              <span style={{ fontSize: "0.75rem", color: t.textDisabled }}>
                {billingAnnual ? `يُدفع ${plan.priceAnnual * 12} جنيه سنوياً` : "يُدفع شهرياً بشكل مرن"}
              </span>
            </div>

            <p style={{ fontSize: "0.8125rem", color: t.textSecondary, marginBottom: "24px", lineHeight: 1.5 }}>
              {plan.sub}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px", flex: 1 }}>
              {plan.feats.map(feat => (
                <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <Check size={14} color={t.primary} style={{ marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8125rem", color: t.textPrimary, lineHeight: 1.4 }}>{feat}</span>
                </div>
              ))}
            </div>

            <Button
              variant={plan.featured ? "primary" : "secondary"}
              className="w-full"
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ChoosePlanPage;
