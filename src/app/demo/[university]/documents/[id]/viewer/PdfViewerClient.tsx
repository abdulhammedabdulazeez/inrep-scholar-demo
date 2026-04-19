"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDocumentDetails } from "@/hooks/useDocumentDetails";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

function isPdfMime(mimeType: string | null | undefined): boolean {
  return (mimeType || "").toLowerCase() === "application/pdf";
}

export default function PdfViewerClient() {
  const params = useParams();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);

  const documentId = params.id as string;
  const subdomain = params.university as string;
  const { data: detail, isLoading } = useDocumentDetails(documentId);
  const title = detail?.document?.title || "Document";
  const preferredUrl = detail?.document?.pdf_preview_url || detail?.document?.file_url;
  const fileMimeType = detail?.document?.file_mime_type;
  const canRenderPdf = !!preferredUrl && isPdfMime(fileMimeType);
  const canGoPrev = pageNumber > 1;
  const canGoNext = !!numPages && pageNumber < numPages;
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-md bg-blue-600 px-2 py-1 text-sm font-bold text-white">
              IR
            </div>
            <p className="text-sm font-semibold text-gray-900">Inrep Scholar</p>
          </div>
          <Link
            href={`/demo/${subdomain}/documents/${documentId}`}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to details
          </Link>
        </div>
      </header>

      <header className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="w-1/2">
            <p className="truncate text-sm text-gray-500">Embedded PDF Viewer</p>
            <h1 className="truncate text-lg font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={!canGoPrev}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="page-number" className="text-sm text-gray-600">
                Page
              </label>
              <input
                id="page-number"
                type="number"
                min={1}
                max={numPages || 1}
                value={pageNumber}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (!Number.isFinite(next)) return;
                  if (numPages) {
                    setPageNumber(Math.max(1, Math.min(next, numPages)));
                  } else {
                    setPageNumber(Math.max(1, next));
                  }
                }}
                className="w-16 rounded-md border px-2 py-1 text-sm"
              />
              <span className="text-sm text-gray-600">/ {numPages || "--"}</span>
            </div>
            <button
              type="button"
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() =>
                setPageNumber((prev) =>
                  numPages ? Math.min(prev + 1, numPages) : prev + 1
                )
              }
              disabled={!canGoNext}
            >
              Next
            </button>
            <button
              type="button"
              className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setZoom((prev) => Math.max(0.6, prev - 0.1))}
              disabled={zoom <= 0.6}
            >
              -
            </button>
            <span className="w-12 text-center text-sm text-gray-700">{zoomPercent}%</span>
            <button
              type="button"
              className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setZoom((prev) => Math.min(2, prev + 0.1))}
              disabled={zoom >= 2}
            >
              +
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-[calc(100vh-185px)] overflow-auto rounded-lg border bg-white p-3">
          <h2 className="mb-3 text-sm font-semibold text-gray-800">Pages</h2>
          {canRenderPdf && numPages ? (
            <Document file={preferredUrl}>
              <div className="space-y-3">
                {Array.from({ length: numPages }, (_, index) => {
                  const thumbPage = index + 1;
                  const isActive = thumbPage === pageNumber;
                  return (
                    <button
                      type="button"
                      key={thumbPage}
                      onClick={() => setPageNumber(thumbPage)}
                      className={`w-full rounded-md border p-2 text-left transition ${
                        isActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <p className="mb-2 text-xs font-medium text-gray-600">
                        Page {thumbPage}
                      </p>
                      <div className="overflow-hidden rounded border bg-gray-100">
                        <Page
                          pageNumber={thumbPage}
                          width={210}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </Document>
          ) : (
            <p className="text-sm text-gray-500">
              {isLoading ? "Loading page previews..." : "Page previews unavailable."}
            </p>
          )}
        </aside>
        <div className="h-[calc(100vh-185px)] overflow-auto rounded-lg border bg-white p-4">
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading file details...</p>
          ) : canRenderPdf ? (
            <Document
              file={preferredUrl}
              onLoadSuccess={({ numPages: totalPages }) => {
                setNumPages(totalPages);
                setPageNumber(1);
                setPdfLoadError(null);
              }}
              onLoadError={(error) => {
                setNumPages(undefined);
                setPdfLoadError(error.message || "Could not load PDF.");
              }}
              loading={<p className="text-sm text-gray-500">Loading PDF...</p>}
              error={
                <p className="text-sm text-red-600">
                  Could not load this PDF. Check URL/access and try again.
                </p>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={900}
                scale={zoom}
                renderAnnotationLayer
                renderTextLayer
              />
            </Document>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-amber-700">
                Preview not available for this file type.
              </p>
              {preferredUrl ? (
                <a
                  href={preferredUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Open file in new tab
                </a>
              ) : (
                <p className="text-sm text-red-600">
                  No file URL available for this document.
                </p>
              )}
            </div>
          )}
          {pdfLoadError && preferredUrl && (
            <div className="mt-3 space-y-2 rounded-md border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm text-amber-800">
                {pdfLoadError}. You can still open the file directly.
              </p>
              <a
                href={preferredUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Open file in new tab
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
