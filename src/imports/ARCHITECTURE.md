# درايَة (Draya) — Information Architecture & Screen Blueprint

**Version:** 1.0.0 (Production Blueprint)  
**Target Platform:** Web (React + TypeScript + Tailwind CSS v4) & Mobile (Flutter)  
**Language & Direction:** Arabic First · RTL Native (`dir="rtl"`)  
**Target Market:** Egyptian Educational Academies, Secondary School Students (Thanaweya Amma), Tutors & Parents  
**Author & Architect:** Principal Product Designer, Systems Architect & UX Director  

---

## 1. Product Structure & Hierarchy

Draya is structured into a strict 3-tier hierarchy: **باقة (Package) → كورس (Course) → محاضرة (Lecture)**.

```
Draya Platform
├── 01. Public & Marketing (Unauthenticated)
│   ├── SCR-01: Landing Page (الصفحة الرئيسية)
│   ├── SCR-02: About Academy (حول المنصة)
│   └── SCR-03: Pricing & Books (الكتب والأسعار)
├── 02. Authentication & Onboarding (Auth Gate)
│   ├── SCR-04: Login (تسجيل الدخول)
│   ├── SCR-05: Sign Up & Invite Code Entry (إنشاء حساب برمز الأكاديمية)
│   ├── SCR-06: Forgot & Reset Password (استعادة كلمة السر)
│   ├── SCR-07: Student Onboarding Wizard (إعداد حساب الطالب - ٣ خطوات)
│   └── SCR-08: Teacher Onboarding Wizard (إعداد حساب المعلم - ٣ خطوات)
├── 03. Student App Shell (الطالب)
│   ├── SCR-09: Student Dashboard (لوحة تحكم الطالب)
│   ├── SCR-10: My Subscriptions / Packages (باقاتي)
│   ├── SCR-11: Package Overview (تفاصيل الباقة والكورسات)
│   ├── SCR-12: Course Overview (تفاصيل الكورس والمحاضرات)
│   ├── SCR-13: Lecture Details Workspace (تفاصيل المحاضرة - شرح/واجب/امتحان/بنك/مراجعة)
│   ├── SCR-14: Exams Hub (قائمة الامتحانات)
│   ├── SCR-15: Quiz & Exam Taking Flow (جلسة أداء الامتحان - مؤقت وقواعد)
│   ├── SCR-16: Exam Results & Review (نتيجة الامتحان وتحليل الأخطاء)
│   ├── SCR-17: My Grades & Weak Areas (درجاتي ونقاط الضعف)
│   ├── SCR-18: Books Library & PDF Viewer (مكتبة الكتب والقارئ)
│   ├── SCR-19: Q&A Messages & Teacher Chat (الأسئلة والمحادثة مع المعلم)
│   ├── SCR-20: Student Notifications Center (مركز الإشعارات)
│   └── SCR-21: Student Profile & Settings (الملف الشخصي والإعدادات)
├── 04. Teacher App Shell (المعلم)
│   ├── SCR-22: Teacher Dashboard (لوحة تحكم المعلم)
│   ├── SCR-23: Packages Management (إدارة الباقات)
│   ├── SCR-24: Courses Management (إدارة الكورسات)
│   ├── SCR-25: Lecture Content Builder (إدارة وتنسيق المحاضرة)
│   ├── SCR-26: AI Exam Builder (مُنشيء الامتحانات بالذكاء الاصطناعي - ٥ خطوات)
│   ├── SCR-27: Student Roster & Group Filter (قائمة الطلبة والمجموعات)
│   ├── SCR-28: Student Academic Profile (ملف الطالب التفصيلي للمعلم)
│   ├── SCR-29: Class Analytics Dashboard (تحليلات الأداء وخريطة نقاط الضعف)
│   ├── SCR-30: AI Reports Generator & Approval Gate (التقارير الذكية واعتماد إرسال الولي)
│   └── SCR-31: Teacher Settings & Academy Workspace (إعدادات الحساب والأكاديمية)
└── 05. External Touchpoint (No App Screen)
    └── SCR-32: Parent Approved Email/Message Delivery (تقرير الولي المعتمد عبر البريد/الرسالة)
```

