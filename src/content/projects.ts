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
  /** YouTube video id for an embedded gameplay video (omit for confidential titles) */
  youtubeId?: string;
  period: string;
  platforms: string[];
  engine: string;
  languages: string[];
  technologies: string[];
  teamSize?: string;
  links: ProjectLink[];
  gallery: string[];
  confidential?: boolean;
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "unannounced-arpg",
    image: "/images/projects/unannounced-arpg.png",
    period: "2024 —",
    platforms: ["Steam", "PlayStation 5", "Xbox Series X|S"],
    engine: "Unreal Engine 5",
    languages: ["C++"],
    technologies: ["Unreal Engine 5", "C++", "Hexa", "Perforce"],
    links: [],
    gallery: [],
    confidential: true
  },
  {
    slug: "hyke",
    image: "/images/projects/hyke.jpg",
    period: "2024",
    platforms: ["Steam", "PlayStation 5", "Nintendo Switch", "iOS", "Android"],
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
    period: "2022 — 2023",
    platforms: ["Steam", "Epic Games Store"],
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
    image: "/images/projects/every-hero.png",
    period: "2020 — 2022",
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
    year: "2025",
    engine: "Unreal Engine 5",
    tags: ["UE5", "C++", "Solo"],
    link: "https://www.youtube.com/watch?v=GqbONar8b5c",
    hasAward: true
  },
  {
    id: "shadow-bubble",
    image: "/images/projects/shadow-bubble.png",
    year: "2025",
    engine: "Unreal Engine 5",
    tags: ["UE5", "C++", "Multiplayer", "XR"],
    link: "https://www.youtube.com/watch?v=U_8e_a2troo",
    hasAward: true
  },
  {
    id: "teacup",
    image: "/images/projects/teacup.png",
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
  },
  {
    id: "root-me",
    image: "/images/projects/root-me.png",
    year: "2023",
    engine: "Unity",
    tags: ["Unity", "C#"],
    link: "https://www.youtube.com/watch?v=poRWXWZOwcE"
  },
  {
    id: "blite",
    image: "/images/projects/blite.png",
    year: "2022",
    engine: "Unity",
    tags: ["Unity", "C#"],
    link: "https://www.youtube.com/watch?v=YRxEiL2IRiU",
    hasAward: true
  },
  {
    id: "home-sleep-home",
    image: "/images/projects/home-sleep-home.jpg",
    year: "2019",
    engine: "Unity",
    tags: ["Unity", "C#"],
    link: "https://github.com/tavik000/HomeSleepHome"
  }
];

export type OtherCategory = "game" | "web" | "mobile" | "ai";

export interface OtherProject {
  id: string;
  category: OtherCategory;
  tags: string[];
  link?: string;
  year?: string;
}

export const otherProjects: OtherProject[] = [
  {
    id: "guards",
    category: "game",
    tags: ["Unreal Engine", "QA", "Japanese Localization"],
    link: "https://store.steampowered.com/app/2514460/GUARDS/",
    year: "2023"
  },
  {
    id: "doki-doki-house",
    category: "game",
    tags: ["Python", "Ren'Py", "Tooling"],
    link: "https://apps.apple.com/hk/app/心跳度假屋/id1604558574",
    year: "2023"
  },
  {
    id: "lost-strings",
    category: "game",
    tags: ["Unity", "C#"],
    link: "https://store.steampowered.com/app/1128750/The_Lost_Strings",
    year: "2019"
  },
  {
    id: "hero-race",
    category: "game",
    tags: ["Warcraft III", "JASS", "Level Design"],
    link: "https://github.com/tavik000/HeroRace",
    year: "2011 — 2022"
  },
  {
    id: "color-picking",
    category: "game",
    tags: ["Unity", "C#", "iOS"],
    link: "https://github.com/tavik000/ColorPicking",
    year: "2018"
  },
  {
    id: "maze-game-ai",
    category: "ai",
    tags: ["Unity", "C#", "Python", "ML"],
    link: "https://github.com/tavik000/MazeGameAI",
    year: "2018"
  },
  {
    id: "blog-remake",
    category: "web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/tavik000/ReactKeyBlogRemake"
  },
  {
    id: "angular-blog",
    category: "web",
    tags: ["Angular", "Firebase", "TypeScript"],
    link: "https://github.com/tavik000/AngularFireBlog"
  },
  {
    id: "dcd-app",
    category: "mobile",
    tags: ["Swift", "iOS", "Bronze Award"],
    link: "https://www.youtube.com/watch?v=uNtz0VSzEhI"
  },
  {
    id: "react-native-apps",
    category: "mobile",
    tags: ["React Native", "iOS", "Android"],
    link: "https://github.com/tavik000?tab=repositories&q=React_Native"
  },
  {
    id: "facebook-chatbot",
    category: "ai",
    tags: ["Python", "Seq2Seq", "NLP"],
    link: "https://github.com/tavik000/python-key-chatbot"
  }
];
