import React from "react";
import { DataTable } from "./TableComponent";
import { reviewerColumns } from "./ReviewerColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewers, Reviewer } from "@/lib/api/reviewCalls";
import { useUserStore } from "@/store/userStore";

function generateDummyReviewers(): Reviewer[] {
  const reviewers = [
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

  return reviewers;
}

interface ReviewersTableProps {
  data?: Reviewer[];
}

const ReviewersTable: React.FC<ReviewersTableProps> = ({ data }) => {
  const tenantId = useUserStore((s) => s.tenantId) || "";
  const {
    data: apiData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviewers", tenantId],
    queryFn: () => fetchReviewers(tenantId),
    enabled: !data && !!tenantId,
  });

  let reviewers: Reviewer[] = data
    ? data
    : Array.isArray(apiData)
    ? apiData
    : [];

  if (!isLoading && reviewers.length === 0) {
    reviewers = generateDummyReviewers();
  }

  return isLoading ? (
    <div className="p-4">Loading reviewers...</div>
  ) : isError ? (
    <div className="p-4 text-red-600">
      Error loading reviewers.{" "}
      <button onClick={() => refetch()} className="underline">
        Retry
      </button>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Available Reviewers
        </h3>
        <p className="text-sm text-gray-600">
          Current reviewer pool and availability
        </p>
      </div>
      <div className="overflow-x-auto pb-3 mx-6">
        <DataTable
          columns={reviewerColumns}
          data={reviewers}
          filterColumns={["fullName", "department", "email"]}
          filterPlaceholder="Search reviewers..."
          getRowId={(row) => row.userId}
          showColumnToggle={false}
          showPagination={false}
        />
      </div>
    </div>
  );
};

export default ReviewersTable;
