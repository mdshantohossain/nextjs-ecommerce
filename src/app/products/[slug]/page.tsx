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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground flex flex-wrap gap-1 items-center">
          <span>Home</span> <span className="mx-1">›</span>
          <span>Products</span> <span className="mx-1">›</span>
          <span className="text-foreground line-clamp-1 max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          <div className="space-y-4 order-1">
            {/* Main image with zoom */}
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in h-80 sm:h-96 md:h-[500px] w-full"
              onMouseMove={handleImageMouseMove}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              onClick={() => setShowFullscreen(true)}
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
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </button>
                </>
              )}
            </div>

            <div className="relative px-2">
              <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto scroll-hide scrollbar-hide p-1"
                style={{ scrollBehavior: "smooth" }}
              >
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-red-500"
                        : "border-gray-200 hover:border-red-500/50"
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

              {/* MOBILE FIX: Hidden on mobile (sm:flex) to avoid horizontal scrolling overflow issues */}
              {allImages.length > 4 && (
                <>
                  <button
                    onClick={() => scrollGallery("left")}
                    className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 bg-white border shadow-sm hover:bg-gray-100 rounded-full p-1.5 transition-colors hidden sm:flex"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollGallery("right")}
                    className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 bg-white border shadow-sm hover:bg-gray-100 rounded-full p-1.5 transition-colors hidden sm:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-6 order-2">
            <div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-balance">
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
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500">
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
                        className={`relative group transition-all`}
                      >
                        <div
                          className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${
                            selectedVariant?.color === variant.color
                              ? "border-red-500"
                              : "border-gray-200 hover:border-red-500/50"
                          }`}
                        >
                          <Image
                            src={variant.image}
                            alt={variant.color}
                            fill
                            className="object-cover"
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
                          className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${
                            selectedSize === size
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-gray-200 bg-transparent hover:border-gray-400"
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

            <div className="pt-6 space-y-4">
              <div>
                {/* MOBILE FIX: Changed flex layout to better handle small screens */}
                <div className="flex flex-col gap-4 w-full">
                  {/* Quantity Row */}
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Quantity</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        className="h-10 w-10 rounded-l-lg hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-12 text-center font-medium text-lg">
                        {quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        className="h-10 w-10 rounded-r-lg hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons Grid - Stacks nicely on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 w-full">
                    <Button
                      disabled={isExistedToCart}
                      onClick={() => handleAddToCart(product)}
                      size="lg"
                      className="text-base w-full bg-primary hover:bg-primary/90 h-10"
                    >
                      {" "}
                      {isExistedToCart ? (
                        <>
                          <ShoppingBag className="w-5 6-6 mr-2" /> In Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6 mr-2" /> Add to Cart
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => handleShopNow(product)}
                      size="lg"
                      className="text-base w-full bg-red-500 hover:bg-red-600 h-10"
                    >
                      <CreditCard className="h-4 w-4 mr-2 text-white" />
                      <span className="text-white">Buy Now</span>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 w-full sm:w-12 border-gray-300 hover:bg-gray-50"
                      disabled={isWishlisted}
                      onClick={() => addToWishlist(product)}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        )}
                      />
                      {/* Show text only on mobile since icon is alone on desktop */}
                      <span className="ml-2 sm:hidden">Wishlist</span>
                    </Button>
                  </div>
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
          <TabsList className="w-full grid grid-cols-2 max-w-md mb-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews_count})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-2">
            <Card>
              <CardContent className="p-4 sm:p-6">
                {/* MOBILE FIX: 'prose' class + max-w-full ensures images inside description scale down */}
                <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.long_description,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-2">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-6">
                      Reviews
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
                                src={
                                  review?.user?.profile_photo ||
                                  "/placeholder.png"
                                }
                                alt={review?.user?.name ?? review?.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                                <div>
                                  <h4 className="font-semibold text-sm sm:text-base">
                                    {review?.user?.name || review?.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground italic">
                                    {review.created_at}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                        i < Number(review.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground text-sm leading-relaxed break-words">
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
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setReviewRating(i + 1)}
                            className="p-1 transition-transform active:scale-95"
                          >
                            <Star
                              className={`h-6 w-6 sm:h-8 sm:w-8 ${
                                i < reviewRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <Textarea
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="min-h-[120px] resize-none text-sm"
                        required
                      />

                      {isAuthenticated ? (
                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={!reviewRating || !reviewText.trim()}
                        >
                          Submit Review
                        </Button>
                      ) : (
                        <div className="flex flex-wrap gap-1 text-sm">
                          <span className="text-gray-600">
                            Please log in to place a review.
                          </span>
                          <button
                            type="button"
                            className="text-red-500 font-bold hover:underline"
                            onClick={() => setIsModalOpen(true)}
                          >
                            Login
                          </button>
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
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="relative group">
            <div
              id="related-products-scroll"
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
            >
              {relatedProducts.map((relatedProduct: ProductType) => (
                <div
                  key={relatedProduct.id}
                  className="flex-shrink-0 w-40 sm:w-56"
                >
                  <Product product={relatedProduct} />
                </div>
              ))}
            </div>

            {/* Scroll buttons - hidden on mobile */}
            {relatedProducts.length > 2 && (
              <>
                <button
                  onClick={() => {
                    document
                      .getElementById("related-products-scroll")
                      ?.scrollBy({ left: -250, behavior: "smooth" });
                  }}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white rounded-full shadow-md border p-2 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("related-products-scroll")
                      ?.scrollBy({ left: 250, behavior: "smooth" });
                  }}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex bg-white rounded-full shadow-md border p-2 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      {/* Fullscreen Modal */}
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] px-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
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
