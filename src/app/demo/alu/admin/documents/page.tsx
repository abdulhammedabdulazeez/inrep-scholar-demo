import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";

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
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: "bg-green-100 text-green-800", label: "Published" },
      under_review: {
        color: "bg-blue-100 text-blue-800",
        label: "Under Review",
      },
      pending_plagiarism: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Plagiarism Check",
      },
      pending_doi: {
        color: "bg-purple-100 text-purple-800",
        label: "Pending DOI",
      },
      draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getAccessBadge = (accessRights: string) => {
    const accessConfig = {
      open_access: { color: "bg-green-100 text-green-800", label: "Open" },
      restricted: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Restricted",
      },
      private: { color: "bg-red-100 text-red-800", label: "Private" },
    };

    const config = accessConfig[accessRights as keyof typeof accessConfig];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getPlagiarismBadge = (score: number | null) => {
    if (score === null)
      return <span className="text-gray-500 text-sm">Pending</span>;

    if (score <= 10) {
      return (
        <span className="text-green-600 text-sm font-medium">{score}% ✓</span>
      );
    } else if (score <= 20) {
      return (
        <span className="text-yellow-600 text-sm font-medium">{score}% ⚠️</span>
      );
    } else {
      return (
        <span className="text-red-600 text-sm font-medium">{score}% ❌</span>
      );
    }
  };

  return (
    <MainLayout>
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              📊 Export Report
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              📤 Bulk Actions
            </button>
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
                <p className="text-sm font-medium text-gray-600">
                  Under Review
                </p>
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

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Filters & Search
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Title, author, DOI..."
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Published</option>
                <option>Under Review</option>
                <option>Pending Plagiarism</option>
                <option>Pending DOI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faculty
              </label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Faculties</option>
                <option>Engineering</option>
                <option>Science</option>
                <option>Medicine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Master's Thesis</option>
                <option>PhD Dissertation</option>
                <option>Research Article</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plagiarism
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metrics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <Link
                          href={`/demo/alu/documents/${doc.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 line-clamp-2"
                        >
                          {doc.title}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          by {doc.author} • {doc.faculty} • {doc.type}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {getAccessBadge(doc.accessRights)}
                          {doc.doi && (
                            <span className="text-xs text-blue-600">
                              DOI: {doc.doi}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getStatusBadge(doc.status)}
                        <div className="text-xs text-gray-500">
                          Submitted: {doc.submissionDate}
                        </div>
                        {doc.publishedDate && (
                          <div className="text-xs text-gray-500">
                            Published: {doc.publishedDate}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getPlagiarismBadge(doc.plagiarismScore)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm space-y-1">
                        <div>📥 {doc.downloads} downloads</div>
                        <div>👁️ {doc.views} views</div>
                        <div className="text-xs text-gray-500">
                          {doc.fileSize}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Review
                        </button>
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          DOI
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        <div className="bg-white rounded-lg shadow border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Select documents above to perform bulk actions
            </div>
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm">
                Bulk Approve
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
                Assign DOI
              </button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition text-sm">
                Change Access
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm">
                Bulk Delete
              </button>
            </div>
          </div>
        </div>

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
    </MainLayout>
  );
}
