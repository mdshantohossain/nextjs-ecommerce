"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ProductsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0 space-y-4">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-50 w-full" />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4"> 
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-40" />
                
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2 flex-wrap">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
