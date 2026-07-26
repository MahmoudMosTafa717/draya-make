# DESIGN (3)

# Draya — Design System & Product Design Guide

**Version 1.0 · Design Language: “Academic Precision”Prepared for:** Angular (Web) + Flutter (Mobile) implementation
**Primary market:** Egypt · Arabic-first (RTL), English supported (LTR)

---

## 0. Reference Reconciliation (Read First)

Before defining anything, here is exactly what this system takes from each reference and why.

### Adopted from Reference 1 (تفوق) — MAIN direction

- **Color strategy**: deep teal gradient as the dominant brand color, used on hero sections, primary buttons, and navigation accents — not as full-page wallpaper.
- **Photography over illustration**: real, warm, editorial-style photos of students/teachers as the primary imagery system. Avatars/cartoon illustration are used only for empty states and onboarding, never for hero or marketing-style moments.
- **Line iconography**: thin, single-weight decorative line icons (atoms, books, pencils, graduation caps) scattered as texture — used sparingly in dashboards, more freely on marketing/auth screens.
- **Pill-shaped CTAs**: fully rounded primary buttons (radius = full/999px) as the signature interactive shape.
- **Clean top navigation**: flat horizontal nav, generous whitespace, no visual clutter, one primary CTA button standing apart from the rest of the nav.

### Adopted from Reference 2 — LAYOUT/STRUCTURE only

- **Photo-tile grids**: overlapping/staggered image tiles used in hero and “why choose us”-style sections (adapted, not copied — we keep tefawwuq’s teal, not R2’s orange/purple).
- **Checklist-of-benefits pattern**: icon + short label rows used in feature explanation blocks (e.g., “what you’ll get” panels on the student dashboard).
- **Stat badges**: floating small card overlays with a number + label (e.g., “12+ years,” “1,226 lessons”) — reused in Draya for real metrics like “Weak Topics Detected,” “Exams Graded This Week.”

**Explicitly rejected from Reference 2:** its orange/purple palette and cartoon-character illustration style — both conflict with the “premium, trustworthy, AI-powered-not-futuristic” brand personality.

### Rejected from Reference 3 — Negative reference

Reference 3 is a generic marketplace UI-kit ad. We are deliberately avoiding:
- **Gradient-blob backgrounds** and busy decorative shapes competing with content.
- **Stock-illustration heroes** (generic smiling cartoon figures) — Draya uses real photography per Reference 1.
- **Rainbow multi-color badge/tag systems** (yellow, purple, teal, orange all on one screen) — Draya uses a single accent (teal) plus a restrained neutral/status palette.
- **Dense, undifferentiated card grids** with no visual hierarchy — Draya enforces strict spacing and hierarchy via the 8pt system below.
- **Template-generic typography** (default sans with no personality) — Draya pairs a distinctive display face for headings with a highly legible Arabic-first body face.

### Reconciliation with existing partial system

Reference 1’s teal is treated as **confirmation**, not a new direction. The existing `#14453F`-family deep teal + off-white background (“Academic Precision”) is the base this document extends — palette, type scale, and components below are built directly on top of it.

---

## 1. Design Philosophy

**“Academic Precision.”** Draya should feel like a well-run, calm classroom, not a startup dashboard or a consumer social app: confident whitespace, one accent color used with intent, real faces over icons, and AI presented as a quiet assistant (a small “AI” tag or sparkle glyph) rather than a dominant visual theme (no neon gradients, no glowing chat bubbles, no robot mascots).

Design priorities, in order: **clarity for non-technical teachers → trust/credibility → Arabic-first legibility → premium feel → delight.**

---

## 2. Design System

### 2.1 Color Palette

#### Light Theme

| Token | Hex | Usage |
| --- | --- | --- |
| `color-primary-900` | `#0C2E29` | Deepest teal — dark-mode base, hero overlays |
| `color-primary-700` | `#14453F` | **Brand primary** — nav, primary buttons, headings on light bg |
| `color-primary-500` | `#1D6E63` | Hover/active states, links |
| `color-primary-300` | `#5FA79A` | Secondary accents, chart lines, icon strokes |
| `color-primary-100` | `#DCEEEA` | Tinted backgrounds, selected states, badges |
| `color-primary-50` | `#F2FAF8` | Subtle section backgrounds |
| `color-bg-base` | `#FBFAF7` | Off-white page background |
| `color-bg-surface` | `#FFFFFF` | Cards, modals, inputs |
| `color-bg-muted` | `#F4F3EF` | Secondary surfaces, table stripes |
| `color-border` | `#E4E2DC` | Default borders |
| `color-border-strong` | `#CBC8C0` | Input borders, dividers with emphasis |
| `color-text-primary` | `#1A2421` | Body/heading text |
| `color-text-secondary` | `#5B655F` | Supporting text, captions |
| `color-text-disabled` | `#A6ACA6` | Disabled labels |
| `color-text-on-primary` | `#FFFFFF` | Text on teal backgrounds |
| `color-success` | `#2F8A5B` | Success states, positive trend |
| `color-warning` | `#B9862E` | Warnings, pending review |
| `color-error` | `#C24444` | Errors, failed states, weak-topic flags |
| `color-info` | `#3572B0` | Informational states |
| `color-ai-accent` | `#7A5FD1` | Reserved *only* for “AI-generated” tags/badges — muted violet, used sparingly to visually distinguish AI content from human content without dominating the palette |

