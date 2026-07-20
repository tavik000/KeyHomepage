// Structural experience/education data. Positions, bullets, and degree names
// are translated in src/messages/<locale>.json under "experience.items.<id>"
// and "education.items.<id>".

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bulletCount: number;
}

export const experience: ExperienceItem[] = [
  {
    id: "blast-edge",
    company: "Blast Edge Games",
    location: "Tokyo, Japan",
    period: "Jul 2024 —",
    current: true,
    bulletCount: 4
  },
  {
    id: "freelance",
    company: "Freelance",
    location: "Tokyo, Japan",
    period: "Mar 2023 — Jun 2024",
    bulletCount: 3
  },
  {
    id: "ember",
    company: "Realm of Alters (Ember Entertainment)",
    location: "Hong Kong",
    period: "Mar 2022 — Feb 2023",
    bulletCount: 3
  },
  {
    id: "feeling-game",
    company: "Feeling Game Company",
    location: "Hong Kong",
    period: "Jun 2020 — Feb 2022",
    bulletCount: 3
  }
];

export interface EducationItem {
  id: string;
  school: string;
  period: string;
}

export const education: EducationItem[] = [
  {
    id: "polyu",
    school: "The Hong Kong Polytechnic University",
    period: "2018 — 2020"
  },
  {
    id: "chuhai",
    school: "Chu Hai College of Higher Education",
    period: "2014 — 2018"
  }
];
