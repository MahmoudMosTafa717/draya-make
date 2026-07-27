import * as React from "react";
import { Link, useNavigate } from "react-router";
import { Lock, HelpCircle, KeyRound, ArrowLeft, Clock } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { toast } from "@/shared/components/ui/Toast";

export const LockedAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = React.useState(900); // 15 minutes in seconds

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
    return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "center", padding: "8px 0" }}>
      {/* Icon Illustration */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{
          width: 68, height: 68, borderRadius: "50%",
          backgroundColor: "rgba(239, 68, 68, 0.1)", color: t.error,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid rgba(239, 68, 68, 0.25)",
          boxShadow: "0 8px 24px rgba(239, 68, 68, 0.12)",
        }}>
          <Lock size={32} />
        </div>
      </div>

      {/* Message Header */}
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          تم قفل حسابك مؤقتاً
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
          تم قفل حسابك مؤقتًا بسبب عدة محاولات فاشلة لتسجيل الدخول. حفاظاً على أمان بياناتك، يرجى المحاولة مرة أخرى لاحقاً أو إعادة تعيين كلمة المرور.
        </p>
      </div>

      {/* Timer Note Box */}
      <div style={{
        padding: "16px 20px",
        background: t.bgSecondary,
        borderRadius: "12px",
        border: `1px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: t.textSecondary, fontSize: "0.8125rem", fontWeight: 600 }}>
          <Clock size={16} />
          <span>حاول مرة أخرى لاحقاً بعد انتهاء المؤقت:</span>
        </div>
        <span style={{ fontSize: "1.25rem", fontWeight: 800, color: secondsLeft > 0 ? t.error : t.success, fontFamily: "monospace", letterSpacing: "1px" }}>
          {secondsLeft > 0 ? formatTime(secondsLeft) : "00:00 - يمكنك المحاولة الآن"}
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/forgot-password")}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <KeyRound size={18} />
          إعادة تعيين كلمة المرور
        </Button>
        
        {secondsLeft === 0 ? (
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            المحاولة مجدداً لتسجيل الدخول
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="md"
            className="w-full"
            onClick={() => toast.info("الدعم الفني", "سيتم ربطك بمسؤول الدعم الفني في درايَة قريباً.")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <HelpCircle size={16} />
            التواصل مع الدعم الفني
          </Button>
        )}
      </div>

      {/* Footer link back to login */}
      <div style={{ textAlign: "center", marginTop: "4px" }}>
        <Link to="/login" style={{
          fontSize: "0.875rem", color: t.primary, fontWeight: 700,
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px"
        }}>
          العودة لتسجيل الدخول
          <ArrowLeft size={16} />
        </Link>
      </div>
    </div>
  );
};
export default LockedAccountPage;
