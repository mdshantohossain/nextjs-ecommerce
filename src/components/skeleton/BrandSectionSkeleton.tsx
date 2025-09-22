import { Skeleton } from "../ui/skeleton";

export default function BrandSectionSkeleton() {
  return (
    <div className="lg:col-span-1">
      <div className="flex items-center mb-4">
        <Skeleton className="w-60 h-12" />
      </div>
      <div className="text-muted-foreground mb-6 text-sm leading-relaxed">
        <Skeleton className="w-60 h-4 mb-2" />
        <Skeleton className="w-40 h-4" />
      </div>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <span className="text-sm text-muted-foreground">
            <div>
              <Skeleton className="w-50 h-4" />
            </div>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-4 h-4 rounded-full" />
          <div className="text-sm text-muted-foreground hover:text-foreground">
            <Skeleton className="w-50 h-4" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-4 h-4 rounded-full" />

          <div className="text-sm text-muted-foreground hover:text-foreground">
            <Skeleton className="w-40 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
