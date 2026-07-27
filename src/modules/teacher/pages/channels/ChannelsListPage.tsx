import * as React from "react";
import { useNavigate } from "react-router";
import { Plus, Search, MessageSquare, HelpCircle, Users, Clock, Edit2, Trash2, Eye, Tv, ShieldAlert, UserCheck, Layers, Table as TableIcon, CheckSquare, Square, Archive, CheckCircle2, Bell, AlertCircle, AtSign, Info } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { Modal } from "@/shared/components/ui/Modal";
import { DataTable, Column } from "@/shared/components/ui/DataTable";
import { toast } from "@/shared/components/ui/Toast";

interface IChannelItem {
  id: string;
  name: string;
  description: string;
  linkType: "classroom" | "package";
  linkedTo: string;
  assistants: string[];
  status: "active" | "archived" | "closed";
  messagesCount: number;
  newQuestions: number;
  lastActivity: string;
  studentsCount: number;
  assistantsCount: number;
  // Prompt 7 Notification fields
  mentionsCount: number;
  delayedQuestions: number;
  unansweredCount: number;
}

const AVAILABLE_ASSISTANTS = [
  "أحمد محمود (مساعد فيزياء)",
  "سارة علي (مساعد كيمياء)",
  "خالد حسن (مساعد عام)",
  "محمد عمر (مساعد رياضيات)",
  "نور إبراهيم (مساعد دعم فني)",
];

const CLASSROOM_OPTIONS = [
  "الصف الثالث الثانوي",
  "الصف الثاني الثانوي - كيمياء",
  "الصف الأول الثانوي",
  "المرحلة الثانوية - عام",
];

const PACKAGE_OPTIONS = [
  "باقة فيزياء الصف الثالث الثانوي",
  "باقة الجبر وحساب المثلثات",
  "باقة التفاضل والتكامل",
  "باقة الكيمياء العضوية",
];

