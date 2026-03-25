export type ProjectCategory = "branding" | "print" | "social";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "brand-identity-adx",
    title: "Brand Identity",
    client: "Anh Duong Xanh",
    category: "branding",
    description: "Complete brand identity design including logo, color palette, and brand guidelines for a green energy company.",
    gradient: "linear-gradient(135deg, #1a3a5c, #2a5a8c)",
  },
  {
    id: "ecommerce-posts",
    title: "E-commerce Posts",
    client: "Product Campaign",
    category: "social",
    description: "Series of e-commerce social media posts designed to drive engagement and conversions.",
    gradient: "linear-gradient(135deg, #2a2a4a, #3a3a6a)",
  },
  {
    id: "posm-pnp",
    title: "POSM Design",
    client: "PNP Global Supply",
    category: "print",
    description: "Point of sale materials including standees, banners, and shelf displays for retail environments.",
    gradient: "linear-gradient(135deg, #1a2a1a, #2a4a2a)",
  },
  {
    id: "print-materials",
    title: "Print Materials",
    client: "Catalogues & Brochures",
    category: "print",
    description: "Product catalogues, brochures, stickers, and tags for print production with vendor coordination.",
    gradient: "linear-gradient(135deg, #2a1a2a, #4a2a4a)",
  },
  {
    id: "logo-freelance",
    title: "Logo Design",
    client: "International Clients",
    category: "branding",
    description: "Custom logo designs and branding materials for international freelance clients with 5000+ views per month.",
    gradient: "linear-gradient(135deg, #1a1a3a, #2a2a5a)",
  },
];

export const filterTabs = ["all", "branding", "print", "social"] as const;
export type FilterTab = (typeof filterTabs)[number];

export function filterProjects(tab: FilterTab): Project[] {
  if (tab === "all") return projects;
  return projects.filter((p) => p.category === tab);
}
