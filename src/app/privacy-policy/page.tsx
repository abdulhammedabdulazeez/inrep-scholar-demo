"use client";

import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Users,
  FileText,
  Settings,
  Mail,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Effective Date: July 01, 2025</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            At InRep Scholar, we are committed to protecting your privacy and
            ensuring the security of your data. This Privacy Policy outlines how
            we collect, use, store, and protect your information in compliance
            with Rwanda's Data Protection and Privacy Law (2021) and ethical
            standards.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="#data-collection"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <FileText className="h-4 w-4" />
              <span>1. Data We Collect</span>
            </a>
            <a
              href="#data-usage"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <Settings className="h-4 w-4" />
              <span>2. How We Use Your Data</span>
            </a>
            <a
              href="#data-security"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <Lock className="h-4 w-4" />
              <span>3. Data Security</span>
            </a>
            <a
              href="#user-rights"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <Users className="h-4 w-4" />
              <span>4. User Rights</span>
            </a>
            <a
              href="#data-sharing"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <Eye className="h-4 w-4" />
              <span>5. Data Sharing & Transparency</span>
            </a>
            <a
              href="#compliance"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
            >
              <CheckCircle className="h-4 w-4" />
              <span>6. Regulatory Compliance</span>
            </a>
          </div>
        </div>

        {/* Section 1: Data We Collect */}
        <section
          id="data-collection"
          className="bg-white rounded-lg shadow-sm border p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              1. Data We Collect
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-200 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                User Profiles
              </h3>
              <p className="text-gray-700 mb-2">
                Name, email, and university role (e.g., student, faculty, admin)
                for authorized access.
              </p>
            </div>

            <div className="border-l-4 border-green-200 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Academic Data
              </h3>
              <p className="text-gray-700 mb-2">
                Thesis documents (PDF/DOCX) and metadata (e.g., title, author,
                subject) to support research sharing.
              </p>
            </div>

            <div className="border-l-4 border-purple-200 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Usage Data
              </h3>
              <p className="text-gray-700 mb-2">
                System interactions (e.g., search queries, uploads) to improve
                functionality.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: How We Use Your Data */}
        <section
          id="data-usage"
          className="bg-white rounded-lg shadow-sm border p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              2. How We Use Your Data
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Repository Management
              </h3>
              <p className="text-gray-700">
                Enable thesis submission, storage, and retrieval in our
                institutional repository.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Access Control
              </h3>
              <p className="text-gray-700">
                Provide authorized access to university-specific content via
                tenantID-based queries.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Analytics & Improvement
              </h3>
              <p className="text-gray-700">
                Generate analytics to enhance user experience and monitor
                engagement.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Pilot Features
              </h3>
              <p className="text-gray-700">
                Conduct mock plagiarism checks and DOI assignments during the
                pilot (disclosed as simulations).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Data Security */}
        <section
          id="data-security"
          className="bg-white rounded-lg shadow-sm border p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              3. Data Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Encryption</h3>
                  <p className="text-gray-700 text-sm">
                    AES-256 for files in Supabase Storage and SSL/TLS for
                    PostgreSQL connections.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Access Control</h3>
                  <p className="text-gray-700 text-sm">
                    JWT-based authentication restricts access to authorized
                    roles (e.g., Admins, Reviewers).
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Anonymization</h3>
                  <p className="text-gray-700 text-sm">
                    Public metadata (e.g., thesis titles) excludes personal
                    identifiers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Security Audits</h3>
                  <p className="text-gray-700 text-sm">
                    Regular penetration testing to identify vulnerabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: User Rights */}
        <section
          id="user-rights"
          className="bg-white rounded-lg shadow-sm border p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              4. User Rights
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Consent</h3>
                <p className="text-gray-700">
                  Review and approve data usage via consent forms before
                  submission.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Access Control
                </h3>
                <p className="text-gray-700">
                  Set thesis access levels (OpenAccess, Restricted, Private).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Feedback</h3>
                <p className="text-gray-700">
                  Receive neutral plagiarism feedback (e.g., "Document requires
                  review") with resubmission options.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Appeal</h3>
                <p className="text-gray-700">
                  Dispute plagiarism results through a clear process, ensuring
                  fairness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Data Sharing and Transparency */}
        <section
          id="data-sharing"
          className="bg-white rounded-lg shadow-sm border p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              5. Data Sharing and Transparency
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-200 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Limited Sharing
              </h3>
              <p className="text-gray-700">
                Data is shared only with authorized university users (e.g.,
                librarians, faculty) within your institution.
              </p>
            </div>

            <div className="border-l-4 border-green-200 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Transparency
              </h3>
              <p className="text-gray-700">
                Mock integrations (e.g., Turnitin, DataCite) are disclosed in
                consent forms and pilot documentation.
              </p>
            </div>

            <div className="border-l-4 border-red-200 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                No Public Exposure
              </h3>
              <p className="text-gray-700">
                Sensitive metadata or plagiarism scores are restricted to
                authorized roles.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Regulatory Compliance */}
        <section
          id="compliance"
          className="bg-white rounded-lg shadow-sm border p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              6. Regulatory Compliance
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Rwanda's Data Protection and Privacy Law (2021)
              </h3>
              <p className="text-gray-700">
                Secure data handling, user consent, and breach notification.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                ALU Ethics Framework
              </h3>
              <p className="text-gray-700">
                Ensures transparency, fairness, and no harm.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Ethical Standards
              </h3>
              <p className="text-gray-700">
                Aligns with IEEE (2019) and ACM (2018) principles for data
                security and user respect.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Inclusivity and User Support */}
        <section className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            7. Inclusivity and User Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Accessible Design
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Simplified forms, high-contrast visuals, and tutorials
                    support diverse users (18+ years).
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Cultural Sensitivity
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Metadata redaction for sensitive topics (e.g., gender,
                    politics) respects Rwanda's norms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-6">
              For questions or concerns about your data, contact us at{" "}
              <a
                href="mailto:contact@inrepscholar.org"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                contact@inrepscholar.org
              </a>
            </p>
            <p className="text-gray-600">
              We are committed to addressing your needs promptly.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-700 text-lg">
            InRep Scholar strives to democratize knowledge while safeguarding
            your privacy. Thank you for trusting us with your academic
            contributions.
          </p>
        </div>
      </div>
    </div>
  );
}
