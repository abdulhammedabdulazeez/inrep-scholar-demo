"use client";

import Link from "next/link";
import { useState } from "react";

const reviewTasks = [
  {
    id: "1",
    documentId: "11",
    title: "Smart Grid Implementation for Rural Electrification in Rwanda",
    author: "Pierre Nkurunziza",
    faculty: "Engineering",
    department: "Electrical Engineering",
    type: "Master's Thesis",
    submissionDate: "2024-06-02",
    deadline: "2024-06-16",
    status: "pending",
    abstract:
      "Investigation of smart grid technologies for improving rural electrification in Rwanda with focus on renewable energy integration and grid stability...",
    fileSize: "3.1 MB",
    pages: 78,
    assignedDate: "2024-06-03",
    priority: "high",
  },
  {
    id: "2",
    documentId: "12",
    title: "Blockchain Technology Applications in Rwanda's Financial Sector",
    author: "Alice Uwimana",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Master's Thesis",
    submissionDate: "2024-05-28",
    deadline: "2024-06-11",
    status: "in_progress",
    abstract:
      "Analysis of blockchain implementation opportunities in Rwanda's emerging fintech ecosystem and regulatory considerations for adoption...",
    fileSize: "2.8 MB",
    pages: 65,
    assignedDate: "2024-05-29",
    priority: "medium",
    progress: 60,
  },
  {
    id: "3",
    documentId: "13",
    title: "Sustainable Tourism Development in Post-Genocide Rwanda",
    author: "Emmanuel Nsanzimana",
    faculty: "Business",
    department: "Tourism Management",
    type: "PhD Dissertation",
    submissionDate: "2024-05-15",
    deadline: "2024-06-05",
    status: "completed",
    abstract:
      "Comprehensive analysis of sustainable tourism strategies and their economic impact on Rwanda's development goals...",
    fileSize: "4.2 MB",
    pages: 156,
    assignedDate: "2024-05-16",
    priority: "medium",
    completedDate: "2024-06-04",
    recommendation: "approved",
  },
];

