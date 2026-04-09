"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/userStore";
import { useGeneralStore } from "@/store/generalStore";
import { useDocumentDetails } from "@/hooks/useDocumentDetails";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  buildDocumentViewerHref,
} from "@/lib/documentViewer";
import {
  getDocumentAuthorLabel,
  isExternalDocumentAuthor,
} from "@/lib/documentAuthor";

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
  const router = useRouter();
  const documentId = params.id as string;
  const userRole = useUserStore((state) => state?.role || undefined);
  const uniName = useGeneralStore((state) => state.affiliatedUni);

  const {
    data: document,
    isLoading,
    error,
  } = useDocumentDetails(documentId);

  const [pdfBusy, setPdfBusy] = useState<"view" | "download" | null>(null);
  const [agreementOpen, setAgreementOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
          <h1 className="text-lg font-semibold">Could not load document</h1>
          <p className="mt-2 text-sm">
            {error instanceof Error ? error.message : "Request failed."} You may
            need to sign in, or the document may not exist.
          </p>
          <Link
            href={`/demo/${uniName?.subdomain || "alu"}/search`}
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const displayDocument = document;
  const authorLabel = getDocumentAuthorLabel(displayDocument.document);

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

  const comments = displayDocument.comments ?? [];

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
                      <strong>Author:</strong> {authorLabel}
                      {isExternalDocumentAuthor(displayDocument.document) && (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                          External
                        </span>
                      )}
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
                    <Button
                      type="button"
                      disabled={pdfBusy !== null}
                      className="bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                      onClick={() => setAgreementOpen(true)}
                    >
                      {pdfBusy === "view" ? "Opening…" : "📄 View PDF"}
                    </Button>
                    <span title="Can not download for now">
                      <Button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="cursor-not-allowed bg-gray-300 px-6 py-3 font-medium text-gray-600 hover:bg-gray-300"
                      >
                        ⬇️ Download PDF
                      </Button>
                    </span>
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
            <Dialog open={agreementOpen} onOpenChange={setAgreementOpen}>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Academic Use Agreement</DialogTitle>
                  <DialogDescription>
                    This document is provided strictly for academic and
                    research purposes. By continuing, you agree not to
                    redistribute, republish, or use the content for
                    commercial purposes without permission from the rights
                    holder.
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm text-gray-700">
                  Respect copyright laws and cite the author properly when
                  referencing this work.
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAgreementOpen(false)}
                    disabled={pdfBusy !== null}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setPdfBusy("view");
                      try {
                        const href = buildDocumentViewerHref({
                          subdomain: uniName?.subdomain || "alu",
                          documentId: displayDocument.document.document_id,
                          title: displayDocument.document.title,
                          fileUrl: displayDocument.document.file_url,
                        });
                        router.push(href);
                        setAgreementOpen(false);
                      } catch (e) {
                        toast.error(
                          e instanceof Error
                            ? e.message
                            : "Could not open PDF"
                        );
                      } finally {
                        setPdfBusy(null);
                      }
                    }}
                    disabled={pdfBusy !== null}
                  >
                    I Agree, Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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

            {/* Keywords — not returned by API schema; section reserved */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Keywords
              </h2>
              <p className="text-gray-500 text-sm">
                No keywords are available for this document from the repository
                API.
              </p>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Comments ({comments.length})
              </h2>
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.comment_id}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                          {(comment.user_id || "?").charAt(0).toUpperCase()}
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
                {displayDocument.document.plagiarism_score != null && (
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

            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                More documents
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Browse the repository for other works from this institution.
              </p>
              <Link
                href={`/demo/${uniName?.subdomain || "alu"}/search`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Go to search →
              </Link>
            </div>

            {/* Citation Information */}
            <div className="bg-white rounded-lg shadow border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Citation
              </h3>
              <div className="bg-gray-50 p-3 rounded border text-sm">
                <p className="text-gray-700">
                  {authorLabel} (
                  {new Date(
                    displayDocument.document.created_at
                  ).getFullYear()}
                  ). {displayDocument.document.title}.{" "}
                  {uniName?.universityName || "Institutional repository"}.
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
