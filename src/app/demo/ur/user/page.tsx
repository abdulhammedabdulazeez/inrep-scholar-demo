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
    views: 1089
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
    views: 12
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
    views: 0
  }
];

export default function UserDashboardPage() {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'published': { color: 'bg-green-100 text-green-800', label: 'Published' },
      'under_review': { color: 'bg-blue-100 text-blue-800', label: 'Under Review' },
      'draft': { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
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
                <p className="text-sm text-gray-600">My Dashboard</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/demo/ur/search" className="text-gray-600 hover:text-blue-600">Browse</Link>
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
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome back, Marie!</h2>
                <p className="text-gray-600">Manage your research documents and track their progress</p>
              </div>
              <Link
                href="/demo/ur/user/upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium"
              >
                📤 Upload New Document
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Documents</p>
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

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/demo/ur/user/upload"
                className="flex items-center p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                <div className="text-blue-600 text-2xl mr-4">⬆️</div>
                <div>
                  <h4 className="font-medium text-gray-900">Upload Document</h4>
                  <p className="text-sm text-gray-600">Submit a new thesis or research paper</p>
                </div>
              </Link>

              <Link
                href="/demo/ur/user/documents"
                className="flex items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition"
              >
                <div className="text-green-600 text-2xl mr-4">📄</div>
                <div>
                  <h4 className="font-medium text-gray-900">My Documents</h4>
                  <p className="text-sm text-gray-600">Manage your uploaded documents</p>
                </div>
              </Link>

              <Link
                href="/demo/ur/user/reviews"
                className="flex items-center p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition"
              >
                <div className="text-purple-600 text-2xl mr-4">📝</div>
                <div>
                  <h4 className="font-medium text-gray-900">Review Tasks</h4>
                  <p className="text-sm text-gray-600">Complete assigned document reviews</p>
                </div>
              </Link>

              <Link
                href="/demo/ur/search"
                className="flex items-center p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                <div className="text-blue-600 text-2xl mr-4">🔍</div>
                <div>
                  <h4 className="font-medium text-gray-900">Browse Repository</h4>
                  <p className="text-sm text-gray-600">Explore research from your peers</p>
                </div>
              </Link>

              <Link
                href="/demo/ur/profile"
                className="flex items-center p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition"
              >
                <div className="text-orange-600 text-2xl mr-4">👤</div>
                <div>
                  <h4 className="font-medium text-gray-900">Edit Profile</h4>
                  <p className="text-sm text-gray-600">Update your personal information</p>
                </div>
              </Link>
            </div>
          </div>

          {/* My Documents */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">My Documents</h3>
                <Link
                  href="/demo/ur/user/upload"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  + Upload New
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                  {userDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <Link
                            href={`/demo/ur/documents/${doc.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 line-clamp-2"
                          >
                            {doc.title}
                          </Link>
                          <div className="text-sm text-gray-500 mt-1">
                            {doc.type}
                            {doc.doi && (
                              <span className="ml-2 text-blue-600">DOI: {doc.doi}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getStatusBadge(doc.status)}
                          {doc.submissionDate && (
                            <div className="text-xs text-gray-500">
                              Submitted: {doc.submissionDate}
                            </div>
                          )}
                          {doc.publishedDate && (
                            <div className="text-xs text-gray-500">
                              Published: {doc.publishedDate}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm space-y-1">
                          <div>📥 {doc.downloads} downloads</div>
                          <div>👁️ {doc.views} views</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            href={`/demo/ur/documents/${doc.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </Link>
                          {doc.status === 'draft' && (
                            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                              Edit
                            </button>
                          )}
                          {doc.status === 'published' && (
                            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                              Share
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Document published successfully</p>
                  <p className="text-xs text-gray-500">"Machine Learning in Agriculture" • 2 weeks ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Document submitted for review</p>
                  <p className="text-xs text-gray-500">"IoT Sensors for Smart Agriculture" • 3 days ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Review feedback received</p>
                  <p className="text-xs text-gray-500">Minor revisions requested • 1 week ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">DOI assigned</p>
                  <p className="text-xs text-gray-500">10.12345/ur.thesis.2024.001 • 2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips & Resources */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Tips & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Writing Guidelines</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Follow APA citation style</li>
                  <li>• Include comprehensive abstract</li>
                  <li>• Use clear, academic language</li>
                  <li>• Cite all sources properly</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Submission Process</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Upload PDF or DOCX format</li>
                  <li>• Complete all metadata fields</li>
                  <li>• Review plagiarism check results</li>
                  <li>• Respond to reviewer feedback promptly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
