'use client';

import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { useState } from 'react';

const pendingDocuments = [
  {
    id: '3',
    title: 'Smart Grid Implementation for Rural Electrification in Rwanda',
    author: 'Pierre Nkurunziza',
    faculty: 'Engineering',
    department: 'Electrical Engineering',
    type: 'Master\'s Thesis',
    submissionDate: '2024-06-02',
    abstract: 'Investigation of smart grid technologies for improving rural electrification in Rwanda with focus on renewable energy integration and grid stability...',
    plagiarismScore: 12.4,
    fileSize: '3.1 MB',
    assignedReviewers: [],
    reviewsNeeded: 2,
    priority: 'high'
  },
  {
    id: '6',
    title: 'Blockchain Technology Applications in Rwanda\'s Financial Sector',
    author: 'Peter Nkurunziza',
    faculty: 'Engineering',
    department: 'Computer Science',
    type: 'Master\'s Thesis',
    submissionDate: '2024-05-28',
    abstract: 'Analysis of blockchain implementation opportunities in Rwanda\'s emerging fintech ecosystem and regulatory considerations for adoption...',
    plagiarismScore: 9.7,
    fileSize: '2.8 MB',
    assignedReviewers: ['Dr. Jean Mukiza'],
    reviewsNeeded: 2,
    priority: 'medium'
  },
  {
    id: '7',
    title: 'Sustainable Tourism Development in Post-Genocide Rwanda',
    author: 'Alice Uwimana',
    faculty: 'Business',
    department: 'Tourism Management',
    type: 'Master\'s Thesis',
    submissionDate: '2024-06-01',
    abstract: 'Comprehensive analysis of sustainable tourism strategies and their economic impact on Rwanda\'s development goals...',
    plagiarismScore: 7.2,
    fileSize: '2.1 MB',
    assignedReviewers: [],
    reviewsNeeded: 2,
    priority: 'medium'
  }
];

const availableReviewers = [
  {
    id: 'rev1',
    name: 'Dr. Jean Mukiza',
    title: 'Associate Professor',
    department: 'Computer Science',
    faculty: 'Engineering',
    expertise: ['Machine Learning', 'AI', 'Data Science'],
    currentReviews: 2,
    maxReviews: 5,
    responseRate: '94%',
    avgReviewTime: '7 days',
    email: 'jean.mukiza@ur.ac.rw'
  },
  {
    id: 'rev2',
    name: 'Dr. Sarah Kagame',
    title: 'Professor',
    department: 'Computer Science',
    faculty: 'Engineering',
    expertise: ['Software Engineering', 'Systems Architecture', 'Database Systems'],
    currentReviews: 1,
    maxReviews: 4,
    responseRate: '98%',
    avgReviewTime: '5 days',
    email: 'sarah.kagame@ur.ac.rw'
  },
  {
    id: 'rev3',
    name: 'Dr. Emmanuel Nsanzimana',
    title: 'Senior Lecturer',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    expertise: ['Power Systems', 'Renewable Energy', 'Smart Grids'],
    currentReviews: 3,
    maxReviews: 5,
    responseRate: '91%',
    avgReviewTime: '8 days',
    email: 'emmanuel.nsanzimana@ur.ac.rw'
  },
  {
    id: 'rev4',
    name: 'Dr. Grace Munyangendo',
    title: 'Associate Professor',
    department: 'Environmental Science',
    faculty: 'Science',
    expertise: ['Environmental Management', 'Water Resources', 'Sustainability'],
    currentReviews: 2,
    maxReviews: 4,
    responseRate: '96%',
    avgReviewTime: '6 days',
    email: 'grace.munyangendo@ur.ac.rw'
  },
  {
    id: 'rev5',
    name: 'Dr. Alice Uwimana',
    title: 'Senior Lecturer',
    department: 'Tourism Management',
    faculty: 'Business',
    expertise: ['Tourism Development', 'Economic Development', 'Policy Analysis'],
    currentReviews: 1,
    maxReviews: 3,
    responseRate: '89%',
    avgReviewTime: '9 days',
    email: 'alice.uwimana@ur.ac.rw'
  }
];

