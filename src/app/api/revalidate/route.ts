import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const path = searchParams.get("path") || "/";

    if (
      process.env.REVALIDATION_SECRET &&
      secret !== process.env.REVALIDATION_SECRET
    ) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Revalidation error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
