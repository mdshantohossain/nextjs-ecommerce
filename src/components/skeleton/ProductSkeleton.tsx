import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="group relative bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Skeleton className="h-60 w-full " />

      {/* Product Info */}
      <div className="p-4">
        <div className="space-y-3">
          <Skeleton className="w-full  w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-7 w-full rounded-md" />
          <Skeleton className="h-7 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