export default function ReviewerAssignmentPage() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
  const [reviewDeadline, setReviewDeadline] = useState('');

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'high': { color: 'bg-red-100 text-red-800', label: 'High Priority' },
      'medium': { color: 'bg-yellow-100 text-yellow-800', label: 'Medium Priority' },
      'low': { color: 'bg-green-100 text-green-800', label: 'Low Priority' }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const getReviewerAvailability = (reviewer: typeof availableReviewers[0]) => {
    const workload = (reviewer.currentReviews / reviewer.maxReviews) * 100;
    if (workload <= 50) return { color: 'text-green-600', label: 'Available' };
    if (workload <= 80) return { color: 'text-yellow-600', label: 'Busy' };
    return { color: 'text-red-600', label: 'Overloaded' };
  };

  const handleAssignReviewers = () => {
    if (!selectedDocument || selectedReviewers.length === 0) return;

    // Mock assignment process
    alert(`Assigned ${selectedReviewers.length} reviewer(s) to document. Email notifications sent.`);
    setShowAssignModal(false);
    setSelectedDocument(null);
    setSelectedReviewers([]);
    setReviewDeadline('');
  };

  const getMatchingReviewers = (document: typeof pendingDocuments[0]) => {
    return availableReviewers.filter(reviewer =>
      reviewer.faculty === document.faculty ||
      reviewer.department === document.department ||
      reviewer.expertise.some(exp =>
        document.title.toLowerCase().includes(exp.toLowerCase()) ||
        document.abstract.toLowerCase().includes(exp.toLowerCase())
      )
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reviewer Assignment</h1>
            <p className="text-gray-600">Assign reviewers to pending documents for peer evaluation</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              📊 Review Analytics
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              👥 Manage Reviewers
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-orange-600">{pendingDocuments.length}</p>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Reviewers</p>
                <p className="text-2xl font-bold text-green-600">
                  {availableReviewers.filter(r => r.currentReviews < r.maxReviews).length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Reviews</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="text-2xl">🚨</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Review Time</p>
                <p className="text-2xl font-bold text-blue-600">7d</p>
              </div>
              <div className="text-2xl">⏱️</div>
            </div>
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Documents Awaiting Review Assignment</h3>
            <p className="text-sm text-gray-600">Select documents to assign reviewers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author & Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <Link
                          href={`/demo/ur/documents/${doc.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 line-clamp-2"
                        >
                          {doc.title}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {doc.type} • {doc.fileSize}
                        </div>
                        <div className="text-xs text-gray-700 mt-2 line-clamp-2">
                          {doc.abstract}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{doc.author}</div>
                        <div className="text-sm text-gray-500">{doc.faculty}</div>
                        <div className="text-sm text-gray-500">{doc.department}</div>
                        <div className="text-xs text-gray-500">Submitted: {doc.submissionDate}</div>
                        <div className="text-xs text-green-600">
                          Plagiarism: {doc.plagiarismScore}% ✓
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">{doc.assignedReviewers.length}</span>
                          <span className="text-gray-500"> / {doc.reviewsNeeded} reviewers</span>
                        </div>
                        {doc.assignedReviewers.length > 0 && (
                          <div className="space-y-1">
                            {doc.assignedReviewers.map((reviewer, index) => (
                              <div key={index} className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded">
                                {reviewer}
                              </div>
                            ))}
                          </div>
                        )}
                        {doc.assignedReviewers.length < doc.reviewsNeeded && (
                          <div className="text-xs text-orange-600">
                            Needs {doc.reviewsNeeded - doc.assignedReviewers.length} more reviewer(s)
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(doc.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedDocument(doc.id);
                            setShowAssignModal(true);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                          Assign Reviewers
                        </button>
                        <Link
                          href={`/demo/ur/documents/${doc.id}`}
                          className="text-gray-600 hover:text-gray-800 px-3 py-1 border rounded text-sm"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Available Reviewers */}
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Available Reviewers</h3>
            <p className="text-sm text-gray-600">Current reviewer pool and availability</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reviewer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expertise
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workload
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {availableReviewers.map((reviewer) => {
                  const availability = getReviewerAvailability(reviewer);
                  return (
                    <tr key={reviewer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{reviewer.name}</div>
                          <div className="text-sm text-gray-500">{reviewer.title}</div>
                          <div className="text-sm text-gray-500">{reviewer.department}</div>
                          <div className="text-xs text-gray-400">{reviewer.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {reviewer.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm">
                            {reviewer.currentReviews} / {reviewer.maxReviews} reviews
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                reviewer.currentReviews / reviewer.maxReviews <= 0.5
                                  ? 'bg-green-600'
                                  : reviewer.currentReviews / reviewer.maxReviews <= 0.8
                                  ? 'bg-yellow-600'
                                  : 'bg-red-600'
                              }`}
                              style={{ width: `${(reviewer.currentReviews / reviewer.maxReviews) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm">Response: {reviewer.responseRate}</div>
                          <div className="text-sm">Avg Time: {reviewer.avgReviewTime}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${availability.color}`}>
                          {availability.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Modal */}
        {showAssignModal && selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Assign Reviewers</h3>
                <p className="text-sm text-gray-600">
                  Document: {pendingDocuments.find(d => d.id === selectedDocument)?.title}
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Matching Reviewers */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recommended Reviewers (Based on Expertise)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getMatchingReviewers(pendingDocuments.find(d => d.id === selectedDocument)!).map((reviewer) => (
                      <div
                        key={reviewer.id}
                        className={`border rounded-lg p-4 cursor-pointer transition ${
                          selectedReviewers.includes(reviewer.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          if (selectedReviewers.includes(reviewer.id)) {
                            setSelectedReviewers(prev => prev.filter(id => id !== reviewer.id));
                          } else {
                            setSelectedReviewers(prev => [...prev, reviewer.id]);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{reviewer.name}</h5>
                            <p className="text-sm text-gray-500">{reviewer.title}</p>
                            <p className="text-sm text-gray-500">{reviewer.department}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {reviewer.expertise.slice(0, 3).map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Workload: {reviewer.currentReviews}/{reviewer.maxReviews} •
                              Response: {reviewer.responseRate} •
                              Avg: {reviewer.avgReviewTime}
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedReviewers.includes(reviewer.id)}
                            onChange={() => {}}
                            className="ml-3"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Deadline</label>
                  <input
                    type="date"
                    value={reviewDeadline}
                    onChange={(e) => setReviewDeadline(e.target.value)}
                    min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 2-3 weeks from today</p>
                </div>

                {/* Assignment Summary */}
                {selectedReviewers.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Assignment Summary</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedReviewers.map(reviewerId => {
                        const reviewer = availableReviewers.find(r => r.id === reviewerId);
                        return (
                          <li key={reviewerId}>• {reviewer?.name} ({reviewer?.department})</li>
                        );
                      })}
                    </ul>
                    <p className="text-xs text-gray-600 mt-2">
                      Email notifications will be sent to selected reviewers with document access and deadline.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedDocument(null);
                    setSelectedReviewers([]);
                    setReviewDeadline('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignReviewers}
                  disabled={selectedReviewers.length === 0 || !reviewDeadline}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Assign {selectedReviewers.length} Reviewer(s)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
