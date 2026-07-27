import * as React from "react";
import { Search, Download, FileText, X, BookOpen, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { P } from "@/shared/constants/photos";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { toast } from "@/shared/components/ui/Toast";

interface IBookItem {
  title: string;
  subject: string;
  size: string;
  img: string;
  pages: number;
  chapters: string[];
}

export const StudentBooksPage: React.FC = () => {
  const [searchVal, setSearchVal] = React.useState("");
  const [activePreviewBook, setActivePreviewBook] = React.useState<IBookItem | null>(null);
  const [activePreviewPage, setActivePreviewPage] = React.useState(1);

  const books: IBookItem[] = [
    { title: "رياضيات الصف الثالث الثانوي", subject: "رياضيات", size: "8.4 MB", img: P.mathChalkboard, pages: 312, chapters: ["1. المصفوفات والمحددات", "2. الهندسة الفراغية", "3. التفاضل والتكامل"] },
    { title: "الفيزياء الحديثة — الجزء الأول", subject: "فيزياء", size: "12.1 MB", img: P.classroomSocial, pages: 280, chapters: ["1. الكهرومغناطيسية", "2. الفيزياء الذرية", "3. أشباه الموصلات"] },
    { title: "كيمياء عضوية متقدمة لطلبة اللغات", subject: "كيمياء", size: "6.7 MB", img: P.libraryBooks, pages: 195, chapters: ["1. الهيدروكربونات الأليفاتية", "2. المركبات الحلقية", "3. البوليمرات والبروتينات"] },
    { title: "المراجعة النهائية — علمي رياضة", subject: "متنوع", size: "5.2 MB", img: P.studentLaptop, pages: 120, chapters: ["1. ملخص القوانين الهامة", "2. نماذج اختبارات الوزارة", "3. الإجابات النموذجية"] },
  ];

  const filtered = books.filter(b => b.title.toLowerCase().includes(searchVal.toLowerCase()) || b.subject.toLowerCase().includes(searchVal.toLowerCase()));

  const handleDownload = (title: string) => {
    toast.success("بدء تحميل الكتاب الدراسي", `يتم الآن تحميل ملف PDF الخاص بكتاب [${title}].`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "relative" }}>
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full filter blur-[80px] bg-primary50/30 opacity-70 animate-float-blob pointer-events-none" />
      
      <SectionTitle sub="استعرض الكتب والمذكرات الأكاديمية والملخصات المرفقة بموادك الدراسية للتحميل والمذاكرة أوفلاين.">
        مكتبة المذكرات والكتب الدراسية
      </SectionTitle>

      <Card style={{ padding: "16px", border: `1px solid ${t.border}` }}>
        <Input
          placeholder="بحث باسم الكتاب أو المادة..."
          value={searchVal}
          onChange={setSearchVal}
          icon={<Search size={16} />}
        />
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          title="لم نجد أي كتب دراسية"
          description="جرّب تعديل خيارات البحث للوصول لكتب أخرى."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(b => (
            <Card key={b.title} style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "360px", border: `1px solid ${t.border}` }}>
              {/* 3D Book Cover Container */}
              <div className="book-card-container" style={{ height: "180px" }}>
                <div className="book-card-inner">
                  {/* Front Face: Book Cover Thumbnail */}
                  <div className="book-card-front">
                    <img src={b.img} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(15,79,73,0.7) 100%)" }} />
                    <div style={{ position: "absolute", bottom: "12px", right: "12px" }}>
                      <Badge variant="primary" size="sm" style={{ background: "#fff", color: t.primary }}>{b.subject}</Badge>
                    </div>
                  </div>
                  {/* Back Face: Table of Contents & Quick info */}
                  <div className="book-card-back">
                    <BookOpen size={24} style={{ marginBottom: "8px", color: "#FFA800" }} />
                    <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>الفصول الرئيسية:</span>
                    <ul style={{ fontSize: "0.75rem", margin: "6px 0", padding: 0, listStyle: "none", textAlign: "right", width: "100%" }}>
                      {b.chapters.slice(0, 3).map((ch, i) => (
                        <li key={i} className="truncate" style={{ margin: "2px 0" }}>{ch}</li>
                      ))}
                    </ul>
                    <span style={{ fontSize: "0.6875rem", opacity: 0.6 }}>انقر للمعاينة وقراءة الفهرس بالكامل</span>
                  </div>
                </div>
              </div>
              
              {/* Book Details and Buttons */}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1, gap: "12px", background: t.bgSurface }}>
                <div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 800, color: t.textPrimary, marginBottom: "4px", lineHeight: 1.4 }} className="line-clamp-2">
                    {b.title}
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>{b.pages} صفحة · {b.size} · PDF</span>
                </div>

                <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    style={{ border: `1.5px solid ${t.border}` }}
                    onClick={() => handleDownload(b.title)}
                  >
                    <Download size={12} style={{ marginLeft: "4px" }} />
                    تحميل
                  </Button>
                  
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="flex-1"
                    style={{ border: `1.5px solid ${t.border}`, background: t.primary50, color: t.primary }}
                    onClick={() => {
                      setActivePreviewBook(b);
                      setActivePreviewPage(1);
                    }}
                  >
                    <Eye size={12} style={{ marginLeft: "4px" }} />
                    معاينة
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Inline PDF Reader Previewer Modal */}
      {activePreviewBook && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
        }}>
          <div style={{
            background: t.bgSurface, width: "100%", maxWidth: "800px", height: "85vh",
            borderRadius: "20px", border: `1px solid ${t.border}`, overflow: "hidden",
            boxShadow: t.shadow3, display: "flex", flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "16px 24px", borderBottom: `1px solid ${t.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center", background: t.bgSecondary
            }}>
              <div>
                <h3 style={{ fontWeight: 800, color: t.textPrimary, fontSize: "1rem" }}>{activePreviewBook.title}</h3>
                <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>مكتبة درايَة - معاينة سريعة</span>
              </div>
              <button 
                onClick={() => setActivePreviewBook(null)}
                style={{
                  background: "none", border: "none", cursor: "pointer", color: t.textSecondary,
                  padding: "8px", borderRadius: "50%", hover: { background: t.primary50 }
                } as any}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Reader Simulator) */}
            <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", gap: "20px" }} className="flex-col md:flex-row">
              {/* Left Side: Table of Contents */}
              <div style={{
                width: "200px", borderLeft: `1px solid ${t.border}`, paddingLeft: "16px",
                display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0
              }} className="hidden md:flex">
                <span style={{ fontWeight: 800, fontSize: "0.8125rem", color: t.textPrimary }}>الفهرس الدراسي</span>
                {activePreviewBook.chapters.map((ch, idx) => (
                  <div key={idx} style={{
                    fontSize: "0.75rem", color: activePreviewPage === idx + 1 ? t.primary : t.textSecondary,
                    fontWeight: activePreviewPage === idx + 1 ? 700 : 500, cursor: "pointer",
                    padding: "6px 8px", background: activePreviewPage === idx + 1 ? t.primary50 : "transparent",
                    borderRadius: "6px"
                  }} onClick={() => setActivePreviewPage(idx + 1)}>
                    {ch}
                  </div>
                ))}
              </div>

              {/* Right Side: Page Canvas Simulator */}
              <div style={{
                flex: 1, background: "#FCFAF6", border: "1px solid #E6E1D3",
                borderRadius: "12px", padding: "36px", display: "flex", flexDirection: "column",
                position: "relative", minHeight: "300px", boxShadow: "inset 0 0 40px rgba(0,0,0,0.02)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E6E1D3", paddingBottom: "12px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: t.primary }}>درايَة التعليمية - المنهج الرسمي</span>
                  <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>الصفحة {activePreviewPage} من {activePreviewBook.pages}</span>
                </div>

                {/* Simulated Content pages */}
                {activePreviewPage === 1 && (
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary, marginBottom: "16px", fontFamily: "'Cairo', sans-serif" }}>
                      {activePreviewBook.chapters[0]}
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.8 }}>
                      تعتبر المصفوفات أداة رياضية فعالة لحل الأنظمة الخطية وتنظيم البيانات الهندسية. في هذا الجزء، سنتناول جمع وطرح المصفوفات وخصائص الضرب وكيفية استخدام المحددات لحساب المساحات الفراغية وتعيين معكوس المصفوفات الثنائية والثلاثية.
                    </p>
                    <div style={{
                      marginTop: "30px", border: "1.5px dashed rgba(27,109,99,0.3)", borderRadius: "8px",
                      padding: "16px", background: "rgba(27,109,99,0.02)", textAlign: "center"
                    }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.primary }}>💡 نصيحة دراسات درايَة الذكية:</span>
                      <p style={{ fontSize: "0.75rem", color: t.textSecondary, marginTop: "4px" }}>
                        تذكر دائماً أن ضرب المصفوفات ليس تبديلياً، أي أن AB لا يساوي بالضرورة BA.
                      </p>
                    </div>
                  </div>
                )}

                {activePreviewPage === 2 && (
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary, marginBottom: "16px", fontFamily: "'Cairo', sans-serif" }}>
                      {activePreviewBook.chapters[1]}
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.8 }}>
                      تعتمد الهندسة الفراغية على إدراك الأبعاد الثلاثية وتحديد المتجهات في الفراغ. سنتعرف على طريقة حساب الضرب القياسي والضرب الاتجاهي للمتجهات، والزاوية بين مستقيمين، وطرق إيجاد معادلة خط مستقيم ومعادلة المستوى في الفراغ بشكل مبسط.
                    </p>
                  </div>
                )}

                {activePreviewPage === 3 && (
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary, marginBottom: "16px", fontFamily: "'Cairo', sans-serif" }}>
                      {activePreviewBook.chapters[2]}
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.8 }}>
                      التفاضل والتكامل هما العمود الفقري للرياضيات والفيزياء الحديثة. في هذا الباب، سنتعلم كيفية اشتقاق الدوال المثلثية العكسية، وتكاملات الدوال المركبة، واستخدام التكامل المحدد لحساب حجوم الأجسام الدورانية المتولدة حول المحاور الإحداثية.
                    </p>
                  </div>
                )}

                {activePreviewPage > 3 && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <FileText size={48} style={{ color: t.textDisabled, marginBottom: "16px" }} />
                    <h4 style={{ fontWeight: 800, color: t.textPrimary, marginBottom: "8px" }}>نهاية العرض المجاني للمعاينة</h4>
                    <p style={{ fontSize: "0.8125rem", color: t.textSecondary, maxWidth: "320px", marginBottom: "20px" }}>
                      لقد استعرضت الصفحات الثلاث الأولى مجاناً. يمكنك تحميل الكتاب كاملاً بصيغة PDF للمذاكرة أوفلاين.
                    </p>
                    <Button variant="primary" onClick={() => handleDownload(activePreviewBook.title)}>
                      <Download size={14} style={{ marginLeft: "6px" }} />
                      تحميل الكتاب كاملاً
                    </Button>
                  </div>
                )}

                {/* Simulated Footer Controls */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E6E1D3", paddingTop: "12px", marginTop: "20px" }}>
                  <button 
                    disabled={activePreviewPage === 1}
                    onClick={() => setActivePreviewPage(p => p - 1)}
                    style={{
                      background: "none", border: "none", cursor: activePreviewPage === 1 ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8125rem", color: activePreviewPage === 1 ? t.textDisabled : t.primary,
                      fontWeight: 700
                    }}
                  >
                    <ChevronRight size={16} />
                    الصفحة السابقة
                  </button>
                  <button 
                    disabled={activePreviewPage === activePreviewBook.chapters.length + 1}
                    onClick={() => setActivePreviewPage(p => p + 1)}
                    style={{
                      background: "none", border: "none", cursor: activePreviewPage === activePreviewBook.chapters.length + 1 ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8125rem", color: activePreviewPage === activePreviewBook.chapters.length + 1 ? t.textDisabled : t.primary,
                      fontWeight: 700
                    }}
                  >
                    الصفحة التالية
                    <ChevronLeft size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "16px 24px", borderTop: `1px solid ${t.border}`, background: t.bgSecondary,
              display: "flex", justifyContent: "flex-end", gap: "10px"
            }}>
              <Button variant="secondary" style={{ border: `1.5px solid ${t.border}` }} onClick={() => setActivePreviewBook(null)}>إغلاق المعاينة</Button>
              <Button variant="primary" onClick={() => handleDownload(activePreviewBook.title)}>تحميل PDF كامل</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentBooksPage;
