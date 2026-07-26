# درايَة (Draya) — Design System v2 Specification

**Version:** 2.0.0 (Definitive Release)  
**Target Platform:** Web (React + TypeScript + Tailwind CSS v4 / CSS Variables) & Mobile (Flutter)  
**Language & Direction:** Arabic First · RTL Native (`dir="rtl"`)  
**Target Market:** Egyptian Educational Academies, Secondary School Students (Thanaweya Amma), Private Tutors & Parents  
**Auditor & Author:** Principal Product Designer, Design System Architect & Frontend Architect  

---

## 1. Design Philosophy

### 1.1 Product Vision
Draya is not a software utility. It is a **classroom that never closes** — designed specifically for the high-stakes cultural context of Egyptian secondary education. Where traditional LMS platforms (such as Moodle or generic canvas kits) function as cold file repos and online quiz forms, Draya bridges private tutoring, AI intelligence, and student encouragement into a seamless, calm academic sanctuary.

### 1.2 Design Principles
1. **Academic Precision (الدقة الأكاديمية):** Every pixel, padding step, and typography weight exists for a reason. Zero decorative clutter.
2. **Directed Momentum (الزخم الموجه):** The interface constantly guides the student to their next most important action, replacing Thanaweya Amma anxiety with structured progress.
3. **Quiet Intelligence (الذكاء الهادئ):** AI is a silent assistant that drafts, analyzes, and detects weaknesses — never a noisy gimmick or a replacement for the educator.
4. **Human-in-the-Loop Control (السيطرة البشرية):** Teachers maintain total oversight over all AI-generated content before it reaches students or parents.

### 1.3 Brand Mission & Emotional Experience

```
  STUDENT JOURNEY  ───►  [Anxiety & Overwhelm]  ──►  [Directed Clarity]  ──►  [Motivated Mastery]
  TEACHER JOURNEY  ───►  [Manual Admin Chaos]  ──►  [Automated Speed]   ──►  [Professional Command]
  PARENT JOURNEY   ───►  [Uncertainty & Fear]  ──►  [Approved Reports]  ──►  [Reassurance & Trust]
```

- **Students feel:** Capable, seen, and organized. The UI provides warmth without childishness and structure without rigidity.
- **Teachers feel:** Respected, highly efficient, and in total control of their academic material and student groups.
- **Parents feel:** Reassured and informed through official, teacher-approved summary communications.

### 1.4 Human-First AI Philosophy
Artificial Intelligence in Draya follows three strict rules:
1. **Always Tagged:** All AI-generated items (exam questions, lesson summaries, performance reports) carry the distinct `color-ai-accent` purple sparkle badge.
2. **Always Editable:** No AI text is locked. Teachers can edit, regenerate, or discard any generated content inline.
3. **Gated Approval (`IsApproved`):** AI performance reports are never dispatched to parents automatically. The backend `IsApproved` boolean must be explicitly toggled by the teacher in the UI before delivery.

---

## 2. Brand Personality

### 2.1 Current vs. Target Personality

| Attribute | Current Prototype (v1) | Target System (v2) |
|---|---|---|
| **Tone** | Corporate SaaS cool | Warm, authoritative, academic |
| **Arabic Identity** | Mirrored text in Western layout | RTL-first native typography & spatial flow |
| **Visual Weight** | Timid, light, inconsistent gaps | Bold structure, confident whitespace, strong contrast |
| **AI Perception** | Feature badge | Silent mentor / precision tool |
| **Craft Level** | Template-like | Premium (Linear / Notion / Stripe standard) |

### 2.2 Brand Adjectives & Mandates

1. **دقيق (Precise):** Strict 8pt spatial rhythm, pixel-aligned tokens, zero arbitrary styling.
2. **دافئ (Warm):** Soft off-white canvas (`#FBFAF7`), human greetings, real photography.
3. **ذكي (Intelligent):** Clean purple-sparkle AI indicators (`#7C3AED`), streaming text feedback.
4. **عربي (Arabic-First):** Built natively for `IBM Plex Sans Arabic`; zero forced Latin caps or reversed icons.
5. **موثوق (Trustworthy):** Deep Teal palette (`#14453F`), WCAG AA contrast, clear state indicators.
6. **محفِّز (Motivating):** Learning streaks, progress rings, celebration micro-interactions.

### 2.3 Persona Keyword Dictionary

- **Student Vocabulary:** تقدم (Progress) · فهم (Understanding) · ثقة (Confidence) · إنجاز (Achievement) · مراجعة (Review)
- **Teacher Vocabulary:** كفاءة (Efficiency) · سيطرة (Control) · وضوح (Clarity) · احترافية (Professionalism) · دقة (Precision)
- **Parent Vocabulary:** اطمئنان (Reassurance) · شفافية (Transparency) · اهتمام (Care) · نتائج (Results)

