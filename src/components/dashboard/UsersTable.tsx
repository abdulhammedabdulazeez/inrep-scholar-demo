"use client";
import React, { useState } from "react";
import { DataTable } from "./TableComponent";
import { userColumns } from "./UserColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, User } from "@/lib/api/userCalls";
import BulkUserActionsBar from "./BulkUserActionsBar";
import CreateUserDialog from "./CreateUserDialog";

const UsersTable: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log("selectedUsers", selectedUsers);

  return isLoading ? (
    <div className="p-4">Loading users...</div>
  ) : isError ? (
    <div className="p-4 text-red-600">
      Error loading users.{" "}
      <button onClick={() => refetch()} className="underline">
        Retry
      </button>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Users</h3>
          <p className="text-sm text-gray-600">All users in your tenant</p>
        </div>
        <CreateUserDialog />
      </div>
      <div className="overflow-x-auto pb-3 mx-6">
        <DataTable
          columns={userColumns}
          data={users || []}
          filterColumns={["firstName", "lastName", "email", "role"]}
          filterPlaceholder="Search users..."
          showSelection={true}
          getRowId={(row) => row.userId}
          onSelectionChange={setSelectedUsers}
        />
      </div>
      <div className="px-6 py-4 border-b">
        <BulkUserActionsBar
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
        />
      </div>
    </div>
  );
};

export default UsersTable;
