import * as React from "react";
import { Edit2, Shield, User, GraduationCap, Phone } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Avatar } from "@/shared/components/ui/Avatar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

export const StudentProfilePage: React.FC = () => {
  const [name, setName] = React.useState("أحمد محمد علي");
  const [email, setEmail] = React.useState("ahmed.ali@example.com");
  const [phone, setPhone] = React.useState("01122334455");
  const [grade, setGrade] = React.useState("الصف الثالث الثانوي - علمي رياضة");
  const [parentName, setParentName] = React.useState("محمد علي أحمد");
  const [parentPhone, setParentPhone] = React.useState("01012345678");

  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحديث الملف الشخصي للطالب بنجاح");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      toast.warning("يرجى ملء حقول كلمة المرور");
      return;
    }
    toast.success("تم تحديث كلمة المرور بنجاح");
    setCurrentPass("");
    setNewPass("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="إدارة وتحديث بياناتك الشخصية والدراسية، ووسائل التواصل مع ولي الأمر.">
        الملف الشخصي للطالب
      </SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profile Info Form */}
        <Card style={{ padding: "28px" }}>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "20px" }}>معلومات الحساب</h3>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ position: "relative" }}>
              <Avatar name={name} size={64} />
              <button
                type="button"
                style={{
                  position: "absolute", bottom: 0, left: 0, width: 22, height: 22, borderRadius: "50%",
                  background: t.primary, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", border: `2px solid ${t.bgSurface}`, outline: "none"
                }}
                onClick={() => toast.info("تحديث الصورة الشخصية")}
              >
                <Edit2 size={10} color="#fff" />
              </button>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: t.textPrimary }}>{name}</div>
              <div style={{ fontSize: "0.875rem", color: t.textSecondary }}>{grade}</div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input
              label="الاسم الكامل للطالب"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            
            <Input
              label="البريد الإلكتروني"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <Input
              label="رقم الهاتف المحمول"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />

            <Input
              label="السنة الدراسية والشعبة"
              value={grade}
              onChange={e => setGrade(e.target.value)}
              required
            />

            <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: "16px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary }}>بيانات ولي الأمر</h4>
              <Input
                label="اسم ولي الأمر"
                value={parentName}
                onChange={e => setParentName(e.target.value)}
                required
              />
              <Input
                label="رقم هاتف ولي الأمر"
                value={parentPhone}
                onChange={e => setParentPhone(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full" style={{ marginTop: "12px" }}>
              حفظ وتحديث الملف الشخصي
            </Button>
          </form>
        </Card>

        {/* Security / Password updates */}
        <Card style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "4px" }}>إعدادات الأمان</h3>
          <p style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.5 }}>
            احرص على استخدام كلمة مرور قوية وغير مكررة لحماية حسابك التعليمي وسجلات التحصيل الخاصة بك.
          </p>

          <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Input
              label="كلمة المرور الحالية"
              type="password"
              placeholder="••••••••"
              value={currentPass}
              onChange={e => setCurrentPass(e.target.value)}
              required
            />
            <Input
              label="كلمة المرور الجديدة"
              type="password"
              placeholder="••••••••"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              required
            />
            <Button type="submit" variant="secondary" className="w-full">
              تغيير كلمة المرور
            </Button>
          </form>
        </Card>

      </div>

    </div>
  );
};
export default StudentProfilePage;
