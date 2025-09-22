"use client";

import TopCategorySkeleton from "@/components/skeleton/TopCategorySkeleton";
import { useCategories } from "@/hooks/api/useCategories";
import { CategoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function CategorySection() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={topSectionRef}
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scrollbar-hide mb-16 pb-4 justify-start md:justify-center"
      >
        {/* Headphone Card */}
        <div className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] bg-pink-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-xs sm:text-sm mb-1">Headphone</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Music
            </h2>
            <button className="text-red-500 text-xs sm:text-sm font-medium hover:underline">
              View Collection
            </button>
          </div>
          <div className="w-20 h-20 sm:w-28 sm:h-28 ">
            <Image
              src="/modern-wireless-headphones-pink.png"
              alt="Headphones"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Camera Card */}
        <div className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] bg-cyan-100 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-xs sm:text-sm mb-1">
              Up to 35% OFF
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Camera
            </h2>
            <button className="text-red-500 text-xs sm:text-sm font-medium hover:underline">
              Show Now
            </button>
          </div>
          <div className="w-20 h-20 sm:w-28 sm:h-28  relative flex-shrink-0">
            <Image
              src="/security-camera-black-modern.png"
              alt="Camera"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Watch Card */}
        <div className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] bg-orange-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-xs sm:text-sm mb-1">
              Sale Offer 20% OFF This Week
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Watch
            </h2>
            <button className="text-red-500 text-xs sm:text-sm font-medium hover:underline">
              View Collection
            </button>
          </div>
          <div className="w-20 h-20 sm:w-28 sm:h-28  relative flex-shrink-0">
            <Image
              src="/luxury-wristwatch-brown-leather-strap.png"
              alt="Watch"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

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
                <div className="w-20 h-20 relative relative rounded-full shadow-lg flex items-center justify-center mb-3 hover:shadow-xl transition-shadow cursor-pointer mx-auto">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="w-full h-full object-fit rounded-full"
                  />
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
