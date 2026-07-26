# درايَة (Draya) — Screen Specification Blueprint

**Version:** 3.0.0 (Exhaustive 32-Screen Specification)  
**Target Platform:** Web (React 18+ / TypeScript / Tailwind CSS v4) & Mobile (Flutter)  
**Language & Direction:** Arabic First · RTL Native (`dir="rtl"`)  
**Target Market:** Egyptian Educational Academies, Secondary School Students (Thanaweya Amma), Tutors & Parents  
**Author & Director:** Principal Product Designer, Visual Design System Director & Lead UX Architect  

---

## 1. Global Screen Blueprint Standard

This specification bridges [DESIGN.md](file:///c:/Users/ana7o/Downloads/Implement%20Design%20System%20for%20Draya/DESIGN.md) (Design System Tokens) and [ARCHITECTURE.md](file:///c:/Users/ana7o/Downloads/Implement%20Design%20System%20for%20Draya/ARCHITECTURE.md) (Information Architecture & Screen Inventory) into an exact visual and functional blueprint for every screen (`SCR-01` through `SCR-32`).

### 1.1 Structural Layout Templates Mapping

| Template ID | Template Name | Max Width | Page Background Token | Typical Usage |
|---|---|---|---|---|
| `TPL-01` | Auth Split Screen | 100% Split (50/50) | `color-bg-base` / `color-primary-900` | Login (`SCR-04`), Signup (`SCR-05`), Forgot Password (`SCR-06`) |
| `TPL-02` | Dashboard Workspace | 1200px (Fluid) | `color-bg-base` (`#FBFAF7`) | Student Dashboard (`SCR-09`), Teacher Dashboard (`SCR-22`) |
| `TPL-03` | Catalog Grid | 1200px | `color-bg-base` | Subscriptions (`SCR-10`), Books (`SCR-18`), Packages (`SCR-23`) |
| `TPL-04` | Details Workspace | 1200px | `color-bg-base` | Course Overview (`SCR-12`), Lecture Details (`SCR-13`) |
| `TPL-05` | Exam Session | 1000px | `color-bg-surface` (`#FFFFFF`) | Quiz & Exam Taking (`SCR-15`) |
| `TPL-06` | Management Table | 1400px (Fluid) | `color-bg-base` | Student Roster (`SCR-27`), Courses List (`SCR-24`) |
| `TPL-07` | Analytics Workspace | 1400px (Fluid) | `color-bg-base` | Grades (`SCR-17`), Class Analytics (`SCR-29`) |
| `TPL-08` | Multistep Wizard | 560px Centered | `color-bg-base` | Onboarding (`SCR-07`/`08`), AI Exam Builder (`SCR-26`) |
| `TPL-09` | Overlay Modal | 560px Container | Backdrop Blur (`rgba(12,46,41,0.5)`) | Create Package Modal, Quick Edit Modals |
| `TPL-10` | Marketing Hero | 100% Bleed | `color-primary-900` (`#0C2E29`) | Landing Page (`SCR-01`) |

---

## 2. Viewport Component Variants & Motion Matrix

### 2.1 Viewport Adaptation Matrix

| Component | Desktop (>1280px) | Tablet (768px–1024px) | Mobile (<640px) | Compact Rail / Sidebar |
|---|---|---|---|---|
| `CourseCard` | 3-Column Grid, 16:9 Cover | 2-Column Grid, 16:9 Cover | 1-Column Full Width, 16:9 Cover | Horizontal Row (80px Image Left/Right) |
| `PackageCard` | 3-Column Grid, 4:3 Cover | 2-Column Grid, 4:3 Cover | 1-Column Card Stack | Compact List Item with Badge |
| `StatBadgeCard` | 4-Column Row, 32px Number | 2×2 Grid, 28px Number | 2×2 Grid, 24px Number | Single Inline Metric Badge |
| `AIReportCard` | 2-Column (Preview + Edit) | 1-Column Stacked View | 1-Column Stacked View | Hidden |
| `QuestionCard` | Full Width Card (padding 24px)| Full Width Card (padding 16px)| 1-Column Full Width (padding 12px)| Compact Question Summary Row |

### 2.2 Component Motion Reference

| Interaction | Trigger | CSS / Animation Token | Timing & Easing |
|---|---|---|---|
| Card Hover Lift | Mouse Enter | `transform: translateY(-3px); boxShadow: var(--draya-shadow-2)` | `150ms var(--draya-ease-out)` |
| Primary Button Press | Mouse Down | `transform: scale(0.98); background: var(--draya-primary-500)` | `100ms var(--draya-ease-out)` |
| Focus Ring Reveal | Keyboard Tab | `boxShadow: 0 0 0 2px #FFF, 0 0 0 4px var(--draya-primary-500)` | Immediate (`0ms`) |
| Page Entry Transition | Route Change | `opacity: 0 → 1; transform: translateY(12px → 0)` | `200ms var(--draya-ease-out)` |
| AI Staggered Question Entry | Generation Finish | `opacity: 0 → 1; transform: translateY(16px → 0)` | `40ms` stagger per card |
| Modal Backdrop Reveal | Modal Trigger | `opacity: 0 → 1; backdropFilter: blur(4px)` | `200ms var(--draya-ease-out)` |

---

## 3. Exhaustive 32-Screen Specifications

---

### 🏠 `SCR-01`: Landing Page (الصفحة الرئيسية)
- **Header & Context:** Screen ID: `SCR-01` · Title: `الصفحة الرئيسية — درايَة` · Target Persona: Guest · Route: `/` · Layout: `TPL-10` (Marketing Hero).
- **Visual Priority Hierarchy:** 1. Hero Headline & Primary Pill CTA → 2. Floating Stat Badges → 3. 3-Step Feature Showcase → 4. Footer Links.
- **Visual Asset Inventory:** Photos: `heroLanding` (Egyptian student studying with tablet, cool-teal graded 21:9). Icons: `GraduationCap`, `Sparkles`, `BookOpen`, `ShieldCheck`, `CheckCircle`, `ArrowLeft`. Patterns: `BlobBg` DARK (6% opacity).
- **Hero Specification:** Headline: `درايَة — منصة التعلم الأكاديمي الذكي الموجه لطلاب المعلمين والسناتر` (`text-h1`, 32px, Bold, color `#FFF`). Sub-copy: `توليد الامتحانات بالذكاء الاصطناعي، اكتشاف نقاط الضعف، وتقارير أولياء الأمور المعتمدة.` Primary CTA: "سجّل حسابك الآن" (`Btn` primary, size lg, pill). Secondary CTA: "شاهد فيديو التوضيح".
- **Section Specifications:**
  - *Sec 1 (Hero):* Purpose: Convert visitors. Priority: Level 1. Data: Static. Grid: 50/50 split. Mobile: 1-column stack. CTA: Routes to `SCR-05`.
  - *Sec 2 (Stats):* Purpose: Credibility. Priority: Level 2. Data: `GET /api/public/stats`. Max Items: 4. Desktop: 4-col row (`color-primary-900` bg). Mobile: 2×2 grid.
  - *Sec 3 (Features):* Purpose: Value proposition. Priority: Level 2. Data: Static. Alternating 3-row layout.
- **UX Microcopy Dictionary:** Title: `درايَة — منصة التعلم الذكي` · CTA: `ابدأ التجربة المجانية` · Feature: `امتحانات موجهة بالذكاء الاصطناعي في ٤ دقائق`.
- **Design Constraints:** Max 1 primary CTA above fold. Hero blob opacity max 6%. Header sticky solid on scroll (>100px).
- **Component States:** Navbar default transparent → solid on scroll. Hero buttons hover shift background 150ms.
- **AI Behavior:** N/A (Marketing context).
- **Responsive Behavior:** Hero text Right, image Left in RTL desktop; stacks vertically on mobile (<640px) with photo hidden.
- **Implementation Notes:** Design: `FloatBadge` uses `radius-full` (999px). Dev: Lazy load feature images. Dependencies: Lucide React icons.
- **Screen Generation Checklist:** [x] Hero headline [x] Pill CTA [x] Floating badges [x] 4-col stats banner [x] 3 feature rows [x] Footer [x] Mobile responsive [x] ARIA landmark rules.

---

### ℹ️ `SCR-02`: About Academy (حول المنصة)
- **Header & Context:** Screen ID: `SCR-02` · Title: `عن منصة درايَة` · Target Persona: Guest · Route: `/about` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. Mission Statement Headline & Classroom Photo → 2. AI Trinity Strategy Grid → 3. Educator Testimonials → 4. FAQ Accordion.
- **Visual Asset Inventory:** Photos: `classroomSocial` (Egyptian academy room). Icons: `Brain`, `ShieldCheck`, `Globe`, `Users`, `HelpCircle`, `ChevronDown`. Patterns: Clean canvas (`color-bg-base`).
- **Hero Specification:** N/A (Catalog header style).
- **Section Specifications:**
  - *Sec 1 (Mission Banner):* Purpose: Introduce academic vision. Priority: Level 1. Data: Static. Grid: Centered max-800px column.
  - *Sec 2 (AI Trinity Grid):* Purpose: Explain LLM + RAG + Agent framework. Priority: Level 2. Data: Static. Grid: 3-column cards.
  - *Sec 3 (FAQ Accordion):* Purpose: Answer common questions. Priority: Level 3. Components: Accordion stack (max 6 items).
- **UX Microcopy Dictionary:** Title: `نحدث ثورة في إدارة السناتر والتعليم الخاص` · Sub-title: `درايَة تجمع بين خبرة المعلم المصري والذكاء الاصطناعي الموجه` · CTA: `انضم كمعلم`.
- **Design Constraints:** Max 1 primary CTA at page bottom. Background strictly `color-bg-base`. Accordion single-expand mode.
- **Component States:** Accordion items expand/collapse smoothly over 200ms ease-out (`--draya-duration-normal`).
- **AI Behavior:** Explanatory graphics detailing teacher-in-the-loop AI safety rules.
- **Responsive Behavior:** 3-column grid collapses to 1-column stack on mobile (<640px).
- **Implementation Notes:** Design: Card surfaces use `color-bg-surface` with `shadow-1`. Dev: Standard HTML details/summary or Radix Accordion.
- **Screen Generation Checklist:** [x] Mission banner [x] 3-col AI Trinity cards [x] Testimonials row [x] FAQ accordion [x] Bottom CTA [x] Responsive layout [x] ARIA tags [x] Alt text.

---

### 💳 `SCR-03`: Pricing & Books Preview (الكتب والأسعار)
- **Header & Context:** Screen ID: `SCR-03` · Title: `الخطط والكتب — درايَة` · Target Persona: Guest · Route: `/pricing` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. Elevated Featured Plan Card → 2. Secondary Plan Cards → 3. Sample PDF Books Showcase Grid → 4. Payment Methods Banner.
- **Visual Asset Inventory:** Photos: PDF book cover thumbnails (3:4 ratio). Icons: `Package`, `BookMarked`, `Check`, `Zap`, `CreditCard`, `Lock`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Pricing Cards):* Purpose: Drive plan conversions. Priority: Level 1. Data: `GET /api/public/plans`. Max Items: 3 plans. Featured plan uses `1.5px solid color-primary-700` border + `shadow-2` + `12px` upward offset.
  - *Sec 2 (Books Preview Grid):* Purpose: Showcase sample notes. Priority: Level 2. Data: `GET /api/public/sample-books`. Grid: 4-column cards.