---

## 2. User Personas & Roles

### 2.1 Student (الطالب) — Thanaweya Amma Candidate
- **Goal:** Understand complex subjects, track weak topics without shame, and pass exams efficiently.
- **Primary Pain Points:** Exam anxiety, disorganized study materials, lack of feedback on weak areas.
- **Entry Point:** `SCR-09: Student Dashboard` via Login / Saved Session.
- **Exit Point:** Logout via Profile menu or browser close.
- **Permissions:** View subscribed content, take exams, download books, submit Q&A, view own grades.

### 2.2 Teacher (المعلم) — Egyptian Private Tutor / Academy Instructor
- **Goal:** Create exams in minutes using AI, detect lagging students, and send parent reports seamlessly.
- **Primary Pain Points:** Spending hours writing exam questions, tracking 200+ students manually on WhatsApp/Excel.
- **Entry Point:** `SCR-22: Teacher Dashboard` via Academy Invite Credentials.
- **Permissions:** Full CRUD on Packages/Courses/Lectures, run AI Exam Builder, review/edit AI questions, approve parent reports (`IsApproved = true`).

### 2.3 Parent (ولي الأمر) — Egyptian Family Sponsor
- **Goal:** Know if their child is making progress without nagging or managing app logins.
- **Primary Touchpoint:** `SCR-32: Parent Approved Message/Email` (Zero in-app screens by design).
- **Permissions:** Read-only access to approved summary reports sent via email/SMS.

### 2.4 Academy Admin (مدير الأكاديمية)
- **Goal:** Manage workspace billing, add/remove teachers, monitor overall academy metrics.
- **Permissions:** Full administrative workspace scope (`SCR-31`).

### 2.5 AI Assistant (المساعد الذكي)
- **Role:** Autonomous drafting and analytics engine. Runs RAG document parsing, drafts exam questions, summarizes weak topics, and prepares parent report drafts.
- **Constraint:** Silent background execution. Cannot publish or send content to parents directly without Teacher Approval.

---

## 3. Navigation Architecture

### 3.1 Primary Navigation
- **Student App:** Top Navbar (`SCR-09` to `SCR-21`). Links: الرئيسية (Home), باقاتي (Subscriptions), الامتحانات (Exams), درجاتي (Grades), الكتب (Books), القناة (External Channel).
- **Teacher App:** Right Sidebar (Workflow-grouped).
  - *التدريس (Teach):* لوحة التحكم (Dashboard), باقات (Packages), كورسات (Courses).
  - *التقييم (Assess):* الطلبة (Students), الامتحانات (Exams).
  - *التواصل (Communicate):* Feedback / الأسئلة.
  - *التحليل (Analyze):* التحليلات (Analytics), التقارير (Reports).

### 3.2 Navigation Rules & Limits
1. **Maximum Depth Limit:** Exactly **3 levels max**: `Subscriptions (Level 1) → Course Overview (Level 2) → Lecture Details (Level 3)`.
2. **RTL Mirroring:** Back navigation arrows use `<ChevronLeft size={20} className="rotate-180" />` (points Right `→`).
3. **Breadcrumbs:** Required on all Level 2 and Level 3 screens (e.g. `باقاتي > الرياضيات العامة > المحاضرة ٣`).

---

## 4. Complete Screen Inventory

