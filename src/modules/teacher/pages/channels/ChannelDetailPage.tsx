import * as React from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowRight, Users, Clock, UserCheck, MessageSquare, Send,
  Paperclip, FileText, Image as ImageIcon, ShieldAlert, CheckCircle2,
  Tv, User, Award, CornerDownLeft, MoreVertical, ThumbsUp,
  Pin, PinOff, Star, StarOff, Lock, Unlock, Trash2, Edit, CheckCircle, Shield,
  UserPlus, Phone, VolumeX, Volume2, Info, Archive, Ban, AlertTriangle
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { DataTable, Column } from "@/shared/components/ui/DataTable";
import { toast } from "@/shared/components/ui/Toast";

interface IAttachment {
  name: string;
  type: "file" | "image";
  size?: string;
}

interface IChannelMessage {
  id: string;
  senderName: string;
  senderRole: "student" | "teacher" | "assistant";
  senderAvatarText: string;
  timestamp: string;
  content: string;
  attachments?: IAttachment[];
  replyCount: number;
  isReplyToId?: string;
  likesCount?: number;
  // Prompt 4 permission & action flags
  isPinned?: boolean;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  isClosed?: boolean;
  isEditableWindow?: boolean; // For student edit time window
}

// Prompt 6: Student Roster Interface
interface IChannelStudent {
  id: string;
  name: string;
  phone: string;
  joinedDate: string;
  status: "active" | "muted" | "blocked";
}

