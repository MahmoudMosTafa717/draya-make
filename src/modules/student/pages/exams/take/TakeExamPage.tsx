import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle, Clock, CheckCircle, ChevronLeft, ChevronRight, ShieldAlert,
  HelpCircle, Check, Flag, Sparkles, AlertTriangle, ShieldCheck
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";

interface IQuestion {
  id: number;
  text: string;
  options: string[];
}

export const TakeExamPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Modals & Timers states
  const [timeLeft, setTimeLeft] = React.useState(2700); // 45 minutes in seconds
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [flagged, setFlagged] = React.useState<Record<number, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);
  
  // Tab switching violations counter
  const [violations, setViolations] = React.useState(0);
  const [showViolationWarning, setShowViolationWarning] = React.useState(false);

  const mockQuestions: IQuestion[] = [
    {
      id: 1,
      text: "إذا كان ن ل ر = 120 ، فما هي قيم ن ، ر الممكنة لحل هذه المعادلة التباديلية؟",
      options: ["ن = 5 ، ر = 3", "ن = 6 ، ر = 3", "ن = 5 ، ر = 4", "ن = 6 ، ر = 2"]
    },
    {
      id: 2,
      text: "عدد طرق اختيار لجنة مكونة من 3 أشخاص من بين 8 أشخاص دون مراعاة للترتيب يساوي:",
      options: ["56 طريقة", "24 طريقة", "40 طريقة", "120 طريقة"]
    },
    {
      id: 3,
      text: "في مفكوك ذات الحدين (س + أ) ^ ن ، يكون رتبة الحد الأوسط إذا كان الأس (ن) زوجياً هي:",
      options: ["(ن / 2) + 1", "ن / 2", "(ن + 1) / 2", "ن + 1"]
    },
  ];

  // Timer logic
  React.useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Tab switching warning check
  React.useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setViolations(prev => {
          const next = prev + 1;
          if (next >= 3) {
            toast.error("تم إلغاء الامتحان تلقائياً", "لتكرار الخروج من شاشة الامتحان التفاعلي.");
            navigate(`/student/exams/${id || "e1"}/result?score=0`);
          } else {
            setShowViolationWarning(true);
          }
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [id, navigate]);

  const handleAutoSubmit = () => {
    toast.error("انتهى وقت الامتحان!", "يتم تسليم إجاباتك تلقائياً الآن.");
    submitAnswers();
  };

  const handleSelectOption = (optIdx: number) => {
    setAnswers({ ...answers, [mockQuestions[currentIdx].id]: optIdx });
  };

  const toggleFlag = (qId: number) => {
    setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const submitAnswers = () => {
    setShowSubmitModal(false);
    
    // Simple mock grading
    let correct = 0;
    const key = [1, 0, 0]; // Index of correct option answers
    mockQuestions.forEach((q, idx) => {
      if (answers[q.id] === key[idx]) correct++;
    });
    
    const finalScore = Math.round((correct / mockQuestions.length) * 100);
    toast.success("تم تسليم الامتحان بنجاح");
    navigate(`/student/exams/${id || "e1"}/result?score=${finalScore}`);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const isTimeLow = timeLeft < 300; // Under 5 mins

  return (
    <div className="flex flex-col gap-6 relative overflow-hidden" style={{ direction: "rtl" }}>
      {/* Background Blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/15 to-sky-300/10 blur-3xl animate-float-blob pointer-events-none z-0" />

      {/* Top Cockpit Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-5 bg-white border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 z-10"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-teal-50 text-[#0F4F49]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
              امتحان الجبر والتباديل والتوافيق — 2026
            </h1>
            <span className="text-xs font-semibold text-slate-400">
              المستوى: الثانوية العامة · بيئة اختبار مؤمنة
            </span>
          </div>
        </div>

        {/* Live Countdown Timer Widget */}
        <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl font-extrabold text-sm border shadow-sm ${
          isTimeLow
            ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse"
            : "bg-teal-50 border-teal-200/80 text-[#0F4F49]"
        }`}>
          <Clock size={18} className={isTimeLow ? "animate-spin" : ""} />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium opacity-80">الوقت المتبقي:</span>
            <span className="font-mono text-base font-black tracking-wider">{formatTimer(timeLeft)}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content: Question Card vs Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        
        {/* Left Column: Questions area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl p-6 md:p-8 bg-white border border-slate-100 shadow-xl flex flex-col justify-between min-h-[420px]"
            >
              <div>
                {/* Question Header Status */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-500">
                    السؤال {currentIdx + 1} من {mockQuestions.length}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFlag(mockQuestions[currentIdx].id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        flagged[mockQuestions[currentIdx].id]
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Flag size={13} className={flagged[mockQuestions[currentIdx].id] ? "fill-amber-600" : ""} />
                      <span>{flagged[mockQuestions[currentIdx].id] ? "مستبعد للمراجعة" : "تعليم السؤال"}</span>
                    </button>

                    <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-700 text-xs font-extrabold border border-teal-200/60">
                      الجبر
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-relaxed mb-6 font-sans">
                  {mockQuestions[currentIdx].text}
                </h2>

                {/* Options List */}
                <div className="flex flex-col gap-3">
                  {mockQuestions[currentIdx].options.map((opt, optIdx) => {
                    const isSelected = answers[mockQuestions[currentIdx].id] === optIdx;
                    return (
                      <motion.button
                        key={optIdx}
                        type="button"
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.99.toString() as any }}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-right p-4 rounded-2xl text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                          isSelected
                            ? "bg-teal-50/80 border-2 border-[#0F4F49] text-[#0F4F49] shadow-md"
                            : "bg-slate-50/60 border border-slate-200 text-slate-800 hover:bg-slate-100/80 hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-[#0F4F49] bg-[#0F4F49] text-white"
                            : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className="flex-1">{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Stepper Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  className="rounded-xl font-extrabold text-xs cursor-pointer"
                >
                  <ChevronRight size={16} />
                  <span>السؤال السابق</span>
                </Button>

                {currentIdx === mockQuestions.length - 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowSubmitModal(true)}
                    className="rounded-xl font-extrabold text-xs shadow-md bg-[#0F4F49] cursor-pointer"
                  >
                    تسليم الامتحان النهائي
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="rounded-xl font-extrabold text-xs cursor-pointer"
                  >
                    <span>السؤال التالي</span>
                    <ChevronLeft size={16} />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Question Navigator Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="rounded-3xl p-6 bg-white border border-slate-100 shadow-xl">
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              <span>خريطة الأسئلة والإجابات</span>
            </h3>
            
            {/* Grid bubbles */}
            <div className="grid grid-cols-4 gap-2.5">
              {mockQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = currentIdx === idx;
                const isFlagged = flagged[q.id];
                
                return (
                  <motion.button
                    key={q.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentIdx(idx)}
                    className={`aspect-square rounded-2xl font-black text-sm transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                      isCurrent
                        ? "bg-[#0F4F49] text-white shadow-lg ring-4 ring-teal-500/20"
                        : isAnswered
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mt-6 pt-4 border-t border-slate-100">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0F4F49]" /> السؤال الحالي</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> تمت الإجابة</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> مؤشر للمراجعة</span>
            </div>
          </div>

          {/* Secure Lock Security Card */}
          <div className="rounded-3xl p-5 bg-rose-500/5 border border-rose-200 shadow-sm flex items-start gap-3">
            <ShieldAlert size={20} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-900 leading-relaxed font-medium">
              <strong className="font-extrabold block mb-0.5">مراقبة أمنية مشددة:</strong>
              يرجى عدم مغادرة تبويب الصفحة أو الانتقال لشاشات أخرى لتجنب إلغاء الامتحان تلقائياً ورصد درجة صفر.
            </div>
          </div>
        </div>

      </div>

      {/* Confirm Submit Modal */}
      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="تسليم الإجابات وإنهاء الامتحان">
        <div className="flex flex-col gap-4 text-right">
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            هل أنت متأكد من رغبتك في تسليم الامتحان؟ سيتم تصحيح إجاباتك فوراً وعرض تقرير التحليل المفصل بالذكاء الاصطناعي.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowSubmitModal(false)} className="rounded-xl text-xs font-bold">متابعة الحل</Button>
            <Button variant="primary" onClick={submitAnswers} className="rounded-xl text-xs font-bold bg-[#0F4F49]">تأكيد التسليم</Button>
          </div>
        </div>
      </Modal>

      {/* Warning Violation Modal */}
      <Modal isOpen={showViolationWarning} onClose={() => setShowViolationWarning(false)} title="تحذير أمني: الخروج من الشاشة">
        <div className="flex flex-col gap-4 text-right">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-3 text-xs text-rose-800 leading-relaxed">
            <AlertCircle size={20} className="text-rose-600 shrink-0 mt-0.5" />
            <span>
              تنبيه: لقد قمت بمغادرة شاشة الامتحان (مخالفة رقم {violations} من أصل 3). مغادرة الشاشة مرة أخرى ستؤدي إلى <strong>إلغاء الامتحان تلقائياً ورصد درجة صفر</strong>.
            </span>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setShowViolationWarning(false)} className="rounded-xl text-xs font-bold bg-[#0F4F49]">الرجوع للامتحان</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default TakeExamPage;