| Screen ID | Screen Name | Owner Persona | Parent Screen | Required Permission | Status | Priority | Est. Complexity |
|---|---|---|---|---|---|---|---|
| `SCR-01` | Landing Page | Guest | None | Public | Implemented | High | Medium |
| `SCR-02` | About Academy | Guest | `SCR-01` | Public | Backlog | Low | Low |
| `SCR-03` | Pricing & Books Preview | Guest | `SCR-01` | Public | Backlog | Low | Low |
| `SCR-04` | Login | Guest | `SCR-01` | Public | Implemented | Critical | Low |
| `SCR-05` | Sign Up & Invite Code | Guest | `SCR-04` | Public | Planned | Critical | Medium |
| `SCR-06` | Forgot & Reset Password | Guest | `SCR-04` | Public | Planned | Critical | Low |
| `SCR-07` | Student Onboarding Wizard | Student | `SCR-05` | Student (First Login) | Planned | High | Medium |
| `SCR-08` | Teacher Onboarding Wizard | Teacher | `SCR-05` | Teacher (First Login) | Planned | High | Medium |
| `SCR-09` | Student Dashboard | Student | `SCR-04` | Student | Implemented | Critical | High |
| `SCR-10` | My Subscriptions / Packages| Student | `SCR-09` | Student | Implemented | High | Medium |
| `SCR-11` | Package Overview | Student | `SCR-10` | Student (Subscribed) | Planned | High | Medium |
| `SCR-12` | Course Overview | Student | `SCR-11` | Student (Subscribed) | Implemented | Critical | Medium |
| `SCR-13` | Lecture Details Workspace | Student | `SCR-12` | Student (Subscribed) | Implemented | Critical | High |
| `SCR-14` | Student Exams Hub | Student | `SCR-09` | Student | Implemented | High | Medium |
| `SCR-15` | Quiz & Exam Taking Flow | Student | `SCR-14` | Student (Enrolled) | Planned | Critical | High |
| `SCR-16` | Exam Results & Review | Student | `SCR-15` | Student (Submitted) | Planned | Critical | High |
| `SCR-17` | My Grades & Weak Areas | Student | `SCR-09` | Student | Implemented | High | High |
| `SCR-18` | Books Library & Reader | Student | `SCR-09` | Student | Implemented | Medium | Medium |
| `SCR-19` | Q&A Messages & Chat | Student | `SCR-13` | Student | Planned | Medium | Medium |
| `SCR-20` | Student Notifications | Student | `SCR-09` | Student | Planned | Low | Low |
| `SCR-21` | Student Profile & Settings | Student | `SCR-09` | Student | Planned | Low | Low |
| `SCR-22` | Teacher Dashboard | Teacher | `SCR-04` | Teacher | Implemented | Critical | High |
| `SCR-23` | Packages Management | Teacher | `SCR-22` | Teacher | Implemented | High | Medium |
| `SCR-24` | Courses Management | Teacher | `SCR-22` | Teacher | Implemented | High | Medium |
| `SCR-25` | Lecture Content Builder | Teacher | `SCR-24` | Teacher | Implemented | Critical | High |
| `SCR-26` | AI Exam Builder | Teacher | `SCR-22` | Teacher | Implemented | Critical | High |
| `SCR-27` | Student Roster & Groups | Teacher | `SCR-22` | Teacher | Implemented | High | Medium |
| `SCR-28` | Student Academic Profile | Teacher | `SCR-27` | Teacher | Planned | Medium | Medium |
| `SCR-29` | Class Analytics Dashboard | Teacher | `SCR-22` | Teacher | Implemented | High | High |
| `SCR-30` | AI Reports & Approval Gate| Teacher | `SCR-22` | Teacher | Implemented | Critical | High |
| `SCR-31` | Teacher Settings Workspace | Teacher | `SCR-22` | Teacher | Implemented | Low | Medium |

---

## 5. Detailed Screen Blueprints

*(Selected key blueprints representative of the core product)*

