import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "../ui/button";
import PendingReviewViewDialog from "./PendingReviewViewDialog";
import PendingReviewAssignDialog from "./PendingReviewAssignDialog";
import { AssignedReviewer } from "@/lib/api/reviewCalls";

export type PendingReview = {
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
};

export const pendingReviewColumns: ColumnDef<PendingReview>[] = [
  {
    accessorKey: "documentTitle",
    header: "Document",
    cell: ({ row }) => {
      const doc = row.original;
      return (
        <div className="max-w-md">
          <Link
            href={`/demo/alu/documents/${doc.documentId}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 line-clamp-2 break-words"
          >
            {doc.documentTitle}
          </Link>
          <div className="text-xs text-gray-500 mt-1">{doc.departmentName}</div>
          <div
            className="text-xs text-gray-700 mt-2 truncate"
            style={{
              maxWidth: 320,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {doc.documentAbstract}
          </div>
        </div>
      );
    },
    size: 220,
  },
  {
    accessorKey: "authorFullName",
    header: "Author",
    cell: ({ row }) => {
      const doc = row.original;
      return (
        <div>
          <div className="font-medium text-gray-900">{doc.authorFullName}</div>
          <div className="text-sm text-gray-500">{doc.departmentName}</div>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const doc = row.original;
      const needed = doc.reviewersNeeded - doc.reviewersAssigned;
      return (
        <div className="flex flex-col text-xs text-gray-500">
          <div>
            {doc.reviewersAssigned} / {doc.reviewersNeeded} reviewers
          </div>
          {needed > 0 && (
            <div className="text-orange-600">
              Needs {needed} more reviewer(s)
            </div>
          )}
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "dateSubmitted",
    header: "Submitted",
    cell: ({ row }) => (
      <span className="text-xs text-gray-500">
        {new Date(row.original.dateSubmitted).toLocaleDateString()}
      </span>
    ),
    size: 80,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const doc = row.original;
      const [openAssign, setOpenAssign] = useState(false);
      const [openView, setOpenView] = useState(false);
      const hasReviewers = doc.assignedReviewers.length > 0;
      // Prevent modal from opening if no reviewers are assigned
      const handleViewClick = () => {
        if (hasReviewers) setOpenView(true);
      };
      return (
        <div className="flex space-x-2">
          <PendingReviewAssignDialog
            review={doc}
            open={openAssign}
            onOpenChange={setOpenAssign}
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
            style={{ minWidth: 110 }}
            onClick={() => setOpenAssign(true)}
            type="button"
          >
            Assign Reviewers
          </button>
          <PendingReviewViewDialog
            review={doc}
            open={openView && hasReviewers}
            onOpenChange={setOpenView}
          />
          <button
            className={`text-gray-600 hover:text-gray-800 px-3 py-1 border rounded text-sm ${
              !hasReviewers ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ minWidth: 60 }}
            onClick={handleViewClick}
            disabled={!hasReviewers}
            type="button"
          >
            View
          </button>
        </div>
      );
    },
    size: 120,
  },
];
