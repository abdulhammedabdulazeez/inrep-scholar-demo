"use client";

import Link from "next/link";
import { useState } from "react";

export default function DocumentUploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    supervisorName: "",
    supervisorEmail: "",
    faculty: "",
    department: "",
    documentType: "",
    subject: "",
    keywords: "",
    accessRights: "open_access",
    ccLicense: "",
    hasExistingDOI: false,
    existingDOI: "",
    abstract: "",
    language: "English",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedAbstract, setExtractedAbstract] = useState("");
  const [abstractExtractionStatus, setAbstractExtractionStatus] = useState<
    "pending" | "extracting" | "success" | "failed" | null
  >(null);
  const [plagiarismStatus, setPlagiarismStatus] = useState<
    "pending" | "checking" | "passed" | "failed" | null
  >(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadProgress(0);

    // Simulate file upload
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          // Start abstract extraction
          setTimeout(() => {
            setAbstractExtractionStatus("extracting");
            // Simulate extraction process
            setTimeout(() => {
              setExtractedAbstract(
                "This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda. Using satellite imagery, weather data, and historical crop yield information, we developed models that can accurately forecast harvest outcomes. The research demonstrates significant improvements in prediction accuracy compared to traditional methods."
              );
              setAbstractExtractionStatus("success");
              setFormData((prev) => ({
                ...prev,
                abstract:
                  "This thesis explores the application of machine learning techniques to predict agricultural yields in Rwanda. Using satellite imagery, weather data, and historical crop yield information, we developed models that can accurately forecast harvest outcomes. The research demonstrates significant improvements in prediction accuracy compared to traditional methods.",
              }));
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission process
    setTimeout(() => {
      setPlagiarismStatus("checking");

      // Simulate plagiarism check
      setTimeout(() => {
        setPlagiarismStatus("passed");
        setCurrentStep(3);
        setIsSubmitting(false);
      }, 3000);
    }, 1000);
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "extracting":
      case "checking":
        return "🔄";
      case "success":
      case "passed":
        return "✅";
      case "failed":
        return "❌";
      default:
        return "⏳";
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "success":
      case "passed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "extracting":
      case "checking":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo/alu" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ALU
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  African Leadership University
                </h1>
                <p className="text-sm text-gray-600">Document Upload</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                href="/demo/alu/user"
                className="text-gray-600 hover:text-blue-600"
              >
                My Dashboard
              </Link>
              <Link
                href="/demo/alu"
                className="text-gray-600 hover:text-blue-600"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                1
              </div>
              <span>Upload & Metadata</span>
            </div>

            <div
              className={`w-16 h-1 ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
              } rounded`}
            />

            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                2
              </div>
              <span>Quality Check</span>
            </div>

            <div
              className={`w-16 h-1 ${
                currentStep >= 3 ? "bg-blue-600" : "bg-gray-300"
              } rounded`}
            />

            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 3 ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-green-600 text-white" : "bg-gray-300"
                }`}
              >
                3
              </div>
              <span>Complete</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Upload Document
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                    {!file ? (
                      <>
                        <div className="text-4xl text-gray-400 mb-4">📄</div>
                        <p className="text-gray-600 mb-2">
                          Drag and drop your document here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports PDF, DOCX (max 50MB)
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.docx,.doc"
                          onChange={handleFileUpload}
                          className="mt-4"
                        />
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-4xl text-green-600">✅</div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {uploadProgress < 100 && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setUploadProgress(0);
                            setAbstractExtractionStatus(null);
                            setExtractedAbstract("");
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove file
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Abstract Extraction Status */}
                {file && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getStatusIcon(abstractExtractionStatus)}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Abstract Extraction
                        </h4>
                        <p
                          className={`text-sm ${getStatusColor(
                            abstractExtractionStatus
                          )}`}
                        >
                          {abstractExtractionStatus === "extracting" &&
                            "Analyzing document and extracting abstract..."}
                          {abstractExtractionStatus === "success" &&
                            "Abstract successfully extracted! Please review and edit if needed."}
                          {abstractExtractionStatus === "failed" &&
                            "Failed to extract abstract. Please enter manually."}
                          {!abstractExtractionStatus &&
                            "Waiting for file upload..."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Document Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type *
                    </label>
                    <select
                      value={formData.documentType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          documentType: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="masters_thesis">Master's Thesis</option>
                      <option value="phd_dissertation">PhD Dissertation</option>
                      <option value="research_article">Research Article</option>
                      <option value="conference_paper">Conference Paper</option>
                      <option value="book_chapter">Book Chapter</option>
                    </select>
                  </div>

                  {/* Faculty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty *
                    </label>
                    <select
                      value={formData.faculty}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          faculty: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select faculty</option>
                      <option value="engineering">Engineering</option>
                      <option value="science">Science</option>
                      <option value="medicine">Medicine</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="business">Business</option>
                    </select>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          department: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select department</option>
                      <option value="computer_science">Computer Science</option>
                      <option value="electrical_engineering">
                        Electrical Engineering
                      </option>
                      <option value="mechanical_engineering">
                        Mechanical Engineering
                      </option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                    </select>
                  </div>

                  {/* Supervisor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supervisor Name
                    </label>
                    <input
                      type="text"
                      value={formData.supervisorName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          supervisorName: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Supervisor Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supervisor Email
                    </label>
                    <input
                      type="email"
                      value={formData.supervisorEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          supervisorEmail: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Abstract *
                  </label>
                  {abstractExtractionStatus === "success" && (
                    <p className="text-sm text-green-600 mb-2">
                      ✅ Auto-extracted from your document. Please review and
                      edit if needed.
                    </p>
                  )}
                  <textarea
                    value={formData.abstract}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        abstract: e.target.value,
                      }))
                    }
                    rows={6}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      abstractExtractionStatus === "extracting"
                        ? "Extracting abstract from document..."
                        : "Enter the document abstract"
                    }
                    required
                    disabled={abstractExtractionStatus === "extracting"}
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        keywords: e.target.value,
                      }))
                    }
                    placeholder="Separate keywords with commas"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Access Rights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Access Rights *
                    </label>
                    <select
                      value={formData.accessRights}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          accessRights: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="open_access">Open Access (Public)</option>
                      <option value="restricted">
                        Restricted (University Only)
                      </option>
                      <option value="private">Private (Author Only)</option>
                    </select>
                  </div>

                  {/* Creative Commons License */}
                  {formData.accessRights === "open_access" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Creative Commons License
                      </label>
                      <select
                        value={formData.ccLicense}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            ccLicense: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select license (optional)</option>
                        <option value="CC BY 4.0">CC BY 4.0</option>
                        <option value="CC BY-SA 4.0">CC BY-SA 4.0</option>
                        <option value="CC BY-NC 4.0">CC BY-NC 4.0</option>
                        <option value="CC BY-NC-SA 4.0">CC BY-NC-SA 4.0</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Existing DOI */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="hasExistingDOI"
                      checked={formData.hasExistingDOI}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hasExistingDOI: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <label
                      htmlFor="hasExistingDOI"
                      className="text-sm font-medium text-gray-700"
                    >
                      This document already has a DOI
                    </label>
                  </div>

                  {formData.hasExistingDOI && (
                    <input
                      type="text"
                      value={formData.existingDOI}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          existingDOI: e.target.value,
                        }))
                      }
                      placeholder="10.1000/example.doi"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link
                    href="/demo/alu/user"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={
                      !file ||
                      isSubmitting ||
                      abstractExtractionStatus === "extracting"
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Document"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quality Assurance
              </h2>

              <div className="space-y-6">
                {/* Plagiarism Check */}
                <div className="border rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl">
                      {getStatusIcon(plagiarismStatus)}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Plagiarism Check
                      </h3>
                      <p className={`${getStatusColor(plagiarismStatus)}`}>
                        {plagiarismStatus === "checking" &&
                          "Analyzing document for similarity... This may take a few minutes."}
                        {plagiarismStatus === "passed" &&
                          "Plagiarism check passed! Similarity score: 8.2% (Below 20% threshold)"}
                        {plagiarismStatus === "failed" &&
                          "Plagiarism check failed. High similarity detected. Please review and revise."}
                      </p>
                    </div>
                  </div>

                  {plagiarismStatus === "checking" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full animate-pulse"
                        style={{ width: "60%" }}
                      />
                    </div>
                  )}
                </div>

                {/* Review Assignment (will be shown after plagiarism passes) */}
                {plagiarismStatus === "passed" && (
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl">⏳</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Peer Review Assignment
                        </h3>
                        <p className="text-gray-600">
                          Your document will be assigned to reviewers for
                          academic evaluation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DOI Assignment (will be shown after review) */}
                {plagiarismStatus === "passed" && (
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl">⏳</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          DOI Assignment
                        </h3>
                        <p className="text-gray-600">
                          A Digital Object Identifier will be assigned after
                          peer review approval.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            <div className="bg-white rounded-lg shadow border p-8">
              <div className="text-6xl text-green-600 mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Document Successfully Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Your document has been uploaded and passed the initial quality
                checks. It will now go through the review process.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Next Steps:
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • Reviewers will be assigned to evaluate your document
                  </li>
                  <li>
                    • You'll receive email notifications about review progress
                  </li>
                  <li>• DOI will be assigned after successful review</li>
                  <li>• Document will be published in the repository</li>
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <Link
                  href="/demo/alu/user"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                  View My Documents
                </Link>
                <Link
                  href="/demo/alu/user/upload"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition"
                >
                  Upload Another Document
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
