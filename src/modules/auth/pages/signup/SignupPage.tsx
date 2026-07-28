import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User as UserIcon, Building, Check, Phone, BookOpen, GraduationCap } from "lucide-react";
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

  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      subject: "الرياضيات",
      stage: "المرحلة الثانوية العامة",
      studentGrade: "الصف الأول الثانوي",
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
    const emailLower = (data.email || "").toLowerCase();
    const codeLower = (data.academyCode || "").toLowerCase();

    // Mock validation: existing email check
    if (emailLower.includes("exist") || emailLower.includes("dup") || emailLower === "test@draya.com") {
      setError("email", { type: "manual", message: "هذا البريد الإلكتروني مستخدم بالفعل" });
      toast.error("بريد إلكتروني مكرر", "هذا البريد الإلكتروني مستخدم بالفعل في حساب آخر.");
      return;
    }

    // Mock validation: invalid enrollment code for student
    if (role === "student" && (codeLower.includes("wrong") || codeLower.includes("invalid") || codeLower === "0000")) {
      setError("academyCode", { type: "manual", message: "كود التسجيل غير صحيح" });
      toast.error("كود غير صحيح", "يرجى التأكد من كود الانضمام للأكاديمية المحاول به.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "كلمتا المرور غير متطابقتين" });
      toast.error("خطأ في التحقق", "كلمتا المرور غير متطابقتين.");
      return;
    }

    if (!terms) {
      toast.warning("الشروط والأحكام", "يرجى الموافقة على الشروط والأحكام للمتابعة.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);

    toast.success("تم إنشاء الحساب بنجاح", "مرحباً بك في درايَة!");
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
          {role === "teacher"
            ? "انضم لمنظومة درايَة وأنشئ أكاديميتك الخاصة بالذكاء الاصطناعي."
            : "سجل كطالب للوصول إلى محاضراتك وامتحاناتك التفاعلية."}
        </p>
      </div>

      {/* Role Picker Toggle */}
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
          error={errors.email ? (errors.email.message as string || "البريد الإلكتروني مطلوب") : undefined}
          required
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <Input
          label="رقم الهاتف"
          placeholder="010xxxxxxx / 011xxxxxxx / 012xxxxxxx / 015xxxxxxx"
          type="tel"
          icon={<Phone size={18} />}
          error={errors.phone ? "رقم الهاتف مطلوب (11 رقم)" : undefined}
          required
          {...register("phone", { required: true, pattern: /^01[0125][0-9]{8}$/ })}
        />

        {/* Role Specific Fields */}
        {role === "teacher" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
              <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
                المادة العِلمية / التخصص <span style={{ color: t.primary }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", color: t.textSecondary, pointerEvents: "none" }}>
                  <BookOpen size={18} />
                </span>
                <select
                  style={{
                    width: "100%", height: "42px", padding: "0 40px 0 32px", borderRadius: "8px",
                    border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface, color: t.textPrimary,
                    fontSize: "0.875rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                  }}
                  {...register("subject", { required: true })}
                >
                  {["الرياضيات", "اللغة العربية", "اللغة الإنجليزية", "الفيزياء", "الكيمياء", "الأحياء", "العلوم العامة", "التاريخ", "الجغرافيا", "الفلسفة والمنطق", "أخرى"].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
              <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
                المرحلة التعليمية <span style={{ color: t.primary }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", color: t.textSecondary, pointerEvents: "none" }}>
                  <GraduationCap size={18} />
                </span>
                <select
                  style={{
                    width: "100%", height: "42px", padding: "0 40px 0 32px", borderRadius: "8px",
                    border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface, color: t.textPrimary,
                    fontSize: "0.875rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                  }}
                  {...register("stage", { required: true })}
                >
                  {["المرحلة الثانوية العامة", "المرحلة الإعدادية", "المرحلة الابتدائية", "جامعي / ما بعد الجامعي", "متعدد المراحل"].map(stg => (
                    <option key={stg} value={stg}>{stg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
              <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
                المرحلة الدراسية / الصف <span style={{ color: t.primary }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", color: t.textSecondary, pointerEvents: "none" }}>
                  <GraduationCap size={18} />
                </span>
                <select
                  style={{
                    width: "100%", height: "42px", padding: "0 40px 0 32px", borderRadius: "8px",
                    border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface, color: t.textPrimary,
                    fontSize: "0.875rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                  }}
                  {...register("studentGrade", { required: true })}
                >
                  {["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي", "المرحلة الإعدادية", "المرحلة الابتدائية", "أخرى"].map(grd => (
                    <option key={grd} value={grd}>{grd}</option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              label="كود التسجيل / الانضمام للأكاديمية"
              placeholder="أدخل كود الأستاذ أو كود المجموعة"
              type="text"
              icon={<Building size={18} />}
              error={errors.academyCode ? (errors.academyCode.message as string || "كود التسجيل غير صحيح") : undefined}
              required
              {...register("academyCode", { required: true })}
            />
          </div>
        )}

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
          error={errors.confirmPassword ? (errors.confirmPassword.message as string || "تأكيد كلمة المرور مطلوب") : undefined}
          required
          {...register("confirmPassword", { required: true })}
        />

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
