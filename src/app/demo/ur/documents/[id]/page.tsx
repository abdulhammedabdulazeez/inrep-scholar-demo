'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';

type DocumentPageProps = {
  params: {
    id: string;
  };
};

// Mock document data based on ID
const getDocumentById = (id: string) => {
  const documents = {
    '1': {
      id: '1',
      title: 'Machine Learning Applications in Agricultural Yield Prediction for Rwanda',
      author: 'Marie Uwimana',
      authorEmail: 'marie.uwimana@ur.ac.rw',
      supervisor: 'Dr. Jean Mukiza',
      faculty: 'Engineering',
      department: 'Computer Science',
      type: 'Master\'s Thesis',
      year: '2024',
      submissionDate: '2024-05-10',
      doi: '10.12345/ur.thesis.2024.001',
      accessRights: 'open_access',
      ccLicense: 'CC BY 4.0',
      abstract: 'This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda. Using satellite imagery, weather data, and historical crop yield information, we developed models that can accurately forecast harvest outcomes. The research demonstrates significant improvements in prediction accuracy compared to traditional methods, with potential applications for food security planning and agricultural policy development in Rwanda. Our findings show that ensemble methods combining multiple data sources achieve the highest accuracy rates, with an average prediction error of less than 12%. The study contributes to both machine learning methodology and agricultural planning in developing countries.',
      keywords: ['Machine Learning', 'Agriculture', 'Rwanda', 'Yield Prediction', 'Satellite Imagery', 'Food Security'],
      downloads: 245,
      views: 1089,
      citations: 3,
      fileSize: '2.4 MB',
      pages: 95,
      language: 'English',
      subject: 'Computer Science, Agricultural Technology',
      status: 'published'
    },
    '2': {
      id: '2',
      title: 'Deep Learning Frameworks for Natural Language Processing in Kinyarwanda',
      author: 'Dr. Jean Mukiza',
      authorEmail: 'jean.mukiza@ur.ac.rw',
      faculty: 'Engineering',
      department: 'Computer Science',
      type: 'Research Article',
      year: '2024',
      submissionDate: '2024-04-18',
      doi: '10.12345/ur.article.2024.002',
      accessRights: 'open_access',
      ccLicense: 'CC BY-SA 4.0',
      abstract: 'This research presents comprehensive deep learning frameworks specifically designed for Kinyarwanda natural language processing. We developed novel architectures that address the unique morphological and syntactic characteristics of Kinyarwanda, achieving state-of-the-art performance in tasks such as sentiment analysis, named entity recognition, and machine translation. Our models show significant improvements over existing approaches, with F1 scores exceeding 0.85 for most NLP tasks.',
      keywords: ['NLP', 'Kinyarwanda', 'Deep Learning', 'African Languages', 'Machine Translation'],
      downloads: 189,
      views: 756,
      citations: 5,
      fileSize: '1.8 MB',
      pages: 24,
      language: 'English',
      subject: 'Natural Language Processing, African Languages',
      status: 'published'
    }
  };

  return documents[id as keyof typeof documents] || documents['1'];
};

