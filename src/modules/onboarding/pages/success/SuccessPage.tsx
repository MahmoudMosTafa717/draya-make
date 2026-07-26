import * as React from "react";
import { useNavigate } from "react-router";
import { CheckCircle, ArrowLeft, GraduationCap } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import confetti from "canvas-confetti";

export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fire confetti on load
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", textAlign: "center", alignItems: "center", padding: "20px 0" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        backgroundColor: t.primary100, color: t.primary,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <CheckCircle size={40} />
      </div>

      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          تم تفعيل اشتراكك بنجاح!
        </h1>
        <p style={{ fontSize: "0.9375rem", color: t.textSecondary, maxWidth: "460px", lineHeight: 1.6 }}>
          مرحباً بك في درايَة! تم تفعيل خطة المحترف لحسابك بالكامل. يمكنك الآن البدء بإنشاء مجموعاتك الأولى ونشر باقاتك التعليمية.
        </p>
      </div>

      <Card style={{ padding: "20px 32px", width: "100%", maxWidth: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: t.textSecondary }}>الخطة الحالية:</span>
            <span style={{ fontWeight: 700, color: t.textPrimary }}>المحترف (Professional)</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: t.textSecondary }}>حالة الحساب:</span>
            <span style={{ fontWeight: 700, color: t.success }}>نشط (Active)</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: t.textSecondary }}>صلاحية الاشتراك:</span>
            <span style={{ fontWeight: 600, color: t.textPrimary }}>تتجدد تلقائياً</span>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "400px" }}>
        <Button variant="primary" size="lg" className="w-full" onClick={() => navigate("/teacher/dashboard")}>
          الذهاب للوحة التحكم
        </Button>
      </div>
    </div>
  );
};
export default SuccessPage;
