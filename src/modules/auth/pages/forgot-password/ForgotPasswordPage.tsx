import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, ArrowLeft, Check, CheckCircle2, AlertTriangle, Eye, EyeOff, RotateCcw } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3 | 4>(1); // 4 = Success state
  const [loading, setLoading] = React.useState(false);

  // Step 1: Email / Phone
  const { register: registerStep1, handleSubmit: handleStep1, setError: setError1, formState: { errors: errors1 } } = useForm({
    defaultValues: { identity: "" }
  });

  // Step 2: OTP State
  const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const [timer, setTimer] = React.useState(30);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Step 3: Reset Password
  const { register: registerStep3, handleSubmit: handleStep3, setError: setError3, formState: { errors: errors3 } } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" }
  });
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // OTP Timer countdown
  React.useEffect(() => {
    if (currentStep !== 2 || timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [currentStep, timer]);

  // Step 1 Submit: Send Code
  const onStep1Submit = async (data: { identity: string }) => {
    const valLower = (data.identity || "").toLowerCase();
    if (valLower.includes("wrong") || valLower.includes("error") || valLower === "0000") {
      setError1("identity", { type: "manual", message: "هذا الحساب غير مسجل في نظام درايَة" });
      toast.error("خطأ في الحساب", "البريد الإلكتروني أو رقم الهاتف غير موجود.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    toast.success("تم إرسال رمز التحقق", "يرجى التحقق من الرسائل الواردة على هاتفك أو بريدك.");
    setCurrentStep(2);
    setTimer(30);
  };

  // Step 2 Handlers: Segmented OTP
  const handleOtpChange = (index: number, value: string) => {
    setOtpError(null);
    const char = value.slice(-1); // only take last char
    if (char && !/^\d+$/.test(char)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = char || "";
    setOtp(newOtp);

    // Auto focus next
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(5, pasted.length - 1)]?.focus();
  };

  const onStep2Verify = async () => {
    const code = otp.join("");
    if (code.length < 6 || code === "000000" || code.includes("111")) {
      setOtpError("رمز التحقق غير صحيح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.");
      toast.error("رمز غير صحيح", "يرجى التأكد من الرمز المدخل.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    toast.success("تم التحقق بنجاح", "يرجى تعيين كلمة المرور الجديدة الآن.");
    setCurrentStep(3);
  };

  // Step 3 Submit: Reset Password
  const onStep3Submit = async (data: { newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      setError3("confirmPassword", { type: "manual", message: "كلمتا المرور غير متطابقتين" });
      toast.error("خطأ في التحقق", "كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);

    toast.success("تم تحديث كلمة المرور", "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.");
    setCurrentStep(4); // Success state
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `0${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ── Step Indicator (Shown in steps 1, 2, 3) ── */}
      {currentStep < 4 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px", padding: "0 4px" }}>
          {[
            { step: 1, label: "إرسال الرمز" },
            { step: 2, label: "رمز التحقق" },
            { step: 3, label: "كلمة المرور" },
          ].map((item, idx) => {
            const active = currentStep === item.step;
            const passed = currentStep > item.step;
            return (
              <React.Fragment key={item.step}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: passed ? t.success : active ? t.primary : t.bgSecondary,
                    color: (passed || active) ? "#fff" : t.textSecondary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700,
                    border: `1px solid ${passed ? t.success : active ? t.primary : t.borderStrong}`,
                    transition: "all 200ms",
                  }}>
                    {passed ? <Check size={13} strokeWidth={3} /> : item.step}
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: active ? 700 : 500, color: active ? t.textPrimary : t.textSecondary }}>
                    {item.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div style={{ flex: 1, height: "2px", background: passed ? t.success : t.border, margin: "0 6px", transition: "all 200ms" }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* ── Screen A: Forgot Password ── */}
      {currentStep === 1 && (
        <>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
              استعادة كلمة المرور
            </h1>
            <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
              أدخل البريد الإلكتروني أو رقم الهاتف المرتبط بحسابك وسنرسل لك رمز تحقق (OTP) لاسترجاع الحساب.
            </p>
          </div>

          <form onSubmit={handleStep1(onStep1Submit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Input
              label="البريد الإلكتروني / رقم الهاتف"
              placeholder="name@example.com أو 01xxxxxxxxx"
              type="text"
              icon={<Mail size={18} />}
              error={errors1.identity ? (errors1.identity.message as string || "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح") : undefined}
              required
              {...registerStep1("identity", { required: true, minLength: 5 })}
            />

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
              إرسال رمز التحقق
            </Button>
          </form>
        </>
      )}

      {/* ── Screen B: OTP Verification ── */}
      {currentStep === 2 && (
        <>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
              أدخل رمز التحقق (OTP)
            </h1>
            <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
              تم إرسال رمز تحقق مكون من 6 أرقام إلى حسابك. يرجى إدخال الرمز للمتابعة.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Segmented 6-Digit OTP Boxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
                رمز التحقق <span style={{ color: t.primary }}>*</span>
              </label>
              <div style={{ display: "flex", gap: "8px", justifyContent: "space-between", direction: "ltr" }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => { inputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    style={{
                      width: "48px",
                      height: "52px",
                      textAlign: "center",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      borderRadius: "10px",
                      border: `1.5px solid ${otpError ? t.error : digit ? t.primary : t.borderStrong}`,
                      background: t.bgSurface,
                      color: t.textPrimary,
                      outline: "none",
                      boxShadow: digit ? "0 0 0 2px rgba(27, 109, 99, 0.1)" : "none",
                      transition: "all 150ms",
                    }}
                  />
                ))}
              </div>
              {otpError && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: t.error, fontWeight: 600, marginTop: "4px" }}>
                  <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                  <span>{otpError}</span>
                </div>
              )}
            </div>

            <Button onClick={onStep2Verify} variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
              تحقق من الرمز
            </Button>

            {/* Cooldown Timer & Resend */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.875rem" }}>
              <span style={{ color: t.textSecondary }}>لم يصلك الرمز؟</span>
              {timer > 0 ? (
                <span style={{ color: t.textSecondary, fontWeight: 700, fontFamily: "monospace" }}>
                  إعادة الإرسال خلال {formatTimer(timer)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(30);
                    toast.info("تم إرسال رمز جديد", "يرجى التحقق من الرسائل الواردة.");
                  }}
                  style={{ background: "transparent", border: "none", color: t.primary, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <RotateCcw size={14} /> إعادة إرسال الرمز
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Screen C: Reset Password ── */}
      {currentStep === 3 && (
        <>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
              تعيين كلمة مرور جديدة
            </h1>
            <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
              يرجى إدخال كلمة مرور جديدة وتأكيدها. يجب أن تتكون من 6 أحرف على الأقل.
            </p>
          </div>

          <form onSubmit={handleStep3(onStep3Submit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Input
              label="كلمة المرور الجديدة"
              placeholder="•••••••• (6 أحرف على الأقل)"
              type={showNew ? "text" : "password"}
              icon={<Lock size={18} />}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", color: t.textSecondary, display: "flex", alignItems: "center", outline: "none" }}
                  aria-label={showNew ? "إخفاء" : "إظهار"}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              error={errors3.newPassword ? "كلمة المرور مطلوبة (6 أحرف على الأقل)" : undefined}
              required
              {...registerStep3("newPassword", { required: true, minLength: 6 })}
            />

            <Input
              label="تأكيد كلمة المرور الجديدة"
              placeholder="••••••••"
              type={showConfirm ? "text" : "password"}
              icon={<Lock size={18} />}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", color: t.textSecondary, display: "flex", alignItems: "center", outline: "none" }}
                  aria-label={showConfirm ? "إخفاء" : "إظهار"}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              error={errors3.confirmPassword ? (errors3.confirmPassword.message as string || "تأكيد كلمة المرور مطلوب") : undefined}
              required
              {...registerStep3("confirmPassword", { required: true })}
            />

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
              تحديث كلمة المرور
            </Button>
          </form>
        </>
      )}

      {/* ── Success State (Step 4) ── */}
      {currentStep === 4 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", padding: "16px 0" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.12)", color: "#22C55E",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #22C55E", margin: "0 auto",
          }}>
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
              تم تغيير كلمة المرور بنجاح
            </h2>
            <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6, maxWidth: "340px", margin: "0 auto" }}>
              تم تحديث كلمة المرور لحسابك بأمان. يمكنك الآن العودة وتسجيل الدخول إلى منصة درايَة بكلمة المرور الجديدة.
            </p>
          </div>
          <Link to="/login" style={{ width: "100%", textDecoration: "none", marginTop: "8px" }}>
            <Button variant="primary" size="lg" className="w-full">
              الذهاب إلى تسجيل الدخول
            </Button>
          </Link>
        </div>
      )}

      {/* Footer Back Link (In Steps 1-3) */}
      {currentStep < 4 && (
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Link to="/login" style={{
            fontSize: "0.875rem", color: t.primary, fontWeight: 700,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px"
          }}>
            العودة لتسجيل الدخول
            <ArrowLeft size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default ForgotPasswordPage;
