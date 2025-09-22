import React from "react";
import { Skeleton } from "../ui/skeleton";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8 py-4">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side (image + thumbnails) */}
          <div>
            <Skeleton className="w-full h-80 sm:h-96 rounded-md" />
            <div className="flex items-center gap-2 mt-4 overflow-x-auto">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-md flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right side (details) */}
          <div className="flex flex-col gap-4">
            <Skeleton className="w-3/4 h-8" />

            {/* Ratings + actions */}
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-16 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="w-4 h-4 rounded-full flex-shrink-0"
                    />
                  ))}
                </div>
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
            </div>

            {/* Description skeleton */}
            <div>
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-2/3 h-5 mt-3" />
            </div>

            {/* Attributes */}
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-40 h-5" />
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-32 h-5" />
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-48 h-5" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Skeleton className="w-28 h-10 rounded-md" />
              <Skeleton className="w-40 h-12 rounded-md" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>

            {/* Extra info */}
            <div className="space-y-2 mt-4">
              <Skeleton className="w-40 h-6" />
              <Skeleton className="w-44 h-6" />
              <Skeleton className="w-48 h-6" />
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap gap-3 mt-3">
              <Skeleton className="w-16 h-6" />
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-6 h-6 rounded-full flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="py-10">
          <div className="flex flex-wrap gap-3">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-32 h-10" />
          </div>

          <hr className="w-full my-6" />

          <div className="space-y-3 mb-8">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-5/6 h-5" />
          </div>

          <Skeleton className="w-40 h-10 mt-6" />

          {/* Grid for product suggestions */}
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
