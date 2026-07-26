import * as React from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Archive, Play, Edit, Trash2, Code, Eye, EyeOff } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";

interface IPackageItem {
  id: string;
  name: string;
  subject: string;
  price: number;
  status: "draft" | "published" | "archived";
  chaptersCount: number;
  studentCount: number;
}

export const PackagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");
  
  // Package mock details list
  const [packages, setPackages] = React.useState<IPackageItem[]>([
    { id: "pkg_1", name: "باقة الجبر وحساب المثلثات", subject: "الرياضيات", price: 150, status: "published", chaptersCount: 4, studentCount: 48 },
    { id: "pkg_2", name: "باقة كيمياء الصف الثالث الثانوي", subject: "الكيمياء", price: 180, status: "draft", chaptersCount: 0, studentCount: 0 },
    { id: "pkg_3", name: "باقة ميكانيكا الصف الثاني الثانوي", subject: "الفيزياء", price: 120, status: "published", chaptersCount: 2, studentCount: 32 },
  ]);

  // Create form values
  const [newName, setNewName] = React.useState("");
  const [newSubject, setNewSubject] = React.useState("الرياضيات");
  const [newPrice, setNewPrice] = React.useState("");

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim()) {
      toast.warning("تفاصيل غير مكتملة");
      return;
    }
    const newPkg: IPackageItem = {
      id: "pkg_" + Date.now(),
      name: newName,
      subject: newSubject,
      price: Number(newPrice),
      status: "draft",
      chaptersCount: 0,
      studentCount: 0,
    };
    setPackages([newPkg, ...packages]);
    toast.success("تم إنشاء الباقة بنجاح", "تم حفظ الباقة كمسودة. يمكنك الآن إضافة فصول ودروس.");
    setShowCreateModal(false);
    setNewName("");
    setNewPrice("");
  };

  const handleToggleStatus = (id: string) => {
    setPackages(packages.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === "published" ? "draft" : "published";
        toast.info(nextStatus === "published" ? "تم نشر الباقة بنجاح" : "تم إلغاء نشر الباقة");
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleDeletePkg = (id: string, name: string) => {
    setPackages(packages.filter(p => p.id !== id));
    toast.success("تم حذف الباقة بنجاح", `تم مسح باقة ${name}.`);
  };

  const filtered = packages.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || p.subject.toLowerCase().includes(searchVal.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Page header */}
      <SectionTitle
        sub="أنشئ باقاتك التعليمية وانشرها لطلابك، وأضف الفصول والدروس والمحاضرات المصورة."
        action={
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            إضافة باقة جديدة
          </Button>
        }
      >
        الباقات والدروس (Packages)
      </SectionTitle>

      {/* Search Filter Card */}
      <Card style={{ padding: "16px" }}>
        <Input
          placeholder="بحث باسم الباقة أو المادة الدراسية..."
          value={searchVal}
          onChange={setSearchVal}
          icon={<Search size={16} />}
        />
      </Card>

      {/* Grid listing */}
      {filtered.length === 0 ? (
        <EmptyState
          title="لا توجد باقات تعليمية متاحة"
          description="لم تقم بإضافة أي باقات دراسية بعد. أضف باقتك الأولى للمتابعة."
          actionText="إضافة باقة جديدة"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <Card
              key={p.id}
              interactive
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <Badge variant="primary">{p.subject}</Badge>
                  <h3
                    onClick={() => navigate(`/teacher/packages/${p.id}`)}
                    style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary, marginTop: "8px", cursor: "pointer" }}
                    className="hover:underline hover:text-teal-700"
                  >
                    {p.name}
                  </h3>
                </div>
                
                <Badge variant={p.status === "published" ? "success" : "draft"}>
                  {p.status === "published" ? "منشورة" : "مسودة"}
                </Badge>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: `1px solid ${t.border}`, paddingTop: "12px", fontSize: "0.8125rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: t.textSecondary }}>عدد الفصول:</span>
                  <span style={{ fontWeight: 600, color: t.textPrimary }}>{p.chaptersCount} فصول</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: t.textSecondary }}>الطلاب المسجلين:</span>
                  <span style={{ fontWeight: 600, color: t.textPrimary }}>{p.studentCount} طالب</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: t.textSecondary }}>سعر الباقة:</span>
                  <span style={{ fontWeight: 700, color: t.primary }}>{p.price} جنيه مصري</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ flex: 1 }}
                  onClick={() => navigate(`/teacher/packages/${p.id}`)}
                >
                  <Edit size={14} style={{ marginLeft: "4px" }} />
                  محرر المحتوى
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleToggleStatus(p.id)}
                  style={{ padding: "0 10px" }}
                  title={p.status === "published" ? "إلغاء نشر" : "نشر"}
                >
                  {p.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePkg(p.id, p.name)}
                  style={{ padding: "0 10px" }}
                  title="حذف الباقة"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إضافة باقة تعليمية جديدة">
        <form onSubmit={handleCreatePackage} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <Input
            label="اسم الباقة التعليمية"
            placeholder="مثال: باقة الجبر وحساب المثلثات للشهادة الثانوية"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: t.textPrimary }}>المادة الدراسية</label>
            <select
              value={newSubject}
              onChange={e => setNewSubject(e.target.value)}
              style={{
                height: "42px", borderRadius: "8px",
                border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
                color: t.textPrimary, padding: "0 12px", fontSize: "0.875rem",
                fontFamily: "inherit", outline: "none", cursor: "pointer"
              }}
            >
              <option value="الرياضيات">الرياضيات</option>
              <option value="الفيزياء">الفيزياء</option>
              <option value="الكيمياء">الكيمياء</option>
              <option value="اللغة العربية">اللغة العربية</option>
              <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
            </select>
          </div>

          <Input
            label="سعر الباقة بالجنيه المصري"
            placeholder="مثال: 150"
            type="number"
            value={newPrice}
            onChange={e => setNewPrice(e.target.value)}
            required
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
            <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>إلغاء</Button>
            <Button type="submit" variant="primary">حفظ كمسودة</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default PackagesPage;
