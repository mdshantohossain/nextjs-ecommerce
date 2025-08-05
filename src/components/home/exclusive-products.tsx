
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Product from "@/components/product"

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

const products: Product[] = [
  {
    id: 1,
    name: "Surveillance Camera",
    image: "https://picsum.photos/id/238/200/300",
    currentPrice: 55.0,
    originalPrice: 95.0,
    discount: 25,
    rating: 4,
    reviewCount: 15,
    badge: "HOT",
    isWishlisted: false,
  },
  {
    id: 2,
    name: "Audio Equipment",
    image: "https://picsum.photos/id/239/200/300",
    currentPrice: 69.0,
    originalPrice: 89.0,
    discount: 20,
    rating: 4,
    reviewCount: 22,
    isWishlisted: false,
  },
  {
    id: 3,
    name: "Basics High-Speed HDMI",
    image: "https://picsum.photos/id/240/200/300",
    currentPrice: 69.0,
    originalPrice: 89.0,
    discount: 20,
    rating: 4,
    reviewCount: 22,
    isWishlisted: true,
  },
  {
    id: 4,
    name: "Red & Black Headphone",
    image: "https://picsum.photos/id/241/200/300",
    currentPrice: 45.0,
    originalPrice: 55.25,
    discount: 35,
    rating: 4,
    reviewCount: 21,
    isWishlisted: false,
  },
]

const categories = ["New Arrival", "Best Sellers", "Featured", "Special Offer"]

export default function ExclusiveProductSection() {
  const [activeCategory, setActiveCategory] = useState("Featured")
  


  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">Exclusive Products</h2>
          
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}


