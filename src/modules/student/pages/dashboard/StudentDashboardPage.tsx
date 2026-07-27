import * as React from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, TrendingUp, CheckCircle, Clock, AlertTriangle, ChevronLeft, Flame, Sparkles,
  PlayCircle, Target, Zap, ArrowUpRight
} from "lucide-react";
import { P } from "@/shared/constants/photos";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [streakHovered, setStreakHovered] = React.useState(false);

  const courses = [
    {
      id: "c1",
      title: "الجبر وحساب المثلثات",
      teacher: "أ. محمد علي",
      progress: 68,
      lectures: 12,
      total: 18,
      img: P.mathChalkboard,
      tag: "الرياضيات",
      accent: "#0EA5E9",
      gradient: "from-sky-500 to-indigo-600"
    },
    {
      id: "c2",
      title: "الفيزياء الكهربية والحديثة",
      teacher: "أ. سارة حسن",
      progress: 40,
      lectures: 8,
      total: 20,
      img: P.physicsLab,
      tag: "الفيزياء",
      accent: "#8B5CF6",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "c3",
      title: "الكيمياء العضوية المتقدمة",
      teacher: "أ. أحمد سامي",
      progress: 85,
      lectures: 17,
      total: 20,
      img: P.chemistryLab,
      tag: "الكيمياء",
      accent: "#10B981",
      gradient: "from-emerald-500 to-teal-600"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
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
      {/* ── Background Organic Animated Blobs & Ambient Lights ── */}
      <div className="absolute top-[-50px] right-[-30px] w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/25 via-emerald-300/20 to-sky-400/25 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-[100px] right-[10%] w-80 h-80 rounded-full bg-gradient-to-tl from-sky-400/20 via-indigo-400/15 to-emerald-300/20 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* ── Bento Row 1: Asymmetric Hero Banner & Gamification Streak ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        
        {/* Main Hero Card (8 cols) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 relative rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col justify-between min-h-[260px] shadow-2xl transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(15,79,73,0.96) 0%, rgba(20,95,88,0.92) 50%, rgba(30,120,110,0.88) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          {/* Background Real Image with Blend Effect */}
          <img
            src={P.studentStudy}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none transform scale-105 transition-transform duration-1000 hover:scale-100"
          />

          {/* Decorative Vector Shapes */}
          <svg className="absolute top-0 left-0 w-64 h-64 text-white/5 pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
            <path d="M45,-76C58.3,-68.8,69.1,-57.4,75.8,-43.9C82.5,-30.4,85,-15.2,84.1,-0.5C83.2,14.2,78.8,28.4,71.2,40.9C63.6,53.4,52.8,64.2,39.9,71.4C27,78.6,13.5,82.2,-0.7,83.4C-14.9,84.6,-29.8,83.4,-42.6,76.5C-55.4,69.6,-66.1,57,-73.4,42.7C-80.7,28.4,-84.6,14.2,-83.4,0.7C-82.2,-12.8,-75.9,-25.6,-67.7,-37.2C-59.5,-48.8,-49.4,-59.2,-37,-66.8C-24.6,-74.4,-12.3,-79.2,1.3,-81.4C14.9,-83.6,29.8,-83.2,45,-76Z" transform="translate(100 100)" />
          </svg>

          <div className="relative z-10 flex flex-col justify-between h-full gap-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold mb-3">
                  <Sparkles size={14} className="text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>الأحد، 20 يوليو 2026</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-sans leading-tight">
                  أهلاً بعودتك، أحمد! 👋
                </h1>
                <p className="text-white/85 text-sm md:text-base mt-2 max-w-lg leading-relaxed">
                  لديك اختبـاران مجدولان قريباً هذا الأسبوع. واصل الدراسة يومياً وحافظ على لهيب حماسك!
                </p>
              </div>

              {/* Floating Animated Badge */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 backdrop-blur-lg border border-amber-400/40 text-amber-200 text-xs font-bold shadow-lg animate-float-slow">
                <Zap size={16} className="text-amber-300 fill-amber-300" />
                <span>مستوى الأداء: ممتاـز ✨</span>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/student/my-packages")}
                className="px-6 py-3 rounded-2xl bg-white text-[#0F4F49] font-bold text-sm shadow-xl hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>تابع من حيث توقفت</span>
                <ChevronLeft size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/student/browse-teachers")}
                className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>تصفح المواد الجديدة</span>
                <ArrowUpRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Streak & Level Widget (4 cols) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden glass-panel border border-white/60 shadow-xl"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">حافز التعلم اليومي</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 border border-orange-300/50">
                نشط الآن 🔥
              </span>
            </div>

            {/* Streak Main Display */}
            <div
              onMouseEnter={() => setStreakHovered(true)}
              onMouseLeave={() => setStreakHovered(false)}
              className="relative p-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg animate-pulse-glow cursor-pointer transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0">
                <Flame size={32} className="text-white fill-amber-200 animate-bounce" />
              </div>
              <div>
                <div className="text-2xl font-black font-sans leading-none">5 أياـم متتالية</div>
                <div className="text-xs text-amber-100 mt-1 font-medium">سلسلة المذاكرة الحالية 🚀</div>
              </div>

              {/* Tooltip Popup */}
              <AnimatePresence>
                {streakHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full right-0 mb-3 w-64 p-4 rounded-2xl bg-slate-900 text-white text-xs z-50 shadow-2xl border border-slate-700"
                  >
                    <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                      <Sparkles size={14} /> مضاعف الحماس مفعّل!
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      أكملت 5 أيام من المشاهدة وحل التمارين. حافظ على السلسلة للحصول على مكافآت التفوق!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Core Mini Metrics */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex flex-col justify-center">
              <div className="text-xs font-semibold text-sky-700 mb-0.5">المتوسط التراكمي</div>
              <div className="text-xl font-extrabold text-sky-900 font-sans">87%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 flex flex-col justify-center">
              <div className="text-xs font-semibold text-purple-700 mb-0.5">المحاضرات المكتملة</div>
              <div className="text-xl font-extrabold text-purple-900 font-sans">37 درس</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bento Row 2: Colorful KPI Metric Cards & Urgent Alert Center ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 z-10">
        
        {/* Urgent Warnings Box (2 Cols) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 rounded-3xl p-6 relative overflow-hidden bg-rose-500/5 border border-rose-200/80 shadow-sm flex flex-col justify-between"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600">
                <AlertTriangle size={18} />
              </div>
              <span>تنبيهات ومواعيد عاجلة</span>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              تنبيهان جديدان
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <motion.div
              whileHover={{ x: -4 }}
              onClick={() => navigate("/student/exams")}
              className="p-3.5 rounded-2xl bg-white/90 border border-rose-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-rose-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-sm font-bold text-slate-800">امتحان الجبر التراكمي</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">غداً 10:00 ص</span>
                <Badge variant="error">عاجل جدًا</Badge>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: -4 }}
              onClick={() => navigate("/student/my-packages")}
              className="p-3.5 rounded-2xl bg-white/90 border border-amber-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-sm font-bold text-slate-800">تسليم واجب الفيزياء (الموجات)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">الخميس القادم</span>
                <Badge variant="warning">قريباً</Badge>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Metric 1: Active Packages */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="rounded-3xl p-6 bg-white border border-slate-100 shadow-lg flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          onClick={() => navigate("/student/my-packages")}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">الباقات المشترك بها</span>
            <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700">
              <Package size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 font-sans">3 باقات</div>
            <div className="text-xs font-medium text-teal-600 mt-1 flex items-center gap-1">
              <CheckCircle size={14} /> سارية حتى نهاية الترم
            </div>
          </div>
        </motion.div>

        {/* Dynamic Metric 2: Average Score */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="rounded-3xl p-6 bg-white border border-slate-100 shadow-lg flex flex-col justify-between relative overflow-hidden group cursor-pointer"
          onClick={() => navigate("/student/grades")}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">أداء المواد المتوسط</span>
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 font-sans flex items-center gap-2">
              <span>87%</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">+4% هذا الشهر</span>
            </div>
            <div className="text-xs font-medium text-sky-600 mt-1">أعلى من 92% من الطلاب 👏</div>
          </div>
        </motion.div>

      </div>

      {/* ── Bento Row 3: Current Courses (Main Column) & Insights Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        
        {/* Left Column: Continued Studying Courses (8 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <SectionTitle>متابعة دروسك اليومية</SectionTitle>
            <button
              onClick={() => navigate("/student/my-packages")}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>عرض كل المواد</span>
              <ChevronLeft size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {courses.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -3, scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(`/student/courses/${c.id}`)}
                className="rounded-3xl p-5 bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden group"
              >
                {/* Visual Thumbnail Image with Accent Tag */}
                <div className="w-full sm:w-44 h-32 sm:h-28 rounded-2xl overflow-hidden relative shrink-0">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">
                    {c.tag}
                  </span>
                </div>

                {/* Course Content Details */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-extrabold text-slate-800 group-hover:text-[#0F4F49] transition-colors">
                      {c.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                      {c.lectures}/{c.total} محاضرة
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-500 mb-3">
                    {c.teacher}
                  </p>

                  {/* Colorful Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${c.gradient} transition-all duration-700`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">{c.progress}% إنجاز الكورس</span>
                    <span className="text-[#0F4F49] flex items-center gap-1 font-bold group-hover:translate-x-[-3px] transition-transform">
                      <span>استئناف المشاهدة</span>
                      <PlayCircle size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Upcoming Exams & Weakness Analysis (4 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Upcoming Exams Card */}
          <div className="rounded-3xl p-6 bg-white border border-slate-100 shadow-lg">
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Clock size={18} />
              </div>
              <span>جدول الامتحانات القادمة</span>
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { title: "اختبار الباب الثالث (جبر)", date: "غداً 10:00 ص", color: "bg-rose-500", badge: "هام" },
                { title: "مراجعة قانون كيرشوف (فيزياء)", date: "الخميس 11:00 ص", color: "bg-amber-500", badge: "مراجعة" },
              ].map((e, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className={`w-1.5 h-10 rounded-full ${e.color}`} />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800">{e.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{e.date}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                    {e.badge}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="tertiary"
              size="sm"
              onClick={() => navigate("/student/exams")}
              className="w-full mt-4 rounded-xl font-bold text-xs cursor-pointer"
            >
              عرض كل الامتحانات
            </Button>
          </div>

          {/* Weakness Map / Focus Topics */}
          <div className="rounded-3xl p-6 bg-white border border-slate-100 shadow-lg">
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Target size={18} />
              </div>
              <span>نقاط تحسين تحتاج تركيزك</span>
            </h3>

            <div className="flex flex-col gap-4">
              {[
                { topic: "المشتقات والاتصال الرياضي", score: 42, color: "bg-rose-500" },
                { topic: "الدوائر المغلقة وقوانين أوم", score: 55, color: "bg-amber-500" },
              ].map((w, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{w.topic}</span>
                    <span className="text-rose-600">{w.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-full ${w.color} rounded-full`} style={{ width: `${w.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="tertiary"
              size="sm"
              onClick={() => navigate("/student/grades")}
              className="w-full mt-5 rounded-xl font-bold text-xs cursor-pointer"
            >
              فتح تقارير التحليل المتقدمة
            </Button>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
};

export default StudentDashboardPage;
