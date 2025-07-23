"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/api/userCalls";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/lib/api/userCalls";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

const roleConfig: Record<string, { color: string; label: string }> = {
  admin: { color: "bg-purple-100 text-purple-800", label: "Admin" },
  reviewer: { color: "bg-blue-100 text-blue-800", label: "Reviewer" },
  regular: { color: "bg-green-100 text-green-800", label: "Regular" },
};

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: "fullName",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      const initials = `${user.firstName?.[0] || ""}${
        user.lastName?.[0] || ""
      }`.toUpperCase();
      return (
        <div className="flex items-center">
          <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm mr-4">
            {initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      );
    },
    size: 220,
  },
  {
    accessorKey: "role",
    header: "Role & Faculty",
    cell: ({ row }) => {
      const user = row.original;
      const role = user.role?.toLowerCase() || "regular";
      const config = roleConfig[role] || roleConfig["regular"];
      return (
        <div className="space-y-1">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
          >
            {config.label}
          </span>
          {user.facultyId && (
            <div className="text-sm text-gray-500">
              Faculty: {user.facultyId}
            </div>
          )}
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "createdAt",
    header: "Registered",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="space-y-1">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
          <div className="text-xs text-gray-500">
            Registered:{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "-"}
          </div>
        </div>
      );
    },
    size: 120,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
      const queryClient = useQueryClient();
      const deleteMutation = useMutation({
        mutationFn: () => deleteUser(user.userId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setDeleteDialogOpen(false);
        },
      });
      return (
        <div className="flex space-x-2 items-center">
          <Link
            href={`#`}
            className="text-green-600 hover:text-green-800 text-sm font-medium px-2 py-1 inline-flex items-center"
            style={{ minHeight: 32 }}
          >
            View Profile
          </Link>
          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    size: 100,
  },
];
