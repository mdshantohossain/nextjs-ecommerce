"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface LoaderProps {
  variant?: "spinner" | "dots" | "pulse" | "skeleton" | "progress" | "bounce"
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "accent" | "muted"
  text?: string
  className?: string
  fullScreen?: boolean
}

export default function Loader({
  variant = "spinner",
  size = "md",
  color = "primary",
  text,
  className,
  fullScreen = false,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const colorClasses = {
    primary: "text-primary border-primary",
    secondary: "text-secondary border-secondary",
    accent: "text-accent border-accent",
    muted: "text-muted-foreground border-muted-foreground",
  }

  const SpinnerLoader = () => (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-transparent border-t-current",
        sizeClasses[size],
        colorClasses[color],
      )}
    />
  )

  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-current animate-pulse",
            size === "sm" && "w-1 h-1",
            size === "md" && "w-2 h-2",
            size === "lg" && "w-3 h-3",
            size === "xl" && "w-4 h-4",
            colorClasses[color],
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  )

  const PulseLoader = () => (
    <div className={cn("rounded-full bg-current animate-pulse", sizeClasses[size], colorClasses[color])} />
  )

  const SkeletonLoader = () => (
    <div className="space-y-3 w-full max-w-sm">
      <div className="h-4 bg-muted rounded animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
      <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
    </div>
  )

  const ProgressLoader = () => (
    <div className="w-full max-w-xs">
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-current rounded-full animate-pulse" style={{ width: "60%" }} />
      </div>
    </div>
  )

  const BounceLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-current",
            size === "sm" && "w-2 h-2",
            size === "md" && "w-3 h-3",
            size === "lg" && "w-4 h-4",
            size === "xl" && "w-5 h-5",
            colorClasses[color],
          )}
          style={{
            animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
          }}
        />
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return <SpinnerLoader />
      case "dots":
        return <DotsLoader />
      case "pulse":
        return <PulseLoader />
      case "skeleton":
        return <SkeletonLoader />
      case "progress":
        return <ProgressLoader />
      case "bounce":
        return <BounceLoader />
      default:
        return <SpinnerLoader />
    }
  }

  const content = (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      {renderLoader()}
      {text && <p className={cn("text-sm font-medium animate-pulse", colorClasses[color])}>{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}


// Data fetching loader component
interface DataLoaderProps {
  isLoading: boolean
  error?: string | null
  children: React.ReactNode
  loadingText?: string
  errorText?: string
  variant?: LoaderProps["variant"]
  size?: LoaderProps["size"]
}

export function DataLoader({
  isLoading,
  error,
  children,
  loadingText = "Loading...",
  errorText = "Something went wrong. Please try again.",
  variant = "spinner",
  size = "md",
}: DataLoaderProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-muted-foreground">{errorText}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader variant={variant} size={size} text={loadingText} />
      </div>
    )
  }

  return <>{children}</>
}

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  variant?: LoaderProps["variant"]
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, text = "Loading...", variant = "spinner", children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <Loader variant={variant} text={text} />
        </div>
      )}
    </div>
  )
}
