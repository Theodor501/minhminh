export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "freelancer",
    company: "Freelancer",
    role: "Graphic Designer",
    period: "2022 – Present",
    description: [
      "Design logos and branding materials, mockups for international clients",
      "5000+ Views per month. YouTube thumbnails, video scripts, and edits",
    ],
  },
  {
    id: "anh-duong-xanh",
    company: "Anh Duong Xanh",
    role: "Graphic Designer",
    period: "07/2024 – 12/2024",
    description: [
      "Design POSM, e-commerce posts, brand identity, image retouching",
      "Shooting and editing for e-commerce video & reels",
    ],
  },
  {
    id: "pnp-global",
    company: "PNP Global Supply",
    role: "Fullstack Designer",
    period: "08/2023 – 05/2024",
    description: [
      "Design brand identity, websites, printed materials: catalogues, brochures, stickers",
      "Produce 2-3 videos per week & photographer",
    ],
  },
  {
    id: "tdc-design-club",
    company: "TDC Design Club",
    role: "Leader",
    period: "08/2021 – 09/2022",
    description: [
      "Managed a team of 3 designers to deliver visual campaigns",
      "Grew fanpage to 10,000+ followers in 6 months",
    ],
  },
];

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export const education: Education[] = [
  {
    degree: "Business Administration",
    school: "Thu Duc College of Technology",
    period: "2020 – 2022",
  },
  {
    degree: "IT Certificate (Advanced)",
    school: "VNUHCM-US",
    period: "2020 – 2022",
  },
];
