import * as React from "react";
import { Bell, Check, Trash2, Calendar, BookOpen, AlertCircle } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { toast } from "@/shared/components/ui/Toast";

interface INotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "exam" | "package" | "alert";
}

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = React.useState<INotification[]>([
    { id: "n1", title: "تم جدولة امتحان جديد", body: "أضاف أ. أحمد السيد امتحان 'الجبر وحساب المثلثات التراكمي' لمجموعتك الدراسية.", time: "منذ 10 دقائق", read: false, type: "exam" },
    { id: "n2", title: "محاضرة جديدة منشورة", body: "تم رفع فيديو 'نظرية ذات الحدين - الجزء الأول' وملف الـ PDF الملحق بها.", time: "منذ ساعتين", read: false, type: "package" },
    { id: "n3", title: "تنبيه: أداء منخفض بالامتحان", body: "يرجى مراجعة نقاط الضعف التي حددها لك الـ AI في امتحان الفيزياء الأخير.", time: "منذ يوم واحد", read: true, type: "alert" },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("تم تحديد الكل كمقروء");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.info("تم حذف الإشعار");
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle
        sub="تفقد التنبيهات والأخبار الأكاديمية وجداول النشر المرفقة بحسابك."
        action={
          notifications.some(n => !n.read) && (
            <Button variant="secondary" size="sm" onClick={markAllRead}>
              <Check size={14} style={{ marginLeft: "4px" }} />
              تحديد الكل كمقروء
            </Button>
          )
        }
      >
        مركز الإشعارات والتنبيهات
      </SectionTitle>

      {notifications.length === 0 ? (
        <EmptyState
          title="صندوق الإشعارات فارغ"
          description="لا توجد أي إشعارات أو تنبيهات غير مقروءة حالياً."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {notifications.map(n => (
            <Card
              key={n.id}
              onClick={() => handleNotificationClick(n.id)}
              style={{
                padding: "16px 20px", display: "flex", gap: "16px", alignItems: "flex-start",
                borderRight: n.read ? `1px solid ${t.border}` : `4px solid ${t.primary}`,
                background: n.read ? t.bgSurface : t.primary50,
                cursor: "pointer", transition: "all 120ms"
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: n.type === "exam" ? "rgba(245,158,11,0.1)" : n.type === "package" ? "rgba(124,58,237,0.1)" : "rgba(239,68,68,0.1)",
                color: n.type === "exam" ? t.warning : n.type === "package" ? t.ai : t.error,
                display: "flex", alignItems: "center", justify: "center", flexShrink: 0
              }} className="justify-center">
                {n.type === "exam" ? <Calendar size={18} /> : n.type === "package" ? <BookOpen size={18} /> : <AlertCircle size={18} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <h4 style={{ fontSize: "0.9375rem", fontWeight: n.read ? 600 : 700, color: t.textPrimary }}>
                    {n.title}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: t.textDisabled }}>{n.time}</span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.5, margin: 0 }}>
                  {n.body}
                </p>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: t.textDisabled, padding: "4px" }}
                className="hover:text-red-500"
                title="حذف الإشعار"
              >
                <Trash2 size={14} />
              </button>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
export default NotificationsPage;
