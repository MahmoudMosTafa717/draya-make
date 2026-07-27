import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Brain, ShieldCheck, BarChart, BookOpen, Star, GraduationCap,
  Play, CheckCircle, Check, ArrowLeft, Users, ChevronDown, Sparkles, X, Heart
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { P } from "@/shared/constants/photos";
import { ACCENT, ACCENT_BG } from "@/shared/constants/accent";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Card } from "@/shared/components/ui/Card";
import { Avatar } from "@/shared/components/ui/Avatar";
import { BlobBg } from "@/shared/components/layout/BlobBg";
import { DecorativeScatter } from "@/shared/components/layout/DecorativeScatter";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const benefits = [
    { Icon: Brain,        label: "AI يفهم محتواك",       desc: "مش AI عام — بيقرأ فيديوهاتك وملفاتك ويولّد أسئلة من جوّاهم فعلاً، مش من قاعدة بيانات عامة.",  iconBg: ACCENT_BG.purple, iconColor: ACCENT.purple },
    { Icon: ShieldCheck,  label: "أنت اللي بتوافق",      desc: "كل تقرير وكل امتحان بيولّده الـ AI بيعدي عليك الأول. ما بيوصلش لحد إلا بإذنك الصريح.",         iconBg: ACCENT_BG.teal,   iconColor: ACCENT.teal   },
    { Icon: BarChart,     label: "اعرف مين بيتعب فين",   desc: "خريطة نقاط الضعف بتكشف لك كل طالب بالاسم — مش متوسطات فاضية، بيانات حقيقية تقدر تتصرف عليها.", iconBg: ACCENT_BG.coral,  iconColor: ACCENT.coral  },
    { Icon: BookOpen,     label: "مصري من الأساس",       desc: "واجهة عربية RTL مصمَّمة للمعلم والسنتر المصري — مش ترجمة، ده تصميم من الصفر للسياق بتاعنا.",    iconBg: ACCENT_BG.orange, iconColor: ACCENT.orange },
    { Icon: Star,         label: "دقيقتان كفاية",        desc: "من تسجيل الدخول لأول محاضرة منشورة في دقيقتين. مش محتاج دورة تدريبية ولا خبرة تقنية.",          iconBg: ACCENT_BG.orange, iconColor: ACCENT.orange },
    { Icon: GraduationCap,label: "+31% في الدرجات",      desc: "طلاب درايَة بيحسّنوا درجاتهم بمعدل 31% في أول 3 شهور — وده مش كلام تسويقي، ده بيانات حقيقية.",  iconBg: ACCENT_BG.teal,   iconColor: ACCENT.teal   },
  ];

  const features = [
    {
      tag: "للمعلم", title: "إدارة شاملة من مكان واحد",
      desc: "أنشئ باقاتك وكورساتك ومحاضراتك، وأرفق الفيديو والواجب والامتحان كلها من شاشة واحدة — بدون تبديل أدوات.",
      photo: P.teacherClass, flip: false,
      items: ["إنشاء باقات وكورسات بخطوات بسيطة", "رفع الفيديو والـ PDF في نفس الشاشة", "نشر المحاضرة أو حفظها كمسودة فوراً"],
    },
    {
      tag: "للطالب", title: "كل محتواك في تدرّج واضح",
      desc: "باقة → كورس → محاضرة. تتبّع تقدمك، راجع الواجبات والامتحانات، واستذكر نقاط ضعفك بنقرة.",
      photo: P.studentStudy, flip: true,
      items: ["مسار تعلم منظم لكل مادة", "امتحانات موقوتة مع تغذية راجعة بالذكاء الاصطناعي", "درجاتي + نقاط ضعفي + رابط للمراجعة"],
    },
    {
      tag: "الذكاء الاصطناعي", title: "AI مساعد لا مسيطر",
      desc: "يُولِّد الأسئلة من محتوى محاضرتك، ويُصيغ تقارير الأداء — لكنك أنت من يوافق ويُرسل.",
      photo: P.mathChalkboard, flip: false,
      items: ["توليد 20 سؤال في 30 ثانية من الفيديو أو الـ PDF", "تقارير أداء مُصاغة ومُرفَقة بالمخططات", "كل محتوى AI مُعلَّم بوضوح — لا تخليط مع محتوى المعلم"],
    },
  ];

  const testimonials = [
    {
      quote: "درايَة وفّر عليا ساعات في تحضير الامتحانات — والأهم إن الـ AI بيقترح بس أنا اللي بوافق. ده مهم جداً للمصداقية مع الأولياء.",
      name: "أحمد السيد", role: "معلم رياضيات", center: "أكاديمية التميز، القاهرة", avatar: "أس",
    },
    {
      quote: "الطلاب بيتابعوا تقدمهم وحدهم — مبقاش لازم أعمل sheets وأعدّل كل حاجة يدوياً. التقارير بتوصل للأولياء أسرع وأوضح.",
      name: "سارة محمد", role: "مشرفة علوم", center: "مركز النور، الإسكندرية", avatar: "سم",
    },
    {
      quote: "تقارير الأولياء كانت تاخد مني يوم كامل. دلوقتي بتتعمل في دقايق وأنا بس بعدّل وبوافق وببعت. وقت هيفرق في حياتي.",
      name: "محمود عبدالله", role: "مدير أكاديمية", center: "أكاديمية الفتح، الجيزة", avatar: "مع",
    },
  ];

  const faqItems = [
    { q: "هل يمكنني تجربة درايَة مجاناً؟", a: "نعم، تقدر تبدأ بالخطة الأساسية المجانية بدون بطاقة ائتمان. تدعم حتى 50 طالب وكورسين ومجموعة من المميزات الأساسية." },
    { q: "هل درايَة مدعوم بالكامل باللغة العربية؟", a: "نعم تماماً. المنصة مصممة RTL-first للمعلم والطالب المصري — الواجهة والتقارير والدعم كلها بالعربي." },
    { q: "كيف يعمل الذكاء الاصطناعي في درايَة؟", a: "الـ AI بيقرأ محتوى المحاضرة (فيديو أو PDF) ويولّد أسئلة وتقارير أداء. لكن المعلم هو اللي بيراجع ويوافق قبل أي إرسال للطالب أو ولي الأمر — مبيحصلش إرسال تلقائي." },
    { q: "هل تناسب المنصة المراكز الكبيرة؟", a: "نعم. خطة المؤسسات مخصصة للمراكز الكبيرة وتشمل white-label وAPI integration ومدير حساب مخصص. تواصل معنا للتسعير." },
    { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل بطاقات ائتمان فيزا وماستر كارد، والمحافظ الإلكترونية المصرية (فودافون كاش، اورانج كاش). الدفع السنوي يوفر 20%." },
  ];

  const plans = [
    {
      name: "أساسي", priceMonthly: "مجاني", priceAnnual: "مجاني",
      sub: "للأكاديميات الناشئة", featured: false, cta: "ابدأ مجاناً",
      feats: ["حتى 50 طالب", "مجموعتان كحد أقصى", "باقتا دراسة", "تقارير أداء مبسطة"],
    },
    {
      name: "محترف", priceMonthly: "499", priceAnnual: "399",
      sub: "جنيه / شهرياً", featured: true, cta: "ابدأ الآن",
      feats: ["طلاب غير محدودين", "مجموعات غير محدودة", "باقات غير محدودة", "AI Exam Builder", "تحليلات وتقارير AI للأولياء", "دعم فني أولوية"],
    },
    {
      name: "مؤسسات", priceMonthly: "مخصَّص", priceAnnual: "مخصَّص",
      sub: "تواصل معنا", featured: false, cta: "تواصل معنا",
      feats: ["كل مميزات محترف", "تخصيص الهوية (White-label)", "ربط API مخصص", "مدير حساب خاص وسرعة أداء مضاعفة"],
    },
  ];

  return (
    <div style={{ direction: "rtl", fontFamily: "'Cairo', 'Cairo', 'IBM Plex Sans Arabic', system-ui, sans-serif", background: "#FAFAF8", minHeight: "100vh" }}>
      
      {/* Navbar header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        boxShadow: scrolled ? t.shadow1 : "none",
        transition: "background 300ms, box-shadow 300ms, border-color 300ms",
        padding: "0 clamp(16px,4vw,48px)", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 36, height: 36, borderRadius: "10px",
            background: t.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <GraduationCap size={19} color="#fff" />
          </div>
          <span style={{
            fontSize: "1.1875rem", fontWeight: 800, letterSpacing: "-0.02em",
            color: t.textPrimary,
          }}>درايَة</span>
        </div>

        <nav className="hidden sm:flex" style={{ gap: "2px" }}>
          {[["الرئيسية", "#hero"], ["المميزات", "#features"], ["الأسعار", "#pricing"], ["الأسئلة الشائعة", "#faq"]].map(([label, href]) => (
            <a key={label} href={href} style={{
              padding: "7px 13px", borderRadius: "8px",
              color: t.textSecondary,
              fontSize: "0.875rem", fontWeight: 500,
              textDecoration: "none", transition: "color 200ms, background 150ms",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = t.primary50; e.currentTarget.style.color = t.primary; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.textSecondary; }}
            >{label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button variant="secondary" size="sm" onClick={() => navigate("/login")}>تسجيل الدخول</Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>ابدأ مجاناً</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" style={{
        minHeight: "100vh", background: "#FAFAF8",
        display: "flex", alignItems: "center",
        padding: "120px clamp(20px,5vw,48px) 96px", position: "relative", overflow: "hidden",
      }}>
        <BlobBg variant="light" />

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20 lg:items-center" style={{
          maxWidth: "1280px", margin: "0 auto", width: "100%",
          position: "relative", zIndex: 1,
        }}>
          {/* Text column */}
          <div className="w-full lg:w-[52%] min-w-0">
            <h1 style={{
              fontFamily: "'Cairo', 'IBM Plex Sans Arabic', sans-serif",
              fontSize: "clamp(2.75rem, 5.5vw, 4rem)", fontWeight: 800, color: t.textPrimary,
              lineHeight: 1.05, marginBottom: "12px", letterSpacing: "-0.02em",
            }}>
              درايَة
            </h1>
            <p style={{
              fontSize: "clamp(1.125rem, 2.2vw, 1.4375rem)", fontWeight: 400,
              color: t.textSecondary, lineHeight: 1.5,
              marginBottom: "20px", letterSpacing: "-0.01em",
            }}>
              منصة التعلم الأكاديمي الذكي<br />الموجَّه لطلاب المعلمين والسناتر
            </p>
            <p style={{
              fontSize: "1.0625rem", color: t.textSecondary,
              lineHeight: 1.85, marginBottom: "40px", maxWidth: "440px",
            }}>
              توليد الامتحانات بالذكاء الاصطناعي، اكتشاف نقاط الضعف،
              وتقارير أولياء الأمور المعتمدة.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
              <Button variant="primary" size="lg" style={{ boxShadow: "0 4px 20px rgba(27,109,99,0.25)" }} onClick={() => navigate("/signup")}>
                سجّل حسابك الآن
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                <Play size={14} style={{ marginLeft: "6px" }} />
                تعرف على المميزات
              </Button>
            </div>

            {/* Stats row below CTAs */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:flex md:items-center md:flex-wrap" style={{
              paddingTop: "28px", borderTop: `1px solid ${t.border}`, width: "100%"
            }}>
              {[
                { v: "92%",     l: "معدل الرضا" },
                { v: "12,000+", l: "طالب نشط" },
                { v: "500+",    l: "أكاديمية شريكة" },
                { v: "1,226+",  l: "محاضرة مفهرسة" },
              ].map((stat, i) => (
                <React.Fragment key={stat.l}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="md:px-5 first:md:pr-0">
                    <div>
                      <div style={{ fontSize: "1.125rem", fontWeight: 900, color: t.textPrimary, lineHeight: 1, letterSpacing: "-0.025em" }}>{stat.v}</div>
                      <div style={{ fontSize: "0.6875rem", color: t.textSecondary, marginTop: "2px", fontWeight: 500 }}>{stat.l}</div>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block" style={{ width: "1px", height: "32px", background: t.border, flexShrink: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Photo column — collage */}
          <div className="w-full lg:flex-1" style={{ position: "relative", minHeight: "clamp(320px, 40vw, 590px)", minWidth: 0 }}>
            
            {/* Grid of 4 images with frame colors */}
            <div style={{
              position: "absolute", top: "0", right: "2%", width: "90%", height: "94%",
              display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gridTemplateRows: "repeat(2, minmax(0, 1fr))", gap: "16px",
              padding: "12px", direction: "ltr",
            }}>
              <div style={{ position: "relative", transform: "rotate(3.5deg)", marginTop: "24px", marginRight: "5px" }}>
                <div style={{ position: "absolute", inset: "-8px 8px 8px -8px", borderRadius: "30px", background: "#EDE9FE" }} />
                <div style={{ position: "relative", height: "100%", overflow: "hidden", borderRadius: "28px", boxShadow: t.shadow3 }}>
                  <img src={P.hero2Circle} alt="طالب يذاكر" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
              </div>

              <div style={{ position: "relative", transform: "rotate(5deg)", marginBottom: "7px" }}>
                <div style={{ position: "absolute", inset: "-8px 8px 8px -8px", borderRadius: "30px", background: "#DDF5F1" }} />
                <div style={{ position: "relative", height: "100%", overflow: "hidden", borderRadius: "28px", boxShadow: t.shadow3 }}>
                  <img src={P.hero1Primary} alt="طالب يدرس" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
              </div>

              <div style={{ position: "relative", transform: "rotate(-6deg)", marginTop: "4px", marginRight: "4px" }}>
                <div style={{ position: "absolute", inset: "-8px 8px 8px -8px", borderRadius: "30px", background: "rgba(249, 180, 59, 0.20)" }} />
                <div style={{ position: "relative", height: "100%", overflow: "hidden", borderRadius: "28px", boxShadow: t.shadow3 }}>
                  <img src={P.hero3Square} alt="طلاب" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>
              </div>

              <div style={{ position: "relative", transform: "rotate(3deg)", marginTop: "-3px", marginLeft: "3px" }}>
                <div style={{ position: "absolute", inset: "-8px 8px 8px -8px", borderRadius: "30px", background: "rgba(244, 99, 94, 0.16)" }} />
                <div style={{ position: "relative", height: "100%", overflow: "hidden", borderRadius: "28px", boxShadow: t.shadow3 }}>
                  <img src={P.hero4Blob} alt="طالبة" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
              </div>
            </div>

            {/* Floating Info Cards */}
            <div style={{
              position: "absolute", top: "11%", left: "-1%", zIndex: 6,
              background: "#fff", border: `1px solid ${t.border}`, borderLeft: `5px solid ${ACCENT.purple}`, borderRadius: "14px",
              padding: "12px 14px", whiteSpace: "nowrap", boxShadow: t.shadow3,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "8px", background: ACCENT_BG.purple, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Sparkles size={13} color={ACCENT.purple} />
                </div>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>امتحان AI جاهز</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.success }} />
                <span style={{ fontSize: "0.6875rem", color: t.textSecondary, fontWeight: 500 }}>20 سؤالاً في انتظار المراجعة</span>
              </div>
            </div>

            <div style={{
              position: "absolute", bottom: "9%", left: "-3%", zIndex: 6,
              background: "#fff", border: `1px solid ${t.border}`, borderLeft: `5px solid ${ACCENT.orange}`, borderRadius: "14px",
              padding: "12px 14px", whiteSpace: "nowrap", boxShadow: t.shadow3,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <div style={{ width: 28, height: 28, borderRadius: "8px", background: ACCENT_BG.orange, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle size={13} color={ACCENT.orange} />
                </div>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>تقرير الأداء</span>
              </div>
              <span style={{ fontSize: "0.6875rem", color: t.textSecondary, fontWeight: 500 }}>مُعتمد ومُرسل للأولياء</span>
            </div>

            <div style={{
              position: "absolute", top: "54%", right: "-1%", zIndex: 6,
              background: "#fff", border: `1px solid ${t.border}`, borderLeft: `5px solid ${ACCENT.teal}`, borderRadius: "14px",
              padding: "10px 16px", whiteSpace: "nowrap", boxShadow: t.shadow3,
            }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: ACCENT.teal, fontFamily: "'Cairo', sans-serif", lineHeight: 1 }}>92%</div>
              <div style={{ fontSize: "0.6875rem", color: t.textSecondary, marginTop: "3px", fontWeight: 500 }}>معدل النجاح الدراسي</div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div 
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
        style={{
          background: t.bgSurface,
          borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`,
          padding: "16px clamp(16px,4vw,48px)",
        }}
      >
        <span style={{
          fontSize: "0.6875rem", color: t.textDisabled, fontWeight: 600,
          letterSpacing: "0.09em", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>يثق بنا</span>
        <div className="hidden md:block" style={{ width: 1, height: 16, background: t.border, margin: "0 24px" }} />
        <div className="flex flex-wrap justify-center gap-6 md:gap-8" style={{ alignItems: "center" }}>
          {["أكاديمية التفوق", "مركز النجاح", "سنتر الرواد", "أكاديمية الفتح"].map(name => (
            <span key={name} style={{
              fontSize: "0.9rem", fontWeight: 700, color: t.textDisabled,
              opacity: 0.6, letterSpacing: "-0.01em",
            }}>{name}</span>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <section style={{ background: t.bgSecondary, padding: "96px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Badge variant="primary" size="md">لماذا درايَة؟</Badge>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: t.textPrimary, marginTop: "16px", marginBottom: "12px" }}>
              منظومة عمل متكاملة للمعلمين
            </h2>
            <p style={{ color: t.textSecondary, fontSize: "1rem", maxWidth: "460px", margin: "0 auto", lineHeight: 1.75 }}>
              مُصمَّم بالتعاون مع كبار المعلمين لتبسيط الأعباء الأكاديمية والسناتر.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.label}
                style={{
                  borderRadius: "20px",
                  border: `1px solid ${t.border}`,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <div style={{
                  height: "120px",
                  background: `linear-gradient(135deg, ${b.iconBg} 0%, ${b.iconBg} 60%, rgba(255,255,255,0.55) 100%)`,
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  padding: "0 20px 16px",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.11 }}>
                    <b.Icon size={110} color={b.iconColor} strokeWidth={0.8} />
                  </div>
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: "13px",
                    background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 16px ${b.iconColor}30`,
                    position: "relative", zIndex: 1,
                  }}>
                    <b.Icon size={20} color={b.iconColor} strokeWidth={1.75} />
                  </div>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: b.iconColor, opacity: 0.18 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                
                <div style={{ padding: "20px 20px 26px" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: t.textPrimary, marginBottom: "9px" }}>{b.label}</h3>
                  <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section id="features" style={{ background: t.bgSurface, padding: "96px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Badge variant="primary" size="md">المميزات</Badge>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: t.textPrimary, marginTop: "16px" }}>
              السيطرة الكاملة والشفافية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map(f => (
              <Card key={f.title} style={{ overflow: "hidden" }} interactive>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={f.photo} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(15,79,73,0.65) 100%)" }} />
                  <div style={{ position: "absolute", bottom: "12px", right: "14px" }}>
                    <Badge variant={f.tag === "الذكاء الاصطناعي" ? "ai" : "primary"} size="sm">{f.tag}</Badge>
                  </div>
                </div>
                <div style={{ padding: "22px 20px 24px" }}>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, marginBottom: "10px" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.7, marginBottom: "18px" }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {f.items.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: t.primary100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Check size={10} color={t.primary} />
                        </div>
                        <span style={{ fontSize: "0.8125rem", color: t.textPrimary }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Button variant="secondary" onClick={() => navigate("/signup")}>
              استكشف المزايا مجاناً
              <ArrowLeft size={15} style={{ marginRight: "6px" }} />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Module */}
      <section id="pricing" style={{ background: t.bgSecondary, padding: "96px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <Badge variant="primary" size="md">الخطط والأسعار</Badge>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: t.textPrimary, marginTop: "16px" }}>
              ادفع بقدر ما تحتاج
            </h2>
            <div style={{
              display: "inline-flex", alignItems: "center",
              background: t.bgSurface, border: `1px solid ${t.border}`,
              borderRadius: "999px", padding: "4px", marginTop: "24px"
            }}>
              {([["اشتراك شهري", false], ["اشتراك سنوي (توفير 20%)", true]] as [string, boolean][]).map(([label, val]) => (
                <button key={label} onClick={() => setBillingAnnual(val)} style={{
                  padding: "8px 20px", borderRadius: "999px", border: "none", cursor: "pointer",
                  background: billingAnnual === val ? t.primary : "transparent",
                  color: billingAnnual === val ? "#fff" : t.textSecondary,
                  fontSize: "0.875rem", fontWeight: 600, transition: "all 150ms",
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, planIdx) => {
              const isGradientBg = planIdx === 2; // "مؤسسات مخصص"
              const isLightFeatured = planIdx === 1; // "محترف"

              return (
                <Card
                  key={plan.name}
                  interactive
                  onClick={() => navigate(planIdx === 0 ? "/plans/basic" : planIdx === 1 ? "/plans/pro" : "/plans/enterprise")}
                  style={{
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background: isGradientBg ? `linear-gradient(135deg, ${t.primary900} 0%, ${t.primary} 100%)` : isLightFeatured ? "#F0FAF7" : t.bgSurface,
                    border: isGradientBg ? "none" : isLightFeatured ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
                    boxShadow: isLightFeatured ? t.shadow2 : isGradientBg ? t.shadow3 : t.shadow1,
                    color: isGradientBg ? "#fff" : "inherit"
                  }}
                >
                  {isLightFeatured && (
                    <div style={{
                      position: "absolute",
                      top: "-12px",
                      left: "20px",
                      background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                      color: "#fff",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "0.6875rem",
                      fontWeight: 900,
                      boxShadow: "0 10px 20px -5px rgba(239, 68, 68, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      zIndex: 10
                    }} className="animate-pulse-glow">
                      <Sparkles size={12} className="text-amber-200 animate-spin" style={{ animationDuration: "6s" }} />
                      <span>موصى به 🔥</span>
                    </div>
                  )}
                  {isGradientBg && (
                    <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                      <Badge variant="secondary" size="sm" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>مخصص</Badge>
                    </div>
                  )}
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: isGradientBg ? "#fff" : t.textPrimary, marginBottom: "8px" }}>{plan.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "2.25rem", fontWeight: 900, color: isGradientBg ? "#fff" : t.primary }}>
                      {billingAnnual ? plan.priceAnnual : plan.priceMonthly}
                    </span>
                    {plan.priceMonthly !== "مجاني" && plan.priceMonthly !== "مخصَّص" && (
                      <span style={{ fontSize: "0.875rem", color: isGradientBg ? "rgba(255,255,255,0.8)" : t.textSecondary }}>جنيه / شهر</span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: isGradientBg ? "rgba(255,255,255,0.8)" : t.textSecondary, marginBottom: "24px" }}>{plan.sub}</p>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px", flex: 1 }}>
                    {plan.feats.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle size={14} color={isGradientBg ? t.primary200 : t.primary} />
                        <span style={{ fontSize: "0.875rem", color: isGradientBg ? "#fff" : t.textPrimary }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Button
                      variant={isLightFeatured ? "primary" : "secondary"}
                      className="w-full cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/signup");
                      }}
                      style={isGradientBg ? { background: "#fff", color: t.primary, border: "none" } : undefined}
                    >
                      {plan.cta}
                    </Button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const targetPlan = planIdx === 0 ? "basic" : planIdx === 1 ? "pro" : "enterprise";
                        navigate(`/plans/${targetPlan}`);
                      }}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: isGradientBg ? "#fff" : t.primary, fontSize: "0.8125rem", fontWeight: 700,
                        textAlign: "center", paddingTop: "4px", textDecoration: "none",
                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px"
                      }}
                    >
                      استعرض تفاصيل ومميزات الباقة بالكامل ←
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: t.bgSurface, padding: "96px clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <Badge variant="primary" size="md">آراء عملائنا</Badge>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: t.textPrimary, marginTop: "16px" }}>
              يثق بنا مئات المعلمين
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, idx) => {
              const avatarUrls = [P.testimonial1, P.testimonial2, P.testimonial3];
              return (
                <Card key={tm.name} style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "0.9375rem", color: t.textSecondary, lineHeight: 1.8, flex: 1, marginBottom: "24px" }}>
                    "{tm.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", pt: "16px", borderTop: `1px solid ${t.border}` }}>
                    <Avatar name={tm.name} src={avatarUrls[idx]} size={40} />
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{tm.name}</div>
                      <div style={{ fontSize: "0.75rem", color: t.textDisabled, marginTop: "2px" }}>{tm.role} · {tm.center}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" style={{ background: "#fff", padding: "96px clamp(20px,5vw,48px)", borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ display: "inline-block", background: "#E6F3F0", color: "#0F4F49", padding: "6px 16px", borderRadius: "999px", fontSize: "0.875rem", fontWeight: 700, marginBottom: "16px" }}>
              الأسئلة الشائعة
            </div>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: t.textPrimary, letterSpacing: "-0.02em" }}>
              أسئلة يسألها المعلمون دائماً
            </h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderBottom: `1px solid ${t.border}`,
                    padding: "24px 0",
                    transition: "all 200ms"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "24px",
                      textAlign: "right",
                      padding: 0
                    }}
                  >
                    <span style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary }}>
                      {item.q}
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: isOpen ? t.primary : "#F0FAF7",
                        color: isOpen ? "#fff" : t.primary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 200ms",
                        flexShrink: 0
                      }}
                    >
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 250ms"
                        }}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        marginTop: "16px",
                        paddingLeft: "60px",
                        color: t.textSecondary,
                        fontSize: "0.9375rem",
                        lineHeight: 1.8,
                        textAlign: "right"
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ background: `linear-gradient(135deg, ${t.primary900} 0%, ${t.primary} 100%)`, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
            ابدأ رحلتك التعليمية الذكية اليوم
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", marginBottom: "36px" }}>
            انضم الآن مجاناً ووفّر وقتك الثمين مع منظومة درايَة بالذكاء الاصطناعي.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" style={{ background: "#fff", color: t.primary }} onClick={() => navigate("/signup")}>ابدأ مجاناً</Button>
            <Button variant="secondary" size="lg" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }} onClick={() => navigate("/login")}>تسجيل الدخول</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: t.primary900, color: "rgba(255,255,255,0.6)", padding: "48px 24px 24px", fontSize: "0.875rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", fontWeight: 800, fontSize: "1.25rem", marginBottom: "12px" }}>
                <GraduationCap size={24} />
                درايَة
              </div>
              <p style={{ maxWidth: "280px", lineHeight: 1.6 }}>أول منصة مصرية متكاملة لتقييم وتصحيح الامتحانات بالذكاء الاصطناعي.</p>
            </div>
            <div style={{ display: "flex", gap: "48px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ color: "#fff", fontWeight: 700, marginBottom: "8px" }}>المنصة</span>
                <a href="#hero" style={{ color: "inherit", textDecoration: "none" }}>الرئيسية</a>
                <a href="#features" style={{ color: "inherit", textDecoration: "none" }}>المميزات</a>
                <a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>الأسعار</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ color: "#fff", fontWeight: 700, marginBottom: "8px" }}>المطورون</span>
                <span style={{ opacity: 0.8 }}>فريق درايَة © 2026</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <span>جميع الحقوق محفوظة لمنصة درايَة.</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>صنع بحب في مصر <Heart size={12} color={ACCENT.coral} fill={ACCENT.coral} /></span>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default LandingPage;
