import axios from "axios";
import { createClient } from "@/lib/supabase/client";

export interface AssignedReviewer {
  fullName: string;
  email: string;
}

export interface PendingReview {
  documentId: string;
  documentTitle: string;
  documentAbstract?: string;
  plagiarismScore?: number;
  dateSubmitted: string;
  departmentName: string;
  authorFullName: string;
  reviewersAssigned: number;
  reviewersNeeded: number;
  status: string;
  assignedReviewers: AssignedReviewer[];
}

export interface Reviewer {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  department?: string;
  fullName: string;
}

export interface AssignReviewerRequest {
  documentId: string;
  reviewerId: string;
  deadline: string;
}

function mapApiToPendingReview(api: any): PendingReview {
  return {
    documentId: api.document_id,
    documentTitle: api.document_title,
    documentAbstract: api.document_abstract,
    plagiarismScore: api.plagiarism_score,
    dateSubmitted: api.date_submitted,
    departmentName: api.department_name,
    authorFullName: api.author_full_name,
    reviewersAssigned: api.reviewers_assigned,
    reviewersNeeded: api.reviewers_needed,
    status: api.status,
    assignedReviewers:
      api.assigned_reviewers?.map((reviewer: any) => ({
        fullName: reviewer.full_name,
        email: reviewer.email,
      })) || [],
  };
}

function mapApiToReviewer(api: any): Reviewer {
  return {
    userId: api.user_id,
    firstName: api.first_name,
    lastName: api.last_name,
    email: api.email,
    department: api.department,
    fullName: `${api.first_name} ${api.last_name}`.trim(),
  };
}

export async function fetchPendingReviews(
  tenantId: string
): Promise<PendingReview[]> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  const res = await axios.get(
    `https://inrep-scholar-backend.onrender.com/api/v1/reviews/tenant/${tenantId}/awaiting-review-assignment`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // Always return camelCase data
  return Array.isArray(res.data) ? res.data.map(mapApiToPendingReview) : [];
}

export async function fetchReviewers(tenantId: string): Promise<Reviewer[]> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  try {
    const res = await axios.get(
      `https://inrep-scholar-backend.onrender.com/api/v1/reviews/tenant/${tenantId}/reviewers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const reviewers = Array.isArray(res.data)
      ? res.data.map(mapApiToReviewer)
      : [];

    // If no reviewers returned, use dummy data for visualization
    if (reviewers.length === 0) {
      return [
        {
          userId: "dummy-1",
          firstName: "Dr. Jean",
          lastName: "Mukiza",
          email: "jean.mukiza@uni.edu",
          department: "Computer Science",
          fullName: "Dr. Jean Mukiza",
        },
        {
          userId: "dummy-2",
          firstName: "Dr. Sarah",
          lastName: "Kagame",
          email: "sarah.kagame@uni.edu",
          department: "Computer Science",
          fullName: "Dr. Sarah Kagame",
        },
        {
          userId: "dummy-3",
          firstName: "Dr. Emmanuel",
          lastName: "Nsanzimana",
          email: "emmanuel.nsanzimana@uni.edu",
          department: "Electrical Engineering",
          fullName: "Dr. Emmanuel Nsanzimana",
        },
        {
          userId: "dummy-4",
          firstName: "Dr. Grace",
          lastName: "Munyangendo",
          email: "grace.munyangendo@uni.edu",
          department: "Environmental Science",
          fullName: "Dr. Grace Munyangendo",
        },
        {
          userId: "dummy-5",
          firstName: "Dr. Alice",
          lastName: "Uwimana",
          email: "alice.uwimana@uni.edu",
          department: "Tourism Management",
          fullName: "Dr. Alice Uwimana",
        },
      ];
    }

    return reviewers;
  } catch (error) {
    console.error("Failed to fetch reviewers:", error);
    // Return dummy data on error for visualization
    return [
      {
        userId: "dummy-1",
        firstName: "Dr. Jean",
        lastName: "Mukiza",
        email: "jean.mukiza@uni.edu",
        department: "Computer Science",
        fullName: "Dr. Jean Mukiza",
      },
      {
        userId: "dummy-2",
        firstName: "Dr. Sarah",
        lastName: "Kagame",
        email: "sarah.kagame@uni.edu",
        department: "Computer Science",
        fullName: "Dr. Sarah Kagame",
      },
      {
        userId: "dummy-3",
        firstName: "Dr. Emmanuel",
        lastName: "Nsanzimana",
        email: "emmanuel.nsanzimana@uni.edu",
        department: "Electrical Engineering",
        fullName: "Dr. Emmanuel Nsanzimana",
      },
      {
        userId: "dummy-4",
        firstName: "Dr. Grace",
        lastName: "Munyangendo",
        email: "grace.munyangendo@uni.edu",
        department: "Environmental Science",
        fullName: "Dr. Grace Munyangendo",
      },
      {
        userId: "dummy-5",
        firstName: "Dr. Alice",
        lastName: "Uwimana",
        email: "alice.uwimana@uni.edu",
        department: "Tourism Management",
        fullName: "Dr. Alice Uwimana",
      },
    ];
  }
}

export async function assignReviewer(
  assignment: AssignReviewerRequest
): Promise<void> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("No access token");

  await axios.post(
    `https://inrep-scholar-backend.onrender.com/api/v1/reviews/`,
    {
      document_id: assignment.documentId,
      reviewer_id: assignment.reviewerId,
      deadline: assignment.deadline || null,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