- **UX Microcopy Dictionary:** Title: `خطط اشتراك شفافة تناسب كل المعلمين والسناتر` · Featured Badge: `الأكثر طلباً` · CTA: `اشترك الآن`.
- **Design Constraints:** Featured tier sits `12px` higher than adjacent cards via `transform: translateY(-12px)`.
- **Component States:** Pricing card hover lifts by additional `3px` (`translateY(-15px)` for featured).
- **AI Behavior:** Plan features highlight "توليد امتحانات بالذكاء الاصطناعي غير محدود".
- **Responsive Behavior:** Pricing cards stack vertically on mobile (<640px) with offset removed.
- **Implementation Notes:** Dev: Toggle switcher for Monthly vs Annual billing (`20% discount` badge).
- **Screen Generation Checklist:** [x] Monthly/Annual toggle [x] 3 pricing cards [x] Featured elevation [x] Books preview 4-col grid [x] Payment logos [x] Responsive stack [x] ARIA buttons [x] Focus rings.

---

### 🔑 `SCR-04`: Login (تسجيل الدخول)
- **Header & Context:** Screen ID: `SCR-04` · Title: `تسجيل الدخول — درايَة` · Target Persona: Guest · Route: `/login` · Layout: `TPL-01` (Auth Split).
- **Visual Priority Hierarchy:** 1. Login Form Container & Input Stack → 2. Primary "تسجيل الدخول" Button → 3. "نسيت كلمة السر؟" link → 4. Left Photo Panel.
- **Visual Asset Inventory:** Photos: `studentStudy` (Left panel photo, cool-teal graded). Icons: `GraduationCap`, `Mail`, `Lock`, `Eye`, `EyeOff`, `AlertTriangle`. Patterns: `DecorativeScatter` (6 thin-line icons at 8% opacity).
- **Hero Specification:** N/A (Form container header).
- **Section Specifications:**
  - *Sec 1 (Auth Form Container):* Purpose: Authenticate users. Priority: Level 1. Data: `POST /api/auth/login`. Form fields: Email, Password. Form gap: `16px`.
- **UX Microcopy Dictionary:** Title: `أهلاً بك مجدداً في درايَة` · Sub-title: `أدخل بيانات حسابك للمتابعة` · Email Label: `البريد الإلكتروني` · Password Label: `كلمة السر` · CTA: `تسجيل الدخول` · Signup Prompt: `ليس لديك حساب؟ انضم برمز الأكاديمية`.
- **Design Constraints:** Exactly 1 primary CTA button. Left photo panel hidden on mobile (<768px). Field gaps strictly `16px`.
- **Component States:** Password visibility eye icon toggles input type `password` ↔ `text`. Error state displays inline red banner.
- **AI Behavior:** N/A.
- **Responsive Behavior:** 50/50 split container on desktop; forms takes 100% width on mobile with photo panel removed.
- **Implementation Notes:** Dev: Auto-focus email input on page load. Store JWT in secure httpOnly cookie.
- **Screen Generation Checklist:** [x] Academy Logo [x] Form title [x] Email field [x] Password field + toggle [x] Remember checkbox [x] Primary CTA [x] Signup link [x] Error state.

---

### ✍️ `SCR-05`: Sign Up & Invite Code Entry (إنشاء حساب برمز الأكاديمية)
- **Header & Context:** Screen ID: `SCR-05` · Title: `إنشاء حساب جديد — درايَة` · Target Persona: Guest · Route: `/signup` · Layout: `TPL-01` (Auth Split).
- **Visual Priority Hierarchy:** 1. Academy Invite Code Input Field → 2. Personal Registration Fields → 3. "إنشاء الحساب" Primary Button → 4. Login Link.
- **Visual Asset Inventory:** Photos: `studentLaptop` (Left photo panel). Icons: `Key`, `User`, `Mail`, `Lock`, `CheckCircle2`, `Building`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Invite Code & Registration Form):* Purpose: Gated registration via Academy Invite Code. Priority: Level 1. Data: `POST /api/auth/signup`. Fields: Academy Code (`DRY-XXX`), Full Name, Email, Password, Terms Checkbox.
- **UX Microcopy Dictionary:** Title: `إنشاء حساب طالب جديد` · Code Label: `رمز الأكاديمية / الدعوة` · Code Placeholder: `مثال: DRY-892` · Submit: `تأكيد وإنشاء الحساب`.
- **Design Constraints:** Role is NOT user-selectable; role is assigned automatically by validating the Academy Invite Code.
- **Component States:** Validating code displays green `CheckCircle2` icon next to input. Invalid code shows red helper text: "رمز الدعوة غير صحيح".
- **AI Behavior:** N/A.
- **Responsive Behavior:** 100% form width on mobile (<768px).
- **Implementation Notes:** Dev: Debounce invite code validation API call by 400ms.
- **Screen Generation Checklist:** [x] Invite code input [x] Code validator icon [x] Name field [x] Email field [x] Password field [x] Terms checkbox [x] Primary CTA [x] Login link.

---

### 🔒 `SCR-06`: Forgot & Reset Password (استعادة كلمة السر)
- **Header & Context:** Screen ID: `SCR-06` · Title: `استعادة كلمة السر — درايَة` · Target Persona: Guest · Route: `/forgot-password` · Layout: `TPL-08` (Wizard).
- **Visual Priority Hierarchy:** 1. Email Recovery Form Card → 2. Primary "إرسال رابط الاستعادة" Button → 3. Back to Login Link.
- **Visual Asset Inventory:** Photos: None. Icons: `Mail`, `KeyRound`, `CheckCircle`, `ArrowRight`. Patterns: Clean canvas.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Recovery Request Form):* Purpose: Capture account email. Priority: Level 1. Data: `POST /api/auth/forgot-password`. Input: Email.
  - *Sec 2 (Confirmation Banner):* Purpose: Confirm dispatch. Appears after submission showing green checkmark + email sent text.