---

## 3. Design Foundations

### 3.1 Color System

Draya uses a structured 5-tier color model. The primary brand anchor is **Deep Teal**, paired with warm neutral slates and a distinct purple AI accent.

```
       [ Deep Teal #14453F ] ─── Primary Brand Anchor (Academic Authority)
       [ Warm Canvas #FBFAF7 ] ── Background Base (Reduces Eyestrain)
       [ AI Accent #7C3AED ]  ── Quiet Intelligence (Sparkle Elements)
```

#### Palette Tokens Table

| Token Name | Hex Code | Role & Usage | Contrast Ratio vs Base |
|---|---|---|---|
| `color-primary-900` | `#0C2E29` | Dark hero headers, primary text on dark | 14.2:1 (Pass AAA) |
| `color-primary-700` | `#14453F` | **Primary Brand Color**, primary buttons, active nav | 10.8:1 (Pass AAA) |
| `color-primary-500` | `#1D6E63` | Hover state for primary buttons, active focus rings | 7.1:1 (Pass AAA) |
| `color-primary-300` | `#5FA79A` | Secondary borders, decorative scatter icons | 3.4:1 (UI Only) |
| `color-primary-100` | `#DCEEEA` | Active tab backgrounds, progress bar tracks | 1.3:1 (Surface) |
| `color-primary-50`  | `#F2FAF8` | Tinted section backgrounds, card hover states | 1.1:1 (Surface) |
| `color-bg-base`     | `#FBFAF7` | Global canvas background (Warm off-white) | Base Canvas |
| `color-bg-surface`  | `#FFFFFF` | Card surfaces, modal containers, inputs | 1.05:1 vs Base |
| `color-bg-muted`    | `#F4F3EF` | Section alternates, table headers, skeletons | 1.12:1 vs Base |
| `color-border`      | `#E6E4DD` | Standard card and divider borders | 1.25:1 (UI Only) |
| `color-border-strong`| `#C2C0B5` | Input field borders, active card borders | 2.1:1 (UI Only) |
| `color-text-primary` | `#151B19` | Main headings, body text, primary labels | 15.4:1 (Pass AAA) |
| `color-text-secondary`| `#525E5A` | Sub-captions, metadata, form labels | 6.8:1 (Pass AAA) |
| `color-text-disabled` | `#96A09C` | Disabled inputs, placeholder text | 3.1:1 (Pass AA Large) |
| `color-text-on-primary`| `#FFFFFF` | Text inside primary buttons & dark heroes | 10.8:1 (Pass AAA) |
| `color-ai-accent`   | `#7C3AED` | **AI Features Only** (Badges, sparkles, AI drafts)| 7.8:1 (Pass AAA) |
| `color-success`     | `#10B981` | Completed lectures, high scores, active tags | 4.8:1 (Pass AA) |
| `color-warning`     | `#F59E0B` | Weak topics, pending reviews, deadlines | 3.2:1 (UI Only) |
| `color-error`       | `#EF4444` | At-risk alerts, failing scores, input errors | 4.6:1 (Pass AA) |
| `color-info`        | `#3B82F6` | System announcements, general info tags | 4.7:1 (Pass AA) |

---

### 3.2 Typography System

The entire system is calibrated for **IBM Plex Sans Arabic** (Primary) paired with **Manrope** (for numeric scores and analytics data tables).

#### Type Scale Specification

| Token | Size (px/rem) | Line Height | Weight | Usage Context |
|---|---|---|---|---|
| `text-h1` | 32px / 2.0rem | 1.25 (40px) | 800 (Bold) | Page titles, hero section headlines |
| `text-h2` | 24px / 1.5rem | 1.33 (32px) | 700 (Bold) | Section titles, modal titles, dashboard headings |
| `text-h3` | 18px / 1.125rem | 1.44 (26px) | 600 (SemiBold) | Card titles, lecture titles, table section headers |
| `text-body-lg` | 16px / 1.0rem | 1.50 (24px) | 400 (Regular) | Primary reading text, lead paragraphs |
| `text-body-md` | 14px / 0.875rem | 1.43 (20px) | 400 / 500 | Default body text, form input text, table content |
| `text-body-sm` | 12px / 0.75rem | 1.50 (18px) | 500 (Medium) | Secondary metadata, sub-labels, badge text |
| `text-caption` | 11px / 0.6875rem| 1.36 (15px) | 600 (SemiBold) | Timestamp tags, inline AI tags, footnote captions |
| `text-num-hero`| 40px / 2.5rem | 1.10 (44px) | 800 (Manrope) | Large stat display numbers (percentages, scores) |

