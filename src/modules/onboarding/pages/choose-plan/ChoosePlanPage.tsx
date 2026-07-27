import * as React from "react";
import { useNavigate } from "react-router";
import { Check, Star, ShieldCheck, Heart, Sparkles } from "lucide-react";
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
        {plans.map((plan, idx) => {
          const isGradientBg = idx === 2; // "المؤسسات الكبرى"
          const isLightFeatured = idx === 1; // "المحترف"

          return (
            <Card
              key={plan.id}
              interactive
              onClick={() => {
                const targetPlan = plan.id === "starter" ? "basic" : plan.id === "professional" ? "pro" : "enterprise";
                navigate(`/plans/${targetPlan}`);
              }}
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: isGradientBg ? `linear-gradient(135deg, ${t.primary900} 0%, ${t.primary} 100%)` : isLightFeatured ? "#F0FAF7" : t.bgSurface,
                border: isGradientBg ? "none" : isLightFeatured ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
                boxShadow: isLightFeatured ? t.shadow2 : isGradientBg ? t.shadow3 : t.shadow1,
                color: isGradientBg ? "#fff" : "inherit"
              }}
            >
              {isLightFeatured && (
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  left: "20px",
                  background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "0.6875rem",
                  fontWeight: 900,
                  boxShadow: "0 10px 20px -5px rgba(239, 68, 68, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  zIndex: 10
                }} className="animate-pulse-glow">
                  <Sparkles size={12} className="text-amber-200 animate-spin" style={{ animationDuration: "6s" }} />
                  <span>موصى به 🔥</span>
                </div>
              )}
              {isGradientBg && (
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <Badge variant="secondary" size="sm" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>مخصص</Badge>
                </div>
              )}

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: isGradientBg ? "#fff" : t.textPrimary, marginBottom: "8px" }}>
                  {plan.name}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: isGradientBg ? "#fff" : t.primary, fontFamily: "'Cairo', sans-serif" }}>
                    {billingAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span style={{ fontSize: "0.8125rem", color: isGradientBg ? "rgba(255,255,255,0.8)" : t.textSecondary }}>جنيه / شهرياً</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: isGradientBg ? "rgba(255,255,255,0.6)" : t.textDisabled }}>
                  {billingAnnual ? `يُدفع ${plan.priceAnnual * 12} جنيه سنوياً` : "يُدفع شهرياً بشكل مرن"}
                </span>
              </div>

              <p style={{ fontSize: "0.8125rem", color: isGradientBg ? "rgba(255,255,255,0.8)" : t.textSecondary, marginBottom: "24px", lineHeight: 1.5 }}>
                {plan.sub}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px", flex: 1 }}>
                {plan.feats.map(feat => (
                  <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <Check size={14} color={isGradientBg ? t.primary200 : t.primary} style={{ marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8125rem", color: isGradientBg ? "#fff" : t.textPrimary, lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Button
                  variant={isLightFeatured ? "primary" : "secondary"}
                  className="w-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan.id);
                  }}
                  style={isGradientBg ? { background: "#fff", color: t.primary, border: "none" } : undefined}
                >
                  {plan.cta}
                </Button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const targetPlan = plan.id === "starter" ? "basic" : plan.id === "professional" ? "pro" : "enterprise";
                    navigate(`/plans/${targetPlan}`);
                  }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: isGradientBg ? "#fff" : t.primary, fontSize: "0.8125rem", fontWeight: 700,
                    textAlign: "center", paddingTop: "4px", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px"
                  }}
                >
                  استعرض تفاصيل ومميزات الباقة بالكامل ←
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default ChoosePlanPage;
