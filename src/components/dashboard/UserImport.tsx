"use client";
import React, { useState, useRef } from "react";
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
import { bulkImportUsers, BulkUserImportResult } from "@/lib/api/userCalls";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";

interface UserImportProps {
  onImportSuccess?: () => void;
}

const UserImport: React.FC<UserImportProps> = ({ onImportSuccess }) => {
  const [importOpen, setImportOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResults, setImportResults] = useState<BulkUserImportResult[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Import mutation
  const importMutation = useMutation({
    mutationFn: (file: File) => bulkImportUsers(file),
    onSuccess: (results) => {
      setImportResults(results);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onImportSuccess?.();
    },
    onError: (error) => {
      setImportResults([
        {
          email: "Import Error",
          status: "error",
          detail: "Failed to import users. Please try again.",
        },
      ]);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      importMutation.mutate(selectedFile);
    }
  };

  const resetImport = () => {
    setSelectedFile(null);
    setImportResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getStatusIcon = (status: "success" | "error") => {
    return status === "success" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusColor = (status: "success" | "error") => {
    return status === "success" ? "text-green-600" : "text-red-600";
  };

  const successCount = importResults.filter(
    (r) => r.status === "success"
  ).length;
  const errorCount = importResults.filter((r) => r.status === "error").length;

  return (
    <>
      <Button
        onClick={() => setImportOpen(true)}
        className="bg-green-600 text-white hover:bg-green-700"
      >
        <Upload className="h-4 w-4 mr-2" />
        Import Users
      </Button>
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Users from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file to bulk import users. The file should contain
              columns: email, first_name, role, last_name (optional), faculty_id
              (optional), department_id (optional).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* File Upload */}
            {importResults.length === 0 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    CSV file only (max 10MB)
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    disabled={importMutation.isPending}
                  >
                    Choose File
                  </Button>
                </div>

                {selectedFile && (
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-blue-600">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}

                {/* CSV Template */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    CSV Template
                  </h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Required columns: email, first_name, role</div>
                    <div>
                      Optional columns: last_name, faculty_id, department_id
                    </div>
                    <div className="mt-2">
                      <strong>Valid roles:</strong> admin, faculty, student,
                      staff
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Import Results */}
            {importResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Import Results</h4>
                  <Button onClick={resetImport} variant="outline" size="sm">
                    Import Another File
                  </Button>
                </div>

                {/* Summary */}
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {successCount} successful
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">
                      {errorCount} failed
                    </span>
                  </div>
                </div>

                {/* Results List */}
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {importResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        result.status === "success"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div
                          className={`text-sm font-medium ${getStatusColor(
                            result.status
                          )}`}
                        >
                          {result.email}
                        </div>
                        {result.detail && (
                          <div className="text-xs text-gray-600 mt-1">
                            {result.detail}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setImportOpen(false);
                resetImport();
              }}
              disabled={importMutation.isPending}
            >
              Close
            </Button>
            {importResults.length === 0 && selectedFile && (
              <Button
                onClick={handleImport}
                disabled={importMutation.isPending}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                {importMutation.isPending ? "Importing..." : "Import Users"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserImport;
