"use client";
import ExclusiveProducts from "@/components/page/home/ExclusiveProducts";
import TrendingProducts from "@/components/page/home/TrendingProducts";
import BrandSlideSection from "@/components/page/home/BrandSlideSection";
import CategorySection from "@/components/page/home/CategorySection";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/features/hooks";
import { fetchCategories } from "@/features/categorySlice";
import TestimonialsSection from "@/components/page/home/TestimonialsSection";
import Slider from "@/components/page/home/Slider";
import { fetchAppInfo } from "@/features/appSlice";
import AddSection from "@/components/page/home/AddSection";
import Loading from "./loading";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAppInfo());
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full">
        <Slider />
      </div>

      <div className="mx-auto px-4 md:px-8 py-8">
        <AddSection />
        <CategorySection />
        <ExclusiveProducts />
        <TrendingProducts />
        <TestimonialsSection />
        <BrandSlideSection />
      </div>
    </main>
  );
}
