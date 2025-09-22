"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
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
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const gettingStartedLinks = [
  { title: "Introduction", href: "/docs", description: "Re-usable components built using Radix UI and Tailwind CSS." },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "How to install dependencies and structure your app.",
  },
  {
    title: "Typography",
    href: "/docs/primitives/typography",
    description: "Styles for headings, paragraphs, lists...etc",
  },
]

const moreLinks = [
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
  { title: "Support", href: "/support" },
]

export default function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(null)

  const toggleCollapsible = (value: string) => {
    setOpenCollapsible(openCollapsible === value ? null : value)
  }

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
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with Radix UI and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {gettingStartedLinks.map((link) => (
                    <ListItem key={link.title} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 px-4 py-2">
                    More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {moreLinks.map((link) => (
                    <DropdownMenuItem key={link.title}>
                      <Link href={link.href}>{link.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden ">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className=" bg-gray-200 ms-3">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
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
                  <Button variant="ghost" className="w-full justify-between h-auto p-3">
                    <span className="font-medium">Getting started</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openCollapsible === "getting-started" && "rotate-180",
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 px-3">
                  <div className="p-4 rounded-md bg-muted/50 mb-3">
                    <div className="text-sm font-medium mb-1">shadcn/ui</div>
                    <p className="text-xs text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
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
                      <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Components - Mobile */}
              <Collapsible open={openCollapsible === "components"} onOpenChange={() => toggleCollapsible("components")}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between h-auto p-3">
                    <span className="font-medium">Components</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", openCollapsible === "components" && "rotate-180")}
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
                      <div className="font-medium text-sm">{component.title}</div>
                      <p className="text-xs text-muted-foreground mt-1">{component.description}</p>
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
              <Collapsible open={openCollapsible === "more"} onOpenChange={() => toggleCollapsible("more")}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between h-auto p-3">
                    <span className="font-medium">More</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", openCollapsible === "more" && "rotate-180")}
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
              </Collapsible>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link {...props} className="no-underline">
        <NavigationMenuLink
          asChild
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
        >
          <div>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
})

ListItem.displayName = "ListItem"
