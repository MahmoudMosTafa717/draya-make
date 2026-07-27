import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, Lock as LockIcon, Check, Eye, EyeOff, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

type VisualState = "default" | "loading" | "wrong" | "locked" | "success";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [visualState, setVisualState] = React.useState<VisualState>("default");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  // Initialize form with defaults
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: any) => {
    // If user is previewing locked or success, ignore submit
    if (visualState === "locked" || visualState === "success") return;

    // Intelligent mock triggers based on input keywords
    const emailLower = (data.email || "").toLowerCase();
    
    if (emailLower.includes("lock")) {
      setVisualState("locked");
      toast.error("الحساب مقفل مؤقتاً", "تم استنفاد محاولات الدخول المسموح بها.");
      setTimeout(() => navigate("/locked-account"), 1600);
      return;
    } 
    
    if (emailLower.includes("wrong") || emailLower.includes("error") || data.password === "123456") {
      setVisualState("wrong");
      toast.error("خطأ في تسجيل الدخول", "بيانات الدخول غير صحيحة.");
      return;
    }

    // Normal successful login simulation
    setVisualState("loading");
    await new Promise(resolve => setTimeout(resolve, 1200));
    setVisualState("success");
    toast.success("تم تسجيل الدخول بنجاح", "مرحباً بك مجدداً في درايَة.");

    setTimeout(() => {
      if (emailLower.includes("student")) {
        navigate("/student/dashboard");
      } else {
        navigate("/teacher/dashboard");
      }
    }, 1000);
  };

  const isFormDisabled = visualState === "loading" || visualState === "success" || visualState === "locked";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ── Interactive State Preview Switcher (For Testing & Review) ── */}
      <div style={{
        padding: "10px 12px",
        borderRadius: "10px",
        background: t.bgSecondary,
        border: `1px dashed ${t.borderStrong}`,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: t.textSecondary, display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🧪 معاينة حالات واجهة الدخول (Demo States):</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {( [
            { id: "default", label: "الافتراضي (Default)" },
            { id: "loading", label: "جاري التحميل (Loading)" },
            { id: "wrong", label: "بيانات خاطئة (Wrong)" },
            { id: "locked", label: "الحساب مقفل (Locked)" },
            { id: "success", label: "تسجيل ناجح (Success)" },
          ] as const ).map(st => {
            const active = visualState === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setVisualState(st.id)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: `1px solid ${active ? t.primary : t.border}`,
                  background: active ? t.primary : t.bgSurface,
                  color: active ? "#fff" : t.textSecondary,
                  fontSize: "0.75rem",
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 120ms",
                }}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          تسجيل الدخول
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
          أهلاً بك مجدداً! يرجى إدخال البريد الإلكتروني وكلمة المرور للمتابعة.
        </p>
      </div>

      {/* ── State Specific Banners ── */}
      {visualState === "wrong" && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "10px", background: "rgba(239, 68, 68, 0.08)", border: `1px solid ${t.error}`, color: t.error, fontSize: "0.875rem", fontWeight: 600 }}>
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span>بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور.</span>
        </div>
      )}

      {visualState === "locked" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "14px 16px", borderRadius: "12px", background: "rgba(245, 158, 11, 0.08)", border: `1px solid ${t.warning}`, color: t.textPrimary, fontSize: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: t.warning, fontWeight: 700, fontSize: "0.9375rem" }}>
            <ShieldAlert size={20} />
            <span>تم قفل الحساب مؤقتاً لدواعي أمنية</span>
          </div>
          <p style={{ margin: 0, color: t.textSecondary, lineHeight: 1.5 }}>
            تم استنفاد محاولات الدخول المسموح بها. سيتم تحويلك إلى صفحة الحساب المقفل لإعادة التفعيل...
          </p>
          <div>
            <Link to="/locked-account" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", fontWeight: 700, color: t.primary, textDecoration: "none", padding: "6px 12px", borderRadius: "6px", background: t.bgSurface, border: `1px solid ${t.border}` }}>
              الانتقال لصفحة القفل (Prompt 6) →
            </Link>
          </div>
        </div>
      )}

      {visualState === "success" && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "10px", background: "rgba(34, 197, 94, 0.1)", border: "1px solid #22C55E", color: "#15803D", fontSize: "0.9375rem", fontWeight: 700 }}>
          <CheckCircle2 size={22} style={{ color: "#22C55E", flexShrink: 0 }} />
          <span>تم التحقق من البيانات بنجاح! جاري تحويلك إلى لوحة التحكم...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Input
          label="البريد الإلكتروني / رقم الهاتف"
          placeholder="name@example.com أو 01xxxxxxxxx"
          type="text"
          icon={<Mail size={18} />}
          error={(errors.email || visualState === "wrong") ? "بريد إلكتروني أو رقم هاتف غير صحيح" : undefined}
          disabled={isFormDisabled}
          required
          {...register("email", { required: true })}
        />

        <Input
          label="كلمة المرور"
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          icon={<LockIcon size={18} />}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isFormDisabled}
              style={{
                background: "transparent",
                border: "none",
                cursor: isFormDisabled ? "not-allowed" : "pointer",
                padding: "4px",
                color: t.textSecondary,
                display: "flex",
                alignItems: "center",
                outline: "none",
              }}
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={(errors.password || visualState === "wrong") ? "كلمة المرور غير صحيحة" : undefined}
          disabled={isFormDisabled}
          required
          {...register("password", { required: true })}
        />

        {/* Options Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: isFormDisabled ? "not-allowed" : "pointer", userSelect: "none", opacity: isFormDisabled ? 0.6 : 1 }}>
            <div
              onClick={() => !isFormDisabled && setRememberMe(!rememberMe)}
              style={{
                width: 18, height: 18, borderRadius: "4px",
                border: `1.5px solid ${rememberMe ? t.primary : t.borderStrong}`,
                background: rememberMe ? t.primary : t.bgSurface,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 120ms",
              }}
            >
              {rememberMe && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: "0.8125rem", color: t.textSecondary }}>تذكرني</span>
          </label>

          <Link to="/forgot-password" style={{ fontSize: "0.8125rem", color: t.primary, fontWeight: 600, textDecoration: "none", pointerEvents: isFormDisabled ? "none" : "auto", opacity: isFormDisabled ? 0.6 : 1 }}>
            نسيت كلمة المرور؟
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={visualState === "loading"}
          disabled={visualState === "locked" || visualState === "success"}
          className="w-full"
          style={{ marginTop: "8px" }}
        >
          {visualState === "success" ? "تم تسجيل الدخول ✓" : "تسجيل الدخول"}
        </Button>
      </form>

      {/* Footer link to Trigger Mirror Swap Transition to Sign Up */}
      <div style={{ textAlign: "center", marginTop: "8px", fontSize: "0.875rem", color: t.textSecondary }}>
        ليس لديك حساب؟{" "}
        <Link to="/signup" style={{ color: t.primary, fontWeight: 700, textDecoration: "none" }}>
          أنشئ حساباً جديداً
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;

