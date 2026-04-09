import type { DocumentRead } from "@/lib/documentTypes";

function getProfileName(document: DocumentRead): string | null {
  const firstName = document.author_profile?.first_name?.trim() ?? "";
  const lastName = document.author_profile?.last_name?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || null;
}

export function getDocumentAuthorLabel(document: DocumentRead): string {
  return (
    document.author_display_name?.trim() ||
    getProfileName(document) ||
    document.author_profile?.email?.trim() ||
    document.author
  );
}

export function isExternalDocumentAuthor(document: DocumentRead): boolean {
  return document.author_profile?.is_external === true;
}
