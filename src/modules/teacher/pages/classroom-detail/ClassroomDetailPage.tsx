import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowRight, Users, Calendar, Clock, Trash2, ShieldX, UserMinus } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { DataTable, Column } from "@/shared/components/ui/DataTable";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";

interface IStudentRoster {
  id: string;
  name: string;
  email: string;
  performance: number;
  joinedDate: string;
}

export const ClassroomDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Modals controllers
  const [selectedStudent, setSelectedStudent] = React.useState<IStudentRoster | null>(null);
  const [showRemoveFromClassModal, setShowRemoveFromClassModal] = React.useState(false);
  const [showRevokePackageModal, setShowRevokePackageModal] = React.useState(false);

  // Mock classroom detail
  const classroomInfo = {
    id: id || "class_1",
    name: "مجموعة أ - رياضيات علمي رياضة",
    packageName: "باقة الجبر وحساب المثلثات",
    studyLevel: "secondary",
  };

  // Mock schedules
  const examSchedules = [
    { id: "e1", title: "اختبار مراجعة التباديل والتوافيق", date: "2026-07-28 10:00 ص", duration: 60 },
    { id: "e2", title: "امتحان نهاية الباب الأول", date: "2026-08-05 09:00 ص", duration: 90 },
  ];

  const videoSchedules = [
    { id: "v1", title: "شرح نظرية ذات الحدين - الجزء الأول", date: "2026-07-27 12:00 م" },
    { id: "v2", title: "حل تمارين ذات الحدين التراكمية", date: "2026-07-30 04:00 م" },
  ];

  // Mock students roster list
  const [students, setStudents] = React.useState<IStudentRoster[]>([
    { id: "std_1", name: "أحمد محمود علي", email: "ahmed.ali@example.com", performance: 84, joinedDate: "2026-05-12" },
    { id: "std_2", name: "سارة محمد أحمد", email: "sara.ahmed@example.com", performance: 92, joinedDate: "2026-05-15" },
    { id: "std_3", name: "محمود يوسف خالد", email: "mahmooud.youssef@example.com", performance: 48, joinedDate: "2026-06-01" },
    { id: "std_4", name: "رنا عبد الله عمر", email: "rana.omar@example.com", performance: 76, joinedDate: "2026-06-10" },
  ]);

  // Action handlers
  const handleRemoveFromClassroom = () => {
    if (!selectedStudent) return;
    setStudents(students.filter(s => s.id !== selectedStudent.id));
    toast.success("تم إلغاء انتساب الطالب", `تم إزالة ${selectedStudent.name} من المجموعة الدراسية بنجاح.`);
    setShowRemoveFromClassModal(false);
    setSelectedStudent(null);
  };

  const handleRevokePackageAccess = () => {
    if (!selectedStudent) return;
    toast.success("تم إلغاء تفعيل الباقة", `تم سحب صلاحيات الوصول لمحتوى باقة [${classroomInfo.packageName}] من الطالب.`);
    setShowRevokePackageModal(false);
    setSelectedStudent(null);
  };

  const studentColumns: Column<IStudentRoster>[] = [
    {
      header: "اسم الطالب",
      accessorKey: "name",
      cell: (item) => (
        <div>
          <span style={{ fontWeight: 600, color: t.textPrimary, display: "block" }}>{item.name}</span>
          <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>{item.email}</span>
        </div>
      ),
    },
    {
      header: "المعدل الدراسي",
      accessorKey: "performance",
      sortable: true,
      cell: (item) => (
        <Badge variant={item.performance >= 80 ? "success" : item.performance >= 60 ? "info" : "error"}>
          {item.performance}%
        </Badge>
      )
    },
    {
      header: "تاريخ الانضمام",
      accessorKey: "joinedDate",
    },
    {
      header: "إجراءات الطالب",
      accessorKey: "actions",
      cell: (item) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setSelectedStudent(item); setShowRemoveFromClassModal(true); }}
            style={{ padding: "0 10px" }}
            title="إلغاء انتساب للمجموعة"
          >
            <UserMinus size={14} style={{ marginLeft: "4px" }} />
            إزالة من المجموعة
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => { setSelectedStudent(item); setShowRevokePackageModal(true); }}
            style={{ color: t.error, padding: "0 10px" }}
            title="إلغاء تفعيل باقة المحتوى"
          >
            <ShieldX size={14} style={{ marginLeft: "4px" }} />
            إلغاء الباقة
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Back to classrooms button */}
      <div>
        <Button variant="tertiary" size="sm" onClick={() => navigate("/teacher/classrooms")} style={{ padding: 0 }}>
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          الرجوع لقائمة المجموعات
        </Button>
      </div>

      {/* Classroom stats summary */}
      <Card style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Badge variant="primary">المرحلة الثانوية</Badge>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginTop: "8px", marginBottom: "4px" }}>
            {classroomInfo.name}
          </h1>
          <span style={{ fontSize: "0.875rem", color: t.textSecondary }}>
            الباقة المرتبطة: <strong>{classroomInfo.packageName}</strong>
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>
              {students.length}
            </span>
            <span style={{ fontSize: "0.75rem", color: t.textSecondary, display: "block" }}>طالب مقيد</span>
          </div>
        </div>
      </Card>

      {/* Roster & schedule list splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Students Roster Table (60%) */}
        <div className="lg:col-span-2">
          <SectionTitle>قائمة طلاب المجموعة</SectionTitle>
          <DataTable
            columns={studentColumns}
            data={students}
            emptyTitle="لا يوجد طلاب مسجلين"
            emptyDescription="لا يوجد أي طلاب مسجلين حالياً في هذه المجموعة الدراسية."
          />
        </div>

        {/* Right: Release Schedules (40%) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Exam release schedule */}
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={16} /> امتحانات مجدولة للمجموعة
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {examSchedules.map(e => (
                <div key={e.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ width: 4, height: 36, borderRadius: "2px", background: t.primary }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{e.title}</div>
                    <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{e.date} · {e.duration} دقيقة</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="w-full" style={{ marginTop: "16px" }} onClick={() => navigate("/teacher/exam-builder")}>
              إضافة جدول امتحانات
            </Button>
          </Card>

          {/* Video release schedule */}
          <Card style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} /> مواعيد نشر المحاضرات والفيديوهات
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {videoSchedules.map(v => (
                <div key={v.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ width: 4, height: 36, borderRadius: "2px", background: t.ai }} />
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textPrimary }}>{v.title}</div>
                    <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>تاريخ النشر: {v.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="w-full" style={{ marginTop: "16px" }} onClick={() => navigate(`/teacher/packages`)}>
              تعديل جدول نشر الفيديوهات
            </Button>
          </Card>

        </div>

      </div>

      {/* Remove from Classroom Confirmation Modal */}
      <Modal isOpen={showRemoveFromClassModal} onClose={() => setShowRemoveFromClassModal(false)} title="تأكيد إزالة الطالب من المجموعة">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
            هل أنت متأكد من إلغاء انتساب الطالب <strong>{selectedStudent?.name}</strong> من هذه المجموعة الدراسية؟ 
            سيؤدي هذا إلى إزالته من جداول امتحانات المجموعة والمجموعات التفاعلية، <strong>لكن سيظل بإمكانه تصفح محتوى الباقة التعليمية</strong>.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowRemoveFromClassModal(false)}>إلغاء</Button>
            <Button variant="primary" onClick={handleRemoveFromClassroom}>تأكيد الإزالة</Button>
          </div>
        </div>
      </Modal>

      {/* Revoke Package Access Confirmation Modal */}
      <Modal isOpen={showRevokePackageModal} onClose={() => setShowRevokePackageModal(false)} title="تأكيد إلغاء تفعيل باقة الطالب">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
            هل أنت متأكد من سحب تفعيل باقة <strong>[{classroomInfo.packageName}]</strong> من الطالب <strong>{selectedStudent?.name}</strong>؟
            سيؤدي هذا الإجراء إلى <strong>حظر وصول الطالب للمحاضرات والفيديوهات وملفات الـ PDF والواجبات</strong> المرتبطة بهذه الباقة فوراً.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowRevokePackageModal(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={handleRevokePackageAccess}>إلغاء تفعيل الباقة</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ClassroomDetailPage;
