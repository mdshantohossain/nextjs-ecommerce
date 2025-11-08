"use client";
import Navigation from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";
import AppLogo from "@/assets/images/logo.png";
import { useState, useEffect } from "react";
import {
  User,
  ShoppingCart,
  Heart,
} from "lucide-react";


import WhatAppImage from "@/assets/images/whatsapp.png";
import { Search as SearchIcon } from "lucide-react";
import ProductSearch from "@/components/page/home/ProductSearch";
import { useAppSelector } from "@/features/hooks";
import DropdownCart from "@/components/DropdownCart";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryDropdown } from "@/components/CategoryDropdown";


export default function Header() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const [scrollDir, setScrollDir] = useState<string>("up");
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);

  // hooks
  const { cartTotal, items } = useAppSelector((state) => state.cart);
  const { data: appInfo, isLoading } = useAppSelector((state) => state.app);
  const toggleCollapsible = (value: string) => {
    setOpenCollapsible(openCollapsible === value ? null : value);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => {
      window.removeEventListener("scroll", updateScrollDir);
    };
  }, []);

  return (
    <header
      className={`border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 transition-transform duration-300 ${
        scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* <div className="bg-gray-200 w-full h-10 items-center flex">
      dark mode here  | language mode 
     </div> */}
      <div className="container mx-auto px-4 pb-2">
        <div className="flex items-center justify-between py-1">
          {/* Logo */}
          <div className="flex items-center">
            {isLoading ? (
              <Skeleton className="w-50 h-12" />
            ) : appInfo?.logo ? (
              <div className="relative w-50 h-14">
                <Link href="/">
                  <Image
                    src={appInfo.logo}
                    fill
                    alt="App Logo"
                    className="object-contain"
                  />
                </Link>
              </div>
            ) : (
              <div className="relative w-50 h-14">
                <Link href="/">
                  <Image
                    src={AppLogo} // your local logo from assets
                    fill
                    alt="Default Logo"
                    className="object-contain"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="w-[30%] hidden md:block">
            <ProductSearch />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* User Icon */}
            <Link href="/dashboard">
              <User className="w-6 h-6" />
            </Link>

            {/* Wishlist Icon with Badge */}
            <Link href="/wishlist" title="Wishlist" className="relative">  
              <Heart className="w-6 h-6" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {0}
              </span>
            </Link>

            {/* Cart Icon with Badge and Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartDropdownOpen(true)}
              onMouseLeave={() => setIsCartDropdownOpen(false)}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              </div>

              {/* Cart Dropdown */}
              {isCartDropdownOpen && (
                <DropdownCart
                  items={items}
                  cartTotal={cartTotal}
                  setIsCartDropdownOpen={setIsCartDropdownOpen}
                />
              )}
            </div>

            {/* Cart Total */}
            <div className="hidden lg:block text-right">
              <div className="font-bold text-red-500">
                ${cartTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* bottom header */}
        <div className="flex items-center justify-between">

          {/* Category Dropdown */}
          <CategoryDropdown />

          {/* navigation menu */}
          <div className="order-3 md:order-2 flex items-center">
            <div className="md:hidden order-1">
              <SearchIcon
                onClick={() => setShowSearchOnMobile(!showSearchOnMobile)}
              />
            </div>
            <div className="order-2">
              <Navigation />
            </div>
          </div>

          <a
            href="https://wa.me/+8801799630818"
            target="_blank"
            className="order-2 md:order-3"
          >
            <div className=" flex gap-2 items-center">
              <Image
                src={WhatAppImage}
                className="w-6 h-6"
                alt="contact icon"
              />
              <span>01799630818</span>
            </div>
          </a>
        </div>

        <div className="md:hidden">
          {showSearchOnMobile && (
            <div className="pt-4">
              <ProductSearch />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}