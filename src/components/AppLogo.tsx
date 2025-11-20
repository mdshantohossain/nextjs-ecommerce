import { useAppSelector } from "@/features/hooks";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import images from "@/utils/images";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { RootState } from "@/features/store";

export default function AppLogo({ location }: { location?: boolean }) {
  const { data: appInfo, isLoading } = useAppSelector((state: RootState) => state.app);
  const { address } = useCurrentLocation();

  return (
    <div className="flex items-center">
      {isLoading ? (
        <Skeleton className="w-30 h-10 sm:w-30 sm:h-8 md:w-40 md:h-12 lg:w-48 lg:h-12 m-1" />
      ) : (
        <div className="relative w-30 h-10 sm:w-30 sm:h-8 md:w-40 md:h-12 lg:w-48 lg:h-12">
          <Link href="/">
            <Image
              src={appInfo?.logo || images.appLogo}
              fill
              alt="App Logo"
              className="object-contain"
            />
          </Link>
        </div>
      )}

      {location && (
        <div className="flex items-center ml-3">
          <MapPin className=" h-4 w-4 md:h-5 lg:w-5" />
          <div className="flex flex-col">
            <span className="text-xs">Delivery to</span>
            <span className="text-sm">{address.country || 'Loading...'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const LocationSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-10 h-10 rounded-circle" />
      <Skeleton className="w-30 h-5" />
    </div>
  );
};