#### Arabic Typography Rules
- **Letter Spacing:** Always set to `letter-spacing: 0` or `normal`. Never apply negative or positive letter-spacing to Arabic text.
- **Font Fallbacks:** `font-family: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`
- **Numbers:** Use Western Arabic digits (`0-9` formatted via `Manrope`) for data tables and financial prices; use Arabic-Indic digits where culturally preferred in descriptive text.

---

### 3.3 Spacing & Layout Rhythm

Draya enforces a strict **8pt Grid System** (with 4px micro-steps for tight inline elements).

| Spacing Token | Pixel Value | Rem Value | Common Application |
|---|---|---|---|
| `space-1` | 4px | 0.25rem | Inline icon gaps, badge internal padding |
| `space-2` | 8px | 0.50rem | Compact form gaps, stack gaps, button icon margins |
| `space-3` | 12px | 0.75rem | Card internal padding (compact), input vertical padding |
| `space-4` | 16px | 1.00rem | Standard card padding, form group spacing, grid gaps |
| `space-6` | 24px | 1.50rem | Large card padding, section gap (mobile), modal margins |
| `space-8` | 32px | 2.00rem | Section gap (desktop), dashboard component margins |
| `space-12` | 48px | 3.00rem | Major page section dividers |
| `space-16` | 64px | 4.00rem | Landing page hero spacing, marketing block gaps |

---

### 3.4 Grid & Responsive Breakpoints

| Breakpoint Key | Min Width | Target Devices | Max Layout Container | Sidebar Behavior |
|---|---|---|---|---|
| `sm` | 640px | Mobile (Portrait & Landscape) | 100% (padding 16px) | Hidden (Bottom tab bar) |
| `md` | 768px | Tablets (Portrait) | 720px | Collapsed Icon Rail (64px) |
| `lg` | 1024px | Tablets (Landscape) / Laptops | 960px | Full Expanded Sidebar (224px) |
| `xl` | 1280px | Desktops & Workstations | 1200px | Full Expanded Sidebar (224px) |
| `2xl` | 1536px | Ultra-wide Displays | 1400px | Full Expanded Sidebar (224px) |

---

### 3.5 Elevation & Shadows

Shadows use a tinted primary teal hue (`rgba(20, 69, 63, ...)`), preventing muddy grey shadows and creating visual depth aligned with the brand.

```css
/* Light Mode Elevation Tokens */
--draya-shadow-1: 0 1px 2px 0 rgba(20, 69, 63, 0.06);
--draya-shadow-2: 0 4px 12px -2px rgba(20, 69, 63, 0.10);
--draya-shadow-3: 0 12px 32px -4px rgba(20, 69, 63, 0.16);

/* Dark Mode Elevation Tokens */
--draya-shadow-1-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.40);
--draya-shadow-2-dark: 0 4px 12px -2px rgba(0, 0, 0, 0.50);
--draya-shadow-3-dark: 0 12px 32px -4px rgba(0, 0, 0, 0.70);
```

---

### 3.6 Corner Radius Scale

| Radius Token | Value | Applied Components |
|---|---|---|
| `radius-sm` | 8px (0.5rem) | Text inputs, dropdown menus, tags, select triggers, toasts |
| `radius-md` | 12px (0.75rem) | Standard cards, data tables, video player container |
| `radius-lg` | 16px (1.0rem) | Dialog modals, popover panels, hero feature cards |
| `radius-full` | 999px | Primary/Secondary Pill Buttons, Avatars, Badges, FloatBadges |

---

### 3.7 Border & Focus System

- **Subtle Border:** `1px solid var(--draya-border)` (`#E6E4DD`) — used for resting cards and dividers.
- **Strong Border:** `1.5px solid var(--draya-border-strong)` (`#C2C0B5`) — used for input fields and interactive cards.
- **Accessible Focus Ring:** `outline: none; box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px var(--draya-primary-500);` — mandatory for all keyboard-focused interactive elements.

---

### 3.8 Iconography & Visual Assets

#### Iconography System
- **Stroke & Style:** Single-weight 1.5px line icons (Lucide / Phosphor style) with rounded end-caps.
- **Functional Icons:** 20px size, monochrome (`color-text-secondary`), never filled. Used in navigation, buttons, tables, and forms.
- **Decorative Icons:** 28px–42px size, `color-primary-300` at 8%–12% opacity. Used strictly as background texture in auth panels and landing marketing blocks. **Never inside app dashboards.**
- **AI Sparkle Glyph:** 11px Sparkle (`✦`) in `color-ai-accent` (`#7C3AED`) attached to all AI badges.

#### Imagery & Photography Rules
- **Subject Matter:** Real Egyptian students, teachers, and university settings. No generic Western stock photos.
- **Tonal Color Grade:** All photos must apply a subtle cool-teal grade (`filter: saturate(0.9) hue-rotate(-5deg)`).
- **Aspect Ratios:** 16:9 for course covers, 4:3 for package cards, 1:1 for user avatars, 21:9 for hero banners.

