import * as React from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, BookOpen, Users, Sparkles, ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { Avatar } from "@/shared/components/ui/Avatar";

export const BrowseTeachersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState("");
  const [filterSubject, setFilterSubject] = React.useState("all");

  const mockTeachers = [
    {
      id: "tch_1",
      name: "أ. أحمد السيد",
      subject: "الرياضيات",
      rating: 4.9,
      studentsCount: 1240,
      packagesCount: 3,
      bio: "خبرة أكثر من 15 عاماً في تدريس الجبر والتفاضل للمرحلة الثانوية بمدارس القاهرة ومقدم مراجعات نهائية شهيرة.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&w=200&h=200&q=80",
      accent: "#0EA5E9",
      bgGradient: "from-sky-500/10 to-indigo-500/5",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200"
    },
    {
      id: "tch_2",
      name: "أ. سارة محمد",
      subject: "الفيزياء",
      rating: 4.8,
      studentsCount: 850,
      packagesCount: 2,
      bio: "مدرسة الفيزياء الحديثة والميكانيكا بطرق تفاعلية وشرح مبسط مع ملخصات التجارب العملية والأسئلة الوزارية.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=faces&fit=crop&w=200&h=200&q=80",
      accent: "#8B5CF6",
      bgGradient: "from-purple-500/10 to-pink-500/5",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      id: "tch_3",
      name: "أ. محمود عبد الله",
      subject: "الكيمياء",
      rating: 4.7,
      studentsCount: 920,
      packagesCount: 1,
      bio: "شرح الكيمياء العضوية والغير عضوية من خلال خرائط ذهنية مبتكرة وتقنيات تذكر التفاعلات المعقدة.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=200&h=200&q=80",
      accent: "#10B981",
      bgGradient: "from-emerald-500/10 to-teal-500/5",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      id: "tch_4",
      name: "أ. نورهان الشريف",
      subject: "الأحياء",
      rating: 4.9,
      studentsCount: 1100,
      packagesCount: 2,
      bio: "متخصصة علم الأحياء الدقيقة والوراثة، شرح تفاعلي ثلاثي الأبعاد مع متابعة دورية لكل طالب.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=faces&fit=crop&w=200&h=200&q=80",
      accent: "#F43F5E",
      bgGradient: "from-rose-500/10 to-amber-500/5",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200"
    }
  ];

  const subjects = [
    { id: "all", label: "كل المواد" },
    { id: "الرياضيات", label: "الرياضيات 📐" },
    { id: "الفيزياء", label: "الفيزياء ⚡" },
    { id: "الكيمياء", label: "الكيمياء 🧪" },
    { id: "الأحياء", label: "الأحياء 🧬" },
  ];

  const filtered = mockTeachers.filter(tItem => {
    const matchesSearch = tItem.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                          tItem.bio.toLowerCase().includes(searchVal.toLowerCase()) ||
                          tItem.subject.toLowerCase().includes(searchVal.toLowerCase());
    const matchesSubject = filterSubject === "all" || tItem.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-8 relative"
      style={{ direction: "rtl" }}
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-sky-300/15 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-300/15 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* Page Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0F4F49] text-xs font-extrabold w-fit mb-1">
          <Sparkles size={14} className="text-amber-500" />
          <span>كوكبة المعلمين المتميزين</span>
        </div>
        <SectionTitle sub="تصفح قائمة نخبة معلمي الثانوية العامة واشترك في باقاتهم التعليمية مع متابعة واختبارات دورية.">
          المعلمون الشركاء
        </SectionTitle>
      </div>

      {/* Filter and Search Bar Pane */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl p-5 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between z-10"
      >
        {/* Search input with icon */}
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث باسم المعلم أو مادة التخصص..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Dynamic Subject Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {subjects.map((sub) => {
            const active = filterSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setFilterSubject(sub.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-[#0F4F49] text-white shadow-lg shadow-teal-900/20 scale-105"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-800"
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Grid View */}
      {filtered.length === 0 ? (
        <EmptyState
          title="لم نجد أي معلمين مطبقين للتصفية"
          description="جرّب تعديل كلمة البحث أو اختيار مادة دراسية أخرى للحصول على نتائج."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          <AnimatePresence>
            {filtered.map((tch) => (
              <motion.div
                key={tch.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`rounded-3xl p-6 bg-gradient-to-br ${tch.bgGradient} bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Decorative Top Accent Circle */}
                <div
                  className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-20 pointer-events-none transition-transform group-hover:scale-125"
                  style={{ background: tch.accent }}
                />

                <div className="flex flex-col gap-4">
                  {/* Avatar & Title Row */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar name={tch.name} src={tch.avatar} size={56} />
                      <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white border-2 border-white">
                        <ShieldCheck size={12} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0F4F49] transition-colors flex items-center gap-1.5">
                        <span>{tch.name}</span>
                      </h3>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${tch.badgeColor}`}>
                          {tch.subject}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                          <Star size={12} fill="#F59E0B" />
                          <span>{tch.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Description */}
                  <p className="text-xs font-medium text-slate-600 leading-relaxed min-h-[48px]">
                    {tch.bio}
                  </p>

                  {/* Metrics Footer Badges */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                      <BookOpen size={14} className="text-slate-400" />
                      <span>{tch.packagesCount} باقات دراسية</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                      <Users size={14} className="text-slate-400" />
                      <span>{tch.studentsCount} طالب</span>
                    </div>
                  </div>
                </div>

                {/* CTA Action Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-4 rounded-2xl font-extrabold text-xs shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => navigate(`/student/teachers/${tch.id}`)}
                >
                  <span>استعرض باقات المعلم</span>
                  <ArrowLeft size={14} />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default BrowseTeachersPage;
