import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Lock } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("خطأ في التحقق", "كلمتا المرور غير متطابقتين.");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    toast.success("تم تحديث كلمة المرور", "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          إعادة تعيين كلمة المرور
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
          يرجى إدخال كلمة مرور جديدة قوية لحماية حسابك.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Input
          label="كلمة المرور الجديدة"
          placeholder="••••••••"
          type="password"
          icon={<Lock size={18} />}
          error={errors.password ? "كلمة المرور مطلوبة (6 أحرف على الأقل)" : undefined}
          required
          {...register("password", { required: true, minLength: 6 })}
        />

        <Input
          label="تأكيد كلمة المرور الجديدة"
          placeholder="••••••••"
          type="password"
          icon={<Lock size={18} />}
          error={errors.confirmPassword ? "تأكيد كلمة المرور مطلوب" : undefined}
          required
          {...register("confirmPassword", { required: true })}
        />

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
          تحديث كلمة المرور
        </Button>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
