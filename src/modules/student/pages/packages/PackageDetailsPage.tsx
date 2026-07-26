import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowRight, Video, FileText, ClipboardList, KeyRound, Check, HelpCircle, ShieldAlert } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { toast } from "@/shared/components/ui/Toast";

export const PackageDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State tracking activation
  const [enrolled, setEnrolled] = React.useState(false);
  const [codeVal, setCodeVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Mock details
  const pkgDetails = {
    id: id || "pkg_1",
    name: "باقة الجبر وحساب المثلثات للشهادة الثانوية",
    teacherName: "أحمد السيد",
    subject: "الرياضيات",
    price: 150,
    chapters: [
      {
        id: "ch_1",
        title: "الفصل الأول: التباديل والتوافيق",
        lessons: [
          { id: "les_1", title: "مقدمة ومفهوم مضروب العدد", type: "video", duration: "24 دقيقة" },
          { id: "les_2", title: "ملف شرح التباديل الأساسية PDF", type: "pdf" },
          { id: "les_3", title: "امتحان تجريبي على التوافيق", type: "exam" },
        ]
      },
      {
        id: "ch_2",
        title: "الفصل الثاني: نظرية ذات الحدين",
        lessons: [
          { id: "les_4", title: "شرح نظرية ذات الحدين بمفكوك صحيح", type: "video", duration: "38 دقيقة" },
        ]
      }
    ]
  };

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeVal.trim()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    // Dynamic mock redemption logic matching business decisions
    if (codeVal.trim().toUpperCase() === "DRY-MATH-4321") {
      setEnrolled(true);
      toast.success("تم تفعيل الباقة بنجاح!", "مرحباً بك في المجموعة الدراسية المرتبطة.");
    } else {
      toast.error("كود الانتساب غير صحيح", "يرجى التحقق من الكود أو مراجعة معلمك.");
    }
  };

  const handleBuyCheckout = () => {
    // Navigate to payment page
    navigate(`/student/checkout?pkg=${pkgDetails.id}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Back button */}
      <div>
        <Button variant="tertiary" size="sm" onClick={() => navigate("/student/browse-teachers")} style={{ padding: 0 }}>
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          الرجوع للمتجر
        </Button>
      </div>

      {/* Detail Head */}
      <Card style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Badge variant="primary">{pkgDetails.subject}</Badge>
            {enrolled && <Badge variant="success">مشترك</Badge>}
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary, marginTop: "8px", marginBottom: "4px" }}>
            {pkgDetails.name}
          </h1>
          <span style={{ fontSize: "0.875rem", color: t.textSecondary }}>المعلم: <strong>{pkgDetails.teacherName}</strong></span>
        </div>

        {!enrolled && (
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>
            {pkgDetails.price} جنيه مصري
          </div>
        )}
      </Card>

      {/* Dual Path Activation Box */}
      {!enrolled && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Path A: Code redemption */}
          <Card style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "4px" }}>تفعيل بكود الانتساب الأكاديمي</h3>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary }}>إذا حصلت على كود تفعيل ورقي من السنتر أو المعلم الخاص بك.</p>
            </div>
            
            <form onSubmit={handleRedeemCode} style={{ display: "flex", gap: "8px" }}>
              <Input
                placeholder="أدخل كود التفعيل المكون من حروف وأرقام..."
                value={codeVal}
                onChange={e => setCodeVal(e.target.value)}
                icon={<KeyRound size={14} />}
                required
              />
              <Button type="submit" variant="primary" loading={loading} style={{ flexShrink: 0 }}>تفعيل</Button>
            </form>
          </Card>

          {/* Path B: Direct checkout */}
          <Card style={{ padding: "24px", display: "flex", flexDirection: "column", justifyBetween: "space-between", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "4px" }}>شراء فوري للباقة</h3>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary }}>اشترك مباشرة عبر بوابات الدفع الإلكتروني (فيزا، فودافون كاش).</p>
            </div>
            <Button variant="secondary" className="w-full" style={{ marginTop: "auto" }} onClick={handleBuyCheckout}>
              شراء وتفعيل فوري
            </Button>
          </Card>
        </div>
      )}

      {/* Lock Warning overlay if not enrolled */}
      <div style={{ position: "relative" }}>
        {!enrolled && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(250,250,248,0.7)", backdropFilter: "blur(2.5px)",
            zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Card style={{ padding: "24px", textAlign: "center", maxWidth: "360px", boxShadow: t.shadow3 }}>
              <ShieldAlert size={36} color={t.warning} style={{ margin: "0 auto 12px" }} />
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>محتوى الباقة مقفل</h4>
              <p style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.5, marginBottom: "16px" }}>
                يرجى تفعيل الباقة بكود الانتساب أو الشراء الفوري لعرض المحاضرات وحل الاختبارات.
              </p>
            </Card>
          </div>
        )}

        {/* Chapters listing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", opacity: enrolled ? 1 : 0.4 }}>
          <SectionTitle>فهرس الفصول والمحاضرات</SectionTitle>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {pkgDetails.chapters.map(ch => (
              <Card key={ch.id} style={{ padding: "18px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginBottom: "14px" }}>{ch.title}</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginRight: "16px" }}>
                  {ch.lessons.map(les => (
                    <div
                      key={les.id}
                      onClick={enrolled ? () => toast.info(`بدء تشغيل: ${les.title}`) : undefined}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 14px", border: `1px solid ${t.border}`, borderRadius: "8px",
                        background: t.bgSecondary, cursor: enrolled ? "pointer" : "default",
                        fontSize: "0.875rem"
                      }}
                      className={enrolled ? "hover:bg-gray-100" : ""}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: t.textSecondary }}>
                          {les.type === "video" ? <Video size={14} /> : les.type === "pdf" ? <FileText size={14} /> : <ClipboardList size={14} />}
                        </span>
                        <span style={{ color: t.textPrimary, fontWeight: 500 }}>{les.title}</span>
                      </div>
                      {les.duration && <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>{les.duration}</span>}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
export default PackageDetailsPage;
