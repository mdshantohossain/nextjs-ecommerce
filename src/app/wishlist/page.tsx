"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Home, ChevronRight } from "lucide-react";
import Image from "next/image";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const initialWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Blue Dress For Woman",
    price: 45.0,
    image: "https://picsum.photos/seed/picsum/200/300",
    inStock: true,
  },
  {
    id: "2",
    name: "Lether Gray Tuxedo",
    price: 55.0,
    image: "https://picsum.photos/seed/picsum/200/300",
    inStock: true,
  },
  {
    id: "3",
    name: "Woman Full Sliv Dress",
    price: 68.0,
    image: "https://picsum.photos/seed/picsum/200/300",
    inStock: true,
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialWishlistItems);

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const addToCart = (item: WishlistItem) => {
    // Handle add to cart logic here
    console.log("Adding to cart:", item.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Pages</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">
                Your wishlist is empty
              </p>
              <Button>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b font-medium text-sm">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Stock Status</div>
                  <div className="col-span-2">Action</div>
                  <div className="col-span-1">Remove</div>
                </div>

                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 items-center"
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover rounded-md"
                          alt={item.name}
                        />
                      </div>

                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="col-span-2 font-semibold">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={item.inStock ? "default" : "destructive"}
                        className={
                          item.inStock ? "bg-green-500 hover:bg-green-600" : ""
                        }
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <Button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add To Cart
                      </Button>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0 relative">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover rounded-md"
                          alt={item.name}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-sm leading-tight">
                            {item.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive p-1 h-auto"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold text-lg mb-2">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={item.inStock ? "default" : "destructive"}
                            className={
                              item.inStock
                                ? "bg-green-500 hover:bg-green-600 text-xs"
                                : "text-xs"
                            }
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add To Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Button variant="outline" onClick={() => setWishlistItems([])}>
                Clear Wishlist
              </Button>
              <Button>Continue Shopping</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
