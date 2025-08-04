export const dynamic = "force-dynamic";
import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";
import { Skeleton } from "@/components/ui/skeleton";

function SearchResultsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow border p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Results Skeleton */}
          <div className="lg:col-span-3">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow border p-6"
                >
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResultsClient />
    </Suspense>
  );
}
