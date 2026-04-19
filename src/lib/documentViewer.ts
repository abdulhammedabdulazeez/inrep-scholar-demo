"use client";

import { createClient } from "@/lib/supabase/client";
import { BACKEND_API_URL } from "@/lib/api/config";
import {
  isBackendOriginUrl,
  resolveDocumentFileUrl,
} from "@/lib/documentFileUrl";

export function buildDocumentViewerHref({
  subdomain,
  documentId,
}: {
  subdomain: string;
  documentId: string;
}): string {
  return `/demo/${subdomain}/documents/${documentId}/viewer`;
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
