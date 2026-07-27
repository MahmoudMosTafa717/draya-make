import * as React from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowRight, Users, Calendar, Clock, Trash2, Edit2, Plus,
  Phone, User, Eye, BookOpen, Layers, CheckCircle2, AlertCircle
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { DataTable, Column } from "@/shared/components/ui/DataTable";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { Modal } from "@/shared/components/ui/Modal";
import { Input } from "@/shared/components/ui/Input";
import { toast } from "@/shared/components/ui/Toast";

interface IStudentRoster {
  id: string;
  name: string;
  phone: string;
  parentPhone?: string;
  subscriptions: string[];
  status: "active" | "pending" | "inactive";
  joinedDate: string;
}

export const GroupDetailPage: React.FC = () => {
  const { id, groupId } = useParams();
  const navigate = useNavigate();

  // Stage mapping
  const stageNames: Record<string, string> = {
    stage_1: "الصف الأول الثانوي",
    stage_2: "الصف الثاني الثانوي",
    stage_3: "الصف الثالث الثانوي",
  };
  const currentStageName = stageNames[id || "stage_3"] || "الصف الثالث الثانوي";

  // State: Section 1 - Basic Information
  const [groupName, setGroupName] = React.useState("المجموعة أ - رياضيات علمي رياضة");
  const [examSchedule, setExamSchedule] = React.useState("الأحد 15 أغسطس 2026 · 10:00 ص");
  const [videoSchedule, setVideoSchedule] = React.useState("الإثنين 16 أغسطس 2026 · 12:00 م");

  // State: Section 2 - Students Roster Table (5 mock students)
  const [students, setStudents] = React.useState<IStudentRoster[]>([
    {
      id: "std_1",
      name: "أحمد محمود علي",
      phone: "01012345678",
      parentPhone: "01098765432",
      subscriptions: ["باقة الجبر وحساب المثلثات", "باقة التفاضل والتكامل"],
      status: "active",
      joinedDate: "2026-05-12",
    },
    {
      id: "std_2",
      name: "سارة محمد أحمد",
      phone: "01123456789",
      parentPhone: "01187654321",
      subscriptions: ["باقة الجبر وحساب المثلثات"],
      status: "active",
      joinedDate: "2026-05-15",
    },
    {
      id: "std_3",
      name: "محمود يوسف خالد",
      phone: "01234567890",
      parentPhone: "01298765432",
      subscriptions: ["باقة الجبر وحساب المثلثات"],
      status: "pending",
      joinedDate: "2026-06-01",
    },
    {
      id: "std_4",
      name: "رنا عبد الله عمر",
      phone: "01512345678",
      parentPhone: "01598765432",
      subscriptions: ["باقة التفاضل والتكامل", "باقة الهندسة الفراغية"],
      status: "active",
      joinedDate: "2026-06-10",
    },
    {
      id: "std_5",
      name: "كريم مصطفى حسن",
      phone: "01055556666",
      parentPhone: undefined, // No parent phone
      subscriptions: ["باقة الجبر وحساب المثلثات"],
      status: "inactive",
      joinedDate: "2026-06-15",
    },
  ]);

  // Modals state
  const [selectedStudent, setSelectedStudent] = React.useState<IStudentRoster | null>(null);
  const [showViewStudentModal, setShowViewStudentModal] = React.useState(false);
  const [showRemoveModal, setShowRemoveModal] = React.useState(false);

  // Section 3 Action Bar Modals State
  const [showAddStudentModal, setShowAddStudentModal] = React.useState(false);
  const [newStudentName, setNewStudentName] = React.useState("");
  const [newStudentPhone, setNewStudentPhone] = React.useState("");
  const [newStudentParentPhone, setNewStudentParentPhone] = React.useState("");
  const [newStudentStatus, setNewStudentStatus] = React.useState<"active" | "pending" | "inactive">("active");

  const [showEditGroupModal, setShowEditGroupModal] = React.useState(false);
  const [editGroupNameInput, setEditGroupNameInput] = React.useState(groupName);

  const [showEditExamModal, setShowEditExamModal] = React.useState(false);
  const [editExamInput, setEditExamInput] = React.useState(examSchedule);

  const [showEditVideoModal, setShowEditVideoModal] = React.useState(false);
  const [editVideoInput, setEditVideoInput] = React.useState(videoSchedule);

  // Handlers
  const handleRemoveStudent = () => {
    if (!selectedStudent) return;
    setStudents(students.filter(s => s.id !== selectedStudent.id));
    toast.success("تم إزالة الطالب بنجاح", `تم إزالة ${selectedStudent.name} من المجموعة.`);
    setShowRemoveModal(false);
    setSelectedStudent(null);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentPhone) {
      toast.error("بيانات غير مكتملة", "يرجى إدخال اسم الطالب ورقم هاتفه.");
      return;
    }
    const newStudent: IStudentRoster = {
      id: `std_${Date.now()}`,
      name: newStudentName,
      phone: newStudentPhone,
      parentPhone: newStudentParentPhone || undefined,
      subscriptions: ["باقة الجبر وحساب المثلثات"],
      status: newStudentStatus,
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setStudents([newStudent, ...students]);
    toast.success("تم إضافة الطالب بنجاح", `تم إضافة ${newStudentName} إلى قائمة طلاب المجموعة.`);
    setShowAddStudentModal(false);
    setNewStudentName("");
    setNewStudentPhone("");
    setNewStudentParentPhone("");
  };

  const handleUpdateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGroupNameInput.trim()) return;
    setGroupName(editGroupNameInput.trim());
    toast.success("تم تحديث بيانات المجموعة", "تم حفظ اسم المجموعة الجديد بنجاح.");
    setShowEditGroupModal(false);
  };

  const handleUpdateExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editExamInput.trim()) return;
    setExamSchedule(editExamInput.trim());
    toast.success("تم تحديث ميعاد الامتحان", "تم تغيير ميعاد الامتحان المجدول للمجموعة بنجاح.");
    setShowEditExamModal(false);
  };

  const handleUpdateVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editVideoInput.trim()) return;
    setVideoSchedule(editVideoInput.trim());
    toast.success("تم تحديث ميعاد الفيديو", "تم تغيير ميعاد نزول الفيديو القادم للمجموعة بنجاح.");
    setShowEditVideoModal(false);
  };

  // Section 2: Table Columns
  const studentColumns: Column<IStudentRoster>[] = [
    {
      header: "اسم الطالب",
      accessorKey: "name",
      sortable: true,
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: "rgba(13, 148, 136, 0.1)",
            color: t.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.9375rem",
            flexShrink: 0,
          }}>
            {item.name.charAt(0)}
          </div>
          <div>
            <span style={{ fontWeight: 800, color: t.textPrimary, display: "block", fontSize: "0.9375rem" }}>{item.name}</span>
            <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>انضم في: {item.joinedDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: "رقم الهاتف",
      accessorKey: "phone",
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, whiteSpace: "nowrap", direction: "ltr" }}>
          <Phone size={14} color={t.textSecondary} style={{ flexShrink: 0 }} />
          <span>{item.phone}</span>
        </div>
      ),
    },
    {
      header: "هاتف ولي الأمر",
      accessorKey: "parentPhone",
      cell: (item) => (
        item.parentPhone ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", fontSize: "0.875rem", fontWeight: 600, color: t.textSecondary, whiteSpace: "nowrap", direction: "ltr" }}>
            <Phone size={13} color={t.primary} style={{ flexShrink: 0 }} />
            <span>{item.parentPhone}</span>
          </div>
        ) : (
          <span style={{ fontSize: "0.8125rem", color: t.textDisabled, fontStyle: "italic" }}>غير مسجل</span>
        )
      ),
    },
    {
      header: "الاشتراكات المرتبطة",
      accessorKey: "subscriptions",
      cell: (item) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {item.subscriptions.map((sub, idx) => (
            <Badge key={idx} variant="secondary" style={{ fontSize: "0.75rem", background: "rgba(59, 130, 246, 0.08)", color: "#2563EB", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
              {sub}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "الحالة",
      accessorKey: "status",
      sortable: true,
      cell: (item) => {
        if (item.status === "active") {
          return <Badge variant="success">نشط</Badge>;
        }
        if (item.status === "pending") {
          return <Badge variant="warning">معلق</Badge>;
        }
        return <Badge variant="error">غير نشط</Badge>;
      },
    },
    {
      header: "الإجراءات",
      accessorKey: "actions",
      cell: (item) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setSelectedStudent(item); setShowViewStudentModal(true); }}
            style={{ padding: "0 10px", height: "32px", fontSize: "0.8125rem" }}
            title="عرض ملف الطالب"
          >
            <Eye size={14} style={{ marginLeft: "4px" }} />
            <span>عرض</span>
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => { setSelectedStudent(item); setShowRemoveModal(true); }}
            style={{ color: t.error, padding: "0 10px", height: "32px", fontSize: "0.8125rem" }}
            className="hover:bg-red-50"
            title="إزالة الطالب من المجموعة"
          >
            <Trash2 size={14} style={{ marginLeft: "4px" }} />
            <span>إزالة</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "40px" }}>

      {/* Top Header & Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => navigate(`/teacher/classrooms/${id || "stage_3"}`)}
            style={{ padding: "0", marginBottom: "8px", color: t.textSecondary, fontWeight: 700 }}
          >
            <ArrowRight size={16} style={{ marginLeft: "6px" }} />
            <span>الرجوع إلى قائمة مجموعات المرحلة</span>
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: t.textPrimary, margin: 0 }}>
              تفاصيل المجموعة الدراسية
            </h1>
            <Badge variant="primary" style={{ fontSize: "0.8125rem", padding: "4px 10px" }}>{currentStageName}</Badge>
          </div>
        </div>
      </div>

      {/* Section 3 — Actions Bar (Interactive Toolbar) */}
      <Card style={{
        padding: "16px 20px",
        background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderRadius: "14px",
        border: `1px solid ${t.border}`,
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "0.9375rem", color: t.textPrimary }}>
          <Layers size={18} color={t.primary} />
          <span>إدارة وإجراءات المجموعة المباشرة</span>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddStudentModal(true)}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", fontWeight: 700, fontSize: "0.8125rem" }}
            className="transition-colors"
          >
            <Plus size={16} style={{ marginLeft: "6px" }} />
            <span>إضافة طالب</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setEditGroupNameInput(groupName); setShowEditGroupModal(true); }}
            style={{ height: "38px", padding: "0 14px", borderRadius: "8px", fontWeight: 700, fontSize: "0.8125rem" }}
          >
            <Edit2 size={15} style={{ marginLeft: "6px" }} color={t.primary} />
            <span>تعديل بيانات المجموعة</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setEditExamInput(examSchedule); setShowEditExamModal(true); }}
            style={{ height: "38px", padding: "0 14px", borderRadius: "8px", fontWeight: 700, fontSize: "0.8125rem" }}
          >
            <Calendar size={15} style={{ marginLeft: "6px" }} color={t.primary} />
            <span>تغيير ميعاد الامتحان</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setEditVideoInput(videoSchedule); setShowEditVideoModal(true); }}
            style={{ height: "38px", padding: "0 14px", borderRadius: "8px", fontWeight: 700, fontSize: "0.8125rem" }}
          >
            <Clock size={15} style={{ marginLeft: "6px" }} color="#2563EB" />
            <span>تغيير ميعاد الفيديو</span>
          </Button>
        </div>
      </Card>

      {/* Section 1 — Basic Information Info Panel */}
      <Card style={{
        padding: "24px",
        borderRadius: "16px",
        border: `1px solid ${t.border}`,
        background: "#FFFFFF",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        {/* Panel Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", borderBottom: `1px solid ${t.border}`, paddingBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: t.textSecondary, marginBottom: "4px" }}>البيانات الأساسية للمجموعة</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: t.textPrimary, margin: 0, lineHeight: 1.3 }}>
              {groupName}
            </h2>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge variant="primary" style={{ fontSize: "0.875rem", padding: "6px 14px", fontWeight: 800 }}>
              {currentStageName}
            </Badge>
          </div>
        </div>

        {/* Info Grid (Students Count & Schedules) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tile 1: Students Count */}
          <div style={{ background: t.bgMuted, padding: "16px", borderRadius: "12px", border: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "10px", background: "rgba(13, 148, 136, 0.1)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 700, marginBottom: "2px" }}>عدد الطلبة المقيدين</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 900, color: t.textPrimary }}>
                {students.length} <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textSecondary }}>طالب</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Next Exam Schedule */}
          <div style={{ background: t.bgMuted, padding: "16px", borderRadius: "12px", border: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "10px", background: "rgba(13, 148, 136, 0.1)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Calendar size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 700, marginBottom: "2px" }}>ميعاد الامتحان القادم</div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, whiteSpace: "nowrap" }}>
                {examSchedule}
              </div>
            </div>
          </div>

          {/* Tile 3: Next Video Schedule */}
          <div style={{ background: t.bgMuted, padding: "16px", borderRadius: "12px", border: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "10px", background: "rgba(59, 130, 246, 0.1)", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Clock size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 700, marginBottom: "2px" }}>ميعاد نزول الفيديو القادم</div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: t.textPrimary, whiteSpace: "nowrap" }}>
                {videoSchedule}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 2 — Students Roster Table */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <SectionTitle>قائمة طلاب المجموعة</SectionTitle>
            <Badge variant="secondary" style={{ fontSize: "0.8125rem", padding: "2px 10px", fontWeight: 700 }}>
              {students.length} طلاب
            </Badge>
          </div>
          <div style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>
            يمكنك عرض تفاصيل الطالب أو إزالته من انتساب هذه المجموعة
          </div>
        </div>

        <DataTable
          columns={studentColumns}
          data={students}
          emptyTitle="لا يوجد طلاب مسجلين في هذه المجموعة"
          emptyDescription="يمكنك النقر على زر [+ إضافة طالب] من شريط الإجراءات بالأعلى لإضافة طلاب جدد للمجموعة."
          pageSize={10}
        />
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. Add Student Modal */}
      <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} title="إضافة طالب جديد للمجموعة">
        <form onSubmit={handleAddStudentSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              اسم الطالب الثلاثي <span style={{ color: t.error }}>*</span>
            </label>
            <Input
              placeholder="مثال: عمر خالد عبد الله..."
              value={newStudentName}
              onChange={setNewStudentName}
              icon={<User size={16} />}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              رقم هاتف الطالب <span style={{ color: t.error }}>*</span>
            </label>
            <Input
              placeholder="مثال: 01012345678"
              value={newStudentPhone}
              onChange={setNewStudentPhone}
              icon={<Phone size={16} />}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              رقم هاتف ولي الأمر (اختياري)
            </label>
            <Input
              placeholder="مثال: 01098765432"
              value={newStudentParentPhone}
              onChange={setNewStudentParentPhone}
              icon={<Phone size={16} />}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              حالة الانتساب للمجموعة
            </label>
            <select
              value={newStudentStatus}
              onChange={(e) => setNewStudentStatus(e.target.value as any)}
              style={{
                width: "100%",
                height: "44px",
                padding: "0 12px",
                borderRadius: "10px",
                border: `1px solid ${t.border}`,
                backgroundColor: "#FFFFFF",
                color: t.textPrimary,
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              <option value="active">نشط (مفعل بالكامل)</option>
              <option value="pending">معلق (بانتظار التأكيد)</option>
              <option value="inactive">غير نشط / مجمد</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="secondary" type="button" onClick={() => setShowAddStudentModal(false)}>إلغاء</Button>
            <Button variant="primary" type="submit">إضافة الطالب للمجموعة</Button>
          </div>
        </form>
      </Modal>

      {/* 2. Edit Group Details Modal */}
      <Modal isOpen={showEditGroupModal} onClose={() => setShowEditGroupModal(false)} title="تعديل بيانات المجموعة الدراسية">
        <form onSubmit={handleUpdateGroupSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              اسم المجموعة <span style={{ color: t.error }}>*</span>
            </label>
            <Input
              placeholder="أدخل اسم المجموعة الجديد..."
              value={editGroupNameInput}
              onChange={setEditGroupNameInput}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="secondary" type="button" onClick={() => setShowEditGroupModal(false)}>إلغاء</Button>
            <Button variant="primary" type="submit">حفظ التغييرات</Button>
          </div>
        </form>
      </Modal>

      {/* 3. Change Exam Schedule Modal */}
      <Modal isOpen={showEditExamModal} onClose={() => setShowEditExamModal(false)} title="تغيير ميعاد الامتحان القادم">
        <form onSubmit={handleUpdateExamSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              ميعاد وتفاصيل الامتحان القادم <span style={{ color: t.error }}>*</span>
            </label>
            <Input
              placeholder="مثال: الأحد 20 أغسطس 2026 · 11:00 ص"
              value={editExamInput}
              onChange={setEditExamInput}
              icon={<Calendar size={16} />}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="secondary" type="button" onClick={() => setShowEditExamModal(false)}>إلغاء</Button>
            <Button variant="primary" type="submit">تحديث ميعاد الامتحان</Button>
          </div>
        </form>
      </Modal>

      {/* 4. Change Video Schedule Modal */}
      <Modal isOpen={showEditVideoModal} onClose={() => setShowEditVideoModal(false)} title="تغيير ميعاد نزول الفيديو القادم">
        <form onSubmit={handleUpdateVideoSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
              ميعاد نزول الفيديو القادم <span style={{ color: t.error }}>*</span>
            </label>
            <Input
              placeholder="مثال: الإثنين 21 أغسطس 2026 · 02:00 م"
              value={editVideoInput}
              onChange={setEditVideoInput}
              icon={<Clock size={16} />}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button variant="secondary" type="button" onClick={() => setShowEditVideoModal(false)}>إلغاء</Button>
            <Button variant="primary" type="submit">تحديث ميعاد الفيديو</Button>
          </div>
        </form>
      </Modal>

      {/* 5. View Student Details Modal */}
      <Modal isOpen={showViewStudentModal} onClose={() => setShowViewStudentModal(false)} title="تفاصيل واشتراكات الطالب">
        {selectedStudent && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: t.bgMuted, borderRadius: "12px" }}>
              <div style={{ width: 48, height: 48, borderRadius: "12px", background: "rgba(13, 148, 136, 0.15)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.25rem" }}>
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 800, color: t.textPrimary, margin: 0 }}>{selectedStudent.name}</h4>
                <div style={{ fontSize: "0.8125rem", color: t.textSecondary, marginTop: "2px" }}>تاريخ الانضمام للمجموعة: {selectedStudent.joinedDate}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem", color: t.textPrimary }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${t.border}`, paddingBottom: "8px" }}>
                <span style={{ color: t.textSecondary, fontWeight: 600 }}>رقم الهاتف الشخصي:</span>
                <strong style={{ fontFamily: "monospace" }}>{selectedStudent.phone}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${t.border}`, paddingBottom: "8px" }}>
                <span style={{ color: t.textSecondary, fontWeight: 600 }}>هاتف ولي الأمر:</span>
                <strong style={{ fontFamily: "monospace" }}>{selectedStudent.parentPhone || "غير مسجل"}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${t.border}`, paddingBottom: "8px" }}>
                <span style={{ color: t.textSecondary, fontWeight: 600 }}>حالة الطالب:</span>
                <div>
                  {selectedStudent.status === "active" ? <Badge variant="success">نشط</Badge> : selectedStudent.status === "pending" ? <Badge variant="warning">معلق</Badge> : <Badge variant="error">غير نشط</Badge>}
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textSecondary, marginBottom: "8px" }}>الاشتراكات والباقات المرتبطة بالطالب:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedStudent.subscriptions.map((sub, i) => (
                  <Badge key={i} variant="primary" style={{ padding: "6px 12px", fontSize: "0.8125rem" }}>
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button variant="secondary" onClick={() => setShowViewStudentModal(false)}>إغلاق النافذة</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 6. Remove from Classroom Confirmation Modal */}
      <Modal isOpen={showRemoveModal} onClose={() => setShowRemoveModal(false)} title="تأكيد إزالة الطالب من المجموعة">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
            هل أنت متأكد من رغبتك في إزالة الطالب <strong>{selectedStudent?.name}</strong> من هذه المجموعة الدراسية؟
            سيؤدي هذا الإجراء إلى شطب اسمه من كشوف الحضور ومواعيد الامتحانات الخاصة بهذه المجموعة.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={handleRemoveStudent}>تأكيد الإزالة</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default GroupDetailPage;
