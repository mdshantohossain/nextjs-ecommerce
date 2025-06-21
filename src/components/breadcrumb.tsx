"use client"

import type React from "react"

import { ChevronRight, Check, ShoppingCart, CreditCard, Truck, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbStep {
  id: string
  title: string
  icon: React.ReactNode
  href?: string
}

interface CheckoutBreadcrumbProps {
  currentStep: string
  className?: string
}

const checkoutSteps: BreadcrumbStep[] = [
  {
    id: "cart",
    title: "Shopping Cart",
    icon: <ShoppingCart className="w-4 h-4" />,
    href: "/cart",
  },
  {
    id: "checkout",
    title: "Checkout Details",
    icon: <CreditCard className="w-4 h-4" />,
    href: "/checkout",
  },
  {
    id: "shipping",
    title: "Shipping",
    icon: <Truck className="w-4 h-4" />,
    href: "/checkout/shipping",
  },
  {
    id: "confirmation",
    title: "Order Complete",
    icon: <CheckCircle className="w-4 h-4" />,
    href: "/checkout/confirmation",
  },
]

export default function CheckoutBreadcrumb({ currentStep, className }: CheckoutBreadcrumbProps) {
  const getCurrentStepIndex = () => {
    return checkoutSteps.findIndex((step) => step.id === currentStep)
  }

  const currentStepIndex = getCurrentStepIndex()

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return "completed"
    if (stepIndex === currentStepIndex) return "current"
    return "upcoming"
  }

  return (
    <nav className={cn("w-full", className)} aria-label="Checkout progress">
      {/* Desktop Breadcrumb */}
      <div className="hidden md:block">
        <ol className="flex items-center justify-center space-x-2 lg:space-x-4">
          {checkoutSteps.map((step, index) => {
            const status = getStepStatus(index)
            const isLast = index === checkoutSteps.length - 1

            return (
              <li key={step.id} className="flex items-center">
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                      status === "completed" && "bg-green-500 border-green-500 text-white",
                      status === "current" && "bg-blue-500 border-blue-500 text-white",
                      status === "upcoming" && "bg-background border-gray-300 text-muted-foreground",
                    )}
                  >
                    {status === "completed" ? <Check className="w-4 h-4" /> : step.icon}
                  </div>

                  {/* Step Title */}
                  <span
                    className={cn(
                      "ml-2 text-sm font-medium transition-colors duration-200",
                      status === "completed" && "text-green-600",
                      status === "current" && "text-blue-600",
                      status === "upcoming" && "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Separator */}
                {!isLast && (
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 mx-2 lg:mx-4 transition-colors duration-200",
                      index < currentStepIndex ? "text-green-500" : "text-gray-300",
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {/* Mobile Breadcrumb */}
      <div className="md:hidden">
        <div className="bg-card border rounded-lg p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>
                Step {currentStepIndex + 1} of {checkoutSteps.length}
              </span>
              <span>{Math.round(((currentStepIndex + 1) / checkoutSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / checkoutSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2",
                "bg-blue-500 border-blue-500 text-white",
              )}
            >
              {checkoutSteps[currentStepIndex]?.icon}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-foreground">{checkoutSteps[currentStepIndex]?.title}</h3>
              <p className="text-xs text-muted-foreground">
                Step {currentStepIndex + 1} of {checkoutSteps.length}
              </p>
            </div>
          </div>

          {/* All Steps List */}
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-2">
              {checkoutSteps.map((step, index) => {
                const status = getStepStatus(index)
                return (
                  <div key={step.id} className="flex items-center text-xs">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center mr-2",
                        status === "completed" && "bg-green-500 border-green-500",
                        status === "current" && "bg-blue-500 border-blue-500",
                        status === "upcoming" && "border-gray-300",
                      )}
                    >
                      {status === "completed" && <Check className="w-2 h-2 text-white" />}
                      {status === "current" && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span
                      className={cn(
                        status === "completed" && "text-green-600",
                        status === "current" && "text-blue-600 font-medium",
                        status === "upcoming" && "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Enhanced Checkout Page with Breadcrumb
export function CheckoutPageWithBreadcrumb() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <CheckoutBreadcrumb currentStep="checkout" className="mb-8" />

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

        {/* Rest of checkout content would go here */}
        <div className="text-center py-12 text-muted-foreground">
          <p>Checkout form content goes here...</p>
        </div>
      </div>
    </div>
  )
}
