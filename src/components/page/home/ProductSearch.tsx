"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex items-center w-full max-w-lg border border-gray-300 rounded-sm bg-background/50 shadow-sm focus-within:border-red-500 transition-colors">
      {/* Search Icon */}
      <div className="pl-3 pr-2 text-gray-400 flex items-center">
        <Search className="h-5 w-5" />
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Search for items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full py-2 pr-3 text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
