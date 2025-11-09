"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
import { usePathname } from "next/navigation";

const components = [
  {
    title: "Shop All Products",
    href: "/products",
    description:
      "Browse our full collection of products with detailed filters.",
  },
  {
    title: "Brands",
    href: "/brands",
    description: "Explore products by your favorite brands.",
  },
];

const gettingStartedLinks = [
  {
    title: "Deals & Offers",
    href: "/deals",
    description: "Check out current deals, discounts, and special offers.",
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    description: "Discover the latest products added to our store.",
  },
  {
    title: "Best Sellers",
    href: "/best-sellers",
    description: "Shop our most popular products among customers.",
  },
  {
    title: "Cupon Codes",
    href: "/cupons",
    description: "Give the perfect gift with our flexible gift cards.",
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(
    null
  );

  // hooks 
  const pathName = usePathname();

  const toggleCollapsible = (value: string) => {
    setOpenCollapsible(openCollapsible === value ? null : value);
  };

  return (
    <div className="flex items-center justify-between">
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                   {gettingStartedLinks.map((link) => (
                    <ListItem
                      key={link.title}
                      href={link.href}
                      title={link.title}
                      pathName={pathName}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      pathName={pathName}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/help"  className={cn('h-9 px-4 py-2 text-sm', pathName === '/help'? 'text-red-500 font-semibold': '')}>
                Help
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" className={cn('h-9 px-4 py-2 text-sm', pathName === '/contact'? 'text-red-500 font-semibold': '')}>
                Contact
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about"  className={cn('h-9 px-4 py-2 text-sm', pathName === '/about'? 'text-red-500 font-semibold': '')}>
                About
              </Link>
            </NavigationMenuItem>
          
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className=" bg-gray-200 ms-3">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6 overflow-scroll h-full">
              {/* Getting Started - Mobile */}
              <Collapsible
                open={openCollapsible === "getting-started"}
                onOpenChange={() => toggleCollapsible("getting-started")}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-auto p-3"
                  >
                    <span className="font-medium">Getting started</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openCollapsible === "getting-started" && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 px-3">
                  <div className="p-4 rounded-md bg-muted/50 mb-3">
                    <div className="text-sm font-medium mb-1">shadcn/ui</div>
                    <p className="text-xs text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </div>
                  {gettingStartedLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block p-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-medium text-sm">{link.title}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Components - Mobile */}
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

              {/* Documentation - Mobile */}
              <Link
                href="/"
                className="block p-3 rounded-md hover:bg-muted transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Documentation
              </Link>

              {/* More - Mobile */}
              {/* <Collapsible
                open={openCollapsible === "more"}
                onOpenChange={() => toggleCollapsible("more")}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-auto p-3"
                  >
                    <span className="font-medium">More</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openCollapsible === "more" && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 px-3">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block p-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string, pathName: string }
>(({ className, title, children, pathName, ...props }, ref) => {

  return (
    <li>
      <Link {...props} className="no-underline">
        <NavigationMenuLink
          asChild
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className, props.href === pathName ? 'bg-red-100' : ''
          )}
        >
          <div>
            <div className={cn("text-sm font-medium leading-none", props.href === pathName ? 'text-red-600' : '')}>{title}</div>
            <p className={cn("line-clamp-2 text-sm leading-snug text-muted-foreground",  props.href === pathName ? 'text-red-500' : '')}>
              {children}
            </p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";
