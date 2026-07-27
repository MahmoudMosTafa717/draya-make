import * as React from "react";
import {
  MessageSquare, Star, TrendingUp, Lightbulb, Inbox,
  Search, ChevronDown, Trash2, Archive, CheckCircle,
  X, Square, CheckSquare, FileText, Image as ImageIcon,
  Calendar, User, Copy, AlertTriangle,
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type FeedbackStatus = "new" | "reviewed" | "archived";
type FeedbackType = "content" | "video" | "exam" | "platform" | "suggestion" | "other";

interface IAttachment {
  name: string;
  type: "image" | "file";
  size: string;
}

interface IFeedback {
  id: string;
  studentName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  type: FeedbackType;
  comment: string;
  date: string;
  status: FeedbackStatus;
  attachments?: IAttachment[];
}

// ─── Mock Data (extended with attachments) ───────────────────────────────────
const MOCK_FEEDBACKS: IFeedback[] = [
  {
    id: "fb_1",
    studentName: "عمر خالد عبد الله",
    rating: 5,
    title: "محتوى ممتاز ومنظم",
    type: "content",
    comment: "الشرح كان واضحاً جداً في الدرس الثالث والأمثلة ساعدتني على فهم القانون بشكل سريع. طريقة الشرح التدريجية من السهل للصعب ممتازة جداً. شكراً يا مستر على مجهودك الكبير!",
    date: "اليوم، 10:15 ص",
    status: "new",
  },
  {
    id: "fb_2",
    studentName: "سارة محمد أحمد",
    rating: 3,
    title: "الفيديو يحتاج تحسين",
    type: "video",
    comment: "شرح الدرس الثالث كان سريعاً بعض الشيء على الجزء المتعلق بقانون أوم. ممكن تزيد وقت الشرح في هذا الجزء أو تحط مثال إضافي؟ في الجزء ده احتجت أرجع الفيديو أكتر من مرة.",
    date: "اليوم، 09:42 ص",
    status: "new",
    attachments: [
      { name: "screenshot_lesson3.png", type: "image", size: "520 KB" },
    ],
  },
  {
    id: "fb_3",
    studentName: "محمود يوسف خالد",
    rating: 4,
    title: "امتحان الفصل الثاني",
    type: "exam",
    comment: "الامتحان كان معقولاً لكن كان فيه سؤالين من مواضيع مش اتشرحت كفاية في الفيديوهات. ياريت تراجع المنهج قبل الامتحانات عشان يكون في توافق بين محتوى الفيديوهات ومحتوى الامتحانات.",
    date: "أمس، 03:20 م",
    status: "reviewed",
  },
  {
    id: "fb_4",
    studentName: "نور إبراهيم علي",
    rating: 2,
    title: "مشكلة في تشغيل الفيديو",
    type: "platform",
    comment: "واجهت مشكلة في تشغيل فيديو الدرس الرابع. الفيديو بيوقف بعد الدقيقة 12 باستمرار وبيجيب شاشة سوداء. جربت على أكتر من جهاز والمشكلة موجودة. ارفقت صورة من الخطأ.",
    date: "منذ يومين",
    status: "new",
    attachments: [
      { name: "video_error_screenshot.png", type: "image", size: "840 KB" },
      { name: "browser_console_log.txt", type: "file", size: "12 KB" },
    ],
  },
  {
    id: "fb_5",
    studentName: "زياد طارق حسين",
    rating: 5,
    title: "اقتراح لملخصات PDF",
    type: "suggestion",
    comment: "ياريت لو تتاح ملخصات PDF جاهزة لكل وحدة مع القوانين المهمة، هتساعد جداً في المراجعة السريعة قبل الامتحانات. هعمل ملخص نموذج وارفقه هنا كمرجع.",
    date: "منذ 3 أيام",
    status: "reviewed",
    attachments: [
      { name: "ملخص_نموذجي_الوحدة_الاولى.pdf", type: "file", size: "2.1 MB" },
    ],
  },
  {
    id: "fb_6",
    studentName: "فاطمة علي حسن",
    rating: 1,
    title: "تعذر الوصول للكويز",
    type: "platform",
    comment: "الكويز الأسبوعي مكنتش قادرة أفتحه طول اليوم على موبايلي. الرابط بيجيب خطأ 404. هل في مشكلة تقنية؟ حاولت على متصفحات تانية والنتيجة نفسها.",
    date: "منذ 4 أيام",
    status: "archived",
  },
  {
    id: "fb_7",
    studentName: "أحمد حسن إبراهيم",
    rating: 4,
    title: "رأي عام ممتاز",
    type: "other",
    comment: "المنصة ممتازة بشكل عام والشرح منظم جداً. فقط أقترح إضافة خاصية المناقشة المباشرة بين الطلاب ضمن نفس الدرس، سيكون مفيداً جداً لتبادل الأسئلة والخبرات.",
    date: "منذ أسبوع",
    status: "reviewed",
  },
  {
    id: "fb_8",
    studentName: "ريم عبد الرحمن",
    rating: 5,
    title: "شرح احترافي ومميز",
    type: "content",
    comment: "أفضل منصة تعليمية تعاملت معها على الإطلاق. الشرح احترافي والمواد منظمة وسهل الوصول لكل شيء. أسلوب المعلم في التقديم مميز جداً ويشجع على الاستمرار والمذاكرة.",
    date: "منذ أسبوع",
    status: "archived",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_TABS: { key: "all" | FeedbackStatus; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "new", label: "جديد" },
  { key: "reviewed", label: "تمت المراجعة" },
  { key: "archived", label: "مؤرشف" },
];

const TYPE_OPTIONS: { value: "" | FeedbackType; label: string }[] = [
  { value: "", label: "جميع الأنواع" },
  { value: "content", label: "محتوى (Content)" },
  { value: "video", label: "فيديو (Video)" },
  { value: "exam", label: "امتحان (Exam)" },
  { value: "platform", label: "المنصة (Platform)" },
  { value: "suggestion", label: "اقتراح (Suggestion)" },
  { value: "other", label: "أخرى (Other)" },
];

const RATING_OPTIONS: { value: "" | string; label: string }[] = [
  { value: "", label: "جميع التقييمات" },
  { value: "5", label: "⭐⭐⭐⭐⭐ — 5 نجوم" },
  { value: "4", label: "⭐⭐⭐⭐ — 4 نجوم" },
  { value: "3", label: "⭐⭐⭐ — 3 نجوم" },
  { value: "2", label: "⭐⭐ — 2 نجوم" },
  { value: "1", label: "⭐ — نجمة واحدة" },
];

// ─── KPI data ─────────────────────────────────────────────────────────────────
const kpiCards = [
  { label: "إجمالي التقييمات", value: "128", sub: "+12 هذا الأسبوع", trend: "up" as const, icon: <Inbox size={18} />, iconBg: t.primary100, iconColor: t.primary },
  { label: "تقييمات جديدة", value: "15", sub: "لم تُراجَع بعد", trend: null, icon: <MessageSquare size={18} />, iconBg: "rgba(59,130,246,0.12)", iconColor: t.info },
  { label: "متوسط التقييم", value: "4.7", sub: "من 5 نجوم", trend: "up" as const, icon: <Star size={18} />, iconBg: "rgba(245,158,11,0.12)", iconColor: t.warning, isStar: true },
  { label: "المقترحات", value: "32", sub: "من إجمالي التقييمات", trend: null, icon: <Lightbulb size={18} />, iconBg: "rgba(34,197,94,0.12)", iconColor: t.success },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const StarRow: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} style={{ color: i <= rating ? t.warning : t.border, fill: i <= rating ? t.warning : "transparent", flexShrink: 0 }} />
    ))}
  </div>
);

