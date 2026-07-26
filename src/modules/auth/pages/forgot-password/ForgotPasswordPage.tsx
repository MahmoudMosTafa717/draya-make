import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setSent(true);
    toast.success("تم إرسال رابط إعادة التعيين", "يرجى التحقق من البريد الوارد.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          استعادة كلمة المرور
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
          أدخل البريد الإلكتروني المرتبط بحسابك وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
        </p>
      </div>

      {!sent ? (
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

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "8px" }}>
            إرسال رابط إعادة التعيين
          </Button>
        </form>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center", padding: "16px 0" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            backgroundColor: t.primary100, color: t.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto",
          }}>
            <Send size={24} />
          </div>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
            تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح. إذا لم تتلقى الرسالة خلال دقائق، يرجى مراجعة مجلد الرسائل غير المرغوب فيها (Spam).
          </p>
          <Button variant="secondary" size="md" onClick={() => setSent(false)} style={{ margin: "8px auto 0" }}>
            إعادة المحاولة
          </Button>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "8px" }}>
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
export default ForgotPasswordPage;
