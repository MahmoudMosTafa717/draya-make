import * as React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Camera, Check, Plus, Trash } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

export const CompleteProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string | null>(null);
  
  // Tag chips logic
  const [subjectInput, setSubjectInput] = React.useState("");
  const [subjects, setSubjects] = React.useState<string[]>(["الرياضيات", "الفيزياء"]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phone: "",
      bio: "",
    }
  });

  const handleAvatarChange = () => {
    // Mock upload
    setAvatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&w=200&h=200&q=80");
    toast.success("تم تحديث الصورة الشخصية", "تظهر الصورة الآن على حسابك.");
  };

  const addSubject = () => {
    if (!subjectInput.trim()) return;
    if (subjects.includes(subjectInput.trim())) return;
    setSubjects([...subjects, subjectInput.trim()]);
    setSubjectInput("");
  };

  const removeSubject = (sub: string) => {
    setSubjects(subjects.filter(s => s !== sub));
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    toast.success("تم إعداد الملف الشخصي", "توجيهك الآن إلى خطة الاشتراك.");
    navigate("/onboarding/choose-plan");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>
          إكمال ملفك الشخصي
        </h1>
        <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>
          ساعدنا في معرفة تفاصيل أكثر لتخصيص بيئة التعلم الخاصة بك.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Avatar Uploder Mock */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", margin: "8px 0" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              backgroundColor: t.primary100, overflow: "hidden",
              border: `2px solid ${t.primary}`,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {avatar ? (
                <img src={avatar} alt="Profile Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "1.75rem", fontWeight: 700, color: t.primary }}>أ</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleAvatarChange}
              style={{
                position: "absolute", bottom: 0, right: 0,
                width: 28, height: 28, borderRadius: "50%",
                background: t.primary, color: "#fff", border: "2px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", boxShadow: t.shadow2,
              }}
            >
              <Camera size={14} />
            </button>
          </div>
          <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>الصورة الشخصية (اختياري)</span>
        </div>

        <Input
          label="رقم الهاتف (الواتساب)"
          placeholder="01xxxxxxxxx"
          type="tel"
          error={errors.phone ? "رقم الهاتف مطلوب لتلقي إشعارات الأولياء" : undefined}
          required
          {...register("phone", { required: true, pattern: /^01[0-2,5]{1}[0-9]{8}$/ })}
        />

        {/* Subjects taught multi-select */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
            المواد الدراسية التي تدرّسها
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <Input
              placeholder="مثال: لغة عربية، فيزياء..."
              value={subjectInput}
              onChange={setSubjectInput}
            />
            <Button type="button" variant="secondary" size="md" onClick={addSubject} style={{ flexShrink: 0 }}>
              <Plus size={18} />
              إضافة
            </Button>
          </div>
          {/* Chips list */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
            {subjects.map(sub => (
              <span
                key={sub}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px", borderRadius: "999px",
                  background: t.primary100, color: t.primary,
                  fontSize: "0.8125rem", fontWeight: 600,
                }}
              >
                {sub}
                <button
                  type="button"
                  onClick={() => removeSubject(sub)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: t.primary, display: "flex", alignItems: "center", padding: 0,
                  }}
                >
                  <Trash size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Biography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
            نبذة تعريفية عنك (Bio)
          </label>
          <textarea
            placeholder="اكتب نبذة تعريفية تظهر لطلابك عند استعراض الباقات..."
            {...register("bio")}
            style={{
              width: "100%", height: "100px", borderRadius: "8px",
              border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
              color: t.textPrimary, padding: "10px 14px", fontSize: "0.9375rem",
              fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              resize: "vertical", transition: "border-color 150ms",
            }}
            onFocus={e => { e.currentTarget.style.borderColor = t.primary; }}
            onBlur={e => { e.currentTarget.style.borderColor = t.borderStrong; }}
          />
        </div>

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" style={{ marginTop: "12px" }}>
          حفظ والمتابعة
        </Button>
      </form>
    </div>
  );
};
export default CompleteProfilePage;
