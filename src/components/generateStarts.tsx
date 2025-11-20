import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react'

export default function renderStars(ratingString: string | null) {
  const totalStars = 5;
    const rating: number = parseFloat(ratingString || "0");

    // if rating is null, show all gray stars
    if (rating === null) {
      return Array.from({ length: totalStars }).map((_, index) => (
        <Star key={index} className="w-3 h-3 text-gray-300" />
      ));
    }

    // show stars based on rating (can be decimal like 3.5)
    return Array.from({ length: totalStars }).map((_, index) => {
      const starValue = index + 1;
      const isFilled = rating >= starValue;
      const isHalfFilled = rating >= starValue - 0.5 && rating < starValue;

      return (
        <Star
          key={index}
          className={cn(
            "w-3 h-3",
            isFilled
              ? "text-yellow-400 fill-yellow-400"
              : isHalfFilled
              ? "text-yellow-300 fill-yellow-300 opacity-70"
              : "text-gray-300"
          )}
        />
      );
    });
}
