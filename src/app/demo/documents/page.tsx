import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

const documents = [
  {
    id: '1',
    title: 'Machine Learning Applications in Agricultural Yield Prediction for Rwanda',
    author: 'Marie Uwimana',
    type: 'Master\'s Thesis',
    faculty: 'Engineering',
    status: 'Published',
    date: '2024-05-10',
    downloads: 245
  },
  {
    id: '2',
    title: 'Deep Learning Frameworks for Natural Language Processing in Kinyarwanda',
    author: 'Dr. Jean Mukiza',
    type: 'Research Article',
    faculty: 'Engineering',
    status: 'Published',
    date: '2024-04-18',
    downloads: 189
  },
  {
    id: '3',
    title: 'Smart Grid Implementation for Rural Electrification in Rwanda',
    author: 'Pierre Nkurunziza',
    type: 'Master\'s Thesis',
    faculty: 'Engineering',
    status: 'Under Review',
    date: '2024-06-02',
    downloads: 0
  },
  {
    id: '4',
    title: 'Sustainable Water Management Systems in Urban Rwanda',
    author: 'Grace Munyangendo',
    type: 'PhD Dissertation',
    faculty: 'Science',
    status: 'Published',
    date: '2024-03-22',
    downloads: 312
  },
  {
    id: '5',
    title: 'Traditional Medicine and Modern Healthcare Integration',
    author: 'Dr. Emmanuel Nsanzimana',
    type: 'Research Article',
    faculty: 'Medicine',
    status: 'Pending Review',
    date: '2024-06-05',
    downloads: 0
  }
];

export default function DocumentsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Repository Documents</h1>
            <p className="text-gray-600">Manage all documents in the repository</p>
          </div>
          <Link
            href="/demo/upload"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            ⬆️ Upload Document
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Published</option>
                <option>Under Review</option>
                <option>Pending Review</option>
                <option>Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Faculties</option>
                <option>Engineering</option>
                <option>Science</option>
                <option>Medicine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Master's Thesis</option>
                <option>PhD Dissertation</option>
                <option>Research Article</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <Link
                        href={`/demo/documents/${doc.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {doc.title}
                      </Link>
                      <p className="text-sm text-gray-500">{doc.faculty}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : doc.status === 'Under Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.downloads}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <Link
                        href={`/demo/documents/${doc.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </Link>
                      <button className="text-green-600 hover:text-green-800">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to 5 of 1,247 documents
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
