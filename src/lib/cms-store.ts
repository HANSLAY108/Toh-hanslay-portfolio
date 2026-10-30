import fs from "fs";
import path from "path";
import {
  Profile,
  Project,
  ProjectRole,
  BlogPost,
  Skill,
  Service,
  SiteSettings,
  ContactMessage,
} from "@/types/database";
import {
  initialProfile,
  initialProjects,
  initialBlogPosts,
  initialSkills,
  initialServices,
  initialSiteSettings,
} from "./mock-data";

export interface CmsStoreData {
  profile: Profile;
  projects: Project[];
  blogPosts: BlogPost[];
  skills: Skill[];
  services: Service[];
  siteSettings: SiteSettings;
  messages: ContactMessage[];
  updatedAt: string;
}

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Sarah Chen",
    email: "sarah@studiodesign.io",
    subject: "AI Integration Collaboration",
    message:
      "Hi Hanslay, I'd love to discuss a potential collaboration for an AI-driven design system project. We're building a next-gen creative tool and need someone with your background in both AI systems and design.",
    read: false,
    created_at: "2024-04-20",
  },
  {
    id: "msg-2",
    name: "Marcus Webb",
    email: "marcus@buildwithme.co",
    subject: "Freelance Architecture Consulting",
    message:
      "We have a critical backend architecture challenge for our Series B fintech startup. Would you be available for a consulting engagement starting next month?",
    read: true,
    created_at: "2024-04-18",
  },
];

const STORE_DIR = path.join(process.cwd(), "src", "data");
const STORE_PATH = path.join(STORE_DIR, "cms-store.json");

function inferDefaultRoles(project: Partial<Project>): ProjectRole[] {
  if (project.roles && project.roles.length > 0) return project.roles;
  const cat = (project.category || "").toLowerCase();
  if (cat.includes("ai")) return ["AI", "Software"];
  if (cat.includes("design") || cat.includes("ui")) return ["Design"];
  return ["Software"];
}

function hydrateProject(p: Project, defaultsBySlug: Map<string, Project>): Project {
  const def = defaultsBySlug.get(p.slug);
  return {
    ...(def || {}),
    ...p,
    roles: p.roles && p.roles.length > 0 ? p.roles : def?.roles || inferDefaultRoles(p),
    tech_stack:
      p.tech_stack && p.tech_stack.length > 0
        ? p.tech_stack
        : def?.tech_stack || p.tags || [],
    problem: p.problem || def?.problem || "",
    process: p.process || def?.process || "",
    solution: p.solution || def?.solution || "",
    results: p.results && p.results.length > 0 ? p.results : def?.results || [],
    timeline: p.timeline || def?.timeline || (p.year ? `${p.year}` : ""),
    title_fr: p.title_fr || def?.title_fr || "",
    summary_fr: p.summary_fr || def?.summary_fr || "",
    role_fr: p.role_fr || def?.role_fr || "",
    timeline_fr: p.timeline_fr || def?.timeline_fr || "",
    problem_fr: p.problem_fr || def?.problem_fr || "",
    process_fr: p.process_fr || def?.process_fr || "",
    solution_fr: p.solution_fr || def?.solution_fr || "",
    case_study_content_fr: p.case_study_content_fr || def?.case_study_content_fr || "",
  };
}

function getDefaultStore(): CmsStoreData {
  return {
    profile: { ...initialProfile },
    projects: [...initialProjects],
    blogPosts: [...initialBlogPosts],
    skills: [...initialSkills],
    services: [...initialServices],
    siteSettings: { ...initialSiteSettings },
    messages: [...DEFAULT_MESSAGES],
    updatedAt: new Date().toISOString(),
  };
}

export function readCmsStore(): CmsStoreData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw) as Partial<CmsStoreData>;
      const defaults = getDefaultStore();
      const projectDefaultsBySlug = new Map(
        defaults.projects.map((proj) => [proj.slug, proj])
      );
      const blogDefaultsBySlug = new Map(
        defaults.blogPosts.map((post) => [post.slug, post])
      );
      const skillDefaultsById = new Map(defaults.skills.map((s) => [s.id, s]));
      const serviceDefaultsById = new Map(defaults.services.map((s) => [s.id, s]));

      return {
        profile: { ...defaults.profile, ...(parsed.profile || {}) },
        projects: (parsed.projects || defaults.projects).map((p) =>
          hydrateProject(p, projectDefaultsBySlug)
        ),
        blogPosts: (parsed.blogPosts || defaults.blogPosts).map((b) => {
          const def = blogDefaultsBySlug.get(b.slug);
          return { ...(def || {}), ...b };
        }),
        skills: (parsed.skills || defaults.skills).map((s) => {
          const def = skillDefaultsById.get(s.id);
          return { ...(def || {}), ...s };
        }),
        services: (parsed.services || defaults.services).map((s) => {
          const def = serviceDefaultsById.get(s.id);
          return { ...(def || {}), ...s };
        }),
        siteSettings: { ...defaults.siteSettings, ...(parsed.siteSettings || {}) },
        messages: parsed.messages || defaults.messages,
        updatedAt: parsed.updatedAt || defaults.updatedAt,
      };
    }
  } catch (err) {
    console.warn("Failed to read cms-store.json, using defaults:", err);
  }

  const initial = getDefaultStore();
  writeCmsStore(initial);
  return initial;
}

export function writeCmsStore(data: Partial<CmsStoreData>): CmsStoreData {
  let current: CmsStoreData;
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      current = { ...getDefaultStore(), ...JSON.parse(raw) };
    } else {
      current = getDefaultStore();
    }
  } catch {
    current = getDefaultStore();
  }

  const next: CmsStoreData = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(next, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to write cms-store.json:", err);
  }

  return next;
}
