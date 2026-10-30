import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";
import { BlogPost } from "@/types/database";

export const dynamic = "force-dynamic";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** GET /api/blog — return all blog posts */
export async function GET() {
  const store = readCmsStore();
  return NextResponse.json({ posts: store.blogPosts });
}

/** POST /api/blog — create a new blog post */
export async function POST(request: NextRequest) {
  try {
    const body: Partial<BlogPost> = await request.json();
    const store = readCmsStore();

    const slug =
      body.slug ||
      (body.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const newPost: BlogPost = {
      id: body.id || crypto.randomUUID(),
      slug,
      title: body.title || "Untitled Essay",
      excerpt: body.excerpt || "",
      content: body.content || "",
      cover_image: body.cover_image || "",
      tags: body.tags || [],
      reading_time: body.reading_time || "5 min read",
      published: body.published ?? true,
      published_at: body.published_at || new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const nextPosts = [newPost, ...store.blogPosts];
    writeCmsStore({ blogPosts: nextPosts });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase
          .from("blog_posts")
          .upsert([newPost], { onConflict: "id" });
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath(`/blog/${newPost.slug}`);
    } catch {
      // no-op
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      post: newPost,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
