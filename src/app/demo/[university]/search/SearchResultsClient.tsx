"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useGeneralStore } from "@/store/generalStore";
import { useMockDocumentSearch } from "@/hooks/useMockDocumentSearch";
import { SearchFilters } from "@/lib/api/searchCalls";
import SearchInput from "@/components/search/SearchInput";
import FilterSelect from "@/components/search/FilterSelect";
import Pagination from "@/components/search/Pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Filter options
const facultyOptions = [
  { value: "661e9315-9307-410d-84d8-62612b41d381", label: "Computer Science" },
  {
    value: "eb0ffaf3-3912-4eb2-b7a9-1332ae34c5ad",
    label: "Bachelor of Entrepreneurial Leadership (BEL)",
  },
];

const documentTypeOptions = [
  { value: "master's thesis", label: "Master's Thesis" },
  { value: "phd dissertation", label: "PhD Dissertation" },
  { value: "research article", label: "Research Article" },
  { value: "conference paper", label: "Conference Paper" },
  { value: "book chapter", label: "Book Chapter" },
];

const accessTypeOptions = [
  { value: "open", label: "Open Access" },
  { value: "restricted", label: "Restricted" },
  { value: "private", label: "Private" },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "title", label: "Title (A-Z)" },
  { value: "created_at", label: "Date (Newest)" },
  { value: "download_count", label: "Most Downloaded" },
  { value: "view_count", label: "Most Viewed" },
];