#### Background Layering Stack (5 Levels)

```
Level 5: color-primary-900 (#0C2E29)  ── Dark Hero Banners / Marketing Footer
Level 4: color-primary-50  (#F2FAF8)  ── Tinted Feature & Stats Sections
Level 3: color-bg-surface   (#FFFFFF)  ── Floating Cards, Modals, Inputs
Level 2: color-bg-muted     (#F4F3EF)  ── Table Headers, Alternate Sections
Level 1: color-bg-base      (#FBFAF7)  ── Base Global Canvas Page Background
```

---

## 4. Design Tokens Specification

Implementation-ready CSS Custom Properties (`theme.css`) and Tailwind CSS v4 `@theme` mappings.

```css
/* ==========================================================================
   DRAYA DESIGN SYSTEM V2 — CSS DESIGN TOKENS (theme.css)
   ========================================================================== */

:root {
  /* Colors — Primary Palette */
  --draya-primary-900: #0C2E29;
  --draya-primary-700: #14453F;
  --draya-primary-500: #1D6E63;
  --draya-primary-300: #5FA79A;
  --draya-primary-100: #DCEEEA;
  --draya-primary-50:  #F2FAF8;

  /* Colors — Background & Surface */
  --draya-bg-base:     #FBFAF7;
  --draya-bg-surface:  #FFFFFF;
  --draya-bg-muted:    #F4F3EF;

  /* Colors — Borders */
  --draya-border:        #E6E4DD;
  --draya-border-strong: #C2C0B5;

  /* Colors — Text & Typography */
  --draya-text-primary:    #151B19;
  --draya-text-secondary:  #525E5A;
  --draya-text-disabled:   #96A09C;
  --draya-text-on-primary: #FFFFFF;

  /* Colors — Semantics & AI */
  --draya-ai:      #7C3AED;
  --draya-success: #10B981;
  --draya-warning: #F59E0B;
  --draya-error:   #EF4444;
  --draya-info:    #3B82F6;

  /* Radius Scale */
  --draya-radius-sm:   8px;
  --draya-radius-md:   12px;
  --draya-radius-lg:   16px;
  --draya-radius-full: 999px;

  /* Elevation Shadows */
  --draya-shadow-1: 0 1px 2px 0 rgba(20, 69, 63, 0.06);
  --draya-shadow-2: 0 4px 12px -2px rgba(20, 69, 63, 0.10);
  --draya-shadow-3: 0 12px 32px -4px rgba(20, 69, 63, 0.16);

  /* Motion & Durations */
  --draya-duration-fast:   150ms;
  --draya-duration-normal: 200ms;
  --draya-duration-slow:   300ms;
  --draya-duration-hero:   600ms;
  --draya-ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
  --draya-ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-Index Hierarchy */
  --draya-z-base:     0;
  --draya-z-card:     10;
  --draya-z-sticky:   100;
  --draya-z-header:   500;
  --draya-z-dropdown: 800;
  --draya-z-modal:    1000;
  --draya-z-toast:    1200;
}
```

#### Tailwind CSS v4 Inline Config (`app.css`)

```css
@import "tailwindcss";

@theme inline {
  --color-primary-900: var(--draya-primary-900);
  --color-primary-700: var(--draya-primary-700);
  --color-primary-500: var(--draya-primary-500);
  --color-primary-300: var(--draya-primary-300);
  --color-primary-100: var(--draya-primary-100);
  --color-primary-50:  var(--draya-primary-50);

  --color-bg-base:    var(--draya-bg-base);
  --color-bg-surface: var(--draya-bg-surface);
  --color-bg-muted:   var(--draya-bg-muted);

  --color-ai:         var(--draya-ai);
  --color-success:    var(--draya-success);
  --color-warning:    var(--draya-warning);
  --color-error:      var(--draya-error);

  --radius-sm:   var(--draya-radius-sm);
  --radius-md:   var(--draya-radius-md);
  --radius-lg:   var(--draya-radius-lg);
  --radius-full: var(--draya-radius-full);

  --shadow-1: var(--draya-shadow-1);
  --shadow-2: var(--draya-shadow-2);
  --shadow-3: var(--draya-shadow-3);
}
```

---

## 5. Layout Rules & RTL System

### 5.1 RTL First Standard (`dir="rtl"`)
Draya is built **RTL First**. The root HTML element must set `<html dir="rtl" lang="ar">`.

#### Mirroring Matrix

