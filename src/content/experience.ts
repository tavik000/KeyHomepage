// Structural experience/education data. Positions, bullets, and degree names
// are translated in src/messages/<locale>.json under "experience.items.<id>"
// and "education.items.<id>".

export interface ExperienceItem {
  id: string;
  location: string;
  current?: boolean;
  bulletCount: number;
  /** Company logo shown next to the entry; omitted for freelance work. */
  logo?: string;
}

export const experience: ExperienceItem[] = [
  {
    id: "blast-edge",
    location: "Tokyo, Japan",
    current: true,
    bulletCount: 4,
    logo: "/images/companies/blast-edge-games.png"
  },
  {
    id: "freelance",
    location: "Tokyo, Japan",
    bulletCount: 3
  },
  {
    id: "ember",
    location: "Hong Kong",
    bulletCount: 3,
    logo: "/images/companies/ember-entertainment.jpg"
  },
  {
    id: "feeling-game",
    location: "Hong Kong",
    bulletCount: 3,
    logo: "/images/companies/feeling-game.png"
  }
];

export interface EducationItem {
  id: string;
  period: string;
  /** School crest/logo shown next to the entry. */
  logo?: string;
}

export const education: EducationItem[] = [
  {
    id: "polyu",
    period: "2018 — 2020",
    logo: "/images/education/polyu-icon.png"
  },
  {
    id: "chuhai",
    period: "2014 — 2018",
    logo: "/images/education/chuhai.png"
  }
];