- **UX Microcopy Dictionary:** Title: `استعادة الوصول لحسابك` · Sub-title: `أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة ضبط كلمة السر` · CTA: `إرسال رابط الاستعادة`.
- **Design Constraints:** Form container max-width `480px` centered. Single primary CTA button.
- **Component States:** Success state replaces form with confirmation card without page reload.
- **AI Behavior:** N/A.
- **Responsive Behavior:** Margins collapse to 16px on mobile.
- **Implementation Notes:** Dev: Rate limit password reset requests to 3 per hour per IP.
- **Screen Generation Checklist:** [x] Centered card [x] Email field [x] Primary CTA [x] Success confirmation state [x] Back to login link [x] Focus rings [x] ARIA tags.

---

### 🎓 `SCR-07`: Student Onboarding Wizard (إعداد حساب الطالب)
- **Header & Context:** Screen ID: `SCR-07` · Title: `إعداد حساب الطالب — درايَة` · Target Persona: Student (First Login) · Route: `/onboarding/student` · Layout: `TPL-08` (3-Step Wizard).
- **Visual Priority Hierarchy:** 1. Academic Stage Selection Grid → 2. Step Progress Dots Indicator → 3. Progression CTA Button.
- **Visual Asset Inventory:** Photos: None. Icons: `GraduationCap`, `BookOpen`, `Bell`, `Check`, `ChevronLeft`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Step 1 (Academic Year Select):* Select السنة الدراسية (Thanaweya 1/2/3). 3 selectable option cards.
  - *Step 2 (Academy Confirmation):* Confirm Academy name & Teacher workspace attached to invite code.
  - *Step 3 (Notification Preferences):* Toggle exam reminders & report delivery alerts.
- **UX Microcopy Dictionary:** Step 1 Title: `اختر سنتك الدراسية` · Step 2 Title: `تأكيد الانضمام للأكاديمية` · Step 3 Title: `تفعيل الإشعارات` · CTA: `إتمام الإعداد وتوجه للوحة التحكم`.
- **Design Constraints:** Multi-step container centered `560px`. Step dots persistent at card top.
- **Component States:** Selected academic year card highlights with `color-primary-50` background + `1.5px solid color-primary-700` border.
- **AI Behavior:** N/A.
- **Responsive Behavior:** Option cards stack vertically on mobile (<640px).
- **Implementation Notes:** Dev: Write selected year and notifications config to `user_metadata`.
- **Screen Generation Checklist:** [x] 3-step progress dots [x] Academic year option cards [x] Academy confirm card [x] Notification toggles [x] Primary CTA [x] Mobile stack.

---

### 👨‍🏫 `SCR-08`: Teacher Onboarding Wizard (إعداد حساب المعلم)
- **Header & Context:** Screen ID: `SCR-08` · Title: `إعداد حساب المعلم — درايَة` · Target Persona: Teacher (First Login) · Route: `/onboarding/teacher` · Layout: `TPL-08` (3-Step Wizard).
- **Visual Priority Hierarchy:** 1. Workspace Profile & Subject Form → 2. Student Group Tags Input → 3. Complete Setup CTA Button.
- **Visual Asset Inventory:** Photos: Logo upload placeholder. Icons: `Building`, `BookPlus`, `Users`, `CheckCircle`, `Upload`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Step 1 (Workspace Info):* Academy Name, Primary Subject, Phone/WhatsApp.
  - *Step 2 (Group Creation):* Add student year/group tags (e.g. `الصف الثالث الثانوي - مجموعة أ`).
  - *Step 3 (Course Prompt):* Create initial course container or skip.
- **UX Microcopy Dictionary:** Step 1 Title: `إعداد اسم الأكاديمية والتخصص` · Step 2 Title: `إنشاء مجموعات الطلاب` · CTA: `إنشاء مساحة العمل والبدء`.
- **Design Constraints:** Step 2 allows adding multiple group tags dynamically via `+ إضافة مجموعة` button.
- **Component States:** Input tags render as teal pill badges with `×` remove buttons.
- **AI Behavior:** N/A.
- **Responsive Behavior:** Centered 560px on desktop; full width on mobile.
- **Implementation Notes:** Dev: Auto-generate first invite code (`DRY-XXX`) upon onboarding completion.
- **Screen Generation Checklist:** [x] Step dots [x] Workspace fields [x] Group tag creator [x] Logo dropzone [x] Primary CTA [x] Skip button on Step 3.

---

### 📊 `SCR-09`: Student Dashboard (لوحة تحكم الطالب)
- **Header & Context:** Screen ID: `SCR-09` · Title: `لوحة التحكم — الطالب` · Target Persona: Student · Route: `/student/dashboard` · Layout: `TPL-02` (Dashboard Workspace).
- **Visual Priority Hierarchy:** 1. Personal Greeting ("أهلاً، أحمد! 👋") & "Continue Learning" Carousel → 2. Quick Stat Badges → 3. Weak Areas Sidebar Card.
- **Visual Asset Inventory:** Photos: Unique 16:9 course thumbnails. Icons: `Flame`, `BookOpen`, `ClipboardList`, `TrendingUp`, `AlertTriangle`, `ChevronLeft`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Header Banner):* Purpose: Greet student & display streak. Priority: Level 1. Data: `GET /api/student/dashboard`. Displays `Flame` streak badge ("🔥 ٧ أيام متواصلة").
  - *Sec 2 (Stats Row):* Purpose: Academic status. Priority: Level 2. Components: `StatBadgeCard` (×4). 4-col desktop, 2×2 mobile.
  - *Sec 3 (Continue Learning Carousel):* Purpose: 1-click lecture jump. Priority: Level 1. Horizontal carousel (max 6 courses).
  - *Sec 4 (Weak Areas Sidebar):* Purpose: Prompt remediation. Priority: Level 2. List of top 3 weak topics + "مراجعة الدرس" CTA.
- **UX Microcopy Dictionary:** Greeting: `صباح الخير، أحمد!` · Streak: `🔥 ٧ أيام متواصلة` · Carousel Title: `متابعة التعلم` · Weak Areas Title: `نقاط تحتاج إلى مراجعة` · CTA: `ابدأ المراجعة الآن →`.
- **Design Constraints:** Zero SVG blobs or scatter textures allowed on dashboard. Page background strictly `color-bg-base`.
- **Component States:** Course card hover lifts `translateY(-3px)` + `shadow-2`. Streak badge pulses subtly on entry.
- **AI Behavior:** Weak Areas card powered by automated student error analytics.
- **Responsive Behavior:** Sidebar moves below main carousel on mobile (<1024px); stats convert to 2×2 grid.
- **Implementation Notes:** Dev: SWR cache key `['student', 'dashboard']`. Lazy load carousel cards.
- **Screen Generation Checklist:** [x] Dynamic greeting [x] Streak badge [x] 4 stat cards [x] Course carousel [x] Weak areas sidebar card [x] Mobile layout [x] Accessibility.

---

### 📦 `SCR-10`: My Subscriptions / Packages (باقاتي)
- **Header & Context:** Screen ID: `SCR-10` · Title: `باقاتي واشتراكاتي — درايَة` · Target Persona: Student · Route: `/student/subscriptions` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. Subscribed Package Cards Grid → 2. Search & Subject Filter Bar → 3. Browse Available Packages Banner.
- **Visual Asset Inventory:** Photos: Package cover photos (4:3 ratio). Icons: `Package`, `Search`, `Filter`, `Lock`, `CheckCircle`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Search & Filter Bar):* Search input (`300ms` debounce) + Subject filter select trigger.
  - *Sec 2 (Active Subscriptions Grid):* 3-column grid of subscribed package cards showing course count & overall progress bar.
  - *Sec 3 (Available Packages Read-Only):* Unsubscribed packages shown with `Lock` icon overlay; clicking displays subscription modal.
