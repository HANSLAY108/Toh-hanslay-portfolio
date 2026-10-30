import { NextRequest, NextResponse } from "next/server";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = readCmsStore();
  return NextResponse.json({ messages: store.messages });
}

export async function PATCH(request: NextRequest) {
  try {
    const body: { id: string; read?: boolean } = await request.json();
    const store = readCmsStore();
    const nextMessages = store.messages.map((m) =>
      m.id === body.id ? { ...m, read: body.read ?? !m.read } : m
    );
    writeCmsStore({ messages: nextMessages });
    return NextResponse.json({ success: true, messages: nextMessages });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const store = readCmsStore();
    const nextMessages = store.messages.filter((m) => m.id !== id);
    writeCmsStore({ messages: nextMessages });
    return NextResponse.json({ success: true, messages: nextMessages });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

