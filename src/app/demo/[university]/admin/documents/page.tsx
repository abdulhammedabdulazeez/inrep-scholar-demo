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
import { DocumentDetail } from "@/lib/documentTypes";

const documents: DocumentDetail[] = [
  {
    document: {
      document_id: "1",
      tenant_id: "tenant-1",
      author: "Marie Uwimana",
      faculty_id: "1",
      department_id: "1",
      title:
        "Machine Learning Applications in Agricultural Yield Prediction for Rwanda",
      file_url: "/documents/1.pdf",
      status: "published",
      abstract:
        "This research explores machine learning applications in agricultural yield prediction...",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.thesis.2024.001",
      plagiarism_score: 8.2,
      created_at: "2024-05-10T00:00:00Z",
      updated_at: "2024-05-20T00:00:00Z",
    },
    faculty: { faculty_id: "1", name: "Engineering" },
    department: { department_id: "1", name: "Computer Science" },
    download_count: 245,
    view_count: 1089,
    comments: [],
    reviews: [
      {
        document_review_id: "1",
        document_id: "1",
        reviewer_id: "1",
        status: "approved",
        assigned_at: "2024-05-15T00:00:00Z",
        due_date: "2024-05-25T00:00:00Z",
        created_at: "2024-05-15T00:00:00Z",
        updated_at: "2024-05-18T00:00:00Z",
      },
    ],
  },
  {
    document: {
      document_id: "2",
      tenant_id: "tenant-1",
      author: "Dr. Jean Mukiza",
      faculty_id: "1",
      department_id: "1",
      title:
        "Deep Learning Frameworks for Natural Language Processing in Kinyarwanda",
      file_url: "/documents/2.pdf",
      status: "published",
      abstract:
        "This study investigates deep learning frameworks for NLP in Kinyarwanda...",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.article.2024.002",
      plagiarism_score: 5.1,
      created_at: "2024-04-18T00:00:00Z",
      updated_at: "2024-04-28T00:00:00Z",
    },
    faculty: { faculty_id: "1", name: "Engineering" },
    department: { department_id: "1", name: "Computer Science" },
    download_count: 189,
    view_count: 756,
    comments: [],
    reviews: [
      {
        document_review_id: "2",
        document_id: "2",
        reviewer_id: "1",
        status: "approved",
        assigned_at: "2024-04-20T00:00:00Z",
        due_date: "2024-04-30T00:00:00Z",
        created_at: "2024-04-20T00:00:00Z",
        updated_at: "2024-04-25T00:00:00Z",
      },
    ],
  },
  {
    document: {
      document_id: "3",
      tenant_id: "tenant-1",
      author: "Pierre Nkurunziza",
      faculty_id: "1",
      department_id: "2",
      title: "Smart Grid Implementation for Rural Electrification in Rwanda",
      file_url: "/documents/3.pdf",
      status: "under_review",
      abstract:
        "This research examines smart grid implementation for rural electrification...",
      is_public: true,
      is_read_only: true,
      doi_link: undefined,
      plagiarism_score: 12.4,
      created_at: "2024-06-02T00:00:00Z",
      updated_at: "2024-06-02T00:00:00Z",
    },
    faculty: { faculty_id: "1", name: "Engineering" },
    department: { department_id: "2", name: "Electrical Engineering" },
    download_count: 0,
    view_count: 34,
    comments: [],
    reviews: [
      {
        document_review_id: "3",
        document_id: "3",
        reviewer_id: "1",
        status: "pending",
        assigned_at: "2024-06-05T00:00:00Z",
        due_date: "2024-06-15T00:00:00Z",
        created_at: "2024-06-05T00:00:00Z",
        updated_at: "2024-06-05T00:00:00Z",
      },
    ],
  },
  {
    document: {
      document_id: "4",
      tenant_id: "tenant-1",
      author: "Grace Munyangendo",
      faculty_id: "2",
      department_id: "3",
      title: "Sustainable Water Management Systems in Urban Rwanda",
      file_url: "/documents/4.pdf",
      status: "published",
      abstract:
        "This study explores sustainable water management systems in urban Rwanda...",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.phd.2024.003",
      plagiarism_score: 6.8,
      created_at: "2024-03-22T00:00:00Z",
      updated_at: "2024-04-05T00:00:00Z",
    },
    faculty: { faculty_id: "2", name: "Science" },
    department: { department_id: "3", name: "Environmental Science" },
    download_count: 312,
    view_count: 987,
    comments: [],
    reviews: [
      {
        document_review_id: "4",
        document_id: "4",
        reviewer_id: "1",
        status: "approved",
        assigned_at: "2024-03-25T00:00:00Z",
        due_date: "2024-04-05T00:00:00Z",
        created_at: "2024-03-25T00:00:00Z",
        updated_at: "2024-04-01T00:00:00Z",
      },
    ],
  },
  {
    document: {
      document_id: "5",
      tenant_id: "tenant-1",
      author: "Dr. Emmanuel Nsanzimana",
      faculty_id: "3",
      department_id: "4",
      title: "Traditional Medicine Integration in Modern Healthcare Systems",
      file_url: "/documents/5.pdf",
      status: "pending_plagiarism",
      abstract:
        "This research investigates traditional medicine integration in modern healthcare...",
      is_public: false,
      is_read_only: true,
      doi_link: undefined,
      plagiarism_score: undefined,
      created_at: "2024-06-05T00:00:00Z",
      updated_at: "2024-06-05T00:00:00Z",
    },
    faculty: { faculty_id: "3", name: "Medicine" },
    department: { department_id: "4", name: "Public Health" },
    download_count: 0,
    view_count: 5,
    comments: [],
    reviews: [
      {
        document_review_id: "5",
        document_id: "5",
        reviewer_id: "1",
        status: "pending",
        assigned_at: "2024-06-08T00:00:00Z",
        due_date: "2024-06-18T00:00:00Z",
        created_at: "2024-06-08T00:00:00Z",
        updated_at: "2024-06-08T00:00:00Z",
      },
    ],
  },
  {
    document: {
      document_id: "6",
      tenant_id: "tenant-1",
      author: "Peter Nkurunziza",
      faculty_id: "1",
      department_id: "1",
      title: "Blockchain Technology Applications in Rwanda's Financial Sector",
      file_url: "/documents/6.pdf",
      status: "pending_doi",
      abstract:
        "This study examines blockchain technology applications in Rwanda's financial sector...",
      is_public: true,
      is_read_only: true,
      doi_link: undefined,
      plagiarism_score: 9.7,
      created_at: "2024-05-28T00:00:00Z",
      updated_at: "2024-05-28T00:00:00Z",
    },
    faculty: { faculty_id: "1", name: "Engineering" },
    department: { department_id: "1", name: "Computer Science" },
    download_count: 0,
    view_count: 23,
    comments: [],
    reviews: [
      {
        document_review_id: "6",
        document_id: "6",
        reviewer_id: "1",
        status: "approved",
        assigned_at: "2024-06-01T00:00:00Z",
        due_date: "2024-06-11T00:00:00Z",
        created_at: "2024-06-01T00:00:00Z",
        updated_at: "2024-06-05T00:00:00Z",
      },
    ],
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
                {
                  documents.filter((d) => d.document.status === "published")
                    .length
                }
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
                {
                  documents.filter((d) => d.document.status === "under_review")
                    .length
                }
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
                {
                  documents.filter((d) => d.document.status !== "published")
                    .length
                }
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
          getRowId={(row) => row.document.document_id}
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
