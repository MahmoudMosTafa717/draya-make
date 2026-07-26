import * as React from "react";
import { Edit2, Shield, Bell, Moon, Sun, KeyRound } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Avatar } from "@/shared/components/ui/Avatar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

export const TeacherSettingsPage: React.FC = () => {
  const [name, setName] = React.useState("أ. محمد علي أحمد");
  const [email, setEmail] = React.useState("m.ali@draya.edu");
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifSubmit, setNotifSubmit] = React.useState(true);
  const [notifAI, setNotifAI] = React.useState(true);
  
  // Passwords
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم تحديث البيانات بنجاح");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      toast.warning("يرجى ملء حقول كلمة المرور");
      return;
    }
    toast.success("تم تحديث كلمة المرور بنجاح");
    setCurrentPass("");
    newPass;
    setNewPass("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="تعديل بيانات الحساب الشخصي، وتفضيلات الإشعارات والأمان.">
        إعدادات الحساب وتغيير كلمة المرور
      </SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Profile Card */}
        <Card style={{ padding: "28px" }}>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "20px" }}>الملف الشخصي للمعلم</h3>
          
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
                onClick={() => toast.info("تحميل صورة رمزية جديدة")}
              >
                <Edit2 size={10} color="#fff" />
              </button>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: t.textPrimary }}>{name}</div>
              <div style={{ fontSize: "0.875rem", color: t.textSecondary }}>معلم رياضيات ومحاضر أكاديمي</div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input
              label="الاسم الكامل"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            
            <Input
              label="البريد الإلكتروني للأكاديمية"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full">
              حفظ التغييرات
            </Button>
          </form>
        </Card>

        {/* Right Column: Preferences & Security */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Appearance & Alerts */}
          <Card style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "4px" }}>المظهر والإشعارات</h3>
            
            {[
              { label: "الوضع الليلي", desc: "تبديل المظهر العام للمنصة بين الفاتح والداكن", checked: darkMode, toggle: () => setDarkMode(!darkMode) },
              { label: "إشعارات التسليم", desc: "تلقي تنبيهات عند قيام الطلاب بتقديم امتحاناتهم", checked: notifSubmit, toggle: () => setNotifSubmit(!notifSubmit) },
              { label: "تقارير AI", desc: "تنبيهات فورية عند جهوزية تقارير الذكاء الاصطناعي للأولياء", checked: notifAI, toggle: () => setNotifAI(!notifAI) }
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${t.border}` }}>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{item.label}</div>
                  <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "2px" }}>{item.desc}</div>
                </div>
                
                <button
                  type="button"
                  onClick={item.toggle}
                  style={{
                    width: 44, height: 24, borderRadius: "999px",
                    background: item.checked ? t.primary : t.borderStrong,
                    position: "relative", cursor: "pointer", border: "none", transition: "background 200ms", outline: "none"
                  }}
                >
                  <div style={{
                    position: "absolute", top: 3, left: item.checked ? 23 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    transition: "left 200ms", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }} />
                </button>
              </div>
            ))}
          </Card>

          {/* Update Password */}
          <Card style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px" }}>تغيير كلمة المرور</h3>
            
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
                تحديث كلمة المرور
              </Button>
            </form>
          </Card>

        </div>

      </div>

    </div>
  );
};
export default TeacherSettingsPage;
