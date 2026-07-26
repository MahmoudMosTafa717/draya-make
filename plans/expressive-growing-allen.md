# Draya Landing Page — Editorial Light Redesign

## Context

The current landing page uses a dark teal (`#0F4F49`) full-bleed hero background with glassmorphism floating cards and green-on-everything coloring. The user's reference image shows a premium editorial style: warm off-white background throughout, a 4-photo collage with individually colored frame chips, light stat cards with dark text, and a deliberate 4-color accent rotation (teal, purple, orange, coral) across icon chips, badges, and decorative elements.

**Scope:** `LandingPage` function only (~lines 622–1435 in `/workspaces/default/code/src/app/App.tsx`). All other screens (auth, teacher dashboard, student dashboard) remain untouched.

---

## 1. Four-Color Accent Palette

These four colors rotate across all decorative/icon/accent uses site-wide. Add as local constants at the top of `LandingPage`:

```ts
const ACCENT = {
  teal:   "#1B6D63",  // primary brand — buttons, logo, headings, one photo frame
  purple: "#7C3AED",  // AI / creative
  orange: "#F97316",  // warm / achievement
  coral:  "#F43F5E",  // energy / urgency
};
// Background tints (12% opacity versions for icon chip bg)
const ACCENT_BG = {
  teal:   "rgba(27,109,99,0.10)",
  purple: "rgba(124,58,237,0.10)",
  orange: "rgba(249,115,22,0.10)",
  coral:  "rgba(244,63,94,0.10)",
};
```

Used for: hero photo frames, benefit icon chips, feature step icons, stat chips, decorative dots — cycling purple → teal → orange → coral.

---

## 2. Global Background & Base Changes

### `theme.css` (no changes needed — `--draya-bg-base` already maps to `#FFFFFF` from the v3 refactor)

### Landing page root `<div>` 
Change the root div background to a warm off-white that reads as slightly warmer than pure white:
```jsx
background: "#FAFAF8"
```

### Navigation (lines 710–759)
The nav currently starts transparent-on-dark (white text, logo glows white). Since the hero is now light, the initial state must be dark-text-on-light:

| Property | Was (dark hero) | Now (light hero) |
|---|---|---|
| Logo icon bg (initial) | `rgba(255,255,255,0.14)` | `t.primary` (solid teal) |
| Logo text color (initial) | `#fff` | `t.textPrimary` |
| Nav link color (initial) | `rgba(255,255,255,0.8)` | `t.textSecondary` |
| Nav link hover color (initial) | `#fff` | `t.primary` |
| Login btn border (initial) | `rgba(255,255,255,0.4)` | `t.primary` |
| Login btn text (initial) | `#fff` | `t.primary` |
| Signup btn (initial) | white bg, primary text | `t.primary` bg, white text |

The _scrolled_ state already uses light bg (`rgba(255,255,255,0.96)`) with dark text — keep as-is, it will now match.

---

## 3. Hero Section — Full Rebuild

**Remove:** dark teal background (`#0F4F49`), `BlobBg variant="dark"`, `DecorativeScatter`, glass stat overlays on photos.

**Add:** light background `#FAFAF8`, colored photo frames, light stat cards, inline stat row below CTAs.

### 3a. Hero section element
```jsx
<section id="hero" style={{ background: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 96px", position: "relative", overflow: "hidden" }}>
  {/* Decorative background blobs — very faint, light teal tint */}
  <BlobBg variant="light" />  {/* uses #DCEEEA at 0.13 opacity — barely visible on warm white */}
```

### 3b. Hero text column

All text colors must change from `white / rgba(255,255,255,...)` to dark:

| Element | Was | Now |
|---|---|---|
| H1 "درايَة" | `#fff` | `t.textPrimary` (#151B19) |
| P tagline | `rgba(255,255,255,0.6)` | `t.textSecondary` |
| P description | `rgba(255,255,255,0.48)` | `t.textSecondary` |
| Primary CTA btn | white bg, teal text | `t.primary` bg, white text |
| Secondary CTA btn | white border/text + glass | dark border + dark text (outline style) |
| AI pill badge | `rgba(124,58,237,0.15)` bg, `#B99EF0` text | keep as-is (purple works on both) |

The "Academy trust badge" currently uses `rgba(255,255,255,0.08)` glass — replace with white surface `#fff`, `border: 1px solid t.border`, `boxShadow: t.shadow1`.

**Inline stat row** (replaces the current social-proof strip AND the photo-area overlaid stat cards):
- Move the 4 stats (92%, 12,000+, 500+, 1,226+) to a `display: flex, gap: 28px` row below the CTA buttons.
- Each stat: a small colored icon chip (16×16px, from the 4-color rotation) + value in `t.textPrimary` weight 800 + label in `t.textSecondary` size 0.75rem.
- Stat colors cycle: teal (92%), purple (12,000+), orange (500+), coral (1,226+).

### 3c. Hero photo collage — colored frames

Keep the 4 photo positions and shapes. Add a solid colored background "frame chip" behind each photo:

| Photo | Shape | Frame color | Offset |
|---|---|---|---|
| `P.hero1Primary` (main tall) | asymmetric pill | Teal `#DDF5F1` (light teal) | frame slightly larger, shifted left+down |
| `P.hero2Circle` | circle | Purple `#EDE9FE` | frame same size, offset top-right |
| `P.hero3Square` | rounded rect | Orange `rgba(249,115,22,0.12)` bg | frame behind the rect |
| `P.hero4Blob` | organic blob | Coral `rgba(244,63,94,0.10)` bg | frame behind blob |

Implementation: wrap each photo in a container that has the frame color as `background`, with the photo sitting on top via `position: relative`. Frame is ~12–16px larger all around (negative margin or position absolute behind photo).

**Remove:** all 4 dark glass stat overlays (lines 910–961 approx). Move stats to inline row per 3b above.

**Keep:** the two floating info cards — but convert to light style:
- **Card 1** ("امتحان رياضيات جاهز" / AI exam): 
  - Background: white, `border: 1px solid t.border`, `borderRadius: 14px`, `boxShadow: t.shadow2`
  - Icon chip: purple `rgba(124,58,237,0.1)` bg with Sparkles icon in `#7C3AED`
  - Title: `t.textPrimary` weight 700
  - Status: green dot + `t.textSecondary` text
- **Card 2** ("تقرير الولي معتمَد"):
  - Background: white, `border: 1px solid t.border`, `borderRadius: 14px`, `boxShadow: t.shadow2`
  - Icon chip: teal `rgba(27,109,99,0.1)` bg with CheckCircle in `t.primary`
  - Text: `t.textPrimary` weight 700

The 92% stat white pill card can become **Card 3**: keep as a white card showing completion rate.

Reposition all 3 cards to sit around the photo collage without covering faces. Suggested positions:
- Card 1 (AI exam): top-left of photo area, z:6
- Card 2 (92% rate): right edge of photo area, mid-height, z:6
- Card 3 (parent report): bottom-left of photo area, z:6

---

## 4. Trust Strip (lines 968–988)
No structural change needed — already light (`t.bgSurface`). Style cleanup only:
- "يثق بنا" label: keep `t.textDisabled` weight 600 uppercase.
- Academy names: `t.textDisabled` opacity 0.55.

---

## 5. Benefits Section (lines 991–1021)

**Background:** Change `t.primary50` → `#FAFAF8` (warm white, same as hero) or `t.bgSecondary` (`#F8FBFA`).

**Icon color rotation** across 8 cards — each adjacent card gets a different accent from the 4-color palette:
| Card | Icon | Color |
|---|---|---|
| Brain (AI) | Sparkles-style | Purple `#7C3AED` |
| BookOpen (Content) | | Orange `#F97316` |
| ShieldCheck (Human) | | Teal `#1B6D63` |
| BarChart (Analytics) | | Coral `#F43F5E` |
| Globe (Anywhere) | | Purple `#7C3AED` |
| Star (Easy) | | Orange `#F97316` |
| MessageSquare (Comms) | | Coral `#F43F5E` |
| GraduationCap (Results) | | Teal `#1B6D63` |

Update `iconBg` and `iconColor` values in the `benefits` array accordingly. Use `rgba()` version at 0.10 opacity for iconBg.

---

## 6. Features Section (lines 1024–1084)

**Background:** Already `t.bgSurface` (white) — keep.

Update photo overlay gradient: change `rgba(15,79,73,0.55)` (old dark teal) to a richer `rgba(15,79,73,0.65)` for photo readability. Keep same structure.

Update `border-top` color of feature badge from teal only — use the section's accent color.

Checklist items: `t.primary` checkmark — keep (this is one of the valid teal uses).

---

## 7. Stats Banner (lines 1087–1122)

**Currently:** dark teal full-bleed background (`t.primary900`). Per spec, this must become light.

**New treatment:** Light background `t.bgSecondary` (`#F8FBFA`), with a thin border top/bottom (`t.border`).

Update stat items:
- Grid container: remove `rgba(255,255,255,0.05)` bg → replace with white cards with `t.border` borders.
- Icon bg: cycle through 4-color tints (purple, teal, orange, coral) per stat.
- Value text: `t.textPrimary` (dark) instead of white.
- Label: `t.textSecondary` instead of `rgba(255,255,255,0.45)`.
- Section heading: `t.textPrimary` instead of `#fff`.

---

## 8. Testimonials Section (lines 1125–1162)

**Avatar:** Replace colored circle with initials → circular `<img>` tags (real Unsplash photos).

Use `mcp__plugin_make_unsplash__search_photos` during implementation to find appropriate profile photos for:
- أحمد السيد (middle-aged Arab male teacher) — query: "arabic teacher portrait professional man"
- سارة محمد (Egyptian female educator) — query: "professional woman educator egypt"
- محمود عبدالله (male academy director, 40s) — query: "professional man portrait director educator"

Add photos to `P` constants as `P.testimonial1`, `P.testimonial2`, `P.testimonial3`.

Avatar img style:
```jsx
<img src={P.testimonial1} style={{
  width: 44, height: 44, borderRadius: "50%",
  objectFit: "cover", objectPosition: "center top",
  border: "2px solid t.primary100",
  flexShrink: 0,
}} />
```

**Card border-top:** Rotate 4-color palette — purple, teal, orange for the 3 testimonials.

---

## 9. Pricing Section (lines 1165–1268)

**Background:** Change `t.primary50` → `#FAFAF8`.

**Featured plan card** (remove heavy gradient header bar, add glow):
- Remove: `linear-gradient(90deg, t.primary900, t.primary)` banner at top.
- Add: `background: linear-gradient(160deg, #FAFEF9 0%, #F0FAF7 100%)` on the card itself (very subtle teal tint).
- Shadow: `0 0 0 1.5px rgba(27,109,99,0.3), 0 8px 40px rgba(27,109,99,0.18)` — creates a soft glow behind the card.
- "الأكثر طلباً" pill badge: small pill inside the card at top, `background: t.primary100`, `color: t.primary`, `border: 1px solid rgba(27,109,99,0.2)`.
- Keep `translateY(-12px)` lift.
- Keep teal border on featured card.

**Non-featured cards:** Keep white bg, `1px solid t.border`, `t.shadow1`, soft hover.

---

## 10. FAQ Section (lines 1270–1310)

**Background:** Already `t.bgSurface` (white) — keep.

Update toggle icon bg: rotate accent instead of always `t.primary` — purple for open state.
- Open chevron bg: `ACCENT.purple` (`#7C3AED`)
- Closed chevron bg: `t.primary50`

---

## 11. Pre-Footer CTA Banner (lines 1312–1361)

**Currently:** solid `t.primary` (teal) full background.

**New:** Two-color diagonal gradient from the 4-color palette:
```css
background: linear-gradient(135deg, #1B6D63 0%, #7C3AED 100%)
```
(teal → purple gradient) — this reads as premium and distinct from the repeating-green pattern.

CTA buttons:
- Primary: white bg, `t.primary` text (keep)
- Secondary: `rgba(255,255,255,0.12)` bg, white text (keep)

---

## 12. Footer (lines 1341–1432)

Footer can keep `#0F4F49` dark teal background (per spec: "optionally the footer"). 

Adjust footer link hover: change from `rgba(255,255,255,0.9)` to the coral accent `#F43F5E` — gives colorful pop on hover.

Social icon hover: different accent per icon (purple, teal, orange, coral in order).

Copyright bar CTA buttons:
- Login: keep `rgba(255,255,255,0.12)` + outline
- Start free: change from `rgba(255,255,255,0.1)` to solid orange `#F97316` background — breaks the all-green pattern.

---

## 13. Critical Files

- **Primary:** `/workspaces/default/code/src/app/App.tsx` — all changes in `LandingPage` function (~lines 622–1435), `BlobBg` component (light variant values), and `P` constants (add testimonial photos).
- **No changes needed to:** `theme.css`, `fonts.css`, or any non-landing screen.

---

## 14. Implementation Order

1. Add `ACCENT` + `ACCENT_BG` constants inside `LandingPage`.
2. Add testimonial photo URLs to `P` constants (requires Unsplash search first).
3. Fix navigation initial state (dark-on-light).
4. Rebuild hero section: background → light, text → dark, photo frames → colored, stat cards → light, stats → inline row.
5. Update benefits array colors (4-color rotation).
6. Update stats banner (light bg, colored icon chips).
7. Update testimonials (real photos, rotated border-top colors).
8. Update pricing featured card (glow, soft gradient, pill badge).
9. Update pre-footer CTA (teal-to-purple gradient).
10. Update footer (hover accent colors, signup btn → orange).
11. Final: verify all sections have no remaining dark-green full-bleed backgrounds except footer.

---

## 15. Verification

- Scroll through the full landing page and confirm: **every section background is light** (white or `#FAFAF8`) except the footer.
- Confirm the hero photo area has 4 distinct colored background frames visible behind/around the photos.
- Confirm the floating stat cards are **light white cards with dark text**, not dark glass.
- Confirm the 4 inline stats appear **below the CTA buttons**, not scattered over the photos.
- Confirm icon chips across benefits/stats/steps rotate through purple, teal, orange, coral — no two adjacent items share a color.
- Confirm testimonials show circular **profile photos**, not letter avatars.
- Confirm featured pricing card has a **soft glow shadow** (no dark gradient header bar).
- Confirm pre-footer CTA has a **teal-to-purple gradient background**, not solid teal.
- Confirm the nav looks correct at top of page with dark text on the light hero.

In addition to the color rotation, replace the flat single-color icon set in the benefits grid, "كيف تعمل" steps, and testimonial star ratings and all other icons with a more illustrative/dimensional icon style (subtle shading, layered shapes, or duotone) — not just recoloring the same flat glyphs.