- **UX Microcopy Dictionary:** Title: `باقاتي الدراسية` · Search Placeholder: `ابحث عن باقة أو مادة…` · Subscribed Tag: `مشترك` · Locked Tag: `غير مشترك`.
- **Design Constraints:** Subscribed package cards display green `CheckCircle` tag; unsubscribed display `Lock` icon + muted overlay.
- **Component States:** Input focus glow `rgba(29,110,99,0.15)`. Card hover lifts `translateY(-3px)`.
- **AI Behavior:** N/A.
- **Responsive Behavior:** 3-column grid → 2-column tablet → 1-column mobile card stack.
- **Implementation Notes:** Dev: Filter packages locally when query length >= 2 characters.
- **Screen Generation Checklist:** [x] Search bar [x] Filter select [x] Subscribed 3-col grid [x] Progress bars [x] Locked package cards [x] Subscription modal trigger.

---

### 📦 `SCR-11`: Package Overview (تفاصيل الباقة والكورسات)
- **Header & Context:** Screen ID: `SCR-11` · Title: `تفاصيل الباقة — درايَة` · Target Persona: Student · Route: `/student/package/:id` · Layout: `TPL-04` (Details Workspace).
- **Visual Priority Hierarchy:** 1. Package Header Banner & Subject Info → 2. Courses Grid inside Package → 3. Package Progress Summary.
- **Visual Asset Inventory:** Photos: Package banner photo (21:9 ratio). Icons: `BookOpen`, `Clock`, `UserCheck`, `ChevronLeft`, `CheckCircle`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Package Banner):* Title, Subject, Teacher Name, Total Courses count, Enrolled status badge.
  - *Sec 2 (Included Courses Grid):* 3-column grid of course cards belonging to this package.
- **UX Microcopy Dictionary:** Breadcrumb: `باقاتي > باقة الكيمياء الشاملة` · Title: `الكورسات المتاحة داخل هذه الباقة` · Progress Label: `نسبة إنجاز الباقة`.
- **Design Constraints:** Breadcrumb mandatory at top. Package cover banner aspect ratio 21:9.
- **Component States:** Course card displays completion checkmark badge if all lectures finished.
- **AI Behavior:** N/A.
- **Responsive Behavior:** 3-col course grid collapses to 1-col stack on mobile (<640px).
- **Implementation Notes:** Dev: Fetch package details via `GET /api/packages/{id}`.
- **Screen Generation Checklist:** [x] Breadcrumb [x] Package hero banner [x] Teacher avatar [x] Overall progress bar [x] 3-col courses grid [x] Responsive layout.

---

### 📚 `SCR-12`: Course Overview (تفاصيل الكورس والمحاضرات)
- **Header & Context:** Screen ID: `SCR-12` · Title: `تفاصيل الكورس — درايَة` · Target Persona: Student · Route: `/student/course/:id` · Layout: `TPL-04` (Details Workspace).
- **Visual Priority Hierarchy:** 1. Course Header & Overall Progress Bar → 2. Ordered Lecture List Cards → 3. Teacher Info Snippet.
- **Visual Asset Inventory:** Photos: Course cover photo (16:9 ratio). Icons: `Play`, `FileType`, `CheckCircle`, `Lock`, `Clock`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Course Header):* Title, Cover Photo, Progress bar (`%` complete), Teacher avatar/name.
  - *Sec 2 (Lectures List):* Vertical stack of numbered lecture cards (`LectureCard`). Statuses: Completed (green check), In Progress, Locked.
- **UX Microcopy Dictionary:** Title: `الكيمياء العضوية — الصف الثالث الثانوي` · Progress: `تم إنجاز ٤ من ١٢ محاضرة` · Lecture Action: `ابدأ المحاضرة الآن`.
- **Design Constraints:** Lectures strictly ordered by sequence number (1, 2, 3...). Locked lectures cannot be clicked.
- **Component States:** Completed lecture card shows green background tint (`color-success` at 5% opacity).
- **AI Behavior:** N/A.
- **Responsive Behavior:** Cover photo aspect ratio shifts to 16:9 full width on mobile.
- **Implementation Notes:** Dev: Route click on unlocked lecture card to `SCR-13`.
- **Screen Generation Checklist:** [x] Course cover photo [x] Progress bar [x] Teacher avatar [x] Sequenced lecture cards [x] Status tags [x] Mobile view.

---

### 📝 `SCR-13`: Lecture Details Workspace (تفاصيل المحاضرة)
- **Header & Context:** Screen ID: `SCR-13` · Title: `تفاصيل المحاضرة — درايَة` · Target Persona: Student · Route: `/student/lecture/:id` · Layout: `TPL-04` (Details Workspace).
- **Visual Priority Hierarchy:** 1. Explanation Video / PDF Workspace → 2. 5-Tab Navigation Bar → 3. "اكتملت المحاضرة" Completion CTA.
- **Visual Asset Inventory:** Photos/Media: Embedded HTML5 Video player / PDF Reader. Icons: `Play`, `FileType`, `ClipboardList`, `HelpCircle`, `CheckCircle`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Header):* Breadcrumb: `باقاتي > الكيمياء > المحاضرة ٣: التفاعلات`.
  - *Sec 2 (Tabs Container):* 5 tabs: **شرح** (Video/PDF), **واجب** (Homework), **امتحان** (Exam link), **بنك أسئلة** (Practice Qs), **مراجعة** (AI Summary).
  - *Sec 3 (Completion Bar):* "أكملت المحاضرة" primary CTA. Triggers checkmark spring + confetti burst.
- **UX Microcopy Dictionary:** Tabs: `الشرح`, `الواجب المنزلي`, `الامتحان التقييمي`, `بنك الأسئلة`, `ملخص المراجعة` · CTA: `أكملت المحاضرة ✓`.
- **Design Constraints:** Switching tabs preserves video timestamp and PDF page scroll position.
- **Component States:** "أكملت المحاضرة" button transforms to green disabled checkmark once clicked.
- **AI Behavior:** Tab 5 (مراجعة) displays AI-generated key takeaways with `AITag`.
- **Responsive Behavior:** Video player scales fluidly; tabs wrap horizontally on mobile.
- **Implementation Notes:** Dev: Fire `POST /api/lectures/complete` on completion button click.
- **Screen Generation Checklist:** [x] Breadcrumb [x] Video player [x] 5 workspace tabs [x] Homework PDF link [x] Exam deep-link [x] Completion CTA.

---

### 📝 `SCR-14`: Student Exams Hub (قائمة الامتحانات)
- **Header & Context:** Screen ID: `SCR-14` · Title: `الامتحانات — درايَة` · Target Persona: Student · Route: `/student/exams` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. Upcoming / Pending Exams List Cards → 2. Exam Filter Tabs (القادمة / السابقة / المكتملة) → 3. Past Results Summary.
- **Visual Asset Inventory:** Photos: None. Icons: `ClipboardList`, `Clock`, `CheckCircle2`, `AlertCircle`, `ChevronLeft`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Filter Bar):* Tabs: `الامتحانات القادمة`, `الامتحانات السابقة`, `تم تصحيحها`.
  - *Sec 2 (Exams List):* Cards showing Exam Title, Subject, Due Date, Question Count, Duration, Status Badge, and "ابدأ الامتحان" CTA.
- **UX Microcopy Dictionary:** Title: `امتحاناتي الدراسية` · CTA: `ابدأ الامتحان الآن` · Status Pending: `لم يبدأ بعد` · Status Graded: `تم التقييم`.
- **Design Constraints:** Overdue pending exams display red warning badge ("متأخر").
- **Component States:** Card hover lifts `translateY(-3px)`. Click CTA routes directly to `SCR-15`.
- **AI Behavior:** Graded exams display AI scoring summary tag.
- **Responsive Behavior:** Exam list cards display as full-width rows on mobile.
- **Implementation Notes:** Dev: Fetch exams list via `GET /api/student/exams`.
- **Screen Generation Checklist:** [x] Filter tabs [x] Exam cards list [x] Due date timer [x] Question count badge [x] Primary CTA [x] Status tags.

---

### ⏱️ `SCR-15`: Quiz & Exam Taking Flow (جلسة أداء الامتحان)
- **Header & Context:** Screen ID: `SCR-15` · Title: `أداء الامتحان — درايَة` · Target Persona: Student · Route: `/student/exam/:id/take` · Layout: `TPL-05` (Exam Session).
- **Visual Priority Hierarchy:** 1. Active Question Card & Choice Radios → 2. Sticky Top Header (Timer & Question Progress) → 3. Exam Footer Nav Buttons.
- **Visual Asset Inventory:** Photos: None. Icons: `Clock`, `Flag`, `ChevronLeft`, `AlertTriangle`, `CheckCircle2`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Sticky Header):* Question Count (`السؤال ٣ من ٢٠`), Countdown Timer (`24:15` Manrope font), Flag Button. Timer shifts to warning color at <5m, error at <1m.
  - *Sec 2 (Active Question Card):* Question text (`text-body-lg`), 4 MCQ options. Selection auto-saves to `localStorage` every 15s.
  - *Sec 3 (Footer Nav):* "السؤال التالي" (`Btn` primary pill) / "السؤال السابق" (`Btn` secondary pill). On last question: "مراجعة وتسليم".
