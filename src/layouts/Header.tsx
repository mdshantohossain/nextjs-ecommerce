"use client"
import NavigationMenuDemo from "@/components/nevigation"
import * as React from "react"


export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="container mx-auto px-4 py-4">
              <NavigationMenuDemo />
            </div>
          </header>
      
  )
}

