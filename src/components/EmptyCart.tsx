import { ShoppingCart } from "lucide-react";
import React from "react";

export default function EmptyCart() {
  return (
    <div className="text-center py-8 text-gray-500">
      <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p className="text-sm sm:text-base">Your cart is empty</p>
    </div>
  );
}
