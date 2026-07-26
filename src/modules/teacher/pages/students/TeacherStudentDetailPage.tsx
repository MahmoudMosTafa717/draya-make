import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowRight, BookOpen, AlertTriangle, MessageSquare, PhoneCall } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Avatar } from "@/shared/components/ui/Avatar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { toast } from "@/shared/components/ui/Toast";

export const TeacherStudentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock student details
  const student = {
    id: id || "std_1",
    name: "أحمد محمد علي",
    email: "ahmed.ali@example.com",
    parentMobile: "01012345678",
    class: "الثالث ث — أ",
    avg: 87,
    completedLessons: 12,
    totalLessons: 18,
    weakTopics: [
      { topic: "التباديل وحساب المضاريب", severity: 75 },
      { topic: "التوافيق وحل مسائل اللجان", severity: 40 }
    ],
    exams: [
      { title: "امتحان التباديل والتوافيق الأول", date: "2026-07-15", score: 84 },
      { title: "امتحان التفاضل وحساب النهايات", date: "2026-07-20", score: 90 }
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Back button */}
      <div>
        <Button variant="tertiary" size="sm" onClick={() => navigate("/teacher/students")} style={{ padding: 0 }}>
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          الرجوع لقائمة الطلاب
        </Button>
      </div>

      {/* Header Profile Card */}
      <Card style={{ padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <Avatar name={student.name} size={64} style={{ border: `3px solid ${t.primary100}` }} />
        
        <div style={{ flex: 1, minWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 800, color: t.textPrimary }}>{student.name}</h1>
            <Badge variant="primary">{student.class}</Badge>
          </div>
          <span style={{ fontSize: "0.875rem", color: t.textSecondary, display: "block", marginTop: "4px" }}>
            البريد الإلكتروني: {student.email}
          </span>
          <span style={{ fontSize: "0.875rem", color: t.textSecondary, display: "block", marginTop: "2px" }}>
            هاتف ولي الأمر: {student.parentMobile}
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="secondary" size="md" onClick={() => toast.success(`اتصال هاتفي بولي الأمر: ${student.parentMobile}`)}>
            <PhoneCall size={14} style={{ marginLeft: "4px" }} />
            اتصال بولي الأمر
          </Button>
          <Button variant="primary" size="md" onClick={() => toast.success(`فتح محادثة مراسلة الطالب`)}>
            <MessageSquare size={14} style={{ marginLeft: "4px" }} />
            مراسلة الطالب
          </Button>
        </div>
      </Card>

      {/* Statistics split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Performance Table & Details (60%) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SectionTitle>نتائج امتحانات الطالب الأخيرة</SectionTitle>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {student.exams.map((ex, idx) => (
              <Card key={idx} style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary }}>{ex.title}</h4>
                  <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>تاريخ تقديم الامتحان: {ex.date}</span>
                </div>
                <Badge variant={ex.score >= 80 ? "success" : ex.score >= 60 ? "warning" : "error"} size="md">
                  {ex.score}%
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: AI Weaknesses logs (40%) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={16} color={t.warning} /> تحليل الذكاء الاصطناعي لنقاط الضعف
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {student.weakTopics.map((w, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                    <span style={{ fontWeight: 600, color: t.textPrimary }}>{w.topic}</span>
                    <span style={{ color: w.severity > 60 ? t.error : t.warning, fontWeight: 700 }}>الخطورة: {w.severity}%</span>
                  </div>
                  <ProgressBar value={w.severity} color={w.severity > 60 ? t.error : t.warning} />
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <BookOpen size={16} /> التقدم الدراسي الإجمالي بالباقات
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "6px" }}>
              <span style={{ color: t.textSecondary }}>المحاضرات المكتملة:</span>
              <span style={{ fontWeight: 700, color: t.textPrimary }}>{student.completedLessons} / {student.totalLessons}</span>
            </div>
            <ProgressBar value={Math.round((student.completedLessons / student.totalLessons) * 100)} />
          </Card>
        </div>

      </div>

    </div>
  );
};
export default TeacherStudentDetailPage;
