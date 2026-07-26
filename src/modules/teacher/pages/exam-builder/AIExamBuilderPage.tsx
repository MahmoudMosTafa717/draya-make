import * as React from "react";
import { Sparkles, Plus, Check, Trash2, ChevronDown, GripVertical, Send, CheckCircle, Loader } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

interface IQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
  difficulty: "سهل" | "متوسط" | "صعب";
}

export const AIExamBuilderPage: React.FC = () => {
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [generating, setGenerating] = React.useState(false);

  // Target filter chips
  const [yearChips, setYearChips] = React.useState(["الصف الثالث الثانوي"]);
  const [groupChips, setGroupChips] = React.useState(["مجموعة أ"]);
  const [lectureChips, setLectureChips] = React.useState(["المحاضرة 3: المثلثات"]);
  const [questionCount, setQuestionCount] = React.useState(20);
  const [addingFor, setAddingFor] = React.useState<"year" | "group" | "lecture" | null>(null);

  const yearOptions = ["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"];
  const groupOptions = ["مجموعة أ", "مجموعة ب", "مجموعة ج"];
  const lectureOptions = ["المحاضرة 1: مقدمة في الجبر", "المحاضرة 2: المعادلات التربيعية", "المحاضرة 3: المثلثات"];

  const selectedYear = yearChips[0] || "الصف الثالث الثانوي";
  const selectedGroup = groupChips[0] || "مجموعة أ";

  // MCQ Questions list
  const [questions, setQuestions] = React.useState<IQuestion[]>([
    { id: 1, text: "ما قيمة sin(30°)؟", options: ["0.5", "0.707", "0.866", "1"], correct: 0, difficulty: "سهل" },
    { id: 2, text: "في مثلث قائم، إذا كانت الزاوية أ = 45° وضلع المجاور = 5، ما طول الوتر؟", options: ["5√2", "5", "5/√2", "10"], correct: 0, difficulty: "متوسط" },
    { id: 3, text: "أي من التالي يساوي cos(90° - θ)؟", options: ["sinθ", "cosθ", "-sinθ", "tanθ"], correct: 0, difficulty: "متوسط" },
  ]);
  const [expandedQ, setExpandedQ] = React.useState<number | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setStep(2);
      toast.success("تم توليد الأسئلة بالذكاء الاصطناعي");
    }, 2000);
  };

  const handlePublish = () => {
    setStep(4);
    toast.success("تم إرسال وجدولة الامتحان بنجاح");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      <SectionTitle sub="استخرج الأسئلة تلقائياً من محتوى محاضراتك وملفات الشرح المفهرسة بالذكاء الاصطناعي.">
        منشئ الامتحانات بالذكاء الاصطناعي
      </SectionTitle>

      {/* Stepper bar progress */}
      <div style={{ display: "flex", gap: "8px", margin: "8px 0" }}>
        {[
          { num: 1, label: "الإعداد وتصفية المحتوى" },
          { num: 2, label: "مراجعة الأسئلة" },
          { num: 3, label: "إعدادات الأمان والتوزيع" }
        ].map(s => (
          <div
            key={s.num}
            style={{
              flex: 1, padding: "10px 14px", borderRadius: "8px",
              background: step === s.num ? t.primary50 : step > s.num ? "rgba(27, 109, 99, 0.05)" : t.bgSecondary,
              border: step === s.num ? `1.5px solid ${t.primary}` : `1px solid ${t.border}`,
              display: "flex", alignItems: "center", gap: "8px"
            }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: step >= s.num ? t.primary : t.borderStrong,
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 700
            }}>
              {step > s.num ? <Check size={12} /> : s.num}
            </div>
            <span style={{ fontSize: "0.8125rem", fontWeight: step === s.num ? 700 : 500, color: step >= s.num ? t.textPrimary : t.textSecondary }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: Filter setup */}
      {step === 1 && (
        <Card style={{ padding: "24px", maxWidth: "720px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary }}>عدد أسئلة الامتحان:</span>
            
            <div style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", border: `1.5px solid ${t.border}`, background: t.bgSurface }}>
              <button
                type="button"
                style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", color: t.textSecondary }}
                onClick={() => setQuestionCount(q => Math.max(5, q - 5))}
              >
                -
              </button>
              <span style={{ fontWeight: 800, fontSize: "0.9375rem", color: t.textPrimary, minWidth: "40px", textAlign: "center" }}>
                {questionCount}
              </span>
              <button
                type="button"
                style={{ width: 36, height: 36, border: "none", background: "transparent", cursor: "pointer", color: t.textSecondary }}
                onClick={() => setQuestionCount(q => Math.min(50, q + 5))}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: `1px solid ${t.border}`, paddingTop: "16px" }}>
            
            {/* Year filter chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textSecondary }}>السنة الدراسية المستهدفة:</span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                {yearChips.map(y => (
                  <Badge key={y} variant="primary" style={{ padding: "4px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    {y}
                    <button type="button" onClick={() => setYearChips([])} style={{ border: "none", background: "none", cursor: "pointer", color: t.primary, fontWeight: 700 }}>×</button>
                  </Badge>
                ))}
                {addingFor === "year" ? (
                  <select
                    autoFocus
                    onChange={e => { if (e.target.value) setYearChips([e.target.value]); setAddingFor(null); }}
                    onBlur={() => setAddingFor(null)}
                    style={{ height: "32px", borderRadius: "6px", border: `1.5px solid ${t.primary}`, padding: "0 8px", fontSize: "0.8125rem", outline: "none" }}
                  >
                    <option value="">اختر...</option>
                    {yearOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  yearChips.length === 0 && <Button variant="secondary" size="sm" onClick={() => setAddingFor("year")}>+ تحديد السنة</Button>
                )}
              </div>
            </div>

            {/* Group filter chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textSecondary }}>المجموعة الدراسية:</span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                {groupChips.map(g => (
                  <Badge key={g} variant="primary" style={{ padding: "4px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    {g}
                    <button type="button" onClick={() => setGroupChips([])} style={{ border: "none", background: "none", cursor: "pointer", color: t.primary, fontWeight: 700 }}>×</button>
                  </Badge>
                ))}
                {addingFor === "group" ? (
                  <select
                    autoFocus
                    onChange={e => { if (e.target.value) setGroupChips([e.target.value]); setAddingFor(null); }}
                    onBlur={() => setAddingFor(null)}
                    style={{ height: "32px", borderRadius: "6px", border: `1.5px solid ${t.primary}`, padding: "0 8px", fontSize: "0.8125rem", outline: "none" }}
                  >
                    <option value="">اختر...</option>
                    {groupOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  groupChips.length === 0 && <Button variant="secondary" size="sm" onClick={() => setAddingFor("group")}>+ تحديد المجموعة</Button>
                )}
              </div>
            </div>

            {/* Lecture filters source */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textSecondary }}>مصدر استخراج الأسئلة:</span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                {lectureChips.map(l => (
                  <Badge key={l} variant="primary" style={{ padding: "4px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    {l}
                    <button type="button" onClick={() => setLectureChips([])} style={{ border: "none", background: "none", cursor: "pointer", color: t.primary, fontWeight: 700 }}>×</button>
                  </Badge>
                ))}
                {addingFor === "lecture" ? (
                  <select
                    autoFocus
                    onChange={e => { if (e.target.value) setLectureChips([e.target.value]); setAddingFor(null); }}
                    onBlur={() => setAddingFor(null)}
                    style={{ height: "32px", borderRadius: "6px", border: `1.5px solid ${t.primary}`, padding: "0 8px", fontSize: "0.8125rem", outline: "none" }}
                  >
                    <option value="">اختر...</option>
                    {lectureOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  lectureChips.length === 0 && <Button variant="secondary" size="sm" onClick={() => setAddingFor("lecture")}>+ تحديد محاضرة</Button>
                )}
              </div>
            </div>

          </div>

          <Button variant="primary" className="w-full" onClick={handleGenerate} loading={generating} style={{ marginTop: "8px" }}>
            <Sparkles size={16} style={{ marginLeft: "6px" }} />
            {generating ? "يقرأ الذكاء الاصطناعي محتوى المحاضرة ويولد الأسئلة..." : "توليد الأسئلة بالذكاء الاصطناعي"}
          </Button>
        </Card>
      )}

      {/* STEP 2: Questions review */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary }}>مراجعة الأسئلة وتصحيحها</h3>
            <Button variant="secondary" size="sm" onClick={() => {
              const newQ: IQuestion = { id: Date.now(), text: "سؤال جديد مضاف يدوياً", options: ["خيار 1", "خيار 2", "خيار 3", "خيار 4"], correct: 0, difficulty: "متوسط" };
              setQuestions([...questions, newQ]);
            }}>
              + إضافة سؤال يدوي
            </Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {questions.map((q, idx) => {
              const isExpanded = expandedQ === idx;
              return (
                <Card key={q.id} style={{ padding: "16px", display: "flex", flexDirection: "column", gap: isExpanded ? "16px" : "0px" }}>
                  <div
                    onClick={() => setExpandedQ(isExpanded ? null : idx)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                  >
                    <GripVertical size={16} style={{ color: t.textDisabled, cursor: "grab" }} />
                    <span style={{ fontWeight: 700, color: t.textSecondary }}>س{idx + 1}</span>
                    <Badge variant={q.difficulty === "سهل" ? "success" : "warning"}>{q.difficulty}</Badge>
                    <span style={{ flex: 1, fontSize: "0.875rem", color: t.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.text}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setQuestions(questions.filter((_, qIdx) => qIdx !== idx)); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: t.error, padding: "4px" }}
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronDown size={16} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
                  </div>

                  {isExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: `1px solid ${t.border}`, paddingTop: "12px" }}>
                      <Input
                        label="نص السؤال"
                        value={q.text}
                        onChange={e => {
                          const updated = [...questions];
                          updated[idx].text = e.target.value;
                          setQuestions(updated);
                        }}
                      />
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>الخيارات المتاحة للحل:</span>
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <Input
                              value={opt}
                              onChange={e => {
                                const updated = [...questions];
                                updated[idx].options[oIdx] = e.target.value;
                                setQuestions(updated);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...questions];
                                updated[idx].correct = oIdx;
                                setQuestions(updated);
                              }}
                              style={{
                                padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                                background: q.correct === oIdx ? t.success : t.bgSecondary,
                                color: q.correct === oIdx ? "#fff" : t.textSecondary,
                                fontSize: "0.8125rem", fontWeight: 700
                              }}
                            >
                              {q.correct === oIdx ? "الإجابة الصحيحة" : "تحديد كإجابة صحيحة"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
            <Button variant="secondary" onClick={() => setStep(1)}>الرجوع لتعديل الإعداد</Button>
            <Button variant="primary" onClick={() => setStep(3)}>تأكيد الأسئلة ومتابعة التوزيع</Button>
          </div>
        </div>
      )}

      {/* STEP 3: Setup security details */}
      {step === 3 && (
        <Card style={{ padding: "28px", maxWidth: "640px" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: t.textPrimary, marginBottom: "20px" }}>توزيع الامتحان وإعدادات الأمان</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Input label="تاريخ بداية الامتحان" type="date" required />
              <Input label="تاريخ انتهاء الامتحان" type="date" required />
            </div>

            <Input label="مدة الحل (بالدقائق)" type="number" placeholder="45" required />

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>أمن الامتحان والمراقبة:</span>
              {[
                "تفعيل كاشف تبديل التبويبات والخروج من الشاشة",
                "منع النسخ واللصق والنقرات الخارجية",
                "توزيع الأسئلة بترتيب عشوائي لكل طالب"
              ].map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: t.primary }} />
                  {opt}
                </label>
              ))}
            </div>

            <div style={{ padding: "14px", background: t.primary50, borderRadius: "10px", border: `1px solid ${t.primary100}` }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.primary, display: "block", marginBottom: "4px" }}>ملخص التوزيع الأكاديمي</span>
              <span style={{ fontSize: "0.78rem", color: t.textSecondary }}>السنة: {selectedYear} · المجموعة: {selectedGroup} · إجمالي الأسئلة: {questions.length}</span>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <Button variant="secondary" onClick={() => setStep(2)}>السابق</Button>
              <Button variant="primary" style={{ flex: 1 }} onClick={handlePublish}>
                <Send size={14} style={{ marginLeft: "4px" }} />
                جدولة وتوزيع الامتحان فوراً
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 4: Success page */}
      {step === 4 && (
        <div style={{ textAlign: "center", padding: "64px 0", display: "flex", flexDirection: "column", alignItems: "center", justify: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(34, 197, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <CheckCircle size={40} color={t.success} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>تم توزيع وجدولة الامتحان بنجاح!</h2>
          <p style={{ color: t.textSecondary, marginBottom: "24px", maxWidth: "340px", lineHeight: 1.5 }}>
            تم إرسال إشعار فوري لطلاب مجموعة [{selectedGroup}] لفتح الامتحان في التاريخ المحدد.
          </p>
          <Button variant="primary" onClick={() => setStep(1)}>إنشاء امتحان آخر بالـ AI</Button>
        </div>
      )}

    </div>
  );
};
export default AIExamBuilderPage;
