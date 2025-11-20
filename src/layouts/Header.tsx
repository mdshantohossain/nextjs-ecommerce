"use client";
import Navigation from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingCart, Heart, Sun, Moon } from "lucide-react";

import WhatAppImage from "@/assets/images/whatsapp.png";
import { Search as SearchIcon } from "lucide-react";
import ProductSearch from "@/components/page/home/ProductSearch";
import { useAppSelector } from "@/features/hooks";
import DropdownCart from "@/components/DropdownCart";
import { CategoryDropdown } from "@/components/CategoryDropdown";
import AppLogo from "@/components/AppLogo";
import { RootState } from "@/features/store";

export default function Header() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const [scrollDir, setScrollDir] = useState<string>("up");
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // hooks
  const { cartTotal, items } = useAppSelector((state) => state.cart);
  const wishlist = useAppSelector((state) => state.wishlist);

  const toggleCollapsible = (value: string) => {
    setOpenCollapsible(openCollapsible === value ? null : value);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedDarkMode !== null) {
      const isDarkMode = savedDarkMode === "true";
      setIsDark(isDarkMode);

      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return;
    }

    // 2️⃣ No saved preference → detect system theme
    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDark(osPrefersDark);
    if (osPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 3️ Optionally save the system preference to localStorage
    localStorage.setItem("darkMode", String(osPrefersDark));
  }, []);

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

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;

    setIsDark(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      className={`border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 transition-transform duration-300 ${
        scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto pb-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AppLogo location />

          {/* Search Bar */}
          <div className="w-[30%] hidden md:block">
            <ProductSearch />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* User Icon */}
            <Link href="/dashboard">
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon with Badge */}
            <Link href="/wishlist" title="Wishlist" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            </Link>

            {/* Cart Icon with Badge and Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartDropdownOpen(true)}
              onMouseLeave={() => setIsCartDropdownOpen(false)}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
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
