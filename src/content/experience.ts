// Structural experience/education data. Positions, bullets, and degree names
// are translated in src/messages/<locale>.json under "experience.items.<id>"
// and "education.items.<id>".

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  current?: boolean;
  bulletCount: number;
  /** Company logo shown next to the entry; omitted for freelance work. */
  logo?: string;
}

export const experience: ExperienceItem[] = [
  {
    id: "blast-edge",
    company: "Blast Edge Games",
    location: "Tokyo, Japan",
    current: true,
    bulletCount: 4,
    logo: "/images/companies/blast-edge-games.png"
  },
  {
    id: "freelance",
    company: "Freelance",
    location: "Tokyo, Japan",
    bulletCount: 3
  },
  {
    id: "ember",
    company: "Realm of Alters (Ember Entertainment)",
    location: "Hong Kong",
    bulletCount: 3,
    logo: "/images/companies/ember-entertainment.jpg"
  },
  {
    id: "feeling-game",
    company: "Feeling Game Company",
    location: "Hong Kong",
    bulletCount: 3,
    logo: "/images/companies/feeling-game.png"
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
