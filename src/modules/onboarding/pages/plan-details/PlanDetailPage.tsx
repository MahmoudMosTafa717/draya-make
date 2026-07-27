import * as React from "react";
import { useNavigate, useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Sparkles, Zap, ShieldCheck, ArrowLeft, ArrowRight, HelpCircle,
  ChevronDown, Star, Users, BookOpen, Award, Check
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { P } from "@/shared/constants/photos";

interface IPlanDetail {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  price: string;
  period: string;
  color: string;
  gradient: string;
  target: string;
  heroImg: string;
  features: string[];
  unavailable: string[];
  quote: { text: string; author: string; role: string };
  faqs: { q: string; a: string }[];
}

export const PlanDetailPage: React.FC = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const plansData: Record<string, IPlanDetail> = {
    basic: {
      id: "basic",
      name: "الخطة الأساسية",
      badge: "للمبتدئين والمجموعات الصغيرة",
      tagline: "ابدأ رحلتك التدريسية الرقمية مجاناً وبدون أي التزامات ببطاقة إئتمان.",
      price: "مجاناً",
      period: "للأبد",
      color: "#0EA5E9",
      gradient: "from-sky-600 via-[#0F4F49] to-teal-700",
      target: "المعلمون الجدد، الدروس الخصوصية، والتجربة الأولية",
      heroImg: P.studentStudy,
      features: [
        "إضافة حتى 50 طالباً نـشطاً",
        "إنشاء باقتين دراسيتين كاملتين",
        "رفع فيديوهات ومذكرات بصيغة PDF",
        "امتحانات إلكترونية حتى 5 اختبارات شهرياً",
        "تصحيح إلكتروني فوري ومباشر",
        "دعم فني عبر البريد الإلكتروني"
      ],
      unavailable: [
        "توليد الامتحانات بالذكاء الاصطناعي",
        "تحليلات أداء الطلاب المتقدمة بالـ AI",
        "حماية الفيديوهات من تسجيل الشاشة",
        "دعم فني مباشر 24/7 عبر الواتساب"
      ],
      quote: {
        text: "استخدمت الباقة الأساسية لبدء سنتي الدراسية، وكانت تجربة ممتازة لتنظيم مجموعتي الصغرى دون تكاليف.",
        author: "أ. محمد مصطفى",
        role: "مدرس رياضيات ثانوي"
      },
      faqs: [
        { q: "هل الخطة الأساسية مجانية بالكامل حقاً؟", a: "نعم! الخطة الأساسية مجانية 100% وبدون حاد زمني، وتتضمن جميع الأدوات البسيطة للبدء." },
        { q: "هل يمكنني الترقية للخطة المحترفة لاحقاً؟", a: "بالتأكيد، يمكنك الترقية بضغطة زر في أي وقت وسيتم الاحتفاظ بجميع بيانات طلابك وباقاتك." }
      ]
    },
    pro: {
      id: "pro",
      name: "خطة المعلم المحترف",
      badge: "الأكثر شعبية وإقبالاً 🔥",
      tagline: "الباقة الأكثر اختياراً بين كبار معلمي الثانوية العامة لمضاعفة الأرباح وتوفير وقت التحضير.",
      price: "499 ج.م",
      period: "/ شهرياً",
      color: "#0F4F49",
      gradient: "from-[#0F4F49] via-[#1B6D63] to-teal-600",
      target: "المعلمون الشركاء، المجموعات الكبيرة، ومقدمو المراجعات النهائية",
      heroImg: P.teacherClass,
      features: [
        "إضافة حتى 500 طالب نـشط",
        "إنشاء باقات ودروس وبنوك أسئلة بلا حدود",
        "توليد الامتحانات بالذكاء الاصطناعي بضغطة زر",
        "تقارير تحليلات أداء الطلاب ونقاط الضعف بالـ AI",
        "حماية الفيديوهات من التسريب والـ Screen Record",
        "توليد كروت وأكواد تفعيل المجموعات",
        "دعم فني مباشر على مدار الساعة عبر الواتساب"
      ],
      unavailable: [
        "نطاق خاص ومستقل باسم الأكاديمية (Custom Domain)",
        "إدارة طاقم المدرسين المتعددين"
      ],
      quote: {
        text: "توليد الامتحانات بالذكاء الاصطناعي وفر عليّ عشرات الساعات أسبوعياً، وأصبح لدى طلابي تحليلات أداء مبهرة.",
        author: "أ. أحمد السيد",
        role: "كبير معلمي الرياضيات"
      },
      faqs: [
        { q: "كيف تعمل ميزة حماية الفيديوهات من التسريب؟", a: "نستخدم تقنيات تشفير عالية وتأطير للعلامة المائية باسم ورقم هاتف الطالب فوق الفيديو لمنع التصوير." },
        { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، ليس هناك أي عقود طويلة الأمد، يمكنك إلغاء أو تغيير خطتك في أي وقت." }
      ]
    },
    enterprise: {
      id: "enterprise",
      name: "خطة المؤسسات والأكاديميات",
      badge: "للسناتر والمؤسسات الكبرى",
      tagline: "منصة تعليمية متكاملة بهوية مؤسستك الخاصة ونطاق مستقل مع تحكم كامل وإدارة متطورة.",
      price: "1,299 ج.م",
      period: "/ شهرياً",
      color: "#7C3AED",
      gradient: "from-purple-900 via-[#7C3AED] to-indigo-700",
      target: "المراكز التعليمية، السناتر، الأكاديميات الخاصة، وسلسلة المدارس",
      heroImg: P.studyGroup,
      features: [
        "عدد طلاب وباقات دراسية بلا حدود",
        "نطاق خاص ومستقل باسم الأكاديمية (Custom Domain)",
        "إدارة طاقم المعلمين وصلاحيات الأطقم الإدارية",
        "نماذج ذكاء اصطناعي مخصصة ومدرّبة على مناهجك",
        "ربط مباشر مع بوابة الدفع الخاصة بمركزك",
        "مدير حساب خاص ومساعد تقني متفرغ 24/7",
        "تصدير التقارير المالية والتحصيلية الشاملة"
      ],
      unavailable: [],
      quote: {
        text: "أكاديميتنا تدير أكثر من 3000 طالب عبر هذه الخطة، النطاق المستقل والدعم المتواصل أعطانا احترافية عالية جداً.",
        author: "م. حسام الدين",
        role: "مدير أكاديمية التفوق التعليمية"
      },
      faqs: [
        { q: "كم يستغرق ربط النطاق الخاص بالأكاديمية (Custom Domain)؟", a: "يستغرق الربط التقني وتفعيل شهادات الأمان SSL أقل من 24 ساعة بواسطة فريق الدعم الفني." },
        { q: "هل تدعم الخطة إضافة عدة مدرسين في نفس السنتر؟", a: "نعم، يمكنك إضافة عدد لا محدود من المعلمين وتوزيع الطلاب والفصول والنسب المالية بينهم بسهولة." }
      ]
    }
  };

  const plan = plansData[planId || "pro"] || plansData["pro"];

  const handleProceedCheckout = () => {
    navigate(`/onboarding/checkout?plan=${plan.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900 flex flex-col font-sans" style={{ direction: "rtl" }}>
      
      {/* Navigation Top Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
            <div className="w-8 h-8 rounded-xl bg-[#0F4F49] flex items-center justify-center text-white font-extrabold">
              د
            </div>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">درايَة</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/onboarding/choose-plan")}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight size={14} />
              <span>العودة لمقارنة الخطط</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleProceedCheckout}
              className="rounded-2xl font-extrabold text-xs bg-[#0F4F49] px-5 py-2.5 shadow-md"
            >
              الاشتراك والدفع الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Main Banner Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Background Blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl animate-float-blob pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl animate-float-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold w-fit">
              <Sparkles size={14} className="text-amber-400" />
              <span>{plan.badge}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              {plan.name}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              {plan.tagline}
            </p>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-4xl md:text-5xl font-black font-sans text-amber-400">{plan.price}</span>
              <span className="text-slate-400 font-bold text-base">{plan.period}</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleProceedCheckout}
                className="rounded-2xl font-extrabold text-sm bg-amber-400 text-slate-950 hover:bg-amber-300 border-none px-8 py-3.5 shadow-xl cursor-pointer flex items-center gap-2"
              >
                <span>الاشتراك والدفع الآن</span>
                <ArrowLeft size={16} />
              </Button>
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative aspect-[4/3]">
              <img src={plan.heroImg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs">
                <span className="font-extrabold block text-amber-300 mb-1">الفئة المستهدفة:</span>
                <span className="font-medium text-slate-200">{plan.target}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-6 py-16 w-full flex flex-col gap-16">
        
        {/* Features Checklist Matrix */}
        <section className="flex flex-col gap-8">
          <SectionTitle sub="جميع المميزات والخصائص التقنية التي توفرها لك هذه الباقة لتطوير مجموعتك التعليمية.">
            مميزات {plan.name} بالتفصيل
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Included Features */}
            <div className="rounded-3xl p-8 bg-white border border-slate-200/80 shadow-xl flex flex-col gap-5">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                <CheckCircle2 size={20} className="text-emerald-500" />
                <span>المميزات المضمنة في هذه الباقة</span>
              </h3>

              <div className="flex flex-col gap-3.5">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-extrabold text-slate-800">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unavailable / Upgrade Features */}
            <div className="rounded-3xl p-8 bg-slate-50 border border-slate-200/60 shadow-sm flex flex-col gap-5">
              <h3 className="text-base font-extrabold text-slate-500 flex items-center gap-2 pb-4 border-b border-slate-200">
                <ShieldCheck size={20} className="text-slate-400" />
                <span>مميزات تتطلب الباقات الأعلى</span>
              </h3>

              {plan.unavailable.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-emerald-700 font-extrabold text-sm gap-2">
                  <Sparkles size={28} className="text-amber-500" />
                  <span>تهانينا! هذه الباقة تتضمن جميع مميزات المنصة بالكامل وبلا أي قيود.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {plan.unavailable.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-400 opacity-70">
                      <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✕
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Testimonial Quote Section */}
        <section className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#0F4F49] to-teal-800 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" />
              ))}
            </div>
            <p className="text-base md:text-xl font-bold leading-relaxed italic">
              "{plan.quote.text}"
            </p>
            <div className="mt-2">
              <div className="font-extrabold text-sm text-amber-300">{plan.quote.author}</div>
              <div className="text-xs text-slate-300">{plan.quote.role}</div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleProceedCheckout}
            className="rounded-2xl font-extrabold text-sm bg-white text-[#0F4F49] hover:bg-slate-100 border-none px-8 py-3.5 shadow-xl cursor-pointer shrink-0"
          >
            اشترك الآن مثل المعلمين المميزين
          </Button>
        </section>

        {/* FAQ Accordion Section */}
        <section className="flex flex-col gap-6">
          <SectionTitle sub="إليك الإجابات عن أكثر الأسئلة الشائعة المتعلقة بطريقة التفعيل والدفع لهذه الباقة.">
            الأسئلة الشائعة عن {plan.name}
          </SectionTitle>

          <div className="flex flex-col gap-3">
            {plan.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-right p-5 font-extrabold text-sm text-slate-900 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0F4F49]" : "text-slate-400"}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-xs font-medium text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer CTA Banner */}
      <footer className="bg-slate-950 text-white py-12 px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div>
            <h3 className="text-lg font-black mb-1">جاهز للبدء مع {plan.name}؟</h3>
            <p className="text-xs text-slate-400 font-medium">ابدأ الآن في تجهيز دروسك وفصولك الدراسية بسهولة وسرعة.</p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleProceedCheckout}
            className="rounded-2xl font-extrabold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 border-none px-8 py-3.5 shadow-xl cursor-pointer"
          >
            الانتقال لصفحة الدفع والتأكيد
          </Button>
        </div>
      </footer>

    </div>
  );
};

export default PlanDetailPage;
