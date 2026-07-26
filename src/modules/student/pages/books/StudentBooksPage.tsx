import * as React from "react";
import { Search, Download, FileText } from "lucide-react";
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
}

export const StudentBooksPage: React.FC = () => {
  const [searchVal, setSearchVal] = React.useState("");

  const books: IBookItem[] = [
    { title: "رياضيات الصف الثالث الثانوي", subject: "رياضيات", size: "8.4 MB", img: P.mathChalkboard },
    { title: "الفيزياء الحديثة — الجزء الأول", subject: "فيزياء", size: "12.1 MB", img: P.classroomSocial },
    { title: "كيمياء عضوية متقدمة لطلبة اللغات", subject: "كيمياء", size: "6.7 MB", img: P.libraryBooks },
    { title: "المراجعة النهائية — علمي رياضة", subject: "متنوع", size: "5.2 MB", img: P.studentLaptop },
  ];

  const filtered = books.filter(b => b.title.toLowerCase().includes(searchVal.toLowerCase()) || b.subject.toLowerCase().includes(searchVal.toLowerCase()));

  const handleDownload = (title: string) => {
    toast.success("بدء تحميل الكتاب الدراسي", `يتم الآن تحميل ملف PDF الخاص بكتاب [${title}].`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      <SectionTitle sub="استعرض الكتب والمذكرات الأكاديمية والملخصات المرفقة بموادك الدراسية للتحميل والمذاكرة أوفلاين.">
        مكتبة المذكرات والكتب الدراسية
      </SectionTitle>

      <Card style={{ padding: "16px" }}>
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
            <Card key={b.title} interactive style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "140px", position: "relative", overflow: "hidden" }}>
                <img src={b.img} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(27, 109, 99, 0.25)" }} />
              </div>
              
              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
                <div>
                  <Badge variant="primary" size="sm">{b.subject}</Badge>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: t.textPrimary, marginTop: "8px", marginBottom: "4px", lineHeight: 1.4 }} className="line-clamp-2">
                    {b.title}
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: t.textSecondary }}>{b.size} · PDF</span>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  style={{ marginTop: "auto" }}
                  className="w-full"
                  onClick={() => handleDownload(b.title)}
                >
                  <Download size={12} style={{ marginLeft: "4px" }} />
                  تحميل الكتاب
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
export default StudentBooksPage;