#### Dark Theme

| Token | Hex | Usage |
| --- | --- | --- |
| `color-primary-700` (dark) | `#2E7B6E` | Brand primary on dark surfaces |
| `color-primary-500` (dark) | `#4A9C8E` | Hover/active |
| `color-primary-100` (dark) | `#1B3B36` | Tinted surfaces |
| `color-bg-base` (dark) | `#0F1613` | Page background |
| `color-bg-surface` (dark) | `#17211E` | Cards, modals |
| `color-bg-muted` (dark) | `#1E2A26` | Secondary surfaces |
| `color-border` (dark) | `#2A3733` | Default borders |
| `color-text-primary` (dark) | `#EDEFEC` | Body/heading text |
| `color-text-secondary` (dark) | `#9CA6A0` | Supporting text |
| `color-success/warning/error/info` (dark) | `#4CAE7C` / `#D6A24C` / `#E27373` / `#6699D6` | Lightened for AA contrast on dark surfaces |

All pairings verified for **WCAG AA** (4.5:1 body text, 3:1 large text/UI components).

### 2.2 Typography

**Arabic-first pairing:**
- **Display / Headings (AR):** `IBM Plex Sans Arabic` (SemiBold/Bold) — geometric, modern, excellent Arabic legibility, avoids the “template Cairo font” default look.
- **Body (AR):** `IBM Plex Sans Arabic` (Regular/Medium) for consistency across weights.
- **Display / Headings (EN):** `Manrope` (SemiBold/Bold) — pairs visually with Plex Sans Arabic’s geometry.
- **Body (EN):** `Inter` (Regular/Medium) — high legibility at small sizes for dashboards/tables.
- **Numerals/Data (both):** `Manrope` tabular figures — used in analytics, grades, stat badges for consistent digit width.

**Type Scale (8pt-aligned, rem @ 16px base):**

| Token | Size / Line-height | Weight | Usage |
| --- | --- | --- | --- |
| `text-display-lg` | 48px / 56px | Bold | Marketing hero only |
| `text-display-sm` | 36px / 44px | Bold | Auth/marketing section titles |
| `text-h1` | 28px / 36px | SemiBold | Page titles (dashboard, course page) |
| `text-h2` | 22px / 30px | SemiBold | Section headers within a page |
| `text-h3` | 18px / 26px | SemiBold | Card titles, modal titles |
| `text-body-lg` | 16px / 24px | Regular | Primary body copy |
| `text-body-md` | 14px / 20px | Regular | Default UI text, table cells |
| `text-body-sm` | 12px / 18px | Regular | Captions, meta text, timestamps |
| `text-label` | 13px / 16px | Medium, +2% tracking | Form labels, tab labels, badges |

**RTL/LTR rule:** all type sizes are identical across languages; only alignment, icon mirroring, and letter-spacing (tracking is disabled entirely for Arabic) change per direction.

### 2.3 Spacing System

Strict **8pt base grid**, with a 4px half-step allowed only for icon-to-label gaps and dense table cells.

`space-1`=4px · `space-2`=8px · `space-3`=12px · `space-4`=16px · `space-5`=24px · `space-6`=32px · `space-7`=40px · `space-8`=48px · `space-9`=64px · `space-10`=96px

Default component padding: cards `space-5` (24px), modals `space-6` (32px), page gutters `space-6` (32px) desktop / `space-4` (16px) mobile.

### 2.4 Grid & Breakpoints

Desktop-first, fully responsive, 12-column grid, max content width `1280px`.

| Breakpoint | Width | Columns | Gutter |
| --- | --- | --- | --- |
| `xl` (desktop) | ≥1440px | 12 | 32px |
| `lg` (laptop) | 1200–1439px | 12 | 24px |
| `md` (tablet landscape) | 900–1199px | 8 | 24px |
| `sm` (tablet portrait) | 600–899px | 4 | 16px |
| `xs` (mobile) | <600px | 4 | 16px |

Sidebar (teacher/admin console) collapses to a bottom or drawer nav below `md`. Student/parent web views collapse to a top nav + hamburger below `sm`.

### 2.5 Radius & Elevation

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 8px | Inputs, small buttons, tags |
| `radius-md` | 12px | Cards, tables |
| `radius-lg` | 16px | Modals, large panels |
| `radius-full` | 999px | Primary/pill CTAs, avatars, badges |

| Elevation | Shadow | Usage |
| --- | --- | --- |
| `shadow-1` | `0 1px 2px rgba(20,69,63,0.06)` | Cards at rest |
| `shadow-2` | `0 4px 12px rgba(20,69,63,0.10)` | Hover cards, dropdowns |
| `shadow-3` | `0 12px 32px rgba(20,69,63,0.16)` | Modals, popovers |

Dark theme shadows use `rgba(0,0,0,0.4–0.6)` at the same offsets.

### 2.6 Iconography

Single-weight (1.5px stroke), rounded-cap line icon set (Phosphor/Lucide-style). Two contexts:
1. **Functional icons** (nav, actions, tables) — 20px, `color-text-secondary`, monochrome, never filled.
2. **Decorative icons** (auth backgrounds, empty states, marketing) — thin line icons at 10–20% opacity, echoing Reference 1’s scattered book/atom/pencil motif, always in `color-primary-300`.

