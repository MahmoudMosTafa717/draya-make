import * as React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowLeft, CheckCircle2, PlayCircle, Lock, Award, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";

export const ExamsListPage: React.FC = () => {
  const navigate = useNavigate();

  const exams = [
    {
      id: "e1",
      title: "امتحان الجبر والتباديل والتوافيق",
      teacherName: "أ. أحمد السيد",
      subject: "الرياضيات",
      duration: 45,
      status: "available",
      accent: "#0EA5E9",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: "e2",
      title: "مراجعة قوانين نيوتن والكهربية",
      teacherName: "أ. سارة حسن",
      subject: "الفيزياء",
      duration: 60,
      status: "scheduled",
      date: "الخميس القادم 11:00 ص",
      accent: "#8B5CF6",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200"
    },
    {
      id: "e3",
      title: "امتحان الفصل الدراسي الأول التراكمي",
      teacherName: "أ. أحمد السيد",
      subject: "الرياضيات",
      duration: 90,
      status: "completed",
      score: 85,
      accent: "#10B981",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
  ];

  const handleStartExam = (id: string) => {
    navigate(`/student/exams/${id}/take`);
  };

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
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-sky-300/15 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-300/15 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0F4F49] text-xs font-extrabold w-fit mb-1">
          <Sparkles size={14} className="text-amber-500" />
          <span>مركز التقويم والاختبارات التفاعلية</span>
        </div>
        <SectionTitle sub="استعرض الامتحانات والواجبات المحددة لك من قبل معلميك مع متابعة درجات التصحيح الفوري.">
          الامتحانات والواجبات المجدولة
        </SectionTitle>
      </div>

      {exams.length === 0 ? (
        <EmptyState
          title="لا توجد امتحانات مسندة إليك"
          description="لم يقم أي معلم بجدولة امتحانات أو واجبات لك حالياً."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
          {exams.map(e => (
            <motion.div
              key={e.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="rounded-3xl p-6 bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              {/* Decorative Accent Glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-15 pointer-events-none transition-transform group-hover:scale-125"
                style={{ background: e.accent }}
              />

              <div className="flex flex-col gap-4">
                {/* Status and Subject Tags */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-extrabold border border-slate-200">
                    {e.subject}
                  </span>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${e.badgeColor} flex items-center gap-1.5`}>
                    {e.status === "completed" && <CheckCircle2 size={13} />}
                    {e.status === "available" && <PlayCircle size={13} className="animate-pulse text-amber-600" />}
                    {e.status === "scheduled" && <Lock size={13} />}
                    <span>
                      {e.status === "completed" ? "مكتمل وحاصل على درجة" : e.status === "available" ? "متاح للحل الآن 🔥" : "مجدول لاحقاً"}
                    </span>
                  </span>
                </div>

                {/* Exam Title & Teacher */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0F4F49] transition-colors leading-snug">
                    {e.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 mt-1 block">
                    المعلم: {e.teacherName}
                  </span>
                </div>

                {/* Exam Metadata */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-slate-400" />
                    <span>مدة الامتحان: {e.duration} دقيقة</span>
                  </div>

                  {e.status === "scheduled" && (
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Calendar size={15} />
                      <span>{e.date}</span>
                    </div>
                  )}

                  {e.status === "completed" && (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Award size={15} />
                      <span>الدرجة: {e.score}%</span>
                    </div>
                  )}

                  {e.status === "available" && (
                    <div className="flex items-center gap-2 text-amber-600 font-extrabold">
                      <Sparkles size={15} />
                      <span>جاهز للبدء</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5">
                {e.status === "available" ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full rounded-2xl font-extrabold text-xs shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 bg-[#0F4F49]"
                    onClick={() => handleStartExam(e.id)}
                  >
                    <span>بدء الامتحان الآن</span>
                    <ArrowLeft size={14} />
                  </Button>
                ) : e.status === "completed" ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full rounded-2xl font-extrabold text-xs shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    onClick={() => navigate(`/student/exams/${e.id}/result?score=${e.score}`)}
                  >
                    <span>عرض تحليل النتيجة والتصحيح</span>
                    <ArrowLeft size={14} />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full rounded-2xl font-extrabold text-xs cursor-not-allowed opacity-60"
                    disabled
                  >
                    <span>غير متاح بعد</span>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ExamsListPage;
