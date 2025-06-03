'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UniversityRepositoryHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const featuredTheses = [
    {
      id: '1',
      title: 'Machine Learning Applications in Agricultural Yield Prediction for Rwanda',
      author: 'Marie Uwimana',
      faculty: 'Engineering',
      type: 'Master\'s Thesis',
      year: '2024',
      abstract: 'This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda using satellite imagery and weather data...'
    },
    {
      id: '2',
      title: 'Deep Learning Frameworks for Natural Language Processing in Kinyarwanda',
      author: 'Dr. Jean Mukiza',
      faculty: 'Engineering',
      type: 'Research Article',
      year: '2024',
      abstract: 'A comprehensive study on developing NLP frameworks specifically designed for Kinyarwanda language processing...'
    },
    {
      id: '3',
      title: 'Sustainable Water Management Systems in Urban Rwanda',
      author: 'Grace Munyangendo',
      faculty: 'Science',
      type: 'PhD Dissertation',
      year: '2024',
      abstract: 'Investigation of innovative water management solutions for rapidly growing urban areas in Rwanda...'
    },
    {
      id: '4',
      title: 'Traditional Medicine Integration in Modern Healthcare Systems',
      author: 'Dr. Emmanuel Nsanzimana',
      faculty: 'Medicine',
      type: 'Research Article',
      year: '2024',
      abstract: 'Exploring pathways for integrating traditional Rwandan medicine practices with contemporary healthcare delivery...'
    },
    {
      id: '5',
      title: 'Blockchain Technology Applications in Rwanda\'s Financial Sector',
      author: 'Peter Nkurunziza',
      faculty: 'Engineering',
      type: 'Master\'s Thesis',
      year: '2024',
      abstract: 'Analysis of blockchain implementation opportunities in Rwanda\'s emerging fintech ecosystem...'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/demo/ur/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* University Branding */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">UR</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">University of Rwanda</h1>
                <p className="text-sm text-gray-600">Institutional Repository</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/demo/ur" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/demo/ur/search" className="text-gray-700 hover:text-blue-600">Browse</Link>
              <Link href="/demo/ur/collaboration" className="text-gray-700 hover:text-blue-600">Collaborate</Link>
              <Link href="/demo/ur/newsletter" className="text-gray-700 hover:text-blue-600">Newsletter</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Log In
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
              <Link
                href="/demo/ur/admin"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Discover Academic Excellence</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore over 1,200 research documents from University of Rwanda scholars
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search theses, articles, authors, or keywords..."
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-blue-800 px-6 py-3 rounded-r-lg hover:bg-blue-900 transition"
              >
                🔍 Search
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
              <div className="text-3xl font-bold text-blue-600">1,247</div>
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
              <p className="text-gray-600">Recent and notable contributions from our academic community</p>
            </div>
            <Link
              href="/demo/ur/search"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTheses.slice(0, 6).map((thesis) => (
              <div key={thesis.id} className="bg-white rounded-lg shadow border hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {thesis.type}
                    </span>
                    <span className="text-gray-500 text-sm">{thesis.year}</span>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    <Link href={`/demo/ur/documents/${thesis.id}`} className="hover:text-blue-600">
                      {thesis.title}
                    </Link>
                  </h4>

                  <p className="text-gray-600 text-sm mb-3">
                    by <span className="font-medium">{thesis.author}</span> • {thesis.faculty}
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {thesis.abstract}
                  </p>

                  <Link
                    href={`/demo/ur/documents/${thesis.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Access</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/demo/ur/search?faculty=engineering" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
              <div className="text-3xl mb-3">⚙️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Engineering Research</h4>
              <p className="text-gray-600 text-sm">Explore innovations in technology and engineering solutions</p>
            </Link>

            <Link href="/demo/ur/search?faculty=science" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
              <div className="text-3xl mb-3">🔬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Science Research</h4>
              <p className="text-gray-600 text-sm">Discover breakthroughs in natural and applied sciences</p>
            </Link>

            <Link href="/demo/ur/search?faculty=medicine" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center">
              <div className="text-3xl mb-3">🏥</div>
              <h4 className="font-semibold text-gray-900 mb-2">Medical Research</h4>
              <p className="text-gray-600 text-sm">Access healthcare and medical science publications</p>
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
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">UR</div>
                <span className="font-bold text-gray-900">University of Rwanda</span>
              </div>
              <p className="text-gray-600 text-sm">
                Advancing knowledge through research excellence and academic innovation.
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">📘 Facebook</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">🐦 Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">💼 LinkedIn</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/demo/ur/search?type=thesis" className="hover:text-blue-600">Theses</Link></li>
                <li><Link href="/demo/ur/search?type=article" className="hover:text-blue-600">Articles</Link></li>
                <li><Link href="/demo/ur/search?type=dissertation" className="hover:text-blue-600">Dissertations</Link></li>
                <li><Link href="/demo/ur/search" className="hover:text-blue-600">All Documents</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href="/demo/ur/collaboration" className="hover:text-blue-600">Collaboration</Link></li>
                <li><Link href="/demo/ur/newsletter" className="hover:text-blue-600">Newsletter</Link></li>
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
            <p>&copy; 2024 University of Rwanda. All rights reserved. | Powered by InRep Scholar</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white p-8 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Log In to Your Account</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 px-3 py-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="w-full border border-gray-300 px-3 py-2 rounded-md" />
              </div>
              <div className="flex items-center justify-between">
                <button type="button" className="text-sm text-blue-600 hover:text-blue-800">Forgot Password?</button>
              </div>
              <Link href="/demo/ur/user" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition block text-center">
                Log In
              </Link>
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm block mx-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowSignupModal(false)}>
          <div className="bg-white p-8 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create Your Account</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 px-3 py-2 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                <select className="w-full border border-gray-300 px-3 py-2 rounded-md">
                  <option>Select Faculty</option>
                  <option>Engineering</option>
                  <option>Science</option>
                  <option>Medicine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="w-full border border-gray-300 px-3 py-2 rounded-md" />
              </div>
              <Link href="/demo/ur/user" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition block text-center">
                Sign Up
              </Link>
            </form>
            <button
              onClick={() => setShowSignupModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm block mx-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