AI-related UI elements use a small sparkle/spark glyph (✦-style, custom-drawn to match the stroke weight) paired with `color-ai-accent`, never the primary teal — this keeps “AI-generated” content visually distinguishable at a glance without a futuristic look.

### 2.7 Core Components

For each: default, hover, active/pressed, focus (2px `color-primary-500` outline, 2px offset — required for keyboard nav/AA), disabled, loading, error where applicable.

**Buttons**
- **Primary**: pill shape (`radius-full`), solid `color-primary-700` fill, white text. Hover → `color-primary-500`. Active → `color-primary-900` + scale 0.98. Disabled → `color-bg-muted` fill, `color-text-disabled` text, no shadow. Loading → spinner replaces label, button width locked to prevent layout shift.
- **Secondary**: pill shape, `color-primary-700` 1.5px outline, transparent fill, teal text. Hover → `color-primary-50` fill.
- **Tertiary/Ghost**: no border, teal text, hover → `color-primary-50` background, `radius-sm`.
- **Destructive**: same shapes as above, `color-error` in place of teal.
- Sizes: `sm` (32px height), `md` (40px height, default), `lg` (48px height, marketing/hero only).

**Inputs (text, select, textarea, search)**
- `radius-sm`, 1.5px `color-border-strong` border, 40px height (md), `color-bg-surface` fill.
- Focus → border becomes `color-primary-500`, 2px outer glow ring.
- Error → border `color-error`, helper text below in `color-error`, small alert icon inside field (end position, mirrored for RTL).
- Disabled → `color-bg-muted` fill, `color-text-disabled` text/placeholder.
- Label always above field (`text-label`), required fields marked with a teal asterisk, never red.

**Cards**
- `radius-md`, `shadow-1` at rest, `shadow-2` + 2px lift on hover if interactive/clickable.
- Course/lesson cards: 16:9 media top (photo, not illustration), title (`text-h3`), meta row (`text-body-sm`, `color-text-secondary`), optional stat badge overlay top-corner per Reference 2 pattern.

**Tables (student lists, exam results, analytics)**
- Row height 56px (md), `color-bg-muted` header row with `text-label` column titles, zebra striping optional only for dense data (exam results), sticky header on scroll, sortable column indicator (chevron), row hover → `color-primary-50`.
- Row-level actions revealed on hover (desktop) / always visible as a kebab menu (mobile/touch).

**Modals**
- `radius-lg`, `shadow-3`, max-width 560px (standard) / 720px (data-heavy, e.g., exam review), centered, scrim `rgba(15,22,19,0.5)`.
- Header (`text-h3` + close icon end-aligned), body, footer with actions right-aligned (LTR) / left-aligned (RTL) — secondary action closer to content, primary action outermost.

**Navigation**
- **Top nav** (marketing/auth): flat, transparent → solid on scroll, logo start, links center, CTA end, per Reference 1.
- **App shell nav (Teacher/Admin)**: left sidebar (collapsible to icon rail), sections grouped by feature area (Teach / Assess / Analyze / Communicate / Settings), active item = `color-primary-100` pill background + teal icon/text.
- **App shell nav (Student, web)**: left sidebar, simplified 6–7 items max.
- **Mobile (Flutter)**: bottom tab bar, 4–5 primary destinations max, overflow into a “More” tab.

**Concrete nav item sets** (per the team’s flow sketches — build against these labels directly, AR primary NO EN):

*Student navbar (top nav + profile dropdown):*
- الرئيسية (Home/Dashboard)
- باقاتي (My Subscriptions/Packages) — the packages the student is currently subscribed to
- تفاصيل المحاضرات (Lecture Details) — quick jump into a subject’s lecture list
- الامتحانات (Exams)
- درجاتي (My Grades/Results)
- الكتب (Books)
- القناة الرئيسية (Main Channel) — external link to the lecture-hosting channel (see §4.2 Channel)
- Profile dropdown (avatar, end-aligned): الملف الشخصي (Profile), الإشعارات (Notifications), الوضع الليلي (Dark Mode toggle), تسجيل الخروج (Logout)
- Footer/secondary: حول المنصة (About) → طرق الدفع (Payment Methods), الكتب والأسعار (Books & Pricing)

*Teacher sidebar:*
- Dashboard (لوحة التحكم)
- باقات (Packages)
- كورسات (Courses)
- الطلبة (Students) — with a filter control (year/group)
- الامتحانات (Exams)
- القناة (Channel)
- التحليلات (Analysis)
- التقارير (Reports)
- Feedback
- Profile dropdown: عن حسابي (About Me), الإعدادات (Settings), تسجيل الخروج (Logout)

Both sets map 1:1 onto the screens specified in §4.2/§4.3 — no nav item exists without a corresponding screen, and no screen in §4 is missing a nav entry point.

**Status & Badges**
- Pill-shaped, `text-body-sm` Medium, tinted background at 12% + full-opacity text of the semantic color (success/warning/error/info) or `color-ai-accent` for AI-generated tags.
- Standard labels: “Published,” “Draft,” “Under Review,” “AI-Generated · Needs Approval,” “Weak Topic.”

