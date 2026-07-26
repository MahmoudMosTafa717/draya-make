import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, Lock as LockIcon, Check, Loader2 } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  // Initialize form with defaults
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);

    // Basic mock checks for testing flow
    if (data.email.toLowerCase().includes("lock")) {
      toast.error("الحساب مقفل مؤقتاً", "يرجى مراجعة صفحة الحساب المقفل.");
      navigate("/locked-account");
    } else if (data.email.toLowerCase().includes("student")) {
      toast.success("تم تسجيل الدخول بنجاح", "مرحباً بك مجدداً في درايَة.");
      navigate("/student/dashboard");
    } else {
      toast.success("تم تسجيل الدخول بنجاح", "مرحباً بك مجدداً في درايَة.");
      navigate("/teacher/dashboard");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          تسجيل الدخول
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
          أهلاً بك مجدداً! يرجى إدخال بياناتك للمتابعة.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Input
          label="البريد الإلكتروني"
          placeholder="name@example.com"
          type="email"
          icon={<Mail size={18} />}
          error={errors.email ? "يرجى إدخال بريد إلكتروني صحيح" : undefined}
          required
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <Input
          label="كلمة المرور"
          placeholder="••••••••"
          type="password"
          icon={<LockIcon size={18} />}
          error={errors.password ? "كلمة المرور مطلوبة (6 أحرف على الأقل)" : undefined}
          required
          {...register("password", { required: true, minLength: 6 })}
        />

        {/* Options */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
            <div
              onClick={() => setRememberMe(!rememberMe)}
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

          <Link to="/forgot-password" style={{ fontSize: "0.8125rem", color: t.primary, fontWeight: 600, textDecoration: "none" }}>
            نسيت كلمة المرور؟
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
          تسجيل الدخول
        </Button>
      </form>

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
