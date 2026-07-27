import * as React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { motion } from "framer-motion";
import { Star, CheckCircle, TrendingUp, TrendingDown, ArrowLeft, Brain, Sparkles, Award, Target } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const StudentGradesPage: React.FC = () => {
  const data = [
    { name: "مايو", avg: 82 },
    { name: "يونيو", avg: 79 },
    { name: "يوليو", avg: 87 }
  ];

  const radarData = [
    { subject: "رياضيات", A: 85, fullMark: 100 },
    { subject: "فيزياء", A: 78, fullMark: 100 },
    { subject: "كيمياء", A: 91, fullMark: 100 },
    { subject: "أحياء", A: 82, fullMark: 100 },
    { subject: "لغات", A: 88, fullMark: 100 }
  ];

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
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-sky-300/15 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-400/20 to-pink-300/15 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* Page Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0F4F49] text-xs font-extrabold w-fit mb-1">
          <Brain size={14} className="text-purple-600 animate-pulse" />
          <span>تحليلات الذكاء الاصطناعي الأكاديمية</span>
        </div>
        <SectionTitle sub="استعرض كشف درجات الامتحانات والواجبات ونسب الإتقان للمهارات المختلفة المحددة بالذكاء الاصطناعي.">
          سجل درجاتي وتحليلات الأداء
        </SectionTitle>
      </div>

      {/* KPI Cards Row with Vivid Accents */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-5 z-10">
        {[
          { label: "المتوسط الكلي", val: "87%", icon: <Star size={20} />, trend: "up", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
          { label: "امتحانات مكتملة", val: "12 اختبار", icon: <CheckCircle size={20} />, trend: null, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
          { label: "أعلى درجة مسجلة", val: "94%", icon: <Award size={20} />, trend: null, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" }
        ].map(kpi => (
          <motion.div
            key={kpi.label}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`rounded-3xl p-6 bg-white border ${kpi.border} shadow-lg flex flex-col justify-between relative overflow-hidden group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500">{kpi.label}</span>
              <div className={`p-2.5 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-black text-slate-900 font-sans">{kpi.val}</span>
              {kpi.trend === "up" && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <TrendingUp size={14} /> +5%
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid: Evolution Area Chart vs Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        
        {/* Performance Trend Area Chart (8 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-8 rounded-3xl p-6 bg-white border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">منحنى تطور الأداء الأكاديمي</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">تغير المتوسط التراكمي لآخر 3 أشهر</p>
            </div>
            <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              تطور إيجابي مستمر ✨
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ left: -16 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F4F49" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "none",
                  borderRadius: "16px",
                  color: "#fff",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              />
              <Area type="monotone" dataKey="avg" stroke="#0F4F49" fill="url(#areaGrad)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skill Radar Chart (4 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-4 rounded-3xl p-6 bg-white border border-slate-100 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-800">خريطة توزيع المهارات</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">نسب إتقان المهارات الأكاديمية</p>
          </div>

          <div className="w-full h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#334155", fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Radar name="الإتقان" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} strokeWidth={2.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-center text-xs font-bold text-purple-900">
            أعلى مادة في المهارات: الكيمياء (91%) 🧪
          </div>
        </motion.div>

      </div>

      {/* Results by Subject Horizontal Grid */}
      <motion.div variants={itemVariants} className="rounded-3xl p-6 bg-white border border-slate-100 shadow-xl z-10">
        <h3 className="text-base font-extrabold text-slate-800 mb-4">النتائج والدرجات حسب المواد الدراسية</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: "الرياضيات", avg: 87, gradient: "from-sky-500 to-indigo-600", color: "text-sky-600", bg: "bg-sky-50" },
            { name: "الفيزياء", avg: 82, gradient: "from-purple-500 to-pink-600", color: "text-purple-600", bg: "bg-purple-50" },
            { name: "الكيمياء", avg: 91, gradient: "from-emerald-500 to-teal-600", color: "text-emerald-600", bg: "bg-emerald-50" }
          ].map(s => (
            <div key={s.name} className={`p-4 rounded-2xl border border-slate-100 ${s.bg} flex flex-col gap-3`}>
              <div className="flex justify-between items-center text-sm font-extrabold">
                <span className="text-slate-800">{s.name}</span>
                <span className={`${s.color} text-lg font-sans font-black`}>{s.avg}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-200/60">
                <div className={`h-full rounded-full bg-gradient-to-r ${s.gradient}`} style={{ width: `${s.avg}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weak Points List */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 z-10">
        <SectionTitle>موضوعات ومهارات تحتاج إلى مراجعة وتطوير</SectionTitle>

        <div className="flex flex-col gap-4">
          {[
            { topic: "المشتقات والتكامل وتطبيقات المساحات", subject: "الرياضيات", score: 42, trend: "down", badge: "تحتاج تحسين عاجل" },
            { topic: "الدوائر الكهربية وقانون أوم للمغلقة", subject: "الفيزياء", score: 55, trend: "up", badge: "في طور التحسن" }
          ].map(w => (
            <motion.div
              key={w.topic}
              whileHover={{ x: -4 }}
              className="rounded-3xl p-5 bg-white border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className={`w-3 h-12 rounded-full ${w.score < 50 ? "bg-rose-500" : "bg-amber-500"} shrink-0`} />
                <div>
                  <div className="text-sm font-extrabold text-slate-800">{w.topic}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-500">{w.subject}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${w.score < 50 ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}>
                      {w.badge}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  {w.trend === "up" ? <TrendingUp size={18} className="text-emerald-500" /> : <TrendingDown size={18} className="text-rose-500" />}
                  <span className={`text-xl font-black font-sans ${w.score < 50 ? "text-rose-600" : "text-amber-600"}`}>
                    {w.score}%
                  </span>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-2xl font-bold text-xs cursor-pointer flex items-center gap-1.5"
                  onClick={() => {}}
                >
                  <span>بدء المراجعة التفاعلية</span>
                  <ArrowLeft size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default StudentGradesPage;