**Component States Summary**
All interactive components implement: `default · hover · focus-visible · active · disabled · loading · error (where input-like) · empty (where data-driven)`. Motion: 150ms ease-out for hover/press, 200ms for modal/drawer enter, no motion on data updates beyond a subtle 300ms cross-fade to avoid distracting teachers scanning analytics.

### 2.8 Design Tokens (implementation-ready naming)

Tokens follow `{category}-{property}-{variant}-{state?}` naming for direct mapping to Angular (CSS custom properties / SCSS maps) and Flutter (`ThemeExtension` + `ColorScheme`), e.g. `color-primary-700`, `radius-full`, `space-5`, `shadow-2`, `text-h1`. Light/dark are two token sets sharing identical structural tokens (spacing, radius, type scale) and differing only in color tokens — this lets both platforms swap themes by swapping one token file.

### 2.9 Accessibility Guidelines

- WCAG AA minimum contrast on all text/UI states (verified in §2.1).
- All interactive elements reachable via keyboard, visible focus ring (never `outline: none` without replacement).
- Minimum touch target 44×44px on mobile/Flutter.
- All icons paired with text labels or `aria-label`/semantic labels; icon-only buttons require tooltips + accessible names.
- Full RTL mirroring: layout direction, icon direction (arrows, chevrons, progress), number formatting (Arabic-Indic digits optional per user preference, Western digits by default for data tables per common EdTech convention in Egypt).
- Color is never the sole indicator of state (e.g., “weak topic” = red badge **and** warning icon **and** text label).
- Video player and PDF reader both support keyboard navigation and screen-reader-accessible transcripts/alt text fields (teacher-provided).
- Motion respects `prefers-reduced-motion`.

---

## 3. User Flows

*(Flow descriptions only — screen-by-screen specs are in §4.)*

**Content hierarchy governing both flows below** (from the team’s sketches): **باقة / Package** → contains one or more **كورس / Course** → contains one or more **محاضرة / Lecture**. Each lecture bundles: شرح (Explanation, delivered as Video and/or PDF), واجب (Homework), امتحان (Exam), بنك اسئلة (Question Bank), and an optional مراجعة (Review) pass. A course can only be attached to a package from within the course’s own edit screen — packages themselves don’t manage course membership. This hierarchy is the backbone of both the student’s “My Subscriptions” area and the teacher’s Packages/Courses console, and it replaces the flatter “Course → Lesson” framing used earlier in this document.

Two supporting areas sit alongside the hierarchy: a **Channel** (the academy’s external video-hosting channel/Facebook group, where recorded lectures are uploaded and students can comment) and a **Books** library (PDF books, independent of packages, browsable and downloadable by any student).

### 3.1 Student Flow

1. **Landing/Marketing** → **Sign Up / Log In** (email or academy-issued code) → if first login, **Onboarding** (select grade/stage, join academy via code, notification permissions) → **Student Dashboard**.
2. From Dashboard → **My Subscriptions (باقاتي)** — the packages the student is enrolled in → select a package → **Package Overview** (its courses) → select a course → **Course Overview** (its lectures, progress bar) → select a lecture → **Lecture Details (تفاصيل المحاضرات)**: Explanation (Video/PDF) → Homework → Exam → Question Bank → Review, each opened from the same lecture screen. If a student isn’t subscribed to a package, its lecture-level detail stays locked/hidden — only the package/course cards themselves are browsable.
3. From a Lecture Details screen or the **الامتحانات (Exams)** nav item → **Quiz/Exam Taking** flow (instructions screen → timed question flow → review-before-submit → submit) → **Exam Results** screen (score, AI feedback if released) → feeds into **درجاتي (My Grades)**.
4. From nav → **درجاتي (My Grades)** — all results across packages/courses, with a **Weak Areas** drill-down (topic-level breakdown, linked back to the relevant lecture for restudy).
5. From nav → **الكتب (Books)** — browse/search PDF books, independent of package subscription, download for offline reading.
6. From nav → **القناة الرئيسية (Channel)** — deep link out to the academy’s recorded-lecture channel, where students can watch and comment.
7. From a Lecture Details screen → **Ask a Question** → **Q&A thread** with the teacher (async).
8. Supporting flows accessible from persistent nav: **Notifications,** **Profile & Settings** notification light-dark themes toggle , password) — reached via the profile dropdown, not a full settings page, per the sketches.

### 3.2 Teacher Flow

