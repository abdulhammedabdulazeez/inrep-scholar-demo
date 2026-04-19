"use client";

import NavBar from "@/components/layout/NavBar";
import { fetchTenantDocumentsList } from "@/lib/api/documentCalls";
import { fetchTenantInfo } from "@/lib/api/tenantCalls";
import { DocumentRead } from "@/lib/documentTypes";
import { useGeneralStore } from "@/store/generalStore";
import { useTenantInfoStore } from "@/store/tenantStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

function DocumentTypeBadge({ type }: { type?: string }) {
  const label = type?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Document";
  return (
    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
      {label}
    </span>
  );
}

function DocumentCard({ doc, subdomain }: { doc: DocumentRead; subdomain: string }) {
  const year = doc.created_at ? new Date(doc.created_at).getFullYear() : "";
  const author = doc.author_display_name || "Unknown Author";
  return (
    <div className="bg-white rounded-lg shadow border hover:shadow-md transition">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <DocumentTypeBadge type={doc.type} />
          <span className="text-gray-500 text-sm">{year}</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link
            href={`/demo/${subdomain}/documents/${doc.document_id}`}
            className="hover:text-blue-600"
          >
            {doc.title}
          </Link>
        </h4>
        <p className="text-gray-600 text-sm mb-3">
          by <span className="font-medium">{author}</span>
        </p>
        {doc.abstract && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{doc.abstract}</p>
        )}
        <Link
          href={`/demo/${subdomain}/documents/${doc.document_id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow border p-6 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-10 bg-gray-200 rounded" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="space-y-1">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function UniversityRepositoryHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const uniName = useGeneralStore((state) => state.affiliatedUni);
  const setTenantInfo = useTenantInfoStore((s) => s.setTenantInfo);
  const tenantId = uniName?.tenantId;
  const subdomain = uniName?.subdomain ?? "alu";

  const { data: tenantData } = useQuery({
    queryKey: ["tenantInfo", tenantId],
    queryFn: () => fetchTenantInfo(tenantId!),
    enabled: !!tenantId,
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (tenantData) setTenantInfo(tenantData);
  }, [tenantData, setTenantInfo]);

  const {
    data: docsResponse,
    isLoading: docsLoading,
  } = useQuery({
    queryKey: ["featuredDocuments", tenantId],
    queryFn: () => fetchTenantDocumentsList(tenantId!, 1, 6),
    enabled: !!tenantId,
    staleTime: 60_000,
  });

  const featuredDocs = docsResponse?.results.map((d) => d.document) ?? [];
  const totalDocuments = docsResponse?.total ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/demo/${subdomain}/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <NavBar uniName={uniName} setShowSignupModal={() => {}} />
      </header>

      {/* Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Discover Academic Excellence</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore research documents from {uniName?.universityName} scholars
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search theses, articles, authors, or keywords..."
                className="bg-white flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-blue-800 px-6 py-3 rounded-r-lg hover:bg-blue-900 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {totalDocuments > 0 ? totalDocuments.toLocaleString() : "—"}
              </div>
              <div className="text-gray-600">Documents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">156</div>
              <div className="text-gray-600">Authors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">28,491</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">3</div>
              <div className="text-gray-600">Faculties</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Featured Research</h3>
              <p className="text-gray-600">
                Recent contributions from our academic community
              </p>
            </div>
            <Link
              href={`/demo/${subdomain}/search`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docsLoading
              ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
              : featuredDocs.length > 0
              ? featuredDocs.map((doc) => (
                  <DocumentCard key={doc.document_id} doc={doc} subdomain={subdomain} />
                ))
              : (
                <p className="col-span-3 text-center text-gray-500 py-12">
                  No documents published yet.
                </p>
              )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Quick Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href={`/demo/${subdomain}/search?faculty=engineering`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
            >
              <div className="text-3xl mb-3">⚙️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Engineering Research</h4>
              <p className="text-gray-600 text-sm">
                Explore innovations in technology and engineering solutions
              </p>
            </Link>
            <Link
              href={`/demo/${subdomain}/search?faculty=science`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
            >
              <div className="text-3xl mb-3">🔬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Science Research</h4>
              <p className="text-gray-600 text-sm">
                Discover breakthroughs in natural and applied sciences
              </p>
            </Link>
            <Link
              href={`/demo/${subdomain}/search?faculty=medicine`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
            >
              <div className="text-3xl mb-3">🏥</div>
              <h4 className="font-semibold text-gray-900 mb-2">Medical Research</h4>
              <p className="text-gray-600 text-sm">
                Access healthcare and medical science publications
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {subdomain.toUpperCase().slice(0, 3)}
                </div>
                <span className="font-bold text-gray-900">{uniName?.universityName}</span>
              </div>
              <p className="text-gray-600 text-sm">
                Advancing knowledge through research excellence and academic innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href={`/demo/${subdomain}/search?type=thesis`} className="hover:text-blue-600">Theses</Link></li>
                <li><Link href={`/demo/${subdomain}/search?type=article`} className="hover:text-blue-600">Articles</Link></li>
                <li><Link href={`/demo/${subdomain}/search?type=dissertation`} className="hover:text-blue-600">Dissertations</Link></li>
                <li><Link href={`/demo/${subdomain}/search`} className="hover:text-blue-600">All Documents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href={`/demo/${subdomain}/collaboration`} className="hover:text-blue-600">Collaboration</Link></li>
                <li>Research Guidelines</li>
                <li>Publication Policies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Help Center</li>
                <li>Submission Guidelines</li>
                <li>Technical Support</li>
                <li>Contact Library</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {uniName?.universityName}. All rights reserved. | Powered by InRep Scholar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
