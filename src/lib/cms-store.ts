import fs from "fs";
import path from "path";
import {
  Profile,
  Project,
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
      return {
        profile: parsed.profile || defaults.profile,
        projects: parsed.projects || defaults.projects,
        blogPosts: parsed.blogPosts || defaults.blogPosts,
        skills: parsed.skills || defaults.skills,
        services: parsed.services || defaults.services,
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

