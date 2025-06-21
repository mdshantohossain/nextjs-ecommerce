import { cn } from "@/lib/utils"
import { Badge, Heart, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"




interface Product {
  id: number
  name: string
  image: string
  currentPrice: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  badge?: string
  isWishlisted?: boolean
}

export default function Product ({product}: {product: Product}) {
    const [wishlist, setWishlist] = useState<number[]>([3])
 const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn("w-4 h-4", index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
      />
    ))
  }

    return (
         <div
              key={product.id}
              className="group relative bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Badge */}
              {product.badge && (
                <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white">
                  {product.badge}
                </Badge>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500",
                  )}
                />
              </button>

              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">{product.name}</h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-red-500">${product.currentPrice.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    TK.{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-green-600">{product.discount}% Off</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">{renderStars(product.rating)}</div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white" size="sm">
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
    )
}