import { usePathname, useSearchParams } from "next/navigation";

export default function useCurrentUrl() {
  const params = useSearchParams();
  const pathname = usePathname();
  
   const page = (() => {
    if (pathname === "/" || pathname === "/home") return "home";
    if (pathname.startsWith("/wishlist")) return "wishlist";
    if (pathname.startsWith("/cart")) return "cart";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/profile")) return "profile";
    if (pathname.startsWith("/category")) return "category";
    if (pathname.startsWith("/search")) return "search";
    return "unknown"; // fallback
  })();

  const isPage = (name: string) => page === name;

  const isSubCategoryActive = (query: string) => {
    const current = params.get("sub-category");
    return current === query;  
};

  const isCategoryActive = (query: string) => {
    const current = params.get("category");
    return current === query;
  };

  return { isPage, isSubCategoryActive, isCategoryActive };
}
