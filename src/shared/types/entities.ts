// Study level hierarchy types
export type StudyLevel = "primary" | "preparatory" | "secondary";

export interface IClassroom {
  id: string;
  name: string;
  studyLevel: StudyLevel;
  teacherId: string;
  packageId: string | null;
  studentCount: number;
  examSchedule: IExamSchedule[];
  videoReleaseSchedule: IReleaseSchedule[];
  createdAt: string;
  archived: boolean;
}

export interface IExamSchedule {
  examId: string;
  examTitle: string;
  startDate: string;
  endDate: string;
  durationMinutes: number;
}

export interface IReleaseSchedule {
  lessonId: string;
  lessonTitle: string;
  releaseDate: string;
}

// Packages & chapters
export interface IPackage {
  id: string;
  name: string;
  subject: string;
  description: string;
  price: number;
  status: "draft" | "published" | "archived";
  chapters: IChapter[];
  studentCount: number;
  enrollmentCode: string | null;
}

export interface IChapter {
  id: string;
  title: string;
  order: number;
  lessons: ILesson[];
}

export interface ILesson {
  id: string;
  title: string;
  order: number;
  videoUrl: string | null;
  pdfUrl: string | null;
  homeworkId: string | null;
  examId: string | null;
  duration: number; // minutes
}

// Enrollment codes
export interface IEnrollmentCode {
  code: string;
  packageId: string;
  usageLimit: number | null;
  usageCount: number;
  expiresAt: string | null;
  active: boolean;
}

// Quota usage monitoring for teachers
export interface IQuota {
  maxStudents: number;
  usedStudents: number;
  maxStorage: number; // in MB
  usedStorage: number;
  maxPackages: number;
  usedPackages: number;
  maxClassrooms: number;
  usedClassrooms: number;
}

export interface ISubscription {
  planTier: "starter" | "professional" | "enterprise";
  status: "active" | "expired" | "cancelled";
  expiresAt: string;
  quota: IQuota;
}
