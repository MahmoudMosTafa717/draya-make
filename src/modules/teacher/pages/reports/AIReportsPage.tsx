import * as React from "react";
import { Sparkles, Send, FileText, CheckCircle, RefreshCw } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

export const AIReportsPage: React.FC = () => {
  const [reportType, setReportType] = React.useState<"course" | "student">("student");
  const [studentName, setStudentName] = React.useState("أحمد محمد علي");
  const [studentEmail, setStudentEmail] = React.useState("ahmed.ali@example.com");
  const [generating, setGenerating] = React.useState(false);
  const [generated, setGenerated] = React.useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("تم توليد تقرير الأداء بنجاح", "التقرير جاهز الآن للمراجعة والإرسال للأولياء.");
    }, 2000);
  };

  const handleSendReport = () => {
    toast.success("تم إرسال التقرير للأولياء", "تم إرسال نسخة عبر البريد الإلكتروني وواتساب ولي الأمر.");
    setGenerated(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      <SectionTitle sub="تقارير الذكاء الاصطناعي المفصلة حول تحصيل الطلاب، تتطلب مراجعتك وموافقتك قبل نشرها للأولياء.">
        تقارير الذكاء الاصطناعي للأولياء
      </SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Generate Report Form */}
        <Card style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={16} color={t.primary} /> توليد تقرير أداء جديد
          </h3>
          
          <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setReportType("student")}
                style={{
                  flex: 1, padding: "10px", borderRadius: "8px",
                  border: reportType === "student" ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
                  background: reportType === "student" ? t.primary50 : "transparent",
                  color: reportType === "student" ? t.primary : t.textSecondary,
                  fontWeight: reportType === "student" ? 700 : 400, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit"
                }}
              >
                تقرير طالب محدد
              </button>
              <button
                type="button"
                onClick={() => setReportType("course")}
                style={{
                  flex: 1, padding: "10px", borderRadius: "8px",
                  border: reportType === "course" ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
                  background: reportType === "course" ? t.primary50 : "transparent",
                  color: reportType === "course" ? t.primary : t.textSecondary,
                  fontWeight: reportType === "course" ? 700 : 400, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit"
                }}
              >
                تقرير عام لمجموعة
              </button>
            </div>

            <Input
              label={reportType === "student" ? "اسم الطالب" : "اسم المجموعة الدراسية"}
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              required
            />

            <Input
              label={reportType === "student" ? "البريد الإلكتروني للطالب / ولي الأمر" : "المادة الدراسية"}
              value={studentEmail}
              onChange={e => setStudentEmail(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" loading={generating} className="w-full">
              توليد التقرير بالذكاء الاصطناعي
            </Button>
          </form>
        </Card>

        {/* AI Report Output Preview */}
        <div>
          {generated ? (
            <Card style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", border: `1.5px solid ${t.primary}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Badge variant="ai">مسودة التقرير</Badge>
                <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>جاهز للمراجعة</span>
              </div>

              <div>
                <h4 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "8px" }}>
                  تقرير أداء الطالب: {studentName}
                </h4>
                <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
                  سجل الطالب معدل أداء متفوق بنسبة 87% في الباقة الدراسية الحالية. لديه التزام بنسبة 100% في حل الواجبات المنزلية، ولكنه يواجه صعوبة طفيفة في درس <strong>التباديل وحساب المضاريب</strong> حيث حصل على 60% في الامتحان التجريبي الأخير.
                </p>
                <div style={{ padding: "10px", background: "rgba(34, 197, 94, 0.05)", border: `1px solid ${t.success}`, borderRadius: "8px", marginTop: "12px", fontSize: "0.8125rem", color: t.textSecondary, display: "flex", gap: "8px", alignItems: "center" }}>
                  <CheckCircle size={14} color={t.success} />
                  <span>توصية AI: إعادة حل الواجبات التأسيسية للمراجعة.</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <Button variant="primary" className="flex-1" onClick={handleSendReport}>
                  <Send size={14} style={{ marginLeft: "4px" }} />
                  موافقة وإرسال التقرير
                </Button>
                <Button variant="secondary" onClick={() => setGenerated(false)}>
                  إعادة توليد
                </Button>
              </div>
            </Card>
          ) : (
            <Card style={{ padding: "40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justify: "center", height: "100%", gap: "12px" }}>
              <FileText size={40} color={t.textDisabled} />
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary }}>معاينة التقرير</h4>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary, maxWidth: "260px" }}>
                قم بملء البيانات بالجانب الأيمن وتوليد التقرير لمراجعته وإرساله لولي الأمر.
              </p>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
};
export default AIReportsPage;