export default function DocumentLandingPage() {
  const { id } = useParams();
  const document = getDocumentById(id!);
  const [userRole] = useState<'guest' | 'user' | 'admin'>('guest');
  const [showScholarChat, setShowScholarChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Scholar AI. I can help you understand this research. What would you like to know about this thesis?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const canViewFullText = (accessRights: string) => {
    if (userRole === 'admin') return true;
    if (userRole === 'user' && accessRights !== 'private') return true;
    if (userRole === 'guest' && accessRights === 'open_access') return true;
    return false;
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const newMessages = [
      ...chatMessages,
      { role: 'user', content: chatInput },
      { role: 'assistant', content: `Based on this thesis about ${document.title.toLowerCase()}, I can tell you that the research focuses on ${document.abstract.split('.')[0].toLowerCase()}. The methodology involves machine learning techniques and shows promising results for agricultural applications in Rwanda. Would you like me to explain any specific aspect in more detail?` }
    ];

    setChatMessages(newMessages);
    setChatInput('');
  };

  const generateBibTeX = () => {
    return `@${document.type.includes('Thesis') ? 'mastersthesis' : 'article'}{${document.author.split(' ').join('').toLowerCase()}${document.year},
  title={${document.title}},
  author={${document.author}},
  year={${document.year}},
  school={University of Rwanda},
  type={${document.type}},
  doi={${document.doi}},
  url={https://ur.inrepscholar.com/documents/${document.id}}
}`;
  };

  const getAccessBadge = (accessRights: string) => {
    switch (accessRights) {
      case 'open_access':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🌐 Open Access</span>;
      case 'restricted':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">🔒 Restricted Access</span>;
      case 'private':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">🚫 Private</span>;
      default:
        return null;
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
                <p className="text-sm text-gray-600">Repository</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/demo/ur/search" className="text-gray-600 hover:text-blue-600">Search</Link>
              <Link href="/demo/ur" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/demo/ur/admin" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/demo/ur" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/demo/ur/search" className="hover:text-blue-600">Search</Link>
          <span className="mx-2">/</span>
          <span>Document</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Header */}
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getAccessBadge(document.accessRights)}
                    <span className="text-sm text-gray-500">{document.type}</span>
                    {document.doi && (
                      <>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-blue-600">DOI: {document.doi}</span>
                      </>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{document.title}</h1>

                  <div className="space-y-2 text-gray-600">
                    <p><strong>Author:</strong> {document.author} ({document.authorEmail})</p>
                    {document.supervisor && <p><strong>Supervisor:</strong> {document.supervisor}</p>}
                    <p><strong>Faculty:</strong> {document.faculty} • <strong>Department:</strong> {document.department}</p>
                    <p><strong>Year:</strong> {document.year} • <strong>Language:</strong> {document.language}</p>
                    {document.ccLicense && <p><strong>License:</strong> {document.ccLicense}</p>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {canViewFullText(document.accessRights) && (
                  <>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium">
                      📄 View PDF
                    </button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition font-medium">
                      ⬇️ Download PDF
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowScholarChat(!showScholarChat)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition font-medium"
                >
                  🤖 Scholar AI Chat
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-medium">
                  📋 Cite
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-medium">
                  🔗 Share
                </button>
              </div>

              {!canViewFullText(document.accessRights) && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800">
                    <strong>Access Restricted:</strong> Full text access is limited.
                    <Link href="/demo/ur" className="text-blue-600 hover:text-blue-800 ml-1">Sign in</Link> to request access or contact the author.
                  </p>
                </div>
              )}
            </div>

            {/* Abstract */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Abstract</h3>
              <p className="text-gray-700 leading-relaxed">{document.abstract}</p>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {document.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* PDF Viewer (Mock) */}
            {canViewFullText(document.accessRights) && (
              <div className="bg-white rounded-lg shadow border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Preview</h3>
                <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📄</div>
                    <p>PDF Viewer</p>
                    <p className="text-sm">{document.pages} pages • {document.fileSize}</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                      Open Full PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Scholar AI Chat */}
            {showScholarChat && (
              <div className="bg-white rounded-lg shadow border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🤖 Scholar AI Assistant</h3>

                <div className="border rounded-lg p-4 h-64 overflow-y-auto mb-4 bg-gray-50">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-3 rounded-lg max-w-xs ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about this research..."
                    className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments & Discussion</h3>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">JM</div>
                    <span className="font-medium">Dr. Jean Mukiza</span>
                    <span className="text-gray-500 text-sm">2 days ago</span>
                  </div>
                  <p className="text-gray-700">Excellent work, Marie! The methodology is sound and the results are very promising for agricultural applications in Rwanda. Have you considered extending this to other crops?</p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">PN</div>
                    <span className="font-medium">Peter Nkurunziza</span>
                    <span className="text-gray-500 text-sm">1 day ago</span>
                  </div>
                  <p className="text-gray-700">This research aligns well with my work on rural technology adoption. The satellite imagery approach is particularly innovative.</p>
                </div>
              </div>

              {userRole !== 'guest' ? (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Add a comment</h4>
                  <textarea
                    placeholder="Share your thoughts..."
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Post Comment
                  </button>
                </div>
              ) : (
                <div className="border-t pt-4 text-center">
                  <p className="text-gray-600">
                    <Link href="/demo/ur" className="text-blue-600 hover:text-blue-800">Sign in</Link> to join the discussion
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Document Metrics */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-semibold">{document.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">{document.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Citations</span>
                  <span className="font-semibold">{document.citations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size</span>
                  <span className="font-semibold">{document.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-semibold">{document.pages}</span>
                </div>
              </div>
            </div>

            {/* Citation */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Citation</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">APA Style</label>
                  <div className="bg-gray-50 p-3 rounded text-sm text-gray-800">
                    {document.author} ({document.year}). <em>{document.title}</em>. University of Rwanda.
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BibTeX</label>
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-800 font-mono">
                    <pre className="whitespace-pre-wrap">{generateBibTeX()}</pre>
                  </div>
                </div>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition text-sm">
                  📋 Copy Citation
                </button>
              </div>
            </div>

            {/* Social Share */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-sm">
                  📘 Share on Facebook
                </button>
                <button className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 transition text-sm">
                  🐦 Share on Twitter
                </button>
                <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition text-sm">
                  💼 Share on LinkedIn
                </button>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition text-sm">
                  🔗 Copy Link
                </button>
              </div>
            </div>

            {/* Related Documents */}
            <div className="bg-white rounded-lg shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Research</h3>
              <div className="space-y-3">
                <Link href="/demo/ur/documents/2" className="block p-3 border rounded hover:bg-gray-50 transition">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">NLP for Kinyarwanda</h4>
                  <p className="text-xs text-gray-600">Dr. Jean Mukiza • 2024</p>
                </Link>
                <Link href="/demo/ur/documents/4" className="block p-3 border rounded hover:bg-gray-50 transition">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">Water Management Systems</h4>
                  <p className="text-xs text-gray-600">Grace Munyangendo • 2024</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
