import { createClient } from "./client";

/**
 * Upload an image asset to Supabase Storage (portfolio-assets bucket).
 * Gracefully falls back to a base64 Data URL if Supabase is offline,
 * unauthenticated, or the storage bucket isn't provisioned yet.
 */
export async function uploadAsset(
  file: File,
  folder: string = "uploads"
): Promise<{ url: string | null; error: string | null; isFallback?: boolean }> {
  const readAsDataUrl = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  try {
    const supabase = createClient();
    if (!supabase) {
      const dataUrl = await readAsDataUrl();
      return { url: dataUrl, error: null, isFallback: true };
    }

    // Check if user is signed in
    const { data: { session } } = await supabase.auth.getSession();

    const fileExt = file.name.split(".").pop() || "png";
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      // If bucket doesn't exist or RLS blocked (e.g. anon demo session), fall back to Data URL
      console.warn("Supabase storage upload fallback:", uploadError.message);
      const dataUrl = await readAsDataUrl();
      return {
        url: dataUrl,
        error: null,
        isFallback: true,
      };
    }

    const { data } = supabase.storage
      .from("portfolio-assets")
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null, isFallback: false };
  } catch (err: unknown) {
    try {
      const dataUrl = await readAsDataUrl();
      return { url: dataUrl, error: null, isFallback: true };
    } catch {
      const message = err instanceof Error ? err.message : "Upload error";
      return { url: null, error: message };
    }
  }
}
