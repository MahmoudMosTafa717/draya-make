import * as React from "react";
import { useNavigate } from "react-router";
import { BookOpen, Calendar, Clock, ArrowLeft } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";

export const ExamsListPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock list
  const exams = [
    { id: "e1", title: "امتحان الجبر والتباديل والتوافيق", teacherName: "أ. أحمد السيد", subject: "الرياضيات", duration: 45, status: "available" },
    { id: "e2", title: "مراجعة قوانين نيوتن والكهربية", teacherName: "أ. سارة حسن", subject: "الفيزياء", duration: 60, status: "scheduled", date: "الخميس القادم 11:00 ص" },
    { id: "e3", title: "امتحان الفصل الدراسي الأول التراكمي", teacherName: "أ. أحمد السيد", subject: "الرياضيات", duration: 90, status: "completed", score: 85 },
  ];

  const handleStartExam = (id: string) => {
    navigate(`/student/exams/${id}/take`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="استعرض الامتحانات والواجبات المحددة لك من قبل معلميك.">
        الامتحانات والواجبات المجدولة
      </SectionTitle>

      {exams.length === 0 ? (
        <EmptyState
          title="لا توجد امتحانات مسندة إليك"
          description="لم يقم أي معلم بجدولة امتحانات أو واجبات لك حالياً."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map(e => (
            <Card
              key={e.id}
              interactive
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Badge variant="primary">{e.subject}</Badge>
                  <Badge variant={e.status === "completed" ? "success" : e.status === "available" ? "warning" : "draft"}>
                    {e.status === "completed" ? "مكتمل" : e.status === "available" ? "متاح للحل" : "مجدول لاحقاً"}
                  </Badge>
                </div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginTop: "8px" }}>
                  {e.title}
                </h3>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary, display: "block", marginTop: "2px" }}>
                  المعلم: {e.teacherName}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: `1px solid ${t.border}`, paddingTop: "14px", fontSize: "0.8125rem", color: t.textSecondary }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>مدة الامتحان:</span>
                  <span style={{ fontWeight: 600, color: t.textPrimary }}>{e.duration} دقيقة</span>
                </div>
                {e.status === "scheduled" && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>موعد الفتح:</span>
                    <span style={{ fontWeight: 600, color: t.primary }}>{e.date}</span>
                  </div>
                )}
                {e.status === "completed" && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>الدرجة الحاصل عليها:</span>
                    <span style={{ fontWeight: 700, color: t.success }}>{e.score}%</span>
                  </div>
                )}
              </div>

              {e.status === "available" ? (
                <Button variant="primary" size="sm" className="w-full" onClick={() => handleStartExam(e.id)}>
                  بدء الامتحان الآن
                </Button>
              ) : e.status === "completed" ? (
                <Button variant="secondary" size="sm" className="w-full" onClick={() => navigate(`/student/exams/${e.id}/result?score=${e.score}`)}>
                  عرض تحليل النتيجة والتصحيح
                </Button>
              ) : (
                <Button variant="secondary" size="sm" className="w-full" disabled>
                  غير متاح بعد
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
export default ExamsListPage;
