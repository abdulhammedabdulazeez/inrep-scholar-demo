import axios from "axios";
import { createClient } from "@/lib/supabase/client";

export interface UserProfileCreate {
  email: string;
  first_name: string;
  last_name?: string;
  role: string;
  tenant_id: string;
  faculty_id?: string;
  department_id?: string;
}

export interface BulkUserImportResult {
  email: string;
  status: "success" | "error";
  detail?: string;
}

export interface User {
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  facultyId?: string;
  departmentId?: string;
  createdAt: string;
  // updatedAt: string;
}

export async function bulkImportUsers(
  file: File
): Promise<BulkUserImportResult[]> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `https://inrep-scholar-backend.onrender.com/api/v1/users/import-csv`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export async function exportUsers(): Promise<Blob> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.get(
    `https://inrep-scholar-backend.onrender.com/api/v1/users/export-csv`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return res.data;
}

export async function fetchUsers(): Promise<User[]> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.get(
    `https://inrep-scholar-backend.onrender.com/api/v1/users/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return Array.isArray(res.data) ? res.data.map(mapApiToUser) : [];
}

export async function bulkUpdateUserRoles(
  userIds: string[],
  newRole: string
): Promise<{ updated: number }> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.post(
    "https://inrep-scholar-backend.onrender.com/api/v1/users/bulk-update-role",
    { user_ids: userIds, new_role: newRole },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function bulkDeleteUsers(
  userIds: string[]
): Promise<{ deleted: number }> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.post(
    "https://inrep-scholar-backend.onrender.com/api/v1/users/bulk-delete",
    { user_ids: userIds },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function deleteUser(userId: string): Promise<{ detail: string }> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.delete(
    `https://inrep-scholar-backend.onrender.com/api/v1/users/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function adminCreateUser(user: {
  email: string;
  first_name: string;
  last_name?: string;
  role: string;
  faculty_id?: string;
  department_id?: string;
}): Promise<any> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.post(
    "https://inrep-scholar-backend.onrender.com/api/v1/users/admin-create",
    user,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function createUserProfile(userData: UserProfileCreate) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.post(
    "https://inrep-scholar-backend.onrender.com/api/v1/users/",
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

function mapApiToUser(api: any): User {
  return {
    userId: api.user_id,
    email: api.email,
    role: api.role,
    firstName: api.first_name,
    lastName: api.last_name,
    phoneNumber: api.phone_number,
    facultyId: api.faculty_id,
    departmentId: api.department_id,
    createdAt: api.created_at,
    // updatedAt: api.updated_at,
  };
}