- **UX Microcopy Dictionary:** Timer Label: `الوقت المتبقي` · Flag: `تعليم للرجوع لاحقاً` · Next: `السؤال التالي →` · Submit: `مراجعة وتسليم الامتحان`.
- **Design Constraints:** Anti-cheating popup triggered on tab-switch (max 3 switches allowed). Main app nav & sidebar hidden.
- **Component States:** Selected MCQ radio button displays solid teal fill (`color-primary-700`). Flagged question highlights yellow.
- **AI Behavior:** Zero AI interaction during active exam session.
- **Responsive Behavior:** Sticky header remains locked at top on mobile; choice radios expand to full width.
- **Implementation Notes:** Dev: Auto-submit payload when countdown timer reaches `00:00`.
- **Screen Generation Checklist:** [x] Hidden main nav [x] Sticky timer header [x] Question counter [x] Flag button [x] MCQ choices [x] Local storage sync [x] Footer nav.

---

### 📈 `SCR-16`: Exam Results & Review (نتيجة الامتحان)
- **Header & Context:** Screen ID: `SCR-16` · Title: `نتيجة الامتحان — درايَة` · Target Persona: Student · Route: `/student/exam/:id/results` · Layout: `TPL-07` (Analytics Workspace).
- **Visual Priority Hierarchy:** 1. Score Reveal Ring & Pass/Fail Status Banner → 2. AI Feedback Panel → 3. Question-by-Question Breakdown.
- **Visual Asset Inventory:** Photos: None. Icons: `CheckCircle`, `XCircle`, `Sparkles`, `TrendingUp`, `RotateCcw`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Score Hero):* Large animated score display (`٨٥٪` Manrope font 40px), Pass/Fail badge, completion time.
  - *Sec 2 (AI Performance Feedback):* Purple-bordered card with `AITag` carrying qualitative breakdown of student strengths & weak areas.
  - *Sec 3 (Question Review Accordion):* Accordion list of all exam questions showing student answer vs correct answer + explanation.
- **UX Microcopy Dictionary:** Title: `نتيجة الامتحان` · Score Label: `الدرجة الكلية` · AI Feedback Header: `تحليل المساعد الذكي لأدائك` · CTA: `مراجعة درجاتي الكاملة`.
- **Design Constraints:** Correct answers highlight green (`color-success`), wrong answers highlight red (`color-error`).
- **Component States:** Score number counts up from 0 to final value over 1.2s ease-out.
- **AI Behavior:** AI feedback card displays tailored study tips based on student's wrong answers.
- **Responsive Behavior:** Question breakdown accordions stack full width on mobile.
- **Implementation Notes:** Dev: Fetch result breakdown via `GET /api/exams/{id}/results`.
- **Screen Generation Checklist:** [x] Score ring animation [x] Pass/Fail badge [x] AI feedback card + AITag [x] Question review accordion [x] Explanations.

---

### 📊 `SCR-17`: My Grades & Weak Areas (درجاتي ونقاط الضعف)
- **Header & Context:** Screen ID: `SCR-17` · Title: `درجاتي ونقاط الضعف — درايَة` · Target Persona: Student · Route: `/student/grades` · Layout: `TPL-07` (Analytics Workspace).
- **Visual Priority Hierarchy:** 1. Weak Areas Heatmap Section (نقاط تحتاج إلى مراجعة) → 2. All-Exams Score History Table → 3. Subject Filter.
- **Visual Asset Inventory:** Photos: None. Icons: `TrendingUp`, `AlertTriangle`, `BookOpen`, `Filter`, `BarChart2`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Weak Topics Heatmap):* List of topics ranked by weakness severity (<50% accuracy), each showing progress ring + "مراجعة المحاضرة" deep link.
  - *Sec 2 (Grades History Table):* Table (Exam Title, Subject, Date, Score, Status). Rows hover highlight.
- **UX Microcopy Dictionary:** Title: `تقرير درجاتي وتحليل الأداء` · Weak Section: `المواضيع التي تحتاج إلى تركيز ومراجعة` · Table Header Score: `النسبة المئوية`.
- **Design Constraints:** Weak topic cards use light warning tint (`rgba(245,158,11,0.08)`).
- **Component States:** Table rows highlight `color-primary-50` on hover.
- **AI Behavior:** Weak topics automatically calculated from past 5 exam submissions.
- **Responsive Behavior:** Grades table converts to vertical card-list on mobile (<640px).
- **Implementation Notes:** Dev: Recharts area chart showing overall score trend over time.
- **Screen Generation Checklist:** [x] Weak topic heatmap [x] Deep links to lectures [x] Score trend chart [x] Grades table [x] Subject filter.

---

### 📖 `SCR-18`: Books Library & PDF Viewer (مكتبة الكتب والقارئ)
- **Header & Context:** Screen ID: `SCR-18` · Title: `مكتبة الكتب — درايَة` · Target Persona: Student · Route: `/student/books` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. Books Grid Cards → 2. In-App PDF Reader Modal / Full View → 3. Subject Search Bar.
- **Visual Asset Inventory:** Photos: PDF book cover thumbnails (3:4 aspect ratio). Icons: `BookMarked`, `Download`, `Eye`, `Search`, `FileText`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Search Bar):* Search input + Stage filter dropdown.
  - *Sec 2 (Books Grid):* 4-column grid of book cards with Download PDF button and Preview button.
  - *Sec 3 (PDF Reader Workspace):* Embedded canvas reader with page navigation controls + Download action.
- **UX Microcopy Dictionary:** Title: `مكتبة الكتب المدرسية والمذكرات` · CTA Read: `قراءة الكتاب` · CTA Download: `تحميل PDF`.
- **Design Constraints:** PDF viewer canvas must support page zoom & fullscreen mode.
- **Component States:** Preview click opens reader modal (`TPL-09`) with backdrop blur.
- **AI Behavior:** N/A.
- **Responsive Behavior:** 4-column grid → 2-col tablet → 1-col mobile. PDF reader adjusts page width to screen width.
- **Implementation Notes:** Dev: Use PDF.js or native PDF canvas renderer.
- **Screen Generation Checklist:** [x] Search bar [x] 4-col books grid [x] Book cover thumbnails [x] PDF reader modal [x] Page controls [x] Download CTA.

---

### 💬 `SCR-19`: Q&A Messages & Teacher Chat (الأسئلة والمحادثة)
- **Header & Context:** Screen ID: `SCR-19` · Title: `الأسئلة والمحادثات — درايَة` · Target Persona: Student · Route: `/student/chat` · Layout: `TPL-02` (Dashboard Workspace).
- **Visual Priority Hierarchy:** 1. Active Message Thread Conversation View → 2. Threads Sidebar List → 3. Message Input Composer.
- **Visual Asset Inventory:** Photos: `teacherAvatar` (1:1 teacher photo). Icons: `Send`, `Paperclip`, `MessageSquare`, `CheckCheck`, `User`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Threads List - Right in RTL):* List of active Q&A threads grouped by course/lecture.
  - *Sec 2 (Conversation View):* Bubble message list (Teacher responses carry `Badge` "المعلم"). Composer input with attachment button at bottom.
- **UX Microcopy Dictionary:** Title: `الأسئلة والاستفسارات` · Placeholder: `اكتب سؤالك للمعلم هنا…` · Teacher Badge: `المعلم`.
- **Design Constraints:** Teacher message bubbles use `color-primary-50` fill; student bubbles use `color-bg-surface` with border.
- **Component States:** Send button disabled when composer input is empty.
- **AI Behavior:** N/A (Direct teacher-student communication).
- **Responsive Behavior:** Thread list slides out as drawer on mobile (<768px).
- **Implementation Notes:** Dev: Real-time message updates via WebSockets / Supabase Realtime.
- **Screen Generation Checklist:** [x] Threads sidebar list [x] Active message log [x] Teacher badge [x] Composer input [x] Attachment trigger [x] Real-time indicator.

---

