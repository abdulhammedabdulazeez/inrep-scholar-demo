import { BACKEND_API_URL } from "@/lib/api/config";

function backendOrigin(): string {
  try {
    return new URL(BACKEND_API_URL).origin;
  } catch {
    return "";
  }
}

/**
 * Turns API `file_url` into a browser-openable URL.
 * Absolute URLs (e.g. signed storage) are returned as-is.
 * Relative paths are resolved against the backend origin.
 */
export function resolveDocumentFileUrl(
  fileUrl: string | undefined | null
): string | null {
  if (fileUrl == null || typeof fileUrl !== "string") return null;
  const u = fileUrl.trim();
  if (!u) return null;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("//")) return `https:${u}`;
  const origin = backendOrigin();
  if (!origin) return null;
  if (u.startsWith("/")) return `${origin}${u}`;
  return `${origin}/${u}`;
}

export function isBackendOriginUrl(url: string): boolean {
  try {
    return new URL(url).origin === new URL(BACKEND_API_URL).origin;
  } catch {
    return false;
  }
}
