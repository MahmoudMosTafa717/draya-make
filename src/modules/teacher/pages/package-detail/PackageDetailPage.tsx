import * as React from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowRight, GripVertical, Plus, Edit, Trash2, Video, FileText,
  ClipboardList, Copy, RefreshCw, Users, KeyRound, Check
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

interface ILessonItem {
  id: string;
  title: string;
  type: "video" | "pdf" | "exam";
  duration?: string;
  order: number;
}

interface IChapterItem {
  id: string;
  title: string;
  order: number;
  lessons: ILessonItem[];
}

export const PackageDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dialog states
  const [showAddChapter, setShowAddChapter] = React.useState(false);
  const [showAddLesson, setShowAddLesson] = React.useState(false);
  
  // Dynamic chapter values
  const [newChapterTitle, setNewChapterTitle] = React.useState("");
  const [selectedChapterId, setSelectedChapterId] = React.useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = React.useState("");
  const [newLessonType, setNewLessonType] = React.useState<"video" | "pdf" | "exam">("video");

  // Enrollment codes states
  const [enrollmentCode, setEnrollmentCode] = React.useState("DRY-MATH-4321");
  const [copied, setCopied] = React.useState(false);

  // Mock package details
  const [chapters, setChapters] = React.useState<IChapterItem[]>([
    {
      id: "ch_1",
      title: "الفصل الأول: التباديل والتوافيق",
      order: 1,
      lessons: [
        { id: "les_1", title: "مقدمة ومفهوم مضروب العدد", type: "video", duration: "24 دقيقة", order: 1 },
        { id: "les_2", title: "ملف شرح التباديل الأساسية PDF", type: "pdf", order: 2 },
        { id: "les_3", title: "امتحان تجريبي على التوافيق", type: "exam", order: 3 },
      ]
    },
    {
      id: "ch_2",
      title: "الفصل الثاني: نظرية ذات الحدين",
      order: 2,
      lessons: [
        { id: "les_4", title: "شرح نظرية ذات الحدين بمفكوك صحيح", type: "video", duration: "38 دقيقة", order: 1 },
      ]
    }
  ]);

  // Mock students roster in package
  const students = [
    { id: "std_1", name: "أحمد محمود علي", email: "ahmed.ali@example.com", progress: "80%" },
    { id: "std_2", name: "سارة محمد أحمد", email: "sara.ahmed@example.com", progress: "100%" },
    { id: "std_3", name: "رنا عبد الله عمر", email: "rana.omar@example.com", progress: "30%" },
  ];

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim()) return;
    const newCh: IChapterItem = {
      id: "ch_" + Date.now(),
      title: newChapterTitle,
      order: chapters.length + 1,
      lessons: [],
    };
    setChapters([...chapters, newCh]);
    setNewChapterTitle("");
    setShowAddChapter(false);
    toast.success("تم إضافة الفصل بنجاح");
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !selectedChapterId) return;

    setChapters(chapters.map(ch => {
      if (ch.id === selectedChapterId) {
        const newLes: ILessonItem = {
          id: "les_" + Date.now(),
          title: newLessonTitle,
          type: newLessonType,
          duration: newLessonType === "video" ? "20 دقيقة" : undefined,
          order: ch.lessons.length + 1,
        };
        return { ...ch, lessons: [...ch.lessons, newLes] };
      }
      return ch;
    }));

    setNewLessonTitle("");
    setShowAddLesson(false);
    toast.success("تم إضافة الدرس بنجاح");
  };

  const generateNewCode = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setEnrollmentCode(`DRY-MATH-${random}`);
    toast.success("تم توليد كود انتساب جديد");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(enrollmentCode);
    setCopied(true);
    toast.success("تم نسخ الكود للحافظة");
    setTimeout(() => setCopied(false), 2000);
  };

  const studentColumns: Column<any>[] = [
    { header: "اسم الطالب", accessorKey: "name" },
    { header: "البريد الإلكتروني", accessorKey: "email" },
    { header: "تقدم إتمام المحتوى", accessorKey: "progress", cell: (item) => <Badge variant="primary">{item.progress}</Badge> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Back to list */}
      <div>
        <Button variant="tertiary" size="sm" onClick={() => navigate("/teacher/packages")} style={{ padding: 0 }}>
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          الرجوع لقائمة الباقات
        </Button>
      </div>

      {/* Package Header Details */}
      <Card style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <Badge variant="primary">الرياضيات</Badge>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginTop: "8px", marginBottom: "4px" }}>
            باقة الجبر وحساب المثلثات
          </h1>
          <span style={{ fontSize: "0.875rem", color: t.textSecondary }}>سعر الباقة للطلاب: <strong>150 جنيه مصري</strong></span>
        </div>

        {/* Generate enrollment code controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", border: `1.5px dashed ${t.border}`, borderRadius: "10px", background: t.bgSecondary }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>كود الانتساب للباقة (أكاديمي):</span>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: t.primary, fontFamily: "monospace" }}>{enrollmentCode}</span>
          </div>
          <button
            onClick={copyCode}
            style={{ padding: "8px", borderRadius: "8px", border: `1px solid ${t.border}`, background: "#fff", cursor: "pointer", color: t.textSecondary }}
            title="نسخ الكود"
          >
            {copied ? <Check size={14} color={t.success} /> : <Copy size={14} />}
          </button>
          <button
            onClick={generateNewCode}
            style={{ padding: "8px", borderRadius: "8px", border: `1px solid ${t.border}`, background: "#fff", cursor: "pointer", color: t.textSecondary }}
            title="توليد كود جديد"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </Card>

      {/* Content split tree vs roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Chapters & Lessons tree hierarchy (60%) */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          <SectionTitle
            action={
              <Button variant="secondary" size="sm" onClick={() => setShowAddChapter(true)}>
                <Plus size={14} />
                إضافة فصل جديد
              </Button>
            }
          >
            محتوى الفصول والمحاضرات
          </SectionTitle>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {chapters.map(ch => (
              <Card key={ch.id} style={{ padding: "18px", borderLeft: `4px solid ${t.primary}` }}>
                {/* Chapter Title Head */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <GripVertical size={16} style={{ color: t.textDisabled, cursor: "grab" }} />
                    <span style={{ fontWeight: 700, color: t.textPrimary }}>{ch.title}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button variant="tertiary" size="sm" onClick={() => { setSelectedChapterId(ch.id); setShowAddLesson(true); }}>
                      <Plus size={14} />
                      إضافة درس
                    </Button>
                  </div>
                </div>

                {/* Lessons list details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginRight: "24px" }}>
                  {ch.lessons.length === 0 ? (
                    <span style={{ fontSize: "0.8125rem", color: t.textDisabled, fontStyle: "italic", padding: "6px" }}>لا توجد محاضرات في هذا الفصل بعد.</span>
                  ) : (
                    ch.lessons.map(les => (
                      <div
                        key={les.id}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "8px 12px", border: `1.5px solid ${t.border}`, borderRadius: "8px",
                          background: t.bgSecondary, fontSize: "0.875rem"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <GripVertical size={14} style={{ color: t.textDisabled, cursor: "grab" }} />
                          <span style={{ color: t.textSecondary }}>
                            {les.type === "video" ? <Video size={14} /> : les.type === "pdf" ? <FileText size={14} /> : <ClipboardList size={14} />}
                          </span>
                          <span style={{ fontWeight: 500, color: t.textPrimary }}>{les.title}</span>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          {les.duration && <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>{les.duration}</span>}
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: t.error }} title="حذف الدرس">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Students roster using this package (40%) */}
        <div>
          <SectionTitle>الطلاب المسجلين بالباقة</SectionTitle>
          <DataTable
            columns={studentColumns}
            data={students}
            emptyTitle="لا يوجد طلاب مسجلين بالباقة"
          />
        </div>

      </div>

      {/* Add Chapter Modal */}
      <Modal isOpen={showAddChapter} onClose={() => setShowAddChapter(false)} title="إضافة فصل دراسي جديد">
        <form onSubmit={handleAddChapter} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="عنوان الفصل الدراسي"
            placeholder="مثال: الفصل الثالث: حساب المثلثات والتطبيقات"
            value={newChapterTitle}
            onChange={e => setNewChapterTitle(e.target.value)}
            required
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
            <Button type="button" variant="secondary" onClick={() => setShowAddChapter(false)}>إلغاء</Button>
            <Button type="submit" variant="primary">إضافة الفصل</Button>
          </div>
        </form>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal isOpen={showAddLesson} onClose={() => setShowAddLesson(false)} title="إضافة درس جديد للفصل">
        <form onSubmit={handleAddLesson} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <Input
            label="عنوان الدرس / المحاضرة"
            placeholder="مثال: شرح درس الدوال الدائرية"
            value={newLessonTitle}
            onChange={e => setNewLessonTitle(e.target.value)}
            required
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>نوع المحتوى</label>
            <select
              value={newLessonType}
              onChange={e => setNewLessonType(e.target.value as any)}
              style={{
                height: "42px", borderRadius: "8px",
                border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
                color: t.textPrimary, padding: "0 12px", fontSize: "0.875rem",
                fontFamily: "inherit", outline: "none", cursor: "pointer"
              }}
            >
              <option value="video">فيديو مصور (Lecture Video)</option>
              <option value="pdf">ملف شرح أو ملخص (PDF Document)</option>
              <option value="exam">امتحان أو واجب (Exam / Homework)</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
            <Button type="button" variant="secondary" onClick={() => setShowAddLesson(false)}>إلغاء</Button>
            <Button type="submit" variant="primary">إضافة الدرس</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default PackageDetailPage;
