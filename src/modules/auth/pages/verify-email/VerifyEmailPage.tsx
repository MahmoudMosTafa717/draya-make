import * as React from "react";
import { useNavigate } from "react-router";
import { Shield, RefreshCw } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { toast } from "@/shared/components/ui/Toast";

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = React.useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = React.useState(false);
  const [timer, setTimer] = React.useState(59);

  // Timer logic for resend code
  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (val: string, index: number) => {
    if (/[^0-9]/.test(val)) return; // Allow only digits
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // Auto-focus next input
    if (val !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = code.join("");
    if (otpValue.length < 6) {
      toast.warning("كود التحقق غير مكتمل", "يرجى ملء جميع خانات الكود الستة.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    toast.success("تم تفعيل البريد الإلكتروني", "ملفك الشخصي جاهز للتحديث.");
    navigate("/complete-profile");
  };

  const handleResend = () => {
    setTimer(59);
    toast.info("تم إعادة إرسال الكود", "تفقد صندوق بريدك الوارد.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          backgroundColor: t.primary100, color: t.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Shield size={28} />
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          تأكيد البريد الإلكتروني
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
          لقد أرسلنا رمز تحقق مكوناً من 6 أرقام إلى بريدك الإلكتروني. يرجى إدخاله هنا للمتابعة.
        </p>
      </div>

      <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* OTP Input Grid */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", direction: "ltr" }}>
          {code.map((char, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={char}
              onChange={e => handleChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              style={{
                width: "48px",
                height: "54px",
                borderRadius: "8px",
                border: `1.5px solid ${t.borderStrong}`,
                textAlign: "center",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: t.textPrimary,
                outline: "none",
                transition: "border-color 150ms",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = t.primary; }}
              onBlur={e => { e.currentTarget.style.borderColor = t.borderStrong; }}
            />
          ))}
        </div>

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
          تأكيد الرمز
        </Button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
        {timer > 0 ? (
          <span style={{ fontSize: "0.8125rem", color: t.textSecondary }}>
            إعادة إرسال الرمز خلال {timer} ثانية
          </span>
        ) : (
          <button
            onClick={handleResend}
            style={{
              background: "none", border: "none", color: t.primary, fontWeight: 700,
              fontSize: "0.8125rem", cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "4px", margin: "0 auto",
            }}
          >
            <RefreshCw size={12} />
            إعادة إرسال رمز التحقق
          </button>
        )}

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "none", border: "none", color: t.textSecondary,
            fontSize: "0.8125rem", cursor: "pointer", marginTop: "12px"
          }}
        >
          العودة لتسجيل الدخول
        </button>
      </div>
    </div>
  );
};
export default VerifyEmailPage;
