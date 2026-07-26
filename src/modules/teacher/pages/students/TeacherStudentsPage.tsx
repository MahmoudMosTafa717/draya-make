import * as React from "react";
import { useNavigate } from "react-router";
import { Search, Filter, MessageSquare, Star } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { DataTable, Column } from "@/shared/components/ui/DataTable";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { Avatar } from "@/shared/components/ui/Avatar";
import { toast } from "@/shared/components/ui/Toast";

interface IStudentItem {
  id: string;
  name: string;
  class: string;
  avg: number;
  lastActive: string;
  weak: number;
}

export const TeacherStudentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState("");

  const students: IStudentItem[] = [
    { id: "std_1", name: "أحمد محمد علي", class: "الثالث ث — أ", avg: 87, lastActive: "اليوم", weak: 1 },
    { id: "std_2", name: "فاطمة إبراهيم", class: "الثالث ث — أ", avg: 92, lastActive: "أمس", weak: 0 },
    { id: "std_3", name: "محمد السيد", class: "الثالث ث — ب", avg: 61, lastActive: "منذ 3 أيام", weak: 4 },
    { id: "std_4", name: "ريم عادل", class: "الثالث ث — أ", avg: 78, lastActive: "اليوم", weak: 2 },
    { id: "std_5", name: "عمر خالد", class: "الثالث ث — ب", avg: 45, lastActive: "منذ أسبوع", weak: 7 },
  ];

  const filtered = students.filter(s => s.name.toLowerCase().includes(searchVal.toLowerCase()) || s.class.toLowerCase().includes(searchVal.toLowerCase()));

  const columns: Column<IStudentItem>[] = [
    {
      header: "الطالب",
      accessorKey: "name",
      cell: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate(`/teacher/students/${item.id}`)}>
          <Avatar name={item.name} size={32} />
          <span style={{ fontWeight: 600, color: t.textPrimary }} className="hover:underline hover:text-teal-700">{item.name}</span>
        </div>
      ),
    },
    {
      header: "الفصل الدراسي",
      accessorKey: "class",
    },
    {
      header: "متوسط الدرجات",
      accessorKey: "avg",
      sortable: true,
      cell: (item) => (
        <span style={{ fontWeight: 800, color: item.avg >= 80 ? t.success : item.avg >= 60 ? t.warning : t.error, fontFamily: "'Cairo', sans-serif" }}>
          {item.avg}%
        </span>
      ),
    },
    {
      header: "آخر نشاط",
      accessorKey: "lastActive",
    },
    {
      header: "نقاط الضعف",
      accessorKey: "weak",
      cell: (item) => (
        item.weak > 0 ? (
          <Badge variant={item.weak > 3 ? "error" : "warning"}>{item.weak} موضوع</Badge>
        ) : (
          <Badge variant="success">لا يوجد</Badge>
        )
      ),
    },
    {
      header: "إجراءات",
      accessorKey: "actions",
      cell: (item) => (
        <Button variant="secondary" size="sm" onClick={() => toast.success(`فتح نافذة المحادثة مع ${item.name}`)}>
          <MessageSquare size={12} style={{ marginLeft: "4px" }} />
          مراسلة
        </Button>
      ),
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="تتبع أداء وحضور ونشاط طلابك المسجلين بالمجموعات التعليمية المختلفة.">
        قائمة الطلاب
      </SectionTitle>

      <Card style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Input
            placeholder="بحث باسم الطالب أو الفصل الدراسي..."
            value={searchVal}
            onChange={setSearchVal}
            icon={<Search size={16} />}
          />
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={filtered}
        emptyTitle="لا يوجد طلاب مطابقين للبحث"
      />
    </div>
  );
};
export default TeacherStudentsPage;