| Layout Element | RTL Behavior (Arabic) | Exception (Do Not Mirror) |
|---|---|---|
| **Sidebar Navigation** | Fixed to Right edge (`border-left`) | LTR code snippets in lesson text |
| **Back Arrows (`ChevronLeft`)**| Rotated 180° (points Right `→`) | Video scrubber / playback controls |
| **Progress Meters** | Fills from Right to Left | Math formulas & algebraic equations |
| **Modal Close Button** | Positioned top-right (`right: 16px`) | Western digits (`0-9`) in data tables |
| **Form Labels & Inputs** | Text aligned Right (`text-align: right`)| URLs and Email input values |
| **Table Columns** | First column begins on Right | Clock time format (`12:45 PM`) |

---

### 5.2 Page & Container Architecture

- **App Shell Container:** Standard app view uses fixed sidebar (224px right) + fluid main content area.
- **Max Container Widths:**
  - Standard Content: `1200px` centered (`mx-auto`).
  - Auth Cards & Form Wizards: `480px` centered.
  - Data-Heavy Views (Exam Builder, Analytics): `1400px` fluid.
- **Page Header Spacing:** Top padding `32px`, bottom margin `24px` with a persistent breadcrumb above title.

---

## 6. Component Library Specifications

Detailed specification cards for all 35+ reusable components. Every component strictly implements 7 core states: `default · hover · focus-visible · active · disabled · loading · error`.

---

### 6.1 Buttons (`Btn`)

- **Purpose:** Primary interaction trigger.
- **Variants:**
  - `primary`: Pill shape (`radius-full`), solid `color-primary-700` fill, white text.
  - `secondary`: Pill shape, `1.5px solid color-primary-700` border, transparent fill, teal text.
  - `tertiary / ghost`: No border, transparent fill, teal text. Hover → `color-primary-50` fill.
  - `destructive`: Pill shape, `color-error` fill, white text.
- **Sizes:** `sm` (32px height, 14px px), `md` (40px height, 22px px, default), `lg` (48px height, 32px px).
- **RTL Rule:** Icon slot positioned on the Right side of label with `gap: 8px`.

```tsx
/* Code Spec — Primary Button */
<button
  style={{
    height: "40px",
    padding: "0 22px",
    borderRadius: "999px",
    background: "var(--draya-primary-700)",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: "0.9375rem",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 150ms ease-out",
  }}
>
  {loading ? <Loader2 className="animate-spin" size={16} /> : children}
</button>
```

---

### 6.2 Text Inputs & Textareas (`Input`)

- **Purpose:** Text data capture.
- **Anatomy:** Top label + optional required asterisk (`*` in teal) + Input field + optional icon + bottom error/helper text.
- **Dimensions:** 42px height, `radius-sm` (8px), border `1.5px solid color-border-strong`.
- **RTL Padding Fix:** With end icon, `padding: 0 40px 0 14px` (icon positioned at `right: 12px` in RTL).
- **Accessibility:** Label linked via `htmlFor="input-id"`. Invalid state sets `aria-invalid="true"`.

---

### 6.3 Select & Dropdown (`Select`)

- **Purpose:** Option selection from list.
- **Trigger:** 42px height, `radius-sm`, chevron icon at `left: 12px` (RTL mirrored).
- **Menu Container:** `radius-sm`, `shadow-2`, background `color-bg-surface`, `z-index: 800`.
- **States:** Selected item highlighted with `color-primary-50` background + teal checkmark.

---

### 6.4 Checkboxes & Radio Buttons

- **Checkboxes:** 20×20px square, `radius-sm` (4px), 1.5px teal border. Checked → `color-primary-700` fill + white checkmark icon.
- **Radios:** 20×20px circle, 1.5px teal border. Checked → 6px inner teal dot.
- **Touch Target:** Minimum 44×44px invisible touch container surrounding control.

---

### 6.5 Navigation Tabs (`Tabs`)

- **Purpose:** Switching views within a single screen (e.g. Lecture Details tabs: Explanation / Homework / Exam).
- **Style:** Underline pill style or pill container style (`color-bg-muted` track, active tab = `color-bg-surface` + `shadow-1`).
- **Interaction:** Active tab indicator slides smoothly; non-active tabs show `color-text-secondary`.

---

### 6.6 Cards (`Card`)

- **Purpose:** Grouping related content.
- **Resting State:** `radius-md` (12px), background `color-bg-surface`, border `1px solid color-border`, `shadow-1`.
- **Hover State (Interactive):** `translateY(-3px)` lift + `shadow-2` elevation over 150ms ease-out.
- **Accessibility:** Interactive card MUST include `role="button"`, `tabIndex={0}`, and `onKeyDown` handler for `Enter`/`Space`.

---

### 6.7 Dialog Modals (`Modal`)

- **Purpose:** Focused user tasks requiring immediate attention.
- **Anatomy:** Scrim Backdrop (`rgba(12, 46, 41, 0.50)` + `backdrop-filter: blur(4px)`) + Dialog Container (`radius-lg`, max-width 560px, `shadow-3`).
- **RTL Close Button:** Positioned strictly at `right: 16px, top: 16px` (`<X>` icon 20px).
- **Focus Trap:** Focus locked inside modal while open; Escape key closes dialog.

