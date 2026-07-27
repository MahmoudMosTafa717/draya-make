import * as React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { BookOpen, Users, ArrowLeft, PlayCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { P } from "@/shared/constants/photos";

export const MyPackagesPage: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: "pkg_1",
      name: "باقة الجبر وحساب المثلثات للشهادة الثانوية",
      teacher: "أ. أحمد السيد",
      subject: "الرياضيات",
      progress: 68,
      completed: 12,
      total: 18,
      classroomName: "مجموعة أ - علمي رياضة",
      img: P.mathChalkboard,
      gradient: "from-sky-500 to-indigo-600",
      accent: "#0EA5E9"
    },
    {
      id: "pkg_2",
      name: "باقة الكيمياء العضوية المتقدمة والمراجعة النهائية",
      teacher: "أ. أحمد سامي",
      subject: "الكيمياء",
      progress: 85,
      completed: 17,
      total: 20,
      classroomName: "مجموعة ج - مراجعة عامة",
      img: P.chemistryLab,
      gradient: "from-emerald-500 to-teal-600",
      accent: "#10B981"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
      {/* Background Organic Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-sky-300/15 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-300/15 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0F4F49] text-xs font-extrabold w-fit mb-1">
          <Sparkles size={14} className="text-amber-500" />
          <span>محتواك المفضل وتحديات التعلم</span>
        </div>
        <SectionTitle sub="استعرض باقاتك الأكاديمية النشطة، وتابع المحاضرات والامتحانات المرفقة لكل مادة بحماس.">
          باقاتي الدراسية النشطة
        </SectionTitle>
      </div>

      {packages.length === 0 ? (
        <EmptyState
          title="لست مشتركاً في أي باقة بعد"
          description="تصفح قائمة المعلمين المميزين واشترك في أول باقة تفعيل للبدء بالمذاكرة."
          actionText="تصفح المعلمين"
          onAction={() => navigate("/student/browse-teachers")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="rounded-3xl p-6 bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/student/packages/${pkg.id}`)}
            >
              {/* Top Banner Image with Gradient Mask */}
              <div className="w-full h-36 rounded-2xl overflow-hidden relative mb-4">
                <img
                  src={pkg.img}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                
                {/* Subject Chip & Status Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold border border-white/30">
                    {pkg.subject}
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                    <CheckCircle2 size={12} />
                    <span>سارية ومفعّلة</span>
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <h3 className="text-base font-extrabold line-clamp-1 leading-snug">
                    {pkg.name}
                  </h3>
                  <span className="text-xs text-slate-300 font-medium">
                    المعلم: {pkg.teacher}
                  </span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="flex flex-col gap-3 py-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <BookOpen size={14} className="text-teal-600" />
                    <span>التقدم الدراسي:</span>
                  </span>
                  <span className="text-slate-900 font-sans">
                    {pkg.completed} / {pkg.total} محاضرة ({pkg.progress}%)
                  </span>
                </div>

                {/* Animated Colorful Gradient Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/50">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${pkg.gradient} transition-all duration-1000 shadow-sm`}
                    style={{ width: `${pkg.progress}%` }}
                  />
                </div>

                {/* Classroom Info Pill */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 mt-1">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Users size={14} className="text-indigo-500" />
                    <span>المجموعة الدراسية:</span>
                  </span>
                  <span className="font-bold text-slate-800">{pkg.classroomName}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="secondary"
                size="sm"
                className="w-full mt-4 rounded-2xl font-extrabold text-xs shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                onClick={() => navigate(`/student/packages/${pkg.id}`)}
              >
                <span>متابعة المحاضرات والامتحانات</span>
                <ArrowLeft size={14} />
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyPackagesPage;
