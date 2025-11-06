"use client";

import TopCategorySkeleton from "@/components/skeleton/TopCategorySkeleton";
import { useCategories } from "@/hooks/api/useCategories";
import { CategoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import EmptyImage from "@/assets/images/empty-photo.png";

export default function CategorySection() {
  const categoriesRef = useRef<HTMLDivElement>(null);

  const { data: categories = [] as CategoryType[], isLoading } =
    useCategories();

  // Add keyboard + mouse drag scroll
  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        el.scrollBy({ left: 350, behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        el.scrollBy({ left: -350, behavior: "smooth" });
      }
    };

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // speed factor
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {/* Categories Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          blandit massa enim Nullam nunc varius.
        </p>
      </div>

      <div
        ref={categoriesRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab select-none"
      >
        {isLoading
          ? Array.from({ length: 12 }, (_, index) => (
              <TopCategorySkeleton key={index} />
            ))
          : categories.map((category: CategoryType, index: number) => (
              <Link
                href={{pathname: '/products', query: {category: category.slug}}}
                key={index}
                className="category-item flex-shrink-0 text-center"
              >
                <div className="w-20 h-20 relative relative rounded-full  flex items-center justify-center mb-3 hover:shadow-xl transition-shadow cursor-pointer mx-auto">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="w-full h-full object-fit rounded-full"
                    />
                  ) : (
                    <Image
                      src={EmptyImage}
                      alt={category.name}
                      width={40}
                      height={40}
                      className=""
                    />
                  )}
                </div>
                <p className="text-gray-700 font-medium text-sm whitespace-nowrap">
                  {category.name}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
}
