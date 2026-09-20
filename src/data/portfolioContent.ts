export type CategoryKey = "projects" | "experience" | "research" | "certificates";

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;   // thumbnail, e.g. a project screenshot
  tags?: string[];     // e.g. ["Next.js", "Full-stack"]
  meta?: string;       // e.g. "2024 · BINUS University", "Issued Jan 2025"
  link?: string;       // repo, live demo, publication, or verification URL
}

export interface CategoryData {
  key: CategoryKey;
  label: string;
  accentRgb: string;      // must match the folder's own accentRgb
  backgroundSvg: string;  // path to FolderBackground SVG inside /public
  items: CategoryItem[];
}

export const CATEGORY_DATA: Record<CategoryKey, CategoryData> = {
  projects: {
    key: "projects",
    label: "Projects",
    accentRgb: "124,40,39",
    backgroundSvg: "/assets/FolderBackground_red.svg",
    items: [],
  },
  experience: {
    key: "experience",
    label: "Experience",
    accentRgb: "231,182,3",
    backgroundSvg: "/assets/FolderBackground_yellow.svg",
    items: [],
  },
  research: {
    key: "research",
    label: "Research",
    accentRgb: "39,124,87",
    backgroundSvg: "/assets/FolderBackground_green.svg",
    items: [],
  },
  certificates: {
    key: "certificates",
    label: "Certificates",
    accentRgb: "70,39,124",
    backgroundSvg: "/assets/FolderBackground_purple.svg",
    items: [],
  },
};