### 5.1 Blueprint: `SCR-15` — Quiz & Exam Taking Flow
- **Purpose:** Timed exam environment for students with anti-cheating protection.
- **Entry Point:** Tap "ابدأ الامتحان" on `SCR-14` or `SCR-13` (Exam tab).
- **Exit Point:** Submit button or Timer expiration → routes to `SCR-16: Exam Results`.
- **Required Data:** `ExamId`, `QuestionsList`, `TimeLimitMinutes`, `RandomizeOrder`.
- **Primary CTA:** "الانتقال للسؤال التالي" (Next Question) / "تسليم الامتحان" (Submit Exam).
- **6 Core States:**
  - *Default:* Timed question view with progress header (Q 3/20).
  - *Empty State:* N/A (Exam must contain >= 1 question).
  - *Loading Shimmer:* 3-bar shimmer while loading questions.
  - *Error State:* Connectivity drop banner ("انقطع الاتصال — تم حفظ إجاباتك محلياً").
  - *Success State:* Smooth auto-submit overlay when 100% completed.
  - *Permission State:* Prompt "ليس لديك صلاحية لدخول هذا الامتحان" if unsubscribed.
- **AI Behavior:** Zero AI interaction during active exam taking.
- **Accessibility:** `role="radiogroup"` for MCQ options; persistent ARIA countdown timer (`aria-live="off"`, reads aloud at 5m/1m remaining).

---

### 5.2 Blueprint: `SCR-26` — AI Exam Builder
- **Purpose:** Teacher interface to generate RAG-curated exams in under 4 minutes.
- **Entry Point:** Tap "امتحان جديد" on `SCR-22` or `SCR-24`.
- **Exit Point:** Tap "تأكيد ونشر" → routes to `SCR-24: Courses Management`.
- **Primary CTA:** "توليد الأسئلة بالذكاء الاصطناعي" (Step 1) / "تأكيد ونشر الامتحان" (Final Step).
- **5-Step Flow:** Setup (Group/Lecture) → RAG Generation → Question Review/Edit → Anti-cheating config → Distribute.
- **AI Behavior:** Displays 3-stage streaming progress ("جارٍ تحليل المحاضرة… → جارٍ توليد الأسئلة… → جارٍ الصياغة…"). Generated questions carry `AITag`. Single question can be regenerated via 1-click icon.

---

### 5.3 Blueprint: `SCR-30` — AI Reports Generator & Approval Gate
- **Purpose:** Generate chart-based student reports with AI narratives for parent delivery.
- **Entry Point:** Tap "التقارير" on Teacher Sidebar (`SCR-22`).
- **Exit Point:** Tap "موافقة وإرسال للولي" → triggers outbound email/message dispatch to parent.
- **Primary CTA:** "موافقة وإرسال للولي" (Approve & Send to Parent).
- **Critical Business Rule:** The primary CTA sets `IsApproved = true` in backend. **Zero unapproved AI reports can ever be sent to parents.**
- **States:** Draft State displays warning banner ("مسودة · لم يُرسَل بعد"); Approved State displays success badge ("تمت الموافقة · تم الإرسال").

---

## 6. End-to-End User Flows

### 6.1 Flow: AI Exam Generation & Distribution (Teacher)

```
[Teacher Dashboard]
        │
        ▼  (Tap "امتحان جديد")
[AI Exam Builder — Setup] ──► Select Group (السنة) & Lecture (الدرس)
        │
        ▼  (Tap "توليد الأسئلة")
[RAG Processing Progress] ──► (3-Stage Streaming Progress: Parse -> Draft -> Format)
        │
        ▼
[Review Question List]   ──► Teacher edits text / Regenerates / Deletes questions
        │
        ▼  (Tap "تأكيد الامتحان")
[Config & Distribute]    ──► Toggle Anti-cheating (Tab switch limit: 3) & Set Time Limit
        │
        ▼  (Tap "نشر")
[Published to Students]  ──► Notification dispatched to student group
```

---

### 6.2 Flow: Student Exam & AI Results Flow

