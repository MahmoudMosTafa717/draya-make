import * as React from "react";
import { useNavigate } from "react-router";
import { Lock, AlertCircle, HelpCircle } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";

export const LockedAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = React.useState(899); // 15 minutes in seconds

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins} دقيقة و ${secs} ثانية`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          backgroundColor: "rgba(239, 68, 68, 0.12)", color: t.error,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Lock size={28} />
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          الحساب مقفل مؤقتاً
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
          تم قفل حسابك نظراً لمحاولات تسجيل الدخول الخاطئة المتكررة. حفاظاً على أمان بياناتك، يرجى الانتظار للمحاولة مرة أخرى.
        </p>
      </div>

      <div style={{
        padding: "16px 20px",
        background: t.bgSecondary,
        borderRadius: "12px",
        border: `1px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>متبقي على فك القفل التلقائي:</span>
        <span style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.error, fontFamily: "'Cairo', sans-serif" }}>
          {secondsLeft > 0 ? formatTime(secondsLeft) : "يمكنك المحاولة الآن"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
        <Button variant="primary" size="lg" className="w-full" disabled={secondsLeft > 0} onClick={() => navigate("/login")}>
          المحاولة مجدداً
        </Button>
        
        <Button variant="secondary" size="md" className="w-full" onClick={() => navigate("/contact-support")}>
          <HelpCircle size={16} />
          التواصل مع الدعم الفني
        </Button>
      </div>
    </div>
  );
};
export default LockedAccountPage;
