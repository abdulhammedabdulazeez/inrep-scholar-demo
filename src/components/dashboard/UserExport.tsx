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
import { useMutation } from "@tanstack/react-query";
import { exportUsers } from "@/lib/api/userCalls";
import { Download, AlertCircle } from "lucide-react";

const UserExport: React.FC = () => {
  const [exportOpen, setExportOpen] = useState(false);

  // Export mutation
  const exportMutation = useMutation({
    mutationFn: exportUsers,
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `users_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setExportOpen(false);
    },
    onError: (error) => {
      alert("Failed to export users. Please try again.");
    },
  });

  const handleExport = () => {
    exportMutation.mutate();
  };

  return (
    <>
      <Button
        onClick={() => setExportOpen(true)}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Users
      </Button>
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle>Export Users</DialogTitle>
            <DialogDescription>
              Export all users to a CSV file. The file will include user
              details, roles, and department information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <div className="text-sm text-blue-800">
                The export will include all users in your tenant with their
                complete profile information.
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExportOpen(false)}
              disabled={exportMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={exportMutation.isPending}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {exportMutation.isPending ? "Exporting..." : "Export Users"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserExport;
