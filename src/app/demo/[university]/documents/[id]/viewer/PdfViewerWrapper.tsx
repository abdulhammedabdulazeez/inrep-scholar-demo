"use client";

import dynamic from "next/dynamic";

const PdfViewerClient = dynamic(() => import("./PdfViewerClient"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
      Loading viewer...
    </div>
  ),
});

export default function PdfViewerWrapper() {
  return <PdfViewerClient />;
}
