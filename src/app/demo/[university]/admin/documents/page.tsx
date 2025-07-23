"use client";

// import MainLayout from "@/components/layout/MainLayout";
import { columns, Payment } from "@/components/dashboard/Columns";
import { documentColumns } from "@/components/dashboard/DocumentsColumns";
import { DataTable } from "@/components/dashboard/TableComponent";
import { fetchTenantInfo } from "@/lib/api/tenantCalls";
import Link from "next/link";
import AdminDocumentsTableClient from "./AdminDocumentsTableClient";
import BulkImportDialog from "./BulkImportDialog";
import BulkExportDialog from "./BulkExportDialog";
import BulkActionsBar from "@/components/dashboard/BulkActionsBar";
import { useState } from "react";

const documents = [
  {
    id: "1",
    title:
      "Machine Learning Applications in Agricultural Yield Prediction for Rwanda",
    author: "Marie Uwimana",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Master's Thesis",
    status: "published",
    accessRights: "open_access",
    submissionDate: "2024-05-10",
    publishedDate: "2024-05-20",
    doi: "10.12345/ur.thesis.2024.001",
    downloads: 245,
    views: 1089,
    fileSize: "2.4 MB",
    plagiarismScore: 8.2,
    reviewStatus: "approved",
  },
  {
    id: "2",
    title:
      "Deep Learning Frameworks for Natural Language Processing in Kinyarwanda",
    author: "Dr. Jean Mukiza",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Research Article",
    status: "published",
    accessRights: "open_access",
    submissionDate: "2024-04-18",
    publishedDate: "2024-04-28",
    doi: "10.12345/ur.article.2024.002",
    downloads: 189,
    views: 756,
    fileSize: "1.8 MB",
    plagiarismScore: 5.1,
    reviewStatus: "approved",
  },
  {
    id: "3",
    title: "Smart Grid Implementation for Rural Electrification in Rwanda",
    author: "Pierre Nkurunziza",
    faculty: "Engineering",
    department: "Electrical Engineering",
    type: "Master's Thesis",
    status: "under_review",
    accessRights: "restricted",
    submissionDate: "2024-06-02",
    publishedDate: null,
    doi: null,
    downloads: 0,
    views: 34,
    fileSize: "3.1 MB",
    plagiarismScore: 12.4,
    reviewStatus: "pending",
  },
  {
    id: "4",
    title: "Sustainable Water Management Systems in Urban Rwanda",
    author: "Grace Munyangendo",
    faculty: "Science",
    department: "Environmental Science",
    type: "PhD Dissertation",
    status: "published",
    accessRights: "open_access",
    submissionDate: "2024-03-22",
    publishedDate: "2024-04-05",
    doi: "10.12345/ur.phd.2024.003",
    downloads: 312,
    views: 987,
    fileSize: "4.2 MB",
    plagiarismScore: 6.8,
    reviewStatus: "approved",
  },
  {
    id: "5",
    title: "Traditional Medicine Integration in Modern Healthcare Systems",
    author: "Dr. Emmanuel Nsanzimana",
    faculty: "Medicine",
    department: "Public Health",
    type: "Research Article",
    status: "pending_plagiarism",
    accessRights: "private",
    submissionDate: "2024-06-05",
    publishedDate: null,
    doi: null,
    downloads: 0,
    views: 5,
    fileSize: "2.1 MB",
    plagiarismScore: null,
    reviewStatus: "pending",
  },
  {
    id: "6",
    title: "Blockchain Technology Applications in Rwanda's Financial Sector",
    author: "Peter Nkurunziza",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Master's Thesis",
    status: "pending_doi",
    accessRights: "restricted",
    submissionDate: "2024-05-28",
    publishedDate: null,
    doi: null,
    downloads: 0,
    views: 23,
    fileSize: "2.8 MB",
    plagiarismScore: 9.7,
    reviewStatus: "approved",
  },
];

export default function AdminDocumentManagementPage() {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  console.log(selectedDocuments);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Document Management
          </h1>
          <p className="text-gray-600">
            Manage all repository documents and metadata
          </p>
        </div>
        <div className="flex space-x-3">
          <BulkExportDialog />
          {/* <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            Bulk Import
          </button> */}
          <BulkImportDialog />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Documents
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {documents.length}
              </p>
            </div>
            <div className="text-2xl">📄</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {documents.filter((d) => d.status === "published").length}
              </p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-blue-600">
                {documents.filter((d) => d.status === "under_review").length}
              </p>
            </div>
            <div className="text-2xl">👁️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Actions
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {documents.filter((d) => d.status !== "published").length}
              </p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="container mx-auto py-10">
        <DataTable
          columns={documentColumns}
          data={documents}
          onSelectionChange={setSelectedDocuments}
          getRowId={(row) => row.id}
          showSelection={true}
        />
        <BulkActionsBar
          selectedDocuments={selectedDocuments}
          onSelectionChange={setSelectedDocuments}
        />
      </div>

      <AdminDocumentsTableClient />

      {/* Bulk Actions Bar */}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing 1 to {documents.length} of 247 documents
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