export default function SearchResultsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userRole = useUserStore((state) => state?.role);
  const uniName = useGeneralStore((state) => state.affiliatedUni);

  // URL state management
  const [filters, setFilters] = useState<SearchFilters>({
    keywords: searchParams?.get("q") || "",
    faculty_ids: searchParams?.get("faculty")?.split(",").filter(Boolean) || [],
    document_types: searchParams?.get("type")?.split(",").filter(Boolean) || [],
    access_types: searchParams?.get("access")?.split(",").filter(Boolean) || [],
    page: parseInt(searchParams?.get("page") || "1"),
    page_size: 20,
    sort_by: (searchParams?.get("sort") as any) || "relevance",
    sort_order: (searchParams?.get("order") as any) || "desc",
  });

  // Update filters (without URL sync for now to fix infinite loop)
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters, page: 1 }));
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, page }));
  }, []);

  // Search query
  const { data, isLoading, error } = useMockDocumentSearch(filters);

  // Access control helper
  const canViewFullText = (accessRights: string) => {
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
  };

  // Get access badge
  const getAccessBadge = (accessRights: string) => {
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
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters: SearchFilters = {
      keywords: "",
      faculty_ids: [],
      document_types: [],
      access_types: [],
      page: 1,
      page_size: 20,
      sort_by: "relevance",
      sort_order: "desc",
    };
    setFilters(clearedFilters);
    // updateURL(clearedFilters); // This line is removed as per the edit hint
  };

  const hasActiveFilters =
    filters.keywords ||
    filters.faculty_ids?.length ||
    filters.document_types?.length ||
    filters.access_types?.length;

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
                  <p className="text-sm text-gray-600">Repository Search</p>
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
                <Link
                  href={`/demo/${uniName?.subdomain || "alu"}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow border p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Search & Filters
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {/* Search Input */}
                <SearchInput
                  value={filters.keywords || ""}
                  onChange={(value) => updateFilters({ keywords: value })}
                  placeholder="Search documents, authors, keywords..."
                />

                {/* Faculty Filter */}
                <FilterSelect
                  label="Faculty"
                  options={facultyOptions}
                  selectedValues={filters.faculty_ids || []}
                  onChange={(values) => updateFilters({ faculty_ids: values })}
                  placeholder="All Faculties"
                />

                {/* Document Type Filter */}
                <FilterSelect
                  label="Document Type"
                  options={documentTypeOptions}
                  selectedValues={filters.document_types || []}
                  onChange={(values) =>
                    updateFilters({ document_types: values })
                  }
                  placeholder="All Types"
                />

                {/* Access Rights Filter */}
                <FilterSelect
                  label="Access"
                  options={accessTypeOptions.filter(
                    (option) =>
                      userRole !== "guest" || option.value !== "private"
                  )}
                  selectedValues={filters.access_types || []}
                  onChange={(values) => updateFilters({ access_types: values })}
                  placeholder="All Access Types"
                />

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={filters.sort_by || "relevance"}
                    onChange={(e) =>
                      updateFilters({
                        sort_by: e.target.value as any,
                        sort_order: e.target.value === "title" ? "asc" : "desc",
                      })
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Access Level Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Viewing as:</strong>{" "}
                  {userRole === "guest" || userRole === undefined
                    ? "Guest User"
                    : userRole === "regular"
                    ? "Registered User"
                    : userRole === "reviewer"
                    ? "Reviewer"
                    : "Administrator"}
                </p>
                {(userRole === "guest" || userRole === undefined) && (
                  <p className="text-xs text-blue-600 mt-1">
                    You can view open access content and metadata.
                    <Link
                      href={`/demo/${uniName?.subdomain || "alu"}`}
                      className="underline ml-1"
                    >
                      Sign in
                    </Link>{" "}
                    for full access.
                  </p>
                )}
                {userRole === "regular" && (
                  <p className="text-xs text-blue-600 mt-1">
                    You have access to most content. Contact your administrator
                    for additional permissions.
                  </p>
                )}
                {userRole === "reviewer" && (
                  <p className="text-xs text-blue-600 mt-1">
                    You have reviewer access. You can view and review documents.
                  </p>
                )}
                {userRole === "admin" && (
                  <p className="text-xs text-blue-600 mt-1">
                    You have full administrative access to all content and
                    features.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>
                {isLoading ? (
                  <Skeleton className="h-4 w-48" />
                ) : (
                  <p className="text-gray-600">
                    Found {data?.total || 0} documents
                    {filters.keywords && ` for "${filters.keywords}"`}
                  </p>
                )}
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow border p-6"
                  >
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                ))
              ) : error ? (
                // Error state
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">
                    Error loading search results. Please try again.
                  </p>
                </div>
              ) : data?.results?.length === 0 ? (
                // Empty state
                <div className="bg-white rounded-lg shadow border p-8 text-center">
                  <p className="text-gray-500 text-lg mb-2">
                    No documents found
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              ) : (
                // Results
                data?.results?.map((result) => (
                  <div
                    key={result.document.document_id}
                    className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getAccessBadge(
                            result.document.is_public
                              ? result.document.is_read_only
                                ? "restricted"
                                : "open_access"
                              : "private"
                          )}
                          <span className="text-sm text-gray-500">
                            Document
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(result.document.created_at).getFullYear()}
                          </span>
                          {result.document.doi_link && (
                            <>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-blue-600">
                                DOI: {result.document.doi_link}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          <Link
                            href={`/demo/${
                              uniName?.subdomain || "alu"
                            }/documents/${result.document.document_id}`}
                            className="hover:text-blue-600 transition"
                          >
                            {result.document.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-3">
                          by <strong>{result.document.author}</strong> •{" "}
                          {result.faculty?.name || "Unknown"} •{" "}
                          {result.department?.name || "Unknown"}
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-4">
                          {result.document.abstract || "No abstract available"}
                          {!canViewFullText(
                            result.document.is_public
                              ? result.document.is_read_only
                                ? "restricted"
                                : "open_access"
                              : "private"
                          ) &&
                            result.document.is_public === false && (
                              <span className="text-gray-500 italic">
                                {" "}
                                [Full text access restricted]
                              </span>
                            )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span>📥 {result.download_count} downloads</span>
                        <span>👁️ {result.view_count} views</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/demo/${
                            uniName?.subdomain || "alu"
                          }/documents/${result.document.document_id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </Link>
                        {canViewFullText(
                          result.document.is_public
                            ? result.document.is_read_only
                              ? "restricted"
                              : "open_access"
                            : "private"
                        ) && (
                          <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            📄 View PDF
                          </Button>
                        )}
                        {result.document.is_public &&
                          !result.document.is_read_only && (
                            <Button
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              ⬇️ Download
                            </Button>
                          )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {data && data.pages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={data.page}
                  totalPages={data.pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
