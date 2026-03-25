export interface Skill {
  name: string;
  abbreviation: string;
  level: number;
  bgColor: string;
  textColor: string;
}

export const skills: Skill[] = [
  { name: "Illustrator", abbreviation: "Ai", level: 80, bgColor: "#330000", textColor: "#ff9a00" },
  { name: "Photoshop", abbreviation: "Ps", level: 80, bgColor: "#001e36", textColor: "#31a8ff" },
  { name: "Premiere", abbreviation: "Pr", level: 50, bgColor: "#00005b", textColor: "#9999ff" },
  { name: "After Effects", abbreviation: "Ae", level: 40, bgColor: "#00005b", textColor: "#9999ff" },
  { name: "Figma", abbreviation: "F", level: 35, bgColor: "#1a1a2e", textColor: "#a259ff" },
  { name: "Dimension", abbreviation: "Dn", level: 30, bgColor: "#0a2e1a", textColor: "#49cc90" },
];
