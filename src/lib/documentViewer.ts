"use client";

import { createClient } from "@/lib/supabase/client";
import { BACKEND_API_URL } from "@/lib/api/config";
import {
  isBackendOriginUrl,
  resolveDocumentFileUrl,
} from "@/lib/documentFileUrl";

export const TEMP_PDF_VIEWER_URL =
  "https://rhihqqjfnqrqylkdarri.supabase.co/storage/v1/object/sign/documents/documents/c1ce94cc-a555-4a92-9848-ac25eb06ee5e/5e4553c0-6916-4c3b-aff5-65a7ad25f5bc/admin-qa-guide.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yNjRlNzYwMS05MjA5LTRmNTAtOGFmZS02OWEwZWY5ZjU4Y2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb2N1bWVudHMvZG9jdW1lbnRzL2MxY2U5NGNjLWE1NTUtNGE5Mi05ODQ4LWFjMjVlYjA2ZWU1ZS81ZTQ1NTNjMC02OTE2LTRjM2ItYWZmNS02NWE3YWQyNWY1YmMvYWRtaW4tcWEtZ3VpZGUucGRmIiwiaWF0IjoxNzc1NzU0MDI0LCJleHAiOjE3NzYzNTg4MjR9.LPeoSUqPjTW8_rj0Q-suDce-C5pC21J9JRk73fzBtTo";

export function buildDocumentViewerHref({
  subdomain,
  documentId,
  title,
  fileUrl,
}: {
  subdomain: string;
  documentId: string;
  title?: string;
  fileUrl?: string | null;
}): string {
  const params = new URLSearchParams();
  params.set("documentId", documentId);
  if (title) params.set("title", title);
  if (fileUrl) params.set("fileUrl", fileUrl);
  return `/demo/${subdomain}/documents/${documentId}/viewer?${params.toString()}`;
}

function suggestedFilename(title: string | undefined): string {
  const base = (title || "document")
    .replace(/[/\\?%*:|"<>]/g, "-")
    .slice(0, 80)
    .trim();
  return base.toLowerCase().endsWith(".pdf") ? base : `${base}.pdf`;
}

async function fetchPdfBlob(url: string, token: string | undefined) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "omit",
  });
  if (!res.ok) return null;
  const blob = await res.blob();
  if (!blob.size) return null;
  return blob;
}

/**
 * Opens the document PDF in a new tab. Tries signed/public URLs directly,
 * otherwise fetches with the Supabase access token (for same-origin API files).
 */
export async function openDocumentPdf(
  fileUrl: string | undefined | null,
  documentId: string,
  title?: string
): Promise<void> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const resolved = resolveDocumentFileUrl(fileUrl);

  // External signed URLs: open without Authorization (browser cannot attach Bearer to navigation).
  if (resolved?.startsWith("http") && !isBackendOriginUrl(resolved)) {
    window.open(resolved, "_blank", "noopener,noreferrer");
    return;
  }

  const tryUrls: string[] = [];
  if (resolved) tryUrls.push(resolved);
  tryUrls.push(`${BACKEND_API_URL}/document/${documentId}/file`);
  tryUrls.push(`${BACKEND_API_URL}/document/${documentId}/download`);

  for (const url of tryUrls) {
    const blob = await fetchPdfBlob(url, token);
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 120_000);
      return;
    }
  }

  if (resolved?.startsWith("http")) {
    window.open(resolved, "_blank", "noopener,noreferrer");
    return;
  }

  throw new Error(
    "Could not open the document. Sign in if required, or check that the file is available."
  );
}

/**
 * Downloads the PDF (same retrieval logic as open, but triggers a file download).
 */
export async function downloadDocumentPdf(
  fileUrl: string | undefined | null,
  documentId: string,
  title?: string
): Promise<void> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const resolved = resolveDocumentFileUrl(fileUrl);

  if (resolved?.startsWith("http") && !isBackendOriginUrl(resolved)) {
    const a = document.createElement("a");
    a.href = resolved;
    a.download = suggestedFilename(title);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
    return;
  }

  const tryUrls: string[] = [];
  if (resolved) tryUrls.push(resolved);
  tryUrls.push(`${BACKEND_API_URL}/document/${documentId}/file`);
  tryUrls.push(`${BACKEND_API_URL}/document/${documentId}/download`);

  for (const url of tryUrls) {
    const blob = await fetchPdfBlob(url, token);
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = suggestedFilename(title);
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      return;
    }
  }

  if (resolved?.startsWith("http")) {
    const a = document.createElement("a");
    a.href = resolved;
    a.download = suggestedFilename(title);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
    return;
  }

  throw new Error("Could not download the document.");
}
