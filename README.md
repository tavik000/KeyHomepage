# Key Zhao — Portfolio

Professional portfolio for a Gameplay Programmer (Unreal Engine 5 / C++), targeting
AAA game studios. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4,
Framer Motion, and next-intl.

Live: https://master.d2qyb13wnib5il.amplifyapp.com/

## Stack

- **Next.js 15** App Router, fully statically generated
- **next-intl** — English (default), 日本語 (`/ja`), 繁體中文 (`/zh-Hant`)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css` (`@theme`)
- **Framer Motion** — subtle reveal/hover animations, `prefers-reduced-motion` aware
- **MDX blog** — `next-mdx-remote` + `gray-matter`

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build (SSG)
npm start       # serve production build
```

## Editing content

| What | Where |
|---|---|
| All translated copy (every locale) | `src/messages/{en,ja,zh-Hant}.json` |
| Featured projects (platforms, links, media) | `src/content/projects.ts` |
| Game jam / other projects | `src/content/projects.ts` |
| Experience & education dates/companies | `src/content/experience.ts` |
| Skills | `src/content/skills.ts` |
| Awards & certifications | `src/content/awards.ts` |
| Email / GitHub / LinkedIn / resume paths | `src/content/site.ts` |
| Blog articles | `src/content/blog/<slug>.<locale>.mdx` |
| Images | `public/images/projects/` |
| Resume PDFs | `public/assets/` |

### Adding a blog post

Create `src/content/blog/my-post.en.mdx` with frontmatter:

```yaml
---
title: "Post title"
description: "One-line summary"
date: "2026-07-20"
tags: ["UE5", "C++"]
---
```

Add `my-post.ja.mdx` / `my-post.zh-Hant.mdx` for translations; locales without a
translation fall back to the English version automatically.

### Game jam hover videos

Drop a short muted clip in `public/videos/` and set `previewVideo` on the project
in `src/content/projects.ts` — the card will crossfade to the looping video on hover.

## Legacy site

The previous static HTML site is preserved on the `master` branch, the
`backup/pre-redesign-2026-07-20` branch, and in
`KeyHomepage-backup-2026-07-20.zip` (sibling directory).

## License

MIT License — Copyright (c) 2018–2026 Key Zhao
