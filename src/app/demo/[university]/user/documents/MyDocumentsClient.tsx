"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { fetchTenantDocuments } from "@/lib/api/documentCalls";
import { useGeneralStore } from "@/store/generalStore";
import { useUserStore } from "@/store/userStore";
import type { DocumentDetail } from "@/lib/documentTypes";
import { getDocumentAuthorLabel } from "@/lib/documentAuthor";

function filterMyDocuments(
  docs: DocumentDetail[],
  userId: string | undefined,
  userEmail: string | undefined,
  userName: string | null
) {
  if (!userId && !userEmail && !userName) return docs;
  return docs.filter((d) => {
    const profileUserId = d.document.author_profile?.user_id;
    const profileEmail = d.document.author_profile?.email;
    if (userId && profileUserId && profileUserId === userId) return true;
    if (userEmail && profileEmail && profileEmail === userEmail) return true;
    if (
      userName &&
      getDocumentAuthorLabel(d.document).toLowerCase() === userName.toLowerCase()
    ) {
      return true;
    }
    return false;
  });
}

export default function MyDocumentsClient() {
  const params = useParams();
  const subdomain = (params.university as string) || "alu";
  const tenantId = useGeneralStore((s) => s.affiliatedUni?.tenantId);
  const uniName = useGeneralStore((s) => s.affiliatedUni?.universityName);
  const userName = useUserStore((s) => s.name);

  const { data: currentUser } = useQuery({
    queryKey: ["authUserIdentity"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return { id: user?.id, email: user?.email };
    },
  });

  const {
    data: allDocs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tenantDocuments", tenantId, "myDocs"],
    queryFn: () => fetchTenantDocuments(tenantId!),
    enabled: !!tenantId,
  });

  const userDocuments = filterMyDocuments(
    allDocs,
    currentUser?.id,
    currentUser?.email,
    userName
  );

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { color: string; label: string }
    > = {
      published: { color: "bg-green-100 text-green-800", label: "Published" },
      under_review: {
        color: "bg-blue-100 text-blue-800",
        label: "Under Review",
      },
      draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
      revision_required: {
        color: "bg-orange-100 text-orange-800",
        label: "Revision Required",
      },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    };

    const config = statusConfig[status] ?? statusConfig.draft;
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getAccessBadge = (doc: DocumentDetail["document"]) => {
    const accessRights = doc.is_public
      ? doc.is_read_only
        ? "restricted"
        : "open_access"
      : "private";
    const accessConfig = {
      open_access: {
        color: "bg-green-100 text-green-800",
        label: "Open Access",
      },
      restricted: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Restricted",
      },
      private: { color: "bg-red-100 text-red-800", label: "Private" },
    };

    const config = accessConfig[accessRights as keyof typeof accessConfig];
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getPlagiarismBadge = (score: number | null | undefined) => {
    if (score == null)
      return <span className="text-sm text-gray-500">Not checked</span>;

    if (score <= 10) {
      return (
        <span className="text-sm font-medium text-green-600">{score}% ✓</span>
      );
    } else if (score <= 20) {
      return (
        <span className="text-sm font-medium text-yellow-600">{score}% ⚠️</span>
      );
    }
    return (
      <span className="text-sm font-medium text-red-600">{score}% ❌</span>
    );
  };

  if (!tenantId) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <p className="text-amber-800">
          University context is missing. Open this page from your demo
          university route.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <p className="text-red-800">Could not load documents.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href={`/demo/${subdomain}`}
            className="flex items-center space-x-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
              {subdomain.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {uniName || "University"}
              </h1>
              <p className="text-sm text-gray-600">My Documents</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              href={`/demo/${subdomain}/user`}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard
            </Link>
            <Link
              href={`/demo/${subdomain}`}
              className="text-gray-600 hover:text-blue-600"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Documents</h2>
            <p className="text-gray-600">
              Documents associated with your account in this repository
            </p>
          </div>
          <Link
            href={`/demo/${subdomain}/user/upload`}
            className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            📤 Upload New Document
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-600">Total (matched)</p>
            <p className="text-2xl font-bold text-gray-900">
              {isLoading ? "…" : userDocuments.length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-600">Published</p>
            <p className="text-2xl font-bold text-green-600">
              {isLoading
                ? "…"
                : userDocuments.filter((d) => d.document.status === "published")
                    .length}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-600">Total downloads</p>
            <p className="text-2xl font-bold text-blue-600">
              {isLoading
                ? "…"
                : userDocuments.reduce(
                    (sum, d) => sum + d.download_count,
                    0
                  )}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-600">Total views</p>
            <p className="text-2xl font-bold text-purple-600">
              {isLoading
                ? "…"
                : userDocuments.reduce((sum, d) => sum + d.view_count, 0)}
            </p>
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-600">Loading…</p>
        ) : userDocuments.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center text-gray-600">
            <p className="mb-2">No documents matched your account yet.</p>
            <p className="text-sm text-gray-500">
              We match by your sign-in email or display name against document
              author fields. Upload a document or check the admin document list
              if you expect to see items here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userDocuments.map((row) => {
              const doc = row.document;
              const created = doc.created_at?.slice(0, 10);
              return (
                <div
                  key={doc.document_id}
                  className="rounded-lg border bg-white p-6 shadow"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        {getStatusBadge(doc.status)}
                        {getAccessBadge(doc)}
                        {doc.doi_link && (
                          <span className="text-sm text-blue-600">
                            DOI: {doc.doi_link}
                          </span>
                        )}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">
                        <Link
                          href={`/demo/${subdomain}/documents/${doc.document_id}`}
                          className="transition hover:text-blue-600"
                        >
                          {doc.title}
                        </Link>
                      </h3>
                      <p className="mb-3 line-clamp-2 text-gray-600">
                        {doc.abstract || "No abstract."}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 md:grid-cols-4">
                        {created && (
                          <div>
                            <span className="font-medium">Created:</span>{" "}
                            {created}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Plagiarism:</span>{" "}
                          {getPlagiarismBadge(doc.plagiarism_score)}
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 text-right text-sm">
                      <div>
                        <span className="text-gray-500">Downloads:</span>{" "}
                        <span className="font-semibold">
                          {row.download_count}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Views:</span>{" "}
                        <span className="font-semibold">{row.view_count}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end border-t pt-4">
                    <Link
                      href={`/demo/${subdomain}/documents/${doc.document_id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
