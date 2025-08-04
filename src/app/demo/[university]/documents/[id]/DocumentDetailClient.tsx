"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useGeneralStore } from "@/store/generalStore";
import { useMockDocumentDetails } from "@/hooks/useMockDocumentDetails";
import { Button } from "@/components/ui/button";

// Helper function to get access badge
function getAccessBadge(accessRights: string) {
  switch (accessRights) {
    case "open_access":
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          Open Access
        </span>
      );
    case "restricted":
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
          Restricted
        </span>
      );
    case "private":
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          Private
        </span>
      );
    default:
      return null;
  }
}

// Helper function to check if user can view full text
function canViewFullText(accessRights: string, userRole?: string) {
  if (userRole === "admin") return true;
  if (
    (userRole === "regular" || userRole === "reviewer") &&
    accessRights !== "private"
  )
    return true;
  if (
    (userRole === "guest" || userRole === undefined) &&
    accessRights === "open_access"
  )
    return true;
  return false;
}

export default function DocumentDetailClient() {
  const params = useParams();
  const documentId = params.id as string;
  const userRole = useUserStore((state) => state?.role || undefined);
  const uniName = useGeneralStore((state) => state.affiliatedUni);

  const {
    data: document,
    isLoading,
    error,
  } = useMockDocumentDetails(documentId);

  // Fallback dummy document for development
  const dummyDocument = {
    document: {
      document_id: documentId,
      tenant_id: "tenant-1",
      author: "Marie Uwimana",
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      department_id: "dept-1",
      title:
        "Machine Learning Applications in Agricultural Yield Prediction for Rwanda",
      file_url: "/documents/1.pdf",
      status: "published",
      abstract:
        "This research explores machine learning applications in agricultural yield prediction for Rwanda's farming sector. The study investigates various algorithms including Random Forest, Support Vector Machines, and Neural Networks to predict crop yields based on environmental factors, soil conditions, and historical data. Results show significant improvements in prediction accuracy compared to traditional methods, with potential applications for food security and sustainable agriculture in the region.",
      is_public: true,
      is_read_only: false,
      doi_link: "10.12345/ur.thesis.2024.001",
      plagiarism_score: 8.2,
      created_at: "2024-05-10T00:00:00Z",
      updated_at: "2024-05-20T00:00:00Z",
    },
    faculty: {
      faculty_id: "661e9315-9307-410d-84d8-62612b41d381",
      name: "Computer Science",
    },
    department: { department_id: "dept-1", name: "Software Engineering" },
    download_count: 245,
    view_count: 1089,
    comments: [
      {
        comment_id: "1",
        document_id: documentId,
        user_id: "john_doe",
        content:
          "This is a very well-researched paper with excellent methodology. The machine learning approach to agricultural yield prediction is innovative and has great potential for improving food security in Rwanda.",
        created_at: "2024-05-15T10:30:00Z",
      },
      {
        comment_id: "2",
        document_id: documentId,
        user_id: "sarah_smith",
        content:
          "I found the section on Random Forest algorithms particularly interesting. The comparison with traditional methods is well-documented. Great work!",
        created_at: "2024-05-16T14:20:00Z",
      },
    ],
    reviews: [
      {
        document_review_id: "1",
        document_id: documentId,
        reviewer_id: "dr_johnson",
        status: "approved",
        assigned_at: "2024-05-12T09:00:00Z",
        due_date: "2024-05-25T17:00:00Z",
        created_at: "2024-05-15T16:45:00Z",
        updated_at: "2024-05-18T11:30:00Z",
      },
      {
        document_review_id: "2",
        document_id: documentId,
        reviewer_id: "prof_williams",
        status: "approved",
        assigned_at: "2024-05-12T09:00:00Z",
        due_date: "2024-05-25T17:00:00Z",
        created_at: "2024-05-16T14:20:00Z",
        updated_at: "2024-05-17T10:15:00Z",
      },
    ],
  };

  // Use dummy document if API fails or returns empty
  const displayDocument = document || dummyDocument;
  const isUsingDummyDocument = !document;

  if (isLoading) {
    return null; // Suspense will handle loading
  }

  // Helper function to safely format dates
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  const accessRights = displayDocument.document.is_public
    ? displayDocument.document.is_read_only
      ? "restricted"
      : "open_access"
    : "private";

  // Log error but still show dummy document for development
  if (error && !document) {
    console.log("API Error, using dummy document:", error);
  }

  // Add development indicator if using dummy document
  if (isUsingDummyDocument) {
    console.log("🔧 Using dummy document for development");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/demo/${uniName?.subdomain || "alu"}`}
                className="flex items-center space-x-3 hover:opacity-80 transition"
              >
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {uniName?.subdomain?.toUpperCase() || "ALU"}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {uniName?.universityName || "African Leadership University"}
                  </h1>
                  <p className="text-sm text-gray-600">Document Repository</p>
                </div>
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              {userRole === "admin" ? (
                <Link
                  href={`/demo/${uniName?.subdomain || "alu"}/admin`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Admin
                </Link>
              ) : userRole ? (
                <Link
                  href={`/demo/${uniName?.subdomain || "alu"}/profile`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Profile
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/demo/${uniName?.subdomain || "alu"}/login`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href={`/demo/${uniName?.subdomain || "alu"}/register`}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Document Header Section */}
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getAccessBadge(accessRights)}
                    <span className="text-sm text-gray-500">Document</span>
                    {displayDocument.document.doi_link && (
                      <>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-blue-600">
                          DOI: {displayDocument.document.doi_link}
                        </span>
                      </>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {displayDocument.document.title}
                  </h1>

                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>Author:</strong> {displayDocument.document.author}
                    </p>
                    <p>
                      <strong>Faculty:</strong>{" "}
                      {displayDocument.faculty?.name || "Unknown"} •{" "}
                      <strong>Department:</strong>{" "}
                      {displayDocument.department?.name || "Unknown"}
                    </p>
                    <p>
                      <strong>Language:</strong> English
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {canViewFullText(accessRights, userRole) && (
                  <>
                    <Button className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition font-medium">
                      📄 View PDF
                    </Button>
                    <Button className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition font-medium">
                      ⬇️ Download PDF
                    </Button>
                  </>
                )}
              </div>

              {!canViewFullText(accessRights, userRole) && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800">
                    <strong>Access Restricted:</strong> Full text access is
                    limited.
                    <Link
                      href={`/demo/${uniName?.subdomain || "alu"}/login`}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      Sign in
                    </Link>{" "}
                    to request access or contact the author.
                  </p>
                </div>
              )}
            </div>

            {/* Abstract Section */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Abstract
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {displayDocument.document.abstract ||
                  "No abstract available for this document."}
              </p>
            </div>

            {/* Keywords Section */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Machine Learning
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Agriculture
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Yield Prediction
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Rwanda
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Food Security
                </span>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Comments ({displayDocument.comments.length})
              </h2>
              {displayDocument.comments.length > 0 ? (
                <div className="space-y-4">
                  {displayDocument.comments.map((comment) => (
                    <div
                      key={comment.comment_id}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                          {comment.user_id.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">
                              User {comment.user_id}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              )}

              {/* Add Comment Form */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                {userRole ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Add a Comment
                    </h3>
                    <div className="space-y-3">
                      <textarea
                        placeholder="Share your thoughts about this document..."
                        rows={3}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-end">
                        <Button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">💬</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          Want to comment?
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Sign in to share your thoughts about this document and
                          engage with the community.
                        </p>
                        <Link
                          href={`/demo/${uniName?.subdomain || "alu"}/login`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                        >
                          Sign In to Comment
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Document Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="ml-2 text-gray-600">
                    {displayDocument.document.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Downloads:</span>
                  <span className="ml-2 text-gray-600">
                    {displayDocument.download_count}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Views:</span>
                  <span className="ml-2 text-gray-600">
                    {displayDocument.view_count}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {formatDate(displayDocument.document.created_at)}
                  </span>
                </div>
                {displayDocument.document.updated_at &&
                  displayDocument.document.updated_at !==
                    displayDocument.document.created_at && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Updated:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {formatDate(displayDocument.document.updated_at)}
                      </span>
                    </div>
                  )}
                {displayDocument.document.plagiarism_score && (
                  <div>
                    <span className="font-medium text-gray-700">
                      Plagiarism Score:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {displayDocument.document.plagiarism_score}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Related Documents */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related Documents
              </h3>
              <div className="space-y-3">
                <div className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    <Link href="#" className="hover:text-blue-600">
                      Deep Learning Frameworks for Natural Language Processing
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-600">
                    by Dr. Jean Mukiza • Computer Science
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    <Link href="#" className="hover:text-blue-600">
                      Sustainable Agriculture Practices in East Africa
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-600">
                    by Sarah Niyonsaba • BEL
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    <Link href="#" className="hover:text-blue-600">
                      Data Analytics in Educational Technology
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-600">
                    by Emmanuel Kwizera • Computer Science
                  </p>
                </div>
              </div>
            </div>

            {/* Citation Information */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Citation
              </h3>
              <div className="bg-gray-50 p-3 rounded border text-sm">
                <p className="text-gray-700">
                  Uwimana, M. (2024). Machine Learning Applications in
                  Agricultural Yield Prediction for Rwanda. African Leadership
                  University Repository.
                </p>
                {displayDocument.document.doi_link && (
                  <p className="text-blue-600 mt-2">
                    DOI: {displayDocument.document.doi_link}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
