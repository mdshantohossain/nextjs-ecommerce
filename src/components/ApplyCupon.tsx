import { Tag } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export default function ApplyCupon() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const applyCoupon = () => {
    const validCoupons = {
      SAVE10: 10,
      SAVE20: 20,
      WELCOME15: 15,
      FIRST25: 25,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Tag className="w-5 h-5 mr-2" />
        Apply Coupon
      </h3>
      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1"
        />
        <Button onClick={applyCoupon} variant="outline">
          Apply
        </Button>
      </div>
      {appliedCoupon && (
        <div className="mt-3 flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded border">
          <span className="text-sm text-green-700 dark:text-green-400">
            Coupon "{appliedCoupon.code}" applied ({appliedCoupon.discount}%
            off)
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeCoupon}
            className="text-red-500"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
