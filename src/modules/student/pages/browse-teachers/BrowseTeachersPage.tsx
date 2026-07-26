import * as React from "react";
import { useNavigate } from "react-router";
import { Search, Star, BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { Avatar } from "@/shared/components/ui/Avatar";

export const BrowseTeachersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState("");
  const [filterSubject, setFilterSubject] = React.useState("all");

  const mockTeachers = [
    {
      id: "tch_1",
      name: "أحمد السيد",
      subject: "الرياضيات",
      rating: 4.9,
      studentsCount: 1240,
      packagesCount: 3,
      bio: "خبرة أكثر من 15 عاماً في تدريس الجبر والتفاضل للمرحلة الثانوية بمدارس القاهرة.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&w=200&h=200&q=80",
    },
    {
      id: "tch_2",
      name: "سارة محمد",
      subject: "الفيزياء",
      rating: 4.8,
      studentsCount: 850,
      packagesCount: 2,
      bio: "مدرسة الفيزياء الحديثة والميكانيكا بطرق تفاعلية وشرح مبسط للثانوية العامة.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=faces&fit=crop&w=200&h=200&q=80",
    },
    {
      id: "tch_3",
      name: "محمود عبد الله",
      subject: "الكيمياء",
      rating: 4.7,
      studentsCount: 920,
      packagesCount: 1,
      bio: "شرح الكيمياء العضوية والغير عضوية من خلال خرائط ذهنية مبتكرة.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=200&h=200&q=80",
    },
  ];

  const filtered = mockTeachers.filter(tItem => {
    const matchesSearch = tItem.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          tItem.bio.toLowerCase().includes(searchVal.toLowerCase());
    const matchesSubject = filterSubject === "all" || tItem.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <SectionTitle sub="تصفح قائمة المعلمين المميزين واشترك في باقاتهم التعليمية للوصول للمحاضرات والامتحانات.">
        المعلمون الشركاء
      </SectionTitle>

      {/* Filter and Search */}
      <Card style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <Input
            placeholder="بحث باسم المعلم أو التخصص الدراسي..."
            value={searchVal}
            onChange={setSearchVal}
            icon={<Search size={16} />}
          />
        </div>
        
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.8125rem", color: t.textSecondary, fontWeight: 600 }}>المادة:</span>
          <select
            value={filterSubject}
            onChange={e => setFilterSubject(e.target.value)}
            style={{
              height: "42px", borderRadius: "8px",
              border: `1.5px solid ${t.borderStrong}`, background: t.bgSurface,
              color: t.textPrimary, padding: "0 12px", fontSize: "0.875rem",
              fontFamily: "inherit", outline: "none", cursor: "pointer"
            }}
          >
            <option value="all">كل المواد</option>
            <option value="الرياضيات">الرياضيات</option>
            <option value="الفيزياء">الفيزياء</option>
            <option value="الكيمياء">الكيمياء</option>
          </select>
        </div>
      </Card>

      {/* Grid view */}
      {filtered.length === 0 ? (
        <EmptyState
          title="لم نجد أي معلمين"
          description="جرّب تعديل خيارات التصفية أو كلمة البحث للوصول لنتائج أفضل."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(tch => (
            <Card
              key={tch.id}
              interactive
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Avatar name={tch.name} src={tch.avatar} size={48} />
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: t.textPrimary }}>{tch.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: t.textSecondary, marginTop: "2px" }}>
                    <Badge variant="primary">{tch.subject}</Badge>
                    <span style={{ display: "flex", alignItems: "center", gap: "2px", color: t.warning, fontWeight: 700, marginRight: "6px" }}>
                      <Star size={12} fill={t.warning} /> {tch.rating}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.8125rem", color: t.textSecondary, lineHeight: 1.6, flex: 1 }}>
                {tch.bio}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderTop: `1px solid ${t.border}`, paddingTop: "12px" }}>
                <span style={{ color: t.textSecondary }}>إجمالي الباقات: <strong>{tch.packagesCount} باقات</strong></span>
                <span style={{ color: t.textSecondary }}>الطلاب النشطون: <strong>{tch.studentsCount} طالب</strong></span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => navigate(`/student/teachers/${tch.id}`)}
              >
                عرض باقات المعلم
                <ArrowLeft size={14} style={{ marginRight: "4px" }} />
              </Button>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
export default BrowseTeachersPage;