```
[Student Dashboard / Exams Hub]
        │
        ▼  (Tap "ابدأ الامتحان")
[Instructions Screen]    ──► View rules, duration, question count
        │
        ▼  (Tap "تأكيد البدء")
[Active Timed Exam]     ──► Answer MCQs, Flag questions, Persistent timer
        │
        ▼  (Tap "تسليم")
[Review Grid Screen]     ──► View Answered / Flagged / Unanswered summary
        │
        ▼  (Confirm Submit)
[Exam Results Screen]    ──► Score reveal animation + Per-question breakdown + AI Feedback
        │
        ▼  (Auto-updates)
[My Grades & Weak Areas] ──► Weak topic added to student's remediation list
```

---

## 7. System State Machines

### 7.1 Exam Taking State Machine (`ExamSessionState`)

```
   [NotStarted]
        │  (Tap "ابدأ الامتحان")
        ▼
   [Instructions]
        │  (Tap "تأكيد")
        ▼
   [InProgress] ◄─── (Auto-save draft every 15s to localStorage)
        │
        ├─── (Network Disconnected) ──► [OfflineDraftSaved] ──► (Reconnected) ──┐
        │                                                                       │
        ▼  (Tap "تسليم" OR Timer Expired)                                      │
   [ReviewGrid] ◄──────────────────────────────────────────────────────────────┘
        │  (Confirm Submit)
        ▼
   [Submitted] ──► [AutoGrading] ──► [Graded & Results Visible]
```

### 7.2 AI Report State Machine (`AIReportState`)

```
   [Uninitiated] ──► (Teacher taps "إنشاء تقرير") ──► [GeneratingDraft]
                                                             │
                                                             ▼
   [Approved & Sent] ◄── (Teacher taps "موافقة وإرسال") ─── [Draft_NeedsApproval]
           │                                                 │
           │                                                 ├── (Teacher Edits Text) ──► [Draft_Modified]
           │                                                 └── (Teacher Rejects)    ──► [Discarded]
           ▼
   [DeliveredToParentEmail]
```

---

## 8. Data Flow & State Management

| Screen ID | Input Props / Route Params | Output Mutations | API Endpoint | Primary Cache Key |
|---|---|---|---|---|
| `SCR-09` | `userId` | None (Read) | `GET /api/student/dashboard` | `['student', 'dashboard']` |
| `SCR-13` | `lectureId`, `courseId` | `POST /api/lectures/complete` | `GET /api/lectures/{id}` | `['lecture', id]` |
| `SCR-15` | `examId` | `POST /api/exams/submit` | `GET /api/exams/{id}/take` | `['exam', id, 'take']` |
| `SCR-26` | `courseId`, `lectureId` | `POST /api/ai/generate-exam` | `POST /api/exams/create` | `['teacher', 'exams']` |
| `SCR-30` | `studentId`, `courseId` | `PUT /api/reports/{id}/approve` | `GET /api/reports/{id}` | `['report', id]` |

---

## 9. Access Control Matrix (RBAC)

| Feature / Screen Scope | Guest | Student | Teacher | Parent | Academy Admin |
|---|---|---|---|---|---|
| Landing & Public Pages (`SCR-01`–`SCR-03`)| View | View | View | View | View |
| Subscribed Courses (`SCR-10`–`SCR-13`) | Blocked | View (If Subscribed) | View & Edit | Blocked | View & Edit |
| Take Exams (`SCR-15`) | Blocked | Execute | Blocked | Blocked | Blocked |
| Run AI Exam Builder (`SCR-26`) | Blocked | Blocked | Execute & Edit | Blocked | Execute & Edit |
| Approve Parent Reports (`SCR-30`) | Blocked | Blocked | Execute (`IsApproved`) | Blocked | Execute |
| Receive Approved Email (`SCR-32`) | Blocked | Blocked | Blocked | Read-Only Email | Blocked |

---

## 10. Cross-Screen Relationships & IA

```
[SCR-10: Subscriptions] ──► [SCR-11: Package Overview] ──► [SCR-12: Course Overview] ──► [SCR-13: Lecture Details]
                                                                                                 │
                                                                                                 ├──► Tab 1: Explanation (Video/PDF)
                                                                                                 ├──► Tab 2: Homework
                                                                                                 ├──► Tab 3: Exam (Links to SCR-15)
                                                                                                 └──► Tab 4: Q&A (Links to SCR-19)
```