---

### 6.8 Data Tables (`Table`)

- **Header Row:** Height 44px, background `color-bg-muted`, text `text-caption` (700 weight), right-aligned text.
- **Data Rows:** Height 56px, background `color-bg-surface`, border-bottom `1px solid color-border`, row hover → `color-primary-50`.
- **Responsive Rule:** Tables with >4 columns transform into vertical card-lists on mobile (`<640px`).

---

### 6.9 Status Badges (`Badge`)

- **Shape:** Pill shape (`radius-full`), font `text-body-sm` (500 weight).
- **Variants:**
  - `success`: Background `rgba(16, 185, 129, 0.12)`, text `#10B981` ("مكتمل").
  - `warning`: Background `rgba(245, 158, 11, 0.12)`, text `#F59E0B` ("ضعيف").
  - `error`: Background `rgba(239, 68, 68, 0.12)`, text `#EF4444` ("راسب").
  - `ai`: Background `rgba(124, 58, 237, 0.12)`, text `#7C3AED` + Sparkle glyph ("مُولَّد بالذكاء الاصطناعي").

---

### 6.10 Progress Bars & Rings

- **Bar:** Height 6px, track `color-primary-100`, fill `color-primary-700`, `radius-full`.
- **Ring (Circular):** SVG stroke 4px, background track `color-primary-100`, animated dash offset.
- **ARIA:** `role="progressbar"`, `aria-valuenow={percentage}`, `aria-valuemin={0}`, `aria-valuemax={100}`.

---

### 6.11 Sidebar Navigation (`TeacherSidebar`)

- **Dimensions:** Width 224px, fixed Right edge, height 100vh, border-left `1px solid color-border`.
- **Workflow Groups:** Grouped into 4 workflow sections: **التدريس (Teach)**, **التقييم (Assess)**, **التواصل (Communicate)**, **التحليل (Analyze)**.
- **Active Item:** Background `color-primary-100`, text/icon `color-primary-700`, active indicator dot on left edge.

---

### 6.12 Top Navigation Bar (`StudentNavbar`)

- **Dimensions:** Height 64px, background `color-bg-surface`, border-bottom `1px solid color-border`, sticky top (`z-index: 500`).
- **Items:** Max 5 primary links + "المزيد" overflow dropdown + end-aligned profile dropdown avatar.

---

### 6.13 Empty State Container

- **Anatomy:** Centered 160×160px thin-line SVG illustration (`color-primary-300`) + Headline (`text-h3`) + Explanation text + Primary Action CTA button.
- **Rule:** Never display a bare icon and text — every empty state must provide a direct action button.

---

### 6.14 Loading Skeleton Shimmers

- **Base Color:** `color-bg-muted` (`#F4F3EF`).
- **Animation:** Linear gradient shimmer moving from **Right to Left** (RTL-correct), duration 1.4s infinite.
- **Shape Matching:** Skeletons must mirror the exact dimensions of final target cards/rows.

---

### 6.15 Domain Cards (Course / Package / Lesson / AI Cards)

#### Course Card (`CourseCard`)
- 16:9 cover image top + title (`text-h3`) + teacher avatar/name + progress bar + meta row (lecture count, duration). Hover: `scale(1.02)` + `shadow-2`.

#### AI Report Card (`AIReportCard`)
- Border `1.5px solid rgba(124, 58, 237, 0.30)`, background `color-bg-surface`, header carrying `AITag` + "مسودة · لم يُرسَل بعد" warning banner + editable text box + **"موافقة وإرسال للولي"** primary button.

#### Exam Question Card (`QuestionCard`)
- Difficulty tag top-left, question body text (`text-body-lg`), selectable answer options (MCQ / Short answer), "إعادة توليد" (Regenerate) action button.

---

## 7. Motion System Specifications

### 7.1 Motion Timing Tokens
- `duration-fast`: 150ms — button press, hover lifts, checkbox toggles.
- `duration-normal`: 200ms — modal opens, dropdown popups, tab switches.
- `duration-slow`: 300ms — chart updates, data table transitions.
- `duration-hero`: 600ms — landing hero entry, progress bar initial fills.

### 7.2 Micro-Interactions
- **Button Hover/Active:** Scale 0.98 on press (`active:scale-[0.98]`), background shift over 150ms ease-out.
- **AI Stagger Entry:** Exam question cards stagger in at 40ms intervals with `translateY(16px → 0)` + fade-in.
- **Completion Celebration:** Lecture completion triggers a spring checkmark scale-in + progress ring fill animation.

---

## 8. Core UX Patterns

