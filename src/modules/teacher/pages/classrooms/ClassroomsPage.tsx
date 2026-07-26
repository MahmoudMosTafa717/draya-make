import * as React from "react";
import { useNavigate } from "react-router";
import { Plus, Users, Search, Filter, Archive, BookOpen, Trash2, ShieldAlert } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";
import CreateClassroomModal from "./CreateClassroomModal";

export const ClassroomsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");
  const [filterLevel, setFilterLevel] = React.useState<string>("all");
  
  // Archive/delete states
  const [actionClass, setActionClass] = React.useState<any | null>(null);
  const [showArchiveModal, setShowArchiveModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  // Mock classrooms
  const [classrooms, setClassrooms] = React.useState<any[]>([
    { id: "class_1", name: "مجموعة أ - رياضيات علمي رياضة", studyLevel: "secondary", packageName: "باقة الجبر وحساب المثلثات", studentCount: 48, archived: false },
    { id: "class_2", name: "مجموعة ب - فيزياء الصف الأول الثانوي", studyLevel: "secondary", packageName: "لم يتم التعيين بعد", studentCount: 32, archived: false },
    { id: "class_3", name: "مجموعة ج - علوم الصف الثالث الابتدائي", studyLevel: "primary", packageName: "باقة ميكانيكا الصف الثاني الثانوي", studentCount: 14, archived: false },
  ]);

  const handleCreateSuccess = (newClass: any) => {
    setClassrooms([newClass, ...classrooms]);
  };

  const handleArchive = () => {
    if (!actionClass) return;
    setClassrooms(classrooms.map(c => c.id === actionClass.id ? { ...c, archived: true } : c));
    toast.success("تم أرشفة المجموعة بنجاح", `تم نقل ${actionClass.name} إلى الأرشيف.`);
    setShowArchiveModal(false);
    setActionClass(null);
  };

  const handleDelete = () => {
    if (!actionClass) return;
    setClassrooms(classrooms.filter(c => c.id !== actionClass.id));
    toast.success("تم حذف المجموعة بنجاح");
    setShowDeleteModal(false);
    setActionClass(null);
  };

  const filtered = classrooms.filter(c => {
    if (c.archived) return false;
    const matchesSearch = c.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          c.packageName.toLowerCase().includes(searchVal.toLowerCase());
    const matchesLevel = filterLevel === "all" || c.studyLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const levelTranslate: Record<string, string> = {
    primary: "الابتدائية",
    preparatory: "الإعدادية",
    secondary: "الثانوية",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Header title */}
      <SectionTitle
        sub="إدارة وتعديل المجموعات الدراسية وربط الطلاب بالباقات وتعيين المواعيد."
        action={
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            إنشاء مجموعة جديدة
          </Button>
        }
      >
        المجموعات الدراسية (Classrooms)
      </SectionTitle>

      {/* Filter and search bar */}
      <Card style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <Input
            placeholder="بحث باسم المجموعة أو اسم الباقة..."
            value={searchVal}
            onChange={setSearchVal}
            icon={<Search size={16} />}
          />
        </div>
        
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>المرحلة:</span>
          <select
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
            style={{
              height: "42px", borderRadius: "8px",
              border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
              color: t.textPrimary, padding: "0 12px", fontSize: "0.875rem",
              fontFamily: "inherit", outline: "none", cursor: "pointer"
            }}
          >
            <option value="all">كل المراحل</option>
            <option value="primary">الابتدائية</option>
            <option value="preparatory">الإعدادية</option>
            <option value="secondary">الثانوية</option>
          </select>
        </div>
      </Card>

      {/* Roster classroom items list */}
      {filtered.length === 0 ? (
        <EmptyState
          title="لا توجد مجموعات دراسية مطابقة"
          description="جرّب تعديل خيارات البحث أو قم بإنشاء مجموعة دراسية جديدة للبدء."
          actionText="إنشاء مجموعة جديدة"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => (
            <Card
              key={c.id}
              interactive
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <Badge variant="primary">{levelTranslate[c.studyLevel]}</Badge>
                  <h3
                    onClick={() => navigate(`/teacher/classrooms/${c.id}`)}
                    style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginTop: "8px", cursor: "pointer" }}
                    className="hover:underline hover:text-teal-700"
                  >
                    {c.name}
                  </h3>
                </div>
                
                {/* Actions icons */}
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => { setActionClass(c); setShowArchiveModal(true); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: t.textSecondary, padding: "6px", borderRadius: "6px" }}
                    className="hover:bg-gray-100"
                    title="أرشفة"
                  >
                    <Archive size={15} />
                  </button>
                  <button
                    onClick={() => { setActionClass(c); setShowDeleteModal(true); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: t.error, padding: "6px", borderRadius: "6px" }}
                    className="hover:bg-red-50"
                    title="حذف"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: `1px solid ${t.border}`, paddingTop: "12px", fontSize: "0.8125rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: t.textSecondary }}>الباقة المرتبطة:</span>
                  <span style={{ fontWeight: 600, color: t.textPrimary }}>{c.packageName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: t.textSecondary }}>الطلاب المسجلين:</span>
                  <span style={{ fontWeight: 600, color: t.textPrimary, display: "flex", alignItems: "center", gap: "4px" }}>
                    <Users size={12} /> {c.studentCount} طالب
                  </span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => navigate(`/teacher/classrooms/${c.id}`)}
              >
                إدارة المجموعة
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateClassroomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Confirm Archive Modal */}
      <Modal isOpen={showArchiveModal} onClose={() => setShowArchiveModal(false)} title="تأكيد أرشفة المجموعة">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.5 }}>
            هل أنت متأكد من رغبتك في أرشفة <strong>{actionClass?.name}</strong>؟ سيتم إخفاء المجموعة من القائمة النشطة، ولكن سيتم الاحتفاظ بسجلات الطلاب وامتحاناتهم.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowArchiveModal(false)}>إلغاء</Button>
            <Button variant="primary" onClick={handleArchive}>نعم، أرشفة</Button>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="تأكيد حذف المجموعة">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.05)", borderRadius: "8px", border: `1px solid ${t.error}`, display: "flex", gap: "10px" }}>
            <ShieldAlert size={18} color={t.error} style={{ flexShrink: 0, marginTop: "2px" }} />
            <span style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.5 }}>
              تحذير: حذف المجموعة سيؤدي إلى إلغاء انتساب جميع الطلاب المسجلين بها وحذف جداول الامتحانات المرتبطة تماماً. لا يمكن التراجع عن هذا الإجراء.
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={handleDelete}>نعم، احذف نهائياً</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ClassroomsPage;
