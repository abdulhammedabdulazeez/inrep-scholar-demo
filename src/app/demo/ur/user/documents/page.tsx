import Link from 'next/link';

const userDocuments = [
  {
    id: '1',
    title: 'Machine Learning Applications in Agricultural Yield Prediction for Rwanda',
    type: 'Master\'s Thesis',
    status: 'published',
    submissionDate: '2024-05-10',
    publishedDate: '2024-05-20',
    doi: '10.12345/ur.thesis.2024.001',
    downloads: 245,
    views: 1089,
    accessRights: 'open_access',
    abstract: 'This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda using satellite imagery, weather data, and historical crop yield information...',
    fileSize: '2.4 MB',
    plagiarismScore: 8.2,
    reviewStatus: 'approved'
  },
  {
    id: '8',
    title: 'IoT Sensors for Smart Agriculture in Rwanda',
    type: 'Research Article',
    status: 'under_review',
    submissionDate: '2024-06-01',
    publishedDate: null,
    doi: null,
    downloads: 0,
    views: 12,
    accessRights: 'restricted',
    abstract: 'A comprehensive study on IoT sensor deployment for precision agriculture in Rwandan farming systems...',
    fileSize: '1.8 MB',
    plagiarismScore: 12.1,
    reviewStatus: 'pending'
  },
  {
    id: '9',
    title: 'Climate Change Adaptation Strategies for Rwandan Farmers',
    type: 'Conference Paper',
    status: 'draft',
    submissionDate: null,
    publishedDate: null,
    doi: null,
    downloads: 0,
    views: 0,
    accessRights: 'private',
    abstract: 'Analysis of climate adaptation strategies implemented by smallholder farmers in rural Rwanda...',
    fileSize: '956 KB',
    plagiarismScore: null,
    reviewStatus: 'draft'
  },
  {
    id: '10',
    title: 'Blockchain Implementation for Land Registry in Rwanda',
    type: 'Master\'s Thesis',
    status: 'revision_required',
    submissionDate: '2024-05-15',
    publishedDate: null,
    doi: null,
    downloads: 0,
    views: 23,
    accessRights: 'restricted',
    abstract: 'Exploring blockchain technology applications for secure and transparent land registration systems in Rwanda...',
    fileSize: '3.1 MB',
    plagiarismScore: 18.7,
    reviewStatus: 'revision_requested'
  }
];

export default function MyDocumentsPage() {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'published': { color: 'bg-green-100 text-green-800', label: 'Published' },
      'under_review': { color: 'bg-blue-100 text-blue-800', label: 'Under Review' },
      'draft': { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      'revision_required': { color: 'bg-orange-100 text-orange-800', label: 'Revision Required' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const getAccessBadge = (accessRights: string) => {
    const accessConfig = {
      'open_access': { color: 'bg-green-100 text-green-800', label: 'Open Access' },
      'restricted': { color: 'bg-yellow-100 text-yellow-800', label: 'Restricted' },
      'private': { color: 'bg-red-100 text-red-800', label: 'Private' }
    };

    const config = accessConfig[accessRights as keyof typeof accessConfig];
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const getPlagiarismBadge = (score: number | null) => {
    if (score === null) return <span className="text-gray-500 text-sm">Not checked</span>;

    if (score <= 10) {
      return <span className="text-green-600 text-sm font-medium">{score}% ✓</span>;
    } else if (score <= 20) {
      return <span className="text-yellow-600 text-sm font-medium">{score}% ⚠️</span>;
    } else {
      return <span className="text-red-600 text-sm font-medium">{score}% ❌</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo/ur" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">UR</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">University of Rwanda</h1>
                <p className="text-sm text-gray-600">My Documents</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/demo/ur/user" className="text-blue-600 hover:text-blue-800">← Dashboard</Link>
              <Link href="/demo/ur" className="text-gray-600 hover:text-blue-600">Home</Link>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  MU
                </div>
                <span className="text-sm text-gray-700">Marie Uwimana</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">My Documents</h2>
              <p className="text-gray-600">Manage and track your research publications</p>
            </div>
            <Link
              href="/demo/ur/user/upload"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium"
            >
              📤 Upload New Document
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{userDocuments.length}</p>
                </div>
                <div className="text-2xl">📄</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">
                    {userDocuments.filter(d => d.status === 'published').length}
                  </p>
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {userDocuments.reduce((sum, doc) => sum + doc.downloads, 0)}
                  </p>
                </div>
                <div className="text-2xl">📥</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {userDocuments.reduce((sum, doc) => sum + doc.views, 0)}
                  </p>
                </div>
                <div className="text-2xl">👁️</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Title, keywords..."
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Under Review</option>
                  <option>Draft</option>
                  <option>Revision Required</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Types</option>
                  <option>Master's Thesis</option>
                  <option>PhD Dissertation</option>
                  <option>Research Article</option>
                  <option>Conference Paper</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {userDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusBadge(doc.status)}
                      {getAccessBadge(doc.accessRights)}
                      <span className="text-sm text-gray-500">{doc.type}</span>
                      {doc.doi && (
                        <>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-blue-600">DOI: {doc.doi}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link
                        href={`/demo/ur/documents/${doc.id}`}
                        className="hover:text-blue-600 transition"
                      >
                        {doc.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 mb-3 line-clamp-2">{doc.abstract}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      {doc.submissionDate && (
                        <div>
                          <span className="font-medium">Submitted:</span> {doc.submissionDate}
                        </div>
                      )}
                      {doc.publishedDate && (
                        <div>
                          <span className="font-medium">Published:</span> {doc.publishedDate}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">File Size:</span> {doc.fileSize}
                      </div>
                      <div>
                        <span className="font-medium">Plagiarism:</span> {getPlagiarismBadge(doc.plagiarismScore)}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 text-right">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-500">Downloads:</span>
                        <span className="font-semibold ml-1">{doc.downloads}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Views:</span>
                        <span className="font-semibold ml-1">{doc.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/demo/ur/documents/${doc.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details
                    </Link>
                    {doc.status === 'draft' && (
                      <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                        Edit Document
                      </button>
                    )}
                    {doc.status === 'revision_required' && (
                      <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                        Submit Revision
                      </button>
                    )}
                    {doc.status === 'published' && (
                      <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                        Share Document
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="text-gray-600 hover:text-gray-800 text-sm">
                      Download PDF
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">
                      Export Citation
                    </button>
                    {doc.status === 'draft' && (
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
