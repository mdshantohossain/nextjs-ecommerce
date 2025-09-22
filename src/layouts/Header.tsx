"use client";
import NavigationMenuDemo from "@/components/nevigation";
import Image from "next/image";
import Link from "next/link";
import AppLogo from "@/assets/images/logo.png";
import { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Phone,
  Monitor,
  Smartphone,
  Camera,
  Headphones,
  Gamepad2,
  Watch,
  Home,
  Tv,
  Printer,
  ChevronRight,
  Plus,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import WhatAppImage from "@/assets/images/whatsapp.png";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductSearch from "@/components/page/home/ProductSearch";
import { useAppSelector } from "@/features/hooks";
import DropdownCart from "@/components/DropdownCart";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { id: 1, name: "All Category" },
  { id: 2, name: "Women Fashion" },
  { id: 3, name: "Men Fashion" },
  { id: 4, name: "Electronics" },
  { id: 5, name: "Accessories" },
  { id: 6, name: "Home & Garden" },
  { id: 7, name: "Health & Beauty" },
  { id: 8, name: "Sports" },
  { id: 9, name: "Toys & Kids" },
];

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Header() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="container mx-auto px-4 pb-4">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            {isLoading ? (
              <Skeleton className="w-60 h-12" />
            ) : appInfo?.logo ? (
              <div className="relative w-60 h-14">
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
              <div className="relative w-60 h-14">
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
          {/* desktop all categories */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex gap-4 items-center bg-red-500 rounded-md p-1 md:p-3 cursor-pointer">
                        <h3 className="text-white font-bold">All Categories</h3>
                        <Menu className="h-5 w-5l text-white ms-10" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[210px]">
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.id}>
                          <Link href={"/"}>{category.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* mobile, tab all categories */}
          <div className="md:hidden order-1 md:order-1">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div className="flex gap-4 items-center bg-red-500 rounded-md p-1 md:p-3 cursor-pointer">
                  <Menu className="h-5 w-5l text-white" />
                </div>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>All Categories</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6 h-full  overflow-scroll">
                  <Collapsible
                    open={openCollapsible === "components"}
                    onOpenChange={() => toggleCollapsible("components")}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-auto p-3"
                      >
                        <span className="font-medium">Components</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openCollapsible === "components" && "rotate-180"
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 px-3">
                      {components.map((component) => (
                        <Link
                          key={component.title}
                          href={component.href}
                          className="block p-3 rounded-md hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="font-medium text-sm">
                            {component.title}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {component.description}
                          </p>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* navigation menu */}
          <div className="order-3 md:order-2 flex items-center">
            <div className="md:hidden order-1">
              <SearchIcon
                onClick={() => setShowSearchOnMobile(!showSearchOnMobile)}
              />
            </div>
            <div className="order-2">
              <NavigationMenuDemo />
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
