import { API_URL } from "@/config/api";
import { CategoryType, ProductType, SubCategoryType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CategoryWithRelations = CategoryType & {
  sub_categories: SubCategoryType[];
  products: ProductType[];
};  

export const useCategories = () => {
  return useQuery<CategoryWithRelations[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/categories");
      return data;
    },
  });
};
