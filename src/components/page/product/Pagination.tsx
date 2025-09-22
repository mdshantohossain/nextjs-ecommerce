"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { nanoid } from "nanoid";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3; // how many pages to show around current page

    if (totalPages <= 7) {
      // show all if small number
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // first page always

      if (currentPage > maxVisible + 1) {
        pages.push("..."); // left ellipsis
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - maxVisible) {
        pages.push("..."); // right ellipsis
      }

      pages.push(totalPages); // last page always
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={nanoid()} className="px-2">
              ...
            </span>
          ) : (
            <Button
              key={nanoid()}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(Number(page))}
              className={page === currentPage ? "bg-red-500" : ""}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
