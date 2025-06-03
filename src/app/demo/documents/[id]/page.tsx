import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function DocumentDetailPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          <Link href="/demo/documents" className="hover:text-blue-600">Documents</Link>
          <span className="mx-2">/</span>
          <span>Document Detail</span>
        </nav>

        {/* Document Header */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Machine Learning Applications in Agricultural Yield Prediction for Rwanda
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>By <strong>Marie Uwimana</strong></span>
                <span>•</span>
                <span>Master's Thesis</span>
                <span>•</span>
                <span>Faculty of Engineering</span>
                <span>•</span>
                <span>Published May 10, 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                  Published
                </span>
                <span className="text-sm text-gray-600">DOI: 10.12345/ur.thesis.2024.001</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                📄 View PDF
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                ⬇️ Download
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Abstract */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Abstract</h3>
              <p className="text-gray-700 leading-relaxed">
                This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda.
                Using satellite imagery, weather data, and historical crop yield information, we developed models that can
                accurately forecast harvest outcomes. The research demonstrates significant improvements in prediction accuracy
                compared to traditional methods, with potential applications for food security planning and agricultural policy
                development in Rwanda. Our findings show that ensemble methods combining multiple data sources achieve the
                highest accuracy rates, with an average prediction error of less than 12%.
              </p>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900">Machine Learning Applications in Agricultural Yield Prediction for Rwanda</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Author</dt>
                  <dd className="mt-1 text-sm text-gray-900">Marie Uwimana</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Supervisor</dt>
                  <dd className="mt-1 text-sm text-gray-900">Dr. Jean Mukiza</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900">Computer Science</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Degree Level</dt>
                  <dd className="mt-1 text-sm text-gray-900">Master's</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Language</dt>
                  <dd className="mt-1 text-sm text-gray-900">English</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Keywords</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Machine Learning</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Agriculture</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Rwanda</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Yield Prediction</span>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">License</dt>
                  <dd className="mt-1 text-sm text-gray-900">CC BY 4.0</dd>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Version History</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">Version 1.1 (Current)</p>
                    <p className="text-sm text-gray-600">Minor corrections and formatting updates</p>
                    <p className="text-xs text-gray-500">Uploaded May 12, 2024 by Marie Uwimana</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">Version 1.0</p>
                    <p className="text-sm text-gray-600">Original submission</p>
                    <p className="text-xs text-gray-500">Uploaded May 10, 2024 by Marie Uwimana</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">1,089</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Citations</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size</span>
                  <span className="font-semibold">2.4 MB</span>
                </div>
              </div>
            </div>

            {/* Workflow Status */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Status</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Uploaded</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Plagiarism Check Passed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Review Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">DOI Assigned</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Published</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  Edit Metadata
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                  Update Status
                </button>
                <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition">
                  Generate Report
                </button>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
                  Archive Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
