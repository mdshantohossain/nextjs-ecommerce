import { useSearchParams } from "next/navigation";

export default function useCurrentUrl() {
  const params = useSearchParams();

  const isSubCategoryActive = (query: string) => {
    const current = params.get("sub-category");
    return current === query;  
};

  const isCategoryActive = (query: string) => {
    const current = params.get("category");
    return current === query;
  };

  return { isSubCategoryActive, isCategoryActive };
}
