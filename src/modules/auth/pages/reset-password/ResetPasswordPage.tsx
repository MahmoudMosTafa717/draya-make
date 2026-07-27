import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "كلمتا المرور غير متطابقتين" });
      toast.error("خطأ في التحقق", "كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setIsSuccess(true);

    toast.success("تم تحديث كلمة المرور", "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {!isSuccess ? (
        <>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
              إعادة تعيين كلمة المرور
            </h1>
            <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
              يرجى إدخال كلمة مرور جديدة قوية وتأكيدها لحماية حسابك.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
              error={errors.password ? "كلمة المرور مطلوبة (6 أحرف على الأقل)" : undefined}
              required
              {...register("password", { required: true, minLength: 6 })}
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
              error={errors.confirmPassword ? (errors.confirmPassword.message as string || "تأكيد كلمة المرور مطلوب") : undefined}
              required
              {...register("confirmPassword", { required: true })}
            />

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
              تحديث كلمة المرور
            </Button>
          </form>

          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <Link to="/login" style={{
              fontSize: "0.875rem", color: t.primary, fontWeight: 700,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px"
            }}>
              العودة لتسجيل الدخول
              <ArrowLeft size={16} />
            </Link>
          </div>
        </>
      ) : (
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
    </div>
  );
};
export default ResetPasswordPage;