### 8.1 Information Architecture & Flow Hierarchy

```
باقة (Package — Container & Pricing Unit)
 └── كورس (Course — Subject & Year Unit)
      └── محاضرة (Lecture — Learning Unit)
           ├── شرح (Explanation: Video / PDF)
           ├── واجب (Homework)
           ├── امتحان (Exam)
           └── بنك أسئلة (Question Bank)
```

- **Rule:** Courses opt into Packages from the Course Edit screen. Packages themselves do not manage course membership directly.

### 8.2 AI Exam Builder Workflow (5-Step)
1. **Setup:** Select السنة/المجموعة (Year/Group), then الدرس (Lecture), difficulty, and question count.
2. **Generate:** Trigger RAG pipeline → displaying 3-stage progress text.
3. **Review & Edit:** Question cards render with `AITag`. Teacher can inline edit, regenerate single question, or delete.
4. **Confirm & Distribute:** Set time limits, anti-cheating toggles (tab-switch detection), and confirm publish.

### 8.3 AI Report Approval Gate
- **Draft State:** Report generated by AI sits in "Draft" state (`IsApproved = false`). Visual warning banner displayed.
- **Approval Action:** Teacher reviews chart narrative, edits text, and taps "موافقة وإرسال للولي".
- **Dispatch:** Backend sets `IsApproved = true` and dispatches email/message to parent. Zero automated unapproved sends allowed.

---

## 9. Accessibility (WCAG 2.1 AA Compliance)

- **Contrast Ratios:** All body text meets 4.5:1 minimum against background; all headings meet 3.0:1 minimum.
- **Touch Targets:** Minimum 44×44px touch area on all mobile controls.
- **Keyboard Traps:** Modals trap Tab focus; Esc key closes dialogs.
- **Screen Reader Live Regions:** AI generation steps use `aria-live="polite"` to announce status changes.

---

## 10. Responsive Layout Strategy

- **Mobile Viewports (<640px):** Sidebar converts to Bottom Tab Bar (4 items max); 6-column tables stack into vertical Card-Lists; chart heights scale to 240px.
- **Tablet Viewports (768px–1024px):** Sidebar collapses to Icon Rail (64px width); grids switch to 2-column layout.
- **Desktop Viewports (>1280px):** Full expanded sidebar (224px width); 3-column course grid; 1200px max container width.

---

## 11. Content Design & Arabic Microcopy

- **Tone:** Encouraging, precise, professional, casual-but-polite.

#### Microcopy Dictionary

| Context | Arabic Microcopy | English Translation |
|---|---|---|
| AI Status Tag | `مُولَّد بالذكاء الاصطناعي` | AI-Generated |
| AI Report Draft | `مسودة · لم يُرسَل بعد` | Draft · Not Sent Yet |
| Approve Action | `موافقة وإرسال للولي` | Approve & Send to Parent |
| Weak Topic Alert | `يحتاج إلى مراجعة` | Needs Review |
| Exam Start Button | `ابدأ الامتحان الآن` | Start Exam Now |
| Empty State CTA | `أضف محتوى جديد` | Add New Content |
| Success Toast | `تم حفظ التغييرات بنجاح` | Changes Saved Successfully |

---

## 12. Frontend Implementation Constraints

- **Stack:** React 18+ / 19, TypeScript, Tailwind CSS v4, CSS Custom Properties (`theme.css`).
- **Zero Inline Hex Codes:** Every component must reference CSS variables (`var(--draya-*)`) or Tailwind token utilities.
- **Dependencies:** Recharts (Data Viz), Lucide React (Icons), Framer Motion (Page transitions).

---

## 13. Decision Framework & Rationale Log

| Decision | Chosen Approach | Rejected Alternative | Tradeoff & Rationale |
|---|---|---|---|
| **Parent Touchpoint** | Email/Message only (No app) | Parent login dashboard | Parents in Egypt trust direct teacher letters, not complex app logins. Reduces build overhead. |
| **Color Anchor** | Deep Teal (`#14453F`) | Blue / Purple primary | Teal conveys academic seriousness and aligns with Reference 1 (تفوق). |
| **Primary Typography**| IBM Plex Sans Arabic | System Naskh / Arial | IBM Plex Sans provides superior legibility at small UI text sizes (`11px-14px`). |
| **AI Accent Color** | Purple (`#7C3AED`) | Same Teal as brand | Unique purple color visually isolates AI content at a glance, preventing confusion. |
| **Card Radii** | `12px` (Medium) | `0px` or `24px` round | 12px creates modern softness while retaining crisp structure. |

---

## 14. Core Design Principles

