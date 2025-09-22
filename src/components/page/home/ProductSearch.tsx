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
    <div className="relative w-full border-b-3 border-gray-300 focus:border-red-500 flex focus-within:border-red-500">
      {/* Input with bottom border only */}
      <input
        type="text"
        placeholder="Search product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex flex-1 focus:ring-0 px-2 py-2 text-lg outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Icon button */}
      <button
        onClick={handleSearch}
        className="w-10 text-gray-500 hover:text-black flex items-center justify-center"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}
