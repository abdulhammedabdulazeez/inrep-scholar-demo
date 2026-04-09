"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TEMP_PDF_VIEWER_URL } from "@/lib/documentViewer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function getPdfSource(dynamicUrl: string | null): string | null {
  // Temporary override: keep this first for QA/demo.
  // To return to dynamic behavior, swap order to: dynamicUrl || TEMP_PDF_VIEWER_URL
  return TEMP_PDF_VIEWER_URL || dynamicUrl;
}

export default function PdfViewerClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  const documentId = params.id as string;
  const subdomain = params.university as string;
  const title = searchParams.get("title") || "Document";
  const dynamicUrl = searchParams.get("fileUrl");
  const pdfUrl = getPdfSource(dynamicUrl);
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
          <div className="min-w-0">
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
          {numPages && pdfUrl ? (
            <Document file={pdfUrl}>
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
            <p className="text-sm text-gray-500">Loading page previews...</p>
          )}
        </aside>
        <div className="h-[calc(100vh-185px)] overflow-auto rounded-lg border bg-white p-4">
          {pdfUrl ? (
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages: totalPages }) => {
                setNumPages(totalPages);
                setPageNumber(1);
              }}
              onLoadError={() => setNumPages(undefined)}
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
            <p className="text-sm text-red-600">No PDF URL provided.</p>
          )}
        </div>
      </main>
    </div>
  );
}
