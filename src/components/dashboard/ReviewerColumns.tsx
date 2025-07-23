import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Reviewer } from "@/lib/api/reviewCalls";

export const reviewerColumns: ColumnDef<Reviewer>[] = [
  {
    accessorKey: "fullName",
    header: "Reviewer",
    cell: ({ row }) => {
      const reviewer = row.original;
      return (
        <div>
          <div className="font-medium text-gray-900">{reviewer.fullName}</div>
          <div className="text-sm text-gray-500">{reviewer.email}</div>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const reviewer = row.original;
      return (
        <div className="text-sm text-gray-700">
          {reviewer.department || "Not specified"}
        </div>
      );
    },
    size: 150,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      // Generate random status between "Available" and "Busy"
      const statuses = ["Available", "Busy"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      const getStatusColor = (status: string) => {
        return status === "Available"
          ? "text-green-600 bg-green-100"
          : "text-orange-600 bg-orange-100";
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            randomStatus
          )}`}
        >
          {randomStatus}
        </span>
      );
    },
    size: 100,
  },
];
