// Structural (non-translatable) project data.
// All human-readable copy lives in src/messages/<locale>.json under "projects.<slug>".

export type LinkType = "steam" | "appstore" | "youtube" | "github" | "epic" | "web";

export interface ProjectLink {
  type: LinkType;
  href: string;
}

export interface FeaturedProject {
  slug: string;
  image: string;
  /** Square app icon shown as a badge on the hero banner for mobile releases. */
  appIcon?: string;
  /** YouTube video id for an embedded gameplay video (omit for confidential titles) */
  youtubeId?: string;
  /** Muted looping gameplay clip that plays on hover/focus over the hero image. */
  previewVideo?: string;
  company: string;
  platforms: string[];
  engine: string;
  languages: string[];
  technologies: string[];
  teamSize?: string;
  links: ProjectLink[];
  gallery: string[];
  confidential?: boolean;
  /** Temporarily excluded from the homepage listing (route still renders if linked directly). */
  hidden?: boolean;
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "unannounced-arpg",
    image: "/images/projects/unannounced-arpg.png",
    company: "Blast Edge Games",
    platforms: ["Steam", "PlayStation 5", "Xbox Series X|S"],
    engine: "Unreal Engine 5",
    languages: ["C++"],
    technologies: ["Unreal Engine 5", "C++", "Hexa", "Perforce"],
    links: [],
    gallery: [],
    confidential: true,
    hidden: true
  },
  {
    slug: "hyke",
    image: "/images/projects/hyke.jpg",
    company: "Blast Edge Games",
    platforms: ["Steam", "PlayStation 5", "Nintendo Switch", "iOS", "Mac"],
    engine: "Unreal Engine 5",
    languages: ["C++"],
    technologies: ["Unreal Engine 5", "C++", "Perforce"],
    teamSize: "50",
    links: [
      {
        type: "steam",
        href: "https://store.steampowered.com/app/2680380/HYKENorthern_Lights/"
      }
    ],
    gallery: []
  },
  {
    slug: "apeiron",
    image: "/images/projects/apeiron.jpg",
    previewVideo: "/videos/apeiron-preview.mp4",
    company: "Realm of Alters (Ember Entertainment)",
    platforms: ["Steam", "Epic Games Store", "iOS", "Android"],
    engine: "Unity",
    languages: ["C#"],
    technologies: ["Unity", "C#", "Socket.IO", "Git"],
    teamSize: "5",
    links: [
      {
        type: "epic",
        href: "https://store.epicgames.com/p/apeiron-b83793"
      }
    ],
    gallery: []
  },
  {
    slug: "every-hero",
    image: "/images/projects/every-hero.jpg",
    appIcon: "/images/projects/every-hero-icon.png",
    previewVideo: "/videos/every-hero-preview.mp4",
    company: "Feeling Game Company",
    platforms: ["iOS", "Android"],
    engine: "Unity",
    languages: ["C#"],
    technologies: ["Unity", "C#", "Git"],
    teamSize: "5",
    links: [
      {
        type: "appstore",
        href: "https://apps.apple.com/us/app/every-hero-ultimate-action/id1525597044"
      }
    ],
    gallery: []
  }
];

export interface JamProject {
  id: string;
  image: string;
  /**
   * Optional muted looping preview clip (mp4/webm under /public/videos).
   * When absent the card simply keeps its thumbnail on hover.
   */
  previewVideo?: string;
  /** Optional YouTube video id used for hover preview when no local clip exists. */
  previewYoutubeId?: string;
  /** Start/end seconds trimming the YouTube preview to a short 15-20s looping clip instead of full playback. */
  previewYoutubeStart?: number;
  previewYoutubeEnd?: number;
  year: string;
  engine: string;
  tags: string[];
  link?: string;
  hasAward?: boolean;
}

export const jamProjects: JamProject[] = [
  {
    id: "hook-racer",
    image: "/images/projects/hook-racer.jpg",
    previewVideo: "/videos/hook-racer-preview.mp4",
    year: "2025",
    engine: "Unreal Engine 5",
    tags: ["UE5", "C++", "Solo"],
    link: "https://www.youtube.com/watch?v=GqbONar8b5c",
    hasAward: true
  },
  {
    id: "shadow-bubble",
    image: "/images/projects/shadow-bubble.png",
    previewYoutubeId: "U_8e_a2troo",
    year: "2025",
    engine: "Unreal Engine 5",
    tags: ["UE5", "C++", "Multiplayer", "XR"],
    link: "https://www.youtube.com/watch?v=U_8e_a2troo",
    hasAward: true
  },
  {
    id: "blite",
    image: "/images/projects/blite.png",
    previewYoutubeId: "YRxEiL2IRiU",
    previewYoutubeStart: 0,
    previewYoutubeEnd: 18,
    year: "2022",
    engine: "Unity",
    tags: ["Unity", "C#"],
    link: "https://www.youtube.com/watch?v=YRxEiL2IRiU",
    hasAward: true
  },
  {
    id: "teacup",
    image: "/images/projects/teacup.png",
    previewVideo: "/videos/teacup-preview.mp4",
    year: "2024",
    engine: "Unreal Engine 5",
    tags: ["UE5", "C++", "Level Design"],
    link: "https://www.youtube.com/watch?v=ENJegabO2dw"
  },
  {
    id: "path-of-osu",
    image: "/images/projects/path-of-osu.png",
    year: "2024",
    engine: "Unreal Engine 5",
    tags: ["UE5", "C++", "Solo"],
    link: "https://www.youtube.com/watch?v=ikTBFtA-7Po"
  }
];

export interface IndependentProject {
  id: string;
  /** Optional key art; falls back to a stylized placeholder when omitted. */
  image?: string;
  /** Optional muted looping preview clip (mp4/webm under /public/videos), played on hover/focus. */
  previewVideo?: string;
  tags: string[];
  link?: string;
  year?: string;
}

/** Non-commercial game development: personal, freelance, and long-term side projects. */
export const independentProjects: IndependentProject[] = [
  {
    id: "guards",
    image: "/images/projects/guards.png",
    previewVideo: "/videos/guards-preview.mp4",
    tags: ["Unreal Engine", "QA", "Japanese Localization"],
    link: "https://store.steampowered.com/app/2514460/GUARDS/",
    year: "2023"
  },
  {
    id: "doki-doki-house",
    image: "/images/projects/doki-doki-house.jpg",
    previewVideo: "/videos/doki-doki-house-preview.mp4",
    tags: ["Python", "Ren'Py", "Tooling"],
    link: "https://store.steampowered.com/app/1895950/Doki_Doki_House/",
    year: "2023"
  },
  {
    id: "hero-race",
    image: "/images/projects/hero-race.png",
    tags: ["Warcraft III", "JASS", "Level Design"],
    link: "https://github.com/tavik000/HeroRace",
    year: "2011 — 2026"
  }
];
