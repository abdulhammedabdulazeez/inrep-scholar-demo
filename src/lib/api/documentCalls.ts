import axios from "axios";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function fetchTenantDocuments(tenantId: string) {
  const res = await axios.get(
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}`
  );
  return res.data;
}

export async function fetchDocument(documentId: string) {
  const res = await axios.get(
    `http://127.0.0.1:8000/api/v1/document/${documentId}`
  );
  return res.data;
}

export async function bulkImportDocuments(tenantId: string, file: File) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const formData = new FormData();
  formData.append("file", file); // Now expects ZIP file
  const response = await axios.post(
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}/import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function exportDocuments(tenantId: string): Promise<Blob> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.get(
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}/export`,
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
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}/bulk-delete`,
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
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}/bulk-access`,
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
    `http://127.0.0.1:8000/api/v1/document/tenant/${tenantId}/bulk-assign-collections`,
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
    `http://127.0.0.1:8000/api/v1/document/${documentId}`,
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

  const response = await axios.delete(
    `http://127.0.0.1:8000/api/v1/document/${documentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
