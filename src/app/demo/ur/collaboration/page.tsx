'use client';

import Link from 'next/link';
import { useState } from 'react';

const collaborations = [
  {
    id: '1',
    title: 'AI for Sustainable Agriculture in Rwanda',
    type: 'Research Partnership',
    status: 'active',
    members: ['Marie Uwimana', 'Dr. Jean Mukiza', 'Peter Nkurunziza'],
    institution: 'University of Rwanda',
    description: 'Collaborative research on machine learning applications for sustainable farming practices in Rwanda.',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    documents: 3,
    progress: 65
  },
  {
    id: '2',
    title: 'Blockchain in African Financial Systems',
    type: 'Co-authoring Project',
    status: 'active',
    members: ['Peter Nkurunziza', 'Dr. Sarah Kagame'],
    institution: 'University of Rwanda',
    description: 'Joint publication on blockchain technology adoption in African financial ecosystems.',
    startDate: '2024-03-01',
    endDate: '2024-08-30',
    documents: 2,
    progress: 40
  },
  {
    id: '3',
    title: 'Water Resource Management Study',
    type: 'Inter-institutional Partnership',
    status: 'pending',
    members: ['Grace Munyangendo'],
    institution: 'University of Cape Town',
    description: 'Cross-institutional research on water management solutions for urban development.',
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    documents: 0,
    progress: 10
  }
];

const availablePartners = [
  {
    id: '1',
    name: 'Dr. Amina Hassan',
    institution: 'University of Nairobi',
    expertise: ['Environmental Science', 'Climate Change', 'Sustainability'],
    publications: 45,
    hIndex: 12,
    email: 'amina.hassan@uonbi.ac.ke'
  },
  {
    id: '2',
    name: 'Prof. John Ochieng',
    institution: 'Makerere University',
    expertise: ['Computer Science', 'AI', 'Machine Learning'],
    publications: 78,
    hIndex: 18,
    email: 'j.ochieng@mak.ac.ug'
  },
  {
    id: '3',
    name: 'Dr. Fatima Al-Zahra',
    institution: 'University of Ghana',
    expertise: ['Economics', 'Development Studies', 'Policy Analysis'],
    publications: 32,
    hIndex: 9,
    email: 'f.alzahra@ug.edu.gh'
  }
];

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState('projects');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { color: 'bg-green-100 text-green-800', label: 'Active' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      'completed': { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
      'cancelled': { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      'Research Partnership': { color: 'bg-purple-100 text-purple-800', icon: '🔬' },
      'Co-authoring Project': { color: 'bg-blue-100 text-blue-800', icon: '✍️' },
      'Inter-institutional Partnership': { color: 'bg-green-100 text-green-800', icon: '🏛️' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig['Research Partnership'];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {type}
      </span>
    );
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
                <p className="text-sm text-gray-600">Research Collaboration</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/demo/ur/user" className="text-blue-600 hover:text-blue-800">My Dashboard</Link>
              <Link href="/demo/ur" className="text-gray-600 hover:text-blue-600">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">🤝 Research Collaboration Hub</h2>
            <p className="text-blue-100 text-lg mb-6">
              Connect with researchers across Africa, form partnerships, and collaborate on groundbreaking research projects.
              Share knowledge, co-author publications, and build lasting academic relationships.
            </p>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
            >
              🚀 Start New Collaboration
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Collaborations
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'discover'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Discover Partners
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'tools'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Collaboration Tools
              </button>
            </nav>
          </div>
        </div>

        {/* My Collaborations Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-green-600">
                      {collaborations.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <div className="text-2xl">🔬</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Partners</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <div className="text-2xl">🤝</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Co-authored Papers</p>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                  <div className="text-2xl">📄</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Institutions</p>
                    <p className="text-2xl font-bold text-orange-600">5</p>
                  </div>
                  <div className="text-2xl">🏛️</div>
                </div>
              </div>
            </div>

            {/* Collaboration Projects */}
            <div className="space-y-4">
              {collaborations.map((collab) => (
                <div key={collab.id} className="bg-white rounded-lg shadow border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{collab.title}</h3>
                        {getStatusBadge(collab.status)}
                        {getTypeBadge(collab.type)}
                      </div>
                      <p className="text-gray-600 mb-3">{collab.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>📅 {collab.startDate} - {collab.endDate}</span>
                        <span>👥 {collab.members.length} members</span>
                        <span>📄 {collab.documents} documents</span>
                        <span>🏛️ {collab.institution}</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="text-right mb-2">
                        <span className="text-sm text-gray-500">Progress</span>
                        <div className="text-lg font-semibold text-gray-900">{collab.progress}%</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${collab.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {collab.members.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="h-8 w-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                          >
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                        {collab.members.length > 3 && (
                          <div className="h-8 w-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                            +{collab.members.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {collab.members.slice(0, 2).join(', ')}
                        {collab.members.length > 2 && ` and ${collab.members.length - 2} others`}
                      </span>
                    </div>

                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                        Message Team
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                        Share Files
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discover Partners Tab */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Research Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Keywords, name, institution..."
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Research Area</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Fields</option>
                    <option>Computer Science</option>
                    <option>Environmental Science</option>
                    <option>Economics</option>
                    <option>Medicine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Institutions</option>
                    <option>University of Nairobi</option>
                    <option>Makerere University</option>
                    <option>University of Ghana</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    Search Partners
                  </button>
                </div>
              </div>
            </div>

            {/* Partner Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availablePartners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg shadow border p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {partner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h4>
                      <p className="text-gray-600 mb-2">{partner.institution}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {partner.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span>📄 {partner.publications} publications</span>
                        <span>📊 h-index: {partner.hIndex}</span>
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
                          Connect
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition text-sm">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collaboration Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Document Sharing */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📁</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Sharing</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Share drafts, data, and research materials securely with your collaboration partners.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
                    Access Shared Folder
                  </button>
                </div>
              </div>

              {/* Co-authoring Platform */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">✍️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Co-authoring Platform</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Collaborate on manuscripts with real-time editing, comments, and version control.
                  </p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm">
                    Start Writing Together
                  </button>
                </div>
              </div>

              {/* Video Conferencing */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Virtual Meetings</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Schedule and host virtual meetings with integrated screen sharing and recording.
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-sm">
                    Schedule Meeting
                  </button>
                </div>
              </div>

              {/* Project Management */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Management</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Track progress, assign tasks, and manage deadlines for your research projects.
                  </p>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition text-sm">
                    Manage Projects
                  </button>
                </div>
              </div>

              {/* Research Data Platform */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Collaboration</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Share datasets, analysis tools, and research methodologies with your team.
                  </p>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition text-sm">
                    Share Data
                  </button>
                </div>
              </div>

              {/* Grant Opportunities */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Grant Opportunities</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Discover funding opportunities and collaborate on grant applications.
                  </p>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition text-sm">
                    Find Grants
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Start New Collaboration</h3>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter collaboration title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Type</label>
                  <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Research Partnership</option>
                    <option>Co-authoring Project</option>
                    <option>Inter-institutional Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your collaboration goals and objectives"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Create Collaboration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
