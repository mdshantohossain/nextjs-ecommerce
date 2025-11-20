"use client";

import TopCategorySkeleton from "@/components/skeleton/TopCategorySkeleton";
import { useCategories } from "@/hooks/api/useCategories";
import { CategoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CategorySection() {
  const { data: categories = [] as CategoryType[], isLoading } =
    useCategories();

  if (!isLoading && categories.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-10 bg-card">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get the best deals across our most popular categories. Quality
          products, trusted brands, and effortless shopping all in one place.
        </p>
      </div>

      {/* Grid Category Boxes */}
      <div className="flex flex-wrap gap-5 justify-center">
        {isLoading
          ? Array.from({ length: 12 }, (_, i) => (
              <TopCategorySkeleton key={i} />
            ))
          : categories.map((category, i) => (
              <Link
                href={{
                  pathname: "/products",
                  query: { category: category.slug },
                }}
                key={i}
                className="group text-center"
              >
                <div className="rounded-xl border shadow-sm flex flex-col items-center justify-center p-4 hover:shadow-md transition-all text-center w-auto px-6">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={50}
                      height={50}
                      className="object-contain mb-2"
                    />
                  ) : (
                    <Image
                      src="/placeholder.png"
                      width={50}
                      height={50}
                      alt={category.name}
                      className="opacity-70 mb-2"
                    />
                  )}

                  <span className="text-foreground font-medium text-md whitespace-nowrap text-center">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
