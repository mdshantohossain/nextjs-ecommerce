"use client";
import Product from "@/components/Product";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import useTrendingProducts from "@/hooks/api/useTrendingProducts";
import { ProductType } from "@/types";

export default function TrendingProducts() {
  const { data: products = [] as ProductType[], isLoading } = useTrendingProducts();

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Trending Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 12 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            <>
              {products?.map((product: ProductType) => (
                <Product key={product.id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
