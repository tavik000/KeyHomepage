// Skill data. Category labels are translated via "skills.categories.<id>".
// Technology names themselves are universal and not translated.

export interface SkillCategory {
  id: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  { id: "languages", items: ["C++", "C#", "TypeScript / JavaScript", "Python", "SQL", "Java"] },
  { id: "engines", items: ["Unreal Engine 5", "Unity"] },
  { id: "gameplay", items: ["Character Systems", "Combat", "Enemy AI", "Multiplayer", "Cinematics / Events"] },
  { id: "graphics", items: ["OpenGL", "GLSL"] },
  { id: "ui", items: ["UMG (Unreal)", "Unity UI", "React"] },
  { id: "tools", items: ["Rider", "Visual Studio", "Visual Studio Code", "Jira", "Notion"] },
  { id: "versionControl", items: ["Perforce", "Git / GitHub"] },
  { id: "platforms", items: ["Windows", "PlayStation 5", "Xbox Series X|S", "Nintendo Switch", "iOS", "Android"] }
];

// Human languages ("skills.spoken.<id>" for proficiency labels)
export const spokenLanguages = [
  { id: "cantonese" },
  { id: "mandarin" },
  { id: "japanese" },
  { id: "english" }
] as const;
