import * as React from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, BookOpen, Clock } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";

interface CreateClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newClass: any) => void;
}

export const CreateClassroomModal: React.FC<CreateClassroomModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [submitting, setSubmitting] = React.useState(false);

  // Mock packages list for dropdown selection
  const mockPackages = [
    { id: "p1", name: "باقة الجبر وحساب المثلثات" },
    { id: "p2", name: "باقة كيمياء الصف الثالث الثانوي" },
    { id: "p3", name: "باقة ميكانيكا الصف الثاني الثانوي" },
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      studyLevel: "secondary",
      packageId: "",
      examDate: "",
      videoReleaseDate: "",
    }
  });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitting(false);

    const selectedPkg = mockPackages.find(p => p.id === data.packageId);
    
    const newClass = {
      id: "class_" + Date.now(),
      name: data.name,
      studyLevel: data.studyLevel,
      packageName: selectedPkg ? selectedPkg.name : "لم يتم التعيين بعد",
      studentCount: 0,
      archived: false,
      examSchedule: data.examDate ? [{ examTitle: "الامتحان الأول", startDate: data.examDate, durationMinutes: 60 }] : [],
      videoReleaseSchedule: data.videoReleaseDate ? [{ lessonTitle: "المحاضرة التأسيسية", releaseDate: data.videoReleaseDate }] : [],
    };

    toast.success("تم إنشاء المجموعة الدراسية بنجاح");
    onSuccess(newClass);
    reset();
    onClose();
  };

  const footerActions = (
    <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "flex-end" }}>
      <Button type="button" variant="secondary" size="md" onClick={onClose} disabled={submitting}>
        إلغاء
      </Button>
      <Button type="submit" variant="primary" size="md" loading={submitting}>
        إنشاء المجموعة
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إنشاء مجموعة دراسية جديدة" size="md">
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        <Input
          label="اسم المجموعة الدراسية"
          placeholder="مثال: مجموعة أ - الصف الثالث الثانوي"
          error={errors.name ? "اسم المجموعة مطلوب" : undefined}
          required
          {...register("name", { required: true })}
        />

        {/* Study level dropdown selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
            المرحلة الدراسية <span style={{ color: t.primary }}>*</span>
          </label>
          <select
            {...register("studyLevel", { required: true })}
            style={{
              width: "100%", height: "42px", borderRadius: "8px",
              border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
              color: t.textPrimary, padding: "0 14px", fontSize: "0.9375rem",
              fontFamily: "inherit", outline: "none", boxSizing: "border-box",
            }}
          >
            <option value="primary">المرحلة الابتدائية</option>
            <option value="preparatory">المرحلة الإعدادية</option>
            <option value="secondary">المرحلة الثانوية</option>
          </select>
        </div>

        {/* Assigned package selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>
            باقة الدراسة المرتبطة
          </label>
          <select
            {...register("packageId")}
            style={{
              width: "100%", height: "42px", borderRadius: "8px",
              border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
              color: t.textPrimary, padding: "0 14px", fontSize: "0.9375rem",
              fontFamily: "inherit", outline: "none", boxSizing: "border-box",
            }}
          >
            <option value="">لا توجد باقة — قم بالتعيين لاحقاً</option>
            {mockPackages.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Schedule setup previews */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", borderTop: `1px dashed ${t.border}`, paddingTop: "16px" }}>
          <Input
            label="أول امتحان مجدول"
            type="datetime-local"
            icon={<Calendar size={14} />}
            {...register("examDate")}
          />
          <Input
            label="تاريخ نشر المحاضرة الأولى"
            type="datetime-local"
            icon={<Clock size={14} />}
            {...register("videoReleaseDate")}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          {footerActions}
        </div>
      </form>
    </Modal>
  );
};
export default CreateClassroomModal;
