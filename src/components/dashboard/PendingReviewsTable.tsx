import React from "react";
import { DataTable } from "./TableComponent";
import { pendingReviewColumns, PendingReview } from "./PendingReviewColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchPendingReviews } from "@/lib/api/reviewCalls";
import { useUserStore } from "@/store/userStore";

function generateDummyReviews(): PendingReview[] {
  const titles = [
    "AI for Sustainable Agriculture",
    "Blockchain in Healthcare",
    "Renewable Energy in Africa",
    "Smart Cities and IoT",
    "Data Privacy in Education",
  ];
  const authors = [
    "Marie Uwimana",
    "Dr. Jean Mukiza",
    "Peter Nkurunziza",
    "Grace Munyangendo",
    "Alice Uwimana",
  ];
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Environmental Science",
    "Business",
    "Public Health",
  ];
  const reviewers = [
    { fullName: "Dr. John Doe", email: "john.doe@uni.edu" },
    { fullName: "Dr. Jane Smith", email: "jane.smith@uni.edu" },
    { fullName: "Dr. Alex Kim", email: "alex.kim@uni.edu" },
    { fullName: "Dr. Linda Lee", email: "linda.lee@uni.edu" },
    { fullName: "Dr. Omar Farah", email: "omar.farah@uni.edu" },
  ];

  // Use deterministic values instead of Math.random()
  const baseDate = new Date("2024-01-01").getTime();
  const dayInMs = 24 * 60 * 60 * 1000;

  return Array.from({ length: 5 }).map((_, i) => {
    // Deterministic assignment: even indices get 0, odd indices get 1
    const reviewersAssigned = i % 2;
    // Deterministic dates
    const submissionDate = new Date(baseDate + i * dayInMs).toISOString();
    // Deterministic plagiarism score
    const plagiarismScore = (i * 3) % 20;

    // Assign reviewers based on index
    const assignedReviewers =
      reviewersAssigned > 0 ? [reviewers[i % reviewers.length]] : [];

    return {
      documentId: `dummy-${i}`,
      documentTitle: titles[i % titles.length],
      documentAbstract:
        "This is a sample abstract for the document, describing its main contributions and findings.",
      plagiarismScore,
      dateSubmitted: submissionDate,
      departmentName: departments[i % departments.length],
      authorFullName: authors[i % authors.length],
      reviewersAssigned,
      reviewersNeeded: 2,
      status: "pending review",
      assignedReviewers,
    };
  });
}

interface PendingReviewsTableProps {
  data?: PendingReview[];
}

const PendingReviewsTable: React.FC<PendingReviewsTableProps> = ({ data }) => {
  const tenantId = useUserStore((s) => s.tenantId) || "";
  const {
    data: apiData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingReviews", tenantId],
    queryFn: () => fetchPendingReviews(tenantId),
    enabled: !data && !!tenantId,
  });

  let reviews: PendingReview[] = data
    ? data
    : Array.isArray(apiData)
    ? apiData
    : [];
  if (!isLoading && reviews.length === 0) {
    reviews = generateDummyReviews();
  }

  return isLoading ? (
    <div className="p-4">Loading pending reviews...</div>
  ) : isError ? (
    <div className="p-4 text-red-600">
      Error loading pending reviews.{" "}
      <button onClick={() => refetch()} className="underline">
        Retry
      </button>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Documents Awaiting Review Assignment
        </h3>
        <p className="text-sm text-gray-600">
          Select documents to assign reviewers
        </p>
      </div>
      <div className="overflow-x-auto pb-3 mx-6">
        <DataTable
          columns={pendingReviewColumns}
          data={reviews}
          filterColumns={["documentTitle", "authorFullName", "departmentName"]}
          filterPlaceholder="Search pending reviews..."
          getRowId={(row) => row.documentId}
        />
      </div>
    </div>
  );
};

export default PendingReviewsTable;
