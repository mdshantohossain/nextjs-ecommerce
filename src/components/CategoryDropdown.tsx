"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Menu, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Images from "@/utils/images";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface SubCategory {
  id: string;
  name: string;
  description?: string;
}

interface Offer {
  id: string;
  title: string;
  discount: string;
  image: StaticImageData;
  originalPrice: number;
  discountedPrice: number;
  badge?: string;
}

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  subcategories: SubCategory[];
  offers?: Offer[];
}

const CATEGORIES: Category[] = [
  {
    id: "computer",
    name: "Computer",
    icon: "💻",
    subcategories: [
      {
        id: "laptops",
        name: "Laptops",
        description: "Portable computing devices",
      },
      { id: "desktops", name: "Desktops", description: "Desktop computers" },
      { id: "monitors", name: "Monitors", description: "Display monitors" },
      { id: "keyboards", name: "Keyboards", description: "Computer keyboards" },
      { id: "mouse", name: "Mouse & Trackpads", description: "Input devices" },
    ],
    offers: [
      {
        id: "offer-1",
        title: "Pro Gaming Laptop",
        discount: "35%",
        image: Images.gamingLaptop,
        originalPrice: 1299,
        discountedPrice: 844,
        badge: "Best Seller",
      },
      {
        id: "offer-2",
        title: "4K Ultra Monitor",
        discount: "28%",
        image: Images.ultraMonitor,
        originalPrice: 599,
        discountedPrice: 431,
        badge: "Limited Stock",
      },
    ],
  },
  {
    id: "mobile",
    name: "Mobile & Tablet",
    icon: "📱",
    subcategories: [
      { id: "smartphones", name: "Smartphones", description: "Mobile phones" },
      { id: "tablets", name: "Tablets", description: "Tablet devices" },
      { id: "covers", name: "Covers & Cases", description: "Phone protection" },
      { id: "chargers", name: "Chargers", description: "Mobile chargers" },
    ],
    offers: [
      {
        id: "offer-3",
        title: "Latest Flagship Phone",
        discount: "25%",
        image: Images.flagshipPhone,
        originalPrice: 999,
        discountedPrice: 749,
        badge: "New Launch",
      },
      {
        id: "offer-4",
        title: "Premium Tablet",
        discount: "32%",
        image: Images.premiumTablet,
        originalPrice: 799,
        discountedPrice: 543,
        badge: "Popular",
      },
    ],
  },
  {
    id: "camera",
    name: "Camera",
    icon: "📷",
    subcategories: [
      { id: "dslr", name: "DSLR Cameras", description: "Professional cameras" },
      {
        id: "mirrorless",
        name: "Mirrorless",
        description: "Mirrorless cameras",
      },
      { id: "lenses", name: "Lenses", description: "Camera lenses" },
      { id: "tripods", name: "Tripods", description: "Camera tripods" },
    ],
    offers: [
      {
        id: "offer-5",
        title: "Professional DSLR",
        discount: "40%",
        image: Images.professionalDSLR,
        originalPrice: 1499,
        discountedPrice: 899,
        badge: "Pro Grade",
      },
      {
        id: "offer-6",
        title: "Premium Lens Kit",
        discount: "30%",
        image: Images.cameraLensKit,
        originalPrice: 899,
        discountedPrice: 629,
        badge: "Best Value",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "🎒",
    subcategories: [
      { id: "chargers", name: "Chargers", description: "Power chargers" },
      { id: "cables", name: "Cables", description: "Connection cables" },
      { id: "adapters", name: "Adapters", description: "Power adapters" },
      {
        id: "bags",
        name: "Bags & Carrying Cases",
        description: "Storage solutions",
      },
    ],
    offers: [
      {
        id: "offer-7",
        title: "Multi-Port Charger",
        discount: "45%",
        image: Images.multiPortCharger,
        originalPrice: 89,
        discountedPrice: 49,
        badge: "Hot Deal",
      },
      {
        id: "offer-8",
        title: "Tech Carry Case",
        discount: "20%",
        image: Images.techCarryCase,
        originalPrice: 199,
        discountedPrice: 159,
        badge: "Premium",
      },
    ],
  },
  {
    id: "headphones",
    name: "Headphones",
    icon: "🎧",
    subcategories: [
      { id: "wireless", name: "Wireless", description: "Wireless headphones" },
      { id: "wired", name: "Wired", description: "Wired headphones" },
      { id: "gaming", name: "Gaming", description: "Gaming headsets" },
      { id: "earbuds", name: "Earbuds", description: "True wireless earbuds" },
    ],
    offers: [
      {
        id: "offer-9",
        title: "Noise-Cancel Headphones",
        discount: "38%",
        image: Images.noiseCancelHeadphones,
        originalPrice: 349,
        discountedPrice: 216,
        badge: "Best Audio",
      },
      {
        id: "offer-10",
        title: "Premium Earbuds",
        discount: "26%",
        image: Images.premiumEarbuds,
        originalPrice: 249,
        discountedPrice: 184,
        badge: "Best Seller",
      },
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: "🎮",
    subcategories: [
      { id: "consoles", name: "Consoles", description: "Gaming consoles" },
      {
        id: "controllers",
        name: "Controllers",
        description: "Game controllers",
      },
      { id: "games", name: "Games", description: "Video games" },
      {
        id: "accessories",
        name: "Gaming Accessories",
        description: "Gaming gear",
      },
    ],
    offers: [
      {
        id: "offer-11",
        title: "Latest Gaming Console",
        discount: "22%",
        image: Images.latestGamingConsole,
        originalPrice: 499,
        discountedPrice: 389,
        badge: "Next Gen",
      },
      {
        id: "offer-12",
        title: "Pro Gaming Controller",
        discount: "18%",
        image: Images.proGamingController,
        originalPrice: 169,
        discountedPrice: 139,
        badge: "Official",
      },
    ],
  },
];

export function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const selectedCategory = CATEGORIES.find((c) => c.id === hoveredCategory);

  return (
    <div ref={dropdownRef} className="relative">
      {/* ---------- DESKTOP DROPDOWN ---------- */}

      <div className="hidden md:flex">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex  items-center bg-red-500 rounded-md p-1 md:p-2 cursor-pointer"
        >
          <h3 className="text-white font-bold">All Categories</h3>
          <Menu className="h-5 w-5l text-white ms-10" />
        </div>
      </div>

      {/* Dropdown Menu - CHANGE: Made fully responsive with adaptive sizing */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:left-0 md:right-auto mt-2 z-50 shadow-2xl rounded-lg overflow-hidden bg-white">
          {/* Mobile: Full screen modal style */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="relative md:flex md:gap-0 flex-col md:flex-row md:rounded-lg rounded-lg"
            style={{ minHeight: "auto" }}
          >
            {/* Categories List - CHANGE: Responsive height and width */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto max-h-72 md:max-h-96">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onClick={() => setHoveredCategory(category.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 md:py-3 text-left transition-all duration-150 border-l-4",
                    hoveredCategory === category.id
                      ? "bg-red-50 border-l-4 border-red-500"
                      : "border-l-4 border-transparent hover:bg-gray-50 md:hover:bg-gray-50"
                  )}
                >
                  <span className="text-lg md:text-xl flex-shrink-0">
                    {category.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "font-semibold transition-colors duration-150 truncate text-sm md:text-base",
                        hoveredCategory === category.id
                          ? "text-red-600"
                          : "text-gray-900"
                      )}
                    >
                      {category.name}
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    className={cn(
                      "text-gray-400 flex-shrink-0 hidden md:block",
                      hoveredCategory === category.id && "text-red-500"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Subcategories & Offers Panel - CHANGE: Mobile stacked layout, desktop side-by-side */}
            {hoveredCategory && selectedCategory && (
              <div className="w-full md:flex md:gap-0 flex-col md:flex-row">
                {/* Subcategories */}
                <div className="w-full md:w-72 bg-gradient-to-b from-gray-50 to-white p-4 md:p-5 space-y-2 md:space-y-3 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto max-h-72 md:max-h-96">
                  <div className="mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Browse our collection
                    </p>
                  </div>

                  <div className="space-y-1">
                    {selectedCategory.subcategories.map((subcat) => (
                      <button
                        key={subcat.id}
                        className="w-full text-left px-3 py-2 md:py-2.5 hover:bg-white rounded-md transition-all duration-150 group"
                      >
                        <p className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-150 text-sm md:text-base">
                          {subcat.name}
                        </p>
                        {subcat.description && (
                          <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-600 hidden md:block">
                            {subcat.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offers Panel - CHANGE: Made responsive with proper mobile sizing */}
                {selectedCategory.offers &&
                  selectedCategory.offers.length > 0 && (
                    <div className="w-full md:w-96 bg-gradient-to-b from-red-50 via-white to-orange-50 p-4 md:p-6 border-t md:border-t-0 md:border-l border-red-100 overflow-y-auto max-h-72 md:max-h-96">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-4 md:mb-5">
                        <Sparkles
                          size={18}
                          className="md:w-5 md:h-5 text-red-500 flex-shrink-0"
                        />
                        <h3 className="font-bold text-base md:text-lg text-gray-900">
                          Special Offers
                        </h3>
                      </div>

                      {/* Offers Grid - CHANGE: Responsive card sizing */}
                      <div className="space-y-2 md:space-y-3">
                        {selectedCategory.offers.map((offer) => (
                          <div
                            key={offer.id}
                            className="bg-white rounded-xl border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
                          >
                            {/* Image Container */}
                            <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 h-28 md:h-40 overflow-hidden">
                              <Image
                                src={offer.image || "/placeholder.svg"}
                                fill
                                alt={offer.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {/* Discount Badge */}
                              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-md">
                                -{offer.discount}
                              </div>
                              {/* Category Badge */}
                              {offer.badge && (
                                <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-0.5 md:py-1 rounded-full text-xs font-semibold shadow-md">
                                  {offer.badge}
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-2 md:p-3">
                              <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                                {offer.title}
                              </p>

                              {/* Pricing */}
                              <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <span className="text-base md:text-lg font-bold text-red-600">
                                  ${offer.discountedPrice.toFixed(0)}
                                </span>
                                <span className="text-xs md:text-sm text-gray-400 line-through">
                                  ${offer.originalPrice.toFixed(0)}
                                </span>
                              </div>

                              {/* CTA Button */}
                              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 transform group-hover:scale-105">
                                Shop Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View All Button */}
                      <button className="w-full mt-3 md:mt-4 py-2 md:py-2.5 border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all duration-200 text-xs md:text-sm">
                        View All Offers
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------- MOBILE DRAWER NAVIGATION ---------- */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex gap-4 items-center bg-red-500 rounded-md p-1 md:p-3 cursor-pointer">
              <Menu className="h-5 w-5l text-white" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0">
            <SheetHeader className="p-4 border-b border-gray-200">
              <SheetTitle className="text-lg font-bold text-gray-900">
                All Categories
              </SheetTitle>
            </SheetHeader>

            <div className="overflow-y-auto h-[calc(100vh-60px)] p-3 space-y-2">
              {CATEGORIES.map((cat) => (
                <Collapsible key={cat.id}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-medium text-gray-900">
                          {cat.name}
                        </span>
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 py-2 bg-white rounded-md border border-gray-100 mt-1 space-y-2">
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="pl-4 py-2 text-sm text-gray-700 hover:text-red-600 cursor-pointer"
                      >
                        {sub.name}
                      </div>
                    ))}

                    {cat.offers && cat.offers.length > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-1">
                          <Sparkles size={14} className="text-red-500" />
                          Offers
                        </h4>

                        {/* Horizontal scrollable offers list */}
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 scroll-smooth">
                          {cat.offers.map((offer) => (
                            <div
                              key={offer.id}
                              className="flex-shrink-0 w-44 sm:w-52 bg-white rounded-xl border border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer snap-center"
                            >
                              {/* Image Container */}
                              <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 h-28 md:h-36 overflow-hidden">
                                <Image
                                  src={offer.image || "/placeholder.svg"}
                                  fill
                                  alt={offer.title}
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />

                                {/* Discount Badge */}
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                  -{offer.discount}
                                </div>

                                {/* Optional Badge */}
                                {offer.badge && (
                                  <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-md">
                                    {offer.badge}
                                  </div>
                                )}
                              </div>

                              {/* Offer Details */}
                              <div className="p-2 md:p-3">
                                <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                                  {offer.title}
                                </p>

                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-bold text-red-600">
                                    ${offer.discountedPrice?.toFixed(0)}
                                  </span>
                                  <span className="text-xs text-gray-400 line-through">
                                    ${offer.originalPrice?.toFixed(0)}
                                  </span>
                                </div>

                                {/* Shop Button */}
                                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 transform group-hover:scale-105">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