### 🔔 `SCR-20`: Student Notifications Center (مركز الإشعارات)
- **Header & Context:** Screen ID: `SCR-20` · Title: `الإشعارات — درايَة` · Target Persona: Student · Route: `/student/notifications` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. Chronological Notifications List → 2. Category Filter Chips (الكل / الامتحانات / الدرجات / الإعلانات).
- **Visual Asset Inventory:** Photos: None. Icons: `Bell`, `ClipboardList`, `Award`, `MessageSquare`, `Clock`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Filter Chips):* Filter bar for notification categories.
  - *Sec 2 (Notification Stack):* Vertical list of items with unread indicator dot (`color-primary-500`), timestamp, and click navigation destination.
- **UX Microcopy Dictionary:** Title: `مركز الإشعارات` · Unread Label: `جديد` · Mark Read Action: `تحديد الكل كقروء`.
- **Design Constraints:** Unread items carry subtle left border indicator (`3px solid color-primary-500`).
- **Component States:** Clicking notification marks as read and routes to target screen (`SCR-14`/`16`/`19`).
- **AI Behavior:** N/A.
- **Responsive Behavior:** Full width single-column list across all viewports.
- **Implementation Notes:** Dev: Synchronize unread badge count with top navbar bell icon.
- **Screen Generation Checklist:** [x] Filter chips [x] Notification rows [x] Unread indicator dot [x] Timestamps [x] Deep link navigation [x] Mark all read CTA.

---

### ⚙️ `SCR-21`: Student Profile & Settings (الملف الشخصي والإعدادات)
- **Header & Context:** Screen ID: `SCR-21` · Title: `الملف الشخصي والإعدادات — درايَة` · Target Persona: Student · Route: `/student/settings` · Layout: `TPL-08` (Wizard/Settings).
- **Visual Priority Hierarchy:** 1. Student Avatar & Basic Info Card → 2. Password Change Form → 3. Notification Preferences.
- **Visual Asset Inventory:** Photos: `studentAvatar` (1:1 editable avatar). Icons: `User`, `Lock`, `Bell`, `Moon`, `LogOut`, `ShieldCheck`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Profile Card):* Avatar image, Name, Year/Grade, Academy Code, Linked Parent notification email notice.
  - *Sec 2 (Settings Forms):* Password change fields + Category notification toggles.
- **UX Microcopy Dictionary:** Title: `إعدادات الحساب والملف الشخصي` · Save Button: `حفظ التغييرات` · Logout Action: `تسجيل الخروج`.
- **Design Constraints:** Changing password requires entering current password. Logout button uses `color-error` tertiary style.
- **Component States:** Save button displays inline spinner while submitting (`150ms`).
- **AI Behavior:** N/A.
- **Responsive Behavior:** Centered 560px container on desktop; full width on mobile.
- **Implementation Notes:** Dev: Trigger toast notification "تم حفظ التغييرات بنجاح" upon form submit.
- **Screen Generation Checklist:** [x] Avatar editor [x] Student metadata [x] Password fields [x] Notification toggles [x] Save button [x] Logout button.

---

### 👨‍🏫 `SCR-22`: Teacher Dashboard (لوحة تحكم المعلم)
- **Header & Context:** Screen ID: `SCR-22` · Title: `لوحة تحكم المعلم — درايَة` · Target Persona: Teacher · Route: `/teacher/dashboard` · Layout: `TPL-02` (Dashboard Workspace).
- **Visual Priority Hierarchy:** 1. "يحتاج انتباهك الآن" Priority Cards (AI reports & exams awaiting review) → 2. Quick Stat Badges → 3. Recent Class Activity Feed.
- **Visual Asset Inventory:** Photos: Class activity thumbnails. Icons: `AlertCircle`, `Users`, `ClipboardList`, `FileText`, `Sparkles`, `Plus`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Priority Card Banner):* Cards showing pending AI reports requiring approval (`SCR-30` link) with pulsing attention dot.
  - *Sec 2 (Stats Row):* 4 stat badges (Active Students, Pending Exam Reviews, Avg Class Score, Unread Messages).
  - *Sec 3 (Quick Actions Bar):* Buttons: "امتحان جديد" (routes to `SCR-26`), "كورس جديد" (routes to `SCR-24`), "إرسال تقرير" (routes to `SCR-30`).
- **UX Microcopy Dictionary:** Greeting: `مساء الخير، أ. محمد!` · Priority Title: `يحتاج انتباهك الآن` · Quick Action 1: `+ امتحان جديد بالذكاء الاصطناعي`.
- **Design Constraints:** Priority card banner uses light warning tint (`rgba(245,158,11,0.10)`).
- **Component States:** Quick action buttons display hover scale `0.98` on press.
- **AI Behavior:** Displays counts of AI-generated reports awaiting teacher approval (`IsApproved = false`).
- **Responsive Behavior:** Sidebar moves to bottom navigation bar on mobile (<640px).
- **Implementation Notes:** Dev: Fetch teacher dashboard via `GET /api/teacher/dashboard`.
- **Screen Generation Checklist:** [x] Teacher greeting [x] Attention priority cards [x] Pulsing alert dot [x] 4 stat badges [x] Quick action buttons [x] Recent activity.

---

### 📦 `SCR-23`: Packages Management (إدارة الباقات)
- **Header & Context:** Screen ID: `SCR-23` · Title: `إدارة الباقات — المعلم` · Target Persona: Teacher · Route: `/teacher/packages` · Layout: `TPL-03` (Catalog Grid).
- **Visual Priority Hierarchy:** 1. "+ إنشاء باقة جديدة" Primary CTA & Packages Grid → 2. Package Search/Filter Bar.
- **Visual Asset Inventory:** Photos: Package cover upload placeholders. Icons: `Package`, `Plus`, `Edit2`, `Trash2`, `Users`, `BookOpen`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Action Bar):* Title + "+ إنشاء باقة جديدة" primary pill button (opens `TPL-09` Modal).
  - *Sec 2 (Packages Grid):* Cards displaying Package Title, Stage, Attached Courses count, Enrolled Students count, Draft/Published badge.
- **UX Microcopy Dictionary:** Title: `إدارة الباقات الدراسية` · CTA: `+ إنشاء باقة جديدة` · Status Published: `منشورة` · Status Draft: `مسودة`.
- **Design Constraints:** Clicking "+ إنشاء باقة جديدة" opens Create Package modal without page reload.
- **Component States:** Package card displays kebab action menu (Edit, Add Course, Delete).
- **AI Behavior:** N/A.
- **Responsive Behavior:** 3-col grid → 2-col tablet → 1-col mobile stack.
- **Implementation Notes:** Dev: Re-fetch grid on new package creation.
- **Screen Generation Checklist:** [x] Action header [x] Create package modal trigger [x] 3-col package cards [x] Enrolled student counter [x] Status badges [x] Edit modal.

---

### 📚 `SCR-24`: Courses Management (إدارة الكورسات)
- **Header & Context:** Screen ID: `SCR-24` · Title: `إدارة الكورسات — المعلم` · Target Persona: Teacher · Route: `/teacher/courses` · Layout: `TPL-06` (Management Table/Grid).
- **Visual Priority Hierarchy:** 1. "+ إنشاء كورس جديد" Primary CTA & Course Cards Grid → 2. Attached Package Selector.
- **Visual Asset Inventory:** Photos: Course cover uploads. Icons: `BookOpen`, `Plus`, `Package`, `Edit2`, `Users`, `CheckCircle2`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Action Header):* Title + "+ إنشاء كورس جديد" primary pill CTA.
  - *Sec 2 (Courses Grid/Table):* Cards showing Course Title, Subject, Stage, Attached Package tag, Student count, Status.
- **UX Microcopy Dictionary:** Title: `إدارة الكورسات والمقررات` · CTA: `+ إنشاء كورس جديد` · Attach Package Label: `مرتبط بباقة: الكيمياء الشاملة`.
- **Design Constraints:** Every course must display its parent Package association tag or "غير مرتبط بباقة".
- **Component States:** Card click opens Course Detail Edit workspace (`SCR-25`).
- **AI Behavior:** N/A.
- **Responsive Behavior:** Grid adapts fluidly from 3 columns to 1 column.
- **Implementation Notes:** Dev: API endpoint `GET /api/teacher/courses`.
- **Screen Generation Checklist:** [x] Action header [x] Create course CTA [x] Course cards [x] Package association tag [x] Lecture count badge [x] Edit triggers.

---

