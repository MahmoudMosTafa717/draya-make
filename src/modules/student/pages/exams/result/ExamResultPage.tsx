import * as React from "react";
import { useNavigate, useSearchParams, useParams } from "react-router";
import { Check, X, ArrowLeft, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const ExamResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const score = Number(searchParams.get("score") ?? "66"); // Defaults to 66% if not set

  const weakTopics = [
    { name: "التباديل وحساب المضاريب", accuracy: 33, reason: "أخطاء متكررة في فهم قيم ن الممكنة لمضروب العدد." },
    { name: "التوافيق وحل مسائل اللجان المشتركة", accuracy: 50, reason: "صعوبة في تحديد الفرق بين التباديل والتوافيق في سياق الاختيار العشوائي." },
  ];

  const questionsReview = [
    {
      q: "إذا كان ن ل ر = 120 ، فما هي قيم ن ، ر الممكنة؟",
      yourAns: "ن = 5 ، ر = 3",
      correctAns: "ن = 6 ، ر = 3",
      isCorrect: false,
    },
    {
      q: "عدد طرق اختيار لجنة مكونة من 3 أشخاص من بين 8 أشخاص يساوي:",
      yourAns: "56 طريقة",
      correctAns: "56 طريقة",
      isCorrect: true,
    },
    {
      q: "في مفكوك (س + أ) ^ ن ، يكون رتبة الحد الأوسط إذا كان ن زوجياً هي:",
      yourAns: "(ن / 2) + 1",
      correctAns: "(ن / 2) + 1",
      isCorrect: true,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Top Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary }}>تقرير تحليل نتيجة الامتحان بالـ AI</h1>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary }}>تفاصيل الدرجات ونقاط الضعف التي تحتاج إلى مراجعة وتطوير.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate("/student/exams")}>
          الرجوع لقائمة الامتحانات
        </Button>
      </div>

      {/* Grid: Grade KPI vs Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Grade Card */}
        <Card style={{ padding: "28px", textAlign: "center", display: "flex", flexDirection: "column", justifyBetween: "space-between", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>النتيجة التقديرية</span>
            <div style={{
              fontSize: "3.5rem", fontWeight: 900,
              color: score >= 80 ? t.success : score >= 50 ? t.warning : t.error,
              fontFamily: "'Cairo', sans-serif", margin: "16px 0", lineHeight: 1
            }}>
              {score}%
            </div>
            <Badge variant={score >= 80 ? "success" : score >= 50 ? "warning" : "error"}>
              {score >= 85 ? "ممتاز جداً" : score >= 65 ? "جيد جداً" : score >= 50 ? "مقبول" : "راسب - ضعيف جداً"}
            </Badge>
          </div>

          <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: "20px", fontSize: "0.8125rem", color: t.textSecondary }}>
            <span>تم تسليم الامتحان في 20 يوليو 2026</span>
          </div>
        </Card>

        {/* Weakness analysis (AI generated) */}
        <Card style={{ padding: "24px", md: "span 2", display: "flex", flexDirection: "column", gap: "16px" }} className="md:col-span-2">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Badge variant="ai" size="md">تقرير الذكاء الاصطناعي</Badge>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary }}>المواضيع والمهارات الأضعف</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {weakTopics.map((topic, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "8px", borderBottom: idx < weakTopics.length - 1 ? `1px solid ${t.border}` : "none", paddingBottom: idx < weakTopics.length - 1 ? "12px" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <span style={{ fontWeight: 700, color: t.textPrimary }}>{topic.name}</span>
                  <span style={{ color: t.error, fontWeight: 700 }}>دقة الحل: {topic.accuracy}%</span>
                </div>
                <ProgressBar value={topic.accuracy} color={t.error} />
                <p style={{ fontSize: "0.78rem", color: t.textSecondary, lineHeight: 1.5, margin: 0 }}>
                  💡 {topic.reason}
                </p>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => navigate("/student/my-packages")}
                  style={{ width: "fit-content", padding: 0, height: "24px", fontSize: "0.75rem", fontWeight: 700 }}
                >
                  افتح المحاضرة التأسيسية للمراجعة
                  <ArrowLeft size={12} style={{ marginRight: "4px" }} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Detailed questions review list */}
      <div>
        <SectionTitle>مراجعة الأسئلة والإجابات التفصيلية</SectionTitle>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {questionsReview.map((item, idx) => (
            <Card key={idx} style={{ padding: "20px", borderLeft: `4px solid ${item.isCorrect ? t.success : t.error}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>سؤال {idx + 1}</span>
                <Badge variant={item.isCorrect ? "success" : "error"}>
                  {item.isCorrect ? "إجابة صحيحة" : "إجابة خاطئة"}
                </Badge>
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px", lineHeight: 1.5 }}>
                {item.q}
              </h4>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.875rem" }}>
                <div style={{
                  padding: "8px 12px", borderRadius: "8px", background: item.isCorrect ? "rgba(34, 197, 94, 0.05)" : "rgba(239, 68, 68, 0.05)",
                  border: `1px solid ${item.isCorrect ? t.success : t.error}`, display: "flex", alignItems: "center", gap: "6px"
                }}>
                  <span style={{ color: t.textSecondary }}>إجابتك:</span>
                  <span style={{ fontWeight: 600, color: item.isCorrect ? t.success : t.error }}>{item.yourAns}</span>
                </div>

                {!item.isCorrect && (
                  <div style={{
                    padding: "8px 12px", borderRadius: "8px", background: "rgba(34, 197, 94, 0.05)",
                    border: `1px solid ${t.success}`, display: "flex", alignItems: "center", gap: "6px"
                  }}>
                    <span style={{ color: t.textSecondary }}>الإجابة الصحيحة:</span>
                    <span style={{ fontWeight: 600, color: t.success }}>{item.correctAns}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
export default ExamResultPage;