export const ChannelsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"list" | "table">("list");
  const [activeFilter, setActiveFilter] = React.useState<"all" | "new" | "mentions" | "delayed" | "unanswered">("all");

  // Unified Create/Edit Modal state
  const [showChannelModal, setShowChannelModal] = React.useState(false);
  const [editingChannel, setEditingChannel] = React.useState<IChannelItem | null>(null);

  // Delete Modal state
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [channelToDelete, setChannelToDelete] = React.useState<IChannelItem | null>(null);

  // Form input states
  const [formName, setFormName] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formLinkType, setFormLinkType] = React.useState<"classroom" | "package">("package");
  const [formLinkedTo, setFormLinkedTo] = React.useState(PACKAGE_OPTIONS[0]);
  const [formAssistants, setFormAssistants] = React.useState<string[]>([]);
  const [formStatus, setFormStatus] = React.useState<"active" | "archived" | "closed">("active");

  // Mock data: 3 channels as requested with Prompt 7 notification counts
  const [channels, setChannels] = React.useState<IChannelItem[]>([
    {
      id: "ch_1",
      name: "Physics Q&A - أسئلة ومناقشات فيزياء 3 ثانوي",
      description: "قناة مخصصة للرد على استفسارات أسئلة واجب ومحاضرات مادة الفيزياء للصف الثالث الثانوي ومناقشة الامتحانات الدورية.",
      linkType: "package",
      linkedTo: "باقة فيزياء الصف الثالث الثانوي",
      assistants: ["أحمد محمود (مساعد فيزياء)", "خالد حسن (مساعد عام)"],
      status: "active",
      messagesCount: 420,
      newQuestions: 5,
      lastActivity: "منذ 5 دقائق",
      studentsCount: 145,
      assistantsCount: 2,
      mentionsCount: 2,
      delayedQuestions: 1,
      unansweredCount: 4,
    },
    {
      id: "ch_2",
      name: "Chemistry Questions - مناقشات كيمياء 2 ثانوي",
      description: "قناة تفاعلية لمناقشة حلول كتب وتدريبات الكيمياء للصف الثاني الثانوي والتواصل المباشر بين الطلاب والمساعدين.",
      linkType: "classroom",
      linkedTo: "الصف الثاني الثانوي - كيمياء",
      assistants: ["سارة علي (مساعد كيمياء)"],
      status: "active",
      messagesCount: 215,
      newQuestions: 12,
      lastActivity: "منذ ساعتين",
      studentsCount: 98,
      assistantsCount: 1,
      mentionsCount: 3,
      delayedQuestions: 3,
      unansweredCount: 8,
    },
    {
      id: "ch_3",
      name: "Math Support - الدعم الفني لمادة الرياضيات",
      description: "قناة الدعم الفني وحل المشكلات التقنية والدراسية لطلاب باقات الرياضيات والجبر وحساب المثلثات.",
      linkType: "package",
      linkedTo: "باقة الجبر وحساب المثلثات",
      assistants: ["محمد عمر (مساعد رياضيات)", "نور إبراهيم (مساعد دعم فني)", "خالد حسن (مساعد عام)"],
      status: "archived",
      messagesCount: 680,
      newQuestions: 0,
      lastActivity: "أمس",
      studentsCount: 230,
      assistantsCount: 3,
      mentionsCount: 0,
      delayedQuestions: 0,
      unansweredCount: 0,
    },
  ]);

  // Total notification counts across all channels (Prompt 7)
  const totalNotifications = React.useMemo(() => {
    return channels.reduce((acc, c) => ({
      newQuestions: acc.newQuestions + c.newQuestions,
      mentions: acc.mentions + c.mentionsCount,
      delayed: acc.delayed + c.delayedQuestions,
      unanswered: acc.unanswered + c.unansweredCount,
    }), { newQuestions: 0, mentions: 0, delayed: 0, unanswered: 0 });
  }, [channels]);

  // Filter channels based on search and active notification filter
  const filteredChannels = React.useMemo(() => {
    return channels.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        c.linkedTo.toLowerCase().includes(searchVal.toLowerCase()) ||
        c.description.toLowerCase().includes(searchVal.toLowerCase());
      
      if (!matchesSearch) return false;

      if (activeFilter === "new") return c.newQuestions > 0;
      if (activeFilter === "mentions") return c.mentionsCount > 0;
      if (activeFilter === "delayed") return c.delayedQuestions > 0;
      if (activeFilter === "unanswered") return c.unansweredCount > 0;
      return true;
    });
  }, [channels, searchVal, activeFilter]);

  // Open modal for Create
  const handleCreateOpen = () => {
    setEditingChannel(null);
    setFormName("");
    setFormDescription("");
    setFormLinkType("package");
    setFormLinkedTo(PACKAGE_OPTIONS[0]);
    setFormAssistants([AVAILABLE_ASSISTANTS[0]]);
    setFormStatus("active");
    setShowChannelModal(true);
  };

  // Open modal for Edit (Pre-fill all fields)
  const handleEditOpen = (channel: IChannelItem) => {
    setEditingChannel(channel);
    setFormName(channel.name);
    setFormDescription(channel.description || "");
    setFormLinkType(channel.linkType || "package");
    setFormLinkedTo(channel.linkedTo);
    setFormAssistants(channel.assistants || []);
    setFormStatus(channel.status || "active");
    setShowChannelModal(true);
  };

  const handleDeleteOpen = (channel: IChannelItem) => {
    setChannelToDelete(channel);
    setShowDeleteModal(true);
  };

  const handleLinkTypeChange = (type: "classroom" | "package") => {
    setFormLinkType(type);
    if (type === "classroom") {
      setFormLinkedTo(CLASSROOM_OPTIONS[0]);
    } else {
      setFormLinkedTo(PACKAGE_OPTIONS[0]);
    }
  };

  const handleAssistantToggle = (assistantName: string) => {
    if (formAssistants.includes(assistantName)) {
      setFormAssistants(formAssistants.filter(a => a !== assistantName));
    } else {
      setFormAssistants([...formAssistants, assistantName]);
    }
  };

  const handleChannelFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formLinkedTo) {
      toast.error("بيانات غير مكتملة", "يرجى إدخال اسم القناة وتحديد الارتباط الدراسي.");
      return;
    }

    if (editingChannel) {
      setChannels(channels.map(c => c.id === editingChannel.id ? {
        ...c,
        name: formName.trim(),
        description: formDescription.trim(),
        linkType: formLinkType,
        linkedTo: formLinkedTo,
        assistants: formAssistants,
        assistantsCount: formAssistants.length,
        status: formStatus,
      } : c));
      toast.success("تم تحديث بيانات القناة بنجاح", `تم حفظ التعديلات على قناة "${formName}".`);
    } else {
      const newChannel: IChannelItem = {
        id: `ch_${Date.now()}`,
        name: formName.trim(),
        description: formDescription.trim(),
        linkType: formLinkType,
        linkedTo: formLinkedTo,
        assistants: formAssistants,
        status: formStatus,
        messagesCount: 0,
        newQuestions: 0,
        lastActivity: "الآن",
        studentsCount: 0,
        assistantsCount: formAssistants.length,
        mentionsCount: 0,
        delayedQuestions: 0,
        unansweredCount: 0,
      };
      setChannels([newChannel, ...channels]);
      toast.success("تم إنشاء القناة بنجاح", `تم إضافة القناة "${formName}" إلى قائمة قنوات التواصل.`);
    }

    setShowChannelModal(false);
    setEditingChannel(null);
  };

  const handleDeleteConfirm = () => {
    if (!channelToDelete) return;
    setChannels(channels.filter(c => c.id !== channelToDelete.id));
    toast.success("تم حذف القناة بنجاح", `تم إزالة ${channelToDelete.name} من النظام.`);
    setShowDeleteModal(false);
    setChannelToDelete(null);
  };

  // Table Columns Definition for Table View Mode
  const columns: Column<IChannelItem>[] = [
    {
      header: "اسم القناة الدراسية",
      accessorKey: "name",
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(29, 110, 99, 0.1)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Tv size={18} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span
              onClick={() => {
                toast.info("فتح قناة التواصل", `جاري الانتقال إلى ${item.name}`);
                navigate(`/teacher/channel/${item.id}`);
              }}
              style={{ fontWeight: 800, color: t.textPrimary, cursor: "pointer", fontSize: "0.9375rem" }}
              className="hover:underline hover:text-teal-700"
            >
              {item.name}
            </span>
            {item.description && (
              <span style={{ fontSize: "0.75rem", color: t.textSecondary, maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.description}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "الارتباط والمرحلة",
      accessorKey: "linkedTo",
      cell: (item) => (
        <Badge variant="secondary" style={{ fontSize: "0.78rem", padding: "4px 10px", fontWeight: 700, background: "rgba(29, 110, 99, 0.08)", color: t.primary }}>
          {item.linkedTo}
        </Badge>
      ),
    },
    {
      header: "الحالة",
      accessorKey: "status",
      cell: (item) => (
        <Badge
          variant={item.status === "active" ? "success" : "secondary"}
          style={{
            fontSize: "0.75rem",
            padding: "2px 8px",
            fontWeight: 700,
            background: item.status === "archived" ? "rgba(245, 158, 11, 0.15)" : item.status === "closed" ? "rgba(100, 116, 139, 0.15)" : undefined,
            color: item.status === "archived" ? "#D97706" : item.status === "closed" ? "#475569" : undefined,
          }}
        >
          {item.status === "active" ? "نشط" : item.status === "archived" ? "مؤرشف" : "مغلق"}
        </Badge>
      ),
    },
    {
      header: "التنبيهات (Prompt 7)",
      accessorKey: "newQuestions",
      cell: (item) => (
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          {item.newQuestions > 0 && (
            <Badge variant="error" style={{ fontSize: "0.7rem", padding: "2px 6px", fontWeight: 800 }}>
              {item.newQuestions} جديد
            </Badge>
          )}
          {item.mentionsCount > 0 && (
            <Badge variant="primary" style={{ fontSize: "0.7rem", padding: "2px 6px", fontWeight: 800, background: t.primary, color: "#FFFFFF" }}>
              @{item.mentionsCount}
            </Badge>
          )}
          {item.delayedQuestions > 0 && (
            <Badge variant="secondary" style={{ fontSize: "0.7rem", padding: "2px 6px", fontWeight: 800, background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}>
              {item.delayedQuestions} متأخر
            </Badge>
          )}
          {item.newQuestions === 0 && item.mentionsCount === 0 && item.delayedQuestions === 0 && (
            <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>لا توجد تنبيهات</span>
          )}
        </div>
      ),
    },
    {
      header: "الطلبة والمساعدين",
      accessorKey: "studentsCount",
      cell: (item) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.8125rem" }}>
          <span style={{ fontWeight: 700, color: t.textPrimary }}>{item.studentsCount} طالب</span>
          <span style={{ color: t.textSecondary, fontSize: "0.75rem" }}>{item.assistantsCount} مساعدين</span>
        </div>
      ),
    },
    {
      header: "آخر نشاط",
      accessorKey: "lastActivity",
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: t.textSecondary, fontSize: "0.8125rem", fontWeight: 600 }}>
          <Clock size={14} />
          <span>{item.lastActivity}</span>
        </div>
      ),
    },
    {
      header: "إجراءات",
      accessorKey: "actions",
      cell: (item) => (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              toast.info("فتح قناة التواصل", `جاري الانتقال إلى ${item.name}`);
              navigate(`/teacher/channel/${item.id}`);
            }}
            style={{ padding: "0 12px" }}
          >
            <Eye size={14} style={{ marginLeft: "4px" }} />
            عرض
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEditOpen(item)}
            style={{ padding: "0 8px" }}
            title="تعديل"
          >
            <Edit2 size={14} />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteOpen(item)}
            style={{ padding: "0 8px" }}
            title="حذف"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Page Title & Action */}
      <SectionTitle
        sub="إدارة قنوات التواصل والمناقشات المباشرة المرتبطة بالباقات والفصول الدراسية وتتبع تفاعل الطلاب وتنبيهات الإشراف."
        action={
          <Button variant="primary" onClick={handleCreateOpen}>
            <Plus size={16} />
            إنشاء قناة جديدة
          </Button>
        }
      >
        قنوات التواصل والأسئلة (Channels List)
      </SectionTitle>

      {/* PROMPT 7: NOTIFICATIONS & ALERT COUNTERS BAR */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "14px",
      }}>
        {/* 1. New Question Counter Card */}
        <Card
          onClick={() => {
            const nextFilter = activeFilter === "new" ? "all" : "new";
            setActiveFilter(nextFilter);
            toast.info(nextFilter === "new" ? "تصفية: الأسئلة الجديدة" : "عرض جميع القنوات", nextFilter === "new" ? "يتم الآن عرض القنوات التي تحتوي على أسئلة جديدة غير مقروءة فقط." : "تم إلغاء التصفية وعرض كل القنوات.");
          }}
          style={{
            padding: "16px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            border: activeFilter === "new" ? `2px solid #EF4444` : `1px solid ${t.border}`,
            background: activeFilter === "new" ? "rgba(239, 68, 68, 0.05)" : t.bgSurface,
            transition: "all 150ms ease",
          }}
          className="hover:border-red-500/50"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Bell size={22} />
              {totalNotifications.newQuestions > 0 && (
                <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#EF4444", border: "2px solid #FFFFFF" }} />
              )}
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", color: t.textSecondary, fontWeight: 700, display: "block" }}>سؤال جديد (New)</span>
              <strong style={{ fontSize: "1.25rem", color: t.textPrimary, fontWeight: 900 }}>{totalNotifications.newQuestions}</strong>
            </div>
          </div>
          <Badge variant="error" style={{ fontSize: "0.72rem", padding: "3px 8px", fontWeight: 800 }}>جديد</Badge>
        </Card>

        {/* 2. Mentions @ Counter Card */}
        <Card
          onClick={() => {
            const nextFilter = activeFilter === "mentions" ? "all" : "mentions";
            setActiveFilter(nextFilter);
            toast.info(nextFilter === "mentions" ? "تصفية: الإشارات (@)" : "عرض جميع القنوات", nextFilter === "mentions" ? "يتم الآن عرض القنوات التي تحتوي على إشارات شخصية (@) لمعلم المادة أو المساعدين." : "تم إلغاء التصفية.");
          }}
          style={{
            padding: "16px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            border: activeFilter === "mentions" ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
            background: activeFilter === "mentions" ? "rgba(29, 110, 99, 0.05)" : t.bgSurface,
            transition: "all 150ms ease",
          }}
          className="hover:border-teal-600/50"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(29, 110, 99, 0.1)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.2rem" }}>
              <AtSign size={22} />
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", color: t.textSecondary, fontWeight: 700, display: "block" }}>إشارات (Mentions @)</span>
              <strong style={{ fontSize: "1.25rem", color: t.textPrimary, fontWeight: 900 }}>{totalNotifications.mentions}</strong>
            </div>
          </div>
          <Badge variant="primary" style={{ fontSize: "0.72rem", padding: "3px 8px", fontWeight: 800, background: t.primary, color: "#FFFFFF" }}>إشارة</Badge>
        </Card>

        {/* 3. Unanswered for a while (Delayed) Counter Card */}
        <Card
          onClick={() => {
            const nextFilter = activeFilter === "delayed" ? "all" : "delayed";
            setActiveFilter(nextFilter);
            toast.warning(nextFilter === "delayed" ? "تصفية: رسائل متأخرة بدون رد" : "عرض جميع القنوات", nextFilter === "delayed" ? "يتم الآن عرض القنوات التي تحتوي على أسئلة مر عليها وقت طويل بدون إجابة." : "تم إلغاء التصفية.");
          }}
          style={{
            padding: "16px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            border: activeFilter === "delayed" ? `2px solid #F59E0B` : `1px solid ${t.border}`,
            background: activeFilter === "delayed" ? "rgba(245, 158, 11, 0.05)" : t.bgSurface,
            transition: "all 150ms ease",
          }}
          className="hover:border-amber-500/50"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(245, 158, 11, 0.1)", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={22} />
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", color: t.textSecondary, fontWeight: 700, display: "block" }}>بدون رد لفترة (Delayed)</span>
              <strong style={{ fontSize: "1.25rem", color: t.textPrimary, fontWeight: 900 }}>{totalNotifications.delayed}</strong>
            </div>
          </div>
          <Badge variant="secondary" style={{ fontSize: "0.72rem", padding: "3px 8px", fontWeight: 800, background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}>تأخير</Badge>
        </Card>

        {/* 4. Total Unanswered Count Card */}
        <Card
          onClick={() => {
            const nextFilter = activeFilter === "unanswered" ? "all" : "unanswered";
            setActiveFilter(nextFilter);
            toast.info(nextFilter === "unanswered" ? "تصفية: إجمالي الأسئلة غير المجابة" : "عرض جميع القنوات", nextFilter === "unanswered" ? "يتم الآن عرض القنوات التي تحتوي على أي أسئلة بانتظار الرد." : "تم إلغاء التصفية.");
          }}
          style={{
            padding: "16px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            border: activeFilter === "unanswered" ? `2px solid #2563EB` : `1px solid ${t.border}`,
            background: activeFilter === "unanswered" ? "rgba(37, 99, 235, 0.05)" : t.bgSurface,
            transition: "all 150ms ease",
          }}
          className="hover:border-blue-500/50"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(37, 99, 235, 0.1)", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", color: t.textSecondary, fontWeight: 700, display: "block" }}>غير مجابة (Unanswered)</span>
              <strong style={{ fontSize: "1.25rem", color: t.textPrimary, fontWeight: 900 }}>{totalNotifications.unanswered}</strong>
            </div>
          </div>
          <Badge variant="secondary" style={{ fontSize: "0.72rem", padding: "3px 8px", fontWeight: 800, background: "rgba(37, 99, 235, 0.15)", color: "#2563EB" }}>بانتظار الرد</Badge>
        </Card>
      </div>

      {/* Active Notification Filter Chip if filtering */}
      {activeFilter !== "all" && (
        <div style={{ display: "flex", alignItems: "center", justifyItems: "flex-start", gap: "10px", background: "rgba(29, 110, 99, 0.08)", padding: "10px 16px", borderRadius: "10px", border: `1px solid ${t.primary}` }}>
          <Info size={18} style={{ color: t.primary }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: t.primary }}>
            تصفية نشطة حسب التنبيهات: {activeFilter === "new" ? "الأسئلة الجديدة" : activeFilter === "mentions" ? "الإشارات (@)" : activeFilter === "delayed" ? "الرسائل المتأخرة بدون رد" : "الأسئلة غير المجابة"} ({filteredChannels.length} قنوات مطابقة)
          </span>
          <button
            onClick={() => setActiveFilter("all")}
            style={{ marginRight: "auto", background: "transparent", border: "none", color: t.textSecondary, fontWeight: 800, cursor: "pointer", fontSize: "0.78rem", textDecoration: "underline" }}
          >
            إلغاء التصفية وعرض الكل
          </button>
        </div>
      )}

      {/* Search Bar & View Mode Toggle (Horizontal Ribbon List vs Table View) */}
      <Card style={{ padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 280px", maxWidth: "500px" }}>
          <Input
            placeholder="بحث باسم القناة أو الوصف أو الباقة/الفصل المرتبط..."
            value={searchVal}
            onChange={setSearchVal}
            icon={<Search size={16} />}
          />
        </div>

        {/* View Mode Toggle Buttons */}
        <div style={{ display: "flex", background: t.bgMuted, padding: "4px", borderRadius: "10px", border: `1px solid ${t.border}` }}>
          <button
            onClick={() => setViewMode("list")}
            title="عرض كقائمة أفقية شريطية"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "7px",
              border: viewMode === "list" ? `1px solid ${t.primary}` : "1px solid transparent",
              background: viewMode === "list" ? "#FFFFFF" : "transparent",
              color: viewMode === "list" ? t.primary : t.textSecondary,
              fontWeight: viewMode === "list" ? 800 : 600,
              fontSize: "0.8125rem",
              boxShadow: "none",
              cursor: "pointer",
              transition: "all 150ms ease",
              fontFamily: "inherit",
            }}
          >
            <Layers size={15} />
            <span>قائمة شريطية (Ribbon View)</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            title="عرض كجدول بيانات تفصيلي"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "7px",
              border: viewMode === "table" ? `1px solid ${t.primary}` : "1px solid transparent",
              background: viewMode === "table" ? "#FFFFFF" : "transparent",
              color: viewMode === "table" ? t.primary : t.textSecondary,
              fontWeight: viewMode === "table" ? 800 : 600,
              fontSize: "0.8125rem",
              boxShadow: "none",
              cursor: "pointer",
              transition: "all 150ms ease",
              fontFamily: "inherit",
            }}
          >
            <TableIcon size={15} />
            <span>جدول بيانات (Table View)</span>
          </button>
        </div>
      </Card>

      {/* Channels Display (Horizontal Strip List View vs Table View) */}
      {filteredChannels.length === 0 ? (
        <EmptyState
          title="لا توجد قنوات تواصل مطابقة"
          description={searchVal || activeFilter !== "all" ? "لم يتم العثور على قنوات تطابق عملية البحث أو التصفية الحالية." : "لم تقم بإنشاء أي قنوات تواصل بعد. ابدأ بإنشاء قناتك الأولى الآن."}
          action={
            !searchVal && activeFilter === "all" ? (
              <Button variant="primary" size="sm" onClick={handleCreateOpen}>
                <Plus size={15} />
                إنشاء أول قناة
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => { setSearchVal(""); setActiveFilter("all"); }}>
                إلغاء البحث والتصفية
              </Button>
            )
          }
        />
      ) : viewMode === "list" ? (
        /* ================= LIST VIEW (Horizontal Strips / Ribbons with Prompt 7 Badges) ================= */
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filteredChannels.map(channel => (
            <div
              key={channel.id}
              style={{
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                flexWrap: "wrap",
                background: t.bgSurface,
                borderRadius: "14px",
                border: `1px solid ${t.border}`,
                transition: "all 150ms ease",
                opacity: channel.status === "archived" || channel.status === "closed" ? 0.85 : 1,
              }}
              className="hover:border-teal-700/40"
            >
              {/* Left Side (in RTL: Right Side): Channel Name, Description & Badges */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: "1 1 320px", minWidth: "280px" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: channel.status === "active" ? "rgba(29, 110, 99, 0.1)" : "rgba(100, 116, 139, 0.1)",
                  color: channel.status === "active" ? t.primary : t.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                  position: "relative",
                }}>
                  <Tv size={24} />
                  {channel.newQuestions > 0 && (
                    <span style={{ position: "absolute", top: -3, right: -3, width: 12, height: 12, borderRadius: "50%", background: "#EF4444", border: "2px solid #FFFFFF" }} />
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <h3
                      onClick={() => {
                        toast.info("فتح قناة التواصل", `جاري الانتقال إلى ${channel.name}`);
                        navigate(`/teacher/channel/${channel.id}`);
                      }}
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 800,
                        color: t.textPrimary,
                        margin: 0,
                        cursor: "pointer",
                      }}
                      className="hover:underline hover:text-teal-700"
                    >
                      {channel.name}
                    </h3>
                    
                    <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "2px 10px", fontWeight: 700, background: "rgba(29, 110, 99, 0.08)", color: t.primary }}>
                      {channel.linkedTo}
                    </Badge>

                    <Badge
                      variant={channel.status === "active" ? "success" : "secondary"}
                      style={{
                        fontSize: "0.7rem",
                        padding: "2px 8px",
                        fontWeight: 700,
                        background: channel.status === "archived" ? "rgba(245, 158, 11, 0.15)" : channel.status === "closed" ? "rgba(100, 116, 139, 0.15)" : undefined,
                        color: channel.status === "archived" ? "#D97706" : channel.status === "closed" ? "#475569" : undefined,
                      }}
                    >
                      {channel.status === "active" ? "نشط" : channel.status === "archived" ? "مؤرشف" : "مغلق"}
                    </Badge>
                  </div>

                  {channel.description && (
                    <p style={{ fontSize: "0.8125rem", color: t.textSecondary, margin: 0, lineHeight: 1.5 }}>
                      {channel.description}
                    </p>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.8125rem", color: t.textSecondary, flexWrap: "wrap", marginTop: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <Clock size={14} /> آخر نشاط: <strong style={{ color: t.textPrimary }}>{channel.lastActivity}</strong>
                    </span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <UserCheck size={14} /> المساعدين: <strong style={{ color: t.textPrimary }}>{channel.assistantsCount}</strong>
                      {channel.assistants?.length > 0 && (
                        <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>
                          ({channel.assistants.map(a => a.split(" ")[0]).join("، ")})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Section: Inline KPI & Prompt 7 Notification Counters */}
              <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap", background: t.bgMuted, padding: "10px 18px", borderRadius: "12px", border: `1px solid ${t.border}` }}>
                {/* Messages */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "50px" }}>
                  <span style={{ fontSize: "0.72rem", color: t.textSecondary, fontWeight: 700 }}>الرسائل</span>
                  <span style={{ fontSize: "1rem", fontWeight: 900, color: t.textPrimary }}>{channel.messagesCount}</span>
                </div>

                <div style={{ width: 1, height: 26, background: t.borderStrong }} />

                {/* New Questions */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "65px" }}>
                  <span style={{ fontSize: "0.72rem", color: t.textSecondary, fontWeight: 700 }}>أسئلة جديدة</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 900, color: channel.newQuestions > 0 ? t.error : t.textPrimary }}>
                      {channel.newQuestions}
                    </span>
                    {channel.newQuestions > 0 && (
                      <Badge variant="error" style={{ fontSize: "0.62rem", padding: "1px 5px" }}>جديد</Badge>
                    )}
                  </div>
                </div>

                <div style={{ width: 1, height: 26, background: t.borderStrong }} />

                {/* Prompt 7: Mentions @ */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "55px" }}>
                  <span style={{ fontSize: "0.72rem", color: t.textSecondary, fontWeight: 700 }}>إشارات @</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 900, color: channel.mentionsCount > 0 ? t.primary : t.textPrimary }}>
                      {channel.mentionsCount}
                    </span>
                    {channel.mentionsCount > 0 && (
                      <Badge variant="primary" style={{ fontSize: "0.62rem", padding: "1px 5px", background: t.primary, color: "#FFFFFF" }}>@</Badge>
                    )}
                  </div>
                </div>

                <div style={{ width: 1, height: 26, background: t.borderStrong }} />

                {/* Prompt 7: Delayed Replies */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px" }}>
                  <span style={{ fontSize: "0.72rem", color: t.textSecondary, fontWeight: 700 }}>بدون رد</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 900, color: channel.delayedQuestions > 0 ? "#D97706" : t.textPrimary }}>
                      {channel.delayedQuestions}
                    </span>
                    {channel.delayedQuestions > 0 && (
                      <Badge variant="secondary" style={{ fontSize: "0.62rem", padding: "1px 5px", background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}>تأخير</Badge>
                    )}
                  </div>
                </div>

                <div style={{ width: 1, height: 26, background: t.borderStrong }} />

                {/* Students */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "50px" }}>
                  <span style={{ fontSize: "0.72rem", color: t.textSecondary, fontWeight: 700 }}>الطلبة</span>
                  <span style={{ fontSize: "1rem", fontWeight: 900, color: t.textPrimary }}>{channel.studentsCount}</span>
                </div>
              </div>

              {/* Right Side (in RTL: Left Side): Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    toast.info("فتح قناة التواصل", `جاري الانتقال إلى ${channel.name}`);
                    navigate(`/teacher/channel/${channel.id}`);
                  }}
                  style={{ padding: "0 16px" }}
                >
                  <Eye size={15} style={{ marginLeft: "6px" }} />
                  عرض القناة
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditOpen(channel)}
                  style={{ padding: "0 10px" }}
                  title="تعديل القناة والمساعدين"
                >
                  <Edit2 size={15} />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteOpen(channel)}
                  style={{ padding: "0 10px" }}
                  title="حذف القناة"
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= TABLE VIEW (DataTable with Prompt 7 Badges) ================= */
        <DataTable
          columns={columns}
          data={filteredChannels}
          emptyTitle="لا توجد قنوات تواصل مطابقة"
          pageSize={10}
        />
      )}

      {/* ================= MODALS ================= */}

      {/* 1. Unified Create / Edit Channel Modal (Prompt 2) */}
      <Modal
        isOpen={showChannelModal}
        onClose={() => {
          setShowChannelModal(false);
          setEditingChannel(null);
        }}
        title={editingChannel ? "تعديل بيانات القناة الدراسية" : "إنشاء قناة تواصل جديدة"}
      >
        <form onSubmit={handleChannelFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", maxHeight: "80vh", overflowY: "auto", paddingRight: "4px" }}>
          
          {/* Field 1: Channel Name */}
          <Input
            label="اسم القناة الدراسية"
            placeholder="مثال: أسئلة ومناقشات فيزياء 3 ثانوي..."
            value={formName}
            onChange={setFormName}
            required
          />

          {/* Field 2: Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>
              وصف القناة ومحتواها
            </label>
            <textarea
              placeholder="اكتب وصفاً موجزاً للغرض من هذه القناة، مثل القواعد أو أوقات الرد على الأسئلة..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              style={{
                minHeight: "84px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: `1.5px solid ${t.borderStrong}`,
                background: t.bgSurface,
                color: t.textPrimary,
                fontSize: "0.875rem",
                fontWeight: 600,
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Field 3: Classroom or Package Toggle & Select */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: t.bgMuted, padding: "14px", borderRadius: "12px", border: `1px solid ${t.border}` }}>
            <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>
              نوع الارتباط الدراسي (باقة تعليمية أم مرحلة/فصل)
            </label>
            
            {/* Toggle between Classroom and Package */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", background: "#FFFFFF", padding: "4px", borderRadius: "8px", border: `1px solid ${t.border}` }}>
              <button
                type="button"
                onClick={() => handleLinkTypeChange("package")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: formLinkType === "package" ? `1.5px solid ${t.primary}` : "1px solid transparent",
                  background: formLinkType === "package" ? "rgba(29, 110, 99, 0.08)" : "transparent",
                  color: formLinkType === "package" ? t.primary : t.textSecondary,
                  fontWeight: formLinkType === "package" ? 800 : 600,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "inherit",
                }}
              >
                ربط بباقة تعليمية (Package)
              </button>
              <button
                type="button"
                onClick={() => handleLinkTypeChange("classroom")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: formLinkType === "classroom" ? `1.5px solid ${t.primary}` : "1px solid transparent",
                  background: formLinkType === "classroom" ? "rgba(29, 110, 99, 0.08)" : "transparent",
                  color: formLinkType === "classroom" ? t.primary : t.textSecondary,
                  fontWeight: formLinkType === "classroom" ? 800 : 600,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "inherit",
                }}
              >
                ربط بمرحلة/فصل دراسي (Classroom)
              </button>
            </div>

            {/* Select Target */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: t.textSecondary }}>
                {formLinkType === "package" ? "اختر الباقة التعليمية المرتبطة:" : "اختر الفصل أو المرحلة الدراسية المرتبطة:"}
              </label>
              <select
                value={formLinkedTo}
                onChange={(e) => setFormLinkedTo(e.target.value)}
                style={{
                  height: "42px",
                  borderRadius: "8px",
                  border: `1.5px solid ${t.borderStrong}`,
                  background: t.bgSurface,
                  color: t.textPrimary,
                  padding: "0 12px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {(formLinkType === "package" ? PACKAGE_OPTIONS : CLASSROOM_OPTIONS).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Field 4: Assistants Multi-Select */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>
                إضافة المساعدين (Assistants)
              </label>
              <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "2px 8px", fontWeight: 700 }}>
                {formAssistants.length} محدد
              </Badge>
            </div>
            <div style={{ fontSize: "0.75rem", color: t.textSecondary, marginBottom: "2px" }}>
              اختر المساعدين الذين يمتلكون صلاحية الرد وإدارة الأسئلة والمحتوى داخل هذه القناة:
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxHeight: "150px",
              overflowY: "auto",
              padding: "8px 10px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
              background: t.bgSurface,
            }}>
              {AVAILABLE_ASSISTANTS.map(assistant => {
                const isSelected = formAssistants.includes(assistant);
                return (
                  <div
                    key={assistant}
                    onClick={() => handleAssistantToggle(assistant)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: isSelected ? "rgba(29, 110, 99, 0.06)" : "transparent",
                      border: isSelected ? `1px solid ${t.primary}` : "1px solid transparent",
                      cursor: "pointer",
                      transition: "all 120ms ease",
                    }}
                  >
                    {isSelected ? (
                      <CheckSquare size={18} style={{ color: t.primary, flexShrink: 0 }} />
                    ) : (
                      <Square size={18} style={{ color: t.textSecondary, flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: "0.85rem", fontWeight: isSelected ? 700 : 600, color: isSelected ? t.primary : t.textPrimary }}>
                      {assistant}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Field 5: Status Toggle (Active / Archived / Closed) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>
              حالة القناة (Status)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", background: t.bgMuted, padding: "6px", borderRadius: "10px", border: `1px solid ${t.border}` }}>
              <button
                type="button"
                onClick={() => setFormStatus("active")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "7px",
                  border: formStatus === "active" ? `1.5px solid #10B981` : "1px solid transparent",
                  background: formStatus === "active" ? "#FFFFFF" : "transparent",
                  color: formStatus === "active" ? "#059669" : t.textSecondary,
                  fontWeight: formStatus === "active" ? 800 : 600,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "inherit",
                }}
              >
                نشطة (Active)
              </button>
              <button
                type="button"
                onClick={() => setFormStatus("archived")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "7px",
                  border: formStatus === "archived" ? `1.5px solid #F59E0B` : "1px solid transparent",
                  background: formStatus === "archived" ? "#FFFFFF" : "transparent",
                  color: formStatus === "archived" ? "#D97706" : t.textSecondary,
                  fontWeight: formStatus === "archived" ? 800 : 600,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "inherit",
                }}
              >
                مؤرشفة (Archived)
              </button>
              <button
                type="button"
                onClick={() => setFormStatus("closed")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "7px",
                  border: formStatus === "closed" ? `1.5px solid #64748B` : "1px solid transparent",
                  background: formStatus === "closed" ? "#FFFFFF" : "transparent",
                  color: formStatus === "closed" ? "#475569" : t.textSecondary,
                  fontWeight: formStatus === "closed" ? 800 : 600,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "inherit",
                }}
              >
                مغلقة (Closed)
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px", borderTop: `1px solid ${t.border}`, paddingTop: "14px" }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowChannelModal(false);
                setEditingChannel(null);
              }}
            >
              إلغاء
            </Button>
            <Button type="submit" variant="primary" style={{ padding: "0 24px" }}>
              {editingChannel ? "حفظ التعديلات" : "إنشاء القناة الآن"}
            </Button>
          </div>

        </form>
      </Modal>

      {/* 2. Delete Confirmation Modal (Prompt 2 & 5 pattern) */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setChannelToDelete(null);
        }}
        title="تأكيد حذف القناة الدراسية"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", borderRadius: "12px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#EF4444" }}>
            <ShieldAlert size={24} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.5 }}>
              تنبيه: هذا الإجراء نهائي ولا يمكن التراجع عنه. سيتم مسح جميع المحادثات والأسئلة وسجلات المساعدين المرتبطة بهذه القناة.
            </span>
          </div>

          <p style={{ fontSize: "0.9375rem", color: t.textPrimary, margin: 0, lineHeight: 1.6 }}>
            هل أنت متأكد من رغبتك في حذف القناة الدراسية: <strong style={{ color: "#EF4444" }}>{channelToDelete?.name}</strong>؟
          </p>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setChannelToDelete(null);
              }}
            >
              إلغاء والتراجع
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              style={{ padding: "0 20px" }}
            >
              <Trash2 size={15} style={{ marginLeft: "6px" }} />
              نعم، احذف القناة نهائياً
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ChannelsListPage;
