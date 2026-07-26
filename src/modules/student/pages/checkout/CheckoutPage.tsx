import * as React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { CreditCard, Wallet, Percent, ArrowLeft, ShieldCheck } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";
import { toast } from "@/shared/components/ui/Toast";

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pkgId = searchParams.get("pkg") ?? "pkg_1";

  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "wallet">("card");
  const [promoCode, setPromoCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // Mock packages list
  const mockPackages: Record<string, { name: string; price: number; teacher: string }> = {
    pkg_1: { name: "باقة الجبر وحساب المثلثات للشهادة الثانوية", price: 150, teacher: "أ. أحمد السيد" },
    pkg_2: { name: "باقة التفاضل والتكامل والتطبيقات", price: 160, teacher: "أ. أحمد السيد" },
  };

  const selectedPkg = mockPackages[pkgId] || mockPackages.pkg_1;
  const finalPrice = Math.max(0, selectedPkg.price - discount);

  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === "student10") {
      setDiscount(selectedPkg.price * 0.1); // 10% discount
      toast.success("تم تطبيق كوبون الخصم", "خصم 10% على باقة الدراسة.");
    } else {
      toast.error("كوبون غير صحيح");
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success("تم تفعيل الباقة بنجاح", "تم تسجيلك في الباقة والمجموعات الدراسية المرتبطة.");
    navigate("/student/my-packages");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="lg:flex-row">
      
      {/* Forms (60%) */}
      <form onSubmit={handlePaymentSubmit} style={{ flex: 1.5, display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "4px" }}>
            بوابة الدفع الإلكتروني
          </h1>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
            تفاصيل إتمام الدفع الآمن للحساب الأكاديمي.
          </p>
        </div>

        {/* Method selector */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Card
            onClick={() => setPaymentMethod("card")}
            style={{
              flex: 1, padding: "16px", display: "flex", flexDirection: "column", alignItems: "center",
              gap: "8px", cursor: "pointer", border: paymentMethod === "card" ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
              background: paymentMethod === "card" ? t.primary50 : t.bgSurface
            }}
          >
            <CreditCard size={20} color={paymentMethod === "card" ? t.primary : t.textSecondary} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>بطاقة دفع فيزا / ميزة</span>
          </Card>
          
          <Card
            onClick={() => setPaymentMethod("wallet")}
            style={{
              flex: 1, padding: "16px", display: "flex", flexDirection: "column", alignItems: "center",
              gap: "8px", cursor: "pointer", border: paymentMethod === "wallet" ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
              background: paymentMethod === "wallet" ? t.primary50 : t.bgSurface
            }}
          >
            <Wallet size={20} color={paymentMethod === "wallet" ? t.primary : t.textSecondary} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>محافظ إلكترونية (فودافون كاش)</span>
          </Card>
        </div>

        {paymentMethod === "card" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Input label="رقم البطاقة" placeholder="4000 1234 5678 9010" required />
            <div style={{ display: "flex", gap: "12px" }}>
              <Input label="تاريخ الانتهاء" placeholder="MM/YY" required />
              <Input label="رمز الأمان CVV" placeholder="123" type="password" required />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Input label="رقم المحفظة (الواتساب / فودافون كاش)" placeholder="01xxxxxxxxx" required />
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
          دفع وتفعيل ({finalPrice} جنيه)
        </Button>
      </form>

      {/* Summary (40%) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px", borderBottom: `1px solid ${t.border}`, paddingBottom: "12px" }}>
            ملخص الفاتورة
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
              <span style={{ color: t.textSecondary }}>الباقة المطلوبة:</span>
              <span style={{ fontWeight: 700, color: t.textPrimary }}>{selectedPkg.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
              <span style={{ color: t.textSecondary }}>المعلم المدرس:</span>
              <span style={{ fontWeight: 600, color: t.textPrimary }}>{selectedPkg.teacher}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: t.success }}>
                <span>الخصم المطبق:</span>
                <span>-{discount} جنيه</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "8px", borderTop: `1px solid ${t.border}`, paddingTop: "16px", marginBottom: "16px" }}>
            <Input
              placeholder="كود الخصم (كوبون)"
              value={promoCode}
              onChange={setPromoCode}
              icon={<Percent size={14} />}
            />
            <Button type="button" variant="secondary" size="md" onClick={applyPromo} style={{ flexShrink: 0 }}>تطبيق</Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1.5px solid ${t.borderStrong}`, paddingTop: "16px", fontSize: "1rem", fontWeight: 800 }}>
            <span style={{ color: t.textPrimary }}>المبلغ النهائي:</span>
            <span style={{ color: t.primary }}>{finalPrice} جنيه</span>
          </div>
        </Card>

        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none", border: "none", color: t.textSecondary,
            fontSize: "0.8125rem", cursor: "pointer", display: "inline-flex",
            alignItems: "center", gap: "6px", justifyContent: "center"
          }}
        >
          <ArrowLeft size={14} />
          الرجوع للمتجر
        </button>
      </div>

    </div>
  );
};
export default CheckoutPage;
