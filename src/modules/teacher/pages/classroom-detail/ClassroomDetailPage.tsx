import * as React from "react";
import { useParams, useNavigate } from "react-router";
import {
  Plus, Users, Search, Edit2, Trash2, Calendar, Clock,
  ArrowRight, ChevronLeft, MoreVertical, Layers
} from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { Modal } from "@/shared/components/ui/Modal";
import { toast } from "@/shared/components/ui/Toast";

export const ClassroomDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState("");
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  // Modals state: Create/Edit Group (reused)
  const [showGroupModal, setShowGroupModal] = React.useState(false);
  const [editGroup, setEditGroup] = React.useState<any | null>(null);
  const [editGroupName, setEditGroupName] = React.useState("");
  const [examDateInput, setExamDateInput] = React.useState("");
  const [videoDateInput, setVideoDateInput] = React.useState("");

  // Modal state: Delete Group
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [groupToDelete, setGroupToDelete] = React.useState<any | null>(null);

  // Stage mapping
  const stageMap: Record<string, { name: string; badge: string }> = {
    stage_1: { name: "الصف الأول الثانوي", badge: "المرحلة الثانوية" },
    stage_2: { name: "الصف الثاني الثانوي", badge: "المرحلة الثانوية" },
    stage_3: { name: "الصف الثالث الثانوي", badge: "المرحلة الثانوية" },
  };

  const stageInfo = stageMap[id || "stage_3"] || { name: "الصف الثالث الثانوي", badge: "المرحلة الثانوية" };

  // Dummy / Mock Groups Data (3 groups as requested)
  const [groups, setGroups] = React.useState([
    {
      id: "grp_1",
      name: "المجموعة أ - رياضيات علمي رياضة",
      studentsCount: 45,
      nextExam: "الأحد 15 أغسطس · 10:00 ص",
      nextVideo: "الإثنين 16 أغسطس · 12:00 م",
      examDate: "الأحد 15 أغسطس",
      examTime: "10:00 ص",
      videoDate: "الإثنين 16 أغسطس",
      videoTime: "12:00 م",
      packagesCount: 2,
    },
    {
      id: "grp_2",
      name: "المجموعة ب - مراجعة مكثفة جبر",
      studentsCount: 38,
      nextExam: "الأربعاء 18 أغسطس · 09:00 ص",
      nextVideo: "الخميس 19 أغسطس · 04:00 م",
      examDate: "الأربعاء 18 أغسطس",
      examTime: "09:00 ص",
      videoDate: "الخميس 19 أغسطس",
      videoTime: "04:00 م",
      packagesCount: 1,
    },
    {
      id: "grp_3",
      name: "المجموعة ج - تقوية تفاضل وتكامل",
      studentsCount: 52,
      nextExam: "السبت 21 أغسطس · 11:00 ص",
      nextVideo: "الأحد 22 أغسطس · 02:00 م",
      examDate: "السبت 21 أغسطس",
      examTime: "11:00 ص",
      videoDate: "الأحد 22 أغسطس",
      videoTime: "02:00 م",
      packagesCount: 3,
    },
  ]);

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleCreateOpen = () => {
    setEditGroup(null);
    setEditGroupName("");
    setExamDateInput("2026-08-25T10:00");
    setVideoDateInput("2026-08-26T14:00");
    setShowGroupModal(true);
  };

  const handleEditOpen = (group: any) => {
    setEditGroup(group);
    setEditGroupName(group.name);
    setExamDateInput("2026-08-21T11:00");
    setVideoDateInput("2026-08-22T14:00");
    setShowGroupModal(true);
  };

  const handleGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGroupName.trim()) return;

    const formattedExam = examDateInput ? examDateInput.replace("T", " · ") : "لم يتم التحديد";
    const formattedVideo = videoDateInput ? videoDateInput.replace("T", " · ") : "لم يتم التحديد";

    if (editGroup) {
      setGroups(groups.map(g => g.id === editGroup.id ? {
        ...g,
        name: editGroupName.trim(),
        nextExam: formattedExam,
        nextVideo: formattedVideo,
      } : g));
      toast.success("تم حفظ تعديلات المجموعة بنجاح");
    } else {
      const newGroup = {
        id: `grp_${Date.now()}`,
        name: editGroupName.trim(),
        studentsCount: 0,
        nextExam: formattedExam,
        nextVideo: formattedVideo,
        examDate: examDateInput ? examDateInput.split("T")[0] : "",
        examTime: examDateInput ? examDateInput.split("T")[1] : "",
        videoDate: videoDateInput ? videoDateInput.split("T")[0] : "",
        videoTime: videoDateInput ? videoDateInput.split("T")[1] : "",
        packagesCount: 1,
      };
      setGroups([newGroup, ...groups]);
      toast.success("تم إنشاء المجموعة بنجاح", `تم إضافة المجموعة إلى ${stageInfo.name}`);
    }

    setShowGroupModal(false);
    setEditGroup(null);
  };

  const handleDeleteOpen = (group: any) => {
    setGroupToDelete(group);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!groupToDelete) return;
    setGroups(groups.filter(g => g.id !== groupToDelete.id));
    toast.success("تم حذف المجموعة الدراسية بنجاح");
    setShowDeleteModal(false);
    setGroupToDelete(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Back Button */}
      <div>
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => navigate("/teacher/classrooms")}
          style={{ padding: "0 8px 0 0", color: t.textSecondary }}
          className="hover:text-teal-700 transition-colors"
        >
          <ArrowRight size={16} style={{ marginLeft: "6px" }} />
          الرجوع لقائمة المراحل الدراسية
        </Button>
      </div>

      {/* Page Title & Action */}
      <SectionTitle
        sub={`قائمة المجموعات الدراسية التابعة لمرحلة ${stageInfo.name} وإدارة الجداول والباقات المرتبطة بها.`}
        action={
          <Button
            variant="primary"
            onClick={handleCreateOpen}
          >
            <Plus size={16} />
            إنشاء مجموعة جديدة
          </Button>
        }
      >
        {stageInfo.name} (Groups List)
      </SectionTitle>

      {/* Search Bar & View Mode Toggle (List vs Grid) */}
      <Card style={{ padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 280px", maxWidth: "500px" }}>
          <Input
            placeholder="بحث باسم المجموعة..."
            value={searchVal}
            onChange={setSearchVal}
            icon={<Search size={16} />}
          />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: t.textSecondary, whiteSpace: "nowrap" }}>
            إجمالي المجموعات: <strong style={{ color: t.textPrimary, fontWeight: 800 }}>{groups.length}</strong>
          </div>

          {/* View Mode Toggle Buttons */}
          <div style={{ display: "flex", background: t.bgMuted, padding: "4px", borderRadius: "10px", border: `1px solid ${t.border}` }}>
            <button
              onClick={() => setViewMode("list")}
              title="عرض كقائمة شريطية"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "7px",
                border: viewMode === "list" ? `1px solid ${t.primary}` : "1px solid transparent",
                background: viewMode === "list" ? "#FFFFFF" : "transparent",
                color: viewMode === "list" ? t.primary : t.textSecondary,
                fontWeight: viewMode === "list" ? 800 : 600,
                fontSize: "0.8125rem",
                boxShadow: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              <Layers size={15} />
              <span>قائمة شريطية</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="عرض كبطاقات مربعة"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "7px",
                border: viewMode === "grid" ? `1px solid ${t.primary}` : "1px solid transparent",
                background: viewMode === "grid" ? "#FFFFFF" : "transparent",
                color: viewMode === "grid" ? t.primary : t.textSecondary,
                fontWeight: viewMode === "grid" ? 800 : 600,
                fontSize: "0.8125rem",
                boxShadow: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
                fontFamily: "inherit",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: 14, height: 14 }}>
                <span style={{ background: "currentColor", borderRadius: 1 }} />
                <span style={{ background: "currentColor", borderRadius: 1 }} />
                <span style={{ background: "currentColor", borderRadius: 1 }} />
                <span style={{ background: "currentColor", borderRadius: 1 }} />
              </div>
              <span>بطاقات</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Groups Display (List View Ribbon vs Grid Cards) */}
      {filteredGroups.length === 0 ? (
        <EmptyState
          title="لا توجد مجموعات مطابقة"
          description={searchVal ? "لم يتم العثور على مجموعات تطابق عملية البحث." : "لا توجد مجموعات دراسية منشأة في هذه المرحلة بعد."}
          action={
            !searchVal ? (
              <Button variant="primary" size="sm" onClick={handleCreateOpen}>
                <Plus size={15} />
                إنشاء أول مجموعة
              </Button>
            ) : undefined
          }
        />
      ) : viewMode === "list" ? (
        /* ================= LIST VIEW (Horizontal Strips / Ribbons) ================= */
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              style={{
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                background: "#FFFFFF",
                borderRadius: "14px",
                border: `1px solid ${t.border}`,
                transition: "all 180ms ease",
              }}
              className="hover:border-teal-700/40"
            >
              {/* Section 1: Group Name & Student/Package KPI Badges */}
              <div style={{ flex: "1 1 280px", minWidth: "250px" }}>
                <h3
                  onClick={() => navigate(`/teacher/classrooms/${id || "stage_3"}/groups/${group.id}`)}
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 800,
                    color: t.textPrimary,
                    margin: "0 0 10px 0",
                    cursor: "pointer",
                    lineHeight: 1.35,
                  }}
                  className="hover:text-teal-700 transition-colors"
                >
                  {group.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: t.textSecondary, background: t.bgMuted, padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>
                    <Users size={14} color={t.primary} />
                    <span>الطلاب المقيدون: <strong style={{ color: t.textPrimary, fontWeight: 800 }}>{group.studentsCount}</strong> طالب</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: t.textSecondary, background: t.bgMuted, padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>
                    <Layers size={14} color="#2563EB" />
                    <span>الباقات: <strong style={{ color: t.textPrimary, fontWeight: 800 }}>{group.packagesCount}</strong> باقات</span>
                  </span>
                </div>
              </div>

              {/* Section 2: Schedules (Exam & Video Pills Side-by-Side) */}
              <div style={{ flex: "1 1 350px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {/* Next Exam Pill */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "8px 12px", borderRadius: "10px", flex: "1 1 160px" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "8px", background: "rgba(13, 148, 136, 0.1)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: t.textSecondary, fontWeight: 700 }}>ميعاد الامتحان القادم</div>
                    <div style={{ fontSize: "0.8125rem", color: t.textPrimary, fontWeight: 800, marginTop: "2px", whiteSpace: "nowrap" }}>
                      {group.examDate} · <span style={{ color: t.primary }}>{group.examTime}</span>
                    </div>
                  </div>
                </div>

                {/* Next Video Pill */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "8px 12px", borderRadius: "10px", flex: "1 1 160px" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: t.textSecondary, fontWeight: 700 }}>ميعاد نزول الفيديو</div>
                    <div style={{ fontSize: "0.8125rem", color: t.textPrimary, fontWeight: 800, marginTop: "2px", whiteSpace: "nowrap" }}>
                      {group.videoDate} · <span style={{ color: "#2563EB" }}>{group.videoTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Action Button & 3-Dots Menu */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/teacher/classrooms/${id || "stage_3"}/groups/${group.id}`)}
                  style={{ height: "38px", padding: "0 16px", borderRadius: "9px", fontWeight: 700, fontSize: "0.8125rem" }}
                  className="transition-colors"
                >
                  <span>عرض التفاصيل</span>
                  <ChevronLeft size={16} />
                </Button>

                {/* 3-Dots Kebab Menu Button */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === group.id ? null : group.id);
                    }}
                    title="خيارات المجموعة"
                    aria-label="خيارات المجموعة"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "9px",
                      border: "none",
                      background: openMenuId === group.id ? t.bgMuted : "transparent",
                      color: t.textSecondary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                    className="hover:bg-gray-100 hover:text-gray-900"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown Menu Popover */}
                  {openMenuId === group.id && (
                    <>
                      <div
                        style={{ position: "fixed", inset: 0, zIndex: 10 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          marginTop: "6px",
                          width: "165px",
                          background: "#FFFFFF",
                          borderRadius: "12px",
                          border: `1px solid ${t.border}`,
                          padding: "6px",
                          zIndex: 20,
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            handleEditOpen(group);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "transparent",
                            color: t.textPrimary,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "right",
                            fontFamily: "inherit",
                          }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <Edit2 size={15} color={t.primary} />
                          <span>تعديل المجموعة</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            handleDeleteOpen(group);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "transparent",
                            color: t.error,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "right",
                            fontFamily: "inherit",
                          }}
                          className="hover:bg-red-50/60 transition-colors"
                        >
                          <Trash2 size={15} />
                          <span>حذف المجموعة</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* ================= GRID VIEW (Structured & Super Readable Cards) ================= */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
          gap: "20px",
        }}>
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                background: "#FFFFFF",
                borderRadius: "16px",
                border: `1px solid ${t.border}`,
                transition: "all 200ms ease",
              }}
              className="hover:border-teal-700/30"
            >
              {/* Card Header: Group Name (Clean & Top-Aligned) + 3-Dots Menu */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", position: "relative" }}>
                <div style={{ flex: 1 }}>
                  <h3
                    onClick={() => navigate(`/teacher/classrooms/${id || "stage_3"}/groups/${group.id}`)}
                    style={{
                      fontSize: "1.1875rem",
                      fontWeight: 800,
                      color: t.textPrimary,
                      lineHeight: 1.35,
                      cursor: "pointer",
                      margin: 0,
                    }}
                    className="hover:text-teal-700 transition-colors"
                  >
                    {group.name}
                  </h3>
                </div>

                {/* 3-Dots Kebab Menu Button */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === group.id ? null : group.id);
                    }}
                    title="خيارات المجموعة"
                    aria-label="خيارات المجموعة"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      border: "none",
                      background: openMenuId === group.id ? t.bgMuted : "transparent",
                      color: t.textSecondary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                    className="hover:bg-gray-100 hover:text-gray-900"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown Menu Popover */}
                  {openMenuId === group.id && (
                    <>
                      <div
                        style={{ position: "fixed", inset: 0, zIndex: 10 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          marginTop: "6px",
                          width: "165px",
                          background: "#FFFFFF",
                          borderRadius: "12px",
                          border: `1px solid ${t.border}`,
                          padding: "6px",
                          zIndex: 20,
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            handleEditOpen(group);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "transparent",
                            color: t.textPrimary,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "right",
                            fontFamily: "inherit",
                          }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <Edit2 size={15} color={t.primary} />
                          <span>تعديل المجموعة</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                            handleDeleteOpen(group);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "transparent",
                            color: t.error,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "right",
                            fontFamily: "inherit",
                          }}
                          className="hover:bg-red-50/60 transition-colors"
                        >
                          <Trash2 size={15} />
                          <span>حذف المجموعة</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* KPI Metrics Row (2 Side-by-Side Tiles: Students & Packages) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Tile 1: Students Count */}
                <div style={{
                  background: t.bgMuted,
                  borderRadius: "12px",
                  padding: "12px 14px",
                  border: `1px solid ${t.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: t.textSecondary, fontSize: "0.75rem", fontWeight: 700 }}>
                    <Users size={15} color={t.primary} />
                    <span>الطلاب المقيدون</span>
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary }}>
                    {group.studentsCount} <span style={{ fontSize: "0.75rem", fontWeight: 600, color: t.textSecondary }}>طالب</span>
                  </div>
                </div>

                {/* Tile 2: Associated Packages */}
                <div style={{
                  background: t.bgMuted,
                  borderRadius: "12px",
                  padding: "12px 14px",
                  border: `1px solid ${t.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: t.textSecondary, fontSize: "0.75rem", fontWeight: 700 }}>
                    <Layers size={15} color={t.primary} />
                    <span>الباقات المرتبطة</span>
                  </div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary }}>
                    {group.packagesCount} <span style={{ fontSize: "0.75rem", fontWeight: 600, color: t.textSecondary }}>باقة</span>
                  </div>
                </div>
              </div>

              {/* Schedules Section: Structured Event Cards (No Text Wrapping!) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Next Exam Row */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  gap: "8px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "8px", background: "rgba(13, 148, 136, 0.1)", color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Calendar size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 600 }}>ميعاد الامتحان القادم</div>
                      <div style={{ fontSize: "0.875rem", color: t.textPrimary, fontWeight: 700 }}>{group.examDate}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: t.primary, background: "rgba(13, 148, 136, 0.08)", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {group.examTime}
                  </div>
                </div>

                {/* Next Video Row */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  gap: "8px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: t.textSecondary, fontWeight: 600 }}>ميعاد نزول الفيديو</div>
                      <div style={{ fontSize: "0.875rem", color: t.textPrimary, fontWeight: 700 }}>{group.videoDate}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#2563EB", background: "rgba(59, 130, 246, 0.08)", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {group.videoTime}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div style={{ marginTop: "auto", paddingTop: "6px" }}>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/teacher/classrooms/${id || "stage_3"}/groups/${group.id}`)}
                  style={{ width: "100%", height: "36px", padding: "0 14px", borderRadius: "8px", fontSize: "0.8125rem", fontWeight: 700 }}
                  className="transition-colors"
                >
                  <span>عرض تفاصيل المجموعة</span>
                  <ChevronLeft size={15} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Group Modal (Reused) */}
      <Modal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        title={editGroup ? "تعديل بيانات المجموعة الدراسية" : "إنشاء مجموعة دراسية جديدة"}
        size="md"
      >
        <form onSubmit={handleGroupSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="اسم المجموعة"
            value={editGroupName}
            onChange={(e) => setEditGroupName(e.target.value)}
            placeholder="مثال: المجموعة أ - علمي رياضة..."
            required
          />
          <Input
            label="ميعاد الامتحان (التاريخ والوقت)"
            type="datetime-local"
            value={examDateInput}
            onChange={(e) => setExamDateInput(e.target.value)}
            required
          />
          <Input
            label="ميعاد نزول الفيديو (التاريخ والوقت)"
            type="datetime-local"
            value={videoDateInput}
            onChange={(e) => setVideoDateInput(e.target.value)}
            required
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
            <Button type="button" variant="secondary" onClick={() => setShowGroupModal(false)}>
              إلغاء
            </Button>
            <Button type="submit" variant="primary">
              {editGroup ? "حفظ التعديلات" : "إنشاء المجموعة"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Group Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تأكيد حذف المجموعة الدراسية"
        size="md"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "0.875rem", color: t.textSecondary, lineHeight: 1.6 }}>
            هل أنت متأكد من حذف <strong>{groupToDelete?.name}</strong>؟ سيؤدي هذا الإجراء إلى إزالة المجموعة وجميع الجداول والبيانات المرتبطة بها من القائمة. لا يمكن التراجع عن هذا الإجراء.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              حذف المجموعة
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ClassroomDetailPage;
