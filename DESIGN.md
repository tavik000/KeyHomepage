# Portfolio Redesign — Design Document

Professional software engineering portfolio for **Key Zhao**, Gameplay Programmer (UE5 / C++),
targeting AAA studio recruiters, engineering managers, technical directors, and gameplay programmers.

---

## 1. Reference analysis

### gendesign.co.jp (adopted principles)
- **Image-first cinematic presentation** — large, uncropped key art dominates; text supports, never competes.
- **Museum-grade restraint** — dark, near-monochrome canvas; content is the only color.
- **Generous whitespace** — sections breathe; nothing is dense; scroll rhythm feels editorial.
- **Typographic quietness** — small, wide-tracked labels; large but calm headings; no decoration.
- **Fixed minimal navigation** that never interrupts the content.

### joshcaratelli.com (adopted principles)
- **Recruiter-first information hierarchy** — name, title, shipped titles, and contact answerable in one screen.
- **Verifiable specificity** — concrete systems ("Game Thread optimization on Switch", "memory optimization on iOS"), platforms, team sizes, metrics (1M+ players, App Store #2).
- **Linear narrative** — professional projects → CV → awards → personal projects → blog → contact.
- **Scannable structure** — consistent formatting per project: title / platform / role / bullet contributions.
- **External verification links** — store pages, award pages, GitHub.

### Synthesis (what this site does)
Cinematic dark presentation from GEN DESIGN **applied to** Caratelli's recruiter-first structure:
big honest key art and quiet typography, but every section optimized so a recruiter can extract
"UE5 + C++ gameplay programmer, shipping AAA ARPG on PS5/Xbox/Steam, based in Tokyo, JLPT N1"
within 30 seconds. No game-UI cosplay, no cyberpunk, no particles.

---

## 2. Sitemap

```
/                      Home (single scroll narrative)
  #projects            Featured commercial projects (3)
  #experience          Professional experience timeline
  #skills              Technical skills (categorized)
  #awards              Awards & certifications
  #game-jams           Game jam gallery (compact grid, hover video)
  #other-projects      Other projects (web / mobile / AI, compact)
  #contact             Contact + resume downloads
/projects/[slug]       Project detail ("Read More") — unannounced-arpg, hyke, every-hero
/blog                  Blog index (MDX)
/blog/[slug]           Article
Locales: /{en|ja|zh-Hant}/...  (en = default, no prefix)
```

Navigation bar: Projects · Experience · Skills · Blog · Contact · [EN/日本語/繁中] · Resume (button).

## 3. Wireframes

### Desktop — Home
```
┌────────────────────────────────────────────────────────┐
│ KEY ZHAO          Projects Experience Skills Blog      │  fixed, blurred bg
│                            Contact  [EN ▾]  [Resume]   │
├────────────────────────────────────────────────────────┤
│                                                        │
│   GAMEPLAY PROGRAMMER — TOKYO            (mono label)  │
│   Building combat, characters,                         │
│   and worlds in Unreal Engine 5.        (serif, 64px)  │
│                                                        │
│   5+ years · UE5 / C++ · Steam PS5 Xbox Switch iOS     │
│   [View projects]   [Download resume]                  │
│   ── scroll ──                                         │
├────────────────────────────────────────────────────────┤
│  SELECTED WORK                                         │
│  ┌──────────────────────────────────────────────┐      │
│  │           (large key art, 21:9)              │      │
│  └──────────────────────────────────────────────┘      │
│  Unannounced AAA Action RPG          2024 — present    │
│  UE5 · C++ · PS5 / Xbox Series / Steam                 │
│  Gameplay events, cinematics, UI, character feel …     │
│  [Read more →]                                         │
│  (× 3, alternating emphasis)                           │
├────────────────────────────────────────────────────────┤
│  EXPERIENCE          │ 2024— Blast Edge Games          │
│  (left rail label)   │ ●──── Gameplay Programmer (UE5) │
│                      │ │     bullets…                  │
│                      │ ●──── Freelance …               │
├────────────────────────────────────────────────────────┤
│  SKILLS   Languages [C++] [C#] [TypeScript] …          │
│           Engines   [Unreal Engine 5] [Unity]          │
│           Graphics / Gameplay / Tools / Platforms …    │
├────────────────────────────────────────────────────────┤
│  AWARDS (year · award · game · event link)             │
│  CERTIFICATIONS (FE, SG, JLPT N1 …)                    │
├────────────────────────────────────────────────────────┤
│  GAME JAMS   ┌────┐ ┌────┐ ┌────┐ ┌────┐  (grid 3-4    │
│              │thumb│ │    │ │    │ │    │  cols, hover │
│              └────┘ └────┘ └────┘ └────┘  = mute video)│
├────────────────────────────────────────────────────────┤
│  OTHER PROJECTS (compact list: web / mobile / AI)      │
├────────────────────────────────────────────────────────┤
│  CONTACT   email · GitHub · (LinkedIn) · Resume EN/JA  │
│  footer: © · language switch · back to top             │
└────────────────────────────────────────────────────────┘
```

### Mobile
Single column; nav collapses to overlay menu (large tap targets); hero text ~36px;
featured projects stack image-above-text; timeline becomes left-border list;
game jam grid 1–2 columns (tap toggles video); tables never overflow.

### Project detail
Hero art full-bleed → title/meta strip (role, engine, platforms, period, team) →
Overview → My contributions (bullets) → Technical challenges & solutions (paired) →
Gallery → video embed → prev/next project.

## 4. Visual system

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0B0B0D` | page background |
| `--color-surface` | `#131316` | cards, panels |
| `--color-border` | `#26262B` | hairlines |
| `--color-text` | `#EAEAE6` | primary text (warm off-white) |
| `--color-muted` | `#8E8E93` | secondary text |
| `--color-accent` | `#C0392B`-family `#CE4A3B` | 朱 (vermilion) — links, hover, active; used sparingly |

- **Display serif:** Zen Old Mincho (JP-capable, cinematic) — hero + section headings.
- **Body sans:** Inter + Noto Sans JP fallback — paragraphs, UI.
- **Mono:** IBM Plex Mono — meta labels (platforms, engine, dates, tags), wide tracking, uppercase.
- Type scale: 12 (mono labels) / 15–16 body / 20 lead / 28–32 h3 / 40–56 section / 56–72 hero. Line-height 1.7 body (CJK-friendly), 1.15 display.
- Spacing: section `py-28/40`, container `max-w-6xl px-6`, grid gap 6–10. 8px base unit.
- Components: `Section`, `SectionHeading` (mono kicker + serif title), `Tag`, `Reveal` (scroll fade), `FeaturedProject`, `JamCard` (hover video), `TimelineItem`, `SkillCategory`, `AwardRow`, `LangSwitcher`.
- Motion: fade+8px rise on scroll (0.6s, `[0.22,1,0.36,1]`, once), stagger 80ms, hero image slow parallax (≤40px), card hover 1.02 + video crossfade. All gated by `prefers-reduced-motion`.
- Accessibility: WCAG AA contrast (text ≥ 4.5:1 on `#0B0B0D`), visible focus rings, semantic landmarks, skip link, alt text, `lang` per locale, keyboard-reachable hover content.

## 5. Architecture

```
src/
  app/[locale]/            layout, page (home), projects/[slug], blog, blog/[slug]
  app/ sitemap.ts robots.ts
  components/ layout/ home/ projects/ ui/
  content/ projects.ts experience.ts skills.ts awards.ts   (typed, non-translatable data)
  content/blog/*.mdx       (frontmatter: title, date, tags, locale)
  messages/ en.json ja.json zh-Hant.json                   (all translatable strings)
  i18n/ routing.ts request.ts  + middleware (next-intl, cookie persistence)
  lib/ blog.ts utils.ts
public/ images/ assets/ (resumes)
```

- **Stack:** Next.js 15 App Router · React 19 · TypeScript strict · Tailwind CSS v4 · Framer Motion 12 · next-intl 4 · MDX via next-mdx-remote + gray-matter.
- **i18n:** `en` default (unprefixed), `ja`, `zh-Hant`; `generateStaticParams` + `setRequestLocale` for full SSG; switcher persists via `NEXT_LOCALE` cookie. No hardcoded copy — structural data in `content/`, human text in `messages/` keyed by id.
- **SEO:** per-locale metadata + `alternates.languages`, Open Graph images from key art, JSON-LD (`Person`, `CreativeWork`/article), sitemap + robots.
- **Media:** `next/image` everywhere (lazy, sized); jam hover videos are optional `previewVideo` fields — muted looping `<video>` loaded on hover/visible, thumbnail fallback until clips exist.
- **Deploy:** standard `next build` (SSG), compatible with current AWS Amplify hosting.

### Content mapping (from CV Jul 2026 + old site)
- Featured: **Unannounced AAA Action RPG** (Blast Edge, UE5/C++, PS5/XSX/Steam) · **HYKE: Northern Light(s)** (UE5/C++, 5 platforms, perf/memory optimization) · **Every Hero** (Unity/C#, 1M+ players, App Store Action #2).
- Jams: Hook Racer (ぷちコン賞), Shadow Bubble (GGJ HK 2025 ×2 awards), Nesmy Land: Teacup, The Path of Osu, √Me, Blite (GGJ HK 2022 award), Home Sleep Home.
- Other: Apeiron, GUARDS!, Doki Doki House, The Lost Strings, Hero Race + web/mobile/AI list.
- Books/hobby sections from the old site are intentionally dropped (kept in git history).
