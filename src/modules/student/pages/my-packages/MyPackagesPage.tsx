import * as React from "react";
import { useNavigate } from "react-router";
import { BookOpen, Users, Clock, ArrowLeft } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";

export const MyPackagesPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock student packages
  const packages = [
    { id: "pkg_1", name: "باقة الجبر وحساب المثلثات للشهادة الثانوية", teacher: "أ. أحمد السيد", subject: "الرياضيات", progress: 68, completed: 12, total: 18, classroomName: "مجموعة أ - علمي رياضة" },
    { id: "pkg_2", name: "باقة الكيمياء العضوية المتقدمة", teacher: "أ. أحمد سامي", subject: "الكيمياء", progress: 85, completed: 17, total: 20, classroomName: "مجموعة ج - مراجعة عامة" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="استعرض باقاتك الأكاديمية النشطة، وتابع المحاضرات والامتحانات المرفقة لكل مادة.">
        باقاتي الدراسية النشطة
      </SectionTitle>

      {packages.length === 0 ? (
        <EmptyState
          title="لست مشتركاً في أي باقة بعد"
          description="تصفح قائمة المعلمين المميزين واشترك في أول باقة تفعيل للبدء بالمذاكرة."
          actionText="تصفح المعلمين"
          onAction={() => navigate("/student/browse-teachers")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map(pkg => (
            <Card
              key={pkg.id}
              interactive
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Badge variant="primary">{pkg.subject}</Badge>
                  <Badge variant="success">نشط</Badge>
                </div>
                <h3
                  onClick={() => navigate(`/student/packages/${pkg.id}`)}
                  style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginTop: "8px", cursor: "pointer" }}
                  className="hover:underline hover:text-teal-700"
                >
                  {pkg.name}
                </h3>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary, display: "block", marginTop: "2px" }}>
                  المعلم: {pkg.teacher}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", borderTop: `1px solid ${t.border}`, paddingTop: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "4px" }}>
                  <span style={{ color: t.textSecondary, display: "flex", alignItems: "center", gap: "4px" }}>
                    <BookOpen size={12} /> التقدم الدراسي:
                  </span>
                  <span style={{ fontWeight: 600, color: t.textPrimary }}>
                    {pkg.completed} / {pkg.total} محاضرة ({pkg.progress}%)
                  </span>
                </div>
                <ProgressBar value={pkg.progress} />
              </div>

              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", background: t.bgSecondary, borderRadius: "8px", fontSize: "0.8125rem"
              }}>
                <span style={{ color: t.textSecondary, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Users size={12} /> المجموعة الدراسية:
                </span>
                <span style={{ fontWeight: 600, color: t.textPrimary }}>{pkg.classroomName}</span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => navigate(`/student/packages/${pkg.id}`)}
              >
                متابعة الدراسة والدروس
                <ArrowLeft size={14} style={{ marginRight: "4px" }} />
              </Button>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
export default MyPackagesPage;