export const ChannelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Prompt 6: Tab state (Chat Feed vs Members Panel)
  const [activeTab, setActiveTab] = React.useState<"chat" | "members">("chat");

  // Prompt 4 & 6: Mock Current Role, Permissions & Link Simulator for Testing
  const [currentRole, setCurrentRole] = React.useState<"teacher" | "assistant" | "student">("teacher");
  const [assistantCanDelete, setAssistantCanDelete] = React.useState<boolean>(true);
  const [linkedToClassroom, setLinkedToClassroom] = React.useState<boolean>(true); // Prompt 6: Mock classroom link
  const currentStudentIdentity = "عمر خالد عبد الله"; // Mock student identity when in student role

  // Prompt 7: Channel Moderation Status (Active vs Archived vs Closed)
  const [channelStatus, setChannelStatus] = React.useState<"active" | "archived" | "closed">(() => id === "ch_3" ? "archived" : "active");
  const [showModMenu, setShowModMenu] = React.useState(false);

  // New reply/message input state
  const [newMsgText, setNewMsgText] = React.useState("");
  const [replyingToMsgId, setReplyingToMsgId] = React.useState<string | null>(null);

  // Active dropdown menu message ID
  const [activeMenuMsgId, setActiveMenuMsgId] = React.useState<string | null>(null);

  // Edit Message Modal State (for Student Edit within time window)
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editingMsg, setEditingMsg] = React.useState<IChannelMessage | null>(null);
  const [editContentVal, setEditContentVal] = React.useState("");

  // Prompt 6: Student Management Modals State
  const [showAddStudentModal, setShowAddStudentModal] = React.useState(false);
  const [newStudentName, setNewStudentName] = React.useState("");
  const [newStudentPhone, setNewStudentPhone] = React.useState("");

  const [showRemoveStudentModal, setShowRemoveStudentModal] = React.useState(false);
  const [studentToRemove, setStudentToRemove] = React.useState<IChannelStudent | null>(null);

  // Mock channel header info based on ID
  const channelInfo = React.useMemo(() => {
    if (id === "ch_2") {
      return {
        name: "Chemistry Questions - مناقشات كيمياء 2 ثانوي",
        linkedTo: "الصف الثاني الثانوي - كيمياء",
        studentsCount: 98,
        assistantsCount: 1,
        lastActivity: "منذ ساعتين",
      };
    }
    if (id === "ch_3") {
      return {
        name: "Math Support - الدعم الفني لمادة الرياضيات",
        linkedTo: "باقة الجبر وحساب المثلثات",
        studentsCount: 230,
        assistantsCount: 3,
        lastActivity: "أمس",
      };
    }
    // Default / ch_1
    return {
      name: "Physics Q&A - أسئلة ومناقشات فيزياء 3 ثانوي",
      linkedTo: "باقة فيزياء الصف الثالث الثانوي",
      studentsCount: 145,
      assistantsCount: 2,
      lastActivity: "منذ 5 دقائق",
    };
  }, [id]);

  // Mock messages feed matching Prompt 3 & 4 requirements
  const [messages, setMessages] = React.useState<IChannelMessage[]>([
    {
      id: "msg_1",
      senderName: "عمر خالد عبد الله",
      senderRole: "student",
      senderAvatarText: "ع",
      timestamp: "اليوم، 10:15 ص",
      content: "يا مستر لو سمحت، امتحان الباب الأول في الفيزياء هيكون إمتى بالظبط؟ وهل هيشمل أسئلة المقالي ولا اختياري بس؟",
      replyCount: 2,
      likesCount: 5,
      isPinned: true,
      isAnswered: true,
      isHighlighted: true,
      isEditableWindow: true,
    },
    {
      id: "msg_2",
      senderName: "د. محمد دراية",
      senderRole: "teacher",
      senderAvatarText: "م",
      timestamp: "اليوم، 10:30 ص",
      content: "أهلاً عمر، امتحان الباب الأول مجمّع وهيكون يوم الجمعة القادمة الساعة 7 مساءً على المنصة. الامتحان هيشمل 30 سؤال اختياري و 3 أسئلة مقالية قصيرة، بالتوفيق للجميع!",
      attachments: [
        { name: "جدول_امتحانات_شهر_أكتوبر_2026.pdf", type: "file", size: "1.2 MB" }
      ],
      replyCount: 0,
      isReplyToId: "msg_1",
      likesCount: 14,
    },
    {
      id: "msg_3",
      senderName: "سارة محمد أحمد",
      senderRole: "student",
      senderAvatarText: "س",
      timestamp: "اليوم، 11:40 ص",
      content: "الفيديو الرابع في باقة الفيزياء (قانون أوم للدائرة المغلقة) مش شغال وبيجيب شاشة سوداء بعد الدقيقة 12، ممكن مساعدة يا بشمهندسين؟",
      attachments: [
        { name: "error_screenshot_vid4.png", type: "image", size: "840 KB" }
      ],
      replyCount: 1,
      likesCount: 3,
      isAnswered: true,
      isClosed: true,
      isEditableWindow: false,
    },
    {
      id: "msg_4",
      senderName: "أحمد محمود",
      senderRole: "assistant",
      senderAvatarText: "أ",
      timestamp: "اليوم، 12:05 م",
      content: "تم حل مشكلة الفيديو الرابع يا شباب، السيرفر كان بيعمل تحديث دوري. تقدروا تعملوا تحديث (Refresh) للصفحة وتشغلوا الفيديو دلوقتي بدون أي مشاكل بالتوفيق!",
      replyCount: 0,
      isReplyToId: "msg_3",
      likesCount: 19,
    },
    {
      id: "msg_5",
      senderName: "محمود يوسف خالد",
      senderRole: "student",
      senderAvatarText: "م",
      timestamp: "أمس، 08:20 م",
      content: "ممكن ملخص قوانين الفصل الثاني (التأثير المغناطيسي للتيار الكهربي) في ملف PDF علشان نراجع منه قبل الكويز؟",
      replyCount: 1,
      likesCount: 8,
      isAnswered: true,
      isEditableWindow: false,
    },
    {
      id: "msg_6",
      senderName: "د. محمد دراية",
      senderRole: "teacher",
      senderAvatarText: "م",
      timestamp: "أمس، 09:00 م",
      content: "تم رفع ملخص القوانين الشامل للفصل الثاني في قسم الملفات بالباقة، ومرفق هنا أيضاً نسخة سريعة للمراجعة قبل الكويز.",
      attachments: [
        { name: "ملخص_قوانين_الفصل_الثاني_2026.pdf", type: "file", size: "3.4 MB" }
      ],
      replyCount: 0,
      isReplyToId: "msg_5",
      likesCount: 27,
    },
  ]);

  // Prompt 6: Mock Student Roster Data
  const [channelStudents, setChannelStudents] = React.useState<IChannelStudent[]>([
    { id: "stu_1", name: "عمر خالد عبد الله", phone: "01012345678", joinedDate: "2026-07-20", status: "active" },
    { id: "stu_2", name: "سارة محمد أحمد", phone: "01123456789", joinedDate: "2026-07-21", status: "active" },
    { id: "stu_3", name: "محمود يوسف خالد", phone: "01234567890", joinedDate: "2026-07-22", status: "active" },
    { id: "stu_4", name: "زياد طارق حسين", phone: "01598765432", joinedDate: "2026-07-23", status: "muted" },
    { id: "stu_5", name: "نور إبراهيم علي", phone: "01087654321", joinedDate: "2026-07-24", status: "active" },
  ]);

  // Sort messages so Pinned Messages stick visually to the top of the feed!
  const sortedMessages = React.useMemo(() => {
    const pinned = messages.filter(m => m.isPinned);
    const unpinned = messages.filter(m => !m.isPinned);
    return [...pinned, ...unpinned];
  }, [messages]);

  // Handle Send Message / Reply
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    // Check if channel is closed or archived
    if (channelStatus === "closed" && currentRole === "student") {
      toast.error("القناة مغلقة", "تم إغلاق هذه القناة من قِبل المعلم ولا يمكن للطلاب إضافة رسائل أو ردود جديدة.");
      return;
    }
    if (channelStatus === "archived") {
      toast.error("القناة مؤرشفة", "هذه القناة في وضع الأرشيف للقراءة فقط ولا يمكن إرسال رسائل جديدة.");
      return;
    }

    // Check if student is muted or blocked
    if (currentRole === "student") {
      const studentObj = channelStudents.find(s => s.name.includes(currentStudentIdentity) || currentStudentIdentity.includes(s.name));
      if (studentObj?.status === "muted") {
        toast.error("أنت في وضع الكتم (Muted)", "تم كتم حسابك في هذه القناة من قِبل المشرف، ولا يمكنك إرسال ردود مؤقتاً.");
        return;
      }
      if (studentObj?.status === "blocked") {
        toast.error("ممنوع من الكتابة (Blocked)", "تم حظر حسابك من الكتابة أو التعليق في هذه القناة بسبب مخالفة القواعد.");
        return;
      }
    }

    // Check if replying to a closed discussion
    if (replyingToMsgId) {
      const targetMsg = messages.find(m => m.id === replyingToMsgId);
      if (targetMsg?.isClosed && currentRole === "student") {
        toast.error("النقاش مغلق", "تم إغلاق هذا النقاش من قِبل المعلم ولا يمكن للطلاب إضافة ردود جديدة.");
        return;
      }
    }

    const senderName = currentRole === "teacher" ? "د. محمد دراية (أنت)" : currentRole === "assistant" ? "أحمد محمود (مساعد - أنت)" : `${currentStudentIdentity} (أنت)`;
    const senderRole = currentRole;
    const senderAvatarText = currentRole === "teacher" ? "م" : currentRole === "assistant" ? "أ" : "ع";

    const newMsg: IChannelMessage = {
      id: `msg_${Date.now()}`,
      senderName,
      senderRole,
      senderAvatarText,
      timestamp: "الآن",
      content: newMsgText.trim(),
      replyCount: 0,
      isReplyToId: replyingToMsgId || undefined,
      likesCount: 0,
      isEditableWindow: true,
    };

    if (replyingToMsgId) {
      setMessages(prev => prev.map(m => m.id === replyingToMsgId ? { ...m, replyCount: (m.replyCount || 0) + 1 } : m));
    }

    setMessages([newMsg, ...messages]);
    setNewMsgText("");
    setReplyingToMsgId(null);
    toast.success("تم إرسال رسالتك بنجاح", "تم نشر الرسالة في القناة الدراسية.");
  };

  const handleAttachmentClick = (att: IAttachment) => {
    toast.info(`تحميل الملف: ${att.name}`, `جاري تجهيز ${att.name} للمعاينة والتنزيل...`);
  };

  // Prompt 4 Actions Handlers
  const togglePinMessage = (msgId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        const nextState = !m.isPinned;
        toast.success(nextState ? "تم تثبيت الرسالة" : "تم إلغاء تثبيت الرسالة", nextState ? "تم تثبيت الرسالة في أعلى القناة ليراها جميع الطلاب." : "تم إزالة التثبيت من أعلى القناة.");
        return { ...m, isPinned: nextState };
      }
      return m;
    }));
    setActiveMenuMsgId(null);
  };

  const toggleAnsweredMessage = (msgId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        const nextState = !m.isAnswered;
        toast.success(nextState ? "تم تحديد السؤال كمجاب" : "تم إلغاء حالة الإجابة", nextState ? "ظهرت شارة (تم الرد) على السؤال بنجاح." : "تم إزالة شارة (تم الرد) من السؤال.");
        return { ...m, isAnswered: nextState };
      }
      return m;
    }));
    setActiveMenuMsgId(null);
  };

  const toggleHighlightMessage = (msgId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        const nextState = !m.isHighlighted;
        toast.success(nextState ? "تم تمييز السؤال كسؤال هام" : "تم إلغاء تمييز السؤال", nextState ? "تم تمييز السؤال بالإطار الذهبي وإشارة الأهمية." : "تم إعادة السؤال للشكل المعتاد.");
        return { ...m, isHighlighted: nextState };
      }
      return m;
    }));
    setActiveMenuMsgId(null);
  };

  const toggleCloseDiscussion = (msgId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        const nextState = !m.isClosed;
        toast.success(nextState ? "تم إغلاق النقاش" : "تم إعادة فتح النقاش", nextState ? "تم إغلاق النقاش ولن يتمكن الطلاب من إضافة ردود جديدة." : "تم فتح النقاش للسماح بالردود والمناقشة.");
        return { ...m, isClosed: nextState };
      }
      return m;
    }));
    setActiveMenuMsgId(null);
  };

  const deleteMessage = (msg: IChannelMessage) => {
    if (currentRole === "assistant" && !assistantCanDelete) {
      toast.error("صلاحية غير كافية", "تم تعطيل صلاحية الحذف لحساب المساعد في إعدادات المحاكي.");
      return;
    }
    setMessages(prev => prev.filter(m => m.id !== msg.id));
    toast.success("تم حذف الرسالة بنجاح", `تم مسح رسالة ${msg.senderName} من القناة.`);
    setActiveMenuMsgId(null);
  };

  // Prompt 7: Per-Student Mute & Block from Message Menu
  const handleMuteStudentByMessage = (studentName: string) => {
    const cleanName = studentName.replace(" (أنت)", "").trim();
    setChannelStudents(prev => prev.map(s => {
      if (s.name.includes(cleanName) || cleanName.includes(s.name)) {
        const nextStatus = s.status === "muted" ? "active" : "muted";
        toast.info(nextStatus === "muted" ? "تم كتم الطالب من القناة" : "تم إلغاء كتم الطالب", nextStatus === "muted" ? `تم منع ${cleanName} من إرسال ردود جديدة في القناة.` : `تم السماح للطالب ${cleanName} بالرد والمناقشة مجدداً.`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
    setActiveMenuMsgId(null);
  };

  const handleBlockStudentByMessage = (studentName: string) => {
    const cleanName = studentName.replace(" (أنت)", "").trim();
    setChannelStudents(prev => prev.map(s => {
      if (s.name.includes(cleanName) || cleanName.includes(s.name)) {
        const nextStatus = s.status === "blocked" ? "active" : "blocked";
        toast.warning(nextStatus === "blocked" ? "تم منع الطالب من الكتابة" : "تم إلغاء منع الطالب من الكتابة", nextStatus === "blocked" ? `تم حظر ${cleanName} من الكتابة أو التعليق في هذه القناة بالكامل.` : `تم إعادة تفعيل صلاحية الكتابة للطالب ${cleanName}.`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
    setActiveMenuMsgId(null);
  };

  const openEditModal = (msg: IChannelMessage) => {
    setEditingMsg(msg);
    setEditContentVal(msg.content);
    setShowEditModal(true);
    setActiveMenuMsgId(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMsg || !editContentVal.trim()) return;
    setMessages(prev => prev.map(m => m.id === editingMsg.id ? { ...m, content: editContentVal.trim() } : m));
    toast.success("تم تعديل الرسالة بنجاح", "تم حفظ التغييرات على رسالتك.");
    setShowEditModal(false);
    setEditingMsg(null);
  };

  // Prompt 6 & 7: Student Management Handlers
  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentPhone.trim()) return;

    const newStu: IChannelStudent = {
      id: `stu_${Date.now()}`,
      name: newStudentName.trim(),
      phone: newStudentPhone.trim(),
      joinedDate: "اليوم",
      status: "active",
    };

    setChannelStudents([newStu, ...channelStudents]);
    setNewStudentName("");
    setNewStudentPhone("");
    setShowAddStudentModal(false);
    toast.success("تم إضافة الطالب بنجاح", `تم تسجيل ${newStu.name} في القناة والمرحلة الدراسية المرتبطة.`);
  };

  const openRemoveStudentModal = (stu: IChannelStudent) => {
    setStudentToRemove(stu);
    setShowRemoveStudentModal(true);
  };

  const handleRemoveStudentConfirm = () => {
    if (!studentToRemove) return;
    setChannelStudents(prev => prev.filter(s => s.id !== studentToRemove.id));
    toast.success("تم إزالة الطالب بنجاح", `تم حذف ${studentToRemove.name} من قائمة طلاب القناة والمرحلة.`);
    setShowRemoveStudentModal(false);
    setStudentToRemove(null);
  };

  const toggleStudentMute = (stuId: string) => {
    setChannelStudents(prev => prev.map(s => {
      if (s.id === stuId) {
        const nextStatus = s.status === "muted" ? "active" : "muted";
        toast.info(nextStatus === "muted" ? "تم كتم الطالب (Muted)" : "تم إلغاء كتم الطالب", nextStatus === "muted" ? `تم منع ${s.name} من إرسال ردود جديدة في القناة.` : `تم السماح للطالب ${s.name} بالرد والمناقشة مجدداً.`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const toggleStudentBlock = (stuId: string) => {
    setChannelStudents(prev => prev.map(s => {
      if (s.id === stuId) {
        const nextStatus = s.status === "blocked" ? "active" : "blocked";
        toast.warning(nextStatus === "blocked" ? "تم منع الطالب من الكتابة (Blocked)" : "تم إلغاء منع الطالب من الكتابة", nextStatus === "blocked" ? `تم حظر ${s.name} من الكتابة في هذه القناة نهائياً.` : `تم السماح للطالب ${s.name} بالكتابة في القناة مجدداً.`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // Prompt 7: Channel Level Moderation Actions
  const toggleArchiveChannel = () => {
    const nextStatus = channelStatus === "archived" ? "active" : "archived";
    setChannelStatus(nextStatus);
    setShowModMenu(false);
    toast.success(nextStatus === "archived" ? "تم أرشفة القناة (Archived)" : "تم إلغاء أرشفة القناة", nextStatus === "archived" ? "أصبحت القناة في وضع القراءة فقط، وسيظهر شعار (مؤرشف) في قائمة القنوات." : "تم إعادة تفعيل القناة للسماح بالمشاركات والمناقشات.");
  };

  const toggleCloseChannel = () => {
    const nextStatus = channelStatus === "closed" ? "active" : "closed";
    setChannelStatus(nextStatus);
    setShowModMenu(false);
    toast.warning(nextStatus === "closed" ? "تم إغلاق القناة (Closed)" : "تم إعادة فتح القناة", nextStatus === "closed" ? "تم إغلاق القناة بالكامل، ولن يتمكن الطلاب من إضافة أسئلة أو ردود جديدة." : "تم فتح القناة للسماح بالمناقشات والتفاعل مجدداً.");
  };

  const handleCleanChannelMessages = () => {
    setShowModMenu(false);
    toast.success("تم تنظيف المحادثات المخالفة", "تم مراجعة وتصفية جميع الرسائل المخالفة وغير اللائقة من القناة الدراسية بنجاح.");
  };

  // Prompt 6 & 7: Student Table Columns Definition
  const studentColumns: Column<IChannelStudent>[] = [
    {
      header: "اسم الطالب وتاريخ الانضمام",
      accessorKey: "name",
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: "rgba(29, 110, 99, 0.1)",
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
            <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>تاريخ الانضمام: {item.joinedDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: "رقم الهاتف",
      accessorKey: "phone",
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, direction: "ltr" }}>
          <Phone size={14} color={t.textSecondary} />
          <span>{item.phone}</span>
        </div>
      ),
    },
    {
      header: "حالة الصلاحية في القناة",
      accessorKey: "status",
      cell: (item) => (
        <Badge
          variant={item.status === "active" ? "success" : item.status === "muted" ? "secondary" : "error"}
          style={{
            fontSize: "0.75rem",
            padding: "4px 10px",
            fontWeight: 700,
            background: item.status === "muted" ? "rgba(245, 158, 11, 0.15)" : item.status === "blocked" ? "rgba(239, 68, 68, 0.15)" : undefined,
            color: item.status === "muted" ? "#D97706" : item.status === "blocked" ? "#EF4444" : undefined,
          }}
        >
          {item.status === "active"
            ? "نشط ومسموح بالرد (Active)"
            : item.status === "muted"
            ? "مكتوم الصوت (Muted)"
            : "ممنوع من الكتابة (Blocked)"}
        </Badge>
      ),
    },
    {
      header: "إجراءات التحكم والإشراف (Prompt 7)",
      accessorKey: "actions",
      cell: (item) => (
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Mute Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toggleStudentMute(item.id)}
            style={{ padding: "0 8px", fontSize: "0.75rem" }}
            title={item.status === "muted" ? "إلغاء كتم الطالب والسماح له بالرد" : "كتم صوت الطالب ومنعه من الردود"}
          >
            {item.status === "muted" ? (
              <>
                <Volume2 size={13} style={{ marginLeft: "4px", color: t.success }} />
                <span>إلغاء الكتم</span>
              </>
            ) : (
              <>
                <VolumeX size={13} style={{ marginLeft: "4px", color: "#D97706" }} />
                <span>كتم الصوت (Mute)</span>
              </>
            )}
          </Button>

          {/* Block from writing Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toggleStudentBlock(item.id)}
            style={{ padding: "0 8px", fontSize: "0.75rem" }}
            title={item.status === "blocked" ? "إلغاء منع الكتابة عن الطالب" : "منع الطالب من الكتابة نهائياً في القناة"}
          >
            {item.status === "blocked" ? (
              <>
                <CheckCircle size={13} style={{ marginLeft: "4px", color: t.success }} />
                <span>إلغاء المنع</span>
              </>
            ) : (
              <>
                <Ban size={13} style={{ marginLeft: "4px", color: t.error }} />
                <span>منع الكتابة (Block)</span>
              </>
            )}
          </Button>

          {/* Delete from Channel when linked to Classroom */}
          {linkedToClassroom && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => openRemoveStudentModal(item)}
              style={{ padding: "0 8px", fontSize: "0.75rem" }}
              title="إزالة الطالب من القناة والمرحلة"
            >
              <Trash2 size={13} />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "40px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>
      
      {/* Top Back Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => navigate("/teacher/channel")}
          style={{ padding: "0", color: t.textSecondary, fontWeight: 700 }}
        >
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          العودة إلى قائمة القنوات
        </Button>
      </div>

      {/* PROMPT 4 & 6: ROLE, PERMISSION & CLASSROOM LINK SIMULATOR TOOLBAR */}
      <Card style={{
        padding: "14px 18px",
        background: "rgba(29, 110, 99, 0.05)",
        borderRadius: "12px",
        border: `1.5px dashed ${t.primary}`,
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 800, color: t.primary, fontSize: "0.85rem" }}>
            <Shield size={18} />
            <span>محاكي الصلاحيات والربط (Prompt 4, 6 & 7):</span>
          </div>
          
          <div style={{ display: "flex", gap: "6px", background: "#FFFFFF", padding: "3px", borderRadius: "8px", border: `1px solid ${t.border}` }}>
            <button
              onClick={() => { setCurrentRole("teacher"); toast.info("تم التبديل لدور المعلم", "لديك الآن الصلاحيات الكاملة: التثبيت، الإغلاق، التمييز والحذف."); }}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: currentRole === "teacher" ? `1.5px solid ${t.primary}` : "1px solid transparent",
                background: currentRole === "teacher" ? t.primary : "transparent",
                color: currentRole === "teacher" ? "#FFFFFF" : t.textSecondary,
                fontWeight: currentRole === "teacher" ? 800 : 600,
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              المعلم (Teacher)
            </button>
            <button
              onClick={() => { setCurrentRole("assistant"); toast.info("تم التبديل لدور المساعد", "صلاحيات المساعد: الرد، التثبيت، تحديد كمجاب، والحذف المشروط."); }}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: currentRole === "assistant" ? `1.5px solid #0D9488` : "1px solid transparent",
                background: currentRole === "assistant" ? "#0D9488" : "transparent",
                color: currentRole === "assistant" ? "#FFFFFF" : t.textSecondary,
                fontWeight: currentRole === "assistant" ? 800 : 600,
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              المساعد (Assistant)
            </button>
            <button
              onClick={() => { setCurrentRole("student"); toast.info("تم التبديل لدور الطالب", `أنت الآن تتصفح كطالب (${currentStudentIdentity}). لا تظهر لك أزرار التثبيت أو الحذف للآخرين.`); }}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                border: currentRole === "student" ? `1.5px solid #475569` : "1px solid transparent",
                background: currentRole === "student" ? "#475569" : "transparent",
                color: currentRole === "student" ? "#FFFFFF" : t.textSecondary,
                fontWeight: currentRole === "student" ? 800 : 600,
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              طالب (Student)
            </button>
          </div>
        </div>

        {/* Prompt 6 & 7: Classroom Link Toggle & Assistant Permission Toggle */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div
            onClick={() => {
              const nextVal = !linkedToClassroom;
              setLinkedToClassroom(nextVal);
              toast.info(nextVal ? "تم تفعيل الارتباط بالمرحلة الدراسية" : "تم إلغاء ارتباط المرحلة", nextVal ? "ظهرت الآن أزرار (إضافة / حذف طالب) المرتبطة بالمرحلة." : "أصبحت القناة مستقلة/مرتبطة بباقة عامة وتم إخفاء إضافة وحذف الطلاب اليدوي.");
            }}
            style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", background: "#FFFFFF", padding: "6px 12px", borderRadius: "8px", border: `1px solid ${t.border}`, fontSize: "0.78rem", fontWeight: 700, color: linkedToClassroom ? t.primary : t.textSecondary }}
            title="تبديل ارتباط القناة بمرحلة/فصل دراسي لاختبار ظهور أزرار الإدارة"
          >
            <input type="checkbox" checked={linkedToClassroom} readOnly style={{ cursor: "pointer" }} />
            <span>ارتباط بمرحلة دراسية (Classroom Link)</span>
          </div>

          {currentRole === "assistant" && (
            <div
              onClick={() => setAssistantCanDelete(!assistantCanDelete)}
              style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", background: "#FFFFFF", padding: "6px 12px", borderRadius: "8px", border: `1px solid ${t.border}`, fontSize: "0.78rem", fontWeight: 700, color: assistantCanDelete ? t.success : t.error }}
            >
              <input type="checkbox" checked={assistantCanDelete} readOnly style={{ cursor: "pointer" }} />
              <span>صلاحية الحذف للمساعد</span>
            </div>
          )}
        </div>
      </Card>

      {/* HEADER SECTION (Compact Info Bar at the Top - Zero Shadow) */}
      <Card style={{
        padding: "16px 20px",
        background: t.bgSurface,
        borderRadius: "14px",
        border: `1px solid ${t.border}`,
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: "rgba(29, 110, 99, 0.1)",
            color: t.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Tv size={22} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "1.125rem", fontWeight: 900, color: t.textPrimary, margin: 0 }}>
                {channelInfo.name}
              </h1>
              <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "2px 10px", fontWeight: 700, background: "rgba(29, 110, 99, 0.08)", color: t.primary }}>
                {linkedToClassroom ? "مرتبطة بمرحلة: الصف الثالث الثانوي" : channelInfo.linkedTo}
              </Badge>

              {/* Prompt 7: Channel Status Badges (Active vs Archived vs Closed) */}
              <Badge
                variant={channelStatus === "active" ? "success" : "secondary"}
                style={{
                  fontSize: "0.7rem",
                  padding: "2px 8px",
                  fontWeight: 800,
                  background: channelStatus === "archived" ? "rgba(245, 158, 11, 0.15)" : channelStatus === "closed" ? "rgba(100, 116, 139, 0.15)" : undefined,
                  color: channelStatus === "archived" ? "#D97706" : channelStatus === "closed" ? "#475569" : undefined,
                }}
              >
                {channelStatus === "active" ? "نشط (Active)" : channelStatus === "archived" ? "مؤرشف (Archived)" : "مغلق (Closed)"}
              </Badge>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.78rem", color: t.textSecondary, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Users size={14} style={{ color: t.primary }} /> الطلبة: <strong style={{ color: t.textPrimary }}>{channelStudents.length} طالب</strong>
              </span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <UserCheck size={14} style={{ color: "#9333EA" }} /> المساعدين: <strong style={{ color: t.textPrimary }}>{channelInfo.assistantsCount} مساعدين</strong>
              </span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={14} /> آخر نشاط: <strong style={{ color: t.textPrimary }}>{channelInfo.lastActivity}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Header Buttons & PROMPT 7 MODERATION MENU (...) */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", position: "relative" }}>
          <Button variant="secondary" size="sm" style={{ fontSize: "0.8125rem" }} onClick={() => toast.info("إدارة إشعارات القناة", "تم تفعيل التنبيهات الفورية لهذه القناة.")}>
            إعدادات التنبيهات
          </Button>
          <Button variant="primary" size="sm" style={{ fontSize: "0.8125rem" }} onClick={() => toast.info("تصدير محادثات القناة", "جاري إعداد تقرير شامل بأسئلة ومناقشات الطلاب...")}>
            تصدير الأسئلة
          </Button>

          {/* PROMPT 7: MODERATION OPTIONS MENU BUTTON (...) */}
          {(currentRole === "teacher" || currentRole === "assistant") && (
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setShowModMenu(!showModMenu)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: showModMenu ? `1.5px solid ${t.primary}` : `1px solid ${t.border}`,
                  background: showModMenu ? "rgba(29, 110, 99, 0.1)" : t.bgSurface,
                  color: showModMenu ? t.primary : t.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
                title="خيارات الإشراف والتحكم بالقناة (Prompt 7)"
              >
                <MoreVertical size={18} />
              </button>

              {/* MODERATION DROPDOWN POPOVER */}
              {showModMenu && (
                <div style={{
                  position: "absolute",
                  top: "42px",
                  left: "0", // RTL: opens to the left
                  background: "#FFFFFF",
                  border: `1px solid ${t.border}`,
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
                  padding: "8px",
                  zIndex: 100,
                  minWidth: "250px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: t.textDisabled, padding: "4px 8px 6px", textTransform: "uppercase", borderBottom: `1px solid ${t.border}` }}>
                    خيارات الإشراف والتحكم (Prompt 7)
                  </div>

                  {/* 1. Archive Channel */}
                  <button
                    type="button"
                    onClick={toggleArchiveChannel}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, color: channelStatus === "archived" ? t.primary : "#D97706" }}
                    className="hover:bg-amber-50"
                  >
                    <Archive size={16} />
                    <span>{channelStatus === "archived" ? "إلغاء أرشفة القناة" : "أرشفة القناة (Archive Channel)"}</span>
                  </button>

                  {/* 2. Close Channel */}
                  <button
                    type="button"
                    onClick={toggleCloseChannel}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, color: channelStatus === "closed" ? t.success : "#475569" }}
                    className="hover:bg-slate-100"
                  >
                    <Lock size={16} />
                    <span>{channelStatus === "closed" ? "إعادة فتح القناة" : "إغلاق القناة (Close Channel)"}</span>
                  </button>

                  <div style={{ height: "1px", background: t.border, margin: "4px 0" }} />

                  {/* 3. Clean Messages / Moderation */}
                  <button
                    type="button"
                    onClick={handleCleanChannelMessages}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, color: t.textPrimary }}
                    className="hover:bg-slate-100"
                  >
                    <Trash2 size={16} style={{ color: t.error }} />
                    <span>تنظيف المحادثات المخالفة</span>
                  </button>

                  {/* 4. Muted / Blocked Students Management */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowModMenu(false);
                      setActiveTab("members");
                      toast.info("إدارة الطلاب المكتومين والمحظورين", "يمكنك التحكم في حالات الكتم ومنع الكتابة للطلاب من جدول الأعضاء أدناه.");
                    }}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, color: t.textPrimary }}
                    className="hover:bg-slate-100"
                  >
                    <VolumeX size={16} style={{ color: "#D97706" }} />
                    <span>إدارة الطلاب المكتومين والمحظورين</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* PROMPT 6 & 7: TABS NAVIGATION (Chat Feed vs Members Panel) */}
      <div style={{
        display: "flex",
        background: t.bgSurface,
        padding: "6px",
        borderRadius: "14px",
        border: `1px solid ${t.border}`,
        gap: "8px",
      }}>
        <button
          onClick={() => setActiveTab("chat")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 18px",
            borderRadius: "10px",
            border: activeTab === "chat" ? `1.5px solid ${t.primary}` : "1px solid transparent",
            background: activeTab === "chat" ? "rgba(29, 110, 99, 0.08)" : "transparent",
            color: activeTab === "chat" ? t.primary : t.textSecondary,
            fontWeight: activeTab === "chat" ? 800 : 600,
            fontSize: "0.9375rem",
            cursor: "pointer",
            transition: "all 150ms ease",
            fontFamily: "inherit",
          }}
        >
          <MessageSquare size={18} />
          <span>المناقشات والأسئلة (Questions Feed)</span>
          <Badge variant="secondary" style={{ fontSize: "0.72rem", padding: "1px 8px", background: activeTab === "chat" ? t.primary : t.bgMuted, color: activeTab === "chat" ? "#FFFFFF" : t.textSecondary }}>
            {messages.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("members")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 18px",
            borderRadius: "10px",
            border: activeTab === "members" ? `1.5px solid ${t.primary}` : "1px solid transparent",
            background: activeTab === "members" ? "rgba(29, 110, 99, 0.08)" : "transparent",
            color: activeTab === "members" ? t.primary : t.textSecondary,
            fontWeight: activeTab === "members" ? 800 : 600,
            fontSize: "0.9375rem",
            cursor: "pointer",
            transition: "all 150ms ease",
            fontFamily: "inherit",
          }}
        >
          <Users size={18} />
          <span>أعضاء القناة والإشراف (Members Panel)</span>
          <Badge variant="secondary" style={{ fontSize: "0.72rem", padding: "1px 8px", background: activeTab === "members" ? t.primary : t.bgMuted, color: activeTab === "members" ? "#FFFFFF" : t.textSecondary }}>
            {channelStudents.length + 3}
          </Badge>
        </button>
      </div>

      {/* ==================== TAB 1: CHAT FEED (PROMPT 3, 4 & 7) ==================== */}
      {activeTab === "chat" && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          background: t.bgSurface,
          borderRadius: "16px",
          border: `1px solid ${t.border}`,
          boxShadow: "none",
          overflow: "hidden",
        }}>
          
          {/* Frame Top Subheader */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 20px",
            borderBottom: `1px solid ${t.border}`,
            background: "#FFFFFF",
            flexWrap: "wrap",
            gap: "10px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: t.textPrimary, margin: 0 }}>
                شريط المناقشات والأسئلة (Questions Feed)
              </h2>
              <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "2px 8px", fontWeight: 700 }}>
                {messages.length} رسالة
              </Badge>
            </div>
            <div style={{ fontSize: "0.78rem", color: t.textSecondary, fontWeight: 600 }}>
              الأسئلة المثبتة تظهر في الأعلى أولاً • خيارات (الكتم / منع الكتابة) متاحة من قائمة (…) على رسائل الطلاب
            </div>
          </div>

          {/* Scrollable Messages Area within Frame */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "18px 20px",
            background: "#F8FAFC",
            maxHeight: "620px",
            overflowY: "auto",
          }}>
            {sortedMessages.map(msg => {
              const isStaff = msg.senderRole === "teacher" || msg.senderRole === "assistant";
              const isTeacher = msg.senderRole === "teacher";
              const isAssistant = msg.senderRole === "assistant";

              const isOwnStudentMessage = currentRole === "student" && (msg.senderName.includes(currentStudentIdentity) || msg.senderName.includes("(أنت)"));
              const canReply = (currentRole === "teacher" || currentRole === "assistant") && channelStatus === "active";

              const canShowTeacherActions = currentRole === "teacher";
              const canShowAssistantActions = currentRole === "assistant";
              const canShowStudentActions = isOwnStudentMessage && channelStatus === "active";
              const showActionMenu = canShowTeacherActions || canShowAssistantActions || canShowStudentActions;

              // Check if student sender is currently muted or blocked in our channelStudents roster
              const senderStudentObj = !isStaff ? channelStudents.find(s => msg.senderName.includes(s.name) || s.name.includes(msg.senderName)) : null;
              const isSenderMuted = senderStudentObj?.status === "muted";
              const isSenderBlocked = senderStudentObj?.status === "blocked";

              return (
                <div
                  key={msg.id}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    background: isStaff ? "rgba(29, 110, 99, 0.05)" : "#FFFFFF",
                    border: msg.isHighlighted
                      ? `2px solid #F59E0B`
                      : isStaff
                      ? `1px solid rgba(29, 110, 99, 0.22)`
                      : `1px solid ${t.border}`,
                    borderRight: msg.isHighlighted
                      ? `6px solid #F59E0B`
                      : isStaff
                      ? `4px solid ${t.primary}`
                      : `1px solid ${t.border}`,
                    marginLeft: isStaff ? "0px" : "36px",
                    marginRight: isStaff ? "36px" : "0px",
                    transition: "all 150ms ease",
                    boxShadow: "none",
                    position: "relative",
                    opacity: isSenderBlocked ? 0.6 : 1,
                  }}
                >
                  {/* Pinned Message Banner Header if isPinned */}
                  {msg.isPinned && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(29, 110, 99, 0.12)",
                      color: t.primary,
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      marginBottom: "10px",
                      width: "fit-content",
                    }}>
                      <Pin size={13} style={{ fill: t.primary }} />
                      <span>📌 مثبت في أعلى القناة (Pinned Question)</span>
                    </div>
                  )}

                  {/* Message Top Bar: Avatar, Sender Name, Role Badge, Status Badges, Timestamp & Action Menu */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* Avatar */}
                      <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: isTeacher ? t.primary : isAssistant ? "rgba(13, 148, 136, 0.15)" : "rgba(100, 116, 139, 0.1)",
                        color: isTeacher ? "#FFFFFF" : isAssistant ? t.primary : t.textSecondary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}>
                        {isTeacher ? <Award size={18} /> : msg.senderAvatarText}
                      </div>

                      {/* Name, Role & Prompt 4/7 Badges */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: 800, color: isStaff ? t.primary : t.textPrimary }}>
                            {msg.senderName}
                          </span>
                          
                          {isTeacher && (
                            <Badge variant="primary" style={{ fontSize: "0.65rem", padding: "1px 6px", fontWeight: 800, background: t.primary, color: "#FFFFFF" }}>
                              <CheckCircle2 size={10} style={{ marginLeft: "3px" }} />
                              المعلم (Teacher)
                            </Badge>
                          )}

                          {isAssistant && (
                            <Badge variant="secondary" style={{ fontSize: "0.65rem", padding: "1px 6px", fontWeight: 700, background: "rgba(13, 148, 136, 0.15)", color: t.primary }}>
                              <UserCheck size={10} style={{ marginLeft: "3px" }} />
                              مساعد المعلم (Assistant)
                            </Badge>
                          )}

                          {!isStaff && (
                            <span style={{ fontSize: "0.7rem", color: t.textSecondary, background: t.bgMuted, padding: "1px 6px", borderRadius: "5px", fontWeight: 600 }}>
                              طالب / استفسار
                            </span>
                          )}

                          {/* Prompt 7: Show Muted / Blocked Badge on message sender if active */}
                          {isSenderMuted && (
                            <Badge variant="secondary" style={{ fontSize: "0.68rem", padding: "2px 8px", fontWeight: 800, background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}>
                              🔇 مكتوم الصوت (Muted)
                            </Badge>
                          )}

                          {isSenderBlocked && (
                            <Badge variant="error" style={{ fontSize: "0.68rem", padding: "2px 8px", fontWeight: 800, background: "rgba(239, 68, 68, 0.15)", color: "#EF4444" }}>
                              🚫 ممنوع من الكتابة (Blocked)
                            </Badge>
                          )}

                          {msg.isAnswered && (
                            <Badge variant="success" style={{ fontSize: "0.68rem", padding: "2px 8px", fontWeight: 800, background: "rgba(16, 185, 129, 0.15)", color: "#059669" }}>
                              <CheckCircle size={12} style={{ marginLeft: "4px" }} />
                              تم الرد (Answered)
                            </Badge>
                          )}

                          {msg.isHighlighted && (
                            <Badge variant="secondary" style={{ fontSize: "0.68rem", padding: "2px 8px", fontWeight: 800, background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}>
                              ⭐ سؤال هام
                            </Badge>
                          )}

                          {msg.isClosed && (
                            <Badge variant="secondary" style={{ fontSize: "0.68rem", padding: "2px 8px", fontWeight: 800, background: "rgba(100, 116, 139, 0.15)", color: "#475569" }}>
                              🔒 نقاش مغلق
                            </Badge>
                          )}
                        </div>

                        {msg.isReplyToId && (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: t.primary, fontWeight: 600 }}>
                            <CornerDownLeft size={11} />
                            <span>رداً على استفسار سابق في القناة</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side of Top Bar: Timestamp & Action Menu Trigger */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: t.textSecondary, fontWeight: 600 }}>
                        <Clock size={12} />
                        <span>{msg.timestamp}</span>
                      </div>

                      {showActionMenu && (
                        <div style={{ position: "relative" }}>
                          <button
                            type="button"
                            onClick={() => setActiveMenuMsgId(activeMenuMsgId === msg.id ? null : msg.id)}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "6px",
                              border: activeMenuMsgId === msg.id ? `1px solid ${t.primary}` : "1px solid transparent",
                              background: activeMenuMsgId === msg.id ? "rgba(29, 110, 99, 0.1)" : "transparent",
                              color: activeMenuMsgId === msg.id ? t.primary : t.textSecondary,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "all 120ms ease",
                            }}
                            className="hover:background-slate-200/60"
                            title="إجراءات وصلاحيات الرسالة والإشراف (Prompt 7)"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activeMenuMsgId === msg.id && (
                            <div style={{
                              position: "absolute",
                              top: "32px",
                              left: "0",
                              background: "#FFFFFF",
                              border: `1px solid ${t.border}`,
                              borderRadius: "10px",
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                              padding: "6px",
                              zIndex: 50,
                              minWidth: "220px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}>
                              {currentRole === "teacher" && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => togglePinMessage(msg.id)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.textPrimary }}
                                    className="hover:bg-slate-100"
                                  >
                                    {msg.isPinned ? <PinOff size={15} style={{ color: t.textSecondary }} /> : <Pin size={15} style={{ color: t.primary }} />}
                                    <span>{msg.isPinned ? "إلغاء تثبيت الرسالة" : "تثبيت في أعلى القناة"}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => toggleAnsweredMessage(msg.id)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.textPrimary }}
                                    className="hover:bg-slate-100"
                                  >
                                    <CheckCircle size={15} style={{ color: "#059669" }} />
                                    <span>{msg.isAnswered ? "إلغاء تحديد كمجاب" : "تحديد كمجاب (Answered)"}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => toggleHighlightMessage(msg.id)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.textPrimary }}
                                    className="hover:bg-slate-100"
                                  >
                                    {msg.isHighlighted ? <StarOff size={15} style={{ color: t.textSecondary }} /> : <Star size={15} style={{ color: "#D97706" }} />}
                                    <span>{msg.isHighlighted ? "إلغاء تمييز السؤال" : "تمييز كـ سؤال هام"}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => toggleCloseDiscussion(msg.id)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.textPrimary }}
                                    className="hover:bg-slate-100"
                                  >
                                    {msg.isClosed ? <Unlock size={15} style={{ color: t.success }} /> : <Lock size={15} style={{ color: t.textSecondary }} />}
                                    <span>{msg.isClosed ? "إعادة فتح النقاش" : "إغلاق النقاش ومنع الردود"}</span>
                                  </button>

                                  {/* Prompt 7: Per-student Mute / Block from message menu */}
                                  {!isStaff && (
                                    <>
                                      <div style={{ height: "1px", background: t.border, margin: "4px 0" }} />
                                      <button
                                        type="button"
                                        onClick={() => handleMuteStudentByMessage(msg.senderName)}
                                        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: isSenderMuted ? t.success : "#D97706" }}
                                        className="hover:bg-amber-50"
                                      >
                                        <VolumeX size={15} />
                                        <span>{isSenderMuted ? "إلغاء كتم الطالب (Unmute)" : "كتم الطالب (Mute Student)"}</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleBlockStudentByMessage(msg.senderName)}
                                        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: isSenderBlocked ? t.success : "#EF4444" }}
                                        className="hover:bg-red-50"
                                      >
                                        <Ban size={15} />
                                        <span>{isSenderBlocked ? "إلغاء حظر الكتابة عن الطالب" : "منع الطالب من الكتابة (Block)"}</span>
                                      </button>
                                    </>
                                  )}

                                  <div style={{ height: "1px", background: t.border, margin: "4px 0" }} />

                                  <button
                                    type="button"
                                    onClick={() => deleteMessage(msg)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.error }}
                                    className="hover:bg-red-50"
                                  >
                                    <Trash2 size={15} />
                                    <span>حذف الرسالة</span>
                                  </button>
                                </>
                              )}

                              {currentRole === "assistant" && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => togglePinMessage(msg.id)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.textPrimary }}
                                    className="hover:bg-slate-100"
                                  >
                                    {msg.isPinned ? <PinOff size={15} style={{ color: t.textSecondary }} /> : <Pin size={15} style={{ color: t.primary }} />}
                                    <span>{msg.isPinned ? "إلغاء تثبيت الرسالة" : "تثبيت في أعلى القناة"}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => toggleAnsweredMessage(msg.id)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.textPrimary }}
                                    className="hover:bg-slate-100"
                                  >
                                    <CheckCircle size={15} style={{ color: "#059669" }} />
                                    <span>{msg.isAnswered ? "إلغاء تحديد كمجاب" : "تحديد كمجاب (Answered)"}</span>
                                  </button>

                                  {/* Prompt 7: Assistant can also mute students if permitted */}
                                  {!isStaff && (
                                    <>
                                      <div style={{ height: "1px", background: t.border, margin: "4px 0" }} />
                                      <button
                                        type="button"
                                        onClick={() => handleMuteStudentByMessage(msg.senderName)}
                                        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: isSenderMuted ? t.success : "#D97706" }}
                                        className="hover:bg-amber-50"
                                      >
                                        <VolumeX size={15} />
                                        <span>{isSenderMuted ? "إلغاء كتم الطالب (Unmute)" : "كتم الطالب (Mute Student)"}</span>
                                      </button>
                                    </>
                                  )}

                                  <div style={{ height: "1px", background: t.border, margin: "4px 0" }} />

                                  <button
                                    type="button"
                                    onClick={() => deleteMessage(msg)}
                                    disabled={!assistantCanDelete}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      padding: "8px 10px",
                                      borderRadius: "6px",
                                      background: "transparent",
                                      border: "none",
                                      width: "100%",
                                      textAlign: "right",
                                      cursor: assistantCanDelete ? "pointer" : "not-allowed",
                                      fontSize: "0.8rem",
                                      fontWeight: 700,
                                      color: assistantCanDelete ? t.error : t.textSecondary,
                                      opacity: assistantCanDelete ? 1 : 0.5,
                                    }}
                                    className={assistantCanDelete ? "hover:bg-red-50" : ""}
                                    title={assistantCanDelete ? "حذف هذه الرسالة" : "ليس لديك صلاحية الحذف الإشرافية"}
                                  >
                                    <Trash2 size={15} />
                                    <span>حذف الرسالة {assistantCanDelete ? "" : "(محظور)"}</span>
                                  </button>
                                </>
                              )}

                              {currentRole === "student" && isOwnStudentMessage && (
                                <>
                                  {msg.isEditableWindow ? (
                                    <button
                                      type="button"
                                      onClick={() => openEditModal(msg)}
                                      style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.primary }}
                                      className="hover:bg-slate-100"
                                    >
                                      <Edit size={15} />
                                      <span>تعديل رسالتي (ضمن نافذة التعديل)</span>
                                    </button>
                                  ) : (
                                    <div style={{ padding: "8px 10px", fontSize: "0.75rem", color: t.textSecondary, fontWeight: 600 }}>
                                      ⏳ انتهت مهلة تعديل هذه الرسالة
                                    </div>
                                  )}

                                  <div style={{ height: "1px", background: t.border, margin: "4px 0" }} />

                                  <button
                                    type="button"
                                    onClick={() => deleteMessage(msg)}
                                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "6px", background: "transparent", border: "none", width: "100%", textAlign: "right", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, color: t.error }}
                                    className="hover:bg-red-50"
                                  >
                                    <Trash2 size={15} />
                                    <span>حذف رسالتي</span>
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <p style={{
                    fontSize: "0.88rem",
                    color: t.textPrimary,
                    lineHeight: 1.65,
                    margin: "0 0 10px 0",
                    whiteSpace: "pre-wrap",
                    paddingRight: "44px",
                  }}>
                    {msg.content}
                  </p>

                  {/* Attachments Chips if present */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingRight: "44px", marginBottom: "10px" }}>
                      {msg.attachments.map((att, i) => (
                        <div
                          key={i}
                          onClick={() => handleAttachmentClick(att)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            borderRadius: "7px",
                            background: "#FFFFFF",
                            border: `1px solid ${t.borderStrong}`,
                            cursor: "pointer",
                            transition: "all 150ms ease",
                          }}
                          className="hover:border-teal-700"
                        >
                          {att.type === "image" ? (
                            <ImageIcon size={14} style={{ color: "#0D9488" }} />
                          ) : (
                            <FileText size={14} style={{ color: "#2563EB" }} />
                          )}
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: t.textPrimary }}>
                            {att.name}
                          </span>
                          {att.size && (
                            <span style={{ fontSize: "0.68rem", color: t.textSecondary, background: t.bgMuted, padding: "1px 5px", borderRadius: "4px" }}>
                              {att.size}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Footer: Reply Count Badge & Actions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${t.border}`, paddingTop: "8px", paddingRight: "44px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {msg.replyCount > 0 ? (
                        <Badge
                          variant="secondary"
                          onClick={() => {
                            if (!canReply) {
                              toast.info("عرض الردود", `هذا السؤال يحتوي على ${msg.replyCount} ردود في القناة.`);
                              return;
                            }
                            setReplyingToMsgId(msg.id);
                            toast.info("الرد على الاستفسار", `يمكنك الآن كتابة ردك على رسالة ${msg.senderName} في صندوق الكتابة بأسفل الصفحة.`);
                          }}
                          style={{
                            fontSize: "0.75rem",
                            padding: "3px 10px",
                            fontWeight: 800,
                            background: "rgba(29, 110, 99, 0.1)",
                            color: t.primary,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>{msg.replyCount} {msg.replyCount === 1 ? "رد" : "ردود"}</span>
                        </Badge>
                      ) : canReply ? (
                        <span
                          onClick={() => {
                            setReplyingToMsgId(msg.id);
                            toast.info("الرد على الاستفسار", `يمكنك الآن كتابة ردك على رسالة ${msg.senderName} في صندوق الكتابة بأسفل الصفحة.`);
                          }}
                          style={{ fontSize: "0.75rem", color: t.primary, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                          className="hover:underline"
                        >
                          <CornerDownLeft size={13} />
                          أضف رداً على هذا الاستفسار...
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 600 }}>
                          لا توجد ردود بعد
                        </span>
                      )}

                      <div
                        onClick={() => toast.success("تم تسجيل الإعجاب", "تم الإعجاب بالرسالة بنجاح.")}
                        style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: t.textSecondary, fontWeight: 700, cursor: "pointer" }}
                        className="hover:text-teal-700"
                      >
                        <ThumbsUp size={13} />
                        <span>{msg.likesCount || 0}</span>
                      </div>
                    </div>

                    {canReply && !msg.isClosed && (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setReplyingToMsgId(msg.id);
                            toast.info("الرد المباشر", `جاري تجهيز الرد على ${msg.senderName}...`);
                          }}
                          style={{ fontSize: "0.72rem", padding: "2px 10px", height: "26px" }}
                        >
                          <CornerDownLeft size={12} style={{ marginLeft: "4px" }} />
                          رد
                        </Button>
                      </div>
                    )}

                    {msg.isClosed && (
                      <div style={{ fontSize: "0.72rem", color: "#475569", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                        <Lock size={12} />
                        <span>النقاش مغلق</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ATTACHED INPUT BAR (Bottom of Frame - Zero Shadow) */}
          <div style={{
            padding: "14px 20px",
            background: "#FFFFFF",
            borderTop: `1px solid ${t.border}`,
          }}>
            <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              
              {replyingToMsgId && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(29, 110, 99, 0.08)", padding: "6px 12px", borderRadius: "8px", fontSize: "0.78rem", color: t.primary, fontWeight: 700 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CornerDownLeft size={13} />
                    <span>أنت الآن ترد على استفسار الطالب في القناة...</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReplyingToMsgId(null)}
                    style={{ background: "transparent", border: "none", color: t.textSecondary, cursor: "pointer", fontSize: "0.72rem", fontWeight: 700 }}
                  >
                    [إلغاء الرد]
                  </button>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <Input
                    placeholder={
                      channelStatus === "archived"
                        ? "هذه القناة مؤرشفة (Archived) - الكتابة معطلة حالياً..."
                        : channelStatus === "closed"
                        ? "هذه القناة مغلقة (Closed) - الردود متوقفة حالياً..."
                        : currentRole === "student"
                        ? "اكتب استفسارك أو سؤالك ليراه معلم ومساعدو القناة..."
                        : replyingToMsgId
                        ? "اكتب ردك الواضح على هذا الاستفسار الآن..."
                        : "اكتب إعلاناً أو توضيحاً جديداً لجميع طلاب القناة..."
                    }
                    value={newMsgText}
                    onChange={setNewMsgText}
                    icon={<MessageSquare size={15} />}
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => toast.info("إرفاق ملف أو صورة", "يمكنك رفع ملفات PDF أو صور توضيحية للإجابة.")}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "8px",
                    border: `1px solid ${t.border}`,
                    background: t.bgMuted,
                    color: t.textSecondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                  title="إرفاق ملف أو صورة (PDF / PNG)"
                >
                  <Paperclip size={17} />
                </button>

                <Button
                  type="submit"
                  variant="primary"
                  style={{ height: "42px", padding: "0 20px", fontSize: "0.85rem" }}
                  disabled={channelStatus !== "active" && currentRole === "student"}
                >
                  <Send size={15} style={{ marginLeft: "6px" }} />
                  إرسال
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: MEMBERS PANEL (PROMPT 6 & 7) ==================== */}
      {activeTab === "members" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Prompt 6: Classroom Link Note / Status Banner */}
          <div style={{
            padding: "16px 20px",
            background: linkedToClassroom ? "rgba(29, 110, 99, 0.08)" : "rgba(59, 130, 246, 0.08)",
            border: linkedToClassroom ? `1.5px solid ${t.primary}` : `1.5px solid #3B82F6`,
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
              <Info size={22} style={{ color: linkedToClassroom ? t.primary : "#2563EB", flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <strong style={{ fontSize: "0.9375rem", color: t.textPrimary }}>
                  {linkedToClassroom
                    ? "القناة مرتبطة بمرحلة وفصل دراسي (Classroom Link Active)"
                    : "قناة مستقلة أو مرتبطة بباقة عامة (General Package Channel)"}
                </strong>
                <span style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.5 }}>
                  {linkedToClassroom
                    ? "تتم مزامنة قائمة الطلاب المعروضة أدناه تلقائياً مع طلاب الفصل الدراسي المربوط بهذه القناة، كما يمكنك إضافة وإزالة الطلاب يدوياً هنا."
                    : "تتم إدارة الانضمام التلقائي للطلاب من خلال اشتراكات الباقة التعليمية مباشرة دون الحاجة للتحكم اليدوي."}
                </span>
              </div>
            </div>

            {linkedToClassroom && currentRole !== "student" && (
              <Button variant="primary" size="sm" onClick={() => setShowAddStudentModal(true)} style={{ flexShrink: 0 }}>
                <UserPlus size={16} style={{ marginLeft: "6px" }} />
                إضافة طالب للقناة والمرحلة
              </Button>
            )}
          </div>

          {/* SECTION 1: TEACHERS & ASSISTANTS ROSTER */}
          <Card style={{ padding: "20px", borderRadius: "14px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${t.border}`, paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={20} style={{ color: t.primary }} />
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, margin: 0 }}>
                  المعلم الرئيسي والمساعدون (Staff & Assistants)
                </h3>
                <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "2px 8px", fontWeight: 700 }}>
                  {channelInfo.assistantsCount + 1} مشرف
                </Badge>
              </div>
              <div style={{ fontSize: "0.8125rem", color: t.textSecondary }}>
                المشرفون يمتلكون صلاحيات الرد وإدارة المحادثات والإشراف
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
              {/* Owner Card */}
              <div style={{
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(29, 110, 99, 0.08)",
                border: `1.5px solid ${t.primary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: t.primary, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.1rem" }}>
                    م
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, color: t.textPrimary, display: "block", fontSize: "0.95rem" }}>د. محمد دراية</span>
                    <Badge variant="primary" style={{ fontSize: "0.7rem", padding: "1px 8px", marginTop: "4px", fontWeight: 800 }}>
                      المعلم الرئيسي (Owner)
                    </Badge>
                  </div>
                </div>
                <span style={{ fontSize: "0.75rem", color: t.success, fontWeight: 700, background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "6px" }}>
                  متصل الآن
                </span>
              </div>

              {/* Assistant 1 */}
              <div style={{
                padding: "14px 16px",
                borderRadius: "12px",
                background: t.bgSurface,
                border: `1px solid ${t.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(13, 148, 136, 0.15)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>
                    أ
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, color: t.textPrimary, display: "block", fontSize: "0.95rem" }}>أحمد محمود</span>
                    <span style={{ fontSize: "0.78rem", color: t.textSecondary }}>مساعد فيزياء (Assistant)</span>
                  </div>
                </div>
                <Badge variant="secondary" style={{ fontSize: "0.72rem", padding: "2px 8px", fontWeight: 700 }}>
                  نشط
                </Badge>
              </div>

              {/* Assistant 2 */}
              <div style={{
                padding: "14px 16px",
                borderRadius: "12px",
                background: t.bgSurface,
                border: `1px solid ${t.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(13, 148, 136, 0.15)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>
                    س
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, color: t.textPrimary, display: "block", fontSize: "0.95rem" }}>سارة علي</span>
                    <span style={{ fontSize: "0.78rem", color: t.textSecondary }}>مساعد كيمياء (Assistant)</span>
                  </div>
                </div>
                <Badge variant="secondary" style={{ fontSize: "0.72rem", padding: "2px 8px", fontWeight: 700 }}>
                  نشط
                </Badge>
              </div>
            </div>
          </Card>

          {/* SECTION 2: STUDENTS ROSTER & MANAGEMENT TABLE */}
          <Card style={{ padding: "20px", borderRadius: "14px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${t.border}`, paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={20} style={{ color: t.primary }} />
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, margin: 0 }}>
                  الطلبة المنضمون للقناة وإشراف المشاركات (Students Roster & Moderation)
                </h3>
                <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "2px 8px", fontWeight: 700 }}>
                  إجمالي الطلاب: {channelStudents.length} طالب
                </Badge>
              </div>

              {linkedToClassroom && currentRole !== "student" && (
                <Button variant="secondary" size="sm" onClick={() => setShowAddStudentModal(true)}>
                  <UserPlus size={15} style={{ marginLeft: "4px" }} />
                  إضافة طالب جديد
                </Button>
              )}
            </div>

            <DataTable
              columns={studentColumns}
              data={channelStudents}
              emptyTitle="لا يوجد طلاب مسجلون بالقناة حالياً"
              pageSize={10}
            />
          </Card>

        </div>
      )}

      {/* ==================== MODALS ==================== */}

      {/* PROMPT 4: EDIT MESSAGE MODAL (For Students editing within time window) */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="تعديل رسالتك">
        <form onSubmit={handleEditSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.textPrimary }}>
              محتوى السؤال / الرسالة
            </label>
            <textarea
              value={editContentVal}
              onChange={(e) => setEditContentVal(e.target.value)}
              style={{
                minHeight: "100px",
                padding: "12px 14px",
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
              required
            />
          </div>
          <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>
            * يُسمح بتعديل الرسالة خلال مهلة 15 دقيقة من وقت إرسالها فقط.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "4px" }}>
            <Button type="button" variant="secondary" onClick={() => setShowEditModal(false)}>إلغاء</Button>
            <Button type="submit" variant="primary">حفظ التعديلات</Button>
          </div>
        </form>
      </Modal>

      {/* PROMPT 6: ADD STUDENT MODAL */}
      <Modal isOpen={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} title="إضافة طالب جديد للقناة والمرحلة">
        <form onSubmit={handleAddStudentSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="اسم الطالب ثلاثي أو رباعي"
            placeholder="مثال: أحمد محمد علي حسن..."
            value={newStudentName}
            onChange={setNewStudentName}
            required
          />
          <Input
            label="رقم الهاتف الأساسي (واتساب / تواصل)"
            placeholder="010xxxxxx"
            value={newStudentPhone}
            onChange={setNewStudentPhone}
            required
          />
          <div style={{ padding: "10px 12px", background: "rgba(29, 110, 99, 0.08)", borderRadius: "8px", fontSize: "0.8125rem", color: t.primary, fontWeight: 600 }}>
            ℹ️ سيتم تسجيل هذا الطالب في قائمة طلاب القناة ومزامنته فوراً مع طلاب الفصل الدراسي المرتبط.
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "4px" }}>
            <Button type="button" variant="secondary" onClick={() => setShowAddStudentModal(false)}>إلغاء</Button>
            <Button type="submit" variant="primary">إضافة الطالب الآن</Button>
          </div>
        </form>
      </Modal>

      {/* PROMPT 6: REMOVE STUDENT CONFIRMATION MODAL */}
      <Modal isOpen={showRemoveStudentModal} onClose={() => setShowRemoveStudentModal(false)} title="تأكيد إزالة الطالب من القناة والمرحلة">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
            هل أنت متأكد من حذف الطالب <strong>{studentToRemove?.name}</strong> من قائمة طلاب القناة والمرحلة الدراسية المرتبطة؟ لن يتمكن الطالب من رؤية المحادثات أو المشاركة بعد الآن.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowRemoveStudentModal(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={handleRemoveStudentConfirm}>حذف الطالب</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ChannelDetailPage;
