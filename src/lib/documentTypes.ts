// DocumentDetail.ts

export interface UserProfileRead {
  user_id: string;
  role?: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone_number?: string | null;
  tenant_id?: string;
  faculty_id?: string | null;
  department_id?: string | null;
  is_external: boolean;
}

export interface DepartmentRead {
  department_id: string;
  name: string;
  // ...other fields
}

export interface FacultyRead {
  faculty_id: string;
  name: string;
  // ...other fields
}

export interface DocumentComment {
  comment_id: string;
  document_id: string;
  user_id: string;
  content: string;
  created_at: string;
  // ...other fields
}

export interface DocumentReview {
  document_review_id: string;
  document_id: string;
  reviewer_id: string;
  status: string;
  assigned_at: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  // ...other fields
}

export interface DocumentRead {
  document_id: string;
  tenant_id: string;
  author: string;
  faculty_id: string;
  department_id: string;
  title: string;
  type?: string;
  file_url: string;
  pdf_preview_url?: string | null;
  file_mime_type?: string | null;
  status: string;
  abstract?: string;
  is_public: boolean;
  is_read_only: boolean;
  doi_link?: string;
  plagiarism_score?: number;
  created_at: string;
  updated_at: string;
  author_profile?: UserProfileRead | null;
  author_display_name?: string | null;
}

export interface DocumentDetail {
  document: DocumentRead;
  department?: DepartmentRead;
  faculty?: FacultyRead;
  download_count: number;
  view_count: number;
  comments: DocumentComment[];
  reviews: DocumentReview[];
}

// New interface for the paginated response from the backend
export interface DocumentListResponse {
  results: DocumentDetail[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}
