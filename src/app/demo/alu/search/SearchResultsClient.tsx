"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const searchResults = [
  {
    id: "1",
    title:
      "Machine Learning Applications in Agricultural Yield Prediction for Rwanda",
    author: "Marie Uwimana",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Master's Thesis",
    year: "2024",
    doi: "10.12345/ur.thesis.2024.001",
    accessRights: "open_access",
    abstract:
      "This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda using satellite imagery, weather data, and historical crop yield information...",
    downloads: 245,
    views: 1089,
  },
  {
    id: "2",
    title:
      "Deep Learning Frameworks for Natural Language Processing in Kinyarwanda",
    author: "Dr. Jean Mukiza",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Research Article",
    year: "2024",
    doi: "10.12345/ur.article.2024.002",
    accessRights: "open_access",
    abstract:
      "A comprehensive study on developing NLP frameworks specifically designed for Kinyarwanda language processing and understanding...",
    downloads: 189,
    views: 756,
  },
  {
    id: "3",
    title: "Smart Grid Implementation for Rural Electrification in Rwanda",
    author: "Pierre Nkurunziza",
    faculty: "Engineering",
    department: "Electrical Engineering",
    type: "Master's Thesis",
    year: "2024",
    doi: null,
    accessRights: "restricted",
    abstract:
      "Investigation of smart grid technologies for improving rural electrification in Rwanda with focus on renewable energy integration...",
    downloads: 45,
    views: 234,
  },
  {
    id: "4",
    title: "Sustainable Water Management Systems in Urban Rwanda",
    author: "Grace Munyangendo",
    faculty: "Science",
    department: "Environmental Science",
    type: "PhD Dissertation",
    year: "2024",
    doi: "10.12345/ur.phd.2024.003",
    accessRights: "open_access",
    abstract:
      "Comprehensive analysis of water management challenges in urban areas of Rwanda and proposed sustainable solutions...",
    downloads: 312,
    views: 987,
  },
  {
    id: "5",
    title: "Traditional Medicine Integration in Modern Healthcare Systems",
    author: "Dr. Emmanuel Nsanzimana",
    faculty: "Medicine",
    department: "Public Health",
    type: "Research Article",
    year: "2024",
    doi: null,
    accessRights: "private",
    abstract:
      "Exploring pathways for integrating traditional Rwandan medicine practices with contemporary healthcare delivery systems...",
    downloads: 0,
    views: 12,
  },
  {
    id: "6",
    title: "Blockchain Technology Applications in Rwanda's Financial Sector",
    author: "Peter Nkurunziza",
    faculty: "Engineering",
    department: "Computer Science",
    type: "Master's Thesis",
    year: "2024",
    doi: "10.12345/ur.thesis.2024.004",
    accessRights: "restricted",
    abstract:
      "Analysis of blockchain implementation opportunities in Rwanda's emerging fintech ecosystem and regulatory considerations...",
    downloads: 78,
    views: 345,
  },
];

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    query: searchParams?.get("q") || "",
    faculty: searchParams?.get("faculty") || "",
    type: searchParams?.get("type") || "",
    year: searchParams?.get("year") || "",
    accessRights: searchParams?.get("access") || "",
    hasDownloads: false,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [userRole] = useState<"guest" | "user" | "admin">("guest"); // Simulating guest access

  // Filter results based on search criteria and access rights
  const filteredResults = searchResults.filter((result) => {
    // Access control simulation
    if (userRole === "guest" && result.accessRights === "private") {
      return false; // Guests cannot see private content
    }

    // Text search
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      const searchableText =
        `${result.title} ${result.author} ${result.abstract}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    // Faculty filter
    if (
      filters.faculty &&
      result.faculty.toLowerCase() !== filters.faculty.toLowerCase()
    ) {
      return false;
    }

    // Type filter
    if (
      filters.type &&
      result.type.toLowerCase() !== filters.type.toLowerCase()
    ) {
      return false;
    }

    // Year filter
    if (filters.year && result.year !== filters.year) {
      return false;
    }

    // Access rights filter
    if (filters.accessRights && result.accessRights !== filters.accessRights) {
      return false;
    }

    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the URL and trigger a new search
    console.log("Searching with filters:", filters);
  };

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

  const canViewFullText = (accessRights: string) => {
    if (userRole === "admin") return true;
    if (userRole === "user" && accessRights !== "private") return true;
    if (userRole === "guest" && accessRights === "open_access") return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/demo/alu" className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  ALU
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    African Leadership University
                  </h1>
                  <p className="text-sm text-gray-600">Repository Search</p>
                </div>
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/demo/alu"
                className="text-gray-600 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href="/demo/alu/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Search & Filters
              </h3>

              <form onSubmit={handleSearch} className="space-y-4">
                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.query}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, query: e.target.value }))
                    }
                    placeholder="Keywords, title, author..."
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Faculty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faculty
                  </label>
                  <select
                    value={filters.faculty}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        faculty: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Faculties</option>
                    <option value="engineering">Engineering</option>
                    <option value="science">Science</option>
                    <option value="medicine">Medicine</option>
                  </select>
                </div>

                {/* Document Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="master's thesis">Master's Thesis</option>
                    <option value="phd dissertation">PhD Dissertation</option>
                    <option value="research article">Research Article</option>
                  </select>
                </div>

                {/* Access Rights */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access
                  </label>
                  <select
                    value={filters.accessRights}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        accessRights: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Access Types</option>
                    <option value="open_access">Open Access</option>
                    <option value="restricted">Restricted</option>
                    {userRole !== "guest" && (
                      <option value="private">Private</option>
                    )}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, year: e.target.value }))
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Apply Filters
                </button>
              </form>

              {/* Access Level Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Viewing as:</strong> Guest User
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  You can view open access content and metadata.
                  <Link href="/demo/alu" className="underline ml-1">
                    Sign in
                  </Link>{" "}
                  for full access.
                </p>
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
                <p className="text-gray-600">
                  Found {filteredResults.length} documents
                  {filters.query && ` for "${filters.query}"`}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date (Newest)</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getAccessBadge(result.accessRights)}
                        <span className="text-sm text-gray-500">
                          {result.type}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {result.year}
                        </span>
                        {result.doi && (
                          <>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-blue-600">
                              DOI: {result.doi}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/demo/alu/documents/${result.id}`}
                          className="hover:text-blue-600 transition"
                        >
                          {result.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-3">
                        by <strong>{result.author}</strong> • {result.faculty} •{" "}
                        {result.department}
                      </p>

                      <p className="text-gray-700 leading-relaxed mb-4">
                        {result.abstract}
                        {!canViewFullText(result.accessRights) &&
                          result.accessRights !== "open_access" && (
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
                      <span>📥 {result.downloads} downloads</span>
                      <span>👁️ {result.views} views</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/demo/alu/documents/${result.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </Link>
                      {canViewFullText(result.accessRights) && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
                          📄 View PDF
                        </button>
                      )}
                      {result.accessRights === "open_access" && (
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm">
                          ⬇️ Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
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
        </div>
      </div>
    </div>
  );
}