### 🛠️ `SCR-25`: Lecture Content Builder (إدارة وتنسيق المحاضرة)
- **Header & Context:** Screen ID: `SCR-25` · Title: `مُنشئ المحاضرة — المعلم` · Target Persona: Teacher · Route: `/teacher/lecture/:id/edit` · Layout: `TPL-04` (Details Workspace).
- **Visual Priority Hierarchy:** 1. Lecture Attachments Workspace (Video / PDF / Homework / Exam) → 2. RAG Content Indexing Status Chip.
- **Visual Asset Inventory:** Photos: Upload preview thumbnails. Icons: `Upload`, `Play`, `FileType`, `ClipboardList`, `Check`, `Sparkles`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (General Info Form):* Lecture Title, Stage, Subject tag.
  - *Sec 2 (Attachments Upload Area):* Upload zones for Explanation Video, Explanation PDF, Homework assignment, Attached Exam link.
  - *Sec 3 (RAG Indexing Status):* Chip showing `RAG Indexing Status`: "تم الفهرسة للذكاء الاصطناعي ✓" (enables AI Exam Builder).
- **UX Microcopy Dictionary:** Title: `إضافة وتعديل المحاضرة` · Upload Dragzone: `اسحب الملف هنا أو انقر للرفع` · RAG Chip: `محتوى مفهرس للذكاء الاصطناعي ✓`.
- **Design Constraints:** Uploading a PDF automatically triggers background RAG vector indexing.
- **Component States:** RAG chip displays spinner while vectorizing PDF document.
- **AI Behavior:** RAG indexing chip signals document readiness for `SCR-26: AI Exam Builder`.
- **Responsive Behavior:** Dragzones stack vertically on mobile.
- **Implementation Notes:** Dev: Monitor upload progress via XHR `onProgress` handler.
- **Screen Generation Checklist:** [x] Lecture title field [x] Video upload zone [x] PDF upload zone [x] Homework dropzone [x] Attached exam selector [x] RAG status chip.

---

### 🤖 `SCR-26`: AI Exam Builder (مُنشيء الامتحانات بالذكاء الاصطناعي)
- **Header & Context:** Screen ID: `SCR-26` · Title: `مُنشيء الامتحانات — المعلم` · Target Persona: Teacher · Route: `/teacher/exam-builder` · Layout: `TPL-08` (Multistep Wizard).
- **Visual Priority Hierarchy:** 1. Active Step Form & Primary Progression CTA → 2. 5-Step Progress Bar → 3. Generated Question Cards Stack (`Step 3`).
- **Visual Asset Inventory:** Photos: None. Icons: `Sparkles`, `Brain`, `RefreshCw`, `Edit2`, `Trash2`, `Plus`, `Check`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Step 1 (Setup):* Select Year/Group, Select Lecture, Difficulty stepper, Question count stepper. CTA: "توليد الأسئلة بالذكاء الاصطناعي ✨".
  - *Step 2 (Streaming Progress):* 3-stage animated text status ("جارٍ تحليل المحاضرة… → جارٍ توليد الأسئلة… → جارٍ الصياغة…").
  - *Step 3 (Question Review):* Cards stack with `AITag`. Per-card actions: Edit inline text, Regenerate (1-click), Delete.
  - *Step 4 (Distribute):* Anti-cheating toggles, Time limit, Publish confirmation.
- **UX Microcopy Dictionary:** Title: `إنشاء امتحان جديد بالذكاء الاصطناعي` · CTA Generate: `توليد الأسئلة الآن ✨` · CTA Publish: `تأكيد ونشر الامتحان`.
- **Design Constraints:** Teacher cannot publish an exam without reviewing Step 3. All AI CTAs use `color-ai-accent` (`#7C3AED`).
- **Component States:** Single-question regenerate button shows inline spinner (`150ms`).
- **AI Behavior:** Full RAG pipeline execution generating MCQs from indexed lecture PDFs.
- **Responsive Behavior:** Wizard container fixed 560px desktop; 100% width mobile.
- **Implementation Notes:** Dev: `POST /api/ai/generate-exam` returning question JSON payload.
- **Screen Generation Checklist:** [x] 5-step wizard header [x] Setup controls [x] 3-stage progress text [x] Generated question cards [x] AITag [x] Regenerate icon [x] Publish CTA.

---

### 👥 `SCR-27`: Student Roster & Group Filter (قائمة الطلبة والمجموعات)
- **Header & Context:** Screen ID: `SCR-27` · Title: `قائمة الطلاب — المعلم` · Target Persona: Teacher · Route: `/teacher/students` · Layout: `TPL-06` (Management Table).
- **Visual Priority Hierarchy:** 1. Students Table (Name, Group, Score Avg, Status) → 2. Year/Group Filter Selector → 3. Search Bar.
- **Visual Asset Inventory:** Photos: `studentAvatar` (1:1 student avatars). Icons: `Users`, `Search`, `Filter`, `Mail`, `MoreVertical`, `AlertTriangle`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Filter Bar):* Search student name/phone + Group dropdown (`الصف الثالث - مجموعة أ`).
  - *Sec 2 (Students Table):* 5-column table (Avatar/Name, Group, Avg Score %, Weak Topics Count, Action kebab menu). Red highlight on at-risk students (<50%).
- **UX Microcopy Dictionary:** Title: `قائمة الطلاب والمجموعات` · Search Placeholder: `ابحث باسم الطالب أو رقم الهاتف…` · At-Risk Badge: `يحتاج متابعة`.
- **Design Constraints:** Row click opens Student Academic Profile (`SCR-28`). At-risk students highlight in red background tint.
- **Component States:** Kebab menu opens popup list (View Profile, Send Message, Create Report).
- **AI Behavior:** Weak topics count calculated automatically per student.
- **Responsive Behavior:** Table transforms into vertical card-list view on mobile (<640px).
- **Implementation Notes:** Dev: Server-side pagination 25 rows/page.
- **Screen Generation Checklist:** [x] Group filter dropdown [x] Search input [x] 5-column student table [x] At-risk red highlight [x] Kebab menu [x] Mobile card-list view.

---

### 👤 `SCR-28`: Student Academic Profile — Teacher View (ملف الطالب للمعلم)
- **Header & Context:** Screen ID: `SCR-28` · Title: `ملف الطالب — المعلم` · Target Persona: Teacher · Route: `/teacher/student/:id` · Layout: `TPL-07` (Analytics Workspace).
- **Visual Priority Hierarchy:** 1. Student Header & Average Score Metric → 2. Performance Trend Line Chart → 3. Exam History & Weak Topics breakdown.
- **Visual Asset Inventory:** Photos: `studentAvatar`. Icons: `User`, `TrendingUp`, `AlertTriangle`, `ClipboardList`, `MessageSquare`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Student Info Header):* Avatar, Full Name, Phone, Group, Overall Avg Score (`٨٤٪`).
  - *Sec 2 (Performance Chart):* Recharts Line chart showing score trend over past 10 exams.
  - *Sec 3 (Weak Topics Card):* Topic weakness list with shortcut "إرسال تقرير للولي".
- **UX Microcopy Dictionary:** Title: `الملف الأكاديمي للطالب: أحمد محمد` · Score Header: `متوسط الدرجات` · CTA Report: `إنشاء تقرير للولي`.
- **Design Constraints:** Recharts line chart wraps in `<div dir="rtl">`.
- **Component States:** Chart tooltip displays exam title, date, and percentage on hover.
- **AI Behavior:** Displays AI performance summary snippet.
- **Responsive Behavior:** 2-column layout stacks vertically on mobile (<1024px).
- **Implementation Notes:** Dev: Fetch student details via `GET /api/teacher/students/{id}`.
- **Screen Generation Checklist:** [x] Student metadata header [x] Avg score metric [x] Score trend chart [x] Weak topics list [x] Create report CTA button.

---

### 📈 `SCR-29`: Class Analytics Dashboard (تحليلات الأداء وخريطة نقاط الضعف)
- **Header & Context:** Screen ID: `SCR-29` · Title: `التحليلات وخريطة نقاط الضعف — المعلم` · Target Persona: Teacher · Route: `/teacher/analytics` · Layout: `TPL-07` (Analytics Workspace).
- **Visual Priority Hierarchy:** 1. Weak Topic Heatmap (خريطة نقاط الضعف) → 2. Class Grade Distribution Bar Chart → 3. Top / At-Risk Student Lists.
- **Visual Asset Inventory:** Photos: None. Icons: `BarChart2`, `AlertTriangle`, `TrendingDown`, `TrendingUp`, `Users`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Group Filter Bar):* Select Course & Group dropdown.
  - *Sec 2 (Weak Topic Heatmap):* Grid of topic chips colored by class-wide error severity (Red = >40% of class failed topic). Click opens student list.
  - *Sec 3 (Grade Distribution Chart):* Recharts Bar chart (Grade bands: 90-100%, 80-89%, 70-79%, <70%).