---

## 11. Edge Cases & Error Recovery

1. **Network Disconnect During Exam (`SCR-15`):** All selected answers auto-save to `localStorage` every 15s. UI displays warning banner: "انقطع الاتصال — إجاباتك محفوطة أوفلاين". Timer continues locally. Upon reconnection, draft payload auto-syncs to server.
2. **AI Generation Timeout (`SCR-26`):** If RAG pipeline exceeds 15 seconds, UI switches from progress bar to retry dialog: "استغرق التوليد وقتاً أطول من المعتاد — يمكنك الإعادة أو اختيار أسئلة يدويًا".
3. **Attempting Access to Unsubscribed Package (`SCR-11`):** Renders locked state with CTA: "اشترك في هذه الباقة للوصول للمحاضرات". Lecture details remain hidden.

---

## 12. Telemetry & Analytics Plan

| Event Name | Trigger Condition | Payload Properties | Business Value |
|---|---|---|---|
| `student_exam_started` | Student clicks "تأكيد البدء" on `SCR-15` | `exam_id`, `course_id`, `student_id` | Tracks exam engagement |
| `student_exam_completed` | Student submits exam on `SCR-15` | `exam_id`, `score`, `duration_seconds` | Measures performance |
| `weak_topic_detected` | Exam score <50% on topic | `student_id`, `topic_id`, `accuracy` | Feeds remediation engine |
| `ai_exam_generated` | Teacher completes Step 2 on `SCR-26` | `teacher_id`, `question_count`, `duration_ms` | Measures AI adoption |
| `ai_report_approved` | Teacher taps "موافقة وإرسال" on `SCR-30` | `report_id`, `teacher_id`, `student_id` | Core product success metric |

---

## 13. System-Wide UX Rules

1. **Back Navigation:** Always preserves previous scroll position and active filters.
2. **Modals:** Max 1 modal open at any time. Esc key closes modal. Focus trapped inside while active.
3. **Tables:** Default pagination 25 rows/page. Columns default to right-aligned text in RTL.
4. **Search Inputs:** Debounced by 300ms before triggering API requests. Minimum 2 characters required.

---

## 14. Future Expansion Architecture

- **Parent Portal v2 (`SCR-33`–`SCR-35`):** Reserved route paths for future optional parent login app.
- **Offline Mobile Native Sync:** Prepared schema for SQLite local caching in Flutter mobile builds.
- **Multi-Academy Tenant Routing:** URL routing structure supports `https://{academy_slug}.draya.edu`.

---

## 15. User Journey Maps

### 15.1 Student Journey Map: "Preparing for Chemistry Exam"

```
[Phase 1: Awareness] ──► [Phase 2: Learning] ──► [Phase 3: Testing] ──► [Phase 4: Reflection]
  Log in to Dashboard      Watch Video & Notes     Take Timed Quiz       Review AI Feedback
  Goal: Find due tasks     Goal: Understand topic  Goal: Pass with >80%  Goal: Know weak points
  Emotion: 😟 Anxious      Emotion: 😐 Focused     Emotion: 😬 Tense     Emotion: 😄 Relieved
```

- **Pain Point:** Fearing low score without knowing why.
- **Opportunity:** Instant AI question breakdown showing *why* an answer was wrong + restudy link to exact lecture timestamp.

---

### 15.2 Teacher Journey Map: "Weekly Exam Creation & Parent Reporting"

```
[Phase 1: Setup]     ──► [Phase 2: AI Build] ──► [Phase 3: Review]   ──► [Phase 4: Parent Report]
  Select Student Group    Trigger AI RAG         Edit Questions         Approve & Send Report
  Goal: Prep exam fast    Goal: 20 valid Qs      Goal: Ensure quality   Goal: Reassure parents
  Emotion: 😫 Tired       Emotion: 😮 Surprised  Emotion: 😎 In Control Emotion: 🎉 Satisfied
```

