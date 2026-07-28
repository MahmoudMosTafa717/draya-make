import * as React from "react";
import { useNavigate } from "react-router";
import {
  Plus, Users, Search, Edit2, Trash2, Layers,
  ShieldAlert, ChevronLeft, MoreVertical
} from "lucide-react";
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
  const [searchVal, setSearchVal] = React.useState("");
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  // Modals state: Create/Edit Classroom (reused)
  const [showStageModal, setShowStageModal] = React.useState(false);
  const [editStage, setEditStage] = React.useState<any | null>(null);
  const [editStageName, setEditStageName] = React.useState("");

  // Modal state: Delete Classroom
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [stageToDelete, setStageToDelete] = React.useState<any | null>(null);

  // Mock data: 3 Stage cards as requested
  const [stages, setStages] = React.useState<any[]>([
    {
      id: "stage-1",
      name: "الصف الأول الثانوي",
      levelBadge: "المرحلة الثانوية",
      groupsCount: 4,
      studentsCount: 142,
      description: "المناهج التأسيسية ومقدمات العلوم والرياضيات",
    },
    {
      id: "stage-2",
      name: "الصف الثاني الثانوي",
      levelBadge: "المرحلة الثانوية",
      groupsCount: 6,
      studentsCount: 215,
      description: "التخصص التمهيدي للشعب العلمية والأدبية",
    },
    {
      id: "stage-3",
      name: "الصف الثالث الثانوي",
      levelBadge: "المرحلة الثانوية",
      groupsCount: 8,
      studentsCount: 380,
      description: "المراجعات النهائية والامتحانات الشاملة للثانوية العامة",
    },
  ]);

  const filteredStages = stages.filter(s =>
    s.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    s.description.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleCreateOpen = () => {
    setEditStage(null);
    setEditStageName("");
    setShowStageModal(true);
  };

  const handleEditOpen = (stage: any) => {
    setEditStage(stage);
    setEditStageName(stage.name);
    setShowStageModal(true);
  };

  const handleStageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStageName.trim()) return;

    if (editStage) {
      // Edit existing classroom
      setStages(stages.map(s => s.id === editStage.id ? { ...s, name: editStageName.trim() } : s));
      toast.success("تم حفظ التعديلات بنجاح", `تم تغيير اسم المرحلة إلى ${editStageName.trim()}`);
    } else {
      // Create new classroom
      const newStage = {
        id: `stage-${Date.now()}`,
        name: editStageName.trim(),
        levelBadge: "المرحلة الثانوية",
        groupsCount: 0,
        studentsCount: 0,
        description: "مرحلة دراسية مضافة حديثاً إلى النظام",
      };
      setStages([newStage, ...stages]);
      toast.success("تم إنشاء المرحلة الدراسية بنجاح", `تم إضافة ${editStageName.trim()} إلى قائمة المراحل.`);
    }

    setShowStageModal(false);
    setEditStage(null);
  };

  const handleDeleteOpen = (stage: any) => {
    setStageToDelete(stage);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!stageToDelete) return;
    setStages(stages.filter(s => s.id !== stageToDelete.id));
    toast.success("تم حذف المرحلة الدراسية بنجاح");
    setShowDeleteModal(false);
    setStageToDelete(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Page Title & Action */}
      <SectionTitle
        sub="إدارة المراحل الدراسية ومتابعة المجموعات وإجمالي أعداد الطلبة المنضمين لكل مرحلة."
        action={
          <Button
            variant="primary"
            onClick={handleCreateOpen}
          >
            <Plus size={16} />
            إنشاء مرحلة دراسية جديدة
          </Button>
        }
      >
        الفصول الدراسية (Classrooms List)
      </SectionTitle>

      {/* Search Bar */}
      <Card style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Input
            placeholder="بحث باسم المرحلة الدراسية..."
            value={searchVal}
            onChange={setSearchVal}
            icon={<Search size={16} />}
          />
        </div>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textSecondary, whiteSpace: "nowrap", paddingLeft: "8px" }}>
          إجمالي المراحل: <strong style={{ color: t.textPrimary }}>{stages.length}</strong>
        </div>
      </Card>

      {/* Classroom Stage Cards Grid */}
      {filteredStages.length === 0 ? (
        <EmptyState
          title="لا توجد مراحل دراسية مطابقة"
          description="لم نتمكن من العثور على مرحلة دراسية تطابق بحثك الحالي."
          actionText="إعادة ضبط البحث"
          onAction={() => setSearchVal("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStages.map(stage => (
            <Card
              key={stage.id}
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                background: "#FFFFFF",
                borderRadius: "16px",
                border: `1px solid ${t.border}`,
                boxShadow: "none",
                transition: "all 200ms ease",
              }}
              className="hover:border-teal-700/30"
            >
              {/* Card Header: Stage Name & Badge + 3-Dots Menu */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", position: "relative" }}>
                <div>
                  <Badge variant="primary">{stage.levelBadge}</Badge>
                  <h3
                    onClick={() => navigate(`/teacher/classrooms/${stage.id}`)}
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: t.textPrimary,
                      marginTop: "6px",
                      lineHeight: 1.3,
                      cursor: "pointer",
                    }}
                    className="hover:text-teal-700 transition-colors"
                  >
                    {stage.name}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: t.textSecondary, marginTop: "4px", lineHeight: 1.5 }}>
                    {stage.description}
                  </p>
                </div>

                {/* 3-Dots Kebab Menu Button */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === stage.id ? null : stage.id);
                    }}
                    title="خيارات المرحلة"
                    aria-label="خيارات المرحلة"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      border: "none",
                      background: openMenuId === stage.id ? t.bgMuted : "transparent",
                      color: t.textSecondary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                    className="hover:bg-gray-100 hover:text-gray-900"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown Menu Popover */}
                  {openMenuId === stage.id && (
                    <>
                      {/* Backdrop to close menu when clicking outside */}
                      <div
                        style={{ position: "fixed", inset: 0, zIndex: 10 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          marginTop: "6px",
                          width: "165px",
                          background: "#FFFFFF",
                          borderRadius: "12px",
                          border: `1px solid ${t.border}`,
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
                          padding: "6px",
                          zIndex: 20,
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            handleEditOpen(stage);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "transparent",
                            color: t.textPrimary,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "right",
                            fontFamily: "inherit",
                          }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <Edit2 size={15} color={t.primary} />
                          <span>تعديل المرحلة</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            handleDeleteOpen(stage);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "transparent",
                            color: t.error,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "right",
                            fontFamily: "inherit",
                          }}
                          className="hover:bg-red-50/60 transition-colors"
                        >
                          <Trash2 size={15} />
                          <span>حذف المرحلة</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Card Stats: Groups count & Total students */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{
                background: t.bgMuted,
                borderRadius: "12px",
                padding: "14px 16px",
                border: `1px solid ${t.border}`,
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: t.textSecondary, fontSize: "0.75rem", fontWeight: 600 }}>
                    <Layers size={14} color={t.primary} />
                    <span>عدد المجموعات</span>
                  </div>
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: t.textPrimary }}>
                    {stage.groupsCount} <span style={{ fontSize: "0.75rem", fontWeight: 500, color: t.textSecondary }}>مجموعات</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px", borderRight: `1px solid ${t.border}`, paddingRight: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: t.textSecondary, fontSize: "0.75rem", fontWeight: 600 }}>
                    <Users size={14} color={t.primary} />
                    <span>إجمالي الطلبة</span>
                  </div>
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: t.textPrimary }}>
                    {stage.studentsCount} <span style={{ fontSize: "0.75rem", fontWeight: 500, color: t.textSecondary }}>طالب</span>
                  </div>
                </div>
              </div>

              {/* Action Bar (Modern 2026 UI: Single Full-Width Primary View Button) */}
              <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/teacher/classrooms/${stage.id}`)}
                  style={{ width: "100%", height: "36px", borderRadius: "8px", fontSize: "0.8125rem", fontWeight: 600 }}
                  className="transition-colors"
                >
                  <span>عرض المرحلة</span>
                  <ChevronLeft size={15} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Classroom Modal (Reused) */}
      <Modal 
        isOpen={showStageModal} 
        onClose={() => setShowStageModal(false)} 
        title={editStage ? "تعديل اسم المرحلة الدراسية" : "إنشاء مرحلة دراسية جديدة"} 
        size="sm"
      >
        <form onSubmit={handleStageSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="اسم المرحلة الدراسية"
            value={editStageName}
            onChange={setEditStageName}
            placeholder="مثال: الصف الأول الثانوي..."
            required
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button type="button" variant="secondary" size="md" onClick={() => setShowStageModal(false)}>
              إلغاء
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editStage ? "حفظ التعديلات" : "إنشاء المرحلة"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Stage Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="تأكيد حذف المرحلة الدراسية" size="md">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{
            padding: "14px",
            background: "rgba(239, 68, 68, 0.06)",
            borderRadius: "10px",
            border: `1px solid ${t.error}`,
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}>
            <ShieldAlert size={20} color={t.error} style={{ flexShrink: 0, marginTop: "2px" }} />
            <span style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
              هل أنت متأكد من حذف <strong>{stageToDelete?.name}</strong>؟ سيؤدي هذا الإجراء إلى إزالة المرحلة وجميع المجموعات المرتبطة بها من القائمة. لا يمكن التراجع عن هذا الإجراء.
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "4px" }}>
            <Button type="button" variant="secondary" size="md" onClick={() => setShowDeleteModal(false)}>
              إلغاء
            </Button>
            <Button type="button" variant="destructive" size="md" onClick={handleDeleteConfirm}>
              حذف المرحلة
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ClassroomsPage;
