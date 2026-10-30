import { createServerSupabaseClient } from "./server";
import {
  Profile,
  Project,
  BlogPost,
  Skill,
  Service,
  SiteSettings,
  ContactMessage,
} from "@/types/database";
import { readCmsStore, writeCmsStore } from "../cms-store";

export async function getProfile(): Promise<Profile> {
  const store = readCmsStore();
  return store.profile;
}

export async function getProjects(options?: {
  featuredOnly?: boolean;
  publishedOnly?: boolean;
}): Promise<Project[]> {
  const store = readCmsStore();
  let list = [...store.projects];
  if (options?.publishedOnly) {
    list = list.filter((p) => p.published);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  return list.sort((a, b) => a.order_index - b.order_index);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const store = readCmsStore();
  return store.projects.find((p) => p.slug === slug) || null;
}

export async function getBlogPosts(options?: {
  publishedOnly?: boolean;
}): Promise<BlogPost[]> {
  const store = readCmsStore();
  let list = [...store.blogPosts];
  if (options?.publishedOnly) {
    list = list.filter((p) => p.published);
  }
  return list;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const store = readCmsStore();
  return store.blogPosts.find((p) => p.slug === slug) || null;
}

export async function getSkills(): Promise<Skill[]> {
  const store = readCmsStore();
  return [...store.skills].sort((a, b) => a.order_index - b.order_index);
}

export async function getServices(): Promise<Service[]> {
  const store = readCmsStore();
  return [...store.services].sort((a, b) => a.order_index - b.order_index);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const store = readCmsStore();
  return store.siteSettings;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const store = readCmsStore();
  return store.messages;
}

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const store = readCmsStore();
    const newMsg: ContactMessage = {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      subject: payload.subject || "Portfolio Inquiry",
      message: payload.message,
      read: false,
      created_at: new Date().toISOString().split("T")[0],
    };

    writeCmsStore({
      messages: [newMsg, ...store.messages],
    });

    const supabase = createServerSupabaseClient();
    if (supabase) {
      await supabase.from("messages").insert([
        {
          name: payload.name,
          email: payload.email,
          subject: payload.subject || "Portfolio Inquiry",
          message: payload.message,
        },
      ]);
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Submission failed";
    return { success: false, error: message };
  }
}
