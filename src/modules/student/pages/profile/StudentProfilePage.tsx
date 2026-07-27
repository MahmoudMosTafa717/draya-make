import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Shield, User, GraduationCap, Phone, Lock, Sparkles, Check, Mail, Key } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Avatar } from "@/shared/components/ui/Avatar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

export const StudentProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"info" | "parent" | "security">("info");

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-8 relative"
      style={{ direction: "rtl" }}
    >
      {/* Background Blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-sky-300/15 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-300/15 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0F4F49] text-xs font-extrabold w-fit mb-1">
          <Sparkles size={14} className="text-amber-500" />
          <span>إعدادات الحساب الشخصي</span>
        </div>
        <SectionTitle sub="إدارة وتحديث بياناتك الشخصية والدراسية، ووسائل التواصل مع ولي الأمر وإعدادات الأمان.">
          الملف الشخصي للطالب
        </SectionTitle>
      </div>

      {/* Profile Overview Header Pane */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl p-6 md:p-8 bg-white border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative overflow-hidden"
      >
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar name={name} size={72} />
            <button
              type="button"
              onClick={() => toast.info("تحديث الصورة الشخصية")}
              className="absolute bottom-0 left-0 p-2 rounded-full bg-[#0F4F49] text-white border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer"
            >
              <Edit2 size={12} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{name}</h2>
            <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-2">
              <span>{grade}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-700 font-bold">حساب نشط</span>
            </div>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/60 w-full md:w-auto">
          {[
            { id: "info", label: "البيانات الشخصية", icon: <User size={15} /> },
            { id: "parent", label: "ولي الأمر", icon: <Phone size={15} /> },
            { id: "security", label: "الأمان والكلمة السرية", icon: <Lock size={15} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0F4F49] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Panels */}
      <div className="z-10">
        <AnimatePresence mode="wait">
          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-3xl p-6 md:p-8 bg-white border border-slate-100 shadow-xl"
            >
              <h3 className="text-base font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                <User size={18} className="text-teal-600" />
                <span>البيانات الأساسية والدراسية</span>
              </h3>

              <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="md:col-span-2 pt-4 flex justify-end">
                  <Button type="submit" variant="primary" className="rounded-2xl font-extrabold text-xs bg-[#0F4F49] px-6 py-3 shadow-md">
                    حفظ وتحديث الملف الشخصي
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "parent" && (
            <motion.div
              key="parent"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-3xl p-6 md:p-8 bg-white border border-slate-100 shadow-xl"
            >
              <h3 className="text-base font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                <Phone size={18} className="text-purple-600" />
                <span>بيانات التواصل مع ولي الأمر</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-6">
                تُستخدم هذه البيانات لإرسال تقارير الحضور والغياب ودرجات الامتحانات الدورية.
              </p>

              <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="md:col-span-2 pt-4 flex justify-end">
                  <Button type="submit" variant="primary" className="rounded-2xl font-extrabold text-xs bg-[#0F4F49] px-6 py-3 shadow-md">
                    حفظ بيانات ولي الأمر
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-3xl p-6 md:p-8 bg-white border border-slate-100 shadow-xl flex flex-col gap-6"
            >
              <div>
                <h3 className="text-base font-extrabold text-slate-800 mb-1 flex items-center gap-2">
                  <Key size={18} className="text-rose-600" />
                  <span>تغيير كلمة المرور وإعدادات السرية</span>
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  احرص على استخدام كلمة مرور قوية تحتوي على حروف وأرقام لحماية حسابك التعليمي.
                </p>
              </div>

              <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="md:col-span-2 pt-2 flex justify-end">
                  <Button type="submit" variant="secondary" className="rounded-2xl font-extrabold text-xs px-6 py-3">
                    تغيير كلمة المرور
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default StudentProfilePage;
