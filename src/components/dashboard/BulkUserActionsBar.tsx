"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateUserRoles, bulkDeleteUsers } from "@/lib/api/userCalls";

interface BulkUserActionsBarProps {
  selectedUsers: string[];
  onSelectionChange: (ids: string[]) => void;
}

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "reviewer", label: "Reviewer" },
  { value: "regular", label: "Regular" },
];

const BulkUserActionsBar: React.FC<BulkUserActionsBarProps> = ({
  selectedUsers,
  onSelectionChange,
}) => {
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("regular");
  const queryClient = useQueryClient();

  // Bulk role update mutation
  const updateRoleMutation = useMutation({
    mutationFn: (role: string) => bulkUpdateUserRoles(selectedUsers, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setRoleDialogOpen(false);
      onSelectionChange([]);
    },
  });

  // Bulk delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => bulkDeleteUsers(selectedUsers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeleteDialogOpen(false);
      onSelectionChange([]);
    },
  });

  return (
    <div className="bg-white rounded-lg shadow border p-4 flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        {selectedUsers.length === 0
          ? "Select users above to perform bulk actions"
          : `${selectedUsers.length} user(s) selected`}
      </div>
      <div className="flex space-x-3">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 text-sm"
          disabled={selectedUsers.length === 0}
          onClick={() => setRoleDialogOpen(true)}
        >
          Change Role
        </Button>
        <Button
          className="bg-red-600 text-white hover:bg-red-700 text-sm"
          disabled={selectedUsers.length === 0}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Bulk Delete
        </Button>
      </div>

      {/* Change Role Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Change Role for Selected Users</DialogTitle>
            <DialogDescription>
              Select a new role to assign to the selected users.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              disabled={updateRoleMutation.isPending}
            >
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRoleDialogOpen(false)}
              disabled={updateRoleMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => updateRoleMutation.mutate(selectedRole)}
              disabled={updateRoleMutation.isPending}
            >
              {updateRoleMutation.isPending ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Bulk Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUsers.length} user(s)?
              This action cannot be undone.
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
              {deleteMutation.isPending ? "Deleting..." : "Delete Users"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkUserActionsBar;
