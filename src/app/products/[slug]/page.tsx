"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Star,
  Heart,
  Minus,
  Plus,
  X,
  FileText,
  MessageSquare,
  Shield,
  Truck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useProductDetails } from "@/hooks/api/useProductDetails";
import type { ProductType, ReviewType } from "@/types";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import Image from "next/image";
import Product from "@/components/Product";
import renderStars from "@/components/generateStarts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/features/hooks";
import CheckoutAuthModal from "@/components/modals/checkout-modal/modal";
import EmptyContent from "@/components/EmptyContent";
import EmptyCart from "@/assets/images/cart.png";

interface SizeType {
  vid: string;
  variantKey: string;
  variantSku: string;
}

type VariantType = {
  color: string;
  image: string;
  sizes: SizeType[];
};

export default function ProductDetailPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variants, setVariants] = useState<VariantType[]>([]);
  const [productSizes, setProductSizes] = useState<SizeType[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<VariantType | null>(
    null
  );

  // hooks
  const { slug } = useParams();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isExistsOnCart, addToCart } = useCart();
  const { isExistsOnWishlist, addWishlist } = useWishlist();
  const { data, isLoading } = useProductDetails(slug as string);
  const router = useRouter();

  const product = data?.product;
  const relatedProducts = data?.relatedProducts ?? [];

  const isExistedToCart = isExistsOnCart(product?.id || 0);
  const isWishlisted = isExistsOnWishlist(product?.id || 0);

  useEffect(() => {
    if (product?.variant_json) {
      let variants = JSON.parse(product.variant_json) as VariantType[];
      Object.entries(variants).map(
        ([color, variant]: [string, VariantType], index: number) => {
          if (index === 0) {
            setSelectedVariant({
              color: color,
              image: variant.image,
              sizes: variant.sizes,
            });
          }

          setVariants((prevState) => [
            ...prevState,
            {
              color: color,
              image: variant.image,
              sizes: variant.sizes,
            },
          ]);
        }
      );
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariant) {
      const sizes = selectedVariant.sizes;
      setProductSizes(sizes);
      const entries = Object.entries(sizes);
      if (entries.length > 0) {
        setSelectedSize(entries[0][0]); // first key
      }
    }
  }, [selectedVariant]);

  const allImages = product
    ? [{ image: product.main_image }, ...(product.other_images || [])]
    : [];

  const currentImage = allImages[selectedImageIndex];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleImageMouseEnter = () => {
    if (!isMobile) setZoomLevel(2);
  };

  const handleImageMouseLeave = () => {
    setZoomLevel(1);
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 100;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

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

  if ((!product && isLoading) || isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <EmptyContent
        title="Shopping Cart"
        message="Add some products to get started!"
        image={EmptyCart}
        buttonText="Continue Shopping"
        href="/"
      />
    );
  }

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    const variant = colorVariants[index];
    if (variant?.image) {
      const imageIndex = allImages.findIndex(
        (img) => img.image === variant.image
      );
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
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
        quantity: quantity,
      });
    }
  };

  const handleShopNow = (product: ProductType) => {
    handleAddToCart(product);
    return router.push("/checkout");
  };

  // handle add to wishlist
  const addToWishlist = (product: ProductType) => {
    isExistsOnWishlist(product.id);
    addWishlist({
      product_id: product.id,
      name: product.name,
      price: product.selling_price,
      image: product.main_image,
      slug: product.slug,
    });
  };

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
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <div className="space-y-4 order-2 lg:order-1">
            {/* Main image with zoom */}
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in h-96 sm:h-[500px]"
              onMouseMove={handleImageMouseMove}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              onClick={() => !isMobile && setShowFullscreen(true)}
            >
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
              >
                <Image
                  src={currentImage?.image || product.main_image}
                  fill
                  alt={product.name}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Zoom indicator */}
              {!isMobile && zoomLevel === 1 && (
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm">
                  Hover to zoom
                </div>
              )}

              {/* Navigation arrows for mobile */}
              {isMobile && allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? allImages.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5 text-black" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev === allImages.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </button>
                </>
              )}
            </div>

            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto scroll-hide scrollbar-hide p-2"
                style={{ scrollBehavior: "smooth" }}
              >
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img.image}
                      alt={`${product.name} thumbnail`}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {allImages.length > 4 && (
                <>
                  <button
                    onClick={() => scrollGallery("left")}
                    className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollGallery("right")}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xl sm:text-2xl text-balance">
                {product.name}
              </span>
              <div className="flex items-center gap-4 mb-4 flex-wrap mt-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {renderStars(product.reviews_avg_rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews_count} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-4xl sm:text-5xl font-bold text-primary">
                  ${product.selling_price}
                </span>
                {product.regular_price && (
                  <>
                    <span className="text-lg sm:text-xl text-muted-foreground line-through">
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

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {product.short_description}
            </p>

            <div className="space-y-4 pt-4 border-t">
              {/* Color selector */}
              {variants.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">
                    Color ({selectedVariant?.color})
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(variant)}
                        className={`relative group transition-all `}
                      >
                        <div
                          className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 ${
                            selectedVariant?.color === variant.color
                              ? "border-red-400"
                              : "hover:border-red-400"
                          }`}
                        >
                          <Image
                            src={variant.image}
                            alt={variant.color}
                            fill
                            className="w-full h-full object-cover"
                            sizes="48px"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {productSizes && (
                <div>
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(productSizes).map(
                      ([size, variant]: [string, SizeType], index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3 flex-wrap">
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
                    disabled={isExistedToCart}
                    onClick={() => handleAddToCart(product)}
                    size="icon"
                    className="flex-1 min-w-32 bg-primary hover:bg-primary/90"
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
                    size="icon"
                    className="flex-1 min-w-32 bg-red-600 hover:bg-red-500"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Shop now
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    disabled={isWishlisted}
                    onClick={() => addToWishlist(product)}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600 hover:text-red-500"
                      )}
                    />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span>1 Year warranty</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Category:</strong> {product.category.name}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="description"
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Description</span>
            </TabsTrigger>

            <TabsTrigger
              value="reviews"
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
              <span className="ml-1">({product.reviews_count})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="prose max-w-none text-sm sm:text-base">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.long_description,
                    }}
                  />{" "}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-6">
                      {product?.reviews?.length || 0} Review
                      {(product?.reviews?.length || 0) !== 1 ? "s" : ""}
                    </h3>

                    <div className="space-y-6">
                      {product?.reviews &&
                        product?.reviews?.map((review: ReviewType) => (
                          <div
                            key={review.id}
                            className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                src={review?.user?.profile_photo || ""}
                                alt={review?.user?.name ?? review?.name}
                                width={64}
                                height={64}
                                className="rounded-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                                <div>
                                  <h4 className="font-semibold">
                                    {review?.user?.name || review?.name}
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
                              <p className="text-muted-foreground leading-relaxed text-sm">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg sm:text-xl font-semibold mb-6">
                      Add a review
                    </h3>

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
                          onChange={(e) => setReviewText(e.target.value)}
                          className="min-h-32 resize-none text-sm"
                          required
                        />
                      </div>

                      {isAuthenticated ? (
                        <>
                          <Button
                            type="submit"
                            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                            disabled={
                              !reviewRating ||
                              !reviewText.trim() ||
                              !reviewerName.trim() ||
                              !reviewerEmail.trim()
                            }
                          >
                            Submit Review
                          </Button>
                        </>
                      ) : (
                        <div className="flex flex-row gap-1">
                          <span className="text-gray-600">
                            Please log in to place a review.
                          </span>
                          <span
                            className="text-red-500 font-bold cursor-pointer hover:underline"
                            onClick={() => setIsModalOpen(true)}
                          >
                            Login
                          </span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="relative">
          <h2 className="text-2xl font-bold mb-6 text-balance">
            Related Products
          </h2>

          <div className="relative">
            <div
              id="related-products-scroll"
              className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-2"
            >
              {relatedProducts.map((relatedProduct: ProductType) => (
                <div
                  key={relatedProduct.id}
                  className="flex-shrink-0 w-48 sm:w-56"
                >
                  <Product product={relatedProduct} />
                </div>
              ))}
            </div>

            {/* Scroll buttons */}
            {relatedProducts.length > 3 && (
              <>
                <button
                  onClick={() => {
                    const container = document.getElementById(
                      "related-products-scroll"
                    );
                    if (container)
                      container.scrollBy({ left: -250, behavior: "smooth" });
                  }}
                  className="absolute -left-12 sm:-left-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white rounded-full shadow p-2 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    const container = document.getElementById(
                      "related-products-scroll"
                    );
                    if (container)
                      container.scrollBy({ left: 250, behavior: "smooth" });
                  }}
                  className="absolute -right-12 sm:-right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white rounded-full shadow p-2 hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              onClick={() => setShowFullscreen(false)}
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              Scroll or drag to navigate
            </div>

            <Image
              src={currentImage?.image || product.main_image}
              alt={product.name}
              fill
              className="object-contain select-none"
              style={{ userSelect: "none" }}
            />

            {allImages.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 overflow-x-auto max-w-sm">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 rounded border-2 overflow-hidden transition-colors ${
                      selectedImageIndex === index
                        ? "border-white"
                        : "border-white/50"
                    }`}
                  >
                    <Image
                      src={img.image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 cursor-pointer hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <CheckoutAuthModal />
          </div>
        </div>
      )}
    </div>
  );
}