export default function ReviewTasksPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    recommendation: "",
    comments: "",
    confidentialComments: "",
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pending Review",
      },
      in_progress: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      overdue: { color: "bg-red-100 text-red-800", label: "Overdue" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

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

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { days: Math.abs(diffDays), status: "overdue" };
    if (diffDays <= 3) return { days: diffDays, status: "urgent" };
    return { days: diffDays, status: "normal" };
  };

  const handleStartReview = (taskId: string) => {
    setSelectedTask(taskId);
    setShowReviewModal(true);
  };

  const handleSubmitReview = () => {
    // Mock review submission
    alert("Review submitted successfully!");
    setShowReviewModal(false);
    setSelectedTask(null);
    setReviewData({
      recommendation: "",
      comments: "",
      confidentialComments: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo/alu" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ALLU
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  African Leadership University
                </h1>
                <p className="text-sm text-gray-600">Review Tasks</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                href="/demo/alu/user"
                className="text-blue-600 hover:text-blue-800"
              >
                ← Dashboard
              </Link>
              <Link
                href="/demo/alu"
                className="text-gray-600 hover:text-blue-600"
              >
                Home
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  MU
                </div>
                <span className="text-sm text-gray-700">Marie Uwimana</span>
                <span className="text-xs text-gray-500">(Reviewer)</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Review Tasks</h2>
            <p className="text-gray-600">
              Manage your assigned document reviews and provide feedback to
              authors
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Reviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviewTasks.length}
                  </p>
                </div>
                <div className="text-2xl">📝</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {reviewTasks.filter((t) => t.status === "pending").length}
                  </p>
                </div>
                <div className="text-2xl">⏳</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      reviewTasks.filter((t) => t.status === "in_progress")
                        .length
                    }
                  </p>
                </div>
                <div className="text-2xl">🔄</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reviewTasks.filter((t) => t.status === "completed").length}
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </div>
          </div>

          {/* Review Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📋 Review Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Evaluation Criteria:</h4>
                <ul className="space-y-1">
                  <li>• Originality and significance of research</li>
                  <li>• Methodology and data analysis quality</li>
                  <li>• Literature review comprehensiveness</li>
                  <li>• Writing clarity and organization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Review Process:</h4>
                <ul className="space-y-1">
                  <li>• Complete reviews within 2 weeks</li>
                  <li>• Provide constructive feedback</li>
                  <li>• Use confidential comments for admin only</li>
                  <li>
                    • Recommend: Approve, Minor Revision, Major Revision, or
                    Reject
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Review Tasks List */}
          <div className="space-y-4">
            {reviewTasks.map((task) => {
              const daysInfo = getDaysRemaining(task.deadline);
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow border p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                        <span className="text-sm text-gray-500">
                          {task.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/demo/alu/documents/${task.documentId}`}
                          className="hover:text-blue-600 transition"
                        >
                          {task.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-3">
                        by <strong>{task.author}</strong> • {task.faculty} •{" "}
                        {task.department}
                      </p>

                      <p className="text-gray-700 line-clamp-2 mb-4">
                        {task.abstract}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Assigned:</span>{" "}
                          {task.assignedDate}
                        </div>
                        <div>
                          <span className="font-medium">Deadline:</span>
                          <span
                            className={`ml-1 ${
                              daysInfo.status === "overdue"
                                ? "text-red-600"
                                : daysInfo.status === "urgent"
                                ? "text-orange-600"
                                : ""
                            }`}
                          >
                            {task.deadline} ({daysInfo.days} days{" "}
                            {daysInfo.status === "overdue"
                              ? "overdue"
                              : "remaining"}
                            )
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Pages:</span>{" "}
                          {task.pages}
                        </div>
                        <div>
                          <span className="font-medium">File Size:</span>{" "}
                          {task.fileSize}
                        </div>
                      </div>

                      {task.status === "in_progress" && task.progress && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">
                              Review Progress
                            </span>
                            <span className="font-medium">
                              {task.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {task.status === "completed" && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-600 font-medium">
                              ✓ Review Completed
                            </span>
                            <span className="text-sm text-gray-600">
                              on {task.completedDate}
                            </span>
                            <span className="text-sm text-gray-600">
                              • Recommendation:{" "}
                              <strong>{task.recommendation}</strong>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Link
                        href={`/demo/alu/documents/${task.documentId}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        📄 View Document
                      </Link>
                      <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                        📥 Download PDF
                      </button>
                    </div>

                    <div className="flex items-center space-x-3">
                      {task.status === "pending" && (
                        <button
                          onClick={() => handleStartReview(task.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                        >
                          Start Review
                        </button>
                      )}
                      {task.status === "in_progress" && (
                        <button
                          onClick={() => handleStartReview(task.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
                        >
                          Continue Review
                        </button>
                      )}
                      {task.status === "completed" && (
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          View Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review Modal */}
          {showReviewModal && selectedTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submit Review
                  </h3>
                  <p className="text-sm text-gray-600">
                    Document:{" "}
                    {reviewTasks.find((t) => t.id === selectedTask)?.title}
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Recommendation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendation *
                    </label>
                    <select
                      value={reviewData.recommendation}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          recommendation: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select recommendation</option>
                      <option value="approve">Approve for Publication</option>
                      <option value="minor_revision">
                        Minor Revision Required
                      </option>
                      <option value="major_revision">
                        Major Revision Required
                      </option>
                      <option value="reject">Reject</option>
                    </select>
                  </div>

                  {/* Comments for Author */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments for Author *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      These comments will be shared with the author
                    </p>
                    <textarea
                      value={reviewData.comments}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          comments: e.target.value,
                        }))
                      }
                      rows={8}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide detailed feedback on the research quality, methodology, writing, and suggestions for improvement..."
                    />
                  </div>

                  {/* Confidential Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confidential Comments for Admin
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      These comments are only visible to administrators
                    </p>
                    <textarea
                      value={reviewData.confidentialComments}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          confidentialComments: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any confidential concerns or additional notes for administrators..."
                    />
                  </div>

                  {/* Review Checklist */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Review Checklist
                    </h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Research objectives are clearly defined
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Methodology is appropriate and well-explained
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Results are presented clearly with proper analysis
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Literature review is comprehensive and current
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Writing is clear and well-organized
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Citations and references are properly formatted
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t flex justify-end space-x-3">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={
                      !reviewData.recommendation || !reviewData.comments
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
