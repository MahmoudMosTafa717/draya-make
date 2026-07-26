import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { AlertCircle, Clock, CheckCircle, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
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
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);
  
  // Tab switching violations counter
  const [violations, setViolations] = React.useState(0);
  const [showViolationWarning, setShowViolationWarning] = React.useState(false);

  const mockQuestions: IQuestion[] = [
    {
      id: 1,
      text: "إذا كان ن ل ر = 120 ، فما هي قيم ن ، ر الممكنة؟",
      options: ["ن = 5 ، ر = 3", "ن = 6 ، ر = 3", "ن = 5 ، ر = 4", "ن = 6 ، ر = 2"]
    },
    {
      id: 2,
      text: "عدد طرق اختيار لجنة مكونة من 3 أشخاص من بين 8 أشخاص يساوي:",
      options: ["56 طريقة", "24 طريقة", "40 طريقة", "120 طريقة"]
    },
    {
      id: 3,
      text: "في مفكوك (س + أ) ^ ن ، يكون رتبة الحد الأوسط إذا كان ن زوجياً هي:",
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
            toast.error("تم إلغاء الامتحان تلقائياً", "لتكرار الخروج من شاشة الامتحان.");
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Top status bar */}
      <Card style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 800, color: t.textPrimary }}>امتحان الجبر والتباديل والتوافيق</h1>
          <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>مستوى الامتحان: الشهادة الثانوية</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: t.primary100, color: t.primary, padding: "8px 16px", borderRadius: "8px", fontWeight: 700 }}>
          <Clock size={16} />
          <span style={{ fontFamily: "monospace", fontSize: "1.125rem" }}>{formatTimer(timeLeft)}</span>
        </div>
      </Card>

      {/* Main Grid: Questions vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Questions area (75%) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Card style={{ padding: "32px", minHeight: "300px", display: "flex", flexDirection: "column", justifyBetween: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>
                  السؤال {currentIdx + 1} من {mockQuestions.length}
                </span>
                <Badge variant="primary">الجبر</Badge>
              </div>

              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary, marginBottom: "28px", lineHeight: 1.6 }}>
                {mockQuestions[currentIdx].text}
              </h2>

              {/* Options list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {mockQuestions[currentIdx].options.map((opt, optIdx) => {
                  const isSelected = answers[mockQuestions[currentIdx].id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      style={{
                        textAlign: "right", padding: "16px 20px", borderRadius: "10px",
                        border: isSelected ? `2.5px solid ${t.primary}` : `1.5px solid ${t.border}`,
                        background: isSelected ? t.primary50 : t.bgSurface,
                        color: t.textPrimary, fontSize: "0.9375rem", fontWeight: 600,
                        cursor: "pointer", transition: "all 120ms",
                        fontFamily: "inherit", display: "flex", alignItems: "center", gap: "12px"
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `1.5px solid ${isSelected ? t.primary : t.borderStrong}`,
                        background: isSelected ? t.primary : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stepper buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", borderTop: `1px solid ${t.border}`, paddingTop: "20px" }}>
              <Button
                variant="secondary"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
              >
                <ChevronRight size={18} />
                السابق
              </Button>

              {currentIdx === mockQuestions.length - 1 ? (
                <Button variant="primary" onClick={() => setShowSubmitModal(true)}>
                  تسليم الامتحان
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                >
                  التالي
                  <ChevronLeft size={18} />
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Question Navigator Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px" }}>قائمة الأسئلة</h3>
            
            {/* Grid bubbles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {mockQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = currentIdx === idx;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    style={{
                      aspectRatio: "1", borderRadius: "8px", border: "none", cursor: "pointer",
                      background: isCurrent ? t.primary : isAnswered ? t.primary100 : t.bgSecondary,
                      color: isCurrent ? "#fff" : isAnswered ? t.primary : t.textSecondary,
                      fontWeight: 700, fontSize: "0.875rem", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      boxShadow: isCurrent ? t.shadow2 : "none",
                      transition: "all 120ms"
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Secure lock warning */}
          <Card style={{ padding: "16px", background: "rgba(244, 63, 94, 0.04)", border: `1px solid ${t.error}` }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <ShieldAlert size={16} color={t.error} style={{ marginTop: "2px" }} />
              <span style={{ fontSize: "0.75rem", color: t.textSecondary, lineHeight: 1.5 }}>
                مراقبة أمنية: يرجى عدم مغادرة تبويب الصفحة أو الانتقال لشاشات أخرى لتجنب إلغاء الامتحان تلقائياً.
              </span>
            </div>
          </Card>
        </div>

      </div>

      {/* Confirm Submit Modal */}
      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="تسليم الإجابات وإنهاء الامتحان">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
            هل أنت متأكد من رغبتك في تسليم الامتحان؟ سيتم تصحيح إجاباتك فوراً وعرض تقرير التحليل المفصل بالذكاء الاصطناعي.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>متابعة الحل</Button>
            <Button variant="primary" onClick={submitAnswers}>تأكيد التسليم</Button>
          </div>
        </div>
      </Modal>

      {/* Warning Violation Modal */}
      <Modal isOpen={showViolationWarning} onClose={() => setShowViolationWarning(false)} title="تحذير أمني: الخروج من الشاشة">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.05)", borderRadius: "8px", border: `1px solid ${t.error}`, display: "flex", gap: "10px" }}>
            <AlertCircle size={20} color={t.error} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.5 }}>
              تنبيه: لقد قمت بمغادرة شاشة الامتحان (مخالفة رقم {violations} من أصل 3). مغادرة الشاشة مرة أخرى ستؤدي إلى <strong>إلغاء الامتحان تلقائياً ورصد درجة صفر</strong>.
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="primary" onClick={() => setShowViolationWarning(false)}>الرجوع للامتحان</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default TakeExamPage;
