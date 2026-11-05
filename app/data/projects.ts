export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  images: string[];
  github?: string;
  demo?: string;
  note?: string;
}

export const projects: Project[] = [
  {
    slug: "delivery-management-system",
    title: "Full-Stack Delivery Management System",
    description:
      "Senior project: architected a multi-role delivery platform with role-based access, global admin oversight, and branch-specific controls. Integrates real-time tracking via Maps API and secure QR code / OTP validation for reliable order confirmation.",
    tech: [
      "Laravel + Blades",
      "PHP",
      "MySQL",
      "JavaScript",
      "Maps API (Leaflet)",
      "REST APIs",
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    images: [],
    github: "https://github.com/abbas56fares/BaladiPick",
  },
  {
    slug: "ai-task-management-system",
    title: "AI-Powered Task Management System",
    description:
      "A full-stack task management platform combining AI agents with Retrieval-Augmented Generation (RAG) for smarter daily planning, decision-making, and automated recommendations.",
    tech: [
      "Next.js",
      "Laravel",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "ChromaDB",
      "Ollama",
      "RAG",
      "AI Agents",
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    images: [],
  },
  {
    slug: "habitflow",
    title: "HabitFlow",
    description:
      "A comprehensive habit-tracking application with a relational database schema for managing user data and progress logs over time, helping users stay consistent with daily habits.",
    tech: ["React", "Node.js", "Express", "MySQL"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    images: [],
    github: "https://github.com/abbas56fares/HabitFlow",
    demo: "https://ezhabitflow.netlify.app/",
    note: "deployed version is static",
  },
  {
    slug: "interactive-digital-menu-system",
    title: "Interactive Digital Menu System",
    description:
      "A full-featured digital menu system with a complete admin dashboard, built on the VILT stack for restaurant and business operations.",
    tech: [
      "VILT Stack: Laravel, Vue, Inertia, Tailwind CSS",
      "MySQL",
      "JavaScript",
      "Admin Dashboard",
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    images: [],
    github: "https://github.com/abbas56fares/menu-admin-portal",
    demo: "https://menu-static.laravel.cloud/",
    note: "deployed version is static",
  },
  {
    slug: "cafe-website-pos",
    title: "Café Website with Online Ordering & Offline POS",
    description:
      "A full-stack café website combining online ordering with an offline Point-of-Sale system for in-store operations.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "POS System"],
    gradient: "from-orange-500 via-red-500 to-yellow-500",
    images: [],
    github: "https://github.com/abbas56fares/menu",
    demo: "https://issacaffee.netlify.app/",
    note: "deployed version is static",
  },
  {
    slug: "modern-agenda-system",
    title: "Interactive Modern Agenda System",
    description:
      "A scheduling and agenda management system for organizing tasks and appointments with a clean, responsive interface.",
    tech: ["Laravel + Blades", "MySQL", "JavaScript", "Tailwind CSS"],
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    images: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
