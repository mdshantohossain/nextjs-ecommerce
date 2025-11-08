"use client";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductType } from "@/types";
import Link from "next/link";
import { addToCartItem } from "@/features/cartSlice";
import { useAppDispatch } from "@/features/hooks";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Product({ product }: { product: ProductType }) {
  const [wishlist, setWishlist] = useState<number[]>([3]);
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  // handle add to cart
  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCartItem(product));
    toast.success("Product added to cart");
  };

  // handle checkout
  const handleCheckout = (product: ProductType) => {
    handleAddToCart(product);
    router.push("/checkout");
  };

  // const renderStars = (rating: number) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <Star
  //       key={index}
  //       className={cn(
  //         "w-4 h-4",
  //         index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
  //       )}
  //     />
  //   ));
  // };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product Badge */}
      {/* {product.badge && (
        <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white">
          {product.badge}
        </Badge>
      )} */}

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-colors",
            wishlist.includes(product.id)
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
          )}
        />
      </button>

      {/* Product Image */}

      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-800 group">
          <Image
            src={product.main_image}
            alt={product.main_image}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <h3
          className="font-medium text-foreground mb-2 line-clamp-2 hover:cursor-pointer"
          onClick={() => router.push(`/products/${product.slug}`)}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">
            ${product.selling_price}
          </span>
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

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {/* <div className="flex items-center">{renderStars(product.reviews)}</div> */}
          <span className="text-sm text-muted-foreground">
            ({product?.reviews ? product.reviews.length: 0})
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => handleAddToCart(product)}
            className="w-full"
            variant="outline"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={() => handleCheckout(product)}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            size="sm"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
