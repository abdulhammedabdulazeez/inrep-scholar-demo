"use client";

// import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { useState } from "react";
import ReviewSummaryCardsSection from "@/components/dashboard/ReviewSummaryCardsSection";
import PendingReviewsTable from "@/components/dashboard/PendingReviewsTable";
import ReviewersTable from "@/components/dashboard/ReviewersTable";

const pendingDocuments = [
  {
    id: "3",
    title: "Smart Grid Implementation for Rural Electrification in Rwanda",
    author: "Pierre Nkurunziza",
    faculty: "Engineering",
    department: "Electrical Engineering",
    type: "Master's Thesis",
    submissionDate: "2024-06-02",
    abstract:
      "Investigation of smart grid technologies for improving rural electrification in Rwanda with focus on renewable energy integration and grid stability...",
    plagiarismScore: 12.4,
    fileSize: "3.1 MB",
    assignedReviewers: [],
    reviewsNeeded: 2,
    priority: "high",
  },
  {
    id: "6",
    title: "Blockchain Technology Applications in Rwanda's Financial Sector",
    author: "Peter Nkurunziza",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Master's Thesis",
    submissionDate: "2024-05-28",
    abstract:
      "Analysis of blockchain implementation opportunities in Rwanda's emerging fintech ecosystem and regulatory considerations for adoption...",
    plagiarismScore: 9.7,
    fileSize: "2.8 MB",
    assignedReviewers: ["Dr. Jean Mukiza"],
    reviewsNeeded: 2,
    priority: "medium",
  },
  {
    id: "7",
    title: "Sustainable Tourism Development in Post-Genocide Rwanda",
    author: "Alice Uwimana",
    faculty: "Business",
    department: "Tourism Management",
    type: "Master's Thesis",
    submissionDate: "2024-06-01",
    abstract:
      "Comprehensive analysis of sustainable tourism strategies and their economic impact on Rwanda's development goals...",
    plagiarismScore: 7.2,
    fileSize: "2.1 MB",
    assignedReviewers: [],
    reviewsNeeded: 2,
    priority: "medium",
  },
];

export default function ReviewerAssignmentPage() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
  const [reviewDeadline, setReviewDeadline] = useState("");

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", label: "High Priority" },
      medium: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Medium Priority",
      },
      low: { color: "bg-green-100 text-green-800", label: "Low Priority" },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const handleAssignReviewers = () => {
    if (!selectedDocument || selectedReviewers.length === 0) return;

    // Mock assignment process
    alert(
      `Assigned ${selectedReviewers.length} reviewer(s) to document. Email notifications sent.`
    );
    setShowAssignModal(false);
    setSelectedDocument(null);

    setReviewDeadline("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reviewer Assignment
          </h1>
          <p className="text-gray-600">
            Assign reviewers to pending documents for peer evaluation
          </p>
        </div>
        {/* <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              📊 Review Analytics
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              👥 Manage Reviewers
            </button>
          </div> */}
      </div>

      {/* Summary Cards */}
      <ReviewSummaryCardsSection />

      {/* Pending Documents */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Documents Awaiting Review Assignment
          </h3>
          <p className="text-sm text-gray-600">
            Select documents to assign reviewers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author & Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <Link
                        href={`/demo/alu/documents/${doc.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 line-clamp-2"
                      >
                        {doc.title}
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">
                        {doc.type} • {doc.fileSize}
                      </div>
                      <div className="text-xs text-gray-700 mt-2 line-clamp-2">
                        {doc.abstract}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {doc.author}
                      </div>
                      <div className="text-sm text-gray-500">{doc.faculty}</div>
                      <div className="text-sm text-gray-500">
                        {doc.department}
                      </div>
                      <div className="text-xs text-gray-500">
                        Submitted: {doc.submissionDate}
                      </div>
                      <div className="text-xs text-green-600">
                        Plagiarism: {doc.plagiarismScore}% ✓
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">
                          {doc.assignedReviewers.length}
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          / {doc.reviewsNeeded} reviewers
                        </span>
                      </div>
                      {doc.assignedReviewers.length > 0 && (
                        <div className="space-y-1">
                          {doc.assignedReviewers.map((reviewer, index) => (
                            <div
                              key={index}
                              className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded"
                            >
                              {reviewer}
                            </div>
                          ))}
                        </div>
                      )}
                      {doc.assignedReviewers.length < doc.reviewsNeeded && (
                        <div className="text-xs text-orange-600">
                          Needs{" "}
                          {doc.reviewsNeeded - doc.assignedReviewers.length}{" "}
                          more reviewer(s)
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(doc.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDocument(doc.id);
                          setShowAssignModal(true);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                      >
                        Assign Reviewers
                      </button>
                      <Link
                        href={`/demo/alu/documents/${doc.id}`}
                        className="text-gray-600 hover:text-gray-800 px-3 py-1 border rounded text-sm"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Reviews Table */}
      <PendingReviewsTable />

      {/* Available Reviewers Table */}
      <ReviewersTable />
    </div>
  );
}
