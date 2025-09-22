import { Suspense } from "react";
import ProductsContent from "./ProductsContent";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}