const typeLabel: Record<FeedbackType, string> = {
  content: "محتوى", video: "فيديو", exam: "امتحان",
  platform: "المنصة", suggestion: "اقتراح", other: "أخرى",
};
const typeVariant: Record<FeedbackType, "primary" | "info" | "warning" | "error" | "success" | "ai"> = {
  content: "primary", video: "info", exam: "warning",
  platform: "error", suggestion: "success", other: "ai",
};

const StatusBadge: React.FC<{ status: FeedbackStatus }> = ({ status }) => {
  const map: Record<FeedbackStatus, { label: string; bg: string; color: string }> = {
    new:      { label: "جديد",          bg: "rgba(34,197,94,0.12)",  color: t.success },
    reviewed: { label: "تمت المراجعة", bg: "rgba(59,130,246,0.12)",  color: t.info    },
    archived: { label: "مؤرشف",        bg: t.bgMuted,                 color: t.textDisabled },
  };
  const { label, bg, color } = map[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: "999px", background: bg, color, fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
};

const FilterSelect: React.FC<{ value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }> = ({ value, onChange, options }) => (
  <div style={{ position: "relative" }}>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ height: "38px", padding: "0 32px 0 12px", borderRadius: "8px", border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface, color: t.textPrimary, fontSize: "0.8125rem", fontWeight: 600, fontFamily: "inherit", outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none", minWidth: "150px" }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <ChevronDown size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: t.textSecondary, pointerEvents: "none" }} />
  </div>
);

// ─── Detail Modal Content ─────────────────────────────────────────────────────
const DetailModalContent: React.FC<{ fb: IFeedback }> = ({ fb }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

    {/* ① Top row: large stars + meta badges */}
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
      <div>
        <StarRow rating={fb.rating} size={28} />
        <div style={{ fontSize: "0.78rem", color: t.textSecondary, marginTop: "6px", fontWeight: 600 }}>
          {fb.rating} / 5 نجوم
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <Badge variant={typeVariant[fb.type]} style={{ fontSize: "0.78rem", fontWeight: 700 }}>{typeLabel[fb.type]}</Badge>
        <StatusBadge status={fb.status} />
      </div>
    </div>

    <div style={{ height: "1px", background: t.border }} />

    {/* ② Meta info grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "8px", background: t.bgMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <User size={15} style={{ color: t.textSecondary }} />
        </div>
        <div>
          <div style={{ fontSize: "0.7rem", color: t.textDisabled, fontWeight: 600, marginBottom: "3px" }}>مُرسَل من</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: t.primary100, color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800, flexShrink: 0 }}>
              {fb.studentName.charAt(0)}
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{fb.studentName}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "8px", background: t.bgMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Calendar size={15} style={{ color: t.textSecondary }} />
        </div>
        <div>
          <div style={{ fontSize: "0.7rem", color: t.textDisabled, fontWeight: 600, marginBottom: "3px" }}>تاريخ الإرسال</div>
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary }}>{fb.date}</span>
        </div>
      </div>
    </div>

    <div style={{ height: "1px", background: t.border }} />

    {/* ③ Title */}
    {fb.title && (
      <div>
        <div style={{ fontSize: "0.7rem", color: t.textDisabled, fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>عنوان التقييم</div>
        <p style={{ fontSize: "1.0625rem", fontWeight: 800, color: t.textPrimary, margin: 0, lineHeight: 1.4 }}>{fb.title}</p>
      </div>
    )}

    {/* ④ Full comment */}
    <div>
      <div style={{ fontSize: "0.7rem", color: t.textDisabled, fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>نص التقييم الكامل</div>
      <p style={{ fontSize: "0.9375rem", color: t.textPrimary, lineHeight: 1.75, margin: 0, padding: "16px 18px", background: t.bgSecondary, borderRadius: "10px", border: `1px solid ${t.border}` }}>
        {fb.comment}
      </p>
    </div>

    {/* ⑤ Attachments */}
    {fb.attachments && fb.attachments.length > 0 && (
      <div>
        <div style={{ fontSize: "0.7rem", color: t.textDisabled, fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          المرفقات ({fb.attachments.length})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {fb.attachments.map((att, i) => (
            <div
              key={i}
              onClick={() => toast.info(`فتح المرفق: ${att.name}`, "جاري تجهيز الملف للمعاينة والتنزيل...")}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "#fff", border: `1px solid ${t.border}`, cursor: "pointer", transition: "border-color 120ms" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = t.primary400}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = t.border}
            >
              <div style={{ width: 36, height: 36, borderRadius: "9px", background: att.type === "image" ? "rgba(14,165,233,0.1)" : "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {att.type === "image" ? <ImageIcon size={17} style={{ color: "#0EA5E9" }} /> : <FileText size={17} style={{ color: "#6366F1" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.name}</div>
                <div style={{ fontSize: "0.75rem", color: t.textDisabled, marginTop: "2px" }}>{att.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ⑥ Anonymous note */}
    <div style={{ padding: "10px 14px", borderRadius: "8px", background: t.bgMuted, border: `1px solid ${t.border}`, fontSize: "0.75rem", color: t.textDisabled, fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
      <MessageSquare size={13} />
      التقييمات مجهولة الهوية — لا يوجد خيار للرد المباشر
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export const FeedbackPage: React.FC = () => {
  // filter state
  const [statusTab, setStatusTab] = React.useState<"all" | FeedbackStatus>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("");
  const [ratingFilter, setRatingFilter] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState("");

  // details modal state
  const [activeFeedbackId, setActiveFeedbackId] = React.useState<string | null>(null);

  // delete confirmation state
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(null);

  // bulk select state
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  // feedback data (local state so actions mutate it)
  const [feedbacks, setFeedbacks] = React.useState<IFeedback[]>(MOCK_FEEDBACKS);

  const activeFeedback = React.useMemo(
    () => feedbacks.find(fb => fb.id === activeFeedbackId) ?? null,
    [feedbacks, activeFeedbackId]
  );
  const deleteTarget = React.useMemo(
    () => feedbacks.find(fb => fb.id === deleteTargetId) ?? null,
    [feedbacks, deleteTargetId]
  );

  const closeModal = () => setActiveFeedbackId(null);

  // ── single-item actions (wired to update feedbacks state) ──
  const handleMarkReviewed = (id: string) => {
    setFeedbacks(prev => prev.map(fb => fb.id === id ? { ...fb, status: "reviewed" } : fb));
    toast.success("تمت المراجعة", "تم تحديد التقييم كـ \"تمت المراجعة\" بنجاح.");
  };

  const handleArchive = (id: string) => {
    setFeedbacks(prev => prev.map(fb => fb.id === id ? { ...fb, status: "archived" } : fb));
    toast.success("تم الأرشفة", "تم أرشفة التقييم بنجاح.");
  };

  const handleCopy = (comment: string) => {
    navigator.clipboard.writeText(comment).then(() => {
      toast.success("تم النسخ", "تم نسخ نص التقييم إلى الحافظة.");
    }).catch(() => {
      toast.info("تعذّر النسخ", "يرجى نسخ النص يدوياً.");
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    setFeedbacks(prev => prev.filter(fb => fb.id !== deleteTargetId));
    if (activeFeedbackId === deleteTargetId) setActiveFeedbackId(null);
    toast.success("تم الحذف", "تم حذف التقييم نهائياً.");
    setDeleteTargetId(null);
  };

  // ── filtered list ──
  const filtered = React.useMemo(() => {
    return feedbacks.filter(fb => {
      if (statusTab !== "all" && fb.status !== statusTab) return false;
      if (typeFilter && fb.type !== typeFilter) return false;
      if (ratingFilter && fb.rating !== Number(ratingFilter)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!fb.comment.toLowerCase().includes(q) && !fb.studentName.toLowerCase().includes(q) && !(fb.title ?? "").toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [feedbacks, statusTab, typeFilter, ratingFilter, searchQuery]);

  // ── selection helpers ──
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const allFilteredSelected = filtered.length > 0 && filtered.every(fb => selectedIds.has(fb.id));
  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedIds(prev => { const next = new Set(prev); filtered.forEach(fb => next.delete(fb.id)); return next; });
    } else {
      setSelectedIds(prev => { const next = new Set(prev); filtered.forEach(fb => next.add(fb.id)); return next; });
    }
  };

  // ── bulk actions ──
  const bulkMarkReviewed = () => {
    setFeedbacks(prev => prev.map(fb => selectedIds.has(fb.id) ? { ...fb, status: "reviewed" } : fb));
    toast.success("تمت المراجعة", `تم تحديد ${selectedIds.size} تقييم كـ "تمت المراجعة".`);
    setSelectedIds(new Set());
  };
  const bulkArchive = () => {
    setFeedbacks(prev => prev.map(fb => selectedIds.has(fb.id) ? { ...fb, status: "archived" } : fb));
    toast.success("تم الأرشفة", `تم أرشفة ${selectedIds.size} تقييم.`);
    setSelectedIds(new Set());
  };
  const bulkDelete = () => {
    setFeedbacks(prev => prev.filter(fb => !selectedIds.has(fb.id)));
    if (activeFeedbackId && selectedIds.has(activeFeedbackId)) setActiveFeedbackId(null);
    toast.success("تم الحذف", `تم حذف ${selectedIds.size} تقييم نهائياً.`);
    setSelectedIds(new Set());
  };

  const selCount = selectedIds.size;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "80px" }}>

      {/* ── PAGE TITLE ── */}
      <SectionTitle sub="استعرض تقييمات الطلاب ومقترحاتهم وتتبّع متوسط الرضا عن المحتوى التعليمي.">
        تقييمات الطلاب (Feedback Dashboard)
      </SectionTitle>

      {/* ── KPI STAT CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {kpiCards.map(kpi => (
          <Card key={kpi.label} style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: 40, height: 40, borderRadius: "10px", background: kpi.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: kpi.iconColor }}>{kpi.icon}</span>
              </div>
              {kpi.trend === "up" && (
                <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "rgba(34,197,94,0.10)", borderRadius: "999px", padding: "3px 8px" }}>
                  <TrendingUp size={11} color={t.success} />
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: t.success }}>ارتفاع</span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "2rem", fontWeight: 900, color: t.textPrimary, fontFamily: "'Cairo', sans-serif", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "6px" }}>
              {kpi.value}
              {kpi.isStar && <Star size={22} style={{ color: t.warning, fill: t.warning, flexShrink: 0, marginTop: "-2px" }} />}
            </div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary, marginBottom: "2px" }}>{kpi.label}</div>
            <div style={{ fontSize: "0.75rem", color: t.textSecondary }}>{kpi.sub}</div>
          </Card>
        ))}
      </div>

      {/* ── FILTER BAR ── */}
      <Card style={{ padding: "0" }}>
        {/* Status Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${t.border}`, padding: "0 20px", overflowX: "auto" }}>
          {STATUS_TABS.map(tab => {
            const isActive = statusTab === tab.key;
            const count = tab.key === "all" ? feedbacks.length : feedbacks.filter(f => f.status === tab.key).length;
            return (
              <button key={tab.key} onClick={() => setStatusTab(tab.key)} style={{ padding: "14px 16px", border: "none", borderBottom: isActive ? `2px solid ${t.primary}` : "2px solid transparent", background: "transparent", color: isActive ? t.primary : t.textSecondary, fontWeight: isActive ? 700 : 500, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", transition: "color 120ms, border-color 120ms", marginBottom: "-1px" }}>
                {tab.label}
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "20px", height: "20px", padding: "0 6px", borderRadius: "999px", background: isActive ? t.primary : t.bgMuted, color: isActive ? "#fff" : t.textSecondary, fontSize: "0.6875rem", fontWeight: 700 }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters Row */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "14px 20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px", position: "relative", maxWidth: "340px" }}>
            <Search size={15} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: t.textSecondary, pointerEvents: "none" }} />
            <input type="text" placeholder="بحث في التعليقات أو أسماء الطلاب..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: "100%", height: "38px", padding: "0 38px 0 14px", borderRadius: "8px", border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface, color: t.textPrimary, fontSize: "0.8125rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <FilterSelect value={typeFilter} onChange={setTypeFilter} options={TYPE_OPTIONS} />
          <FilterSelect value={ratingFilter} onChange={setRatingFilter} options={RATING_OPTIONS} />
          <div style={{ marginRight: "auto" }}>
            <button onClick={toggleSelectAll} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: t.textSecondary, fontSize: "0.8125rem", fontWeight: 600, fontFamily: "inherit" }}>
              {allFilteredSelected ? <CheckSquare size={17} style={{ color: t.primary }} /> : <Square size={17} />}
              تحديد الكل ({filtered.length})
            </button>
          </div>
        </div>
      </Card>

      {/* ── DETAIL MODAL ── */}
      {activeFeedback && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title={activeFeedback.title ?? "تفاصيل التقييم"}
          size="md"
          footer={
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end", width: "100%" }}>
              {/* Copy */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopy(activeFeedback.comment)}
              >
                <Copy size={14} />
                نسخ التقييم
              </Button>

              {/* Archive — hidden if already archived */}
              {activeFeedback.status !== "archived" && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => { handleArchive(activeFeedback.id); closeModal(); }}
                >
                  <Archive size={14} />
                  أرشفة
                </Button>
              )}

              {/* Mark Reviewed — hidden if already reviewed or archived */}
              {activeFeedback.status === "new" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => { handleMarkReviewed(activeFeedback.id); closeModal(); }}
                >
                  <CheckCircle size={14} />
                  تمت المراجعة
                </Button>
              )}

              {/* Delete */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => { setDeleteTargetId(activeFeedback.id); closeModal(); }}
              >
                <Trash2 size={14} />
                حذف
              </Button>
            </div>
          }
        >
          <DetailModalContent fb={activeFeedback} />
        </Modal>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteTarget && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteTargetId(null)}
          title="تأكيد الحذف"
          size="sm"
          footer={
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <Button variant="secondary" size="sm" onClick={() => setDeleteTargetId(null)}>إلغاء</Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteConfirm}>حذف نهائياً</Button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(239,68,68,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AlertTriangle size={22} style={{ color: t.error }} />
              </div>
              <div>
                <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: t.textPrimary, margin: "0 0 6px" }}>
                  هل أنت متأكد من حذف هذا التقييم؟
                </p>
                <p style={{ fontSize: "0.875rem", color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>
                  سيتم حذف تقييم <strong>{deleteTarget.studentName}</strong> نهائياً ولا يمكن التراجع عن هذا الإجراء.
                </p>
              </div>
            </div>
            <div style={{ padding: "12px 14px", borderRadius: "8px", background: t.bgMuted, border: `1px solid ${t.border}`, fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.6 }}>
              "{deleteTarget.comment.slice(0, 100)}{deleteTarget.comment.length > 100 ? '...' : ''}"
            </div>
          </div>
        </Modal>
      )}

      {/* ── CARD GRID (full width always) ── */}
      <div>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<MessageSquare size={48} strokeWidth={1.5} />}
              title={
                (statusTab !== "all" || typeFilter || ratingFilter || searchQuery)
                  ? "لا توجد تقييمات مطابقة للفلتر الحالي"
                  : "لا توجد تقييمات حتى الآن"
              }
              description={
                (statusTab !== "all" || typeFilter || ratingFilter || searchQuery)
                  ? "جرّب تغيير الفلتر أو كلمة البحث لعرض نتائج مختلفة."
                  : "بمجرد أن يبدأ الطلاب في مشاركة آرائهم، ستظهر هنا تقييماتهم ومقترحاتهم."
              }
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
              {filtered.map(fb => {
                const isSelected = selectedIds.has(fb.id);
                const isActive = activeFeedbackId === fb.id;
                return (
                  <Card
                    key={fb.id}
                    style={{
                      padding: "0",
                      border: isActive
                        ? `2px solid ${t.primary}`
                        : isSelected
                        ? `2px solid ${t.primary400}`
                        : `1px solid ${t.border}`,
                      transition: "border-color 120ms, transform 150ms",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      if (!isActive && !isSelected) (e.currentTarget as HTMLElement).style.borderColor = t.primary400;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                      if (!isActive && !isSelected) (e.currentTarget as HTMLElement).style.borderColor = t.border;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                    onClick={() => setActiveFeedbackId(fb.id)}
                  >
                    {/* Card Top */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px 10px", borderBottom: `1px solid ${t.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button onClick={e => { e.stopPropagation(); toggleSelect(fb.id); }} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0", display: "flex", flexShrink: 0 }} title="تحديد">
                          {isSelected ? <CheckSquare size={17} style={{ color: t.primary }} /> : <Square size={17} style={{ color: t.borderStrong }} />}
                        </button>
                        <Badge variant={typeVariant[fb.type]} style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                          {typeLabel[fb.type]}
                        </Badge>
                      </div>
                      <StatusBadge status={fb.status} />
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "12px 14px" }}>
                      <StarRow rating={fb.rating} size={13} />
                      {fb.title && (
                        <p style={{ fontSize: "0.9rem", fontWeight: 700, color: t.textPrimary, margin: "7px 0 0", lineHeight: 1.4 }}>
                          {fb.title}
                        </p>
                      )}
                      <p style={{ fontSize: "0.8rem", color: t.textSecondary, lineHeight: 1.6, margin: "5px 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {fb.comment}
                      </p>
                      {/* Attachment count chip */}
                      {fb.attachments && fb.attachments.length > 0 && (
                        <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: t.textSecondary, fontWeight: 600 }}>
                          <FileText size={12} />
                          {fb.attachments.length} مرفق
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", borderTop: `1px solid ${t.border}`, background: t.bgSecondary, borderRadius: "0 0 12px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: isActive ? t.primary200 : t.primary100, color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, flexShrink: 0 }}>
                          {fb.studentName.charAt(0)}
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: t.textPrimary }}>{fb.studentName}</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: t.textDisabled, fontWeight: 600 }}>{fb.date}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

      {/* ── BULK ACTION FLOATING BAR ── */}
      {selCount > 0 && (
        <div style={{ position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 200, display: "flex", alignItems: "center", gap: "8px", background: t.primary, border: `1.5px solid ${t.primary600}`, borderRadius: "999px", padding: "10px 20px", boxShadow: "0 8px 30px -4px rgba(27,109,99,0.40)" }}>
          <span style={{ background: "rgba(255,255,255,0.18)", color: "#fff", borderRadius: "999px", padding: "2px 10px", fontSize: "0.8125rem", fontWeight: 800 }}>
            {selCount} محدد
          </span>
          <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.25)" }} />
          <button onClick={bulkMarkReviewed} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", borderRadius: "999px", padding: "6px 14px", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 700, fontFamily: "inherit" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}>
            <CheckCircle size={15} /> مراجعة
          </button>
          <button onClick={bulkArchive} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", borderRadius: "999px", padding: "6px 14px", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 700, fontFamily: "inherit" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}>
            <Archive size={15} /> أرشفة
          </button>
          <button onClick={bulkDelete} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.22)", border: "none", color: "#fff", borderRadius: "999px", padding: "6px 14px", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 700, fontFamily: "inherit" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.38)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.22)")}>
            <Trash2 size={15} /> حذف
          </button>
          <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.25)" }} />
          <button onClick={() => setSelectedIds(new Set())} style={{ display: "flex", alignItems: "center", background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: "4px" }} title="إلغاء التحديد">
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
