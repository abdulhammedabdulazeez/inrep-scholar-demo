import axios from "axios";
import { createClient } from "@/lib/supabase/client";
import { DocumentListResponse, DocumentDetail } from "@/lib/documentTypes";
import { BACKEND_API_URL } from "./config";

const supabase = createClient();

export async function fetchTenantDocumentsList(
  tenantId: string,
  page?: number,
  pageSize?: number
): Promise<DocumentListResponse> {
  const params = new URLSearchParams();
  if (page != null) params.append("page", String(page));
  if (pageSize != null) params.append("page_size", String(pageSize));
  const qs = params.toString();
  const url = `${BACKEND_API_URL}/document/tenant/${tenantId}${
    qs ? `?${qs}` : ""
  }`;
  const res = await axios.get(url);
  return res.data as DocumentListResponse;
}

export async function fetchTenantDocuments(tenantId: string) {
  const data = await fetchTenantDocumentsList(tenantId);
  return data.results;
}

export async function fetchDocumentDetails(documentId: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.get(
    `${BACKEND_API_URL}/document/${documentId}/details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as DocumentDetail;
}

export async function bulkImportDocuments(tenantId: string, file: File) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("Authentication required");
  }

  // Validate file type and size
  if (!file.name.toLowerCase().endsWith(".zip")) {
    throw new Error("File must be a ZIP file");
  }
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    throw new Error("File size must be less than 50MB");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/document/tenant/${tenantId}/import`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        timeout: 300000, // 5 minutes timeout
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Bulk import error:", error);

    if (error.response?.status === 400) {
      throw new Error(
        error.response.data?.detail || "Invalid file format or content"
      );
    } else if (error.response?.status === 401) {
      throw new Error("Authentication failed");
    } else if (error.response?.status === 413) {
      throw new Error("File too large");
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Upload failed. Please try again.");
    }
  }
}

export async function exportDocuments(tenantId: string): Promise<Blob> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.get(
    `${BACKEND_API_URL}/document/tenant/${tenantId}/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Important for file download
    }
  );

  return response.data;
}

export async function bulkDeleteDocuments(
  tenantId: string,
  documentIds: string[]
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.post(
    `${BACKEND_API_URL}/document/tenant/${tenantId}/bulk-delete`,
    { document_ids: documentIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function bulkUpdateDocumentAccess(
  tenantId: string,
  documentIds: string[],
  access: string
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.post(
    `${BACKEND_API_URL}/document/tenant/${tenantId}/bulk-access`,
    { document_ids: documentIds, access },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function bulkAssignDocumentsToCollections(
  tenantId: string,
  documentIds: string[],
  collectionIds: string[]
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.post(
    `${BACKEND_API_URL}/document/tenant/${tenantId}/bulk-assign-collections`,
    { document_ids: documentIds, collection_ids: collectionIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function updateDocument(documentId: string, data: any) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.put(
    `${BACKEND_API_URL}/document/${documentId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteDocument(documentId: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.delete(
    `${BACKEND_API_URL}/document/${documentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export interface DocumentUploadData {
  title: string;
  faculty_id: string;
  department_id: string;
  author_email: string;
  author_first_name?: string;
  author_last_name?: string;
  type?: string;
  abstract?: string;
  is_public?: boolean;
  is_read_only?: boolean;
  doi_link?: string;
  status?: string;
  collection_ids?: string[];
}

export interface DocumentUploadResponse {
  document: DocumentDetail;
  assigned_reviewers: string[];
}

export async function uploadDocument(
  formData: FormData
): Promise<DocumentUploadResponse> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("Authentication required");
  }

  console.log("=== API CALL DETAILS ===");
  console.log(
    "Endpoint:",
    `${BACKEND_API_URL}/document/`
  );
  console.log("Token present:", !!token);
  console.log("Token length:", token?.length);

  // Log FormData entries again
  console.log("=== FORMDATA IN API CALL ===");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  console.log("=== END FORMDATA IN API CALL ===");

  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/document/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 1 minute timeout for upload
      }
    );

    console.log("=== SUCCESS RESPONSE ===");
    console.log("Status:", response.status);
    console.log("Response data:", response.data);
    console.log("=== END SUCCESS RESPONSE ===");

    return response.data;
  } catch (error: any) {
    console.error("=== ERROR RESPONSE ===");
    console.error("Error status:", error.response?.status);
    console.error("Error status text:", error.response?.statusText);
    console.error("Error data:", error.response?.data);
    console.error("Error message:", error.message);
    console.error("=== END ERROR RESPONSE ===");

    if (error.response?.status === 400) {
      throw new Error(error.response.data?.detail || "Invalid document data");
    } else if (error.response?.status === 409) {
      throw new Error(
        error.response.data?.detail ||
          "This author email conflicts with an existing user. Please use another email or select an existing user."
      );
    } else if (error.response?.status === 401) {
      throw new Error("Authentication failed");
    } else if (error.response?.status === 413) {
      throw new Error("File too large");
    } else if (error.response?.status === 422) {
      throw new Error(
        `Validation error: ${JSON.stringify(error.response.data)}`
      );
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("Upload failed. Please try again.");
    }
  }
}
