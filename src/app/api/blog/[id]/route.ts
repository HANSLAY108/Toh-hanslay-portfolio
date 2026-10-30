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

/** GET /api/blog/[id] */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const store = readCmsStore();
  const post = store.blogPosts.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

/** PATCH /api/blog/[id] */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body: Partial<BlogPost> = await request.json();
    const store = readCmsStore();
    const idx = store.blogPosts.findIndex((p) => p.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const oldSlug = store.blogPosts[idx].slug;
    const updatedPost: BlogPost = {
      ...store.blogPosts[idx],
      ...body,
      id,
      updated_at: new Date().toISOString(),
    };

    const nextPosts = [...store.blogPosts];
    nextPosts[idx] = updatedPost;
    writeCmsStore({ blogPosts: nextPosts });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase
          .from("blog_posts")
          .upsert([updatedPost], { onConflict: "id" });
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath(`/blog/${oldSlug}`);
      revalidatePath(`/blog/${updatedPost.slug}`);
    } catch {
      // no-op
    }

    return NextResponse.json({
      success: true,
      savedToSupabase,
      post: updatedPost,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE /api/blog/[id] */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const store = readCmsStore();
    const nextPosts = store.blogPosts.filter((p) => p.id !== id);
    writeCmsStore({ blogPosts: nextPosts });

    let savedToSupabase = false;
    try {
      const supabase = getAdminClient();
      if (supabase) {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id);
        if (!error) savedToSupabase = true;
      }
    } catch {
      // Local store already updated
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/blog");
    } catch {
      // no-op
    }

    return NextResponse.json({ success: true, savedToSupabase });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