1. **(already registered by an admin) Log In** (academy-provisioned account) → **Teacher Dashboard** (at-a-glance: pending exam question reviews, recent student activity, weak-topic alerts, quick actions).
2. **Package Management**: Dashboard → **Packages (باقات)** list → **Create Package** (Create → Form → fill package details → package created) → **Edit/Delete Package** (full CRUD). A package on its own holds no course content — it’s a container/pricing unit that courses opt into.
3. **Course & Lecture Management**: **Courses (كورسات)** list → **Create/Edit/Delete Course** (title, subject, stage, and — from this screen only — which package(s) it belongs to) → **Course Detail** → **Add/Edit Lecture**: teacher attaches the lecture’s Video and/or PDF, Homework, Exam, and Question Bank all from one lecture screen (“everything related to this lecture” lives together) → lecture appears in the course’s ordered lecture list.
4. **AI Exam Builder** (matches the sketched step order): from a Lecture or the **الامتحانات (Exams)** area → **New Exam** → select الصف/المجموعة (year/group), الدرس (lesson/lecture), and question focus → **Generate** (AI drafts questions from the lesson content) → **Edit** (review/adjust the generated questions, add/remove) → **Confirm** (distribute the exam to the target group). This is a tightened version of the previous Setup → Generate → Question Review → Publish sequence, now explicitly year/group-scoped at step one.
5. **Student Management**: **الطلبة (Students)** list, filterable by year/group/course → **Student Profile** (performance, exam history, weak topics, message shortcut).
6. **Analysis (التحليلات)**: class/course-level trends and weak-topic heatmap → drill into **Weak Topic Analysis**.
7. **Reports (التقارير)**: generate a report per course/per student (AI-drafted, chart-based) → **Review/Approve** (required human-in-the-loop step, matches the backend `IsApproved` flag) → once approved, the report is **sent to the parent as a message/email** — there is no parent-facing report screen to route to (see §3.3).
8. **Communication**: **Channel (القناة)** management (upload/link recorded lectures) and **Messaging** (1:1 or Q&A thread reply).
9. Supporting flows: **Calendar** (manage exam/lecture dates), **Notifications**, profile dropdown (عن حسابي / About Me, Settings, Logout).

---

Parents do **not** have an in-app dashboard, login area, or screens. A parent’s only touchpoint is receiving an **approved report as a message or email** once a teacher completes the Reports → Review/Approve step in §3.2. No parent-facing screens are specified in §4 as a result.

---

## 4. Screen Specifications

Each screen follows the same specification structure: **Purpose · Sections (top→bottom) · Components · Interactions · Responsive behavior · States · Image placeholders.**

### 4.1 Shared/Auth Screens

**Login**
- *Purpose:* authenticate returning users.
- *Sections:* logo, welcome heading, email/username field, password field (show/hide toggle), “forgot password” link, primary pill login button, divider, role-context hint (academy code entry if applicable), sign-up link, decorative teal photo panel (per Reference 1) on the non-form half (desktop only).
- *Components:* Input, Button (primary/ghost), Link, decorative line-icon background layer.
- *Interactions:* inline validation on blur; Enter submits.
- *Responsive:* two-column (form + photo panel) ≥`lg`; single column, photo panel hidden, below `md`.
- *States:* default; error (invalid credentials — inline banner, not per-field, to avoid confirming which field was wrong); loading (button spinner, fields disabled); success (redirect).
- *Image placeholder:* `[IMG: auth-hero-photo — real student/teacher photo, teal-toned]`.

**Sign Up** — same shell as Login. Adds role selection is *not* user-facing (role assigned by academy invite/code) — field for **Academy Invite Code**, name, email, password + confirm, terms checkbox.
- *States* add: code-invalid error, weak-password inline meter.

**Forgot / Reset Password** — single-column centered card: email entry → “check your email” confirmation state → reset form (new password + confirm) → success state routing to Login.

**Onboarding (Student)** — 3-step lightweight wizard (stage/grade select → join academy via code → notification permission) with a progress dots indicator, skippable except academy code.

**Onboarding (Teacher)** — 3-step wizard (create/join academy workspace → academy profile basics → create first course prompt, skippable).

### 4.2 Student Screens

**Student Dashboard**
- *Sections:* greeting header (“Welcome back, [Name]” + date), quick-stat badge row (active packages, upcoming exams, current streak), “Continue Learning” horizontal package/course card carousel, “Upcoming” list (exams with due dates, from Calendar data), “Weak Areas” summary card (top 2–3 topics, CTA to full view), announcements feed snippet.
- *Components:* stat badges, package/course cards, list items with icon+label, empty-state illustration for new users with zero subscriptions.
- *Interactions:* carousel swipe/scroll; each card/list item navigates to its detail screen.
- *Responsive:* stat badges wrap to 2×2 grid on mobile; carousel becomes vertical stack ≤`sm`.
- *States:* loading (skeleton cards); empty (no subscriptions yet → CTA “Subscribe to a package”); error (retry banner if dashboard data fails to load).
- *Image placeholders:* `[IMG: course-thumbnail]` per card.

**My Subscriptions (باقاتي)**
- *Sections:* page header + search/filter (subject, stage), grid of package cards the student is subscribed to (each showing its courses count + progress), a secondary “Browse Packages” area for non-subscribed packages shown read-only (card visible, no lecture detail until subscribed).
- *Interactions:* tapping a subscribed package opens Package Overview; tapping a non-subscribed package shows a locked state with subscribe/contact-academy CTA — no lecture-level detail leaks through.
- *States:* empty (no active subscriptions), loading (skeleton grid).

**Package Overview**
- *Sections:* package header (title, stage, subject), grid/list of the courses inside this package, each course card showing lecture count + progress.
- *States:* empty (package has no published courses yet), loading skeleton.

**Course Overview**
- *Sections:* course header (cover photo, title, teacher name, overall progress bar), ordered list of lecture cards (title, content-type icons for Video/PDF, completion checkmark), locked-state cards for lectures not yet released.
- *Interactions:* tapping a lecture opens Lecture Details.
- *States:* empty (no lectures published yet); loading skeleton.
- *Image placeholder:* `[IMG: course-cover-photo]`.

