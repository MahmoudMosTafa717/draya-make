import * as React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { CreditCard, Wallet, Percent, ArrowLeft, ShieldAlert } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";
import { toast } from "@/shared/components/ui/Toast";

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") ?? "professional";
  const billing = searchParams.get("billing") ?? "monthly";

  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "wallet">("card");
  const [promoCode, setPromoCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // Plan info mapping
  const planDetails: Record<string, { name: string; price: number }> = {
    starter: { name: "الأساسي (مبتدئ)", price: billing === "annual" ? 119 : 149 },
    professional: { name: "المحترف (موصى به)", price: billing === "annual" ? 399 : 499 },
    enterprise: { name: "المؤسسات الكبرى", price: billing === "annual" ? 999 : 1299 },
  };

  const selectedPlan = planDetails[planId] || planDetails.professional;
  const priceMultiplier = billing === "annual" ? 12 : 1;
  const originalPrice = selectedPlan.price * priceMultiplier;
  const finalPrice = Math.max(0, originalPrice - discount);

  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === "draya20") {
      setDiscount(originalPrice * 0.2); // 20% discount
      toast.success("تم تطبيق كوبون الخصم", "حصلت على خصم 20% على اشتراكك.");
    } else {
      toast.error("كوبون غير صحيح", "يرجى التأكد من كتابة الكوبون بشكل صحيح.");
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setLoading(false);
    toast.success("تمت عملية الدفع بنجاح", "تم تفعيل حسابك بنجاح.");
    navigate("/onboarding/success");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="lg:flex-row">
      
      {/* Right Column: Checkout Info & Actions (60%) */}
      <form onSubmit={handlePaymentSubmit} style={{ flex: 1.5, display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "4px" }}>
            إتمام عملية الدفع والاشتراك
          </h1>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
            اختر وسيلة الدفع المناسبة وأدخل تفاصيل الفاتورة لتفعيل اشتراكك.
          </p>
        </div>

        {/* Payment Method Selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>
            طريقة الدفع المفضلة
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            <Card
              onClick={() => setPaymentMethod("card")}
              style={{
                flex: 1, padding: "16px", display: "flex", flexDirection: "column", alignItems: "center",
                gap: "10px", cursor: "pointer", border: paymentMethod === "card" ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
                background: paymentMethod === "card" ? t.primary50 : t.bgSurface
              }}
            >
              <CreditCard size={24} color={paymentMethod === "card" ? t.primary : t.textSecondary} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>بطاقة ائتمان / ميزة</span>
            </Card>

            <Card
              onClick={() => setPaymentMethod("wallet")}
              style={{
                flex: 1, padding: "16px", display: "flex", flexDirection: "column", alignItems: "center",
                gap: "10px", cursor: "pointer", border: paymentMethod === "wallet" ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
                background: paymentMethod === "wallet" ? t.primary50 : t.bgSurface
              }}
            >
              <Wallet size={24} color={paymentMethod === "wallet" ? t.primary : t.textSecondary} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>محفظة إلكترونية (فودافون كاش)</span>
            </Card>
          </div>
        </div>

        {/* Inputs depending on payment type */}
        {paymentMethod === "card" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Input label="الاسم على البطاقة" placeholder="John Doe" required />
            <Input label="رقم البطاقة" placeholder="4000 1234 5678 9010" required />
            <div style={{ display: "flex", gap: "12px" }}>
              <Input label="تاريخ الانتهاء" placeholder="MM/YY" required />
              <Input label="رمز الأمان (CVV)" placeholder="123" type="password" required />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Input label="رقم الهاتف المحمول المرتبط بالمحفظة" placeholder="01xxxxxxxxx" required />
            <div style={{
              padding: "12px 14px", background: "rgba(245, 158, 11, 0.05)",
              border: `1.5px solid ${t.warning}`, borderRadius: "8px",
              display: "flex", gap: "10px", alignItems: "flex-start"
            }}>
              <ShieldAlert size={18} color={t.warning} style={{ flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "0.78rem", color: t.textSecondary, lineHeight: 1.5 }}>
                سيتم إرسال رسالة دفع نصية قصيرة (SMS) إلى هاتفك المحمول من خلال شريك الدفع (Paymob) لتأكيد عملية الخصم وإدخال الـ OTP الخاص بالمحفظة.
              </span>
            </div>
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "12px" }}>
          ادفع الآن ({finalPrice} جنيه)
        </Button>
      </form>

      {/* Left Column: Order Summary Sidebar (40%) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px", borderBottom: `1px solid ${t.border}`, paddingBottom: "12px" }}>
            ملخص الطلب
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
              <span style={{ color: t.textSecondary }}>الخطة المختارة:</span>
              <span style={{ fontWeight: 700, color: t.textPrimary }}>{selectedPlan.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
              <span style={{ color: t.textSecondary }}>دورة الفاتورة:</span>
              <span style={{ fontWeight: 700, color: t.textPrimary }}>{billing === "annual" ? "سنوية (توفير 20%)" : "شهرية مرنة"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
              <span style={{ color: t.textSecondary }}>قيمة الاشتراك:</span>
              <span style={{ fontWeight: 600, color: t.textPrimary }}>{originalPrice} جنيه</span>
            </div>
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: t.success }}>
                <span>خصم الكوبون:</span>
                <span>-{discount} جنيه</span>
              </div>
            )}
          </div>

          {/* Promo code wrapper */}
          <div style={{ display: "flex", gap: "8px", borderTop: `1px solid ${t.border}`, paddingTop: "16px", marginBottom: "20px" }}>
            <Input
              placeholder="كوبون الخصم"
              value={promoCode}
              onChange={setPromoCode}
              icon={<Percent size={14} />}
            />
            <Button type="button" variant="secondary" size="md" onClick={applyPromo} style={{ flexShrink: 0 }}>
              تطبيق
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1.5px solid ${t.borderStrong}`, paddingTop: "16px", fontSize: "1.0625rem", fontWeight: 800 }}>
            <span style={{ color: t.textPrimary }}>المجموع الكلي:</span>
            <span style={{ color: t.primary }}>{finalPrice} جنيه</span>
          </div>
        </Card>

        {/* Link back */}
        <button
          onClick={() => navigate("/onboarding/choose-plan")}
          style={{
            background: "none", border: "none", color: t.textSecondary,
            fontSize: "0.8125rem", cursor: "pointer", display: "inline-flex",
            alignItems: "center", gap: "6px", justifyContent: "center"
          }}
        >
          <ArrowLeft size={14} />
          الرجوع لتعديل خطة الاشتراك
        </button>
      </div>

    </div>
  );
};
export default CheckoutPage;
