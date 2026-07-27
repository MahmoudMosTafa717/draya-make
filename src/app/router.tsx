import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
import OnboardingLayout from "./layouts/OnboardingLayout";

// Page Components
import LandingPage from "@/modules/landing/pages/landing/LandingPage";
import LoginPage from "@/modules/auth/pages/login/LoginPage";
import SignupPage from "@/modules/auth/pages/signup/SignupPage";
import VerifyEmailPage from "@/modules/auth/pages/verify-email/VerifyEmailPage";
import CompleteProfilePage from "@/modules/auth/pages/complete-profile/CompleteProfilePage";
import ForgotPasswordPage from "@/modules/auth/pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "@/modules/auth/pages/reset-password/ResetPasswordPage";
import LockedAccountPage from "@/modules/auth/pages/locked-account/LockedAccountPage";

// Onboarding Pages
import ChoosePlanPage from "@/modules/onboarding/pages/choose-plan/ChoosePlanPage";
import CheckoutPage from "@/modules/onboarding/pages/checkout/CheckoutPage";
import SuccessPage from "@/modules/onboarding/pages/success/SuccessPage";
import PlanDetailPage from "@/modules/onboarding/pages/plan-details/PlanDetailPage";

// Dashboard Pages
import TeacherDashboardPage from "@/modules/teacher/pages/dashboard/TeacherDashboardPage";
import StudentDashboardPage from "@/modules/student/pages/dashboard/StudentDashboardPage";

// Sprint 2 Pages
import SubscriptionPage from "@/modules/teacher/pages/subscription/SubscriptionPage";
import ClassroomsPage from "@/modules/teacher/pages/classrooms/ClassroomsPage";
import ClassroomDetailPage from "@/modules/teacher/pages/classroom-detail/ClassroomDetailPage";
import GroupDetailPage from "@/modules/teacher/pages/classroom-detail/GroupDetailPage";
import PackagesPage from "@/modules/teacher/pages/packages/PackagesPage";
import PackageDetailPage from "@/modules/teacher/pages/package-detail/PackageDetailPage";
import ChannelsListPage from "@/modules/teacher/pages/channels/ChannelsListPage";
import ChannelDetailPage from "@/modules/teacher/pages/channels/ChannelDetailPage";

// Sprint 3 Pages
import BrowseTeachersPage from "@/modules/student/pages/browse-teachers/BrowseTeachersPage";
import TeacherDetailsPage from "@/modules/student/pages/teachers/TeacherDetailsPage";
import PackageDetailsPage from "@/modules/student/pages/packages/PackageDetailsPage";
import MyPackagesPage from "@/modules/student/pages/my-packages/MyPackagesPage";
import StudentCheckoutPage from "@/modules/student/pages/checkout/CheckoutPage";

// Sprint 4 Pages
import ExamsListPage from "@/modules/student/pages/exams/ExamsListPage";
import TakeExamPage from "@/modules/student/pages/exams/take/TakeExamPage";
import ExamResultPage from "@/modules/student/pages/exams/result/ExamResultPage";
import NotificationsPage from "@/shared/pages/notifications/NotificationsPage";

// Sprint 5 Pages
import TeacherStudentsPage from "@/modules/teacher/pages/students/TeacherStudentsPage";
import TeacherStudentDetailPage from "@/modules/teacher/pages/students/TeacherStudentDetailPage";
import TeacherAnalyticsPage from "@/modules/teacher/pages/analytics/TeacherAnalyticsPage";
import AIReportsPage from "@/modules/teacher/pages/reports/AIReportsPage";
import TeacherSettingsPage from "@/modules/teacher/pages/settings/TeacherSettingsPage";
import AIExamBuilderPage from "@/modules/teacher/pages/exam-builder/AIExamBuilderPage";
import FeedbackPage from "@/modules/teacher/pages/feedback/FeedbackPage";
import StudentGradesPage from "@/modules/student/pages/grades/StudentGradesPage";
import StudentBooksPage from "@/modules/student/pages/books/StudentBooksPage";
import StudentProfilePage from "@/modules/student/pages/profile/StudentProfilePage";

// Placeholder Page Fallback
import PlaceholderPage from "@/shared/pages/placeholder/PlaceholderPage";

export const router = createBrowserRouter([
  // Public Landing / Auth Routes
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "", element: <LandingPage /> },
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "complete-profile", element: <CompleteProfilePage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "locked-account", element: <LockedAccountPage /> },
    ]
  },

  // Onboarding Billing Routes
  {
    path: "/onboarding",
    element: <OnboardingLayout />,
    children: [
      { path: "", element: <Navigate to="choose-plan" replace /> },
      { path: "choose-plan", element: <ChoosePlanPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "success", element: <SuccessPage /> },
    ]
  },
  {
    path: "/plans/:planId",
    element: <PlanDetailPage />
  },

  // Teacher Workspace Shell
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <TeacherDashboardPage /> },
      { path: "profile", element: <TeacherSettingsPage /> }, // Uses settings page for profile view
      { path: "subscription", element: <SubscriptionPage /> },
      { path: "classrooms", element: <ClassroomsPage /> },
      { path: "classrooms/:id", element: <ClassroomDetailPage /> },
      { path: "classrooms/:id/groups/:groupId", element: <GroupDetailPage /> },
      { path: "packages", element: <PackagesPage /> },
      { path: "packages/:id", element: <PackageDetailPage /> },
      { path: "channel", element: <ChannelsListPage /> },
      { path: "channel/:id", element: <ChannelDetailPage /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "channels", element: <ChannelsListPage /> },
      { path: "channels/:id", element: <ChannelDetailPage /> },
      { path: "exam-builder", element: <AIExamBuilderPage /> },
      { path: "students", element: <TeacherStudentsPage /> },
      { path: "students/:id", element: <TeacherStudentDetailPage /> },
      { path: "analytics", element: <TeacherAnalyticsPage /> },
      { path: "reports", element: <AIReportsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "settings", element: <TeacherSettingsPage /> },
    ]
  },

  // Student Workspace Shell
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <StudentDashboardPage /> },
      { path: "browse-teachers", element: <BrowseTeachersPage /> },
      { path: "teachers/:id", element: <TeacherDetailsPage /> },
      { path: "browse-packages", element: <BrowseTeachersPage /> }, // Reuses BrowseTeachersPage as browsing catalog
      { path: "packages/:id", element: <PackageDetailsPage /> },
      { path: "my-packages", element: <MyPackagesPage /> },
      { path: "checkout", element: <StudentCheckoutPage /> },
      { path: "exams", element: <ExamsListPage /> },
      { path: "exams/:id/take", element: <TakeExamPage /> },
      { path: "exams/:id/result", element: <ExamResultPage /> },
      { path: "grades", element: <StudentGradesPage /> },
      { path: "books", element: <StudentBooksPage /> },
      { path: "profile", element: <StudentProfilePage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ]
  },

  // 404 Fallback
  {
    path: "*",
    element: <PlaceholderPage title="صفحة غير موجودة - 404" description="عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها." />
  }
]);