**Lecture Details (تفاصيل المحاضرات)**
- *Sections:* lecture header (title, course/package breadcrumb), tabbed content matching the lecture’s bundle: **شرح/Explanation** (video player and/or PDF reader, whichever the teacher attached), **واجب/Homework**, **امتحان/Exam** (deep-links into the Quiz/Exam Taking flow), **بنك اسئلة/Question Bank** (practice-only, ungraded), **مراجعة/Review** pass, mark-complete action, next-lecture navigation.
- *Interactions:* switching tabs doesn’t lose video/PDF playback position; the exam tab is disabled until the explanation has been opened at least once (configurable per academy); a question raised here routes into the Messages/Q&A thread.
- *Responsive:* tabs collapse into a horizontally scrollable strip on mobile.
- *States:* loading (video buffering / document rendering skeleton), error (playback or file load failed — retry), tab-empty (e.g., no homework attached to this lecture).

**Books (الكتب)**
- *Sections:* page header + search/filter (subject, stage), grid of book cards (cover, title, subject tag), all content is PDF.
- *Interactions:* tapping a book opens an in-app PDF reader with a Download action.
- *States:* empty (no books published for the student’s stage yet), loading skeleton, download-in-progress indicator.
- *Image placeholder:* `[IMG: book-cover]` per card.

**الامتحانات (Exams)** — list view of all exams the student has access to across subscribed packages (Upcoming / Past), each row: title, lecture/course, due date, status badge (Not Started/In Progress/Submitted/Graded). Selecting an upcoming exam enters the Quiz/Exam Taking flow below; selecting a graded one opens its Exam Results.

**Quiz/Exam Taking Flow**
- *Instructions screen:* rules, time limit, number of questions, “randomized order” notice, Start button.
- *Question screen:* progress indicator (Q3/20), question text, answer options (MCQ/short answer per type), flag-for-review toggle, next/previous nav, persistent timer (color shifts to warning/error as time runs low), tab-switch detection banner if triggered.
- *Review-before-submit screen:* grid of question numbers color-coded (answered/flagged/unanswered), final Submit confirmation modal.
- *States:* auto-save indicator (draft answers saved every N seconds), time-expired auto-submit, connectivity-lost warning banner.

**Exam Results**
- *Sections:* score summary (large number + pass/fail or grade band), per-question breakdown (collapsed by default, expandable), AI feedback panel (if teacher has released it), CTA to relevant Weak Areas.
- *States:* pending (grading in progress — for non-deterministic/essay parts awaiting teacher override), released, error.

**درجاتي (My Grades)**
- *Sections:* all-results table/list across every subscribed package (exam title, course, date, score), filter by package/course/date range, summary stat row at top (overall average, exams completed), **Weak Areas** section below the table: topic list ranked by weakness severity, each with a mini progress ring + “Review Lecture” deep link, trend indicator (improving/declining vs. last period).
- *States:* empty (“No graded exams yet”); weak-areas-empty (“Not enough data yet — complete a few more exams”).

 **Q&A Channel** 
- *Sections:* thread list (by course or teacher), conversation view (bubble list, teacher messages visually distinct via a small teacher-badge, not a color change), composer with attachment support.
- *States:* empty inbox, sending/failed-to-send message indicator.

**Notifications** — chronological list, grouped by day, unread indicator dot, filter by type (grades, messages, announcements, deadlines).

**Calendar** — month/week toggle, color-coded dots per item type (exam/assignment/live session), tapping a date opens a day-agenda panel.

**Profile & Settings** — profile photo/name (read-only or limited-edit depending on academy policy), language: Arabic only for now, theme toggle (Light/Dark/System), notification preferences (per-category toggles), password change, linked-parent visibility notice.

### 4.3 Teacher Screens

**Teacher Dashboard**
- *Sections:* greeting + academy/class selector (if multiple), quick-stat badges (pending exam reviews, active students, avg. class score this week, unread messages), “Needs Your Attention” priority list (AI reports awaiting approval, exams awaiting question review), recent class activity feed, weak-topic alert banner (aggregated across classes).
- *States:* empty (brand-new teacher, no courses → CTA “Create your first course”); loading skeleton.

**Packages (باقات) List** — grid/list toggle, each card shows the package’s course count + subscriber count + status (Published/Draft), “+ Create Package” primary CTA.

**Create/Edit Package**
- *Sections:* Create → Form pattern per the sketch: package title, stage, description, price/plan info, cover image placeholder, visibility (draft/published).
- *Interactions:* a package does **not** manage which courses belong to it — that link is only made from the Course edit screen (see below); this screen shows a read-only list of courses currently attached, for reference.
- *States:* saving indicator (autosave draft), validation errors.
- *Image placeholder:* `[IMG: package-cover-upload]`.

**Courses (كورسات) List** — grid/list toggle, filter by stage/subject, each card shows enrolled-student count + status (Published/Draft), “+ Create Course” primary CTA.

**Create/Edit Course** — form: title, subject, stage, description, cover image upload placeholder, visibility (draft/published), **attach to package(s)** (this is the only place the course↔︎package link is created or changed).
- *States:* saving indicator (autosave draft), validation errors, image-upload progress.
- *Image placeholder:* `[IMG: course-cover-upload]`.

