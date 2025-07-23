"use client";

import LogInWithUni from "@/components/layout/LogInWithUni";
import { useGeneralStore } from "@/store/generalStore";
import Link from "next/link";

export default function GlobalHomePage() {
  const uniName = useGeneralStore((state) => state.affiliatedUni);
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                IR
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  InRep Scholar
                </h1>
                <p className="text-sm text-gray-500">
                  Institutional Repository Platform
                </p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600"
              >
                Contact
              </Link>
              <LogInWithUni />
              {/* <Link
                href={`/demo/${uniName.short.toLowerCase()}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                View {uniName.name} Repository
              </Link> */}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Modern Repository Platform for{" "}
            <span className="text-blue-600">African Universities</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A no-code, cloud-based institutional repository platform designed
            specifically for universities in low-resource environments. Manage
            scholarly outputs from submission to publication with automated
            workflows, plagiarism checking, and DOI assignment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
            >
              Register Your University
            </Link>
            <Link
              href="/demo/alu"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition text-lg"
            >
              Explore Demo Repository
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built for African Universities
            </h3>
            <p className="text-lg text-gray-600">
              Everything you need to manage institutional research outputs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-xl font-semibold mb-3">University-Focused</h4>
              <p className="text-gray-600">
                Multi-tenant platform designed exclusively for universities.
                Each institution gets their own branded repository with custom
                domain and settings.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h4 className="text-xl font-semibold mb-3">Complete Workflow</h4>
              <p className="text-gray-600">
                From upload to publication: automated abstract extraction,
                plagiarism checking, peer review assignment, and DOI
                registration through DataCite.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌐</div>
              <h4 className="text-xl font-semibold mb-3">Open Access Ready</h4>
              <p className="text-gray-600">
                Support for open access, restricted, and private content with
                guest access for public research discovery and global
                visibility.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-3">No-Code Management</h4>
              <p className="text-gray-600">
                Form-based interfaces designed for librarians. No technical
                expertise required for daily operations, user management, or
                repository configuration.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-semibold mb-3">
                Low-Bandwidth Optimized
              </h4>
              <p className="text-gray-600">
                Built for low-resource environments with compressed assets, lazy
                loading, and efficient caching for reliable performance on slow
                connections.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-3">
                Standards Compliant
              </h4>
              <p className="text-gray-600">
                Dublin Core metadata, DOI integration, WCAG accessibility
                compliance, and modern security practices for institutional
                confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How InRep Scholar Works
            </h3>
            <p className="text-lg text-gray-600">
              Simple workflow designed for academic institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold mb-2">
                University Registration
              </h4>
              <p className="text-gray-600">
                Register your institution and get a custom subdomain (e.g.,
                ur.inrepscholar.com)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold mb-2">Student Submission</h4>
              <p className="text-gray-600">
                Students upload theses with automatic abstract extraction and
                metadata entry
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold mb-2">Quality Assurance</h4>
              <p className="text-gray-600">
                Automated plagiarism checking and peer review assignment with
                deadline tracking
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="text-lg font-semibold mb-2">Publication</h4>
              <p className="text-gray-600">
                DOI assignment and publication with global discoverability and
                access controls
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Repository */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Explore a Live Repository
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            See how InRep Scholar works with the African Leadership University
            demo repository
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                UR
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-900">
                  African Leadership University
                </h4>
                <p className="text-gray-600">Demo Repository</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Browse 1,200+ academic documents including theses, dissertations,
              and research articles with full-text search, metadata filtering,
              and open access content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo/alu"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Browse as Guest
              </Link>
              <Link
                href="/demo/alu/admin"
                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
              >
                View Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Join Leading African Universities
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center text-gray-400 font-bold">
                UR
              </div>
              <p className="text-sm text-gray-600">
                African Leadership University
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center text-gray-400 font-bold">
                ALU
              </div>
              <p className="text-sm text-gray-600">
                African Leadership University
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center text-gray-400 font-bold">
                UC
              </div>
              <p className="text-sm text-gray-600">University of Cape Town</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center text-gray-400 font-bold">
                +
              </div>
              <p className="text-sm text-gray-600">Your University</p>
            </div>
          </div>

          <Link
            href="/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg inline-block"
          >
            Register Your University Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  IR
                </div>
                <span className="text-xl font-bold">InRep Scholar</span>
              </div>
              <p className="text-gray-400">
                Empowering African universities with modern repository solutions
                for the digital age.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/demo/alu" className="hover:text-white">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Document Management</li>
                <li>Plagiarism Checking</li>
                <li>Peer Review</li>
                <li>DOI Assignment</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>Training Resources</li>
                <li>Technical Support</li>
                <li>Community Forum</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 InRep Scholar. Built for African universities, by
              African technologists.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
