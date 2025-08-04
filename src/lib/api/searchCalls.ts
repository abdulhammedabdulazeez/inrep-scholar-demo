import axios from "axios";
import { createClient } from "@/lib/supabase/client";
import { DocumentListResponse } from "@/lib/documentTypes";

const supabase = createClient();

export interface SearchFilters {
  keywords?: string;
  faculty_ids?: string[];
  document_types?: string[];
  access_types?: string[];
  page?: number;
  page_size?: number;
  sort_by?:
    | "relevance"
    | "title"
    | "created_at"
    | "download_count"
    | "view_count";
  sort_order?: "asc" | "desc";
}

export async function searchDocuments(
  tenantId: string,
  filters: SearchFilters
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  // Build query parameters
  const params = new URLSearchParams();

  if (filters.keywords) {
    params.append("keywords", filters.keywords);
  }

  if (filters.faculty_ids?.length) {
    filters.faculty_ids.forEach((id) => params.append("faculty_ids", id));
  }

  if (filters.document_types?.length) {
    filters.document_types.forEach((type) =>
      params.append("document_types", type)
    );
  }

  if (filters.access_types?.length) {
    filters.access_types.forEach((type) => params.append("access_types", type));
  }

  if (filters.page) {
    params.append("page", filters.page.toString());
  }

  if (filters.page_size) {
    params.append("page_size", filters.page_size.toString());
  }

  // Note: Backend doesn't support sort parameters, so we exclude them
  // Sorting will be handled on the frontend if needed

  const response = await axios.get(
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as DocumentListResponse;
}