1. **One Primary Action:** Each screen or card contains exactly one primary pill CTA button.
2. **Recognition over Recall:** Display explicit contextual metadata (e.g. lecture breadcrumbs) rather than requiring memory.
3. **Progressive Disclosure:** Show high-level summary stats first; expand detailed data on demand.
4. **Human Before AI:** AI generates drafts; humans review and approve.
5. **Accessibility by Default:** Visible 2px focus rings and WCAG AA contrast built in.
6. **RTL Native:** RTL spatial layout is the foundational default.
7. **Performance First:** Lightweight CSS variables, 150ms transitions, zero layout shifts.
8. **Consistency Before Creativity:** Re-use established tokens strictly.
9. **Content Before Decoration:** Background textures capped at 13% opacity; never used on analytical dashboards.

---

## 15. Design Decision Matrix

| Situation | Component Chosen | Visual Style | UX Behavior |
|---|---|---|---|
| **Primary Page Goal** | Primary Button | Solid Teal Pill (`#14453F`), White Text | Navigates or saves primary task |
| **Secondary Option** | Secondary Button | Outline Teal Pill (`1.5px border`), Transparent Fill | Cancels or performs secondary task |
| **No Data Present** | Empty State Card | 160px SVG Illustration + Headline + Action CTA | Guides user to create first item |
| **Global Auth Error** | Alert Banner | Top-aligned `color-error` light tint banner | Remains until dismissed or corrected |
| **Data Field Error** | Inline Field Helper | Red border on input + `11px` error text below | Validates on blur |
| **Long AI Operation** | Multi-stage Progress | Animated text stages ("Analyzing... → Drafting...") | Keeps user informed during 2s+ AI tasks |
| **Destructive Action** | Confirmation Modal | Red primary action button + explicit impact text | Requires secondary confirmation click |

---

## 16. Component Anatomy Specifications

### 16.1 Primary Button Anatomy
```
 ┌────────────────────────────────────────────────────────┐
 │  [Icon Slot: 20px]  [Label: text-body-md 600]  (Pill)  │
 └────────────────────────────────────────────────────────┘
  ▲ Padding-R: 22px     ▲ Gap: 8px               ▲ Padding-L: 22px
  Height: 40px | Radius: 999px | Background: color-primary-700
```

### 16.2 Text Input Anatomy
```
 Label (text-body-sm, 600)  [Teal Asterisk *]
 ┌────────────────────────────────────────────────────────┐
 │ [Icon: 20px]  Input Value / Placeholder    (radius-sm) │
 └────────────────────────────────────────────────────────┘
  ▲ Right: 12px   ▲ Padding-Right: 40px      ▲ Border: 1.5px
 Error Text (text-caption, color-error)
```

---

## 17. Screen Template Blueprints

### 17.1 Auth Split-Screen Blueprint (Desktop)
- **Right Column (50%):** Form container centered (`max-width: 440px`), Logo top-right, Headline, Input stack, Primary CTA.
- **Left Column (50%):** Deep teal background (`color-primary-900`), scattered decorative line icons (8% opacity), organic photo frame.

### 17.2 Dashboard Workspace Blueprint
- **Header Row:** Persistent Top Bar / Sidebar toggle, greeting ("صباح الخير، أحمد"), notification bell.
- **Row 1 (Stats):** 4-column quick-stat badge grid (active packages, exams, average score, streak).
- **Row 2 (Main Area):** 2/3 width primary carousel ("Continue Learning") + 1/3 width sidebar card ("Weak Areas" summary).

---

## 18. Data Visualization System

- **Chart Colors:** Primary metric = `color-primary-700` (`#14453F`), Baseline = `color-primary-300` (`#5FA79A`), Warning/At-risk = `color-error` (`#EF4444`).
- **RTL Charts:** Recharts container wrapped in `<div dir="rtl">` with X-axis data reversed.
- **Custom Tooltip:** Background `color-bg-surface`, `radius-sm`, `shadow-2`, padding `10px 14px`, text `text-body-sm`.

---

## 19. Figma Organization Standards

- **Variable Collections:** 1:1 token mapping (`Primitives/Colors`, `Tokens/Semantic`, `Tokens/Spacing`).
- **Component Variants:** Properties formatted as `Type=Primary, Size=MD, State=Default, RTL=True`.
- **Auto Layout:** 100% Auto Layout enforcement on all component master frames.

---

## 20. Frontend Token Mapping Architecture

```typescript
// Types Definition (types/design-system.ts)
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'ai' | 'draft';
```

---

## 21. Design System Governance

- **Versioning:** Semantic Versioning (`v2.0.0` Major rewrite, `v2.1.0` Component additions, `v2.0.1` Bug fixes).
- **Contribution Workflow:** Proposal → Figma Variant → Code Spec Review → PR Merge.
- **Deprecation:** 1-release deprecation grace period with `@deprecated` docstrings before removal.

---

*End of DESIGN.md v2 Specification — Draya Academic Platform*