**Course Detail (Teacher view)** — tabs: Lectures / Exams / Students / Analysis. Lectures tab shows a drag-to-reorder list with per-lecture status (published/draft) and a quick “AI-indexed ✓ / Indexing…” chip reflecting RAG processing status. Package > Course > Lecture breadcrumb always visible at the top.

**Lecture Management — Add/Edit Lecture**
- *Sections:* lecture title, content type selector (Video / PDF / both), upload area for the explanation content, plus in the same screen: **Homework** attachment, **Exam** attachment/link, **Question Bank** attachment — everything related to the lecture is added from one place, per the sketch (“يقدر يحط الفيديو و الواجبات و كل اللي ليه علاقة بالمحاضرة دي”), “attach to topic/subject-tag” field (feeds RAG metadata: SubjectId/LessonId/DifficultyLevel).
- *States:* upload progress bar per attachment; **RAG-processing state** (“Indexing content for AI…” spinner chip) distinct from upload-complete; processing-failed error with retry.

**PDF Upload / Video Upload (as a focused sub-flow)** — drag-and-drop zone, file-type/size validation messaging, progress bar, post-upload preview thumbnail, replace/remove actions.

**AI Exam Builder — Setup**
- *Sections:* matches the sketched order exactly — select **السنة/المجموعة (Year/Group)**, then **الدرس (Lecture)**, then exam title + question focus, difficulty select, question type checkboxes (MCQ, true/false, short answer), question count stepper, “Generate” primary CTA.
- *States:* generating (progress state with reassuring copy — “Drafting N questions from your lecture content…”), generation-failed (retry, with note that no content was invented — ties to the `DATA_UNAVAILABLE` guardrail).

**Edit Generated Questions**
- *Sections:* generated question list (question text, options with correct answer marked, difficulty tag, “AI-Generated” badge), per-question actions: Edit / Regenerate / Delete, add-manual-question option, overall exam summary sidebar (question count, est. duration, coverage-by-topic chip list).
- *Interactions:* inline edit expands the question into an editable form; regenerate shows a brief loading state scoped to that one question only.
- *States:* empty (all questions removed — block confirm until ≥1 remains), unsaved-changes warning on navigation away.

**Confirm & Distribute Exam**
- *Sections:* schedule (start/end or window), time limit, target year/group, anti-cheating toggles (tab-switch detection, copy-paste restriction, randomized order/question pools), review summary, Confirm button (secondary confirm modal).
- *States:* success confirmation with notify-students option.

**Students List** — table (name, class, avg. score, last activity, weak-topic count), search/filter by class, row click → Student Profile, bulk select → message/export actions.

**Student Profile (Teacher view)**
- *Sections:* student header (photo placeholder, name, class), performance trend chart, exam history table, weak-topic breakdown, message shortcut, parent-linked indicator.
- *Image placeholder:* `[IMG: student-avatar-photo]`.

**Analytics Dashboard**
- *Sections:* class/course selector, headline stat row (avg score, completion rate, at-risk student count), trend chart over time, weak-topic heatmap (topics × severity), top/bottom performer lists.
- *States:* empty (not enough exam data yet), loading skeleton for charts.

**Weak Topic Analysis** — dedicated deep-dive: topic list with student-count affected, drill-down to see which students, suggested-action note (“Consider a review session on Fractions — 8 students below threshold”).

**AI Reports — Generate & Review**
- *Sections:* report scope selector (per course or per student, matching the sketch’s “Reports → charts / Parent / per student”), chart-based report preview built from analytics data, “Generate Report” CTA → AI-drafted narrative section layered on the charts (clearly labeled “AI-Generated · Awaiting Approval” using the `color-ai-accent` badge), editable text areas for teacher edits, **Approve & Send to Parent** primary action (maps directly to the `IsApproved` flag and triggers an outbound message/email — there is no parent-facing screen this routes to), Reject/Regenerate option.
- *States:* draft (not yet approved — nothing sent, shown with a persistent “Not sent yet” notice), approved (locked from further silent AI edits, shows approval timestamp + teacher name + delivery status: sent via message/email).

**Announcements** — composer (title, body, target audience: course/class/all), scheduled-send option, list of past announcements with read-receipt count.

**Messaging (Teacher inbox)** — same shell as student Messages, with a class/course filter and quick-reply templates.

**Calendar (Teacher)** — same component as student calendar, editable: create exam/assignment deadlines directly from date cells.

**Notifications** — same pattern as student notifications, filtered to teacher-relevant types (submissions, AI report ready, low-performance alerts).

**Settings** — profile, academy/workspace settings (if owner), language/theme, notification preferences, team/teacher management (if admin), billing/plan (if applicable).

### 4.4 Parent Touchpoint (no screens)

Parents have no login, dashboard, or in-app screens. The only parent-facing artifact is the message/email produced by the Teacher’s **AI Reports — Generate & Review** screen once a report is approved (§4.3). That message/email should be designed as a lightweight branded template (subject line, student name, headline stat, 2–3 line AI-drafted summary, teacher’s name/approval note) — out of scope for the in-app component system in §2, but should reuse the same color/type tokens for brand consistency.

