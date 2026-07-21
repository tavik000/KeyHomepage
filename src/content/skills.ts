// Skill data. Category labels are translated via "skills.categories.<id>";
// the "{years}+" experience label via "skills.years". Technology names are
// universal and not translated.

export interface Skill {
  name: string;
  /** Years of experience — omitted for skills where a duration isn't meaningful */
  years?: number;
}

export interface SkillCategory {
  id: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    items: [
      { name: "C++", years: 3 },
      { name: "C#", years: 5 },
      { name: "TypeScript / JavaScript", years: 5 },
      { name: "Python", years: 2 },
      { name: "SQL", years: 2 },
      { name: "Java" }
    ]
  },
  {
    id: "engines",
    items: [
      { name: "Unreal Engine 5", years: 3 },
      { name: "Unity", years: 5 }
    ]
  },
  {
    id: "versionControl",
    items: [
      { name: "Git / GitHub", years: 10 },
      { name: "Perforce", years: 2 }
    ]
  },
  {
    id: "tools",
    items: [
      { name: "Rider", years: 7 },
      { name: "Visual Studio Code", years: 8 },
      { name: "Visual Studio" },
      { name: "Jira" },
      { name: "Notion" }
    ]
  },
  {
    id: "gameplay",
    items: [
      { name: "Character Systems" },
      { name: "Combat" },
      { name: "Enemy AI" },
      { name: "Multiplayer" },
      { name: "Cinematics / Events" }
    ]
  },
  {
    id: "graphics",
    items: [{ name: "OpenGL" }, { name: "GLSL" }]
  },
  {
    id: "ui",
    items: [{ name: "UMG (Unreal)" }, { name: "Unity UI" }, { name: "React" }]
  },
  {
    id: "platforms",
    items: [
      { name: "Windows" },
      { name: "Mac" },
      { name: "PlayStation 5" },
      { name: "Xbox Series X|S" },
      { name: "Nintendo Switch" },
      { name: "iOS" },
      { name: "Android" }
    ]
  }
];

// Human languages ("skills.spoken.<id>" for proficiency labels)
export const spokenLanguages = [
  { id: "cantonese" },
  { id: "mandarin" },
  { id: "japanese" },
  { id: "english" }
] as const;
