"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ShoppingCart,
  Star,
  Heart,
  Minus,
  Plus,
  X,
  FileText,
  Info,
  MessageSquare,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useProductDetails } from "@/hooks/api/useProductDetails";
import { OtherImageType, ProductType, ReviewType } from "@/types";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import Image from "next/image";

const relatedProducts = [
  {
    id: 3,
    name: "Elegant Summer Dress",
    price: 79.99,
    originalPrice: null,
    image: "/elegant-summer-dress.png",
    rating: 4.6,
    reviews: 156,
    badge: null,
  },
  {
    id: 4,
    name: "Classic Leather Shoes",
    price: 149.99,
    originalPrice: 199.99,
    image: "/classic-leather-shoes.png",
    rating: 4.9,
    reviews: 203,
    badge: "Hot",
  },
  {
    id: 5,
    name: "Cozy Knit Sweater",
    price: 59.99,
    originalPrice: null,
    image: "/cozy-knit-sweater.png",
    rating: 4.4,
    reviews: 92,
    badge: null,
  },
  {
    id: 6,
    name: "Athletic Running Shorts",
    price: 34.99,
    originalPrice: 44.99,
    image: "/athletic-running-shorts.png",
    rating: 4.7,
    reviews: 167,
    badge: "Sale",
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");

  const { slug } = useParams();
  const { data: product = {} as ProductType, isLoading } = useProductDetails(
    slug as string
  );

  useEffect(() => {
    console.log(product);
  }, [product]);

  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const openFullscreen = () => {
    setShowFullscreen(true);
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (showFullscreen) {
      if (e.key === "Escape") closeFullscreen();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFullscreen]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Review submitted:", {
      rating: reviewRating,
      text: reviewText,
      name: reviewerName,
      email: reviewerEmail,
    });

    setReviewRating(0);
    setReviewText("");
    setReviewerName("");
    setReviewerEmail("");
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  if (isLoading) return <ProductDetailSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground">
          <span>Home</span> <span className="mx-2">›</span>
          <span>Products</span> <span className="mx-2">›</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative group">
              {isMobile ? (
                <div
                  className="relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                  onClick={openFullscreen}
                >
                  <Image src={product.main_image} fill alt={product.name} />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden relative h-130">
                  <Image
                    src={product.main_image}
                    fill
                    alt={product.name}
                    className="object-fill"
                  />
                  {/* <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: product.name,
                        isFluidWidth: true,
                        src:
                          product.images[selectedImage] || "/placeholder.svg",
                        sizes:
                          "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                      },
                      largeImage: {
                        src:
                          product.images[selectedImage] || "/placeholder.svg",
                        width: 1200,
                        height: 1800,
                      },
                      enlargedImageContainerDimensions: {
                        width: "150%",
                        height: "150%",
                      },
                      enlargedImageContainerStyle: {
                        background: "#f8f9fa",
                        zIndex: 9,
                      },
                      imageClassName: "w-full h-[500px] object-cover",
                      enlargedImageClassName: "object-cover",
                      hoverDelayInMs: 60,
                      hoverOffDelayInMs: 120,
                      enlargedImagePosition: "over",
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                      hintTextMouse: "Hover to magnify",
                      hintTextTouch: "Touch to magnify",
                    }}
                  /> */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Hover to magnify
                  </div>
                </div>
              )}

              {product.badge && (
                <Badge
                  className={`absolute top-4 left-4 z-10 ${
                    product.badge === "Sale"
                      ? "bg-destructive"
                      : product.badge === "New"
                      ? "bg-secondary"
                      : "bg-primary"
                  }`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto relative">
              {product?.other_images.map(
                (otherImage: OtherImageType, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors relative ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={otherImage.image}
                      alt={`${product.name} `}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.selling_price}
                </span>
                {product.regular_price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.regular_price}
                    </span>
                    {product.discount && (
                      <Badge variant="destructive">
                        {product.discount} Off
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.short_description}
            </p>

            {product.features && (
              <div className="space-y-2">
                {JSON.parse(product.features).map(
                  (feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  )
                )}
              </div>
            )}

            {product.colors && (
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex gap-2">
                  {JSON.parse(product.colors).map(
                    (color: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 transition-colors ${
                          selectedColor === index
                            ? "border-primary border-4"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex gap-2">
                  {product.sizes &&
                    JSON.parse(product.sizes).map((size: string) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className="h-10 w-12"
                      >
                        {size}
                      </Button>
                    ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-purple-600" />
                <span>1 Year warranty</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Category:</strong> {product.category?.name}
              </p>
              <p>{/* <strong>Tags:</strong> {product.tags.join(", ")} */}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="description"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Description
            </TabsTrigger>
            <TabsTrigger value="additional" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Additional Info
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Reviews ({product.detailedReviews?.length || product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {product.long_description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="additional" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]: [string, ReactNode]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b"
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">
                      {product.detailedReviews?.length || 0} Review
                      {(product.detailedReviews?.length || 0) !== 1
                        ? "s"
                        : ""}{" "}
                      For {product.name}
                    </h3>

                    <div className="space-y-6">
                      {product.reviews?.map((review: ReviewType) => (
                        <div
                          key={review.id}
                          className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex-shrink-0">
                            <Image
                              src={review?.user?.profile_photo || ""}
                              alt={review.user.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-lg">
                                  {review.user.name}
                                </h4>
                                <p className="text-sm text-muted-foreground italic">
                                  {review.created_at}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Number(review.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-semibold mb-6">Add a review</h3>

                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setReviewRating(i + 1)}
                              className="p-1 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  i < reviewRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-200"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Textarea
                          placeholder="Your review *"
                          value={reviewText}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => setReviewText(e.target.value)}
                          className="min-h-32 resize-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Enter Name *"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          required
                        />
                        <Input
                          type="email"
                          placeholder="Enter Email *"
                          value={reviewerEmail}
                          onChange={(e) => setReviewerEmail(e.target.value)}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium"
                        disabled={
                          !reviewRating ||
                          !reviewText.trim() ||
                          !reviewerName.trim() ||
                          !reviewerEmail.trim()
                        }
                      >
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-balance">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full h-48 relative">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {relatedProduct.badge && (
                      <Badge
                        className={`absolute top-2 left-2 ${
                          relatedProduct.badge === "Sale"
                            ? "bg-destructive"
                            : relatedProduct.badge === "Hot"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {relatedProduct.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-balance">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({relatedProduct.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">${relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              onClick={closeFullscreen}
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
              <div className="text-sm">
                Pinch to zoom • Drag to pan • Tap X to close
              </div>
            </div>

            <div
              className="relative overflow-hidden w-full h-full flex items-center justify-center"
              style={{
                touchAction: "pan-x pan-y pinch-zoom",
              }}
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="object-contain select-none"
                style={{
                  touchAction: "pan-x pan-y pinch-zoom",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                }}
                draggable={false}
              />
            </div>

            {product.other_images.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
                {product.other_images.map(
                  (otherImage: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-12 h-12 rounded border-2 overflow-hidden transition-colors relative ${
                        selectedImage === index
                          ? "border-white"
                          : "border-white/50"
                      }`}
                    >
                      <Image
                        src={product.images[index] || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
