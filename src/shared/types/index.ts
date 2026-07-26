export type Role = "student" | "teacher";

// Mock data interfaces
export interface IStudent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  guardianEmail?: string;
  joinedDate: string;
  lastActive: string;
  performance: number; // percentage
  status: "active" | "at-risk" | "inactive";
  enrolledPackages: string[]; // package IDs
}
export interface IExam {
  id: string;
  title: string;
  questionsCount: number;
  durationMinutes: number;
  status: "draft" | "active" | "completed";
  submissionsCount: number;
  averageGrade: number;
}
