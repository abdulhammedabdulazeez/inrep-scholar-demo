import axios from "axios";
import { RegisterUniFormFields } from "../types";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type TenantDataWithoutPassword = Omit<RegisterUniFormFields, "password">;

export const registerTenant = async (
  tenantData: TenantDataWithoutPassword,
  accessToken: string
) => {
  const formData = new FormData();

  Object.entries(tenantData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (typeof value === "string" || typeof value === "number") {
        formData.append(key, String(value));
      }
    }
  });

  try {
    const response = await axios.post(
      "https://inrep-scholar-backend.onrender.com/api/v1/tenant/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Don't set Content-Type for FormData - let axios handle it
        },
      }
    );

    console.log("✅ Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API call failed:", error);
    throw error;
  }
};

export interface University {
  tenantId: string;
  universityName: string;
  subdomain: string;
  description?: string;
  contactEmail?: string;
}

export const fetchUniversities = async (): Promise<University[]> => {
  try {
    console.log("Fetching universities from API...");
    const response = await axios.get(
      "https://inrep-scholar-backend.onrender.com/api/v1/tenant/public"
    );
    console.log("Universities API response:", response.data);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // Check if response.data is an array
    if (!Array.isArray(response.data)) {
      console.error("API response is not an array:", typeof response.data);
      return [];
    }

    // Map all fields from backend to camelCase
    const universities = response.data.map((uni: any) => {
      console.log("Processing university:", uni);
      return {
        tenantId: uni.tenant_id,
        universityName: uni.university_name,
        subdomain: uni.subdomain,
        description: uni.description,
        contactEmail: uni.contact_email,
      };
    });

    console.log("Mapped universities:", universities);
    return universities;
  } catch (error: any) {
    console.error("Error fetching universities:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    // Return empty array on error, let the fallback handle it
    return [];
  }
};

export async function fetchTenantInfo(tenantId: string) {
  const res = await axios.get(
    `https://inrep-scholar-backend.onrender.com/api/v1/tenant/${tenantId}/info`
  );
  return res.data;
}

export const updateTenantSettings = async (
  tenantId: string,
  settings: Record<string, any>,
  logo?: File
): Promise<any> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const formData = new FormData();
  formData.append("settings", JSON.stringify(settings));
  if (logo) {
    formData.append("logo", logo);
  }
  // Iterate over the settings object to append files separately if they are File objects
  for (const key in settings.brand_and_appearance) {
    const value = settings.brand_and_appearance[key];
    if (value instanceof File) {
      formData.append(key, value); // Append the File object directly
      // Remove the File object from the JSON settings to avoid serialization issues
      settings.brand_and_appearance[key] = null; // Or a placeholder if needed
    }
  }
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  const response = await axios.put(
    `/api/v1/tenant/${tenantId}/settings`,
    formData,
    {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export interface Faculty {
  faculty_id: string;
  name: string;
  description?: string;
}

export interface Department {
  department_id: string;
  name: string;
  faculty_id: string;
  description?: string;
}

export const fetchFaculties = async (): Promise<Faculty[]> => {
  try {
    const response = await axios.get(
      "https://inrep-scholar-backend.onrender.com/api/v1/tenant/faculties"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching faculties:", error);
    return [];
  }
};

export const fetchDepartments = async (
  facultyId?: string
): Promise<Department[]> => {
  try {
    const url = facultyId
      ? `https://inrep-scholar-backend.onrender.com/api/v1/tenant/faculties/${facultyId}/departments`
: "https://inrep-scholar-backend.onrender.com/api/v1/tenant/departments";

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};