- **UX Microcopy Dictionary:** Title: `تحليلات أداء المجموعات ونقاط الضعف` · Heatmap Header: `خريطة المواضيع الأكثر صعوبة على الطلاب`.
- **Design Constraints:** Heatmap chips use severity color scale (Green = <15% error, Yellow = 15-40%, Red = >40%).
- **Component States:** Clicking a red topic chip filters student roster below to students failing that specific topic.
- **AI Behavior:** Class error metrics generated by aggregating recent exam question results.
- **Responsive Behavior:** Charts scale fluidly; heatmap grid wraps on mobile.
- **Implementation Notes:** Dev: Recharts `<BarChart>` wrapped in `<ResponsiveContainer>`.
- **Screen Generation Checklist:** [x] Group filter dropdown [x] Severity-colored heatmap grid [x] Recharts bar chart [x] Top students list [x] At-risk list.

---

### 📋 `SCR-30`: AI Reports Generator & Approval Gate (التقارير الذكية)
- **Header & Context:** Screen ID: `SCR-30` · Title: `تقارير أولياء الأمور — المعلم` · Target Persona: Teacher · Route: `/teacher/reports` · Layout: `TPL-02` (Dashboard Workspace).
- **Visual Priority Hierarchy:** 1. AI Draft Report Preview Card & **"موافقة وإرسال للولي"** Primary CTA → 2. Draft Warning Banner → 3. Editable Text Box.
- **Visual Asset Inventory:** Photos: `studentAvatar`. Icons: `Sparkles`, `ShieldCheck`, `Send`, `Edit2`, `CheckCircle`, `AlertTriangle`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Selector Header):* Student Select Dropdown, Term Dropdown, "إنشاء تقرير جديد" CTA.
  - *Sec 2 (Report Preview Card):* Top `AITag` + Student Info + Performance summary + AI Narrative text box (editable) + Approval Action Footer.
  - *Sec 3 (Draft Warning Banner):* `⚠️ هذه مسودة مُولَّدة آلياً — لن تُرسَل للولي إلا بعد موافقتك الصريحة.`
  - *Sec 4 (Approval Footer):* Primary CTA: "موافقة وإرسال للولي" (`IsApproved = true`). Secondary CTA: "إعادة الصياغة".
- **UX Microcopy Dictionary:** Title: `تقارير أداء الطلاب وأولياء الأمور` · Draft Banner: `مسودة تقرير · بانتظار الاعتماد` · Approve CTA: `موافقة وإرسال للولي ✓`.
- **Design Constraints:** **HARD SAFETY RULE:** Unapproved AI reports MUST NEVER be sent. Primary CTA blocked until teacher inspects card.
- **Component States:** Tapping "موافقة وإرسال" updates badge to green "تمت الموافقة · تم الإرسال" + triggers success toast.
- **AI Behavior:** AI narrative dynamically generated based on student's exam scores and weak topic history.
- **Responsive Behavior:** Preview card stacks vertically on mobile (<1024px).
- **Implementation Notes:** Dev: Fire `PUT /api/reports/{id}/approve` on primary CTA click.
- **Screen Generation Checklist:** [x] Student dropdown [x] AITag [x] Draft warning banner [x] Editable text area [x] Approval CTA button [x] Success toast.

---

### ⚙️ `SCR-31`: Teacher Settings & Workspace (إعدادات الحساب والأكاديمية)
- **Header & Context:** Screen ID: `SCR-31` · Title: `إعدادات الأكاديمية — المعلم` · Target Persona: Teacher · Route: `/teacher/settings` · Layout: `TPL-08` (Wizard/Settings).
- **Visual Priority Hierarchy:** 1. Workspace Profile & Logo Upload → 2. Academy Invite Codes Generator → 3. Team Teachers Management.
- **Visual Asset Inventory:** Photos: Academy logo image. Icons: `Building`, `Key`, `Users`, `Shield`, `Save`, `Moon`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Sec 1 (Workspace Info):* Academy Name, Logo Upload Zone, Primary Subject.
  - *Sec 2 (Invite Codes Generator):* Active invite codes list (e.g. `DRY-892`) with "+ توليد كود جديد" action button.
- **UX Microcopy Dictionary:** Title: `إعدادات مساحة العمل والأكاديمية` · Code Header: `رموز تفعيل الطلاب (Invite Codes)` · Save CTA: `حفظ التغييرات`.
- **Design Constraints:** Generate code button creates 6-character alphanumeric code (`DRY-XXX`).
- **Component States:** Copy icon next to invite code copies code to clipboard + shows toast "تم نسخ الكود".
- **AI Behavior:** N/A.
- **Responsive Behavior:** Form sections stack vertically on mobile.
- **Implementation Notes:** Dev: Endpoint `POST /api/teacher/invite-codes`.
- **Screen Generation Checklist:** [x] Workspace title field [x] Logo upload dropzone [x] Invite codes list [x] Generate code CTA [x] Copy code button [x] Save button.

---

### ✉️ `SCR-32`: Parent Approved Email Delivery (تقرير الولي المعتمد عبر البريد)
- **Header & Context:** Screen ID: `SCR-32` · Title: `تقرير أداء الطالب (رسالة الولي)` · Target Persona: Parent · Route: External Email Template (No App Screen).
- **Visual Priority Hierarchy:** 1. Headline Score & Student Name → 2. Approved Teacher Summary Narrative → 3. Teacher Signature & Contact Info.
- **Visual Asset Inventory:** Photos: Academy Logo Header. Icons: `GraduationCap`, `CheckCircle`, `TrendingUp`.
- **Hero Specification:** N/A.
- **Section Specifications:**
  - *Header:* Academy Branded Header + Date + Student Name ("تقرير أداء الطالب: أحمد محمد").
  - *Body 1 (Score Badge):* Highlighted Score Box (`٨٥٪ - ممتاز`).
  - *Body 2 (Approved Narrative):* Qualitative paragraph written by AI and approved by teacher ("شهد أداء أحمد تحسناً ملحوظاً في الكيمياء العضوية...").
  - *Footer:* Teacher Name & Academy contact button.
- **UX Microcopy Dictionary:** Subject Line: `تقرير أداء الطالب: أحمد محمد — أكاديمية درايَة` · Footer Note: `تم إعداد واعتماد هذا التقرير من المعلم أ. محمد`.
- **Design Constraints:** Clean inline-styled HTML email layout; max-width `600px` centered; zero external JavaScript.
- **Component States:** N/A (Static HTML email document).
- **AI Behavior:** Text originally drafted by AI, guaranteed to carry `IsApproved = true` flag.
- **Responsive Behavior:** Scales fluidly in all mobile and desktop email clients (Gmail, Outlook, Apple Mail).
- **Implementation Notes:** Dev: Rendered server-side via React Email / MJML template and dispatched via SendGrid / Resend.
- **Screen Generation Checklist:** [x] Branded header [x] Student name & date [x] Score badge [x] Approved narrative paragraph [x] Teacher signature [x] Responsive HTML email.

---

## 4. Screen Generation Master Checklist

Before approving any UI screen output (`SCR-01` through `SCR-32`), verify against this 8-point checklist:

- [ ] **1. Hierarchy Check:** Is there exactly 1 Primary Focus element and at most 1 Primary Pill CTA per view?
- [ ] **2. RTL Native:** Are sidebar on the Right, text aligned Right, and chevrons rotated 180°?
- [ ] **3. Color Tokens:** Are all colors derived from `DESIGN.md` tokens (Teal `#14453F`, Base `#FBFAF7`, AI `#7C3AED`)?
- [ ] **4. Typography Scale:** Is Arabic text set in `IBM Plex Sans Arabic` with zero letter-spacing?
- [ ] **5. Accessibility:** Are 2px focus rings defined and touch targets >=44px?
- [ ] **6. Component States:** Are default, hover, active, disabled, loading, and empty states specified?
- [ ] **7. AI Branding:** Are all AI elements carrying the `AITag` purple sparkle treatment?
- [ ] **8. Business Rules:** Is the `IsApproved` approval gate present on all parent-facing AI reports (`SCR-30`/`SCR-32`)?

---

*End of SCREEN_SPECIFICATION.md — Draya Academic Platform*
