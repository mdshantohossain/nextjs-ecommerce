"use client";
import { cn } from "@/lib/utils";
import { DollarSign, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductType } from "@/types";
import Link from "next/link";
import renderStars from "./generateStarts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAppSelector } from "@/features/hooks";

export default function Product({ product }: { product: ProductType }) {
  // hooks
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isExistsOnCart, addToCart } = useCart();
  const { isExistsOnWishlist, addWishlist } = useWishlist();

  const isExistedToCart = isExistsOnCart(product.id);
  const isWishlisted = isExistsOnWishlist(product.id);

  // handle add to wishlist
  const addToWishlist = (product: ProductType) => {
    if (!isAuthenticated) return router.push("/login");

    addWishlist({
      product_id: product.id,
      name: product.name,
      price: product.selling_price,
      image: product.main_image,
      slug: product.slug,
    });
  };

  // handle add to cart
  const handleAddToCart = (product: ProductType) => {
    if (!isExistedToCart) {
      addToCart({
        product_id: product.id,
        name: product.name,
        price: product.selling_price,
        image: product.main_image,
        slug: product.slug,
      });
    }
  };
  // handle checkout
  const handleShopNow = (product: ProductType) => {
    handleAddToCart(product);
    return router.push("/checkout");
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToWishlist(product);
        }}
        className="absolute top-1 right-1 z-10 p-1 cursor-pointer"
        aria-label="Add to wishlist"
        disabled={isWishlisted}
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-colors",
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
          )}
        />
      </button>

      {/* Product Image */}

      <Link href={`/products/${product.slug}`}>
        <div className="h-60 relative overflow-hidden bg-gray-50 dark:bg-gray-800 group">
          <Image
            src={product.main_image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <h3
          className="text-foreground mb-1 line-clamp-4 hover:cursor-pointer"
          onClick={() => router.push(`/products/${product.slug}`)}
        >
          {product.name}
        </h3>

        
        {/* Rating */}
        <div className="flex gap-2 mb-1">
          <div className="flex items-center">
            <span className="text-xs">{product.reviews_avg_rating}</span>
            {renderStars(product.reviews_avg_rating)}
          </div>

          <span className="text-xs  text-muted-foreground">
            ({product?.reviews_count || 0})
          </span>
        </div>

        {/* Description */}
        <span className="text-gray-300 ">
          3k+ sold 
        </span>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          {/* <sup className="text-xl">$</sup> */}

          <div className="flex gap-1">
            <span className="text-lg align-super">$</span>
            <span className="text-3xl font-semibold">
              {product.selling_price}
            </span>
            <span className="text-sm align-super">99</span>
          </div>
          {product.regular_price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.regular_price}
            </span>
          )}

          {product.discount && (
            <span className="text-sm font-medium text-green-600">
              {product.discount} Off
            </span>
          )}
        </div>

        <div className="mb-2">
          <span>Free delivery</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            disabled={isExistedToCart}
            onClick={() => handleAddToCart(product)}
            className="w-full"
            variant="outline"
            size="sm"
          >
            {isExistedToCart ? (
              <ShoppingBag className="w-4 h-4 mr-2" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            {isExistedToCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          <Button
            onClick={() => handleShopNow(product)}
            className="w-full bg-red-600 hover:bg-red-500 text-white"
            size="sm"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
