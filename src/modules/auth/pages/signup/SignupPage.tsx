import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User as UserIcon, Building, Check } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<"teacher" | "student">("teacher");
  const [loading, setLoading] = React.useState(false);
  const [passStrength, setPassStrength] = React.useState(0); // 0-3
  const [terms, setTerms] = React.useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      academyCode: "",
    }
  });

  const passwordVal = watch("password");

  // Simple password strength calculator
  React.useEffect(() => {
    if (!passwordVal) {
      setPassStrength(0);
      return;
    }
    let strength = 1;
    if (passwordVal.length >= 8) strength++;
    if (/[A-Z]/.test(passwordVal) && /[0-9]/.test(passwordVal)) strength++;
    setPassStrength(strength);
  }, [passwordVal]);

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("خطأ في التحقق", "كلمتا المرور غير متطابقتين.");
      return;
    }
    if (!terms) {
      toast.warning("الشروط والأحكام", "يرجى الموافقة على الشروط والأحكام للمتابعة.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    toast.success("تم إنشاء الحساب بنجاح", "يرجى إكمال ملفك الشخصي للمتابعة.");
    if (role === "teacher") {
      navigate("/complete-profile");
    } else {
      navigate("/student/dashboard");
    }
  };

  const strengthLabel = ["ضعيفة للغاية", "متوسطة القوة", "قوية جداً"];
  const strengthColor = [t.error, t.warning, t.success];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          إنشاء حساب جديد
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
          ابدأ استخدام درايَة مجاناً وفعّل منظومة الذكاء الاصطناعي اليوم.
        </p>
      </div>

      {/* Role Picker */}
      <div style={{ display: "flex", background: t.bgSecondary, padding: "4px", borderRadius: "999px", border: `1px solid ${t.border}` }}>
        <button
          type="button"
          onClick={() => setRole("teacher")}
          style={{
            flex: 1, padding: "8px 16px", borderRadius: "999px", border: "none", cursor: "pointer",
            background: role === "teacher" ? t.primary : "transparent",
            color: role === "teacher" ? "#fff" : t.textSecondary,
            fontSize: "0.875rem", fontWeight: 600, transition: "all 150ms",
          }}
        >
          أنا معلم / أكاديمية
        </button>
        <button
          type="button"
          onClick={() => setRole("student")}
          style={{
            flex: 1, padding: "8px 16px", borderRadius: "999px", border: "none", cursor: "pointer",
            background: role === "student" ? t.primary : "transparent",
            color: role === "student" ? "#fff" : t.textSecondary,
            fontSize: "0.875rem", fontWeight: 600, transition: "all 150ms",
          }}
        >
          أنا طالب
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Input
          label="الاسم الكامل"
          placeholder="أدخل اسمك ثلاثياً"
          type="text"
          icon={<UserIcon size={18} />}
          error={errors.name ? "الاسم مطلوب" : undefined}
          required
          {...register("name", { required: true })}
        />

        <Input
          label="البريد الإلكتروني"
          placeholder="name@example.com"
          type="email"
          icon={<Mail size={18} />}
          error={errors.email ? "البريد الإلكتروني مطلوب" : undefined}
          required
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <div>
          <Input
            label="كلمة المرور"
            placeholder="••••••••"
            type="password"
            icon={<Lock size={18} />}
            error={errors.password ? "كلمة المرور مطلوبة (6 أحرف على الأقل)" : undefined}
            required
            {...register("password", { required: true, minLength: 6 })}
          />
          {passwordVal && (
            <div style={{ marginTop: "6px" }}>
              <div style={{ display: "flex", height: "4px", gap: "4px", background: t.border, borderRadius: "2px", overflow: "hidden" }}>
                {[1, 2, 3].map(lvl => (
                  <div
                    key={lvl}
                    style={{
                      flex: 1,
                      background: passStrength >= lvl ? strengthColor[passStrength - 1] : "transparent",
                      transition: "background-color 150ms",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.7rem", color: strengthColor[passStrength - 1], fontWeight: 600, marginTop: "4px", display: "block" }}>
                قوة كلمة المرور: {strengthLabel[passStrength - 1]}
              </span>
            </div>
          )}
        </div>

        <Input
          label="تأكيد كلمة المرور"
          placeholder="••••••••"
          type="password"
          icon={<Lock size={18} />}
          error={errors.confirmPassword ? "تأكيد كلمة المرور مطلوب" : undefined}
          required
          {...register("confirmPassword", { required: true })}
        />

        {role === "student" && (
          <Input
            label="كود الانضمام للأكاديمية (اختياري)"
            placeholder="أدخل الكود لمشاركة المحاضرات"
            type="text"
            icon={<Building size={18} />}
            {...register("academyCode")}
          />
        )}

        {/* Terms */}
        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", userSelect: "none", marginTop: "4px" }}>
          <div
            onClick={() => setTerms(!terms)}
            style={{
              width: 18, height: 18, borderRadius: "4px",
              border: `1.5px solid ${terms ? t.primary : t.borderStrong}`,
              background: terms ? t.primary : t.bgSurface,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "2px", flexShrink: 0,
              transition: "all 120ms",
            }}
          >
            {terms && <Check size={12} color="#fff" strokeWidth={3} />}
          </div>
          <span style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.4 }}>
            أوافق على{" "}
            <a href="#terms" style={{ color: t.primary, fontWeight: 600, textDecoration: "none" }}>شروط الخدمة</a>
            {" "}و{" "}
            <a href="#privacy" style={{ color: t.primary, fontWeight: 600, textDecoration: "none" }}>سياسة الخصوصية</a>.
          </span>
        </label>

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "12px" }}>
          إنشاء الحساب
        </Button>
      </form>

      <div style={{ textAlign: "center", fontSize: "0.875rem", color: t.textSecondary }}>
        لديك حساب بالفعل؟{" "}
        <Link to="/login" style={{ color: t.primary, fontWeight: 700, textDecoration: "none" }}>
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};
export default SignupPage;