- **Success Criterion:** Exam created and published in under 4 minutes total.

---

## 16. Feature Dependency Map

```
[Academy Workspace] 
   └── [Teacher Profile]
        └── [Package Container]
             └── [Course]
                  ├── [Lecture] ──► [Uploaded PDF/Video Content]
                  │                    └── [RAG Document Indexing]
                  │                         └── [AI Exam Builder (SCR-26)]
                  └── [Student Enrollment]
                       └── [Exam Taking (SCR-15)]
                            └── [Auto-Grading & Analytics (SCR-29)]
                                 └── [AI Parent Report (SCR-30)] ──► (Requires IsApproved = true)
```

---

## 17. System Business Rules Catalog

### 17.1 Validation Rules
- **Passwords:** Minimum 8 characters, >=1 uppercase, >=1 digit.
- **Academy Invite Code:** Exactly 6 alphanumeric characters (e.g. `DRY-892`).

### 17.2 AI Safety & Approval Rules
- **Rule 1 (Approval Gate):** `IsApproved` boolean must equal `true` before outbound dispatch to parents (`SCR-30`).
- **Rule 2 (RAG Fallback):** If RAG search returns confidence score <0.65, AI Exam Builder displays `DATA_UNAVAILABLE` fallback prompt instead of hallucinating.

### 17.3 Exam Rules
- **Anti-Cheating:** Tab-switching out of `SCR-15` triggers a warning popup. Maximum 3 tab switches allowed before auto-submission.
- **Time Limits:** Timer is enforced server-side. Local time tampering has zero effect.

---

## 18. Notification Architecture

| Notification Event | Target Channel | Recipient | Trigger Condition |
|---|---|---|---|
| `EXAM_ASSIGNED` | In-App Bell + Push | Student | Teacher publishes new exam |
| `EXAM_DUE_REMINDER` | Mobile Push | Student | 2 hours remaining before exam deadline |
| `REPORT_APPROVED` | Email + SMS | Parent | Teacher taps "موافقة وإرسال" on `SCR-30` |
| `WEAK_TOPIC_ALERT` | In-App Bell | Student | Student accuracy falls below 50% on a topic |

---

## 19. AI System Architecture

- **RAG Document Parsing:** Uploaded lecture PDFs are parsed, chunked (500 tokens, 50 overlap), and indexed in vector storage tagged with `SubjectId`, `LessonId`, `DifficultyLevel`.
- **Exam Builder Pipeline:** RAG Query → Context Retrieval → Prompt Template → LLM Generation → Formatting Filter → Render in `SCR-26`.
- **Teacher Review Controls:** Every generated question provides: Edit Text (inline text area), Regenerate Question (1-click call), Delete Question.

---

## 20. Design-to-Development Mapping Matrix

| Screen ID | Main React Component | Key Child Components | Primary Endpoint | State Keys |
|---|---|---|---|---|
| `SCR-09` | `StudentDashboard` | `StatBadge`, `CourseCard`, `ProgressBar` | `GET /api/student/dashboard` | `['student', 'dashboard']` |
| `SCR-13` | `LectureDetails` | `VideoPlayer`, `PDFViewer`, `TabContainer` | `GET /api/lectures/{id}` | `['lecture', id]` |
| `SCR-15` | `ExamTakingSession` | `TimerRing`, `MCQOption`, `QuestionPalette`| `POST /api/exams/submit` | `['exam', id, 'take']` |
| `SCR-26` | `AIExamBuilder` | `StepWizard`, `AITag`, `QuestionCard` | `POST /api/ai/generate-exam` | `['teacher', 'exam-builder']` |
| `SCR-30` | `AIReportsManager` | `AIReportCard`, `ChartPreview`, `Btn` | `PUT /api/reports/{id}/approve` | `['report', id]` |

---

*End of ARCHITECTURE.md Specification — Draya Academic Platform*