---

## 5. Information Architecture

```
Draya
├── Marketing (public)
│   ├── Home
│   ├── About / Academy Info
│   ├── Pricing / Plans
│   └── Contact
├── Auth
│   ├── Login
│   ├── Sign Up (invite-code gated)
│   ├── Forgot/Reset Password
│   └── Onboarding (role-specific)
├── Student App
│   ├── Dashboard
│   ├── My Subscriptions (باقاتي) → Package Overview → Course Overview → Lecture Details
│   │   └── Lecture Details tabs: Explanation (Video/PDF) / Homework / Exam / Question Bank / Review
│   ├── الامتحانات (Exams) → Exam Taking → Exam Results
│   ├── درجاتي (My Grades) → Weak Areas
│   ├── الكتب (Books)
│   ├── القناة الرئيسية (Channel) — external link
│   ├── Messages / Q&A
│   ├── Calendar
│   ├── Notifications
│   └── Profile dropdown (Profile / Notifications / Dark Mode / Logout)
├── Teacher App
│   ├── Dashboard
│   ├── باقات (Packages) → Create/Edit Package
│   ├── كورسات (Courses) → Course Detail (Lectures / Exams / Students / Analysis)
│   │   └── Lecture Management (Video/PDF + Homework + Exam + Question Bank, one screen)
│   ├── الامتحانات (Exams) → AI Exam Builder (Year/Group → Lecture → Generate → Edit → Confirm & Distribute)
│   ├── الطلبة (Students) → Student Profile
│   ├── التحليلات (Analysis) → Weak Topic Analysis
│   ├── التقارير (Reports) → Generate/Review/Approve → sent to Parent via message/email
│   ├── القناة (Channel) management
│   ├── Messaging
│   ├── Calendar
│   ├── Notifications
│   └── Profile dropdown (About Me / Settings / Logout)
└── Parent Touchpoint (no app screens)
    └── Receives approved reports via message/email only (see §4.4)
```

**Navigation hierarchy rule:** Teacher/Admin nav groups by *workflow* (Teach → Assess → Analyze → Communicate), not by data entity — this matches how a non-technical teacher thinks about their day, per the “simple enough for teachers with limited technical experience” brand requirement.

---

## 6. Component Guidelines Summary (for engineering handoff)

- Build the token layer first (color/type/space/radius/shadow) as a shared package consumable by both Angular (SCSS maps / CSS custom properties) and Flutter (`ThemeData` + `ThemeExtension`), so light/dark and AR/RTL are theme-level switches, not per-component logic.
- Every component ships with all states listed in §2.7 as separate Storybook (Angular) / widget-catalog (Flutter) entries before feature integration.
- AI-generated content (exam questions, reports) always carries the `color-ai-accent` badge treatment and, where it reaches a human outside the teacher’s review (a parent’s message/email), the approval-gate pattern from the AI Reports screen — this is a system-wide rule, not a one-off screen decision.
- RTL is the default build target; LTR/English is the mirrored variant — build and QA in Arabic first.

---

## 7. UX Rules

1. Never send an unapproved AI report to a parent — the “Approve & Send to Parent” action is blocked in UI until the teacher has reviewed the draft, and relies on the backend `IsApproved` flag as the source of truth.
2. Every AI-generated artifact (question, summary, report) is visually tagged and always editable/overridable by the teacher before it reaches a student or parent, except student-facing AI Lesson Summaries, which are informational and don’t require approval but are still tagged as AI-generated.
3. Loading states are mandatory for any AI generation step (exam building, summarization, report drafting) with honest, specific progress copy — never a generic infinite spinner with no context.
4. Errors state what happened and what to do next; never a bare “Something went wrong.”
5. Destructive actions (delete lesson, delete exam, remove student) always require a confirmation modal restating what will be lost.
6. Empty states always include a next action, never just an illustration and text.

---

## 8. Placeholder Conventions

All imagery not yet finalized is marked inline as `[IMG: descriptive-slug — brief content note]` directly in the screen spec (see §4). Two categories:
- **Photography placeholders** (hero, course covers, avatars): reserve real aspect ratios (16:9 for course covers, 1:1 for avatars, 21:9 for marketing hero) so layout doesn’t shift when real photos are dropped in.
- **Illustration placeholders** (empty states only): reserve a centered 200×200px slot above empty-state text.

No image is designed or specified beyond its placement, aspect ratio, and content intent.

---

## 9. Scalability Recommendations

- **New roles** (e.g., academy Admin/Owner distinct from Teacher): the nav-grouping-by-workflow pattern and RBAC-aware component visibility (already required by the backend’s RBAC) extend cleanly — add a role-scoped nav config rather than new screens.
- **New content types** beyond PDF/Video (e.g., live sessions, interactive slides): slot into the existing Lesson Management “content type selector” pattern.
- **Multi-academy/white-label**: primary teal token is structured as a single override point (`color-primary-700` and its scale) so an academy-level theme override is a token swap, not a redesign.
- **Additional languages** beyond AR/EN: the type-scale and spacing tokens are language-agnostic; only the font-family token pair needs a new entry per language.

---

*End of DESIGN.md — for the full component token export and screen-by-screen Figma structure, this document should be paired with a Figma file organized by the same hierarchy as §5.*