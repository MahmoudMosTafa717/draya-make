import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowRight, Star, BookOpen, Clock, Play, GraduationCap } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Avatar } from "@/shared/components/ui/Avatar";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export const TeacherDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock teacher details
  const teacher = {
    id: id || "tch_1",
    name: "أحمد السيد",
    subject: "الرياضيات",
    rating: 4.9,
    studentsCount: 1240,
    bio: "خبرة أكثر من 15 عاماً في تدريس الجبر والتفاضل للمرحلة الثانوية بمدارس القاهرة ومراكز الجيزة. نهدف إلى تبسيط الرياضيات وتوصيلها بأسهل السبل الأكاديمية.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&w=200&h=200&q=80",
    packages: [
      { id: "pkg_1", name: "باقة الجبر وحساب المثلثات", chapters: 4, lessons: 18, price: 150, rating: 4.8 },
      { id: "pkg_2", name: "باقة التفاضل والتكامل والتطبيقات", chapters: 3, lessons: 12, price: 160, rating: 4.9 },
    ]
  };

  const handleEnroll = (pkgId: string) => {
    navigate(`/student/packages/${pkgId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Back button */}
      <div>
        <Button variant="tertiary" size="sm" onClick={() => navigate("/student/browse-teachers")} style={{ padding: 0 }}>
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          الرجوع لقائمة المعلمين
        </Button>
      </div>

      {/* Profile Bio Card */}
      <Card style={{ padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <Avatar name={teacher.name} src={teacher.avatar} size={72} style={{ border: `3px solid ${t.primary100}` }} />
        <div style={{ flex: 1, minWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: t.textPrimary }}>{teacher.name}</h1>
            <Badge variant="primary">{teacher.subject}</Badge>
            <span style={{ display: "flex", alignItems: "center", gap: "3px", color: t.warning, fontSize: "0.875rem", fontWeight: 700, marginRight: "8px" }}>
              <Star size={14} fill={t.warning} /> {teacher.rating}
            </span>
          </div>

          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6, marginTop: "12px", maxWidth: "680px" }}>
            {teacher.bio}
          </p>

          <div style={{ display: "flex", gap: "24px", marginTop: "16px", borderTop: `1px solid ${t.border}`, paddingTop: "16px" }}>
            <div>
              <span style={{ fontSize: "1.125rem", fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>{teacher.studentsCount}</span>
              <span style={{ fontSize: "0.75rem", color: t.textSecondary, display: "block", marginTop: "2px" }}>طالب نشط</span>
            </div>
            <div>
              <span style={{ fontSize: "1.125rem", fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>{teacher.packages.length}</span>
              <span style={{ fontSize: "0.75rem", color: t.textSecondary, display: "block", marginTop: "2px" }}>باقات تعليمية</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Packages Listing Section */}
      <div>
        <SectionTitle>الباقات التعليمية المتوفرة</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teacher.packages.map(pkg => (
            <Card
              key={pkg.id}
              interactive
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: t.textPrimary, marginBottom: "6px" }}>
                  {pkg.name}
                </h3>
                <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: t.textSecondary }}>
                  <span>عدد الفصول: <strong>{pkg.chapters} فصول</strong></span>
                  <span>عدد الدروس: <strong>{pkg.lessons} درساً</strong></span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${t.border}`, paddingTop: "14px", marginTop: "auto" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: t.textSecondary, display: "block" }}>سعر الاشتراك التفعيل:</span>
                  <span style={{ fontSize: "1.125rem", fontWeight: 800, color: t.primary, fontFamily: "'Cairo', sans-serif" }}>{pkg.price} جنيه مصري</span>
                </div>
                
                <Button variant="primary" size="md" onClick={() => handleEnroll(pkg.id)}>
                  استعراض المحتوى والاشتراك
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
export default TeacherDetailsPage;
