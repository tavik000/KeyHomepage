// Award/certification structural data. Award titles, event names, and
// certification names are translated under "awards.items.<id>" and
// "certifications.items.<id>".

export interface Award {
  id: string;
  year: string;
  gameLink?: string;
  eventLink?: string;
}

export const awards: Award[] = [
  {
    id: "petitcon",
    year: "2025",
    gameLink: "https://www.youtube.com/watch?v=GqbONar8b5c",
    eventLink: "https://historia.co.jp/ue5petitcon24"
  },
  {
    id: "ggj2025",
    year: "2025",
    gameLink: "https://www.youtube.com/watch?v=U_8e_a2troo",
    eventLink:
      "https://www.facebook.com/ggjhongkong/photos/the-ggjhk-2025-award-winners%E6%B4%97%E7%A2%97%E5%A4%A7%E4%BD%9C%E6%88%B0-most-innovative-mechanic-presented-by-g-bitsbu/1119781389933188/"
  },
  {
    id: "ggj2022",
    year: "2022",
    gameLink: "https://globalgamejam.org/2022/games/blite-6",
    eventLink:
      "https://www.facebook.com/photo/?fbid=3116310891972747&set=a.1540675036203015"
  },
  {
    id: "cityu",
    year: "2018",
    eventLink:
      "https://www.cb.cityu.edu.hk/mba/news/2018/05/2018-cityu-app-innovation-contest.html"
  }
];

export interface Certification {
  id: string;
  year: string;
}

export const certifications: Certification[] = [
  { id: "fe", year: "2026" },
  { id: "sg", year: "2025" },
  { id: "jlpt-n1", year: "2022" }
];
