"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditDocumentDialog from "@/components/dashboard/EditDocumentDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as documentCalls from "@/lib/api/documentCalls";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// Document type
export type Document = {
  id: string;
  title: string;
  author: string;
  faculty: string;
  department: string;
  type: string;
  status: string;
  accessRights: string;
  submissionDate: string;
  publishedDate: string | null;
  doi: string | null;
  downloads: number;
  views: number;
  fileSize: string;
  plagiarismScore: number | null;
  reviewStatus: string;
};

// Helper badge functions (copy from your page or import)
function getStatusBadge(status: string) {
  const statusConfig = {
    published: { color: "bg-green-100 text-green-800", label: "Published" },
    under_review: { color: "bg-blue-100 text-blue-800", label: "Under Review" },
    pending_plagiarism: {
      color: "bg-yellow-100 text-yellow-800",
      label: "Plagiarism Check",
    },
    pending_doi: {
      color: "bg-purple-100 text-purple-800",
      label: "Pending DOI",
    },
    draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
    rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

function getAccessBadge(accessRights: string) {
  const accessConfig = {
    open_access: { color: "bg-green-100 text-green-800", label: "Open" },
    restricted: { color: "bg-yellow-100 text-yellow-800", label: "Restricted" },
    private: { color: "bg-red-100 text-red-800", label: "Private" },
  };
  const config = accessConfig[accessRights as keyof typeof accessConfig];
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}
    >
      {config?.label}
    </span>
  );
}

function getPlagiarismBadge(score: number | null) {
  if (score === null)
    return <span className="text-gray-500 text-sm">Pending</span>;
  if (score <= 10) {
    return (
      <span className="text-green-600 text-sm font-medium">{score}% ✓</span>
    );
  } else if (score <= 20) {
    return (
      <span className="text-yellow-600 text-sm font-medium">{score}% ⚠️</span>
    );
  } else {
    return (
      <span className="text-red-600 text-sm font-medium">{score}% ❌</span>
    );
  }
}

export const documentColumns: ColumnDef<Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mr-4"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorFn: (doc) =>
      `${doc.title} ${doc.author} ${doc.faculty} ${doc.type}`,
    id: "document",
    header: "Document",
    enableGlobalFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      const search = filterValue?.toLowerCase() ?? "";
      return value.toLowerCase().includes(search);
    },
    cell: ({ row }) => {
      const doc = row.original;
      return (
        <div className="max-w-md">
          <Link
            href={`/demo/alu/documents/${doc.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 line-clamp-2 break-words"
          >
            {doc.title}
          </Link>
          <div className="text-sm text-gray-500 mt-1">
            by {doc.author} • {doc.faculty} • {doc.type}
          </div>
          <div className="flex items-center space-x-2 mt-2">
            {getAccessBadge(doc.accessRights)}
            {doc.doi && (
              <span className="text-xs text-blue-600">DOI: {doc.doi}</span>
            )}
          </div>
        </div>
      );
    },
    size: 220,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const doc = row.original;
      return (
        <div className="space-y-1 mr-5">
          {getStatusBadge(doc.status)}
          <div className="text-xs text-gray-500">
            Submitted: {doc.submissionDate}
          </div>
          {doc.publishedDate && (
            <div className="text-xs text-gray-500">
              Published: {doc.publishedDate}
            </div>
          )}
        </div>
      );
    },
    size: 180,
  },
  {
    accessorKey: "plagiarismScore",
    header: "Plagiarism",
    enableGlobalFilter: false,
    cell: ({ row }) => getPlagiarismBadge(row.original.plagiarismScore),
    size: 100,
  },
  {
    id: "metrics",
    header: "Metrics",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const doc = row.original;
      return (
        <div className="text-sm space-y-1">
          <div>📥 {doc.downloads} downloads</div>
          <div>👁️ {doc.views} views</div>
          <div className="text-xs text-gray-500">{doc.fileSize}</div>
        </div>
      );
    },
    size: 120,
  },
  {
    id: "actions",
    header: "Actions",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const doc = row.original;
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
      const queryClient = useQueryClient();
      const deleteMutation = useMutation({
        mutationFn: async () => documentCalls.deleteDocument(doc.id),
        onSuccess: () => {
          toast.success("Document deleted successfully");
          setDeleteDialogOpen(false);
          queryClient.invalidateQueries({ queryKey: ["tenantDocuments"] });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.detail || "Failed to delete document"
          );
        },
      });
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <EditDocumentDialog document={doc} asText />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 hover:text-red-800"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Delete Confirmation Dialog rendered outside the menu */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="bg-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-red-700">
                  Confirm Delete
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete
                  <span
                    className="block font-bold text-gray-900 truncate max-w-xs mt-1"
                    title={doc.title}
                  >
                    {doc.title}
                  </span>
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={deleteMutation.status === "pending"}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.status === "pending"}
                >
                  {deleteMutation.status === "pending"
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
    size: 180,
  },
];
